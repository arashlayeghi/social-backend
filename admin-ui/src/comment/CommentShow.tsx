import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ShowProps,
  ReferenceField,
  TextField,
} from "react-admin";
import { TRAVELLER_TITLE_FIELD } from "../traveller/TravellerTitle";

export const CommentShow = (props: ShowProps): React.ReactElement => {
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
      </SimpleShowLayout>
    </Show>
  );
};
