import { Controller, Get, Post, NotFoundException, Body } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AddToQueueDto } from './dto/add-to-queue.dto';
import { QueueService } from './queue.service';

@ApiTags('queue')
@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Get()
  @ApiOperation({ summary: 'Get the id of the first patient in the queue' })
  @ApiOkResponse({
    description: 'Returns the id of the first patient in the queue',
    type: Number,
  })
  @ApiNotFoundResponse({
    description: 'The queue is empty',
  })
  async getIdOfFirst(): Promise<number> {
    const id: number = await this.queueService.getIdOfFirst();

    if (!id) throw new NotFoundException();

    return id;
  }

  @Post()
  @ApiOperation({ summary: 'Add a patient to the queue' })
  @ApiCreatedResponse({
    description: 'Patient was added to the queue',
  })
  @ApiNotFoundResponse({
    description: 'Patient with the given id does not exist',
  })
  async add(@Body() dto: AddToQueueDto): Promise<void> {
    return this.queueService.add(dto);
  }

  @Get('next')
  @ApiOperation({ summary: 'Get the id of the next patient in the queue' })
  @ApiOkResponse({
    description:
      'Deletes the current patient and returns the id of the next patient in the queue',
    type: Number,
  })
  @ApiNotFoundResponse({
    description: 'The queue is empty',
  })
  async deleteCurrentAndGetNewFirst(): Promise<number> {
    const id: number = await this.queueService.deleteCurrentAndGetNewFirst();

    if (!id) throw new NotFoundException();

    return id;
  }
}
