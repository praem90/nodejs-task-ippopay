
import {ValidatorResponse} from "."

export const caseAndDigitValidtor = (password: string): ValidatorResponse => {
    let count = 0;
    if (!password.match(/[a-z]/)) {
        count++
    }

    if (!password.match(/[A-Z]/)) {
        count++
    }
    
    if (!password.match(/[0-9]/)) {
        count++
    }

    return {
        count,
        canProceed: true
    };
}