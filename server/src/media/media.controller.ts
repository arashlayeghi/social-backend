import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { MediaService } from "./media.service";
import { MediaControllerBase } from "./base/media.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("media")
@common.Controller("media")
export class MediaController extends MediaControllerBase {
  constructor(
    protected readonly service: MediaService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
