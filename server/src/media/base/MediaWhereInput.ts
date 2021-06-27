import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { StringFilter } from "../../util/StringFilter";
import { Type } from "class-transformer";
import { IsOptional, ValidateNested, IsEnum } from "class-validator";
import { PostWhereUniqueInput } from "../../post/base/PostWhereUniqueInput";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { EnumMediaType } from "./EnumMediaType";
@InputType()
class MediaWhereInput {
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

  @ApiProperty({
    required: false,
    type: () => PostWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PostWhereUniqueInput)
  @IsOptional()
  @Field(() => PostWhereUniqueInput, {
    nullable: true,
  })
  post?: PostWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: StringNullableFilter,
  })
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  public_id?: StringNullableFilter;

  @ApiProperty({
    required: false,
    enum: EnumMediaType,
  })
  @IsEnum(EnumMediaType)
  @IsOptional()
  @Field(() => EnumMediaType, {
    nullable: true,
  })
  type?: "Image" | "Video";
}
export { MediaWhereInput };
