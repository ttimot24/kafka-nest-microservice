import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { environment } from './environment/environment';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const microservices = app.connectMicroservice<MicroserviceOptions>(
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

    await app.startAllMicroservices();

    await app.listen(3001);
}

bootstrap();
