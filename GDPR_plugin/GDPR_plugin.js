import { Box } from "./box.js";


(function () {
    let box = new Box({title: "title", content: ""});
    document.body.appendChild(box.create());
})();