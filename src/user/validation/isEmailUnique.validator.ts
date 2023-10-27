import {
  // ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator
} from 'class-validator'
import { Injectable } from '@nestjs/common'
import { UserService } from '../user.service'

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailUniqueValidator implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}
  async validate(
    value: any
    /*,validationArguments?: ValidationArguments*/
  ): Promise<boolean> {
    const userAlreadyExists = await this.userService.searchForEmail(value)
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
