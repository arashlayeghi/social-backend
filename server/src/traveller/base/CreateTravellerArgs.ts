import { ArgsType, Field } from "@nestjs/graphql";
import { TravellerCreateInput } from "./TravellerCreateInput";

@ArgsType()
class CreateTravellerArgs {
  @Field(() => TravellerCreateInput, { nullable: false })
  data!: TravellerCreateInput;
}

export { CreateTravellerArgs };
