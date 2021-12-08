import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class MaintenanceController {
  @Get()
  health(): number[] {
    const arr: number[] = [];
    for (let i = 0; i < 10; i++) {
      arr.push(i);
    }

    return arr;
  }
}
