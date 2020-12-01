import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import envsConfig from 'src/config/envs.config';
import { UserService } from 'src/modules/user/user.service';

import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly logger = new Logger('auth.service');

  async login({ email, password }: LoginDto): Promise<TokenDto> {
    try {
      const user = await this.userService.fetchByEmail(email);

      if (!user) {
        throw new HttpException(
          'No users with this email were found',
          HttpStatus.NOT_FOUND,
        );
      }

      const matchPassword = await user.comparePassword(password);

      if (!matchPassword) {
        throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
      }

      const accessToken = this.jwtService.sign(
        {
          id: user.id,
        },
        {
          expiresIn: envsConfig().auth.expires,
          secret: envsConfig().auth.secret,
        },
      );

      return {
        accessToken,
      };
    } catch (err) {
      this.logger.error(`error while trying to fetch users ${err}`);
      throw err;
    }
  }
}
