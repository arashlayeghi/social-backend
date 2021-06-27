import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  TextField,
  ReferenceField,
} from "react-admin";
import Pagination from "../Components/Pagination";
import { TRIP_TITLE_FIELD } from "../trip/TripTitle";

export const GroupList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"Groups"}
      perPage={50}
      pagination={<Pagination />}
    >
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
    </List>
  );
};
