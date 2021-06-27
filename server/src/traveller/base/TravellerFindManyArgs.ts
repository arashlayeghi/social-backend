import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { TravellerWhereInput } from "./TravellerWhereInput";
import { Type } from "class-transformer";
import { TravellerOrderByInput } from "./TravellerOrderByInput";

@ArgsType()
class TravellerFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => TravellerWhereInput,
  })
  @Field(() => TravellerWhereInput, { nullable: true })
  @Type(() => TravellerWhereInput)
  where?: TravellerWhereInput;

  @ApiProperty({
    required: false,
    type: TravellerOrderByInput,
  })
  @Field(() => TravellerOrderByInput, { nullable: true })
  @Type(() => TravellerOrderByInput)
  orderBy?: TravellerOrderByInput;

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

export { TravellerFindManyArgs };
