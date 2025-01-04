export default class App {
    projects = [];
    
    addProject(project) {
        this.projects.push(project);
    }

    removeProject(index) {
        this.projects.splice(index, 1);
    }
};
