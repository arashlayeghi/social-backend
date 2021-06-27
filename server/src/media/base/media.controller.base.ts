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
import { MediaService } from "../media.service";
import { MediaCreateInput } from "./MediaCreateInput";
import { MediaWhereInput } from "./MediaWhereInput";
import { MediaWhereUniqueInput } from "./MediaWhereUniqueInput";
import { MediaFindManyArgs } from "./MediaFindManyArgs";
import { MediaUpdateInput } from "./MediaUpdateInput";
import { Media } from "./Media";
import { Post } from "../../post/base/Post";

export class MediaControllerBase {
  constructor(
    protected readonly service: MediaService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Media",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Media })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: MediaCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Media> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Media",
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
        `providing the properties: ${properties} on ${"Media"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        post: data.post
          ? {
              connect: data.post,
            }
          : undefined,
      },
      select: {
        _ca: true,
        id: true,

        post: {
          select: {
            id: true,
          },
        },

        public_id: true,
        type: true,
        _lma: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Media",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Media] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => MediaFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Media[]> {
    const args = plainToClass(MediaFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Media",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        _ca: true,
        id: true,

        post: {
          select: {
            id: true,
          },
        },

        public_id: true,
        type: true,
        _lma: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Media",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Media })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: MediaWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Media | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Media",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        _ca: true,
        id: true,

        post: {
          select: {
            id: true,
          },
        },

        public_id: true,
        type: true,
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
    resource: "Media",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Media })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: MediaWhereUniqueInput,
    @common.Body()
    data: MediaUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Media | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Media",
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
        `providing the properties: ${properties} on ${"Media"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          post: data.post
            ? {
                connect: data.post,
              }
            : undefined,
        },
        select: {
          _ca: true,
          id: true,

          post: {
            select: {
              id: true,
            },
          },

          public_id: true,
          type: true,
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
    resource: "Media",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Media })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: MediaWhereUniqueInput
  ): Promise<Media | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          _ca: true,
          id: true,

          post: {
            select: {
              id: true,
            },
          },

          public_id: true,
          type: true,
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
