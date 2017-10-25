export function sum (x, y) {
  return x + y;
};

export function giaithua (n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return n * giaithua(n-1);
};
