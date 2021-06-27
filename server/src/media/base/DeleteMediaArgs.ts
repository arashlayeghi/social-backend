import { ArgsType, Field } from "@nestjs/graphql";
import { MediaWhereUniqueInput } from "./MediaWhereUniqueInput";

@ArgsType()
class DeleteMediaArgs {
  @Field(() => MediaWhereUniqueInput, { nullable: false })
  where!: MediaWhereUniqueInput;
}

export { DeleteMediaArgs };
