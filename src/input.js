import Todo from "./todo.js"
import Project from "./project.js"
import App from "./app.js";

export default class Input {
    
    projectContainer = document.querySelector(".project-container");
    projectHeader = document.querySelector(".project-header");
    projectShow = document.querySelector(".show-project");
    projectDialog = document.querySelector("dialog.project");
    projectForm = document.querySelector("form.project");
    projectSubmit = document.querySelector(".submit-project");
    projectClose = document.querySelector(".close-project");

    todoContainer = document.querySelector(".todo-container");
    todoDialog = document.querySelector("dialog.todo");
    todoForm = document.querySelector("form.todo");
    todoSubmit = document.querySelector(".submit-todo");
    todoClose = document.querySelector(".close-todo");

    detailsDialog = document.querySelector("dialog.details");
    detailsClose = document.querySelector(".close-details");

    constructor() {
        this.app = new App();
        this.addInputs();
    }
    
    addInputs() {
        this.addProjectShowInput();
        this.addClose();
        this.addProjectSubmitInput();
        this.addTodoSubmitInput();
    }
    
    addProjectShowInput() {
        this.projectShow.addEventListener("click", () => {
            this.projectDialog.showModal();
        });
    }

    addClose() {
        this.projectClose.addEventListener("click", (e) => {
            e.preventDefault();
           
            this.projectDialog.close();
            this.projectForm.reset();
        });

        this.todoClose.addEventListener("click", (e) => {
            e.preventDefault();
            
            this.todoDialog.close();
            this.todoForm.reset();
        });

        this.detailsClose.addEventListener("click", (e) => {
            this.detailsDialog.close();
        });
    }

