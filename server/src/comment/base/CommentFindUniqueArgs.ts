import { ArgsType, Field } from "@nestjs/graphql";
import { CommentWhereUniqueInput } from "./CommentWhereUniqueInput";

@ArgsType()
class CommentFindUniqueArgs {
  @Field(() => CommentWhereUniqueInput, { nullable: false })
  where!: CommentWhereUniqueInput;
}

export { CommentFindUniqueArgs };
