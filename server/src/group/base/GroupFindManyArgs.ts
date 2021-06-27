import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { GroupWhereInput } from "./GroupWhereInput";
import { Type } from "class-transformer";
import { GroupOrderByInput } from "./GroupOrderByInput";

@ArgsType()
class GroupFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => GroupWhereInput,
  })
  @Field(() => GroupWhereInput, { nullable: true })
  @Type(() => GroupWhereInput)
  where?: GroupWhereInput;

  @ApiProperty({
    required: false,
    type: GroupOrderByInput,
  })
  @Field(() => GroupOrderByInput, { nullable: true })
  @Type(() => GroupOrderByInput)
  orderBy?: GroupOrderByInput;

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

export { GroupFindManyArgs };
