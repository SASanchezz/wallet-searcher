export class DateUtils {
  static unixToDateString(unix: number): string {
    return new Date(unix * 1000).toLocaleString();
  }
}