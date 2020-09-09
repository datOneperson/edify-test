import React from "react";
import { render } from "@testing-library/react";
import DelayMenu from "./DelayMenu";

test("renders delay menu", () => {
  const { getByText, getByLabelText } = render(<DelayMenu delay={1} updateDelay={() => {}} />);

  const buttonElement = getByText(/Delay/i).parentElement;
  expect(buttonElement).toBeInTheDocument();

  expect(getByLabelText(/0/i)).toBeInTheDocument();

  const checkedElement = getByLabelText(/1 sec/i)
  expect(checkedElement).toBeInTheDocument();
  expect(checkedElement).toHaveAttribute('checked')

  expect(getByLabelText(/2 secs/i)).toBeInTheDocument();

});
