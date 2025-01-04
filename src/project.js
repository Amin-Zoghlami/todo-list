export default class Project {
    title;
    todos = [];
    
    constructor (title) {
        this.title = title;
    }
    
    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(index) {
        this.todos.splice(index, 1);
    }
};
