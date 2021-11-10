import { Observable } from 'rxjs';
import { CreateProfileDto } from '../../dto/createProfile';
import { IEmpty } from './common';

export interface IProfileEntity {
  id: number;
  name: string;
  gender: string;
  birthDate: Date;
  image: string;
  userId: number;
}

export interface IProfileService {
  createProfile(request: CreateProfileDto): Observable<IEmpty>;
}

export interface IProfileServiceForClinic {
  getProfileByUserId(userId: { userId: number }): Observable<IProfileEntity>;
  getProfileBatch(request: {
    users: number[];
  }): Observable<{ profiles: IProfileEntity[] }>;
}
