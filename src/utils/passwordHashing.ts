import * as bcrypt from 'bcrypt';

const passwordHashing = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  const abc = await bcrypt.hash('password', salt);
  console.log(hashedPassword);
  //console.log(abc);
  return hashedPassword;
};

export default passwordHashing;
