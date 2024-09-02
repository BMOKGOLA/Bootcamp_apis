export function findLongestWord(sentence) {
    const words = sentence.split(' ');
    return words.reduce((longest, current) => 
        current.length >= longest.length ? current : longest, 
        ""
    );
}

export function findShortestWord(sentence) {
    const words = sentence.split(' ');
    return words.reduce((shortest, current) => 
        current.length <= shortest.length ? current : shortest, 
        words[0]
    );
}

export function calculateWordLengths(sentence) {
    const words = sentence.split(' ');
    return words.reduce((total, current) => total + current.length, 0);
}