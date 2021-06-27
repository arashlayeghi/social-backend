import { registerEnumType } from "@nestjs/graphql";

export enum EnumMediaType {
  Image = "Image",
  Video = "Video",
}

registerEnumType(EnumMediaType, {
  name: "EnumMediaType",
});
