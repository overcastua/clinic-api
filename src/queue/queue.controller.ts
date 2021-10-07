import { Controller, Get, Post, NotFoundException, Body } from '@nestjs/common';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Get()
  async getIdOfFirst(): Promise<number> {
    const id = await this.queueService.getIdOfFirst();

    if (!id) throw new NotFoundException();

    return id;
  }

  @Post()
  async add(@Body('name') name: string): Promise<void> {
    return this.queueService.add(name);
  }

  @Get('next')
  async deleteCurrentAndGetNewFirst(): Promise<number> {
    const id = await this.queueService.deleteCurrentAndGetNewFirst();

    if (!id) throw new NotFoundException();

    return id;
  }
}
