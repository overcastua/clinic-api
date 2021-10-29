enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
export class CreateProfileDto {
  name: string;

  gender: Gender;

  birthDate: Date;

  userId: number;

  constructor(dto: any, userId: number) {
    this.name = dto?.name;
    this.gender = dto?.gender;
    this.birthDate = dto?.birthDate;
    this.userId = userId;
  }
}
