import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ShowProps,
  ReferenceField,
  TextField,
} from "react-admin";
import { TRAVELLER_TITLE_FIELD } from "../traveller/TravellerTitle";
import { POST_TITLE_FIELD } from "../post/PostTitle";

export const LikeShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <ReferenceField label="cid" source="traveller.id" reference="Traveller">
          <TextField source={TRAVELLER_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="Created At" source="_ca" />
        <TextField label="ID" source="id" />
        <ReferenceField label="Post ID" source="post.id" reference="Post">
          <TextField source={POST_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="Updated At" source="_lma" />
      </SimpleShowLayout>
    </Show>
  );
};
