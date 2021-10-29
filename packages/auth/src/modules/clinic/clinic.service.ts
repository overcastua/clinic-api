import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateProfileDto } from '@repos/common';

@Injectable()
export class ClinicService {
  constructor(private axios: HttpService, private config: ConfigService) {}

  async createPatient(patientDto: CreateProfileDto): Promise<void> {
    const createPatientURI =
      'http://' +
      this.config.get('URI.clinic') +
      '/' +
      this.config.get('prefix') +
      '/patients';

    this.axios.post(createPatientURI, patientDto).subscribe();
  }
}
