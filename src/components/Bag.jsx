import React from "react";
import { Container, Row, Col, Card, Button, CardBody } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart, removeFromCart } from "../features/cartSlice";

function Bag() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems);

  const handleIncrement = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecrement = (item) => {
    dispatch(removeFromCart(item.id));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  //cartItems update hoge and iske corresponding below function main cartItems.quantity bhi change and update hogi

  return (
    <>
      <Container className='my-4'>
        <h2>Shopping Bag</h2>
        <Row>
          {cartItems.map((item) => (
            <Col key={item.id} md={12} className='mb-4'>
              {/* will provide a boreder box} */}
              <Card>
                <Card.Body>
                  <Row>
                    <Col md={8}>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>
                        <b>Price:</b> ${item.price}
                      </Card.Text>
                      <Card.Text>
                        <b>Quantity:</b> {item.quantity}
                      </Card.Text>
                    </Col>
                    <Col md={4} className='text-end '>
                      <Button
                        variant='success'
                        className='me-1'
                        onClick={() => handleIncrement(item)}
                      >
                        +
                      </Button>
                      <Button
                        variant='danger'
                        onClick={() => handleDecrement(item)}
                      >
                        -
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Row className='mt-4'>
          <Col md={12} className='text-end'>
            <h4>Total: ${calculateTotal()} </h4>
          </Col>
        </Row>
        {cartItems.length > 0 ? (
          <button className='btn btn-danger' onClick={handleClear}>
            Clear Cart
          </button>
        ) : (
          " "
        )}
      </Container>
    </>
  );
}

export default Bag;
