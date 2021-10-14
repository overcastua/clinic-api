import { Controller, Get, Post, Param, UseGuards, Req } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Role } from '../users/dto/login-user.dto';
import { Roles } from '../users/users.roles.decorator';
import { RolesGuard } from '../users/users.roles.guard';
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
  async getIdOfFirst(@Param() params: QueueValidateDto): Promise<number> {
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
  async add(@Param() params: QueueValidateDto, @Req() req): Promise<void> {
    return this.queueService.add(params.queueId, req.user.patientId);
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
  async deleteCurrentAndGetNewFirst(
    @Param() params: QueueValidateDto,
  ): Promise<number> {
    return this.queueService.deleteCurrentAndGetNewFirst(params.queueId);
  }
}
