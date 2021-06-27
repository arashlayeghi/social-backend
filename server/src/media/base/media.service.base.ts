import { PrismaService } from "nestjs-prisma";
import { Prisma, Media, Post } from "@prisma/client";

export class MediaServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.MediaFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.MediaFindManyArgs>
  ): Promise<number> {
    return this.prisma.media.count(args);
  }

  async findMany<T extends Prisma.MediaFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.MediaFindManyArgs>
  ): Promise<Media[]> {
    return this.prisma.media.findMany(args);
  }
  async findOne<T extends Prisma.MediaFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.MediaFindUniqueArgs>
  ): Promise<Media | null> {
    return this.prisma.media.findUnique(args);
  }
  async create<T extends Prisma.MediaCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.MediaCreateArgs>
  ): Promise<Media> {
    return this.prisma.media.create<T>(args);
  }
  async update<T extends Prisma.MediaUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.MediaUpdateArgs>
  ): Promise<Media> {
    return this.prisma.media.update<T>(args);
  }
  async delete<T extends Prisma.MediaDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.MediaDeleteArgs>
  ): Promise<Media> {
    return this.prisma.media.delete(args);
  }

  async getPost(parentId: string): Promise<Post | null> {
    return this.prisma.media
      .findUnique({
        where: { id: parentId },
      })
      .post();
  }
}
