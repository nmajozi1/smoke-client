import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ValidateService {
    async validate(phoneNumberList: string[]): Promise<any> {
        try {
            return await axios.post(`${process.env.SERVER_URL}/validate`, { phoneNumberList });
        } catch (e) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Failed to validate the phone numbers.',
            }, HttpStatus.FORBIDDEN, {
                cause: e
             });
        }
    }
}
