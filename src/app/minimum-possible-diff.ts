export const findMinDiff = (source: number[]) => {
    const n = source.length/2;
    const subset1 = source.slice(0, n);
    const subset2 = source.slice(n, n*2);
    const sourceSum = sumArray(source)
    let minDiff = Math.abs(sourceSum - sumArray(subset1)*2);

    const cache: {
        [key: number]: {
            [key: number]: number
        }
    } = {};

    for(let i=0; i<n; i++) {
        for(let j=0; j<n; j++) {
            if (subset1[i] === subset2[j]) {
                continue;
            }

            let diff = 0;

            if (cache[subset1[i]] && cache[subset1[i]][subset2[j]]) {
                diff = cache[subset1[i]][subset2[j]];
            } else if (cache[subset2[j]] && cache[subset2[j]][subset1[i]]) {
                diff = cache[subset2[j]][subset1[i]];
            } else {
                const tmp = subset1;

                tmp[i] = subset2[j];
        
                diff = Math.abs(sourceSum - sumArray(tmp)*2);

                if (! cache[subset1[i]]) {
                    cache[subset1[i]] = {};
                }

                if (! cache[subset2[j]]) {
                    cache[subset2[j]] = {};
                }

                cache[subset1[i]][subset2[j]] = cache[subset2[j]][subset1[i]] = diff;
            }

    
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