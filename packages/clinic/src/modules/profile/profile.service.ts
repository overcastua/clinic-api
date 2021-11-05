import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProfileService {
  constructor(private axios: HttpService, private config: ConfigService) {}

  async getProfile(userId: number) {
    const getProfileURI =
      'http://' +
      this.config.get('URI.profile') +
      '/' +
      this.config.get('prefix') +
      '/profiles/user/' +
      userId;

    return (await lastValueFrom(this.axios.get(getProfileURI))).data;
  }

  async getManyProfiles(users: number[]) {
    const getProfilesURI =
      'http://' +
      this.config.get('URI.profile') +
      '/' +
      this.config.get('prefix') +
      '/profiles?users=' +
      JSON.stringify(users);
    return (await lastValueFrom(this.axios.get(getProfilesURI))).data;
  }
}
