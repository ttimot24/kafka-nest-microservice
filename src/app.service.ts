import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

    public handleMessage(message: any) {
        console.log(message);
    }

}
