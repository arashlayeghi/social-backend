import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  ReferenceField,
  TextField,
  DateField,
  ReferenceManyField,
  Datagrid,
} from "react-admin";

import { TRIP_TITLE_FIELD } from "./TripTitle";
import { TRAVELLER_TITLE_FIELD } from "../traveller/TravellerTitle";

export const TripShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <ReferenceField label="cid" source="traveller.id" reference="Traveller">
          <TextField source={TRAVELLER_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="Created At" source="_ca" />
        <TextField label="ID" source="id" />
        <TextField label="Status" source="status" />
        <DateField source="_lma" label="Updated At" />
        <TextField label="User IP" source="userIp" />
        <ReferenceManyField reference="Group" target="TripId" label="Groups">
          <Datagrid rowClick="show">
            <TextField label="Created At" source="_ca" />
            <TextField label="Description" source="description" />
            <TextField label="End Date" source="end_date" />
            <TextField label="ID" source="id" />
            <TextField label="Start Date" source="start_date" />
            <ReferenceField label="tid" source="trip.id" reference="Trip">
              <TextField source={TRIP_TITLE_FIELD} />
            </ReferenceField>
            <TextField label="Updated At" source="_lma" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
