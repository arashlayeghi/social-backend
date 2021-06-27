import { ArgsType, Field } from "@nestjs/graphql";
import { TripCreateInput } from "./TripCreateInput";

@ArgsType()
class CreateTripArgs {
  @Field(() => TripCreateInput, { nullable: false })
  data!: TripCreateInput;
}

export { CreateTripArgs };
