import { TravellerWhereInput } from "./TravellerWhereInput";
import { TravellerOrderByInput } from "./TravellerOrderByInput";

export type TravellerFindManyArgs = {
  where?: TravellerWhereInput;
  orderBy?: TravellerOrderByInput;
  skip?: number;
  take?: number;
};
