import { PrismaService } from "nestjs-prisma";
import { Prisma, Trip, Group, Traveller } from "@prisma/client";

export class TripServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.TripFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.TripFindManyArgs>
  ): Promise<number> {
    return this.prisma.trip.count(args);
  }

  async findMany<T extends Prisma.TripFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.TripFindManyArgs>
  ): Promise<Trip[]> {
    return this.prisma.trip.findMany(args);
  }
  async findOne<T extends Prisma.TripFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.TripFindUniqueArgs>
  ): Promise<Trip | null> {
    return this.prisma.trip.findUnique(args);
  }
  async create<T extends Prisma.TripCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TripCreateArgs>
  ): Promise<Trip> {
    return this.prisma.trip.create<T>(args);
  }
  async update<T extends Prisma.TripUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TripUpdateArgs>
  ): Promise<Trip> {
    return this.prisma.trip.update<T>(args);
  }
  async delete<T extends Prisma.TripDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.TripDeleteArgs>
  ): Promise<Trip> {
    return this.prisma.trip.delete(args);
  }

  async findGroups(
    parentId: string,
    args: Prisma.GroupFindManyArgs
  ): Promise<Group[]> {
    return this.prisma.trip
      .findUnique({
        where: { id: parentId },
      })
      .groups(args);
  }

  async getCid(parentId: string): Promise<Traveller | null> {
    return this.prisma.trip
      .findUnique({
        where: { id: parentId },
      })
      .cid();
  }
}
