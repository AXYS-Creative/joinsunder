import React from "react";
import CtaGroup from "./CtaGroup";

export const FormSubmitPreview = ({ entry }) => {
  const data = entry.getIn(["data"]);

  const sectionTitle = data.getIn([
    "page_join",
    "form_submit",
    "section_title",
  ]);
  const sectionDesc = data.getIn(["page_join", "form_submit", "section_desc"]);

  const cta1 = data.getIn(["page_join", "form_submit", "cta_1"])?.toJS() || {};
  const cta2 = data.getIn(["page_join", "form_submit", "cta_2"])?.toJS() || {};

  return (
    <section className="hero-alert">
      <h1 className="hero-alert__title">{sectionTitle}</h1>
      <p className="hero-alert__desc">{sectionDesc}</p>

      <CtaGroup cta1={cta1} cta2={cta2} />
    </section>
  );
};
