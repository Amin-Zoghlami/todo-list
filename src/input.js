import Todo from "./todo.js"
import Project from "./project.js"
import App from "./app.js";

export default class Input {
    projectContainer = document.querySelector(".project-container");
    projectDialog = document.querySelector("dialog.project");
    projectForm = document.querySelector("form.project");
    projectSubmit = document.querySelector(".submit-project");

    todoDialog = document.querySelector("dialog.todo");
    todoForm = document.querySelector("form.todo");
    todoSubmit = document.querySelector(".submit-todo");

    constructor() {
        this.app = new App();
        
    }
    
    addInputs() {
        this.addShowProjectInput();
        this.addCloseButtons();
        this.addSubmitProjectInput();
        this.addSubmitTodoInput();
    }
    
    addShowProjectInput() {
        this.showProjectButton.addEventListener("click", () => {
            this.projectDialog.showModal();
        });
    }

    addCloseButtons() {
        this.closeProjectButton.addEventListener("click", (e) => {
            e.preventDefault();
           
            this.projectDialog.close();
            this.projectForm.reset();
        });

        this.closeTodoButton.addEventListener("click", (e) => {
            e.preventDefault();
            
            this.todoDialog.close();
            this.todoForm.reset();
        });
    }

    addSubmitProjectInput() {
        this.submitProjectButton.addEventListener("click", (e) => {
            if (this.projectForm.checkValidity()) {
                e.preventDefault();
                
                const projectTitle = this.projectForm.querySelector("title").value;
                const projectIndex = this.app.projects.length;

                this.app.addProject(new Project(projectTitle));

                this.addProjectDisplay(projectTitle, projectIndex);

                this.projectDialog.close();
                this.projectForm.reset();
            }
        });
    }

    addProjectDisplay(projectTitle, projectIndex) {
        const projectElement = document.createElement("li");
        projectElement.classList.add("project");
        projectElement.setAttribute("data-index", `${projectIndex}`);
        this.addProjectInput(projectElement);
        
        const h1 = document.createElement("h1");
        h1.textContent = projectTitle;
        
        this.projectElement.appendChild(h1);
        this.projectContainer.appendChild(projectElement);
    }

    addProjectInput(projectElement) {
        projectElement.addEventListener("click", (e) => {
            this.display.removeContainer(this.mainHeader);
            
            const headTitle = document.createElement("h1");
            this.display.addText(projectTitle, headTitle, this.mainHeader);

            const headAdd = this.createShowAddTodo(projectIndex);
            this.display.addElement(headAdd, this.mainHeader);

            const headRemove = this.createRemoveProject(projectIndex);
            this.display.addElement(headRemove, this.mainHeader);
            
            this.updateTodos(projectIndex);
        });
    }

    createShowAddTodo(projectIndex) {
        const headAdd = document.createElement("button"); 
        headAdd.textContent = "Add Todo";
        headAdd.setAttribute("data-mode", "add");
        headAdd.setAttribute("data-project-index", `${projectIndex}`);
        this.addShowTodoInput(headAdd);
        return headAdd;
    }
    
    createRemoveProject(projectIndex) {
        const headRemove = document.createElement("button"); 
        headRemove.textContent = "Remove Todo";
        headRemove.setAttribute("data-project-index", `${projectIndex}`);
        this.addRemoveProjectInput(headRemove);
        return headRemove;
    }

    addRemoveProjectInput(headRemove) {
        headRemove.addEventListener("click", (event) => {
            const projectIndex = event.target.dataset.projectIndex;
            this.app.removeProject(projectIndex);
            console.log(document.querySelector(`[data-index="${projectIndex}"]`));
            document.querySelector(`[data-index="${projectIndex}"]`).remove();
            this.display.removeContainer(this.todoContainer);
        });
    }
    
    updateTodos(projectIndex) {
        const todosLength = this.app.getProjectSize(projectIndex);
        this.display.removeContainer(this.todoContainer);
        for (let i = 0; i < todosLength; i++) {
            const todo = document.createElement("li");
            
            const todoTitle = document.createElement("p");
            this.display.addText(this.app.getTodoTitle(projectIndex, i), todoTitle, todo);
            
            const todoEdit = this.createShowEditTodo(projectIndex, i);
            this.display.addElement(todoEdit, todo);
            
            const todoRemove = document.createElement("button");
            todoRemove.textContent = "Remove Todo";
            todo.appendChild(todoRemove);
        
            this.todoContainer.appendChild(todo);
        }
    }

    addTodo(projectIndex) {
        const todosLength = this.app.getProjectSize(projectIndex) - 1;
        const todo = document.createElement("li"); 
        
        const todoTitle = document.createElement("p");
        this.display.addText(this.app.getTodoTitle(projectIndex, todosLength), todoTitle, todo);
            
        const todoEdit = this.createShowEditTodo(projectIndex, todosLength);
        this.display.addElement(todoEdit, todo);
            
        const todoRemove = document.createElement("button");
        todoRemove.textContent = "Remove Todo";
        todo.appendChild(todoRemove);
        
        this.todoContainer.appendChild(todo);
    }

    editTodo(projectIndex, todoIndex) {
        const todosLength = this.app.getProjectSize(todoIndex);

        const todo = document.querySelector(`[data-todo-index="${todoIndex}"]`);

        todo.textContent = this.app.getTodoTitle(projectIndex, todoIndex);
    }

    createShowEditTodo(projectIndex, todoIndex) {
        const todoEdit = document.createElement("button");
        todoEdit.textContent = "Edit Todo";
        todoEdit.setAttribute("data-mode", "edit");
        todoEdit.setAttribute("data-project-index", `${projectIndex}`);
        todoEdit.setAttribute("data-todo-index", `${todoIndex}`);
        todoEdit.setAttribute("data-mode", "edit");
        this.addShowTodoInput(todoEdit);
        return todoEdit;
    }

    addShowTodoInput(showTodo) {
        showTodo.addEventListener("click", () => {
            this.addTodoDialog.showModal();
            this.submitTodoButton.setAttribute("data-mode", showTodo.dataset.mode);
            this.submitTodoButton.setAttribute("data-project-index", showTodo.dataset.projectIndex);
            if (showTodo.dataset.mode) {
                this.submitTodoButton.setAttribute("data-todo-index", showTodo.dataset.todoIndex);
            }
        });
    }

    addSubmitTodoInput() {
        this.submitTodoButton.addEventListener("click", (event) => {
            if (this.addTodoForm.checkValidity()) {
                event.preventDefault();
                
                const title = document.querySelector(".add.todo title").value;
                const description = document.querySelector(".add.todo description").value;
                const dueDate = document.querySelector(".add.todo due-date").value;
                const priority = document.querySelector('.add.todo [name="priority"]:checked').value;
                const projectIndex = event.target.dataset.projectIndex;
                
                if (event.target.dataset.mode == "add") {
                    this.app.addTodo(title, description, dueDate, priority, projectIndex);
                    this.addTodo(projectIndex);
                } else {
                    const todoIndex = event.target.dataset.projectIndex;
                    this.app.setTodoProperties(title, description, dueDate, priority, projectIndex, todoIndex);
                    this.editTodo(projectIndex, todoIndex);
                }

                this.updateTodos(projectIndex);
                console.log(this.app.getProjectTodos(projectIndex));
                this.display.hideTodoDialog();
                this.addTodoForm.reset();
            }
        });
    }

    refactorIndices() {

    }
};