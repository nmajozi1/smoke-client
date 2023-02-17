import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Countries } from './classes/countries/countries';
import { PhoneNumberGenerator } from './classes/phone-number-generator/phone-number-generator';
import { ValidateService } from './services/validate/validate.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, Countries, PhoneNumberGenerator, ValidateService],
})
export class AppModule {}
