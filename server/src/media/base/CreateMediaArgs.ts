import { ArgsType, Field } from "@nestjs/graphql";
import { MediaCreateInput } from "./MediaCreateInput";

@ArgsType()
class CreateMediaArgs {
  @Field(() => MediaCreateInput, { nullable: false })
  data!: MediaCreateInput;
}

export { CreateMediaArgs };
