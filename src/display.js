export default class Display {
    showProjectDialog() {
        document.querySelector("dialog.add.project").showModal();
    }

    showTodoDialog() {
        document.querySelector("dialog.add.todo").showModal();
    }

    hideProjectDialog() {
        document.querySelector("dialog.add.project").close();
    }

    hideTodoDialog() {
        document.querySelector("dialog.add.todo").close();
    }

    addElement(element, container) {
        container.appendChild(element);
    }

    addText(text, textElement, container) {
        textElement.textContent = text;
        container.appendChild(textElement);
    }

    removeContainer(container) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }

}