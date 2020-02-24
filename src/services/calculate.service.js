class CalculateService {

	calculateCost(targetElem, targetId, container, products) {
		const quantity = container.querySelector('input')
		if (targetElem.classList.contains('plus') && quantity.value < 50) {
			quantity.value++
			products.forEach(product => {
				if (product.productID == targetId) {
					product.quantity++
					product.totalCost = product.price * product.quantity
					container.querySelector('span').textContent = `${product.totalCost} €`
				}
			})
		} else if (targetElem.classList.contains('minus') && quantity.value > 1) {
			quantity.value--
			products.forEach(product => {
				if (product.productID == targetId) {
					product.quantity--
					product.totalCost = product.price * product.quantity
					container.querySelector('span').textContent = `${product.totalCost} €`
				}
			})
		}
	}

	calculateTotal(data) {
		let total = 0
		let target = document.getElementById('total')

		data.forEach(product => {
			total += product.totalCost
		})
		target.textContent = `${total} €`
	}

}

export const calculateService = new CalculateService()