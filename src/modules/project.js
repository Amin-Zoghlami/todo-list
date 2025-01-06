export default class Project {
    title;
    todos = [];
    
    constructor (title) {
        this.title = title;
    }
    
    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(i) {
        this.todos.splice(i, 1);
    }
};
