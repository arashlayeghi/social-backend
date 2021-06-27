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
import { CreateTravellerArgs } from "./CreateTravellerArgs";
import { UpdateTravellerArgs } from "./UpdateTravellerArgs";
import { DeleteTravellerArgs } from "./DeleteTravellerArgs";
import { TravellerFindManyArgs } from "./TravellerFindManyArgs";
import { TravellerFindUniqueArgs } from "./TravellerFindUniqueArgs";
import { Traveller } from "./Traveller";
import { CommentFindManyArgs } from "../../comment/base/CommentFindManyArgs";
import { Comment } from "../../comment/base/Comment";
import { GroupMemberFindManyArgs } from "../../groupMember/base/GroupMemberFindManyArgs";
import { GroupMember } from "../../groupMember/base/GroupMember";
import { LikeFindManyArgs } from "../../like/base/LikeFindManyArgs";
import { Like } from "../../like/base/Like";
import { PostFindManyArgs } from "../../post/base/PostFindManyArgs";
import { Post } from "../../post/base/Post";
import { TripFindManyArgs } from "../../trip/base/TripFindManyArgs";
import { Trip } from "../../trip/base/Trip";
import { TravellerService } from "../traveller.service";

@graphql.Resolver(() => Traveller)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class TravellerResolverBase {
  constructor(
    protected readonly service: TravellerService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Traveller",
    action: "read",
    possession: "any",
  })
  async _travellersMeta(
    @graphql.Args() args: TravellerFindManyArgs
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

  @graphql.Query(() => [Traveller])
  @nestAccessControl.UseRoles({
    resource: "Traveller",
    action: "read",
    possession: "any",
  })
  async travellers(
    @graphql.Args() args: TravellerFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Traveller[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Traveller",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Traveller, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Traveller",
    action: "read",
    possession: "own",
  })
  async traveller(
    @graphql.Args() args: TravellerFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Traveller | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Traveller",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Traveller)
  @nestAccessControl.UseRoles({
    resource: "Traveller",
    action: "create",
    possession: "any",
  })
  async createTraveller(
    @graphql.Args() args: CreateTravellerArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Traveller> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Traveller",
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
        `providing the properties: ${properties} on ${"Traveller"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Traveller)
  @nestAccessControl.UseRoles({
    resource: "Traveller",
    action: "update",
    possession: "any",
  })
  async updateTraveller(
    @graphql.Args() args: UpdateTravellerArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Traveller | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Traveller",
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
        `providing the properties: ${properties} on ${"Traveller"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
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

  @graphql.Mutation(() => Traveller)
  @nestAccessControl.UseRoles({
    resource: "Traveller",
    action: "delete",
    possession: "any",
  })
  async deleteTraveller(
    @graphql.Args() args: DeleteTravellerArgs
  ): Promise<Traveller | null> {
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

  @graphql.ResolveField(() => [Comment])
  @nestAccessControl.UseRoles({
    resource: "Traveller",
    action: "read",
    possession: "any",
  })
  async comments(
    @graphql.Parent() parent: Traveller,
    @graphql.Args() args: CommentFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Comment[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Comment",
    });
    const results = await this.service.findComments(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [GroupMember])
  @nestAccessControl.UseRoles({
    resource: "Traveller",
    action: "read",
    possession: "any",
  })
  async groupMembers(
    @graphql.Parent() parent: Traveller,
    @graphql.Args() args: GroupMemberFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<GroupMember[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "GroupMember",
    });
    const results = await this.service.findGroupMembers(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Like])
  @nestAccessControl.UseRoles({
    resource: "Traveller",
    action: "read",
    possession: "any",
  })
  async likes(
    @graphql.Parent() parent: Traveller,
    @graphql.Args() args: LikeFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Like[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Like",
    });
    const results = await this.service.findLikes(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Post])
  @nestAccessControl.UseRoles({
    resource: "Traveller",
    action: "read",
    possession: "any",
  })
  async posts(
    @graphql.Parent() parent: Traveller,
    @graphql.Args() args: PostFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Post[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Post",
    });
    const results = await this.service.findPosts(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Trip])
  @nestAccessControl.UseRoles({
    resource: "Traveller",
    action: "read",
    possession: "any",
  })
  async trips(
    @graphql.Parent() parent: Traveller,
    @graphql.Args() args: TripFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Trip[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Trip",
    });
    const results = await this.service.findTrips(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }
}
