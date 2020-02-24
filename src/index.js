import { CartComponent } from '../src/components/cart.component'
import { FormComponent } from '../src/components/form.component'
import { Validators } from '../src/core/validators'

if (window.location.pathname == '/') {
	new CartComponent('cart')
} else {
	new FormComponent('form', {
		name: [Validators.required, Validators.minLength(3)],
		address: [Validators.required],
		phone: [Validators.required],
		email: [Validators.required, Validators.checkEmail]
	})

}







