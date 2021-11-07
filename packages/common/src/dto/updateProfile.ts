enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
export class UpdateProfileDto {
  readonly name: string;

  readonly gender: Gender;

  readonly birthDate: Date;

  constructor(dto: any) {
    this.name = dto?.name;
    this.gender = dto?.gender;
    this.birthDate = dto?.birthDate;
  }
}
