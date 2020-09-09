import React from "react";
import { render, waitFor } from "@testing-library/react";
import Detail from "./Detail";

test("renders app bar title and body from fetch", async () => {
  const organization = {
      url: '',
      avatar_url: '',
      login: 'testing',
      description: 'is there a description?'
  }  

  const { getByText } = render(<Detail delay={0} organization={organization} />);

  expect(getByText(/testing/i)).toBeInTheDocument();
  expect(getByText(/is there a description?/i)).toBeInTheDocument();

  await waitFor(() => getByText(/testing/i));
  await waitFor(() => getByText(/Testing inc/i));
  await waitFor(() => getByText(/Earth, Solar System/i));
  await waitFor(() => getByText(/1201/i));
});
