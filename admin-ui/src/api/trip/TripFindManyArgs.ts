import { TripWhereInput } from "./TripWhereInput";
import { TripOrderByInput } from "./TripOrderByInput";

export type TripFindManyArgs = {
  where?: TripWhereInput;
  orderBy?: TripOrderByInput;
  skip?: number;
  take?: number;
};
