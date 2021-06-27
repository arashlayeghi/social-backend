import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  TextField,
  ReferenceManyField,
  Datagrid,
  ReferenceField,
  DateField,
} from "react-admin";

import { TRAVELLER_TITLE_FIELD } from "./TravellerTitle";
import { GROUP_TITLE_FIELD } from "../group/GroupTitle";
import { POST_TITLE_FIELD } from "../post/PostTitle";

export const TravellerShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField label="Created At" source="_ca" />
        <TextField label="Email" source="email" />
        <TextField label="First Name" source="first_name" />
        <TextField label="ID" source="id" />
        <TextField label="Last Name" source="last_name" />
        <TextField label="Middle Name" source="middle_name" />
        <TextField label="Title" source="title" />
        <TextField label="Updated At" source="_lma" />
        <ReferenceManyField
          reference="Comment"
          target="TravellerId"
          label="Comments"
        >
          <Datagrid rowClick="show">
            <ReferenceField
              label="cid"
              source="traveller.id"
              reference="Traveller"
            >
              <TextField source={TRAVELLER_TITLE_FIELD} />
            </ReferenceField>
            <TextField label="content" source="content" />
            <TextField label="Created At" source="_ca" />
            <TextField label="ID" source="id" />
            <TextField label="Updated At" source="_lma" />
          </Datagrid>
        </ReferenceManyField>
        <ReferenceManyField
          reference="GroupMember"
          target="TravellerId"
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
        <ReferenceManyField reference="Like" target="TravellerId" label="Likes">
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
        <ReferenceManyField reference="Post" target="TravellerId" label="Posts">
          <Datagrid rowClick="show">
            <ReferenceField
              label="cid"
              source="traveller.id"
              reference="Traveller"
            >
              <TextField source={TRAVELLER_TITLE_FIELD} />
            </ReferenceField>
            <TextField label="content" source="content" />
            <TextField label="Created At" source="_ca" />
            <TextField label="ID" source="id" />
            <TextField label="Updated At" source="_lma" />
          </Datagrid>
        </ReferenceManyField>
        <ReferenceManyField reference="Trip" target="TravellerId" label="Trips">
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
            <TextField label="Status" source="status" />
            <DateField source="_lma" label="Updated At" />
            <TextField label="User IP" source="userIp" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
