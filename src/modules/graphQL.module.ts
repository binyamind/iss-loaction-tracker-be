import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DynamicModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

export class GraphQLInitModule {
  static forRoot(): DynamicModule {
    return {
      module: GraphQLInitModule,
      imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          playground: true,
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          subscriptions: {
            'subscriptions-transport-ws': {
              path: '/graphql'
            } 
          },
          sortSchema: true,
          installSubscriptionHandlers: true,
        }),
      ],
    };
  }
}
