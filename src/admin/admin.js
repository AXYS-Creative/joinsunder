import CMS from "decap-cms-app";
import { InvalidPage } from "../preview/InvalidPage.js";

CMS.registerPreviewStyle("/static/styles/styles.css", { raw: false });
CMS.registerPreviewTemplate("page_404", InvalidPage);
CMS.registerPreviewTemplate("hero_error", InvalidPage);
