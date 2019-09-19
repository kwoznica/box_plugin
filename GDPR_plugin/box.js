export class Box {
    constructor({title, titleFontSize = 25, content, contentFontSize = 17, expireTime = 24 * 60 * 60 * 1000, autoOpen = true, height = 300, width = 600}) {
        this.title = title;
        this.titleFontSize = titleFontSize;
        this.content = content;
        this.contentFontSize = contentFontSize;
        this.height = height;
        this.width = width;
        this.autoOpen = autoOpen;
        this.isOpen = false;
        this.expireTime = expireTime;
        this.box = null;
        this.cookieConfirmation = "GDPR_confirmation";
    }

    build = () => {
        this.box = this._createFadedOverlay();
        this.box.appendChild(this._createModal());
        if (this.autoOpen) {
            this.open();
        }
    };

    open = () => {
        if (this.box && !this.isOpen && !this._isCookieSet(this.cookieConfirmation)) {
            document.body.appendChild(this.box);
            this.isOpen = true;
        }
    };

    destroy = () => {
        if (this.box != null) {
            this.box.parentNode.removeChild(this.box);
            this.box = null;
        }
    };

    _getHeight = () => {
        return this.height + "px";
    };

    _getWidth = () => {
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
        window.removeEventListener("scroll", this._disableScroll);
        this.isOpen = false;
    };

    _accept = () => {
        this._removeModal();
        window.removeEventListener("scroll", this._disableScroll);
        this._setCookie(this.cookieConfirmation, "accepted_by_user", this._calculateExpireDate(this.expireTime), "/");
        this.isOpen = false;
    };

    _calculateExpireDate = (timeInMiliseconds) => {
        let date = new Date();
        date.setTime(date.getTime() + timeInMiliseconds);
        return date;
    };

    _setCookie = (name, value, expireDate, path) => {
        document.cookie = name + '=' + value + ';expires=' + expireDate.toUTCString() + ';path=' + path;
    };

    _isCookieSet = (name) => {
        return document.cookie.split(";").find(
            cookie => cookie.split("=")[0] === name
        ) != null;
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
        modal.style.height = this._getHeight();
        modal.style.width = this._getWidth();

        let titleSection = document.createElement("section");
        modal.appendChild(titleSection);
        let titleChild = document.createElement("p");
        titleChild.style.fontSize = this.titleFontSize + "px";
        titleChild.appendChild(document.createTextNode(this.title));
        titleSection.appendChild(titleChild);
        titleSection.classList.add("box--modal-title");


        modal.appendChild(document.createElement("hr"));

        let contentSection = document.createElement("section");
        modal.appendChild(contentSection);
        contentSection.style.fontSize = this.contentFontSize + "px";
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