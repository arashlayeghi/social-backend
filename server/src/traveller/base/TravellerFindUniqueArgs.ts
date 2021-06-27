import { ArgsType, Field } from "@nestjs/graphql";
import { TravellerWhereUniqueInput } from "./TravellerWhereUniqueInput";

@ArgsType()
class TravellerFindUniqueArgs {
  @Field(() => TravellerWhereUniqueInput, { nullable: false })
  where!: TravellerWhereUniqueInput;
}

export { TravellerFindUniqueArgs };
