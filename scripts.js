const template = document.createElement('template');
template.innerHTML = `
    <li class="todo-item"></li>
  `;

class Todo extends HTMLElement {

    static get observedAttributes() {
        return ['completed'];
    }

    get completed() {
        return this.hasAttribute('completed');
    }

    set completed(val) {
        console.log('componeted', val)
        if (val) {
            this.setAttribute('completed', true);
            this.setAttribute('style', 'background:pink;')
        } else {
            this.removeAttribute('completed');
            this.setAttribute('style', 'background:none;')
        }
    }

    constructor(text) {
        super()

        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._testSlot = this.shadowRoot.querySelector('.todo-item')

        this._testSlot.innerHTML = this.getAttribute('data-todo')

        this._testSlot.addEventListener('click', this._onClicked)
    }

    _onClicked(event) {
        console.log('clicked', event)
    }

    connectedCallback() {

    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue) {
            this._testSlot.setAttribute('style', 'background:pink;')
        }
    }
}

customElements.define('todo-item', Todo);

let state = {
    todos: [
        'let',
        'us',
        'test',
        'document',
        'fragment'
    ]
}

const addTodo = () => {
    const $todo = document.getElementById('new-todo')
    const todo = $todo.value

    state.todos.push(todo)
    appendTodo(todo)

    $todo.value = ''
}

const appendInitialTodos = (todos) => {
    let fragment = document.createDocumentFragment()

    todos.forEach(todo => {
        const $todo = document.createElement('todo-item')
        const text = document.createTextNode(todo)
        $todo.appendChild(text)
        $todo.setAttribute('data-todo', todo)
        fragment.appendChild($todo)
    })

    console.log(fragment)
    const $todos = document.getElementById('todos')
    $todos.appendChild(fragment)
}

const appendTodo = (todo) => {
    const $todo = new Todo(todo)
    console.log($todo)
    const $todos = document.getElementById('todos')
}

appendInitialTodos(state.todos)
