import Numbers from '../index';

Numbers.locale = 'ru';

it('cut 1e3', () => {
  expect(Numbers.cut(1e3)).toEqual('1 тыс.');
});

it('cut 1e6', () => {
  expect(Numbers.cut(1e6)).toEqual('1 млн.');
});

it('cut 1e9', () => {
  expect(Numbers.cut(1e9)).toEqual('1 млрд.');
});

it('cut 1', () => {
  expect(Numbers.cut(1)).toEqual('1');
});

it('cut 999999', () => {
  expect(Numbers.cut(999999)).toEqual('1 млн.');
});

it('cut 999900', () => {
  expect(Numbers.cut(999900)).toEqual('999,9 тыс.');
});

it('cut 1000001', () => {
  expect(Numbers.cut(1000001)).toEqual('1 млн.');
});

it('cut 999999999', () => {
  expect(Numbers.cut(999999999)).toEqual('1 млрд.');
});

it('cut 10000000001', () => {
  expect(Numbers.cut(10000000001)).toEqual('10 млрд.');
});

it('cut 9999', () => {
  expect(Numbers.cut(9999)).toEqual('10 тыс.');
});

it('cut 0', () => {
  expect(Numbers.cut(0)).toEqual('0');
});

it('cut 1234567890987654321', () => {
  expect(Numbers.cut(1234567890987654321)).toEqual('1\u2009234\u2009567\u2009890,988 млрд.');
});

it('cut -9999', () => {
  expect(Numbers.cut(-9999)).toEqual('-10 тыс.');
});

it('cut 123.456', () => {
  expect(Numbers.cut(123.456)).toEqual('123,456');
});

it('cut 1049', () => {
  expect(Numbers.cut(1049)).toEqual('1 тыс.');
});

it('cut 1050', () => {
  expect(Numbers.cut(1050)).toEqual('1,1 тыс.');
});
