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
import { GroupMemberService } from "../groupMember.service";
import { GroupMemberCreateInput } from "./GroupMemberCreateInput";
import { GroupMemberWhereInput } from "./GroupMemberWhereInput";
import { GroupMemberWhereUniqueInput } from "./GroupMemberWhereUniqueInput";
import { GroupMemberFindManyArgs } from "./GroupMemberFindManyArgs";
import { GroupMemberUpdateInput } from "./GroupMemberUpdateInput";
import { GroupMember } from "./GroupMember";
import { Post } from "../../post/base/Post";

export class GroupMemberControllerBase {
  constructor(
    protected readonly service: GroupMemberService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "GroupMember",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: GroupMember })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: GroupMemberCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<GroupMember> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "GroupMember",
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
        `providing the properties: ${properties} on ${"GroupMember"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        cid: data.cid
          ? {
              connect: data.cid,
            }
          : undefined,

        group_id: data.group_id
          ? {
              connect: data.group_id,
            }
          : undefined,
      },
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
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "GroupMember",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [GroupMember] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => GroupMemberFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<GroupMember[]> {
    const args = plainToClass(GroupMemberFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "GroupMember",
    });
    const results = await this.service.findMany({
      ...args,
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
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "GroupMember",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: GroupMember })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: GroupMemberWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<GroupMember | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "GroupMember",
    });
    const result = await this.service.findOne({
      where: params,
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
    resource: "GroupMember",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: GroupMember })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: GroupMemberWhereUniqueInput,
    @common.Body()
    data: GroupMemberUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<GroupMember | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "GroupMember",
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
        `providing the properties: ${properties} on ${"GroupMember"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          cid: data.cid
            ? {
                connect: data.cid,
              }
            : undefined,

          group_id: data.group_id
            ? {
                connect: data.group_id,
              }
            : undefined,
        },
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
    resource: "GroupMember",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: GroupMember })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: GroupMemberWhereUniqueInput
  ): Promise<GroupMember | null> {
    try {
      return await this.service.delete({
        where: params,
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
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
