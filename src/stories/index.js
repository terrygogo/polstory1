import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import centered from "@storybook/addon-centered";

import FormIk from "./Formik";
import FormDate from "./FormDate";
import FormClass from "./FormClassCompTemp";
import FormDataPolicy from "./FormDataPolicy";
import FormInTransPolicy from "./FormInTransmissionPolicy";
import FormFileExportPolicy from "./FormFileExportPolicy";
import { Button } from "antd";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

const eventsFromNames = action({ onClick: "clicked", onMouseOver: "hovered" });

const stories = storiesOf("policy", module);
stories.addDecorator(withKnobs);
stories.addDecorator(centered);
stories
  .add("Data Policy", () => {
    return <FormDataPolicy name="전송정책" />;
  })
  .add("InTranMission Policy", () => {
    return <FormInTransPolicy name="내부망 반출 정책" />;
  })
  .add("File Export Policy", () => {
    return <FormFileExportPolicy name="파일반출 세부정책" />;
  });

const stories1 = storiesOf("조직도", module);
stories1.addDecorator(withKnobs);
stories1.addDecorator(centered);
stories1
  .add("with some eevw emoji", () => {
    const name = text("Name", "Arunoda Susiripala");
    const age = number("Age", 89);
    return <FormDate name="goguma" sld="18" />;
  })
  .add("with some eev emoji", () => {
    const name = text("Name", "Arunoda Susiripala");
    const age = number("Age", 89);
    return <FormIk contry={name} age={age} />;
  });

const stories2 = storiesOf("테스트샘플", module);
stories2.addDecorator(withKnobs);
stories2.addDecorator(centered);
stories2
  .add("custom input itegrated to form ik", () => {
    const name1 = text("Name", "Arunoda Susiripala");
    const age = number("Age", 89);
    return <FormDate name={name1} sld="18" />;
  })
  .add("formik simple", () => {
    const name = text("Name", "Arunoda Susiripala");
    const age = number("Age", 89);
    return <FormIk contry={name} age={age} />;
  })
  .add("with a button", () => {
    return <FormClass onCChange={action("slide changed")} />;
  });
