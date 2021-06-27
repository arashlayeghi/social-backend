import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { TravellerServiceBase } from "./base/traveller.service.base";

@Injectable()
export class TravellerService extends TravellerServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
