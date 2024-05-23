import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { environment } from './environment/environment';
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';
import { InjectSchemaRegistry } from '@goopen/nestjs-schema-registry';
import *  as RxJs from 'rxjs';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService, @InjectSchemaRegistry() private readonly schemaRegistry: SchemaRegistry) {}

  @EventPattern(environment.kafka.topic)
  public receiveIntersectionGeoJSON(@Payload() record: any) {

    RxJs.from(this.schemaRegistry.decode(record)).subscribe(message => {
      this.appService.handleMessage(message);
    });

  }
  
}
