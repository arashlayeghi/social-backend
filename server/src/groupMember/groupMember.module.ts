import { Module } from "@nestjs/common";
import { GroupMemberModuleBase } from "./base/groupMember.module.base";
import { GroupMemberService } from "./groupMember.service";
import { GroupMemberController } from "./groupMember.controller";
import { GroupMemberResolver } from "./groupMember.resolver";

@Module({
  imports: [GroupMemberModuleBase],
  controllers: [GroupMemberController],
  providers: [GroupMemberService, GroupMemberResolver],
  exports: [GroupMemberService],
})
export class GroupMemberModule {}
