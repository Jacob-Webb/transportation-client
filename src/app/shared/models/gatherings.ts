import { DayOfWeek } from "./day-of-week";
import { TimeSpan } from "./time";

export interface GatheringTemplateDto {
  dayOfWeek: DayOfWeek;
  timeOfDay: TimeSpan;
  language: string;
  driversNeeded: number;
  active: boolean;
}