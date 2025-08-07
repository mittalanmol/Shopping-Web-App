import React from "react";
import { createStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Header from "./Header";

// Mocking the Redux store
const store = createStore(cartReducer);

// describe("Header Component", () => {
//   test("Testing the banner", () => {
//     render(<Header />+);
//     expect(screen.getByRole("banner")).toBeInTheDocument();
//   });
// });
