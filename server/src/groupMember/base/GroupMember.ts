import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Traveller } from "../../traveller/base/Traveller";
import {
  ValidateNested,
  IsOptional,
  IsInt,
  IsString,
  IsDate,
} from "class-validator";
import { Type } from "class-transformer";
import { Group } from "../../group/base/Group";
@ObjectType()
class GroupMember {
  @ApiProperty({
    required: false,
    type: () => Traveller,
  })
  @ValidateNested()
  @Type(() => Traveller)
  @IsOptional()
  cid?: Traveller | null;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  _ca!: number;

  @ApiProperty({
    required: false,
    type: () => Group,
  })
  @ValidateNested()
  @Type(() => Group)
  @IsOptional()
  group_id?: Group | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

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
export { GroupMember };
