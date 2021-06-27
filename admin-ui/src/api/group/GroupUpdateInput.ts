import { TripWhereUniqueInput } from "../trip/TripWhereUniqueInput";

export type GroupUpdateInput = {
  _ca?: number;
  description?: string | null;
  end_date?: number | null;
  start_date?: number | null;
  tid?: TripWhereUniqueInput | null;
  _lma?: number | null;
};
