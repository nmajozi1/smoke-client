import { Injectable } from "@nestjs/common";
import * as countries from 'country-list-js';

@Injectable()
export class Countries {
    async getCountryList() {
        const countryList = countries.ls('name')
        .sort()
        .map(country => ({
            value: country,
            country
        }));

        return countryList;
    }
}
