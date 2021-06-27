import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsOptional, ValidateNested } from "class-validator";
import { GroupMember } from "../../groupMember/base/GroupMember";
import { Type } from "class-transformer";
import { Trip } from "../../trip/base/Trip";
@ObjectType()
class Group {
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  _ca!: number;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  description!: string | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  end_date!: number | null;

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
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  start_date!: number | null;

  @ApiProperty({
    required: false,
    type: () => Trip,
  })
  @ValidateNested()
  @Type(() => Trip)
  @IsOptional()
  tid?: Trip | null;

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
export { Group };
