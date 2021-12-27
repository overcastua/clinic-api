import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class KafkaController {
  @MessagePattern('notify.patient.create.appointment')
  notifyDoctorAppointmentCreated(@Payload() message: any): void {
    console.log(message.value);
  }
}
