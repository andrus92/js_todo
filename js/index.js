const addMessage = document.querySelector('.message');
const addButton = document.querySelector('.btn_add');
const todo = document.querySelector('.todo');
const locStorageTodo = 'JS_todo';

const removeBtns = document.querySelectorAll('.btn_remove');
removeBtns.forEach((item) => {
    item.addEventListener('click', () => {
        console.log('remove');
    });
})

let todoList = [];

function displayMessages() {
    todo.innerHTML = '';
    let displayMessage = '';
    if (todoList.length > 0) {
        todoList.forEach((item, index) => {
            displayMessage += `
                <li id="${index}">
                    <div class="checkbox">
                        <input type="checkbox" class="checkbox_input" id="checkbox_${index}" ${item.checked ? 'checked' : ''}>
                        <label for="checkbox_${index}" class="checkbox_label ${item.important ? 'important' : ''}">${item.todo}</label>
                    </div>
                    <button class="btn_remove">X</button>
                </li>
            `;
            todo.innerHTML = displayMessage;
        });
    
        const removeBtns = document.querySelectorAll('.btn_remove');
        removeBtns.forEach((item) => {
            item.addEventListener('click', (event) => {
                const id = event.target.closest('li').id;
                todoList.splice(id, 1);
                localStorage.setItem(locStorageTodo, JSON.stringify(todoList));
                displayMessages();
            });
        });
    }
};

if (localStorage.getItem(locStorageTodo)) {
    todoList = JSON.parse(localStorage.getItem(locStorageTodo));
    displayMessages();
}

addButton.addEventListener('click', () => {
    if (addMessage.value !== '') {
        let newTodo = {
            todo: addMessage.value,
            checked: false,
            important: false,
        }
    
        todoList.push(newTodo);
        addMessage.value = '';
        displayMessages();
        localStorage.setItem(locStorageTodo, JSON.stringify(todoList));
    }
});

todo.addEventListener('change', (event) => {
    const id = event.target.closest('li').id;
    todoList[id].checked = !todoList[id].checked;
    localStorage.setItem(locStorageTodo, JSON.stringify(todoList));

});

todo.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    const id = event.target.closest('li').id;
    todoList[id].important = !todoList[id].important;
    localStorage.setItem(locStorageTodo, JSON.stringify(todoList));
    displayMessages();
});