import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(value: string): Date {
    if (isValidDate(value)) {
      return new Date(value);
    } else
      throw new BadRequestException('Invalid date format, YYYY-MM-DD expected');
  }
}

function isValidDate(dateString: string): boolean {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;

  return dateString.match(regEx) != null;
}
