import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IssServiceModule } from './services/issServices/iss.service.module';
import { IssController } from './controllers/iss.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { IssResolver } from './controllers/iss.resolver';
import { GraphQLInitModule } from './modules/graphQL.module';

@Module({
  imports: [IssServiceModule.forRoot(), GraphQLInitModule.forRoot()],
  controllers: [AppController, IssController],
  providers: [AppService, IssResolver],
})
export class AppModule {}
