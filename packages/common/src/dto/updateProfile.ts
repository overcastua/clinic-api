enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
export class UpdateProfileDto {
  name: string;

  gender: Gender;

  birthDate: Date;

  constructor(dto: any) {
    this.name = dto?.name;
    this.gender = dto?.gender;
    this.birthDate = dto?.birthDate;
  }
}
