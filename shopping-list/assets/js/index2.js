
var request = new XMLHttpRequest();

function ShoppingList(root, name) {
    this.root = root,
    this.name = name,
    this.id = 1,
    this.textInput = root.querySelector('#text'),
    this.addButton = root.querySelector('#add'),
    this.list = root.querySelector('#list'),
    this.listDone = root.querySelector('#list-done');
    this.saveButton = root.querySelector('#save'),
    this.attributeNumber = 0,
    this.form = root.querySelector('#form'),
    this.addButton.onclick = this.add.bind(this),
    this.onEdit = this.onEdit.bind(this),
    this.onDelete = this.onDelete.bind(this),
    this.saveButton.onclick = this.save.bind(this),
    this.span = this.done.bind(this)
}

ShoppingList.prototype.add = function (event) {
    let thislist = this
    // console.log(event.currentTarget.response)
    request.open('GET', './assets/template.html', true);
    request.onload = function () {
        console.log(this.response)

        // Interpolar vista y modelo
        let listItem = Mustache.render(this.response, { id: thislist.id, text: thislist.textInput.value })

        // Crear nodo
        let template = document.createElement('template');
        template.innerHTML = listItem;

        // Insertar
        thislist.list.appendChild(template.content);

        // Binding de botones 
        thislist.list.querySelector('.btn-edit').onclick = thislist.onEdit.bind(thislist)
        thislist.list.querySelector('.btn-delete').onclick = thislist.onDelete.bind(thislist)
        thislist.list.querySelector('.spanLi').onclick = thislist.span.bind(thislist)
        thislist.textInput.value = '';
        thislist.id = thislist.id + 1;
    }
    request.send(null)
}

ShoppingList.prototype.save = function () {
    let el = document.getElementById(`${this.attributeNumber}`)
    var text = this.textInput.value;
    el.innerHTML = text;
    this.textInput.value = '';
    this.form.setAttribute('class', 'new')

}
ShoppingList.prototype.onEdit = function () {
    console.log(this)
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

ShoppingList.prototype.done = function () {
    let item = event.target.closest('li');
    let textSpan = item.firstElementChild
    item.remove();
    // console.log(item)
    let itemTemplate = '<li id="li-{{id}}"> {{span}} </li>';
    let listItem = Mustache.render(itemTemplate, { span: textSpan.textContent, id: this.id })
    // console.log(listItem)
    let template = document.createElement('template');
    template.innerHTML = listItem
    this.listDone.appendChild(template.content);
    // console.log(item)
}


let addList = document.querySelector('.btn-newlist');
let inputName = document.querySelector('#name');
let idList = 1;


addList.onclick = function (event) {
    let item = event.target.closest('div').nextElementSibling;
    console.log(item)
    request.open('GET', './assets/templateList.html', true);
    request.onload = function () {
        let listItem = Mustache.render(this.response, { idList: idList, name: inputName.value })
        // console.log(listItem)
        // Crear nodo
        let template = document.createElement('template');
        template.innerHTML = listItem;
        // Insertar
        // item.appendChild(template.content);
        item.appendChild(template.content)

        new ShoppingList(document.querySelector('.shopping-list'), inputName.value)
    }
    request.send(null)
    idList = idList + 1;
}




