import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { BasicAuthGuard } from "../../auth/basicAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { MediaController } from "../media.controller";
import { MediaService } from "../media.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  _ca: 42,
  id: "exampleId",
  public_id: "examplePublicId",
  _lma: new Date(),
};
const CREATE_RESULT = {
  _ca: 42,
  id: "exampleId",
  public_id: "examplePublicId",
  _lma: new Date(),
};
const FIND_MANY_RESULT = [
  {
    _ca: 42,
    id: "exampleId",
    public_id: "examplePublicId",
    _lma: new Date(),
  },
];
const FIND_ONE_RESULT = {
  _ca: 42,
  id: "exampleId",
  public_id: "examplePublicId",
  _lma: new Date(),
};

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

describe("Media", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: MediaService,
          useValue: service,
        },
      ],
      controllers: [MediaController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(BasicAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /media", async () => {
    await request(app.getHttpServer())
      .post("/media")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        _lma: CREATE_RESULT._lma.toISOString(),
      });
  });

  test("GET /media", async () => {
    await request(app.getHttpServer())
      .get("/media")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          _lma: FIND_MANY_RESULT[0]._lma.toISOString(),
        },
      ]);
  });

  test("GET /media/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/media"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /media/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/media"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        _lma: FIND_ONE_RESULT._lma.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
