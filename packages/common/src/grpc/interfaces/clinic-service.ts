import { IEmpty } from './common';
import { Observable } from 'rxjs';

export interface IClinicService {
  createPatient(request: { userId: number }): Observable<IEmpty>;
}
