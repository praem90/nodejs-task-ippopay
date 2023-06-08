import { caseAndDigitValidtor } from "./caseAndDigitValidator";
import { lengthValidator } from "./lengthValidator";
import { repeatingCharValidator } from "./repeatingCharValidator";

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