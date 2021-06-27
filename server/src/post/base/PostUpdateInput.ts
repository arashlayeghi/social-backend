import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { TravellerWhereUniqueInput } from "../../traveller/base/TravellerWhereUniqueInput";
import { ValidateNested, IsOptional, IsString, IsInt } from "class-validator";
import { Type } from "class-transformer";
@InputType()
class PostUpdateInput {
  @ApiProperty({
    required: false,
    type: () => TravellerWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => TravellerWhereUniqueInput)
  @IsOptional()
  @Field(() => TravellerWhereUniqueInput, {
    nullable: true,
  })
  cid?: TravellerWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  content?: string | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  _ca?: number | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  _lma?: number | null;
}
export { PostUpdateInput };
