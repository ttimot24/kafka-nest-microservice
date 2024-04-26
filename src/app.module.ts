import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'kafka-registrar',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'consumer-1',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'kafka-nest-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
