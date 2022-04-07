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
            this.item = dealWrapper;
            close.addEventListener('click', () => {
                this.item.remove();
                appear();
            })
            appear();
        } else {
            
            tip.classList.toggle('hidden')
            setTimeout( () => {
                tip.style.opacity = '1';
            },100)
            setTimeout( () => {
                tip.style.opacity = '0';
            },2300)
            setTimeout( () => {
                tip.classList.toggle('hidden');
            },3000)
           
            
        }
    }
}


button.addEventListener('click', () => {
    const item = new Deed(deal.value);
    item.createDeed();
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