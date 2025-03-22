import React from "react";

const CtaGroup = ({ cta1, cta2 }) => {
  const cta1Text = cta1?.text;
  const cta1Url = cta1?.url;
  const cta1Outline = cta1?.outline;

  const cta2Text = cta2?.text;
  const cta2Url = cta2?.url;
  const cta2Outline = cta2?.outline;

  return (
    <div className="cta-group">
      {cta1Text && cta1Url && (
        <a
          className={`cta-1 tab-element-page ${cta1Outline ? "outline" : ""}`}
          href={cta1Url}
        >
          {cta1Text}
        </a>
      )}
      {cta2Text && cta2Url && (
        <a
          className={`cta-2 tab-element-page ${cta2Outline ? "outline" : ""}`}
          href={cta2Url}
        >
          {cta2Text}
        </a>
      )}
    </div>
  );
};

export default CtaGroup;
