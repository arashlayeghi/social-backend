import * as React from "react";
import { List, Datagrid, ListProps, TextField } from "react-admin";
import Pagination from "../Components/Pagination";

export const TravellerList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"Travellers"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show">
        <TextField label="Created At" source="_ca" />
        <TextField label="Email" source="email" />
        <TextField label="First Name" source="first_name" />
        <TextField label="ID" source="id" />
        <TextField label="Last Name" source="last_name" />
        <TextField label="Middle Name" source="middle_name" />
        <TextField label="Title" source="title" />
        <TextField label="Updated At" source="_lma" />
      </Datagrid>
    </List>
  );
};
