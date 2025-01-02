export default class Project {
    #title;
    #todos = [];
    
    constructor (title) {
        this.#title = title;
    }
    
    setTitle(title) {
        this.#title = title;
    }

    getTitle() {
        return this.#title;
    }

    getTodos() {
        return [...this.#todos];
    }
    
    getTodo(index) {
        return this.getTodos()[index];
    }

    getTodoTitle(index) {
        return this.getTodo(index).getTitle();
    }

    getTodoDescription(index) {
        return this.getTodo(index).getDescription();
    }

    getTodoDueDate(index) {
        return this.getTodo(index).getDueDate();
    }

    getTodoPriority(index) {
        return this.getTodo(index).getPriority();
    }
    
    size() {
        return this.getTodos().length;
    }
    
    setTodoProperties(title, description, dueDate, priority, index) {
        const todo = this.#todos[index];
        todo.setTitle(title);
        todo.setDescription(description);
        todo.setDueDate(dueDate);
        todo.setPriority(priority);
    }

    addTodo(todo) {
        this.#todos.push(todo);
    }

    removeTodo(index) {
        this.#todos.splice(index, 1);
    }

    
};