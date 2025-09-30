describe('Test a synchronous and asynchronous function',()=>{
    it('is for synchronous',()=>{
        const mockFn = jest.fn();

        mockFn.mockReturnValue('Hello mock!');
        expect(mockFn()).toBe('Hello mock!');
    });

    it('is for asynchronous',async ()=>{
        const mockFn = jest.fn();

        mockFn.mockResolvedValue('Hello async Mock');
        const result = await mockFn()
        expect(result).toBe('Hello async Mock');
    })
})