import { getPizzas } from './getData.js';

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
};
