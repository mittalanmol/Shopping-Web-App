// src/Categories.jsx
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useProducts } from "../hooks/useProducts.js";
import { Link } from "react-router-dom";

function Categories() {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products!</p>;

  // Extract unique categories and a representative image
  const categories = [];
  products.forEach((product) => {
    if (!categories.some((cat) => cat.name === product.category)) {
      categories.push({ name: product.category, image: product.image });
    }
  });

  return (
    <Container className='my-4'>
      <Row>
        {categories.map((category, index) => (
          <Col key={index} md={3} className='mb-4'>
            <Card>
              <Card.Body>
                <Card.Title>
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </Card.Title>
                {/* Will display the card image here */}
                <Card.Img
                  variant='top'
                  src={category.image}
                  alt={category.name}
                  className='cardtop'
                />
                {/* Use React Router's Link component for client-side navigation */}
                <Button
                  as={Link}
                  to={`/${category.name.replace(/\s/g, "-")}`} //dynamically constructs a URL path based on the category.name
                  variant='warning'
                  className='ctgBtn'
                >
                  Show {category.name}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Categories;
