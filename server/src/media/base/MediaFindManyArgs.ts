import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { MediaWhereInput } from "./MediaWhereInput";
import { Type } from "class-transformer";
import { MediaOrderByInput } from "./MediaOrderByInput";

@ArgsType()
class MediaFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => MediaWhereInput,
  })
  @Field(() => MediaWhereInput, { nullable: true })
  @Type(() => MediaWhereInput)
  where?: MediaWhereInput;

  @ApiProperty({
    required: false,
    type: MediaOrderByInput,
  })
  @Field(() => MediaOrderByInput, { nullable: true })
  @Type(() => MediaOrderByInput)
  orderBy?: MediaOrderByInput;

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

export { MediaFindManyArgs };
