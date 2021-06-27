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
import { LikeService } from "../like.service";
import { LikeCreateInput } from "./LikeCreateInput";
import { LikeWhereInput } from "./LikeWhereInput";
import { LikeWhereUniqueInput } from "./LikeWhereUniqueInput";
import { LikeFindManyArgs } from "./LikeFindManyArgs";
import { LikeUpdateInput } from "./LikeUpdateInput";
import { Like } from "./Like";
import { Post } from "../../post/base/Post";

export class LikeControllerBase {
  constructor(
    protected readonly service: LikeService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Like",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Like })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: LikeCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Like> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Like",
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
        `providing the properties: ${properties} on ${"Like"} creation is forbidden for roles: ${roles}`
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

        post_id: data.post_id
          ? {
              connect: data.post_id,
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
        id: true,

        post_id: {
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
    resource: "Like",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Like] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => LikeFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Like[]> {
    const args = plainToClass(LikeFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Like",
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
        id: true,

        post_id: {
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
    resource: "Like",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Like })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: LikeWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Like | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Like",
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
        id: true,

        post_id: {
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
    resource: "Like",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Like })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: LikeWhereUniqueInput,
    @common.Body()
    data: LikeUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Like | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Like",
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
        `providing the properties: ${properties} on ${"Like"} update is forbidden for roles: ${roles}`
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

          post_id: data.post_id
            ? {
                connect: data.post_id,
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
          id: true,

          post_id: {
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
    resource: "Like",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Like })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: LikeWhereUniqueInput
  ): Promise<Like | null> {
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
          id: true,

          post_id: {
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
}
