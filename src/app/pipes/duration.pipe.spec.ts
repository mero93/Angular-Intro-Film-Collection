import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  const pipe = new DurationPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it.each([Number.NaN, 0, -180, Number.POSITIVE_INFINITY])(
    'should transform bad inputs to 0min',
    (input: number) => {
      expect(pipe.transform(input)).toBe('0min');
    },
  );
  it.each([
    { input: 109, expected: '1h 49min' },
    { input: 61, expected: '1h 1min' },
    { input: 999, expected: '16h 39min' },
  ])(
    'should transform into Xh Ymin',
    ({ input, expected }: { input: number; expected: string }) => {
      expect(pipe.transform(input)).toBe(expected);
    },
  );
  it.each([
    { input: 120, expected: '2h' },
    { input: 60, expected: '1h' },
    { input: 900, expected: '15h' },
  ])('should transform into Xh', ({ input, expected }: { input: number; expected: string }) => {
    expect(pipe.transform(input)).toBe(expected);
  });
  it.each([
    { input: 49, expected: '49min' },
    { input: 59, expected: '59min' },
    { input: 9, expected: '9min' },
  ])('should transform into Xmin', ({ input, expected }: { input: number; expected: string }) => {
    expect(pipe.transform(input)).toBe(expected);
  });
});
