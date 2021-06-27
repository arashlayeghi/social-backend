import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { TravellerWhereUniqueInput } from "../../traveller/base/TravellerWhereUniqueInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
@InputType()
class CommentWhereInput {
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
  cid?: TravellerWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: StringNullableFilter,
  })
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  content?: StringNullableFilter;

  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  id?: StringFilter;
}
export { CommentWhereInput };
