import { ArgsType, Field } from "@nestjs/graphql";
import { TravellerWhereUniqueInput } from "./TravellerWhereUniqueInput";
import { TravellerUpdateInput } from "./TravellerUpdateInput";

@ArgsType()
class UpdateTravellerArgs {
  @Field(() => TravellerWhereUniqueInput, { nullable: false })
  where!: TravellerWhereUniqueInput;
  @Field(() => TravellerUpdateInput, { nullable: false })
  data!: TravellerUpdateInput;
}

export { UpdateTravellerArgs };
