import React from "react";

// 404
export const InvalidPage = ({ entry }) => {
  const data = entry.getIn(["data"]).toJS();

  return (
    <section className="hero-alert">
      <h1 className="hero-alert__title">{data.section_title}</h1>
      <p className="hero-alert__desc">{data.section_desc}</p>
      <div className="cta-group">
        {data.cta_1 && (
          <a href={data.cta_1.url} className="btn btn-outline">
            {data.cta_1.text}
          </a>
        )}
        {data.cta_2 && (
          <a href={data.cta_2.url} className="btn">
            {data.cta_2.text}
          </a>
        )}
      </div>
    </section>
  );
};
