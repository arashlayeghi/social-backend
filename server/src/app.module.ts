import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { TravellerModule } from "./traveller/traveller.module";
import { TripModule } from "./trip/trip.module";
import { CommentModule } from "./comment/comment.module";
import { PostModule } from "./post/post.module";
import { LikeModule } from "./like/like.module";
import { MediaModule } from "./media/media.module";
import { GroupModule } from "./group/group.module";
import { GroupMemberModule } from "./groupMember/groupMember.module";
import { ACLModule } from "./auth/acl.module";
import { AuthModule } from "./auth/auth.module";
import { MorganModule } from "nest-morgan";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ServeStaticOptionsService } from "./serveStaticOptions.service";
import { GraphQLModule } from "@nestjs/graphql";

@Module({
  controllers: [],
  imports: [
    UserModule,
    TravellerModule,
    TripModule,
    CommentModule,
    PostModule,
    LikeModule,
    MediaModule,
    GroupModule,
    GroupMemberModule,
    ACLModule,
    AuthModule,
    MorganModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRootAsync({
      useClass: ServeStaticOptionsService,
    }),
    GraphQLModule.forRootAsync({
      useFactory: (configService) => {
        const playground = configService.get("GRAPHQL_PLAYGROUND");
        const introspection = configService.get("GRAPHQL_INTROSPECTION");
        return {
          autoSchemaFile: true,
          playground,
          introspection: playground || introspection,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  providers: [],
})
export class AppModule {}
