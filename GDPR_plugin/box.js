export class Box {
    constructor({title, content, autoOpen = true, height = 300, width = 600}) {
        this.title = title;
        this.content = content;
        this.height = height;
        this.width = width;
        this.autoOpen = autoOpen;
        this.isOpen = false;
    }

    create() {
        let _createFadedOverlay = () => {
            let overlay = document.createElement("div");
            overlay.classList.add("box--overlay");
            return overlay;
        };


        let _createModal = () => {
            let modal = document.createElement("div");
            modal.classList.add("box--modal");
            modal.style.height = this.getHeight();
            modal.style.width = this.getWidth();
            let titleSection = document.createElement("section");
            modal.appendChild(titleSection);
            titleSection.appendChild(document.createElement("p").appendChild(document.createTextNode(this.title)));
            titleSection.classList.add("box--modal-title");
            modal.appendChild(document.createElement("hr"));

            return modal;


        };

        let box = _createFadedOverlay();
        box.appendChild(_createModal());

        return box;
    }

    getHeight = () => {
        return this.height + "px";
    };

    getWidth = () => {
        return this.width + "px";
    };

    open() {

    }

    cancel() {

    }

    accept() {

    }

}
