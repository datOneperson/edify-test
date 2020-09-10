import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AppBar from "./AppBar";
import { BrowserRouter } from "react-router-dom";

test("renders delay menu", async () => {
  const favorites = [
      {
          url: '',
          avatar_url: '',
          login: 'testing',
          description: ''
      }
  ]

  const { getByText, getByLabelText } = render(
      <BrowserRouter>
        <AppBar favorites={favorites} delay={1} updateDelay={() => {}}>
            Edify test
        </AppBar>
      </BrowserRouter>
  );

  expect(getByText(/Edify test/i)).toBeInTheDocument();

  const buttonElement = getByText(/Delay/i);
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toBeDefined();

  expect(getByLabelText(/0/i)).toBeInTheDocument();

  const checkedElement = getByLabelText(/1 sec/i);
  expect(checkedElement).toBeInTheDocument();
  expect(checkedElement).toHaveAttribute("checked");

  expect(getByLabelText(/2 secs/i)).toBeInTheDocument();
});
