import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ValidateService {
    async validate(phoneNumberList: any) {
        return await axios.post(`${process.env.SERVER_URL}/validate`, { phoneNumberList });
    }
}
