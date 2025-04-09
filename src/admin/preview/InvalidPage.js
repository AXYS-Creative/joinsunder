import React from "react";

export const InvalidPage = ({ entry }) => {
  const data = entry.getIn(["data"]).toJS();

  console.log("Preview loaded:", data);

  return (
    <div className="preview-wrapper">
      <section
        className="hero-alert"
        style={{ border: "2px solid red", padding: "1rem" }}
      >
        <h1 className="hero-alert__title" style={{ border: "2px dashed blue" }}>
          {data.section_title}
        </h1>
        <p className="hero-alert__desc">{data.section_desc}</p>
        <div className="cta-group">
          {data.cta_1?.text && (
            <a href={data.cta_1.url} className="btn btn-outline">
              {data.cta_1.text}
            </a>
          )}
          {data.cta_2?.text && (
            <a href={data.cta_2.url} className="btn">
              {data.cta_2.text}
            </a>
          )}
        </div>
      </section>
    </div>
  );
};
