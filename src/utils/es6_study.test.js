import { sum, giaithua } from  './es6_study';

it ('sum 2 numbers', () => {
  expect(sum(1, 2)).toEqual(3);
  expect(sum(2017, 0)).toEqual(2017);
});

it ('giai thua a number', () => {
  expect(giaithua(0)).toEqual(0);
  expect(giaithua(1)).toEqual(1);
  expect(giaithua(5)).toEqual(120);
});
