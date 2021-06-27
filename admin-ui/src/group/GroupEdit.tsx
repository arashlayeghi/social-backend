import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  NumberInput,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";

import { TripTitle } from "../trip/TripTitle";

export const GroupEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <NumberInput step={1} label="Created At" source="_ca" />
        <TextInput label="Description" multiline source="description" />
        <NumberInput step={1} label="End Date" source="end_date" />
        <NumberInput step={1} label="Start Date" source="start_date" />
        <ReferenceInput source="trip.id" reference="Trip" label="tid">
          <SelectInput optionText={TripTitle} />
        </ReferenceInput>
        <NumberInput step={1} label="Updated At" source="_lma" />
      </SimpleForm>
    </Edit>
  );
};
