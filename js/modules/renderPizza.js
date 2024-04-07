import { getPizzas } from "./getData.js";

const createCard = data => {
	const card = document.createElement('article');
	card.classList.add('card');
	card.innerHTML = `
    <picture>
        <source srcset="${data.images[1]}" type="image/webp">
        <img
            src="${data.images[0]}"
            alt="${data.name.ru}"
            class="card__image"
        />
    </picture>
    <div class="card__content">
        <h3 class="card__title">${data.name['ru'][0].toUpperCase()}${data.name[
		'ru'
	]
		.slice(1)
		.toLowerCase()}</h3>
        <p class="card__info">
            <span class="card__price">${data.price['25cm']}</span>
            <span class="card__weight">/ 25 см</span>
        </p>
        <button class="button card__button">Выбрать</button>
    </div>
    `;
	return card;
};

export const renderPizzas = async (toppings) => {
	const pizzas = await getPizzas(
		`https://deserted-substantial-bestseller.glitch.me/api/products${
			toppings ? `?toppings=${toppings}` : ''
		}`,
	);
	const pizzaList = document.querySelector('.menu__list');
	pizzaList.textContent = '';
	const items = pizzas.map(data => {
		const item = document.createElement('li');
		item.classList.add('menu__item');
		const card = createCard(data);
		item.append(card);
		return item;
	});
	pizzaList.append(...items);
};
