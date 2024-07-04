import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchemaRegistryModule } from '@goopen/nestjs-schema-registry';
import { environment } from './environment/environment';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    PrometheusModule.register(),
    SchemaRegistryModule.register({
      isGlobal: true,
      host: environment.schemaRegistry.url,
      auth: {
        username: environment.schemaRegistry.username,
        password: environment.schemaRegistry.password,
      },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
