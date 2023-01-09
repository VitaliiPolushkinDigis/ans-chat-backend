/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line no-var
var bcrypt = require('bcryptjs');

export const hashPassword = async (rawPassword: string) => {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(rawPassword, salt);
};

export async function compareHash(rawPassword: string, hashedPassword: string) {
  return bcrypt.compare(rawPassword, hashedPassword);
}
