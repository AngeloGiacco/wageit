describe('calculating the price', () => {
	it('should cost 10 minutes when the price is £1.40', () => {
		const expectation = '10'	
		expect(priceTime(1.40)).toContain(expectation)
	})
})
