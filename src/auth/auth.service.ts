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
    const userExisted = await this.prismaService.user.findFirst({
      where: {
        email: authDTO.email,
      },
    });
    if (userExisted) {
      throw new ForbiddenException('Email is existed!');
    } else {
      try {
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
      } catch (e) {
        return e;
      }
    }
  }
  async login(authDTO: AuthDTO) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: authDTO.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Email does not exist!');
    }
    const passwordMatched = await argon.verify(
      user.hashedPassword,
      authDTO.password,
    );

    if (!passwordMatched) {
      throw new ForbiddenException('Incorrect password!');
    }
    delete user.hashedPassword;

    return this.signJwtToken(user.id, user.email);
  }
  async signJwtToken(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email: email,
    };

    const jwtString = this.jwtService.signAsync(payload, {
      secret: this.configService.get('SECRET_KEY'),
      expiresIn: '1h',
    });
    return {
      accessToken: (await jwtString).toString(),
    };
  }
}
