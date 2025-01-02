import App from "./app.js";

const app = new App();

const dialogAddProject = document.querySelector("dialog");

const showProjectButton = document.querySelector("button.show.project");
showProjectButton.addEventListener("click", (event) => {
    dialogAddProject.showModal();
});

const addProjectButton = document.querySelector("button.add.project");
addProjectButton.addEventListener("click", (event) => {
    const form = document.querySelector("form");
    if (form.checkValidity()) {
        event.preventDefault();
        
        const title = document.getElementById("title").textContent;
        
        app.addProject(title);
        console.log(app);
        console.log(title);
        dialogAddProject.close();
    }
});
console.log(app);
console.log("Hello");