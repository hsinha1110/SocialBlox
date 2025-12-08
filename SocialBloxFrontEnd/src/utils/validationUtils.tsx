export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const isValidUsername = (username: string): boolean => {
  return username.trim().length >= 3; // example: minimum 3 chars
};

export const isValidMobile = (mobile: string): boolean => {
  const mobileRegex = /^[0-9]{10}$/; // only 10 digit numbers
  return mobileRegex.test(mobile);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 6; // example: minimum 6 chars
};

export const doPasswordsMatch = (
  password: string,
  confirmPassword: string,
): boolean => {
  return password === confirmPassword;
};
