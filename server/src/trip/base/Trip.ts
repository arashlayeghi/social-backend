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
class Trip {
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
    required: false,
    type: () => [Group],
  })
  @ValidateNested()
  @Type(() => Group)
  @IsOptional()
  groups?: Array<Group>;

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
  status!: string | null;

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

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  userIp!: string | null;
}
export { Trip };
