import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  TextField,
  ReferenceField,
  ReferenceManyField,
  Datagrid,
  DateField,
} from "react-admin";

import { TRAVELLER_TITLE_FIELD } from "../traveller/TravellerTitle";
import { GROUP_TITLE_FIELD } from "./GroupTitle";
import { TRIP_TITLE_FIELD } from "../trip/TripTitle";

export const GroupShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField label="Created At" source="_ca" />
        <TextField label="Description" source="description" />
        <TextField label="End Date" source="end_date" />
        <TextField label="ID" source="id" />
        <TextField label="Start Date" source="start_date" />
        <ReferenceField label="tid" source="trip.id" reference="Trip">
          <TextField source={TRIP_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="Updated At" source="_lma" />
        <ReferenceManyField
          reference="GroupMember"
          target="GroupId"
          label="Group Members"
        >
          <Datagrid rowClick="show">
            <ReferenceField
              label="cid"
              source="traveller.id"
              reference="Traveller"
            >
              <TextField source={TRAVELLER_TITLE_FIELD} />
            </ReferenceField>
            <TextField label="Created At" source="_ca" />
            <ReferenceField
              label="Group ID"
              source="group.id"
              reference="Group"
            >
              <TextField source={GROUP_TITLE_FIELD} />
            </ReferenceField>
            <TextField label="ID" source="id" />
            <DateField source="_lma" label="Updated At" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
