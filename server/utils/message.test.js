const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const name = 'Jack', text = 'Text to test';
    const res = generateMessage(name, text);
    expect(res.from).toBe(name);
    expect(res.text).toBe(text);
    expect(typeof res.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate coccert location object', () => {
    const name= 'Test',
      lat = 45,
      lng = 50;
    const locationObj = generateLocationMessage(name, lat, lng);
    expect(locationObj.from).toBe(name);
    expect(typeof locationObj.url).toBe('string');
    expect(locationObj.url).toBe('https://www.google.com/maps?q=45,50');
    expect(typeof locationObj.createdAt).toBe('number');
  });
});
