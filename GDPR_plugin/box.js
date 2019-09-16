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
        let box = this._createFadedOverlay();
        box.appendChild(this._createModal());

        return box;
    }

    open() {

    }

    _removeModal = () => {
        let overlay = document.getElementById("overlay-id");
        if (overlay) {
            overlay.parentNode.removeChild(overlay);
        }
    };

    _cancel = () => {
        this._removeModal();
        console.log("Cancel click");
    };

    _accept = () => {
        this._removeModal();
        console.log("Accept click");
    };

    getHeight = () => {
        return this.height + "px";
    };

    getWidth = () => {
        return this.width + "px";
    };

    _createFadedOverlay = () => {
        let overlay = document.createElement("div");
        overlay.classList.add("box--overlay");
        overlay.id = "overlay-id";
        return overlay;
    };

    _createModal = () => {
        let container = document.createElement("div");
        container.classList.add("box--container");

        let modal = document.createElement("div");
        container.appendChild(modal);
        modal.classList.add("box--modal");
        modal.style.height = this.getHeight();
        modal.style.width = this.getWidth();

        let titleSection = document.createElement("section");
        modal.appendChild(titleSection);
        titleSection.appendChild(document.createElement("p").appendChild(document.createTextNode(this.title)));
        titleSection.classList.add("box--modal-title");

        modal.appendChild(document.createElement("hr"));

        let contentSection = document.createElement("section");
        modal.appendChild(contentSection);
        contentSection.appendChild(document.createTextNode(this.content));
        contentSection.classList.add("box--modal-content");

        let buttonsSection = document.createElement("section");
        modal.appendChild(buttonsSection);
        buttonsSection.classList.add("box--modal-buttons-section");
        let acceptButton = document.createElement("button");
        let cancelButton = document.createElement("button");
        buttonsSection.appendChild(acceptButton);
        buttonsSection.appendChild(cancelButton);
        acceptButton.appendChild(document.createTextNode("Ok"));
        cancelButton.appendChild(document.createTextNode("Cancel"));
        acceptButton.className = "box--modal-accept-button box--modal-buttons ";
        cancelButton.className = "box--modal-cancel-button box--modal-buttons ";

        acceptButton.addEventListener("click", this._accept);
        cancelButton.addEventListener("click", this._cancel);

        return container;
    };

}
