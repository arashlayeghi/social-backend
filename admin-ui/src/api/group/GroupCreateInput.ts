import { TripWhereUniqueInput } from "../trip/TripWhereUniqueInput";

export type GroupCreateInput = {
  _ca: number;
  description?: string | null;
  end_date?: number | null;
  start_date?: number | null;
  tid?: TripWhereUniqueInput | null;
  _lma?: number | null;
};
