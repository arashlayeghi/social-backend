import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { GroupService } from "../group.service";
import { GroupCreateInput } from "./GroupCreateInput";
import { GroupWhereInput } from "./GroupWhereInput";
import { GroupWhereUniqueInput } from "./GroupWhereUniqueInput";
import { GroupFindManyArgs } from "./GroupFindManyArgs";
import { GroupUpdateInput } from "./GroupUpdateInput";
import { Group } from "./Group";
import { Post } from "../../post/base/Post";
import { GroupMemberWhereInput } from "../../groupMember/base/GroupMemberWhereInput";
import { GroupMember } from "../../groupMember/base/GroupMember";

export class GroupControllerBase {
  constructor(
    protected readonly service: GroupService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Group",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Group })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: GroupCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Group> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Group",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Group"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        tid: data.tid
          ? {
              connect: data.tid,
            }
          : undefined,
      },
      select: {
        _ca: true,
        description: true,
        end_date: true,
        id: true,
        start_date: true,

        tid: {
          select: {
            id: true,
          },
        },

        _lma: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Group",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Group] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => GroupFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Group[]> {
    const args = plainToClass(GroupFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Group",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        _ca: true,
        description: true,
        end_date: true,
        id: true,
        start_date: true,

        tid: {
          select: {
            id: true,
          },
        },

        _lma: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Group",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Group })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: GroupWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Group | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Group",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        _ca: true,
        description: true,
        end_date: true,
        id: true,
        start_date: true,

        tid: {
          select: {
            id: true,
          },
        },

        _lma: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "Group",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Group })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: GroupWhereUniqueInput,
    @common.Body()
    data: GroupUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Group | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Group",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Group"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          tid: data.tid
            ? {
                connect: data.tid,
              }
            : undefined,
        },
        select: {
          _ca: true,
          description: true,
          end_date: true,
          id: true,
          start_date: true,

          tid: {
            select: {
              id: true,
            },
          },

          _lma: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "Group",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Group })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: GroupWhereUniqueInput
  ): Promise<Group | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          _ca: true,
          description: true,
          end_date: true,
          id: true,
          start_date: true,

          tid: {
            select: {
              id: true,
            },
          },

          _lma: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id/groupMembers")
  @nestAccessControl.UseRoles({
    resource: "Group",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => GroupMemberWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyGroupMembers(
    @common.Req() request: Request,
    @common.Param() params: GroupWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<GroupMember[]> {
    const query: GroupMemberWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "GroupMember",
    });
    const results = await this.service.findGroupMembers(params.id, {
      where: query,
      select: {
        cid: {
          select: {
            id: true,
          },
        },

        _ca: true,

        group_id: {
          select: {
            id: true,
          },
        },

        id: true,
        _lma: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post("/:id/groupMembers")
  @nestAccessControl.UseRoles({
    resource: "Group",
    action: "update",
    possession: "any",
  })
  async createGroupMembers(
    @common.Param() params: GroupWhereUniqueInput,
    @common.Body() body: GroupWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      groupMembers: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Group",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Group"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id/groupMembers")
  @nestAccessControl.UseRoles({
    resource: "Group",
    action: "update",
    possession: "any",
  })
  async updateGroupMembers(
    @common.Param() params: GroupWhereUniqueInput,
    @common.Body() body: GroupWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      groupMembers: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Group",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Group"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id/groupMembers")
  @nestAccessControl.UseRoles({
    resource: "Group",
    action: "update",
    possession: "any",
  })
  async deleteGroupMembers(
    @common.Param() params: GroupWhereUniqueInput,
    @common.Body() body: GroupWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      groupMembers: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Group",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Group"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