    addProjectSubmitInput() {
        this.projectSubmit.addEventListener("click", (e) => {
            if (this.projectForm.checkValidity()) {
                e.preventDefault();
                
                const projectTitle = this.projectForm.querySelector("#title").value;
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
        projectElement.setAttribute("data-project-index", `${projectIndex}`);
        projectElement.setAttribute("role", "button");
        projectElement.textContent = projectTitle;
        this.addProjectInput(projectElement);
        this.projectContainer.appendChild(projectElement);
    }

    addProjectInput(projectElement) {
        projectElement.addEventListener("click", (e) => {
            this.updateProjectHeader(e);
            
            this.updateTodoContainer(e);
        });
    }

    updateProjectHeader(e) {
        this.projectHeader.innerHTML = "";
        
        const projectIndex = e.currentTarget.dataset.projectIndex
        this.projectHeader.setAttribute("data-project-index", `${projectIndex}`);
            
        const projectTitle = document.createElement("h1");
        projectTitle.textContent = e.currentTarget.textContent;
        this.projectHeader.appendChild(projectTitle);

        const todoShowAdd = this.createTodoShowAdd();
        this.projectHeader.appendChild(todoShowAdd);

        const projectRemove = this.createProjectRemove();
        this.projectHeader.appendChild(projectRemove);
    }

    createTodoShowAdd() {
        const todoShowAdd = document.createElement("button"); 
        todoShowAdd.textContent = "Add Todo";
        todoShowAdd.setAttribute("data-mode", "add");
        this.addTodoShowInput(todoShowAdd);
        return todoShowAdd;
    }

    addTodoShowInput(todoShow) {
        todoShow.addEventListener("click", (e) => {
            this.todoDialog.showModal();
            
            const mode = e.currentTarget.dataset.mode;
            this.todoSubmit.setAttribute("data-mode", mode);
            if (mode === "add") {
                this.todoSubmit.textContent = "Add";
                const projectIndex = e.currentTarget.parentNode.dataset.projectIndex;
                this.todoSubmit.setAttribute("data-project-index", projectIndex);
            } else {
                this.todoSubmit.textContent = "Edit";
                const projectIndex = e.currentTarget.parentNode.parentNode.dataset.projectIndex;
                const todoIndex = e.currentTarget.parentNode.dataset.todoIndex;
                this.todoSubmit.setAttribute("data-project-index", projectIndex);
                this.todoSubmit.setAttribute("data-todo-index", todoIndex);
            }
        });
    }
    
    createProjectRemove() {
        const projectRemove = document.createElement("button"); 
        projectRemove.textContent = "Remove Project";
        this.addProjectRemoveInput(projectRemove);
        return projectRemove;
    }

    addProjectRemoveInput(projectRemove) {
        projectRemove.addEventListener("click", (e) => {
            const projectIndex = e.currentTarget.parentNode.dataset.projectIndex;
            
            this.app.removeProject(projectIndex);

            const currentProject = document.querySelector(`.project[data-project-index="${projectIndex}"]`);
            currentProject.remove();
            this.projectHeader.innerHTML = "";
            this.todoContainer.innerHTML = "";

            this.refactorIndices("project", projectIndex);
        });
    }

    refactorIndices(type, index) {
        let i = parseInt(index);
        let element = document.querySelector(`.${type}[data-${type}-index="${i + 1}"]`);
        console.log(`.${type}[data-${type}-index="${i + 1}"]`);
        console.log(element);
        while (element !== null) {
            element.setAttribute(`data-${type}-index`, `${i}`);
            i++;
            element = document.querySelector(`.${type}[data-${type}-index="${i + 1}"]`);
        }
    }
    
    updateTodoContainer(e) {
        const projectIndex = e.currentTarget.dataset.projectIndex;
        
        this.todoContainer.innerHTML = "";
        this.todoContainer.setAttribute("data-project-index", `${projectIndex}`);

        const currentProject = this.app.projects[projectIndex]
        const todosLength = currentProject.todos.length;

        for (let i = 0; i < todosLength; i++) {
            this.addTodoDisplay(currentProject, i);
        }
    }

    addTodoDisplay(project, todoIndex) {
        const todoElement = document.createElement("li");
        todoElement.classList.add("todo");
        todoElement.setAttribute("data-todo-index", `${todoIndex}`);
        
        const todoComplete = this.createTodoComplete();
        todoElement.appendChild(todoComplete);

        const todoTitle = document.createElement("h2");
        const todoTitleText = project.todos[todoIndex].title;
        todoTitle.textContent = todoTitleText;
        todoElement.appendChild(todoTitle);
        
        const todoDueDate = document.createElement("h3");
        const todoDueDateText = project.todos[todoIndex].dueDate;
        todoDueDate.textContent = todoDueDateText;
        todoElement.appendChild(todoDueDate);

        const todoEdit = this.createTodoShowEdit();
        todoElement.appendChild(todoEdit);
        
        const todoRemove = this.createTodoRemove();
        todoElement.appendChild(todoRemove);

        const todoDetails = this.createTodoDetails();
        todoElement.appendChild(todoDetails);
    
        this.todoContainer.appendChild(todoElement);
    }

    createTodoComplete() {
        const todoComplete = document.createElement("button");
        todoComplete.textContent = "Incomplete";
        this.addTodoCompleteInput(todoComplete);
        return todoComplete;
    }

    addTodoCompleteInput(todoComplete) {
        todoComplete.addEventListener("click", (e) => {
            const checkbox = e.currentTarget;
            const projectIndex = checkbox.parentNode.parentNode.dataset.projectIndex;
            const todoIndex = checkbox.parentNode.dataset.todoIndex;
            const todo = this.app.projects[projectIndex].todos[todoIndex];
            todo.isComplete = !todo.isComplete;
            
            if (todo.isComplete) {
                checkbox.textContent = "Complete";
            } else {
                checkbox.textContent = "Incomplete";
            }
        })
    }

    createTodoShowEdit() {
        const todoEdit = document.createElement("button");
        todoEdit.textContent = "Edit Todo";
        todoEdit.setAttribute("data-mode", "edit");
        this.addTodoShowInput(todoEdit);
        return todoEdit;
    }

    createTodoRemove() {
        const todoRemove = document.createElement("button");
        todoRemove.textContent = "Remove Todo";
        this.addTodoRemoveInput(todoRemove);
        return todoRemove;
    }

    addTodoRemoveInput(todoRemove) {
        todoRemove.addEventListener("click", (e) => {
            const todoElement = e.currentTarget.parentNode;
            const projectIndex = todoElement.parentNode.dataset.projectIndex;
            const todoIndex = todoElement.dataset.todoIndex;
            
            const todo = this.app.projects[projectIndex]
            todo.removeTodo(todoIndex);

            todoElement.remove();
            console.log(todoIndex);
            this.refactorIndices("todo", todoIndex);
        });
    }

    createTodoDetails() {
        const todoDetails = document.createElement("button");
        todoDetails.textContent = "Show Details";
        this.addTodoDetailsInput(todoDetails);
        return todoDetails;
    }

    addTodoDetailsInput(todoDetails){
        todoDetails.addEventListener("click", (e) => {
            const projectIndex = e.currentTarget.parentNode.parentNode.dataset.projectIndex;
            const todoIndex = e.currentTarget.parentNode.dataset.todoIndex;

            const todo = this.app.projects[projectIndex].todos[todoIndex];

            const todoTitleText = todo.title;
            const todoDescriptionText = todo.description;
            const todoDueDateText = todo.dueDate;
            const todoPriorityText = todo.priority;
            const todoIsCompleteText = todo.isComplete ? "Complete" : "Incomplete";

            const todoTitle = this.detailsDialog.querySelector(".title");
            const todoDescription = this.detailsDialog.querySelector(".description");
            const todoDueDate = this.detailsDialog.querySelector(".due-date");
            const todoPriority = this.detailsDialog.querySelector(".priority");
            const todoIsComplete = this.detailsDialog.querySelector(".is-complete");

            todoTitle.textContent = todoTitleText;
            todoDescription.textContent = todoDescriptionText;
            todoDueDate.textContent = todoDueDateText;
            todoPriority.textContent = todoPriorityText;
            todoIsComplete.textContent = todoIsCompleteText;
            
            this.detailsDialog.showModal();
        });
    }

    addTodoSubmitInput() {
        this.todoSubmit.addEventListener("click", (e) => {
            if (this.todoForm.checkValidity()) {
                e.preventDefault();
                
                const projectIndex = e.currentTarget.dataset.projectIndex; 

                const title = this.todoForm.querySelector("#title").value;
                
                const description = this.todoForm.querySelector("#description").value;
                const dueDate = this.todoForm.querySelector("#due-date").value;
                const priority = this.todoForm.querySelector('[name="priority"]:checked').value;
                
                if (e.target.dataset.mode === "add") {
                    this.app.projects[projectIndex].addTodo(new Todo(title, description, dueDate, priority));
                    const currentProject = this.app.projects[projectIndex];
                    this.addTodoDisplay(currentProject, currentProject.todos.length - 1);
                } else {
                    const todoIndex = e.currentTarget.dataset.todoIndex;
                    const currentTodo = this.app.projects[projectIndex].todos[todoIndex];
                    currentTodo.title = title;
                    currentTodo.description = description;
                    currentTodo.dueDate = dueDate;
                    currentTodo.priority = priority;
                    this.editTodoDisplay(projectIndex, todoIndex);
                }
                this.todoDialog.close();
                this.todoForm.reset();
            }
        });
    }

    editTodoDisplay(projectIndex, todoIndex) {
        const todo = this.app.projects[projectIndex].todos[todoIndex];
        const todoElement = document.querySelector(`.todo[data-todo-index="${todoIndex}`);
        
        const todoTitle = todoElement.querySelector("h2");
        const todoTitleText = todo.title;
        todoTitle.textContent = todoTitleText;
        
        const todoDueDate = todoElement.querySelector("h3");
        const todoDueDateText = todo.dueDate;
        todoDueDate.textContent = todoDueDateText;
    }
};