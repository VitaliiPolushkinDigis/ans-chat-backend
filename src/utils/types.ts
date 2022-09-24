export enum Routes {
  AUTH = 'auth',
  USERS = 'users',
}

export enum Services {
  AUTH = 'AUTH_SERVICES',
  USERS = 'USERS_SERVICES',
}

export type CreateUserDetails = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type ValidateUserDetails = {
  email: string;
  password: string;
};

export type FindUserParams = Partial<{
  id: number;
  email: string;
}>;
