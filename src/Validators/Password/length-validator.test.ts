import { describe, expect, test } from "@jest/globals";
import { lengthValidator } from "./length-validator";
import { ValidatorResponse } from ".";

describe('Length Validator', () => {
    let response: ValidatorResponse;
    test('Length Validator failure', () => {
        response = lengthValidator('123')
        expect(response.count).toBe(3);
        expect(response.canProceed).toBe(false);
    });

    test('Length Validator success', () => {
        response = lengthValidator('Abc1de');
        expect(response.count).toBe(0);
        expect(response.canProceed).toBe(true);
    });

    test('Length Validator success', () => {
        response = lengthValidator('Abc1de');
        expect(response.count).toBe(0);
        expect(response.canProceed).toBe(true);
    })
});

