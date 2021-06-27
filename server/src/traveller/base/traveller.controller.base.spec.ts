import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { BasicAuthGuard } from "../../auth/basicAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { TravellerController } from "../traveller.controller";
import { TravellerService } from "../traveller.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  _ca: 42,
  email: "exampleEmail",
  first_name: "exampleFirstName",
  id: "exampleId",
  last_name: "exampleLastName",
  middle_name: "exampleMiddleName",
  title: "exampleTitle",
  _lma: 42,
};
const CREATE_RESULT = {
  _ca: 42,
  email: "exampleEmail",
  first_name: "exampleFirstName",
  id: "exampleId",
  last_name: "exampleLastName",
  middle_name: "exampleMiddleName",
  title: "exampleTitle",
  _lma: 42,
};
const FIND_MANY_RESULT = [
  {
    _ca: 42,
    email: "exampleEmail",
    first_name: "exampleFirstName",
    id: "exampleId",
    last_name: "exampleLastName",
    middle_name: "exampleMiddleName",
    title: "exampleTitle",
    _lma: 42,
  },
];
const FIND_ONE_RESULT = {
  _ca: 42,
  email: "exampleEmail",
  first_name: "exampleFirstName",
  id: "exampleId",
  last_name: "exampleLastName",
  middle_name: "exampleMiddleName",
  title: "exampleTitle",
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

describe("Traveller", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: TravellerService,
          useValue: service,
        },
      ],
      controllers: [TravellerController],
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

  test("POST /travellers", async () => {
    await request(app.getHttpServer())
      .post("/travellers")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect(CREATE_RESULT);
  });

  test("GET /travellers", async () => {
    await request(app.getHttpServer())
      .get("/travellers")
      .expect(HttpStatus.OK)
      .expect([FIND_MANY_RESULT[0]]);
  });

  test("GET /travellers/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/travellers"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /travellers/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/travellers"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect(FIND_ONE_RESULT);
  });

  afterAll(async () => {
    await app.close();
  });
});
