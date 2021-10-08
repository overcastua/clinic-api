import { Controller, Get, Post, NotFoundException, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddToQueueDto } from './dto/add-to-queue.dto';
import { QueueService } from './queue.service';

@ApiTags('queue')
@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Get()
  @ApiOperation({ summary: 'Get the id of the first patient in the queue' })
  @ApiResponse({
    status: 200,
    description: 'Returns the id of the first patient in the queue',
    type: Number,
  })
  @ApiResponse({
    status: 404,
    description: 'The queue is empty',
  })
  async getIdOfFirst(): Promise<number> {
    const id: number = await this.queueService.getIdOfFirst();

    if (!id) throw new NotFoundException();

    return id;
  }

  @Post()
  @ApiOperation({ summary: 'Add a patient to the queue' })
  @ApiResponse({
    status: 201,
    description: 'Patient was added to the queue',
  })
  @ApiResponse({
    status: 404,
    description: 'Patient with the given id does not exist',
  })
  async add(@Body() dto: AddToQueueDto): Promise<void> {
    return this.queueService.add(dto);
  }

  @Get('next')
  @ApiOperation({ summary: 'Get the id of the next patient in the queue' })
  @ApiResponse({
    status: 200,
    description:
      'Deletes the current patient and returns the id of the next patient in the queue',
    type: Number,
  })
  @ApiResponse({
    status: 404,
    description: 'The queue is empty',
  })
  async deleteCurrentAndGetNewFirst(): Promise<number> {
    const id: number = await this.queueService.deleteCurrentAndGetNewFirst();

    if (!id) throw new NotFoundException();

    return id;
  }
}
