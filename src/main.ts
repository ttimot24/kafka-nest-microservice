import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { environment } from './environment/environment';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: `consumer-${uuidv4()}`,
            brokers: environment.kafka.brokers,
          },
          consumer: {
            groupId: environment.kafka.groupId,
            allowAutoTopicCreation: true,
          },
        },
      },
    );
    app.listen();
}

bootstrap();
