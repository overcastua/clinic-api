import { Controller, Get, Post, Param, UseGuards, Req } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard, Role, Roles, RolesGuard } from '@repos/common';
import { QueueValidateDto } from './dto/validate-params.dto';
import { QueueService } from './queue.service';

@ApiTags('queues')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('queues')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Get(':queueId')
  @Roles(Role.DOCTOR)
  @ApiOperation({ summary: 'Get the id of the first patient in the queue' })
  @ApiOkResponse({
    description: 'Returns the id of the first patient in the queue',
    type: Number,
  })
  @ApiNotFoundResponse({
    description: 'The queue is empty',
  })
  @ApiForbiddenResponse({
    description: 'You dont have permission to access the route',
  })
  async getIdOfFirst(@Param() params: QueueValidateDto): Promise<number> {
    console.log(params.queueId);
    return this.queueService.getIdOfFirst(params.queueId);
  }

  @Post(':queueId')
  @Roles(Role.PATIENT)
  @ApiOperation({ summary: 'Add a patient to the queue' })
  @ApiCreatedResponse({
    description: 'Patient was added to the queue',
  })
  @ApiNotFoundResponse({
    description: 'Patient with the given id does not exist',
  })
  @ApiForbiddenResponse({
    description: 'You dont have permission to access the route',
  })
  async add(@Param() params: QueueValidateDto, @Req() req): Promise<void> {
    return this.queueService.add(params.queueId, req.user.userId);
  }

  @Get(':queueId/next')
  @Roles(Role.DOCTOR)
  @ApiOperation({ summary: 'Get the id of the next patient in the queue' })
  @ApiOkResponse({
    description:
      'Deletes the current patient and returns the id of the next patient in the queue',
    type: Number,
  })
  @ApiNotFoundResponse({
    description: 'The queue is empty',
  })
  @ApiForbiddenResponse({
    description: 'You dont have permission to access the route',
  })
  async deleteCurrentAndGetNewFirst(
    @Param() params: QueueValidateDto,
  ): Promise<number> {
    return this.queueService.deleteCurrentAndGetNewFirst(params.queueId);
  }
}
