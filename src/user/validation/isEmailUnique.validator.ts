import {
  // ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator
} from 'class-validator'
import { UserRepository } from '../user.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailUniqueValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}
  async validate(
    value: any
    /*,validationArguments?: ValidationArguments*/
  ): Promise<boolean> {
    const userAlreadyExists =
      await this.userRepository.emailAlreadyExists(value)
    return !userAlreadyExists
  }
}

export const IsEmailUnique = (validationOptions: ValidationOptions) => {
  return (obj: object, prop: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: prop,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUniqueValidator
    })
  }
}
