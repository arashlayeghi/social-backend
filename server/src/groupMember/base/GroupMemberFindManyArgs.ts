import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { GroupMemberWhereInput } from "./GroupMemberWhereInput";
import { Type } from "class-transformer";
import { GroupMemberOrderByInput } from "./GroupMemberOrderByInput";

@ArgsType()
class GroupMemberFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => GroupMemberWhereInput,
  })
  @Field(() => GroupMemberWhereInput, { nullable: true })
  @Type(() => GroupMemberWhereInput)
  where?: GroupMemberWhereInput;

  @ApiProperty({
    required: false,
    type: GroupMemberOrderByInput,
  })
  @Field(() => GroupMemberOrderByInput, { nullable: true })
  @Type(() => GroupMemberOrderByInput)
  orderBy?: GroupMemberOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { GroupMemberFindManyArgs };
