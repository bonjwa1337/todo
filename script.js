const deal = document.querySelector('.deed'),
    answers = document.querySelector('.answers'),
    button = document.querySelector('.button'),
    sortButton = document.querySelector('.sort'),
    tip = document.querySelector('.tip');


class Deed {
    constructor(text) {
        this.text = text;
    }
    createDeed() {

        if (deal.value) {
            const dealWrapper = document.createElement('div');
            const dealText = document.createElement('div');
            const close = document.createElement('div');
            dealWrapper.classList.add('item');
            dealWrapper.append(dealText, close);
            dealText.textContent = this.text;
            close.classList.add('close');
            answers.append(dealWrapper);
            deal.value = '';
            dealWrapper.setAttribute('draggable', true)
            this.item = dealWrapper;
            close.addEventListener('click', () => {
                this.item.remove();
                appear();
            })
            appear();
        } else {

            tip.classList.toggle('hidden')
            setTimeout(() => {
                tip.style.opacity = '1';
            }, 100)
            setTimeout(() => {
                tip.style.opacity = '0';
            }, 2300)
            setTimeout(() => {
                tip.classList.toggle('hidden');
            }, 3000)


        }
    }
}


button.addEventListener('click', () => {
    const item = new Deed(deal.value);
    item.createDeed();
})

document.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' || e.code ===  'NumpadEnter') {
        const item = new Deed(deal.value);
        item.createDeed();
    }
})

const appear = () => {
    document.querySelectorAll('.item').length ? answers.classList.remove('hidden') : answers.classList.add('hidden')
}

sortButton.addEventListener('click', (e) => {
    e.target.classList.toggle('sort-up');
    const deeds = [...document.querySelectorAll('.item')];
    deeds.sort(compare);
    answers.innerHTML = '';
    deeds.forEach(item => {
        answers.append(item);
    })
})

const compare = (a, b) => {
    a = a.innerText;
    b = b.innerText;
    if (!document.querySelector('.sort').classList.contains('sort-up')) {
        return a < b ? 1 :
            a > b ? -1 : 0;
    }
    return a < b ? -1 :
        a > b ? 1 : 0;

}


answers.addEventListener('dragstart', (e) => {
    e.target.classList.add('selected')
})

answers.addEventListener('dragend', (e) => {
    e.target.classList.remove('selected')
})

answers.addEventListener(`dragover`, (evt) => {
    // Разрешаем сбрасывать элементы в эту область
    evt.preventDefault();

    // Находим перемещаемый элемент
    const activeElement = answers.querySelector(`.selected`);
    // Находим элемент, над которым в данный момент находится курсор
    const currentElement = evt.target;
    // Проверяем, что событие сработало:
    // 1. не на том элементе, который мы перемещаем,
    // 2. именно на элементе списка
    const isMoveable = activeElement !== currentElement &&
        currentElement.classList.contains(`item`);

    // Если нет, прерываем выполнение функции
    if (!isMoveable) {
        return;
    }

    // Находим элемент, перед которым будем вставлять
    const nextElement = (currentElement === activeElement.nextElementSibling) ?
        currentElement.nextElementSibling :
        currentElement;

    // Вставляем activeElement перед nextElement
    answers.insertBefore(activeElement, nextElement);
});