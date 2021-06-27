import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsOptional, ValidateNested } from "class-validator";
import { TripWhereUniqueInput } from "../../trip/base/TripWhereUniqueInput";
import { Type } from "class-transformer";
@InputType()
class GroupCreateInput {
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
  description?: string | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  end_date?: number | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  start_date?: number | null;

  @ApiProperty({
    required: false,
    type: () => TripWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => TripWhereUniqueInput)
  @IsOptional()
  @Field(() => TripWhereUniqueInput, {
    nullable: true,
  })
  tid?: TripWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  _lma?: number | null;
}
export { GroupCreateInput };
