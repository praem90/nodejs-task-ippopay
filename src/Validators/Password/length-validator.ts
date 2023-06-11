import { ValidatorResponse } from ".";

const MIN_LENGTH = 6;

export const lengthValidator = (password: string): ValidatorResponse => {
    const count = password.length < MIN_LENGTH ? MIN_LENGTH - password.length : 0

    const response: ValidatorResponse = {
        canProceed: count === 0,
        count
    }

    return response;
}