var input = document.getElementById("userInput");
var enter = document.getElementById("enter");
var ul = document.querySelector("ul");
var inputContainer = document.getElementsByClassName("input-container")[0];
var error = document.createElement('div');
    error.classList.add('error');
    error.innerHTML = 'Write something!';

function inputLength(){
    return input.value.length;
}

function createItem(){
    var li = document.createElement('li');
    var text = document.createTextNode(input.value);
    li.appendChild(text);
    ul.appendChild(li);
    input.value = "";

    var deleteBtn = document.createElement("button");
	deleteBtn.appendChild(document.createTextNode("X"));
	li.appendChild(deleteBtn);
	deleteBtn.addEventListener("click", deleteItem);

    function deleteItem(){
        var deleteMsg = confirm("Are you sure to delete?");
        if (deleteMsg){
		ul.removeChild(li);
        }
	}
}

function checkAndCreateItem() {
    if (inputLength() > 0) {
        createItem();
        inputContainer.removeChild(error);
    } else {
        inputContainer.prepend(error);
    }
}

function search() {
    var filter = document.getElementById("filter");
    var list = document.querySelectorAll("li");
    let search = filter.value.toLowerCase();
    for (let i of list) {
        let item = i.innerHTML.toLowerCase();
        if (item.indexOf(search) == -1) { i.classList.add("hide"); }
        else { i.classList.remove("hide"); }
      }
}

enter.addEventListener('click', checkAndCreateItem);
