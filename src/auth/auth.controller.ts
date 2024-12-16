import { AuthDTO } from '@/types/auth.types';
import { ResponseUserDTO } from '@/types/user.types';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() userData: AuthDTO): Promise<ResponseUserDTO> {
    const responseUserData = this.authService.login(userData);
    return responseUserData;
  }
}
