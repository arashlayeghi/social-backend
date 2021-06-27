import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { BasicAuthGuard } from "../../auth/basicAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { GroupMemberController } from "../groupMember.controller";
import { GroupMemberService } from "../groupMember.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  _ca: 42,
  id: "exampleId",
  _lma: new Date(),
};
const CREATE_RESULT = {
  _ca: 42,
  id: "exampleId",
  _lma: new Date(),
};
const FIND_MANY_RESULT = [
  {
    _ca: 42,
    id: "exampleId",
    _lma: new Date(),
  },
];
const FIND_ONE_RESULT = {
  _ca: 42,
  id: "exampleId",
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

describe("GroupMember", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: GroupMemberService,
          useValue: service,
        },
      ],
      controllers: [GroupMemberController],
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

  test("POST /group-members", async () => {
    await request(app.getHttpServer())
      .post("/group-members")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        _lma: CREATE_RESULT._lma.toISOString(),
      });
  });

  test("GET /group-members", async () => {
    await request(app.getHttpServer())
      .get("/group-members")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          _lma: FIND_MANY_RESULT[0]._lma.toISOString(),
        },
      ]);
  });

  test("GET /group-members/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/group-members"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /group-members/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/group-members"}/${existingId}`)
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
