import React from "react";
import { useProducts } from "../hooks/useProducts";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import { MemoryRouter, useParams } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import CategoryProducts from "./CategoryProducts";

// Mocking useProducts hook
jest.mock("../hooks/useProducts");

// Mocking useParams
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

//Mock store for redux

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

describe("Category Prodcuts", () => {
  beforeEach(() => {
    //Mocking category route param

    useParams.mockReturnValue({ category: "electronics" });
  });

  test("Testing the loading state", () => {
    useProducts.mockReturnValue({ products: [], loading: true, error: null });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CategoryProducts />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Loading..")).toBeInTheDocument();
  });
});
