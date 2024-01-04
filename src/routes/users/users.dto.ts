export interface CreateUserDto {
  username: string;
  password: string;
}

export interface UpdateUserDTO extends CreateUserDto {}

export interface FindUserDto {
  id?: number;
  username?: string;
}
