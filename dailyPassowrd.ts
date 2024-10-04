let currentUserPwdText = "";
let nextUserPwdText = "";
let holdrand = 0;

const getCurrentUserPwdText = () => currentUserPwdText;
const setCurrentUserPwdText = (value: string) => {
  currentUserPwdText = value;
};

const getNextUserPwdText = () => nextUserPwdText;
const setNextUserPwdText = (value: string) => {
  nextUserPwdText = value;
};

const getHoldrand = () => holdrand;
const setHoldrand = (value: number) => {
  holdrand = value;
};

export const generateSPANUserPassword = (
  wDay: number,
  wMonth: number,
  wYear: number
) => {
  const day = wDay;
  const month = wMonth;
  const year = wYear;

  const prev_day = day > 1 ? day - 1 : 1;
  const prev_month = month > 1 ? month - 1 : 1;
  const prev_year = year > 1 ? year - 1 : 1;

  const day2 = day + prev_day + day + 1;
  const month2 = month + prev_month + month + 1;

  srand(parseInt(`${day2}${month2}${year + prev_year + year + 1}`, 10));
  return String(rand());
};

export const generateSPANMaintenanceUserPassword = (
  wDay: number,
  wMonth: number,
  wYear: number
) => {
  const day = wDay;
  const month = wMonth;
  const year = wYear;

  const prev_day = day > 1 ? day - 1 : 1;
  const prev_month = month > 1 ? month - 1 : 1;
  const prev_year = year > 1 ? year - 1 : 1;

  const day2 = day + prev_day + day + 1;
  const month2 = month + prev_month + month + 1;

  srand(parseInt(`${day2}${month2}${year + prev_year + year + 1}`, 10));

  const charSet =
    "1aAbBcC2dDeEf3FgGhH4iIjJkK5lLmMnN6oOpPqQ7rRsStT8uUvVwW9xXyYzZ";
  let dest = "";
  let length = 8;

  while (length > 0) {
    const randIndex = Math.floor((rand() / 32767) * charSet.length);
    dest += charSet.charAt(randIndex);
    length--;
  }

  return dest;
};

const srand = (seed: number) => {
  holdrand = seed;
};

const rand = () => {
  holdrand = (holdrand * 214013 + 2531011) & 0xffffffff;
  return (holdrand >> 16) & 32767;
};

const getPwdString = (
  current_date: string,
  login_password: string,
  exit_password: string,
  isTodayPwd: boolean
) => {
  if (isTodayPwd) {
    return `*SPAN - Daily Password*\n\n*Today :* ${current_date}\n*User Name :* Span User\n*Login Password :* ${login_password}\n*Exit Password :* ${exit_password.toLowerCase()}`;
  } else {
    return `\n*Tomorrow :* ${current_date}\n*User Name :* Span User\n*Login Password :* ${login_password}\n*Exit Password :* ${exit_password.toLowerCase()}`;
  }
};

// Example usage
const currentPassword = generateSPANUserPassword(21, 5, 2024);
const maintenancePassword = generateSPANMaintenanceUserPassword(21, 5, 2024);
const pwdString = getPwdString(
  "21-05-2024",
  currentPassword,
  maintenancePassword,
  true
);

//console.log(currentPassword);
//console.log(maintenancePassword);
//console.log(pwdString);
