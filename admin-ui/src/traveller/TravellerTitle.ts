import { Traveller as TTraveller } from "../api/traveller/Traveller";

export const TRAVELLER_TITLE_FIELD = "first_name";

export const TravellerTitle = (record: TTraveller) => {
  return record.first_name;
};
