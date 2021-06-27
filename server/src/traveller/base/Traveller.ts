import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Comment } from "../../comment/base/Comment";
import { ValidateNested, IsOptional, IsInt, IsString } from "class-validator";
import { Type } from "class-transformer";
import { GroupMember } from "../../groupMember/base/GroupMember";
import { Like } from "../../like/base/Like";
import { Post } from "../../post/base/Post";
import { Trip } from "../../trip/base/Trip";
@ObjectType()
class Traveller {
  @ApiProperty({
    required: false,
    type: () => [Comment],
  })
  @ValidateNested()
  @Type(() => Comment)
  @IsOptional()
  comments?: Array<Comment>;

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
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  email!: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  first_name!: string | null;

  @ApiProperty({
    required: false,
    type: () => [GroupMember],
  })
  @ValidateNested()
  @Type(() => GroupMember)
  @IsOptional()
  groupMembers?: Array<GroupMember>;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  last_name!: string | null;

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
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  middle_name!: string | null;

  @ApiProperty({
    required: false,
    type: () => [Post],
  })
  @ValidateNested()
  @Type(() => Post)
  @IsOptional()
  posts?: Array<Post>;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  title!: string | null;

  @ApiProperty({
    required: false,
    type: () => [Trip],
  })
  @ValidateNested()
  @Type(() => Trip)
  @IsOptional()
  trips?: Array<Trip>;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  _lma!: number;
}
export { Traveller };
