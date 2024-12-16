const enum ErrorMessage {
  USER_NOT_FOUND = '해당 유저를 찾을 수 없습니다.',
  USER_EXIST = '이미 존재하는 이메일입니다.',
  USER_UNAUTHORIZED_ID = '존재하지 않는 email 입니다.',
  USER_UNAUTHORIZED_PW = '비밀번호가 일치하지 않습니다.',

  INTERNAL_SERVER_ERROR = '내부 서버 오류',
}
export default ErrorMessage;
