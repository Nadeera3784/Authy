import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-facebook";
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../../auth/services/auth.service';
import { Providers } from '../../auth/enums/providers.enum';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {
    super({
      clientID: configService.get('services.facebook.clientId'),
      clientSecret: configService.get('services.facebook.clientSecret'),
      callbackURL: configService.get('services.facebook.callbackUri'),
      scope: "email",
      profileFields: ["emails", "name"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void
  ): Promise<any> {
    const { name, emails } = profile;
    const payload = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    };
    const user = await this.authService.validateSocialAuthUser(payload, Providers.FACEBOOk);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    done(null, user);
  }
}
