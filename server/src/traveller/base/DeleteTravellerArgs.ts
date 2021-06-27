import { ArgsType, Field } from "@nestjs/graphql";
import { TravellerWhereUniqueInput } from "./TravellerWhereUniqueInput";

@ArgsType()
class DeleteTravellerArgs {
  @Field(() => TravellerWhereUniqueInput, { nullable: false })
  where!: TravellerWhereUniqueInput;
}

export { DeleteTravellerArgs };
