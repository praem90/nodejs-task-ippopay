import { caseAndDigitValidtor } from "./case-and-digit-validator";
import { lengthValidator } from "./length-validator";
import { repeatingCharValidator } from "./repeating-char-validator";

export default (password: string): number => {
    const validators = [
        lengthValidator,
        caseAndDigitValidtor,
        repeatingCharValidator
    ];

    let count = 0;

    for (let fn of validators) {
        const response = fn(password);
        count += response.count;
        if (response.canProceed === false) {
            break;
        }
    }
 
    return count;
}