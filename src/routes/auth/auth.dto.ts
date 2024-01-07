export interface SignInDto {
  username: string;
  password: string;
}

export interface SignUpDto {
  email: string;
}

export interface SetNewPasswordDto {
  id: string;
  password: string;
  username: string;
}
