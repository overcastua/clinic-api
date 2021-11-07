export const jwtConstants = {
  secret: String(process.env.JWT_SECRET),
};

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
