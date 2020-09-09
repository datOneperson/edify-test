import React from "react";
import { render, waitFor } from "@testing-library/react";
import App from "./App";

test("renders app bar title and body from fetch", async () => {
  const { getByText } = render(<App />);
  expect(getByText(/Edify test/i)).toBeInTheDocument();

  await waitFor(() => getByText(/testing/i));
});
