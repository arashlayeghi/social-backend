import { Trip as TTrip } from "../api/trip/Trip";

export const TRIP_TITLE_FIELD = "status";

export const TripTitle = (record: TTrip) => {
  return record.status;
};
