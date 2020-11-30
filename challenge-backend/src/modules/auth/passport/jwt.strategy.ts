import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import envsConfig from 'src/config/envs.config';
import { TokenValidateDto } from 'src/modules/auth/dto/token-validate.dto';
import { UserResponseDto } from 'src/modules/user/dto/user-response.dto';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envsConfig().auth.secret,
    });
  }

  async validate({ id }: TokenValidateDto): Promise<UserResponseDto> {
    const user = await this.userService.fetchOne({
      id,
    });

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
