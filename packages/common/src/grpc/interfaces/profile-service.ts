import { Metadata } from '@grpc/grpc-js';
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

export interface IProfilesArray {
  profiles: IProfileEntity[];
}

export interface IProfileService {
  createProfile(
    request: CreateProfileDto,
    metadata?: Metadata,
  ): Observable<IEmpty>;
}

export interface IProfileServiceForClinic {
  getProfileByUserId(
    userId: { userId: number },
    metadata?: Metadata,
  ): Observable<IProfileEntity>;
  getProfileBatch(
    request: { users: number[] },
    metadata?: Metadata,
  ): Observable<IProfilesArray>;
}
