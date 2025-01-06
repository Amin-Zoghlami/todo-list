import addImage from "../img/add.svg";
import checkImage from "../img/check.svg";
import closeImage from "../img/close.svg";
import detailsImage from "../img/details.svg";
import editImage from "../img/edit.svg";
import removeImage from "../img/remove.svg";

export default class Icons {
    #add;
    #check;
    #close;
    #details;
    #edit;
    #remove;
    
    constructor() {
        this.#createIcons();
    }

    #createIcons() {
        this.#add = document.createElement("img");
        this.#add.src = addImage; 
        this.#add.alt = "Add";
        
        this.#check = document.createElement("img");
        this.#check.src = checkImage; 
        this.#check.alt = "Check";

        this.#close = document.createElement("img");
        this.#close.src = closeImage; 
        this.#close.alt = "Close";

        this.#details = document.createElement("img");
        this.#details.src = detailsImage; 
        this.#details.alt = "Details";

        this.#edit = document.createElement("img");
        this.#edit.src = editImage; 
        this.#edit.alt = "Edit";

        this.#remove = document.createElement("img");
        this.#remove.src = removeImage; 
        this.#remove.alt = "Remove";
    }

    get add() {
        return this.#add.cloneNode(true);
    }

    get check() {
        return this.#check.cloneNode(true);
    }

    get close() {
        return this.#close.cloneNode(true);
    }

    get details() {
        return this.#details.cloneNode(true);
    }

    get edit() {
        return this.#edit.cloneNode(true);
    }

    get remove() {
        return this.#remove.cloneNode(true);
    }
}