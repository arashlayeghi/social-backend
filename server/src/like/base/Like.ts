import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Traveller } from "../../traveller/base/Traveller";
import { ValidateNested, IsOptional, IsInt, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Post } from "../../post/base/Post";
@ObjectType()
class Like {
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
    type: () => Post,
  })
  @ValidateNested()
  @Type(() => Post)
  @IsOptional()
  post_id?: Post | null;

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
export { Like };
