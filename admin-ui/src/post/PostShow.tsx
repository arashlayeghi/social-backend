import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  ReferenceField,
  TextField,
  ReferenceManyField,
  Datagrid,
  DateField,
} from "react-admin";

import { TRAVELLER_TITLE_FIELD } from "../traveller/TravellerTitle";
import { POST_TITLE_FIELD } from "./PostTitle";

export const PostShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <ReferenceField label="cid" source="traveller.id" reference="Traveller">
          <TextField source={TRAVELLER_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="content" source="content" />
        <TextField label="Created At" source="_ca" />
        <TextField label="ID" source="id" />
        <TextField label="Updated At" source="_lma" />
        <ReferenceManyField reference="Like" target="PostId" label="Likes">
          <Datagrid rowClick="show">
            <ReferenceField
              label="cid"
              source="traveller.id"
              reference="Traveller"
            >
              <TextField source={TRAVELLER_TITLE_FIELD} />
            </ReferenceField>
            <TextField label="Created At" source="_ca" />
            <TextField label="ID" source="id" />
            <ReferenceField label="Post ID" source="post.id" reference="Post">
              <TextField source={POST_TITLE_FIELD} />
            </ReferenceField>
            <TextField label="Updated At" source="_lma" />
          </Datagrid>
        </ReferenceManyField>
        <ReferenceManyField reference="Media" target="PostId" label="Medias">
          <Datagrid rowClick="show">
            <TextField label="Created At" source="_ca" />
            <TextField label="ID" source="id" />
            <ReferenceField label="Post ID" source="post.id" reference="Post">
              <TextField source={POST_TITLE_FIELD} />
            </ReferenceField>
            <TextField label="Public ID" source="public_id" />
            <TextField label="Type" source="type" />
            <DateField source="_lma" label="Updated At" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
