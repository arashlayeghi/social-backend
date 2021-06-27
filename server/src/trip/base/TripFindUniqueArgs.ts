import { ArgsType, Field } from "@nestjs/graphql";
import { TripWhereUniqueInput } from "./TripWhereUniqueInput";

@ArgsType()
class TripFindUniqueArgs {
  @Field(() => TripWhereUniqueInput, { nullable: false })
  where!: TripWhereUniqueInput;
}

export { TripFindUniqueArgs };
