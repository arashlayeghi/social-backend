import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GroupMemberResolverBase } from "./base/groupMember.resolver.base";
import { GroupMember } from "./base/GroupMember";
import { GroupMemberService } from "./groupMember.service";

@graphql.Resolver(() => GroupMember)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class GroupMemberResolver extends GroupMemberResolverBase {
  constructor(
    protected readonly service: GroupMemberService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
