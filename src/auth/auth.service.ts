import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { compareSync, hashSync, genSaltSync } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    const refreshKey = this.configService.get('REFRESH_SECRET_KEY');
  }
  async register(authDTO: AuthDTO) {
    const userExiting = await this.prismaService.user.findFirst({
      where: {
        email: authDTO.email,
      },
    });
    if (userExiting) {
      throw new ForbiddenException('Email đã tồn tại!');
    }
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(authDTO.password, salt);

    const user = await this.prismaService.user.create({
      data: {
        email: authDTO.email,
        hashedPassword,
        lastName: '',
        firstName: '',
      },
      select: {
        id: true,
        email: true,
      },
    });

    const token = await this.signJwtToken(user.id, user.email);

    return token;
  }
  async login(authDTO: AuthDTO) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: authDTO.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Tài khoản email không tồn tại!');
    }
    const passwordMatched = compareSync(authDTO.password, user.hashedPassword);

    if (!passwordMatched) {
      throw new ForbiddenException('Tài khoản hoặc mật khẩu không chính xác!');
    }
    const token = await this.signJwtToken(user.id, user.email);
    delete user.hashedPassword;
    return token;
  }

  async logout(data: any) {}

  async refreshToken(refreshToken: any) {
    try {
      const refreshKey = this.configService.get('REFRESH_SECRET_KEY');
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: refreshKey,
        algorithms: ['HS256'],
      });

      const newAccessToken = await this.jwtService.signAsync(
        { sub: payload.sub, email: payload.email },
        {
          secret: this.configService.get('SECRET_KEY'),
          expiresIn: '15m',
        },
      );
      return {
        accessToken: newAccessToken,
      };
    } catch (error) {
      throw new HttpException('Invalid Token!', 403);
    }
  }

  async signJwtToken(
    userId: number,
    email: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const payload = {
      sub: userId,
      email: email,
    };

    const jwtString = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('SECRET_KEY'),
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('REFRESH_SECRET_KEY'),
      expiresIn: '7d',
    });
    return {
      accessToken: jwtString,
      refreshToken: refreshToken,
    };
  }
}
