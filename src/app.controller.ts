import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { environment } from './environment/environment';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @EventPattern(environment.topic)
  public receiveIntersectionGeoJSON(@Payload() message: any) {

    this.appService.handleMessage(message);

  }
  
}
