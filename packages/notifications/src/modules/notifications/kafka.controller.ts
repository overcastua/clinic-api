import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Message } from 'kafkajs';
import { AppointmentCreatedEvent } from '@repos/common';

@Controller()
export class KafkaController {
  @MessagePattern('notify.patient.create.appointment')
  notifyDoctorAppointmentCreated(@Payload() message: Message): void {
    const event = new AppointmentCreatedEvent(message.value);
  }
}
