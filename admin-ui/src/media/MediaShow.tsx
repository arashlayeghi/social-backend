import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ShowProps,
  TextField,
  ReferenceField,
  DateField,
} from "react-admin";
import { POST_TITLE_FIELD } from "../post/PostTitle";

export const MediaShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField label="Created At" source="_ca" />
        <TextField label="ID" source="id" />
        <ReferenceField label="Post ID" source="post.id" reference="Post">
          <TextField source={POST_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="Public ID" source="public_id" />
        <TextField label="Type" source="type" />
        <DateField source="_lma" label="Updated At" />
      </SimpleShowLayout>
    </Show>
  );
};
