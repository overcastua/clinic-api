import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClinicService {
  constructor(private axios: HttpService, private config: ConfigService) {}

  async createPatient(userId: number): Promise<void> {
    const createPatientURI =
      'http://' +
      this.config.get('URI.clinic') +
      '/' +
      this.config.get('prefix') +
      '/patients';

    this.axios.post(createPatientURI, { userId: String(userId) }).subscribe();
  }
}
