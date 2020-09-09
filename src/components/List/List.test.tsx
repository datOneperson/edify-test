import React from "react";
import { render } from "@testing-library/react";
import List from "./List";
import { OrganizationProps } from "../../App";

test("renders list for list view", () => {
  const data: OrganizationProps[] = [
    { url: "", avatar_url: "", login: "testing", description: "" },
  ];

  const { getByText } = render(<List data={data} view="list" />);

  expect(getByText(/testing/i)).toBeInTheDocument();
});

test("renders list for detail view", () => {
  const data: OrganizationProps[] = [
    {
      url: "",
      avatar_url: "",
      login: "testing",
      description: "details are here",
    },
  ];

  const { getByText } = render(<List data={data} view="detail" />);

  expect(getByText(/testing/i)).toBeInTheDocument();
  expect(getByText(/details are here/i)).toBeInTheDocument();
});
