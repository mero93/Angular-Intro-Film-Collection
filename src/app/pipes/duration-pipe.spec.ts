import { DurationPipe } from './duration-pipe';

describe('DurationPipe', () => {
  const pipe = new DurationPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform bad inputs to 0min', () => {
    expect(pipe.transform(Number.NaN)).toBe('0min');
    expect(pipe.transform(0)).toBe('0min');
    expect(pipe.transform(-180)).toBe('0min');
    expect(pipe.transform(Number.POSITIVE_INFINITY)).toBe('0min');
  });
  it('should transform into Xh Ymin', () => {
    expect(pipe.transform(109)).toBe('1h 49min');
    expect(pipe.transform(61)).toBe('1h 1min');
    expect(pipe.transform(999)).toBe('16h 39min');
  });
  it('should transform into Xh', () => {
    expect(pipe.transform(120)).toBe('2h');
    expect(pipe.transform(60)).toBe('1h');
    expect(pipe.transform(900)).toBe('15h');
  });
  it('should transform into Xmin', () => {
    expect(pipe.transform(49)).toBe('49min');
    expect(pipe.transform(59)).toBe('59min');
    expect(pipe.transform(9)).toBe('9min');
  });
});
