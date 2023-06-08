import { describe, expect, test } from "@jest/globals";
import { ValidatorResponse } from ".";
import { repeatingCharValidator } from "./repeatingCharValidator";


describe('Repeating char Validator', () => {
    let response: ValidatorResponse;

    test('Repeating failuire', () => {
        response = repeatingCharValidator('aaabbC');
        expect(response.count).toBe(1);
    });

    
    test('Repeating success', () => {
        response = repeatingCharValidator('aa1abbC');
        expect(response.count).toBe(0);
    });

});