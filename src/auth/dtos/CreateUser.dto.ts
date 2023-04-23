import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'email',
    example: 'test@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'password',
    example: 'password',
  })
  @IsNotEmpty()
  @MaxLength(32)
  password: string;

  @ApiProperty({
    description: 'firstName',
    example: 'firstName',
  })
  @IsNotEmpty()
  @MaxLength(32)
  firstName: string;

  @ApiProperty({
    description: 'lastName',
    example: 'lastName',
  })
  @IsNotEmpty()
  @MaxLength(32)
  lastName: string;
}
