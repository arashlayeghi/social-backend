import { Module } from "@nestjs/common";
import { TravellerModuleBase } from "./base/traveller.module.base";
import { TravellerService } from "./traveller.service";
import { TravellerController } from "./traveller.controller";
import { TravellerResolver } from "./traveller.resolver";

@Module({
  imports: [TravellerModuleBase],
  controllers: [TravellerController],
  providers: [TravellerService, TravellerResolver],
  exports: [TravellerService],
})
export class TravellerModule {}
