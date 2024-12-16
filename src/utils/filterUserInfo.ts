import { ResponseUserDto } from '@/types/user.types';
import { User } from '@prisma/client';

function filterUserInfo(
  user: User,
  accessToken: string,
  refreshToken: string,
): ResponseUserDto {
  const { password, ...restData } = user;
  const responseUserData = { ...restData, accessToken, refreshToken };
  return responseUserData;
}

export default filterUserInfo;
