export type UserRole = {
  Student: string;
  Teacher: string;
  Parents: string;
};

export type UserType = {
  role: UserRole;
};

export type UserLoginType = {
  email: string;
  password: string;
};
