import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CommentWhereInput } from "./CommentWhereInput";
import { Type } from "class-transformer";
import { CommentOrderByInput } from "./CommentOrderByInput";

@ArgsType()
class CommentFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => CommentWhereInput,
  })
  @Field(() => CommentWhereInput, { nullable: true })
  @Type(() => CommentWhereInput)
  where?: CommentWhereInput;

  @ApiProperty({
    required: false,
    type: CommentOrderByInput,
  })
  @Field(() => CommentOrderByInput, { nullable: true })
  @Type(() => CommentOrderByInput)
  orderBy?: CommentOrderByInput;

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

export { CommentFindManyArgs };
