import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateGroupMemberArgs } from "./CreateGroupMemberArgs";
import { UpdateGroupMemberArgs } from "./UpdateGroupMemberArgs";
import { DeleteGroupMemberArgs } from "./DeleteGroupMemberArgs";
import { GroupMemberFindManyArgs } from "./GroupMemberFindManyArgs";
import { GroupMemberFindUniqueArgs } from "./GroupMemberFindUniqueArgs";
import { GroupMember } from "./GroupMember";
import { Traveller } from "../../traveller/base/Traveller";
import { Group } from "../../group/base/Group";
import { GroupMemberService } from "../groupMember.service";

@graphql.Resolver(() => GroupMember)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class GroupMemberResolverBase {
  constructor(
    protected readonly service: GroupMemberService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "GroupMember",
    action: "read",
    possession: "any",
  })
  async _groupMembersMeta(
    @graphql.Args() args: GroupMemberFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [GroupMember])
  @nestAccessControl.UseRoles({
    resource: "GroupMember",
    action: "read",
    possession: "any",
  })
  async groupMembers(
    @graphql.Args() args: GroupMemberFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<GroupMember[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "GroupMember",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => GroupMember, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "GroupMember",
    action: "read",
    possession: "own",
  })
  async groupMember(
    @graphql.Args() args: GroupMemberFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<GroupMember | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "GroupMember",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => GroupMember)
  @nestAccessControl.UseRoles({
    resource: "GroupMember",
    action: "create",
    possession: "any",
  })
  async createGroupMember(
    @graphql.Args() args: CreateGroupMemberArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<GroupMember> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "GroupMember",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"GroupMember"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        cid: args.data.cid
          ? {
              connect: args.data.cid,
            }
          : undefined,

        group_id: args.data.group_id
          ? {
              connect: args.data.group_id,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => GroupMember)
  @nestAccessControl.UseRoles({
    resource: "GroupMember",
    action: "update",
    possession: "any",
  })
  async updateGroupMember(
    @graphql.Args() args: UpdateGroupMemberArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<GroupMember | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "GroupMember",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"GroupMember"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          cid: args.data.cid
            ? {
                connect: args.data.cid,
              }
            : undefined,

          group_id: args.data.group_id
            ? {
                connect: args.data.group_id,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => GroupMember)
  @nestAccessControl.UseRoles({
    resource: "GroupMember",
    action: "delete",
    possession: "any",
  })
  async deleteGroupMember(
    @graphql.Args() args: DeleteGroupMemberArgs
  ): Promise<GroupMember | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => Traveller, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "GroupMember",
    action: "read",
    possession: "any",
  })
  async cid(
    @graphql.Parent() parent: GroupMember,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Traveller | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Traveller",
    });
    const result = await this.service.getCid(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Group, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "GroupMember",
    action: "read",
    possession: "any",
  })
  async groupId(
    @graphql.Parent() parent: GroupMember,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Group | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Group",
    });
    const result = await this.service.getGroupId(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
