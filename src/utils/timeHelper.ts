import { ResolutionsEntity } from 'src/resolutions/resolutions.entity';

export class TimeHelper {
  static minToMs(min: number): number {
    return min * 60 * 1000;
  }

  static hoursToMs(hours: number): number {
    return hours * 3600000;
  }

  static now(): number {
    return Date.now();
  }

  static filterOutdated(array: ResolutionsEntity[]): ResolutionsEntity[] {
    return array.filter(
      (res: ResolutionsEntity) => Number(res.expires_in) > TimeHelper.now(),
    );
  }
}
