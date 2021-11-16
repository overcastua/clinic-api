import { IEmpty } from './common';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export interface IClinicService {
  createPatient(
    request: { userId: number },
    metadata: Metadata,
  ): Observable<IEmpty>;
}
