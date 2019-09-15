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
        let _createFadedBackground = () => {
            let background = document.createElement("div");
            background.classList.add("box--background");
            return background;
        };
        return _createFadedBackground();

    }

    getHeight = () => {
        return this.height + "px";
    };

    open() {

    }

    cancel() {

    }

    accept() {

    }

}
