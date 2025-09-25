const greeting = require('./greeting');

test('This function should be return a greeting text with name', () => { 
    expect(greeting('kamrul')).toBe(`hello kamrul`);
 });

 test('This function should be return default with hello guest', () => { 
    expect(greeting()).toBe(`hello guest`);
 });

 test('parameters should not to be numger', ()=>{
    expect(typeof greeting()).not.toBe('number');
 });

 test('parameters should not to be Array', ()=>{
    expect(typeof greeting('kamrul')).not.toBe('array');
 });

 test('parameters should not to be Object', ()=>{
    expect(typeof greeting('kamrul')).not.toBe('array');
 });

  test('parameters should not to be boolean', ()=>{
    expect(typeof greeting()).not.toBe('boolean');
 });

 test('parameters should not to be Undefined', ()=>{
    expect(greeting()).toBeUndefined;
 });

 describe('greeting function',()=>{
    it('This function should be return a greeting text with name', ()=>{
        expect(greeting('hasan')).toBe(`hello hasan`);
    });
 });