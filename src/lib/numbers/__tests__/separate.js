import Numbers from '../index';

Numbers.locale = 'ru';

it('separate 1000', () => {
  expect(Numbers.separate(1000)).toEqual('1\u2009000');
});

it('separate 1000000', () => {
  expect(Numbers.separate(1000000)).toEqual('1\u2009000\u2009000');
});

it('separate 123.456', () => {
  expect(Numbers.separate(123.456)).toEqual('123,456');
});

it('separate 123456.789', () => {
  expect(Numbers.separate(123456.789)).toEqual('123\u2009456,789');
});

it('separate -123456.789', () => {
  expect(Numbers.separate(-123456.789)).toEqual('-123\u2009456,789');
});
