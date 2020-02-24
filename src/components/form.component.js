import { Component } from '../core/component'
import { apiService } from '../services/api.service'

export class FormComponent extends Component {
	constructor(id, controls) {
		super(id)
		this.controls = controls
		this.data = JSON.parse(localStorage.getItem('data'))
	}

	init () {
		this.$el.addEventListener('submit', submitFormHandler.bind(this))
		const data = JSON.parse(localStorage.getItem('data'))
		let total = 0;
		Object.keys(data).forEach(item => {
			total += data[item].totalCost
		})
		if (total > 300) {
			this.$el.type[this.$el.type.length] = new Option('Free Express Shipping', 'Free Express Shipping', true);
			this.$el.type.value = 'Free Express Shipping';
			this.$el.type.disabled = true;
		}

	}

	value() {
		const value = {}
		Object.keys(this.controls).forEach(control => {
			value[control] = this.$el[control].value
		})
		return value
	}

	isValid() {
		let isFormValid = true

		Object.keys(this.controls).forEach(control => {
			const validators = this.controls[control]

			let isValid = true
			validators.forEach(validator => {
				isValid = validator(this.$el[control].value) && isValid
	
			})

			if (!isValid) {
				setError(this.$el[control])
			} else {
				clearError(this.$el[control])
			}


			isFormValid = isFormValid && isValid
		})

		return isFormValid

	}

	clear () {
		Object.keys(this.controls).forEach(control => {
			this.$el[control].value = ''
		})
	}
}



async function submitFormHandler(event) {
	event.preventDefault()

	if (this.isValid()) {

		let formData = {
			type: this.$el.type.value,
			...this.value()
		}
		formData = Object.assign(formData, this.data)
		this.$el.querySelector('#submit').disabled = true
		const order = await apiService.createOrder(formData)
		this.$el.querySelector('#submit').disabled = false
		console.log(formData)
		this.clear()
		const overlay = document.querySelector('.overlay')
			
		overlay.style.display = 'block'
		document.querySelector('#back').addEventListener('click', () => {
			overlay.style.display = 'none'
		})
	}	
	console.log(this)
}


function setError(control) {
	clearError(control)
	const error = '<p class="validation-error">Введите корректное значение</p>'
	control.classList.add('invalid')
	control.insertAdjacentHTML('afterend', error)
}

function clearError(control) {
	if (control.nextSibling) {
		control.classList.remove('invalid')
		control.closest('.form-label').removeChild(control.nextSibling)
	}
}

