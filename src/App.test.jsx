import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// Mock the components to avoid rendering their entire content
jest.mock("./components/Categories", () => () => <div>Categories Page</div>); //The second () is the component itself.
jest.mock("./components/CategoryProducts", () => () => (
  <div>Category Products Page</div>
));
jest.mock("./components/Bag", () => () => <div>Bag Page</div>);
jest.mock("./components/Header", () => () => <div>Header Component</div>);

describe.skip("App Component", () => {
  test("renders the Header component on all routes", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        {/* initialEntries={["/"]}: This prop defines initial route  MemoryRouter should load. In this case, it's root route ("/"). */}
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Header Component")).toBeInTheDocument();
  });

  test("renders Categories component for '/' route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Categories Page")).toBeInTheDocument();
  });

  test("renders CategoryProducts component for '/:category' route", () => {
    render(
      <MemoryRouter initialEntries={["/electronics"]}>
        {/* This test checks if the CategoryProducts component is rendered when the app is on a dynamic route (e.g., /electronics). */}
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Category Products Page")).toBeInTheDocument();
  });

  test("renders Bag component for '/bag' route", () => {
    render(
      <MemoryRouter initialEntries={["/bag"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Bag Page")).toBeInTheDocument();
  });
});
