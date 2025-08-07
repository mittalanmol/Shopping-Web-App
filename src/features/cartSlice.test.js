import cartReducer, { addToCart, removeFromCart, clearCart } from "./cartSlice";

// cartReducer: This is the reducer function imported from your cartSlice.js. It processes actions and updates the state accordingly.

describe.skip("cartSlice Testing", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      items: [],
    };
  });

  test("Testing the initial state", () => {
    expect(cartReducer(undefined, { items: [] })).toEqual(initialState);

    // When we create the slice with createSlice, it uses the initialState(the one with empty items array) to initialize the state when the reducer is first called with undefined
    //   Here, undefined means the reducer is called for the first time, so it should return the initialState of { items: [] }.
    // The action object {} does not affect the state in this case because no action is dispatched. The reducer should return the initialState as is.
  });

  test("Testing Adding an item to the cart", () => {
    const newItem = { id: 1, name: "Product 1", price: 100 };
    const newState = cartReducer(initialState, addToCart(newItem));
    // The new state returned by the reducer after dispatching the addToCart action.

    expect(newState.items.length).toBe(1);
    expect(newState.items[0]).toEqual({ ...newItem, quantity: 1 });
    //   Asserts that the first item in items has the expected properties, including a quantity of 1.
  });

  test("Testing Increasing Quantity Functionality", () => {
    const initialStateWithItem = {
      items: [{ id: 1, name: "Product 1", price: 100, quantity: 1 }],
    };

    const newState = cartReducer(initialStateWithItem, addToCart({ id: 1 })); // storing the Result of adding the same item again
    //   The addToCart action expects the entire item object as the payload. Here we pass { id: 1 } as the payload
    expect(newState.items[0].quantity).toBe(2);
  });

  test("Testing Decrementing the quantity of an item from the cart", () => {
    const initialStateWithItem = {
      items: [{ id: 1, name: "Product 1", price: 100, quantity: 2 }],
    };
    const newState = cartReducer(initialStateWithItem, removeFromCart(1));
    //  The removeFromCart action expects only the id of the item to be removed as the payload

    expect(newState.items[0].quantity).toBe(1);
  });

  test("Testing the Functionality of removing the item from cart if quantity becomes zero", () => {
    const initialStateWithItem = {
      items: [{ id: 1, name: "Product 1", price: 100, quantity: 1 }],
    };

    const newState = cartReducer(initialStateWithItem, removeFromCart(1));
    expect(newState.items.length).toBe(0);
  });

  test("Handling Clearing Cart Functionality", () => {
    const initialStateWithItem = {
      items: [{ id: 1, name: "Product 1", price: 100, quantity: 1 }],
    };
    const newState = cartReducer(initialStateWithItem, clearCart());
    expect(newState.items.length).toBe(0);
  });
});
