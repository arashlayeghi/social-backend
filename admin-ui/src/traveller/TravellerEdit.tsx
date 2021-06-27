import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  NumberInput,
  TextInput,
} from "react-admin";

export const TravellerEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <NumberInput step={1} label="Created At" source="_ca" />
        <TextInput label="Email" source="email" />
        <TextInput label="First Name" source="first_name" />
        <TextInput label="Last Name" source="last_name" />
        <TextInput label="Middle Name" source="middle_name" />
        <TextInput label="Title" source="title" />
        <NumberInput step={1} label="Updated At" source="_lma" />
      </SimpleForm>
    </Edit>
  );
};
