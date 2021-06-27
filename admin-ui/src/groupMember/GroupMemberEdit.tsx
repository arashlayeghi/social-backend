import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  ReferenceInput,
  SelectInput,
  NumberInput,
  DateTimeInput,
} from "react-admin";

import { TravellerTitle } from "../traveller/TravellerTitle";
import { GroupTitle } from "../group/GroupTitle";

export const GroupMemberEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <ReferenceInput source="traveller.id" reference="Traveller" label="cid">
          <SelectInput optionText={TravellerTitle} />
        </ReferenceInput>
        <NumberInput step={1} label="Created At" source="_ca" />
        <ReferenceInput source="group.id" reference="Group" label="Group ID">
          <SelectInput optionText={GroupTitle} />
        </ReferenceInput>
        <DateTimeInput label="Updated At" source="_lma" disabled />
      </SimpleForm>
    </Edit>
  );
};
