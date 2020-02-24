import { Component } from '../core/component'
import { apiService } from '../services/api.service'
import { calculateService } from '../services/calculate.service'

export class CartComponent extends Component {
	constructor(id) {
		super(id)
	}

	async init() {
		const data = await apiService.fetchProducts()
		
		Object.keys(data).forEach(i => {
			data[i].quantity = 1
			data[i].totalCost = data[i].quantity * data[i].price
		})

		const html = data.map(product => renderCart(product)).join(' ')
		calculateService.calculateTotal(data)

		this.$el.insertAdjacentHTML('afterbegin', html)

		document.getElementById('buy').addEventListener('click', () => {
			localStorage.setItem('data', JSON.stringify(data))
		})

		this.$el.addEventListener('click', function changeQuantity(event) {
			const target = event.target

			if (target.classList == 'plus' || target.classList == 'minus'){
				let id = target.dataset.atr
				let $el = this.$el.querySelector(`#${id}`)
				calculateService.calculateCost(target, id, $el, data)
				calculateService.calculateTotal(data)
			} else if (target.classList == 'delete') {
				let id = target.dataset.atr
				this.$el.querySelector(`#${id}`).remove()
				Object.keys(data).forEach(key => {
					if (data[key].productID == id) {
						data.splice(key, 1)
						calculateService.calculateTotal(data)
					}
				})
			}
		}.bind(this))
	}
}



function renderCart(product) {
	return `
	<div id="${product.productID}" class="cart">
		<div class="img">
			<img src="${product.image}">
		</div>
		<div class="description">
			<h2>${product.name}</h2>
			<p>${product.description}</p>
		</div>
		<div class="cart-count__wrapper">
			<button class="minus" data-atr="${product.productID}">-</button>
			<div class="cart-count__current">
				<input class="quantity" type="number" value="${product.quantity}" readonly>
			</div>
			<button class="plus" data-atr="${product.productID}">+</button>
		</div>
		<div class="cart-wrapper">
			<img class="delete" src="delete.svg" alt="" data-atr="${product.productID}">
			<span>${product.totalCost} €</span >
		</div>
	</div>
	`
}





