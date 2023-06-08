export const findMinDiff = (source: number[]) => {
    const n = source.length/2;
    const subset1 = source.slice(0, n);
    const subset2 = source.slice(n, n*2);
    const sourceSum = sumArray(source)
    let minDiff = Math.abs(sourceSum - sumArray(subset1)*2);

    for(let i=0; i<n; i++) {
        for(let j=0; j<n; j++) {
            if (subset1[i] === subset2[j]) {
                continue;
            }

            const tmp = subset1;

            tmp[i] = subset2[j];
    
            const diff = Math.abs(sourceSum - sumArray(tmp)*2);
    
            if (diff < minDiff) {
                minDiff = diff;
            }
        }

    }

    return minDiff;
}

const sumArray = (arr: number[]) => {
    return arr.reduce((n, a) => n+a, 0);
}