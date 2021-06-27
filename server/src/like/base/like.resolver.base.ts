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
import { CreateLikeArgs } from "./CreateLikeArgs";
import { UpdateLikeArgs } from "./UpdateLikeArgs";
import { DeleteLikeArgs } from "./DeleteLikeArgs";
import { LikeFindManyArgs } from "./LikeFindManyArgs";
import { LikeFindUniqueArgs } from "./LikeFindUniqueArgs";
import { Like } from "./Like";
import { Traveller } from "../../traveller/base/Traveller";
import { Post } from "../../post/base/Post";
import { LikeService } from "../like.service";

@graphql.Resolver(() => Like)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class LikeResolverBase {
  constructor(
    protected readonly service: LikeService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Like",
    action: "read",
    possession: "any",
  })
  async _likesMeta(
    @graphql.Args() args: LikeFindManyArgs
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

  @graphql.Query(() => [Like])
  @nestAccessControl.UseRoles({
    resource: "Like",
    action: "read",
    possession: "any",
  })
  async likes(
    @graphql.Args() args: LikeFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Like[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Like",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Like, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Like",
    action: "read",
    possession: "own",
  })
  async like(
    @graphql.Args() args: LikeFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Like | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Like",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Like)
  @nestAccessControl.UseRoles({
    resource: "Like",
    action: "create",
    possession: "any",
  })
  async createLike(
    @graphql.Args() args: CreateLikeArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Like> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Like",
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
        `providing the properties: ${properties} on ${"Like"} creation is forbidden for roles: ${roles}`
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

        post_id: args.data.post_id
          ? {
              connect: args.data.post_id,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Like)
  @nestAccessControl.UseRoles({
    resource: "Like",
    action: "update",
    possession: "any",
  })
  async updateLike(
    @graphql.Args() args: UpdateLikeArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Like | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Like",
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
        `providing the properties: ${properties} on ${"Like"} update is forbidden for roles: ${roles}`
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

          post_id: args.data.post_id
            ? {
                connect: args.data.post_id,
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

  @graphql.Mutation(() => Like)
  @nestAccessControl.UseRoles({
    resource: "Like",
    action: "delete",
    possession: "any",
  })
  async deleteLike(@graphql.Args() args: DeleteLikeArgs): Promise<Like | null> {
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
    resource: "Like",
    action: "read",
    possession: "any",
  })
  async cid(
    @graphql.Parent() parent: Like,
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

  @graphql.ResolveField(() => Post, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Like",
    action: "read",
    possession: "any",
  })
  async postId(
    @graphql.Parent() parent: Like,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Post | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Post",
    });
    const result = await this.service.getPostId(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
