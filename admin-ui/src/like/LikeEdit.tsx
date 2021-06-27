import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  ReferenceInput,
  SelectInput,
  NumberInput,
} from "react-admin";
import { TravellerTitle } from "../traveller/TravellerTitle";
import { PostTitle } from "../post/PostTitle";

export const LikeEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <ReferenceInput source="traveller.id" reference="Traveller" label="cid">
          <SelectInput optionText={TravellerTitle} />
        </ReferenceInput>
        <NumberInput step={1} label="Created At" source="_ca" />
        <ReferenceInput source="post.id" reference="Post" label="Post ID">
          <SelectInput optionText={PostTitle} />
        </ReferenceInput>
        <NumberInput step={1} label="Updated At" source="_lma" />
      </SimpleForm>
    </Edit>
  );
};
