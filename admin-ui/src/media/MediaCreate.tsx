import * as React from "react";

import {
  Create,
  SimpleForm,
  CreateProps,
  NumberInput,
  ReferenceInput,
  SelectInput,
  TextInput,
  DateTimeInput,
} from "react-admin";

import { PostTitle } from "../post/PostTitle";

export const MediaCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <NumberInput step={1} label="Created At" source="_ca" />
        <ReferenceInput source="post.id" reference="Post" label="Post ID">
          <SelectInput optionText={PostTitle} />
        </ReferenceInput>
        <TextInput label="Public ID" source="public_id" />
        <SelectInput
          source="type"
          label="Type"
          choices={[
            { label: "Image", value: "Image" },
            { label: "Video", value: "Video" },
          ]}
          optionText="label"
          allowEmpty
          optionValue="value"
        />
        <DateTimeInput label="Updated At" source="_lma" disabled />
      </SimpleForm>
    </Create>
  );
};
