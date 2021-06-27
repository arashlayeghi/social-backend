import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsString,
  ValidateNested,
  IsOptional,
  IsEnum,
  IsDate,
} from "class-validator";
import { Post } from "../../post/base/Post";
import { Type } from "class-transformer";
import { EnumMediaType } from "./EnumMediaType";
@ObjectType()
class Media {
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  _ca!: number;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: false,
    type: () => Post,
  })
  @ValidateNested()
  @Type(() => Post)
  @IsOptional()
  post?: Post | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  public_id!: string | null;

  @ApiProperty({
    required: false,
    enum: EnumMediaType,
  })
  @IsEnum(EnumMediaType)
  @IsOptional()
  @Field(() => EnumMediaType, {
    nullable: true,
  })
  type?: "Image" | "Video" | null;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  _lma!: Date | null;
}
export { Media };
