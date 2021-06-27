import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { TravellerResolverBase } from "./base/traveller.resolver.base";
import { Traveller } from "./base/Traveller";
import { TravellerService } from "./traveller.service";

@graphql.Resolver(() => Traveller)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class TravellerResolver extends TravellerResolverBase {
  constructor(
    protected readonly service: TravellerService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
