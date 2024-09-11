import * as React from "react";
import ReactDOM from "react-dom/client";
import * as Router from "react-router-dom";
import "../src/style.css";
import App from "./App";
import AppDroid from "./AppDroid";
import Error404 from "./client/views/404";
import "./server/api/dataModels/cookies";
import CookieReader from "./server/api/dataModels/cookies";



const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

export function mobileAndTabletCheck() {
  let check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) ) check = true;
  })(navigator.userAgent || navigator.vendor);
  return check;
};
console.log(window.location)
CookieReader.setup(document);

root.render((
  <Router.BrowserRouter>
    <Router.Routes>
      <Router.Route path="/mobile" element={<AppDroid />} />
      <Router.Route path="/" element={<App />} />
      <Router.Route path="*" element={<Error404 />} />
    </Router.Routes>
  </Router.BrowserRouter>));

if (mobileAndTabletCheck()) {

}