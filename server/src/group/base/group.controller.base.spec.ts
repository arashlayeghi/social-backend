import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { BasicAuthGuard } from "../../auth/basicAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { GroupController } from "../group.controller";
import { GroupService } from "../group.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  _ca: 42,
  description: "exampleDescription",
  end_date: 42,
  id: "exampleId",
  start_date: 42,
  _lma: 42,
};
const CREATE_RESULT = {
  _ca: 42,
  description: "exampleDescription",
  end_date: 42,
  id: "exampleId",
  start_date: 42,
  _lma: 42,
};
const FIND_MANY_RESULT = [
  {
    _ca: 42,
    description: "exampleDescription",
    end_date: 42,
    id: "exampleId",
    start_date: 42,
    _lma: 42,
  },
];
const FIND_ONE_RESULT = {
  _ca: 42,
  description: "exampleDescription",
  end_date: 42,
  id: "exampleId",
  start_date: 42,
  _lma: 42,
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

describe("Group", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: GroupService,
          useValue: service,
        },
      ],
      controllers: [GroupController],
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

  test("POST /groups", async () => {
    await request(app.getHttpServer())
      .post("/groups")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT);
  });

  test("GET /groups", async () => {
    await request(app.getHttpServer())
      .get("/groups")
      .expect(HttpStatus.OK)
      .expect([FIND_MANY_RESULT[0]]);
  });

  test("GET /groups/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/groups"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /groups/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/groups"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect(FIND_ONE_RESULT);
  });

  afterAll(async () => {
    await app.close();
  });
});
