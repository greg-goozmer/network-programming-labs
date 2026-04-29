export function findServiceOfferCouples(serviceOfferNumbers, targetOfferSum) {
    const foundCouples = [];
    const usedCouples = new Set();

    for (let leftIndex = 0; leftIndex < serviceOfferNumbers.length; leftIndex++) {
        for (let rightIndex = leftIndex + 1; rightIndex < serviceOfferNumbers.length; rightIndex++) {
            const leftNumber = serviceOfferNumbers[leftIndex];
            const rightNumber = serviceOfferNumbers[rightIndex];

            if (leftNumber + rightNumber === targetOfferSum) {
                const smallerNumber = Math.min(leftNumber, rightNumber);
                const biggerNumber = Math.max(leftNumber, rightNumber);
                const pairKey = `${smallerNumber}+${biggerNumber}`;

                if (!usedCouples.has(pairKey)) {
                    usedCouples.add(pairKey);
                    foundCouples.push(pairKey);
                }
            }
        }
    }

    return foundCouples;
}

export function buildSortedServicePhrase(servicePhrase) {
    const serviceWords = servicePhrase.split(' ').filter(Boolean);

    const sortedLetterWords = serviceWords.map((serviceWord) => {
        const sortedLetters = serviceWord.toLowerCase().split('').sort().join('');
        return sortedLetters.charAt(0).toUpperCase() + sortedLetters.slice(1);
    });

    let wasSwapped;

    do {
        wasSwapped = false;

        for (let index = 0; index < sortedLetterWords.length - 1; index++) {
            if (sortedLetterWords[index] > sortedLetterWords[index + 1]) {
                const tempWord = sortedLetterWords[index];
                sortedLetterWords[index] = sortedLetterWords[index + 1];
                sortedLetterWords[index + 1] = tempWord;
                wasSwapped = true;
            }
        }
    } while (wasSwapped);

    return sortedLetterWords.join(' ');
}