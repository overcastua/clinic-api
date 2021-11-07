enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
export class CreateProfileDto {
  readonly name: string;

  readonly gender: Gender;

  readonly birthDate: Date;

  readonly userId: number;

  constructor(dto: any, userId: number) {
    this.name = dto?.name;
    this.gender = dto?.gender;
    this.birthDate = dto?.birthDate;
    this.userId = userId;
  }
}
