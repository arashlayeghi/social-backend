import * as React from "react";

import {
  Create,
  SimpleForm,
  CreateProps,
  ReferenceInput,
  SelectInput,
  NumberInput,
  TextInput,
  DateTimeInput,
} from "react-admin";

import { TravellerTitle } from "../traveller/TravellerTitle";

export const TripCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput source="traveller.id" reference="Traveller" label="cid">
          <SelectInput optionText={TravellerTitle} />
        </ReferenceInput>
        <NumberInput step={1} label="Created At" source="_ca" />
        <TextInput label="Status" source="status" />
        <DateTimeInput label="Updated At" source="_lma" disabled />
        <TextInput label="User IP" source="userIp" />
      </SimpleForm>
    </Create>
  );
};
