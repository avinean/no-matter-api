export interface CreateUserDto {
  username: string;
  password: string;
  email: string;
}

export interface UpdateUserDTO extends CreateUserDto {}

export interface FindUserDto {
  id?: number;
  username?: string;
}
