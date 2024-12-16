import { ResponseUserDTO } from '@/types/user.types';
import { User } from '@prisma/client';

function filterUserInfo(
  user: User,
  accessToken: string,
  refreshToken: string,
): ResponseUserDTO {
  const { password, ...restData } = user;
  const responseUserData = { ...restData, accessToken, refreshToken };
  return responseUserData;
}

export default filterUserInfo;
