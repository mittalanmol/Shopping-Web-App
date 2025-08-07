import React from "react";
import { useProducts } from "../hooks/useProducts";
import { render, screen, waitFor } from "@testing-library/react";
import Categories from "./Categories";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

//Mocking the custom hook

jest.mock("../hooks/useProducts", () => ({
  useProducts: jest.fn(),
}));

describe.skip("Categories Component", () => {
  test("Testing loading text", () => {
    useProducts.mockReturnValue({ products: [], loading: true, error: null });
    render(<Categories />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("Displays error when there is an error", () => {
    useProducts.mockReturnValue({
      products: [],
      loading: false,
      error: "Network Error",
    });
    render(<Categories />);
    expect(screen.getByText("Error loading products!")).toBeInTheDocument();
    // checking  text in Categories component as we have hardcoded there, if we want "Network error" to work then use this <p>{error}</p>;
  });

  test("Displays categories when data is loaded and checks button functionality", async () => {
    // Mock the useProducts hook to return test data
    useProducts.mockReturnValue({
      products: [
        { id: 1, category: "Electronics", image: "electronics.jpg" },
        { id: 2, category: "Clothing", image: "clothing.jpg" },
      ],
      loading: false,
      error: null,
    });

    // Render the Categories component wrapped in MemoryRouter
    // Since Categories component uses <Link>, React Router requires the component tree to be wrapped in a router. Without it, the component tries to access router properties (like basename) that don't exist
    render(
      <MemoryRouter>
        <Categories />
      </MemoryRouter>
    );

    // Wait for the categories to be displayed
    await waitFor(() => {
      expect(screen.getByText("Electronics")).toBeInTheDocument();
      expect(screen.getByText("Clothing")).toBeInTheDocument();
    });

    // Check for the button
    const electronicsButton = screen.getByRole("button", {
      name: /show electronics/i,
    });
    const clothingButton = screen.getByRole("button", {
      name: /show clothing/i,
    });

    // Assert the button text is correct
    expect(electronicsButton).toBeInTheDocument();
    expect(clothingButton).toBeInTheDocument();

    // Simulate clicking the Electronics button and checking the functionality of button
    userEvent.click(electronicsButton);

    // Check that the button works and the correct path is generated
    //  when .closest('a') is called, it selects the <a> element surrounding the button, and toHaveAttribute('href', '/Electronics') verifies that the anchor's href is correct.
    expect(electronicsButton.closest("a")).toHaveAttribute(
      "href",
      "/Electronics"
    );
  });
});
