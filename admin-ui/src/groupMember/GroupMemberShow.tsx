import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ShowProps,
  ReferenceField,
  TextField,
  DateField,
} from "react-admin";
import { TRAVELLER_TITLE_FIELD } from "../traveller/TravellerTitle";
import { GROUP_TITLE_FIELD } from "../group/GroupTitle";

export const GroupMemberShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <ReferenceField label="cid" source="traveller.id" reference="Traveller">
          <TextField source={TRAVELLER_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="Created At" source="_ca" />
        <ReferenceField label="Group ID" source="group.id" reference="Group">
          <TextField source={GROUP_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="ID" source="id" />
        <DateField source="_lma" label="Updated At" />
      </SimpleShowLayout>
    </Show>
  );
};
