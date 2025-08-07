import React from "react";
import { useProducts } from "./useProducts";
import { render, waitFor, screen } from "@testing-library/react";

// Simple Test Component using the hook
const TestComponent = () => {
  const { products, loading, error } = useProducts();
  return (
    <div>
      <div data-testid='loading'> {loading ? "Loading.." : "Loaded"} </div>
      <div data-testid='prodcuts'>{JSON.stringify(products)}</div>
      <div data-testid='error'>{error ? error.message : "No Error"}</div>
    </div>
  );
};

// Mock the global fetch function
global.fetch = jest.fn();

describe.skip("use Products Hook", () => {
  //Clearing mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  //   Test for the initial loading state
  test("Displays loading state initially", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [], // loading main empty array hoga
    });

    // Render the component,
    render(<TestComponent />);

    // Check if loading is displayed first
    expect(screen.getByTestId("loading").textContent.trim()).toBe("Loading..");
    //   JSX sometimes introduces unexpected whitespaces. trim() removes those leading and trailing spaces.

    // Wait for the component to update to the "Loaded" state
    await waitFor(() =>
      expect(screen.getByTestId("loading").textContent.trim()).toBe("Loaded")
    );
  });

  //Test for fetching and displaying product data

  test("Fetches and Displays prodcuts", async () => {
    const mockData = [
      {
        id: 1,
        name: "Prodcut 1",
      },
      {
        id: 2,
        name: "Prodcut 2",
      },
    ];

    //Mocking fatch to return product data
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<TestComponent />);

    await waitFor(() =>
      expect(screen.getByTestId("prodcuts").textContent).toBe(
        JSON.stringify(mockData)
      )
    );
  });

  //Test for Handling Errors

  test("Handling Fetch Error", async () => {
    fetch.mockRejectedValueOnce(new Error("Network Error"));

    render(<TestComponent />);

    await waitFor(() =>
      expect(screen.getByTestId("error").textContent).toBe("Network Error")
    );
  });
});
