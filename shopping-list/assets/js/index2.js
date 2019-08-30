

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

var request = new XMLHttpRequest();
request.open('GET', './assets/template.html', true); 
//   request.onload = onSuccess;
//   request.onerror = onError;

request.onload = function () {
    console.log(this.response)
  }

request.send(null)


function reqListener(event) {
 console.log(event)
}

ShoppingList.prototype.add = function () {
 
    // Interpolar vista y modelo
    let itemTemplate = '<li id="li-{{id}}"> <span id="{{id}}"> {{text}} </span> <a class="btn btn-edit">Edit</a> <a class="btn btn-delete">Delete</a></li>';
    let listItem = Mustache.render(itemTemplate, { id: this.id, text: this.textInput.value })
   
    // Crear nodo
    let template = document.createElement('template');
    template.innerHTML = listItem;

    // Insertar
    this.list.appendChild(template.content);

    // Binding de botones 
    this.list.querySelector('.btn-edit').onclick = this.onEdit.bind(this)
    this.list.querySelector('.btn-delete').onclick = this.onDelete.bind(this)
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

// function createElement(tag, text, className, events) {
//     let element = document.createElement(tag);
//     element.setAttribute('class', className);
//     element.innerHTML = text;
//     for (let eventName in events) {
//         element[eventName] = events[eventName];
//     }

//     return element;
// }

let allLists = document.querySelectorAll('.shopping-list')
// console.log(allLists)
for (let i = 0; i < allLists.length; i++) {
    new ShoppingList(allLists[i])   
}

// let listStructure = '<div class="container shopping-list"><span id="listTitle">{{title}}</span><ul id="list"> </ul> <hr /> <div id="form" class="new"> <input id="text" type="text" /> <a id="add" class="btn">Add</a> <a id="save" class="btn">Save</a> </div> </div>'
// let inputGeneral = document.getElementById("name");
// let listsContainer = document.getElementById("lists")

// let btnAdd = document.querySelector('.btn-newlist');
// btnAdd.onclick = function () {
//     let listsName = Mustache.render(listStructure, { title: inputGeneral.value })

//     // Crear nodo
//     let template = document.createElement('template');
//     template.innerHTML = listsName;

//     // Insertar
//     listsContainer.appendChild(template.content);
//     console.log(this);
    
// }
