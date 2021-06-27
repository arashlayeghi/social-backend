import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { TripWhereInput } from "./TripWhereInput";
import { Type } from "class-transformer";
import { TripOrderByInput } from "./TripOrderByInput";

@ArgsType()
class TripFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => TripWhereInput,
  })
  @Field(() => TripWhereInput, { nullable: true })
  @Type(() => TripWhereInput)
  where?: TripWhereInput;

  @ApiProperty({
    required: false,
    type: TripOrderByInput,
  })
  @Field(() => TripOrderByInput, { nullable: true })
  @Type(() => TripOrderByInput)
  orderBy?: TripOrderByInput;

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

export { TripFindManyArgs };
