import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { TravellerWhereUniqueInput } from "../../traveller/base/TravellerWhereUniqueInput";
import { ValidateNested, IsOptional, IsInt, IsDate } from "class-validator";
import { Type } from "class-transformer";
import { GroupWhereUniqueInput } from "../../group/base/GroupWhereUniqueInput";
@InputType()
class GroupMemberUpdateInput {
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
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  _ca?: number;

  @ApiProperty({
    required: false,
    type: () => GroupWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => GroupWhereUniqueInput)
  @IsOptional()
  @Field(() => GroupWhereUniqueInput, {
    nullable: true,
  })
  group_id?: GroupWhereUniqueInput | null;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  _lma?: Date | null;
}
export { GroupMemberUpdateInput };
