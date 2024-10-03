import { html } from "roseview";

import { outlinedButton } from "../components/outlinebtn.js";

let aboutPage = html.CreateLayout("linear", "fillxy, center");
aboutPage.setChildMargins = "null, 10px, null, 10px";

let aboutButton = outlinedButton(aboutPage, "<- Go Back");
aboutButton.on("click", function () {
    app.router.back();
});

export default aboutPage;
