export class Validators {
 	static required(value = '') {
		return value && value.trim
		
	}

	static minLength(length) {
		return value => {
			return value.length >= length
			
		}
	}

	static checkEmail (value) {
		const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/

		return reg.test(value) && value
	}
}