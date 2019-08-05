import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

import "./scripts/parallax";
import "./scripts/scroll";
import "./scripts/skills";
import "./scripts/reviews";
import "./scripts/parallax_budda";
import "./scripts/worksSlider";
import "./scripts/form";