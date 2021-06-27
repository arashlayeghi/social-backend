import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  ReferenceField,
  TextField,
} from "react-admin";
import Pagination from "../Components/Pagination";
import { TRAVELLER_TITLE_FIELD } from "../traveller/TravellerTitle";
import { POST_TITLE_FIELD } from "../post/PostTitle";

export const LikeList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"Likes"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show">
        <ReferenceField label="cid" source="traveller.id" reference="Traveller">
          <TextField source={TRAVELLER_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="Created At" source="_ca" />
        <TextField label="ID" source="id" />
        <ReferenceField label="Post ID" source="post.id" reference="Post">
          <TextField source={POST_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="Updated At" source="_lma" />
      </Datagrid>
    </List>
  );
};
