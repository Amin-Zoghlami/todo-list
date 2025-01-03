import Todo from "./todo.js";
import Project from "./project.js";

export default class App {
    #projects = [];
    
    getProjects() {
        return [...this.#projects];
    }

    getProject(index) {
        return this.getProjects()[index];
    }

    getProjectTitle(index) {
        return this.getProject(index).getTitle();
    }

    getProjectTodos(index) {
        return this.getProject(index).getTodos();
    }

    getTodo(projectIndex, todoIndex) {
        return this.getProject(projectIndex).getTodo(todoIndex);
    }

    getTodoTitle(projectIndex, todoIndex) {
        return this.getProject(projectIndex).getTodoTitle(todoIndex);
    }

    getTodoDescription(projectIndex, todoIndex) {
        return this.getProject(projectIndex).getTodoDescription(todoIndex);
    }

    getTodoDueDate(projectIndex, todoIndex) {
        return this.getProject(projectIndex).getTodoDueDate(todoIndex);
    }

    getTodoPriority(projectIndex, todoIndex) {
        return this.getProject(projectIndex).getTodoPriority(todoIndex);
    }
    
    getProjectsSize() {
        return this.getProjects().length;
    }

    getProjectSize(index) {
        return this.getProject(index).size();
    }

    setTodoProperties(title, description, dueDate, priority, projectIndex, todoIndex) {
        this.#projects[projectIndex].setTodoProperties(title, description, dueDate, priority, todoIndex);
    }
    
    addProject(title) {
        this.#projects.push(new Project(title));
    }

    addTodo(title, description,  dueDate, priority, index) {
        const newTodo = new Todo(title, description,  dueDate, priority);
        this.#projects[index].addTodo(newTodo);
    }

    removeProject(index) {
        this.#projects.splice(index, 1);
    }

    removeTodo(projectIndex, todoIndex) {
        this.#projects[projectIndex].removeTodo(todoIndex);
    }
}