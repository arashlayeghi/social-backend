import { ArgsType, Field } from "@nestjs/graphql";
import { TripWhereUniqueInput } from "./TripWhereUniqueInput";
import { TripUpdateInput } from "./TripUpdateInput";

@ArgsType()
class UpdateTripArgs {
  @Field(() => TripWhereUniqueInput, { nullable: false })
  where!: TripWhereUniqueInput;
  @Field(() => TripUpdateInput, { nullable: false })
  data!: TripUpdateInput;
}

export { UpdateTripArgs };
