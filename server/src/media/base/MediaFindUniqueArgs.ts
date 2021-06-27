import { ArgsType, Field } from "@nestjs/graphql";
import { MediaWhereUniqueInput } from "./MediaWhereUniqueInput";

@ArgsType()
class MediaFindUniqueArgs {
  @Field(() => MediaWhereUniqueInput, { nullable: false })
  where!: MediaWhereUniqueInput;
}

export { MediaFindUniqueArgs };
