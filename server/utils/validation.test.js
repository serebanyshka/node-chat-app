const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should allow string with non-space and space characters', () => {
    const str = 'test  test';
    const res = isRealString(str);
    expect(res).toBeTruthy();
  });
  it('should reject non-string value', () => {
    const str = 345;
    const res = isRealString(str);
    expect(res).toBeFalsy();
  });
  it('should reject string with space only', () => {
    const str = '      ';
    const res = isRealString(str);
    expect(res).toBeFalsy();
  });
});
