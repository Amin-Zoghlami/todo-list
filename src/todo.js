export default class Todo {
    #title;
    #description
    #dueDate;
    #priority;
    #isComplete;

    constructor (title, description, dueDate, priority) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#isComplete = false;
    }

    setTitle(title) {
        this.#title = title;
    }

    getTitle() {
        return this.#title;
    }

    setDescription(description) {
        this.#description = description;
    }
    
    getDescription() {
        return this.#description;
    }

    setDueDate(dueDate) {
        this.#dueDate = dueDate;
    }
    
    getDueDate() {
        return this.#dueDate;
    }

    setPriority(priority) {
        this.#priority = priority;
    }
    
    getPriority() {
        return this.#priority;
    }

    getIsComplete() {
        return this.#isComplete;
    }

    switchIsComplete() {
        this.#isComplete = !this.#isComplete;
    }
};
