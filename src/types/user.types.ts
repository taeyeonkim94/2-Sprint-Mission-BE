export class CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export class ResponseUserDto {
  id: string;
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}
