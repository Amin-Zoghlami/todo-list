import App from "./app.js";
import Display from "./display.js";

export default class Input {
    
    #app;
   
    #display;

    #mainHeader;

    #addTodoDialog;
    #addTodoForm;
    #submitTodoButton;
    #closeTodoButton;

    #addProjectDialog;
    #addProjectForm;
    #showProjectButton;
    #submitProjectButton;
    #closeProjectButton;

    #projectContainer;
    #todoContainer;


    constructor() {
        this.#app = new App();
        this.#display = new Display();

        this.#initializeElements();

        this.#addInputs();
    }

    #initializeElements() {
        this.#mainHeader = document.querySelector(".main.header");

        this.#addTodoDialog = document.querySelector("dialog.add.todo");
        this.#addTodoForm = document.querySelector(".add.todo form");
        this.#submitTodoButton = document.querySelector(".submit.todo");
        this.#closeTodoButton = document.querySelector(".close.todo");

        this.#addProjectDialog = document.querySelector("dialog.add.project");
        this.#addProjectForm = document.querySelector(".add.project form");
        this.#showProjectButton = document.querySelector(".show.project");
        this.#submitProjectButton = document.querySelector(".submit.project");
        this.#closeProjectButton = document.querySelector(".close.project");

        this.#projectContainer = document.querySelector(".project.container");
        this.#todoContainer = document.querySelector(".todo.container");
    }
    
    #addInputs() {
        this.#addShowProjectInput();
        this.#addCloseButtons();
        this.#addSubmitProjectInput();
        this.#addSubmitTodoInput();
    }
    
    #addShowProjectInput() {
        this.#showProjectButton.addEventListener("click", () => {
            this.#display.showProjectDialog();
        });
    }

    #addCloseButtons() {
        this.#closeProjectButton.addEventListener("click", (event) => {
            event.preventDefault();
           
            this.#display.hideProjectDialog();
            this.#addProjectForm.reset();
        });

        this.#closeTodoButton.addEventListener("click", (event) => {
            event.preventDefault();
            
            this.#display.hideTodoDialog();
            this.#addTodoForm.reset();
        });
    }

    #addSubmitProjectInput() {
        this.#submitProjectButton.addEventListener("click", (event) => {
            const form = document.querySelector(".add.project form");

            if (this.#addProjectForm.checkValidity()) {
                event.preventDefault();
                
                const title = document.querySelector(".add.project #title").value;
                const projectIndex = this.#app.getProjectsSize();

                this.#addProjectDisplay(title, projectIndex);
                
                this.#app.addProject(title);

                this.#addProjectDialog.close();
                this.#addProjectForm.reset();
            }
        });
    }

    #addProjectDisplay(projectTitle, projectIndex) {
        const project = document.createElement("li");
        project.classList.add("project");
        project.setAttribute("data-index", `${projectIndex}`);
        this.#addProjectInput(project, projectTitle, projectIndex);
        
        const p = document.createElement("p");
        this.#display.addText(projectTitle, p, project);

        this.#display.addElement(project, this.#projectContainer);
    }

    #addProjectInput(project, projectTitle, projectIndex) {
        project.addEventListener("click", () => {
            this.#display.removeContainer(this.#mainHeader);
            
            
            const headTitle = document.createElement("h1");
            this.#display.addText(projectTitle, headTitle, this.#mainHeader);

            const headAdd = this.#createShowAddTodo(projectIndex);
            this.#display.addElement(headAdd, this.#mainHeader);

            const headRemove = this.#createRemoveProject(projectIndex);
            this.#display.addElement(headRemove, this.#mainHeader);
            
            this.#updateTodos(projectIndex);
        });
    }

    #createShowAddTodo(projectIndex) {
        const headAdd = document.createElement("button"); 
        headAdd.textContent = "Add Todo";
        headAdd.setAttribute("data-mode", "add");
        headAdd.setAttribute("data-project-index", `${projectIndex}`);
        this.#addShowTodoInput(headAdd);
        return headAdd;
    }
    
    #createRemoveProject(projectIndex) {
        const headRemove = document.createElement("button"); 
        headRemove.textContent = "Remove Todo";
        headRemove.setAttribute("data-project-index", `${projectIndex}`);
        this.#addRemoveProjectInput(headRemove);
        return headRemove;
    }

    #addRemoveProjectInput(headRemove) {
        headRemove.addEventListener("click", (event) => {
            const projectIndex = event.target.dataset.projectIndex;
            this.#app.removeProject(projectIndex);
            console.log(document.querySelector(`[data-index="${projectIndex}"]`));
            document.querySelector(`[data-index="${projectIndex}"]`).remove();
            this.#display.removeContainer(this.#todoContainer);
        });
    }
    
    #updateTodos(projectIndex) {
        const todosLength = this.#app.getProjectSize(projectIndex);
        this.#display.removeContainer(this.#todoContainer);
        for (let i = 0; i < todosLength; i++) {
            const todo = document.createElement("li");
            
            const todoTitle = document.createElement("p");
            this.#display.addText(this.#app.getTodoTitle(projectIndex, i), todoTitle, todo);
            
            const todoEdit = this.#createShowEditTodo(projectIndex, i);
            this.#display.addElement(todoEdit, todo);
            
            const todoRemove = document.createElement("button");
            todoRemove.textContent = "Remove Todo";
            todo.appendChild(todoRemove);
        
            this.#todoContainer.appendChild(todo);
        }
    }

    #addTodo(projectIndex) {
        const todosLength = this.#app.getProjectSize(projectIndex) - 1;
        const todo = document.createElement("li"); 
        
        const todoTitle = document.createElement("p");
        this.#display.addText(this.#app.getTodoTitle(projectIndex, todosLength), todoTitle, todo);
            
        const todoEdit = this.#createShowEditTodo(projectIndex, todosLength);
        this.#display.addElement(todoEdit, todo);
            
        const todoRemove = document.createElement("button");
        todoRemove.textContent = "Remove Todo";
        todo.appendChild(todoRemove);
        
        this.#todoContainer.appendChild(todo);
    }

    #editTodo(projectIndex, todoIndex) {
        const todosLength = this.#app.getProjectSize(todoIndex);

        const todo = document.querySelector(`[data-todo-index="${todoIndex}"]`);

        todo.textContent = this.#app.getTodoTitle(projectIndex, todoIndex);
    }

    #createShowEditTodo(projectIndex, todoIndex) {
        const todoEdit = document.createElement("button");
        todoEdit.textContent = "Edit Todo";
        todoEdit.setAttribute("data-mode", "edit");
        todoEdit.setAttribute("data-project-index", `${projectIndex}`);
        todoEdit.setAttribute("data-todo-index", `${todoIndex}`);
        todoEdit.setAttribute("data-mode", "edit");
        this.#addShowTodoInput(todoEdit);
        return todoEdit;
    }

    #addShowTodoInput(showTodo) {
        showTodo.addEventListener("click", () => {
            this.#addTodoDialog.showModal();
            this.#submitTodoButton.setAttribute("data-mode", showTodo.dataset.mode);
            this.#submitTodoButton.setAttribute("data-project-index", showTodo.dataset.projectIndex);
            if (showTodo.dataset.mode) {
                this.#submitTodoButton.setAttribute("data-todo-index", showTodo.dataset.todoIndex);
            }
        });
    }

    #addSubmitTodoInput() {
        this.#submitTodoButton.addEventListener("click", (event) => {
            if (this.#addTodoForm.checkValidity()) {
                event.preventDefault();
                
                const title = document.querySelector(".add.todo #title").value;
                const description = document.querySelector(".add.todo #description").value;
                const dueDate = document.querySelector(".add.todo #due-date").value;
                const priority = document.querySelector('.add.todo [name="priority"]:checked').value;
                const projectIndex = event.target.dataset.projectIndex;
                
                if (event.target.dataset.mode == "add") {
                    this.#app.addTodo(title, description, dueDate, priority, projectIndex);
                    this.#addTodo(projectIndex);
                } else {
                    const todoIndex = event.target.dataset.projectIndex;
                    this.#app.setTodoProperties(title, description, dueDate, priority, projectIndex, todoIndex);
                    this.#editTodo(projectIndex, todoIndex);
                }

                this.#updateTodos(projectIndex);
                console.log(this.#app.getProjectTodos(projectIndex));
                this.#display.hideTodoDialog();
                this.#addTodoForm.reset();
            }
        });
    }

    #refactorIndices() {

    }
};