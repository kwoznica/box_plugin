export class Box {
    constructor({title, content, autoOpen = true, height = 300, width = 600}) {
        this.title = title;
        this.content = content;
        this.height = height;
        this.width = width;
        this.autoOpen = autoOpen;
        this.isOpen = false;
    }

    create = () => {
        let box = this._createFadedOverlay();
        box.appendChild(this._createModal());

        return box;
    };

    getHeight = () => {
        return this.height + "px";
    };

    getWidth = () => {
        return this.width + "px";
    };

    _removeModal = () => {
        let overlay = document.getElementById("overlay-id");
        if (overlay) {
            overlay.parentNode.removeChild(overlay);
        }
    };

    _cancel = () => {
        this._removeModal();
        console.log("Cancel click");
        window.removeEventListener("scroll", this._disableScroll);

    };

    _accept = () => {
        this._removeModal();
        console.log("Accept click");
        window.removeEventListener("scroll", this._disableScroll);
    };

    _createFadedOverlay = () => {
        let overlay = document.createElement("div");
        overlay.classList.add("box--overlay");
        overlay.id = "overlay-id";
        return overlay;
    };

    _disableScroll = () => {
        window.scrollTo(0, 0);
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

        let _createButton = (text, color, hoverColor, onClickFunction) => {
            let button = document.createElement("button");
            button.appendChild(document.createTextNode(text));
            button.classList.add("box--modal-buttons");
            button.style.backgroundColor = color;
            button.addEventListener("click", onClickFunction);
            button.addEventListener("mouseover", function () {
                button.style.backgroundColor = hoverColor;
            });

            button.addEventListener("mouseout", function () {
                button.style.backgroundColor = color;
            });

            return button;
        };

        let acceptButton = _createButton("ACCEPT", "green", "lightgreen", this._accept);
        buttonsSection.appendChild(acceptButton);
        let cancelButton = _createButton("CANCEL", "darkred", "red", this._cancel);
        buttonsSection.appendChild(cancelButton);


        window.addEventListener("scroll", this._disableScroll);

        return container;
    };

}
