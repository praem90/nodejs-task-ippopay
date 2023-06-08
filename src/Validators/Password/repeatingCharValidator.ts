import { ValidatorResponse } from ".";

export const repeatingCharValidator = (password: string): ValidatorResponse => {
    // Making lowercase so, Baaab0 and BaaAbo could fail
    // If we want to make case sensitive, update the pattern like `/([a-zA-Z0-9])\1+/g` would help
    const matches = password.toLowerCase().match(/([a-z0-9])\1+/g);

    let count = matches?.length || 0;

    if (matches) {
        count = matches.filter(match => match.length > 2).length
    }

    const response: ValidatorResponse = {
        canProceed: true,
        count
    }

    return response;
}