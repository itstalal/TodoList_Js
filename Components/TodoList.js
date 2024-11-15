import { createElement } from "../functions/dom.js";

export class TodoList {
  #todos = [];
  #listElement = [];

  constructor(todos) {
    this.#todos = todos;
  }

  appendTo(element) {
    element.innerHTML = `<form class="d-flex pb-4">
        <input
          type="text"
          class="form-control"
          id="title"
          name="title"
          aria-describedby="emailHelp"
          placeholder="acheter de patates..."
        />
        <button class="btn btn-primary">Ajouter</button>
      </form>
      <main>
        <div class="btn-group mb-4 filter">
            <button type="button" class="btn btn-primary active">Toutes</button>
            <button type="button" class="btn btn-primary ">A faire</button>
            <button type="button" class="btn btn-primary ">Faites</button>
        </div>
      
      <ul class="list-group ">

      </ul>
      </main>`;
      this.#listElement = element.querySelector('.list-group')
      for(let todo of this.#todos){
        const t= new TodoListItem(todo)
        t.appendTo(this.#listElement)
      }
      element.querySelector('form').addEventListener('submit', e=> this.onSubmit(e))
  }

  onSubmit(e){
    e.preventDefault()
    const title = new FormData(e.currentTarget).get('title').toString().trim();
    if(title === ''){
        return 
    }
    const todo = {
        id: Date.now(),
        title,
        completed : false
    }
    const item = new TodoListItem(todo)
    item.appendTo(this.#listElement)
  }
}

class TodoListItem {
    #element;
    constructor(todo) {
        const id = `todo-${todo.id}`;

        const li = createElement("li", {
            class: "list-group-item d-flex align-items-center",
        });

        const checkbox = createElement("input", {
            class: "form-check-input me-1",
            type: "checkbox",
            id,
            checked: todo.completed ? ' ' : null,
        });

        const label = createElement("label", {
            class: "form-check-label flex-grow-1",
            for: id,
        });
        label.innerText = todo.title;

        const button = createElement("button", {
            class: 'btn btn-danger btn-sm ms-auto', 
        });
        button.innerHTML = '<i class="bi bi-trash3-fill"></i>';

        li.append(checkbox);
        li.append(label);
        li.append(button);

        button.addEventListener('click', (e)=> this.remove(e))

        this.#element = li;
    }

    appendTo(element) {
        element.append(this.#element);
    }

    remove (e){
        e.preventDefault();
        this.#element.remove();
    }
}

