import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseArrayOfNumbersPipe implements PipeTransform {
  transform(value: string): number[] {
    try {
      const arr = JSON.parse(value);
      if (Array.isArray(arr)) {
        return arr;
      }
    } catch (err) {}
    throw new BadRequestException('Invalid data, array expected');
  }
}
