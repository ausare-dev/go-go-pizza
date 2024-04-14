import { getPizzas } from './getData.js';
import { renderPizzas } from './renderPizza.js';

export const renderToppings = async () => {
	const { en: enToppings, ru: ruToppings } = await getPizzas(
		'https://deserted-substantial-bestseller.glitch.me/api/toppings'
	);
	const toppingsList = document.querySelector('.toppings__list');
	toppingsList.textContent = '';
	const items = enToppings.map((enName, i) => {
		const item = document.createElement('li');
		item.classList.add('toppings__item');
		item.innerHTML = `
        <input
            type="checkbox"
            name="topping"
            class="toppings__input"
            id="${enName}"
            value="${enName}"
        />
        <label class="button toppings__button" for="${enName}">${ruToppings[
			i
		][0].toUpperCase()}${ruToppings[i].slice(1).toLowerCase()}</label>
        `;
		return item;
	});
	toppingsList.append(...items);
	const itemReset = document.createElement('li');
	itemReset.classList.add('toppings__item');
	const btnReset = document.createElement('button');
	btnReset.classList.add(
		'button',
		'toppings__button',
		'toppings__button--reset'
	);
	btnReset.textContent = 'Сбросить';
	btnReset.type = 'reset';
	itemReset.append(btnReset);
	const toppingsForm = document.querySelector('.toppings__form');
	
	toppingsForm.addEventListener('change', (event) => {
		const formData = new FormData(toppingsForm);
		const checkedToppings = [];
		for (const [, value] of formData.entries()) {
			checkedToppings.push(value);
		}
		renderPizzas(checkedToppings);
		if(checkedToppings.length){
			toppingsList.append(itemReset);
		} else {
			itemReset.remove();
		}
	});

	btnReset.addEventListener('click', ()=>{
		itemReset.remove();
		toppingsForm.reset();
		renderPizzas();
	})
};
