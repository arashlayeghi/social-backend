import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  ReferenceField,
  TextField,
  DateField,
} from "react-admin";
import Pagination from "../Components/Pagination";
import { TRAVELLER_TITLE_FIELD } from "../traveller/TravellerTitle";
import { GROUP_TITLE_FIELD } from "../group/GroupTitle";

export const GroupMemberList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"Group Members"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show">
        <ReferenceField label="cid" source="traveller.id" reference="Traveller">
          <TextField source={TRAVELLER_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="Created At" source="_ca" />
        <ReferenceField label="Group ID" source="group.id" reference="Group">
          <TextField source={GROUP_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="ID" source="id" />
        <DateField source="_lma" label="Updated At" />
      </Datagrid>
    </List>
  );
};
