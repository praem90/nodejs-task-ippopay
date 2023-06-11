import { describe, expect, test } from "@jest/globals";
import { caseAndDigitValidtor } from "./case-and-digit-validator";
import { ValidatorResponse } from ".";


describe('Case  And Digit Validator', () => {
    let response: ValidatorResponse;
    test('LowerCase failure', () => {
        response = caseAndDigitValidtor('ADB123');
        expect(response.count).toBe(1);

        
        response = caseAndDigitValidtor('ADBCDE');
        expect(response.count).toBe(2);
    });

    test('UpperCase Failuire', () => {
        response = caseAndDigitValidtor('abc123');
        expect(response.count).toBe(1);
    });

    test('Digit Failure', () => {
        response = caseAndDigitValidtor('abcDEF');
        expect(response.count).toBe(1);
    })

});