import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';


@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @EventPattern('/* Topic name */')
  public receiveIntersectionGeoJSON(@Payload() message: any) {

    console.log(message);

    return message;
  }
  
}
