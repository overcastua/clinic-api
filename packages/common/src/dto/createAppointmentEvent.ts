export class AppointmentCreatedEvent {
  readonly patientId: number;
  readonly doctorUserId: number;
  readonly date: Date;

  constructor(data?) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
