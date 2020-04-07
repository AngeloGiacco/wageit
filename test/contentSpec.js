describe('calculating the price', () => {
	it('should cost 10 minutes when the price is 1.40', () => {
		const expectation = '10'
		expect(priceTime(1.40,currencies[0])).toContain(expectation)
	})

	it('should cost 1 hour and 1 minute when the price is 8.54', () => {
		const hours = '1 hour '
		const minutes = '1 minute '
		const result = priceTime(8.54,currencies[0])
		expect(result).toContain(hours)
		expect(result).toContain(minutes)
	})

	it('should cost less than a minute when the price is 0.01', () => {
		expect(priceTime(0.01,currencies[0])).toContain('less than a minute on minimum wage')
	})

	it('should cost less than a minute when the price is 0.00', () => {
		expect(priceTime(0.00,currencies[0])).toContain('less than a minute on minimum wage')
	})

	it('should return unable able to calculate price when price null', () => {
		expect(priceTime(null),currencies[0]).toContain('Unable to calculate')
	})

	it('should return unable able to calculate price when price less than 0', () => {
		expect(priceTime(-1),currencies[0]).toContain('Unable to calculate')
	})


})

describe('calculating minutes', () => {
	it('should return 59 when minutes 59 and hours 0', () => {
		expect(calculateMinutes(59, 0)).toBe(59)
	})

	it('should return 1 when minutes 61 and hours 1', () => {
		expect(calculateMinutes(61, 1)).toBe(1)
	})
})


describe('getting the price number from amazon price element', () => {
	it('should return 1.99 when element inner text is £1.99', () => {
		const priceElement = { 'innerText' : '£1.99' }
		expect(getPriceNumber(priceElement,currencies[0].symbol)).toBe(1.99)
	})

	it('should return 0.99 when element inner text is £0.99', () => {
		const priceElement = { 'innerText' : '£0.99' }
		expect(getPriceNumber(priceElement,currencies[0].symbol)).toBe(0.99)
	})

	it('should return 10000 when element inner text is £10,000', () => {
		const priceElement = { 'innerText' : '£10,000' }
		expect(getPriceNumber(priceElement,currencies[0].symbol)).toBe(10000)
	})

	it('should return 0.99 when element inner text is £0.99 (40%)', () => {
		const priceElement = { 'innerText' : '£0.99 (40%)' }
		expect(getPriceNumber(priceElement,currencies[0].symbol)).toBe(0.99)

	})
	it('should return 0 when element inner text is not present', () => {
		const priceElement = {  }
		expect(getPriceNumber(priceElement)).toBe(0)
	})

	it('should return 0 when element is not present', () => {
		expect(getPriceNumber(null)).toBe(0)
	})
})
