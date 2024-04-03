import { renderPizzas } from "./modules/renderPizza.js";

const toppingsToggle = () => {
	const btn = document.querySelector('.toppings__open-button');
	const toppingsList = document.querySelector('.toppings__list');
	btn.addEventListener('click', () => {
		if (!toppingsList.classList.contains('toppings__list--show')) {
			toppingsList.classList.add('toppings__list--show');
			btn.classList.add('toppings__open-button--active');
			toppingsList.style.maxHeight = toppingsList.scrollHeight + 'px';
		} else {
			btn.classList.remove('toppings__open-button--active');
			toppingsList.style.maxHeight = null;
			setTimeout(() => {
				toppingsList.classList.remove('toppings__list--show');
			}, 300);
		}
	});
};




const init = () => {
	toppingsToggle();
	renderPizzas();
};

init();
