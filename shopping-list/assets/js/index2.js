let addList = document.querySelector(".btn-newlist");
let inputName = document.querySelector("#name");
let idList = 1;
let itemDone = 0;
let itemAdded = document.querySelector(".allLists");

function ShoppingList(root, name) {
	this.root = root,
	this.name = name,
	this.id = 1,
	this.textInput = root.querySelector("#text"),
	this.addButton = root.querySelector("#add"),
	this.list = root.querySelector("#list"),
	this.listDone = root.querySelector("#list-done");
	this.saveButton = root.querySelector("#save"),
	this.attributeNumber = 0,
	this.form = root.querySelector("#form"),
	this.addButton.onclick = this.add.bind(this),
	this.onEdit = this.onEdit.bind(this),
	this.onDelete = this.onDelete.bind(this),
	this.saveButton.onclick = this.save.bind(this),
	this.span = this.done.bind(this)

}

function reqListener(source, callback) {
	let request = new XMLHttpRequest();
	request.open("GET", source, true);
	request.onload = function () {
		callback(this.response)
	}
	request.send(null)
}

addList.onclick = function (event) {
	let item = event.target.closest("div").nextElementSibling;
	console.log("ITEM  " + item)
	reqListener("./assets/templates/templateList.html", function callback(resp) {
		let listItem = Mustache.render(resp, {idList: idList, name: inputName.value})

		// Crear nodo
		let template = document.createElement("template");
		template.innerHTML = listItem;
		// Insertar
		// item.appendChild(template.content)
		item.insertBefore(template.content, item.querySelector(".break"))
		measureHeight(item);

		new ShoppingList(document.querySelector(`#list-${idList}`), inputName.value)
		inputName.value = "";
	});
	idList = idList + 1;
}

function measureHeight(cont) {
	// Para cada columna sumamos el total de las alturas de sus cartas
	let totalHeight = [0, 0, 0, 0];
	cont.querySelectorAll(".shopping-list:nth-of-type(4n):not(.break)").forEach(el => {
		totalHeight[0] += el.offsetHeight + 20;
	});
	cont.querySelectorAll(".shopping-list:nth-of-type(4n + 1):not(.break)").forEach(el => {
		totalHeight[1] += el.offsetHeight + 20;
	});
	cont.querySelectorAll(".shopping-list:nth-of-type(4n + 2):not(.break)").forEach(el => {
		totalHeight[2] += el.offsetHeight + 20;
	});
	cont.querySelectorAll(".shopping-list:nth-of-type(4n + 3):not(.break)").forEach(el => {
		totalHeight[3] += el.offsetHeight + 20;
	});

	console.log("total height", totalHeight);
	let max = 0;
	totalHeight.forEach(i => {
		if (i > max) max = i;
	});
	console.log("max", max);
	cont.style.minHeight = (max + 40) + "px";
}

ShoppingList.prototype.render = function (resp) {
	let listItem = Mustache.render(resp, {id: this.id, text: this.textInput.value})
	// Crear nodo
	let template = document.createElement("template");
	template.innerHTML = listItem;
	console.log(template.content)
	console.log("listItem" + listItem)
	// Insertar
	this.list.appendChild(template.content);

	
	//Volver a llamar 
	measureHeight(itemAdded)

	// Binding de botones 
	let newLi = this.list.querySelector(`#li-${this.id}`)
	newLi.querySelector(".btn-edit").onclick = this.onEdit
	newLi.querySelector(".btn-delete").onclick = this.onDelete
	newLi.querySelector(".spanLi").onclick = this.span
	this.textInput.value = "";
	this.id = this.id + 1;
}

ShoppingList.prototype.add = function () {
	reqListener("./assets/templates/template.html", this.render.bind(this));
}

ShoppingList.prototype.save = function () {
	let el = this.list.querySelector(`#${this.attributeNumber}`)
	let textSpan = el.firstElementChild
	textSpan.textContent = this.textInput.value;
	this.textInput.value = "";
	this.form.setAttribute("class", "item-form new")

}

ShoppingList.prototype.onEdit = function () {
	let item = event.target.closest("li");
	let textSpan = item.firstElementChild
	this.textInput.value = textSpan.textContent;
	this.attributeNumber = item.getAttribute("id")
	this.form.setAttribute("class", "item-form edit")
}

ShoppingList.prototype.onDelete = function () {
	let item = event.target.closest("li");
	this.list.removeChild(item);
}

ShoppingList.prototype.renderDone = function (resp) {
	let textSpan = itemDone.firstElementChild
	itemDone.remove();
	let listItem = Mustache.render(resp, {span: textSpan.textContent, id: this.id})
	let template = document.createElement("template");
	template.innerHTML = listItem
	this.listDone.appendChild(template.content)
}

ShoppingList.prototype.done = function (event) {
	itemDone = event.target.closest("li");
	reqListener("./assets/templates/templateDone.html", this.renderDone.bind(this));
}
