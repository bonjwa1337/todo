const deal = document.querySelector('.deed-name'),
    answers = document.querySelector('.answers'),
    button = document.querySelector('.button'),
    sortButton = document.querySelectorAll('.sort'),
    tip = document.querySelector('.tip'),
    rate = document.querySelector('.rate'),
    filterButtons = document.querySelectorAll('.filter');


class Deed {
    constructor(text) {
        this.text = text;
    }
    createDeed() {
        if (deal.value) {
            this.item = addDeed(this.text);
            this.ratio = addRatio(this.item, document.querySelector('.selected-ratio').getAttribute('data-color'));
            this.localStorageKey = addToLocalStorage(this.text, this.ratio);
            this.removeButton = removeDeed(this.item, this.localStorageKey);
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

const addDeed = (text) => {
    const item = document.createElement('div');
    item.classList.add('item');
    item.textContent = text;
    answers.append(item);
    deal.value = '';
    item.setAttribute('draggable', true);
    return item;
}

const addRatio = (item, color) => {
    const ratioIcon = document.createElement('div');
    ratioIcon.classList.add(color, 'ratio-icon');
    color === 'hight' ? ratioIcon.setAttribute('priority', '2') :
        color === 'middle' ?
        ratioIcon.setAttribute('priority', '1') : ratioIcon.setAttribute('priority', '0')
    item.prepend(ratioIcon)
    return color;
}

const addToLocalStorage = (text, ratio) => {
    const key = Math.floor(Math.random() * 5000);
    localStorage.setItem(key, `${text} ${ratio}`);
    return key;
}


const removeDeed = (item, key) => {
    const removeButton = document.createElement('div');
    item.append(removeButton);
    removeButton.classList.add('close');
    removeButton.addEventListener('click', () => {
        item.remove();
        localStorage.removeItem(key);
        appear();
    })
    return removeButton;
}

button.addEventListener('click', () => {
    const item = new Deed(deal.value);
    item.createDeed();
})

document.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        const item = new Deed(deal.value);
        item.createDeed();
    }
})

const appear = () => {
    document.querySelectorAll('.item').length ? answers.classList.remove('hidden') : answers.classList.add('hidden')
}

sortButton.forEach(item => {
    item.addEventListener('click', (e) => {

        const target = e.target;
        if (target.classList.contains('name-sort')) {
            target.classList.toggle('sort-up');
        }
        if (target.classList.contains('ratio-sort')) {
            target.classList.toggle('sort-up');
        }
        const deeds = [...document.querySelectorAll('.item')];


        deeds.sort((a, b) => {
            switch (target.className.split(' ')[0]) {
                case 'name-sort':
                    a = a.innerText;
                    b = b.innerText;
                    break;
                case 'ratio-sort':
                    a = a.querySelector('.ratio-icon').getAttribute('priority');
                    b = b.querySelector('.ratio-icon').getAttribute('priority');
            }

            if (target.className.split(' ')[2]) {
                return a < b ? 1 :
                    a > b ? -1 : 0;
            }
            return a < b ? -1 :
                a > b ? 1 : 0;

        });
        answers.innerHTML = '';
        deeds.forEach(item => {
            answers.append(item);
        })
    })
})




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

const ratioEl = ['low', 'hight', 'middle'];

rate.addEventListener('click', (e) => {
    displayRate(e);
})

const displayRate = (e) => {
    if (e.target.classList.contains('rate-item')) {
        if (rate.querySelectorAll('.rate-item').length < 2) {
            const activeItem = document.querySelector('.selected-ratio');
            for (let item of ratioEl) {
                if (!activeItem.classList.contains(item)) {
                    const li = document.createElement('li');
                    li.classList.add(item, 'rate-item');
                    li.setAttribute('data-color', item)
                    rate.append(li);
                }
            }
        } else {
            document.querySelectorAll('.rate-item').forEach(item => {
                e.target == item ? item.classList.add('selected-ratio') : item.remove();
            })
        }
    }
}


const clearRateList = () => {
    document.querySelectorAll('.rate-item').forEach(item => {
        item.classList.contains('selected-ratio') ? null : item.remove();
    })
}

deal.addEventListener('focus', () => {
    clearRateList();
})


document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.length > 0) {
        answers.classList.toggle('hidden');
    }
    for (i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const text = localStorage.getItem(key).split(' ').slice(0, localStorage.length-1).join(' ');
        const color = localStorage.getItem(key).split(' ')[localStorage.getItem(key).split(' ').length - 1];
        const item = addDeed(text);
        addRatio(item, color);
        removeDeed(item, key);
    }
})

filterButtons.forEach(item => {
    item.addEventListener('click', (e) => {
        const target = e.target;
        const buttons = filterButtons;
        buttons.forEach(item => {
            item == target ? target.classList.toggle('scaled') : item.classList.contains('scaled') ?
                item.classList.toggle('scaled') : null;
            target.classList.contains('scaled') ? activeFilter = target : activeFilter = undefined;
        })
        const activeElements = document.querySelectorAll('.item');
        if (activeElements.length == 0) return;

        if (activeFilter) {
            switch (activeFilter.getAttribute('data-priority')) {
                case '0':
                    filterByColor(0, activeElements, buttons)
                    break;
                case '1':
                    filterByColor(1, activeElements, buttons)
                    break;
                case '2':
                    filterByColor(2, activeElements, buttons)
                    break;
            }
        } else {
            filterByColor(buttons.length, activeElements, buttons)
        }

    })
})

const filterByColor = (scaled, activeElements, buttons) => {
    activeElements.forEach(item => {
        if (scaled < buttons.length) {
            item.firstChild.getAttribute('priority') == scaled ? item.style.display = 'flex' : item.style.display = 'none';
        } else {
            item.style.display = 'flex';
        }
    })
}