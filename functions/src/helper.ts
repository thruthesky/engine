
export function getRandomInt(minValue: number, maxValue: number) {
    const min = Math.ceil(minValue);
    const max = Math.floor(maxValue);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
