import React from "react";
import { render } from "@testing-library/react";
import ViewOptions from "./ViewOptions";

test("renders view options", () => {
  const { getByTitle } = render(
    <ViewOptions view="list" updateView={() => {}} />
  );
  const listElement = getByTitle(/List/i);
  expect(listElement).toBeInTheDocument();
  expect(listElement).toHaveAttribute("disabled");

  const detailElement = getByTitle(/Detail/i);
  expect(detailElement).toBeInTheDocument();
});
