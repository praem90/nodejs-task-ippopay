import { describe, expect, test } from "@jest/globals";
import PasswordValidator from './validator';

describe('Validate Password', () => {
    
    test('Length Validator failure', () => {
        expect(PasswordValidator('123')).toBe(3);
    });

    test('Length Validator success', () => {
        expect(PasswordValidator('Abc1de')).toBe(0);
    });

    test('Length Validator success', () => {
        expect(PasswordValidator('Abc1de')).toBe(0);
    });

    
    test('Upper Case failuire', () => {
        expect(PasswordValidator('abc1de')).toBe(1);
    });
        
    test('Digit And Lower Case failuire', () => {
        expect(PasswordValidator('ABCDEF')).toBe(2);
    });
     
    test('Digit And Repeat failuire', () => {
        expect(PasswordValidator('ABaaac')).toBe(2);
    });
    
    test('Digit And Repeat failuire', () => {
        expect(PasswordValidator('ABaaac111')).toBe(2);
    });
    
    test('Digit And Repeat failuire', () => {
        expect(PasswordValidator('1337C0d3')).toBe(0);
    });
});

