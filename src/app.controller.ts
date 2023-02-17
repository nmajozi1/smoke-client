import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { Countries } from './classes/countries/countries';
import { PhoneNumberGenerator } from './classes/phone-number-generator/phone-number-generator';

@Controller()
export class AppController {
  constructor(private countries: Countries, private phoneNumberGenerator: PhoneNumberGenerator) {}

  @Get()
  @Render('index')
  async root() {
    const countryList = await this.countries.getCountryList();

    return { countryList };
  }

  @Post('submit')
  async submitForm(@Body() selectedCountry: any) {
    const response = await this.phoneNumberGenerator.generatePhoneNumbers(selectedCountry.selected, selectedCountry.quantity);
    return { message: response.data.message }
  }
  
}
