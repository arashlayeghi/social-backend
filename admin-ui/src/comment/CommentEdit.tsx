import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  ReferenceInput,
  SelectInput,
  TextInput,
  NumberInput,
} from "react-admin";

import { TravellerTitle } from "../traveller/TravellerTitle";

export const CommentEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <ReferenceInput source="traveller.id" reference="Traveller" label="cid">
          <SelectInput optionText={TravellerTitle} />
        </ReferenceInput>
        <TextInput label="content" multiline source="content" />
        <NumberInput step={1} label="Created At" source="_ca" />
        <NumberInput step={1} label="Updated At" source="_lma" />
      </SimpleForm>
    </Edit>
  );
};
