import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  TextField,
  ReferenceField,
  DateField,
} from "react-admin";
import Pagination from "../Components/Pagination";
import { POST_TITLE_FIELD } from "../post/PostTitle";

export const MediaList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"Medias"}
      perPage={50}
      pagination={<Pagination />}
    >
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
    </List>
  );
};
