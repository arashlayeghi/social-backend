import { PrismaService } from "nestjs-prisma";
import {
  Prisma,
  Traveller,
  Comment,
  GroupMember,
  Like,
  Post,
  Trip,
} from "@prisma/client";

export class TravellerServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.TravellerFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.TravellerFindManyArgs>
  ): Promise<number> {
    return this.prisma.traveller.count(args);
  }

  async findMany<T extends Prisma.TravellerFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.TravellerFindManyArgs>
  ): Promise<Traveller[]> {
    return this.prisma.traveller.findMany(args);
  }
  async findOne<T extends Prisma.TravellerFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.TravellerFindUniqueArgs>
  ): Promise<Traveller | null> {
    return this.prisma.traveller.findUnique(args);
  }
  async create<T extends Prisma.TravellerCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TravellerCreateArgs>
  ): Promise<Traveller> {
    return this.prisma.traveller.create<T>(args);
  }
  async update<T extends Prisma.TravellerUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TravellerUpdateArgs>
  ): Promise<Traveller> {
    return this.prisma.traveller.update<T>(args);
  }
  async delete<T extends Prisma.TravellerDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.TravellerDeleteArgs>
  ): Promise<Traveller> {
    return this.prisma.traveller.delete(args);
  }

  async findComments(
    parentId: string,
    args: Prisma.CommentFindManyArgs
  ): Promise<Comment[]> {
    return this.prisma.traveller
      .findUnique({
        where: { id: parentId },
      })
      .comments(args);
  }

  async findGroupMembers(
    parentId: string,
    args: Prisma.GroupMemberFindManyArgs
  ): Promise<GroupMember[]> {
    return this.prisma.traveller
      .findUnique({
        where: { id: parentId },
      })
      .groupMembers(args);
  }

  async findLikes(
    parentId: string,
    args: Prisma.LikeFindManyArgs
  ): Promise<Like[]> {
    return this.prisma.traveller
      .findUnique({
        where: { id: parentId },
      })
      .likes(args);
  }

  async findPosts(
    parentId: string,
    args: Prisma.PostFindManyArgs
  ): Promise<Post[]> {
    return this.prisma.traveller
      .findUnique({
        where: { id: parentId },
      })
      .posts(args);
  }

  async findTrips(
    parentId: string,
    args: Prisma.TripFindManyArgs
  ): Promise<Trip[]> {
    return this.prisma.traveller
      .findUnique({
        where: { id: parentId },
      })
      .trips(args);
  }
}
