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
}
