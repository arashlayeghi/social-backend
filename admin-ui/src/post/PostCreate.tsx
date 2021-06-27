import * as React from "react";

import {
  Create,
  SimpleForm,
  CreateProps,
  ReferenceInput,
  SelectInput,
  TextInput,
  NumberInput,
} from "react-admin";

import { TravellerTitle } from "../traveller/TravellerTitle";

export const PostCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput source="traveller.id" reference="Traveller" label="cid">
          <SelectInput optionText={TravellerTitle} />
        </ReferenceInput>
        <TextInput label="content" multiline source="content" />
        <NumberInput step={1} label="Created At" source="_ca" />
        <NumberInput step={1} label="Updated At" source="_lma" />
      </SimpleForm>
    </Create>
  );
};
