import { htmlLayout, htmlElement } from "roseview";

let homePage = new htmlLayout("linear", "center, scrolly, fillxy");

const div = new htmlElement(homePage, "button", {
    textContent: "Go To About",
});
div.element.onclick = function () {
    app.router.navigate("about");
};

export default homePage;
