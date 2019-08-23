let textInput = document.getElementById('text');
let addButton = document.getElementById('add');
let list = document.getElementById('list');
let saveButton = document.getElementById('save');
let id = 1;
let attributeNumber = 0;
let form = document.getElementById('form')


function onEditItem(event) {
    let item = event.target.closest('li');
    let textSpan = item.firstElementChild
    textInput.value = textSpan.textContent;
    attributeNumber = textSpan.getAttribute('id')
    form.setAttribute('class', 'edit')
}


function onDeleteItem(event) {
    let item = event.target.closest('li');
    list.removeChild(item);
}

function createElement(tag, text, className, events) {
    let element = document.createElement(tag);
    element.setAttribute('class', className);
    element.innerHTML = text;
    for (let eventName in events) {
        element[eventName] = events[eventName];
    }

    return element;
}

addButton.onclick = function () {
    let newLi = createElement('li', `<span id="${id}"> ${textInput.value} </span>`, 'list-item');
    newLi.appendChild(createElement('a', 'Edit', 'btn btn-edit', { onclick: onEditItem }));
    newLi.appendChild(createElement('a', 'Delete', 'btn btn-delete', { onclick: onDeleteItem }));
    list.appendChild(newLi);
    textInput.value = '';
    id = id + 1;
}


saveButton.onclick = function () {
    let el = document.getElementById(`${attributeNumber}`)
    var text = textInput.value;
    el.innerHTML = text;
    textInput.value = '';
    form.setAttribute('class', 'new')
}