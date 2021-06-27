import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Traveller } from "../../traveller/base/Traveller";
import { ValidateNested, IsOptional, IsString, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { Like } from "../../like/base/Like";
import { Media } from "../../media/base/Media";
@ObjectType()
class Post {
  @ApiProperty({
    required: false,
    type: () => Traveller,
  })
  @ValidateNested()
  @Type(() => Traveller)
  @IsOptional()
  cid?: Traveller | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  content!: string | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  _ca!: number | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: false,
    type: () => [Like],
  })
  @ValidateNested()
  @Type(() => Like)
  @IsOptional()
  likes?: Array<Like>;

  @ApiProperty({
    required: false,
    type: () => [Media],
  })
  @ValidateNested()
  @Type(() => Media)
  @IsOptional()
  medias?: Array<Media>;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  _lma!: number | null;
}
export { Post };
