let addList = document.querySelector('.btn-newlist');
let inputName = document.querySelector('#name');
let idList = 1;

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
    // this.spanDone =  this.unDone.bind(this),
    // this.deleteList = root.querySelector('.btn-delete-list')
    // this.deleteList.onclick = this.deleteListComplete.bind(this)
}


function reqListener(source, callback) {
    let request = new XMLHttpRequest();
    request.open('GET', source, true);
    request.onload = function () {
        // var response = this.response
        callback(this.response)
    }
    request.send(null)
}

addList.onclick = function (event) {
    let item = event.target.closest('div').nextElementSibling;
    reqListener('./assets/templateList.html', function callback(resp) {
        let listItem = Mustache.render(resp, { idList: idList, name: inputName.value })

        // Crear nodo
        let template = document.createElement('template');
        template.innerHTML = listItem;
        // Insertar
        item.appendChild(template.content)

        new ShoppingList(document.querySelector(`#list-${idList}`), inputName.value)
        inputName.value = '';
    });
    idList = idList + 1;
}

ShoppingList.prototype.render = function (resp) {
    let listItem = Mustache.render(resp, { id: this.id, text: this.textInput.value })
    // Crear nodo
    let template = document.createElement('template');
    template.innerHTML = listItem;

    // Insertar
    this.list.appendChild(template.content);

    // Binding de botones 
    let newLi = this.list.querySelector(`#li-${this.id}`)
    newLi.querySelector('.btn-edit').onclick = this.onEdit
    newLi.querySelector('.btn-delete').onclick = this.onDelete
    newLi.querySelector('.spanLi').onclick = this.span
    this.textInput.value = '';
    this.id = this.id + 1;
}

ShoppingList.prototype.add = function () {
    reqListener('./assets/template.html', this.render.bind(this));
}

ShoppingList.prototype.save = function () {
    let el = this.list.querySelector(`#${this.attributeNumber}`)
    let textSpan = el.firstElementChild
    textSpan.textContent = this.textInput.value;
    this.textInput.value = '';
    this.form.setAttribute('class', 'new')

}

ShoppingList.prototype.onEdit = function () {
    let item = event.target.closest('li');
    let textSpan = item.firstElementChild
    this.textInput.value = textSpan.textContent;
    this.attributeNumber = item.getAttribute('id')
    this.form.setAttribute('class', 'edit')
}

ShoppingList.prototype.onDelete = function () {
    let item = event.target.closest('li');
    this.list.removeChild(item);
}

ShoppingList.prototype.done = function (event) {
    let thislistDone = this.listDone
    let item = event.target.closest('li');
    let textSpan = item.firstElementChild
    item.remove();
    reqListener('./assets/templateDone.html', function callback(resp) {
        let listItem = Mustache.render(resp, { span: textSpan.textContent, id: this.id })
        let template = document.createElement('template');
        template.innerHTML = listItem
        thislistDone.appendChild(template.content)
    });
}


// ShoppingList.prototype.add = function (event) {
//     let thislist = this
//     reqListener('./assets/template.html', function callback(resp) {
//         console.log(resp);
//         // Interpolar vista y modelo
//         let listItem = Mustache.render(resp, { id: thislist.id, text: thislist.textInput.value })

//         // Crear nodo
//         let template = document.createElement('template');
//         template.innerHTML = listItem;

//         // Insertar
//         thislist.list.appendChild(template.content);

//         // Binding de botones 
//         let newLi = thislist.list.querySelector(`#li-${thislist.id}`)
//         newLi.querySelector('.btn-edit').onclick = thislist.onEdit
//         newLi.querySelector('.btn-delete').onclick = thislist.onDelete
//         newLi.querySelector('.spanLi').onclick = thislist.span
//         thislist.textInput.value = '';
//         thislist.id = thislist.id + 1;
//     });
// }


// ShoppingList.prototype.unDone = function (event) {
//     let thislistDone = this.listDone
//     let item = event.target.closest('li'); 
//     console.log(item)
//     thislistDone.querySelector('.done') = thislistDone.spanDone
// }



// ShoppingList.prototype.deleteListComplete = function () {
//     let thislist = this;
//     console.log(thislist)
//     thislist = null;
// }
