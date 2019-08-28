// let textInput = document.getElementById('text');
// let addButton = document.getElementById('add');
// let list = document.getElementById('list');
// let saveButton = document.getElementById('save');
// let id = 1;
// let attributeNumber = 0;
// let form = document.getElementById('form')


// function onEditItem(event) {
//     let item = event.target.closest('li');
//     let textSpan = item.firstElementChild
//     textInput.value = textSpan.textContent;
//     attributeNumber = textSpan.getAttribute('id')
//     form.setAttribute('class', 'edit')
// }


// function onDeleteItem(event) {
//     let item = event.target.closest('li');
//     list.removeChild(item);
// }

// function createElement(tag, text, className, events) {
//     let element = document.createElement(tag);
//     element.setAttribute('class', className);
//     element.innerHTML = text;
//     for (let eventName in events) {
//         element[eventName] = events[eventName];
//     }

//     return element;
// }

// addButton.onclick = function () {
//     let newLi = createElement('li', `<span id="${id}"> ${textInput.value} </span>`, 'list-item');
//     newLi.appendChild(createElement('a', 'Edit', 'btn btn-edit', { onclick: onEditItem }));
//     newLi.appendChild(createElement('a', 'Delete', 'btn btn-delete', { onclick: onDeleteItem }));
//     list.appendChild(newLi);
//     textInput.value = '';
//     id = id + 1;
// }


// saveButton.onclick = function () {
//     let el = document.getElementById(`${attributeNumber}`)
//     var text = textInput.value;
//     el.innerHTML = text;
//     textInput.value = '';
//     form.setAttribute('class', 'new')
// }



function ShoppingList(root) {
    this.root = root,
    this.id = 1,
    this.textInput = root.querySelector('#text'),
    this.addButton = root.querySelector('#add'),
    this.list = root.querySelector('#list'),
    this.saveButton = root.querySelector('#save'),
    this.attributeNumber = 0,
    this.form = root.querySelector('#form')
    this.addButton.onclick = this.add.bind(this)
    this.onEditItem = this.onEdit.bind(this)
    this.onDeleteItem = this.onDelete.bind(this)
    this.saveButton.onclick = this.save.bind(this)
}



ShoppingList.prototype.add = function () {
    let newLi = createElement('li', `<span id="${this.id}"> ${this.textInput.value} </span>`, 'list-item');
    newLi.appendChild(createElement('a', 'Edit', 'btn btn-edit', { onclick: this.onEditItem }));
    newLi.appendChild(createElement('a', 'Delete', 'btn btn-delete', { onclick: this.onDeleteItem }));
    this.list.appendChild(newLi);
    this.textInput.value = '';
    this.id = this.id + 1;
}

ShoppingList.prototype.save = function () {
    let el = document.getElementById(`${this.attributeNumber}`)
    var text = this.textInput.value;
    el.innerHTML = text;
    this.textInput.value = '';
    this.form.setAttribute('class', 'new')

}
ShoppingList.prototype.onEdit = function () {
    let item = event.target.closest('li');
    let textSpan = item.firstElementChild
    this.textInput.value = textSpan.textContent;
    this.attributeNumber = textSpan.getAttribute('id')
    this.form.setAttribute('class', 'edit')
}

ShoppingList.prototype.onDelete = function () {
    let item = event.target.closest('li');
    this.list.removeChild(item);
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

let allLists= document.querySelectorAll('.shopping-list')

for (let i=0; i<allLists.length; i++) {
    new ShoppingList(allLists[i])
}
