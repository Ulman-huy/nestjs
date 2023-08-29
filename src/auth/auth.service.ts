import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async register(authDTO: AuthDTO) {
    const hashPassword = await argon.hash(authDTO.password);
    const userExiting = await this.prismaService.user.findFirst({
      where: {
        email: authDTO.email,
      },
    });
    if (userExiting) {
      throw new ForbiddenException('Email đã tồn tại!');
    }
    const user = await this.prismaService.user.create({
      data: {
        email: authDTO.email,
        hashedPassword: hashPassword,
        lastName: '',
        firstName: '',
      },
      // only selected...
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
      // Should "unique"
    });
    return this.signJwtToken(user.id, user.email);
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
    const passwordMatched = await argon.verify(
      user.hashedPassword,
      authDTO.password,
    );

    if (!passwordMatched) {
      throw new ForbiddenException('Tài khoản hoặc mật khẩu không chính xác!');
    }
    delete user.hashedPassword;

    return this.signJwtToken(user.id, user.email);
  }
  async signJwtToken(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = {
      sub: userId,
      email: email,
    };

    const jwtString = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('SECRET_KEY'),
      expiresIn: '1h',
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
