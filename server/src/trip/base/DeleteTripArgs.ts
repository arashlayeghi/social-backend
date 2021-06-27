import { ArgsType, Field } from "@nestjs/graphql";
import { TripWhereUniqueInput } from "./TripWhereUniqueInput";

@ArgsType()
class DeleteTripArgs {
  @Field(() => TripWhereUniqueInput, { nullable: false })
  where!: TripWhereUniqueInput;
}

export { DeleteTripArgs };
