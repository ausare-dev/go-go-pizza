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

const getPizzas = async () => {
	try {
		const response = await fetch(
			'https://deserted-substantial-bestseller.glitch.me/api/products'
		);
		if (!response.ok) {
			throw new Error('Failed yo fetch pizza products');
		}
		return await response.json();
	} catch (error) {
		console.error('Error fetching pizza products: ', error);
	}
};

const createCard = (data) => {
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
        <h3 class="card__title">${data.name['ru'][0].toUpperCase()}${data.name['ru'].slice(1).toLowerCase()}</h3>
        <p class="card__info">
            <span class="card__price">${data.price['25cm']}</span>
            <span class="card__weight">/ 25 см</span>
        </p>
        <button class="button card__button">Выбрать</button>
    </div>
    `;
	return card;
};

const renderPizzas = async () => {
	const pizzas = await getPizzas();
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
const init = () => {
	toppingsToggle();
	renderPizzas();
};

init();
