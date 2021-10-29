import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateProfileDto } from '@repos/common';

@Injectable()
export class ProfileService {
  constructor(private axios: HttpService, private config: ConfigService) {}

  async createProfile(profileDto: CreateProfileDto): Promise<void> {
    const createProfileURI =
      'http://' +
      this.config.get('URI.profile') +
      '/' +
      this.config.get('prefix') +
      '/profiles';
    console.log(createProfileURI);

    this.axios.post(createProfileURI, profileDto).subscribe();
  }
}
