import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { TravellerService } from "./traveller.service";
import { TravellerControllerBase } from "./base/traveller.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("travellers")
@common.Controller("travellers")
export class TravellerController extends TravellerControllerBase {
  constructor(
    protected readonly service: TravellerService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
