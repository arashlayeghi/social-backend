import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { LikeWhereInput } from "./LikeWhereInput";
import { Type } from "class-transformer";
import { LikeOrderByInput } from "./LikeOrderByInput";

@ArgsType()
class LikeFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => LikeWhereInput,
  })
  @Field(() => LikeWhereInput, { nullable: true })
  @Type(() => LikeWhereInput)
  where?: LikeWhereInput;

  @ApiProperty({
    required: false,
    type: LikeOrderByInput,
  })
  @Field(() => LikeOrderByInput, { nullable: true })
  @Type(() => LikeOrderByInput)
  orderBy?: LikeOrderByInput;

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

export { LikeFindManyArgs };
