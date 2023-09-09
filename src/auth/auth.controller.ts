import { Body, Controller, Post, UseInterceptors, UploadedFile, Get,Param, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {Response} from 'express'

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: AuthDTO) {
    return this.authService.register(body);
  }
  @Post('login')
  login(@Body() body: AuthDTO) {
    return this.authService.login(body);
  }

  @Post('uploads')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const name = file.originalname.split('.')[0]
        const fileExtension = file.originalname.split('.')[1]
        const newFileName = name.split(' ').join('_') + "_" + Date.now() + '.'+ fileExtension
        callback(null, newFileName)
      }
    }),
  fileFilter: (req, file, callback) => {
    if(!file.originalname.match(/\.(jpg|png|jpeg|gif)$/)) {
      return callback(null, false)
    }
    callback(null, true)
  }})
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if(!file) {
      throw new Error("File is not image")
    }
    const response = {
      url: `http://localhost:3000/api/v1/auth/pictures/${file.filename}`
    }
    return response
  }

  @Get('pictures/:filename') 
  async getPicture(@Param('filename') filename, @Res() res: Response)  {
    res.sendFile(filename, {root: './uploads'})
  }
}
