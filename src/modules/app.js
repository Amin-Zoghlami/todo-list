export default class App {
    projects = [];
    
    addProject(project) {
        this.projects.push(project);
    }

    removeProject(i) {
        this.projects.splice(i, 1);
    }
};
