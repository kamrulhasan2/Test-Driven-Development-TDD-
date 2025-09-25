const sum =  require('./sum');

test('sum should be 4', () => { 
    expect(sum(1,3)).toBe(4);

 });

 test('sum should be 10', ()=>{
    expect(sum(3,7)).toBe(10);
 });

  test('sum should be 100', ()=>{
    expect(sum(50,50)).toBe(100);
 });

 test('sum should not to be undefined', ()=>{
    expect(sum(50,50)).not.toBe(undefined);
 });

 test('sum should not to be null', ()=>{
    expect(sum(50,50)).not.toBe(null);
 });

test('parameters should not to be string', ()=>{
    expect(typeof sum(50,50)).not.toBe('string');
 });