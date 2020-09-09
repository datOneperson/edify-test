import React from "react";
import { render, waitFor } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

test("renders app bar title and body from fetch", async () => {
  const { getByText } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(getByText(/Edify test/i)).toBeInTheDocument();

  await waitFor(() => getByText(/testing/i));
});
