export const isPrimeNumber = num => {
  if (num < 2) return false;
  for(let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if(num % i === 0) return false; 
  }
  return num !== 1;
}

export const formatPrimesInMap = (primesMap) => {
  primesMap.forEach((value, key, map) => {
    const isPrime = isPrimeNumber(value);
    map.set(key, {value, isPrime});
  }) 
  return primesMap;
};