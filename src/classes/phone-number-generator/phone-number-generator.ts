import { BadRequestException, Injectable } from "@nestjs/common";
import * as country from 'country-list-js';
import { ValidateService } from "src/services/validate/validate.service";
import { Metadata } from 'libphonenumber-js'

@Injectable()
export class PhoneNumberGenerator {
    constructor(private validateService: ValidateService) {}

    async generatePhoneNumbers(selectedCountry: string, quantity: number) {
        try {
            if(!quantity) throw new BadRequestException('Phone Numbers have not been provided.', { cause: new Error(), description: 'Phone Numbers have not been provided.'});
            const countryInformation = this.countryInfo(selectedCountry);
            const numbersList = this.generateNumberList(countryInformation, quantity);
            return await this.validateService.validate(numbersList);
        } catch(e) {
            return { data: e };
        }
    }

    private countryInfo(countryName: string) {
        return country.findByName(countryName);
    }

    private generateNumberList(countryInformation: any, quantity: number) {
        const metadata = new Metadata();
        metadata.selectNumberingPlan(countryInformation.code.iso2);
        const numberLength = metadata.numberingPlan.possibleLengths();

        const range = '0123456789';
        let result = ''
        let numberList = [];
        let constructDialingCode = '';

        for(let x = 0; x < quantity; x++) {
            for(let i = 0; i < numberLength[numberLength.length - 1] - 1; i++) {
                result += range.charAt(Math.floor(Math.random() * range.length));
            }
            
            constructDialingCode = countryInformation.dialing_code.substr(0, 1) === '+' ? countryInformation.dialing_code : `+${countryInformation.dialing_code}`
            numberList.push(`${constructDialingCode}${result}`);
            result = '';
            constructDialingCode = '';
        }

        return numberList;
    }
}
