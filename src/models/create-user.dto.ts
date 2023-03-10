import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('IN')
  phoneNumber: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
