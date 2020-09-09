import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders app bar title", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Edify test/i);
  expect(linkElement).toBeInTheDocument();
});
