import CMS from "decap-cms-app";
import { FormSubmit } from "../preview/FormSubmit.js";
import { InvalidPage } from "../preview/InvalidPage.js";

CMS.registerPreviewStyle("/static/styles/styles.css", { raw: false });
CMS.registerPreviewTemplate("form_submit", FormSubmit);
CMS.registerPreviewTemplate("hero_error", InvalidPage);
