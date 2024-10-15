import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class SigninDto {

  /**
  * @description "Email del usuario a loguearse"
  * @example "Fernando@gmail.com"
  */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
  * @description "Contraseña del usuario a loguearse"
  * @example "Password123*"
  */
  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,{
    message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character."
  })
  password: string;

  }