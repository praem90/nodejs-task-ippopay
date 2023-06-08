import { describe, expect, test } from "@jest/globals";
import { findMinDiff } from "./minimum-possible-diff";

describe('Find Min Diff', () => {
    
    test('Test case 1 success', () => {
        expect(findMinDiff([3, 9, 7, 3])).toBe(2);
    });
});

