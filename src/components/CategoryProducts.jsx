// src/CategoryProducts.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import Pagination from "../components/Pagination";
import FilterSortOptions from "./FilterSortOptions";

function CategoryProducts() {
  const { category } = useParams();
  const { products, loading, error } = useProducts();
  const dispatch = useDispatch();

  const formattedCategory = category.replace(/-/g, " ");
  //  State For Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(2);

  // State for Filtering and Sorting

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  // Synchronize state with URL parameters
  useEffect(() => {
    setSelectedCategory(formattedCategory);
  }, [formattedCategory]);

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error loading products!</p>;

  // Filtering prodcuts on the basis of category
  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "all") {
      return true;
    }
    return product.category == selectedCategory;
  });

  // const filteredProducts = products.filter(
  //   (product) => product.category === formattedCategory
  // );

  // Sort products based on the selected option

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "priceAsc") return a.price - b.price;
    if (sortOption === "priceDesc") return b.price - a.price;
    if (sortOption === "ratingAsc") return a.rating.rate - b.rating.rate;
    if (sortOption === "ratingDesc") return b.rating.rate - a.rating.rate;
    return 0;
  });

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = sortedProducts.slice(firstPostIndex, lastPostIndex);

  const handleAddToCart = (product) => {
    console.log(product);
    dispatch(addToCart(product));
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <Container className='my-4'>
      <div className='productsHeading'>
        <h2>
          Products in{" "}
          {formattedCategory.charAt(0).toUpperCase() +
            formattedCategory.slice(1)}
        </h2>
      </div>
      <Row>
        <Col md={2}>
          <FilterSortOptions
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setCurrentPage={setCurrentPage}
            handleSort={handleSortChange}
          />
        </Col>
        {/* jo page pe krni display whi map hui  */}
        {currentPosts.map((product) => (
          <Col key={product.id} md={5} className='mb-2  '>
            <Card>
              <Card.Img
                variant='top'
                src={product.image}
                alt={product.title}
                className='cardtop'
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  <b>Description:</b> {product.description}
                </Card.Text>
                <Card.Text>
                  <b>Price:</b> ${product.price}
                </Card.Text>
                <Card.Text>
                  <b>Rating:</b> {product.rating.rate}⭐
                </Card.Text>
                <button
                  className='btn btn-success'
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div>
        <Pagination
          totalPosts={filteredProducts.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </Container>
  );
}

export default CategoryProducts;
// function CategoryProducts() {
//   const { category } = useParams();
//   const { products, loading, error } = useProducts();

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading products!</p>;

//   // Normalize category string to handle route format
//   // The replace method uses a regular expression (/g) to replace all occurrences of dashes (-) with spaces ( ).
//   //Converting (men's-clothing) into (men's clothing)
//   const formattedCategory = category.replace(/-/g, " ");

//   // Filter products by category
//   const filteredProducts = products.filter(
//     (product) => product.category === formattedCategory
//   );

//   return (
//     <Container className='my-4'>
//       <h2>Products in {formattedCategory}</h2>
//       <Row>
//         {filteredProducts.map((product) => (
//           <Col key={product.id} md={4} className='mb-4'>
//             <Card>
//               <Card.Img
//                 variant='top'
//                 src={product.image}
//                 alt={product.title}
//                 className='cardtop'
//               />
//               <Card.Body>
//                 <Card.Title>{product.title}</Card.Title>
//                 <Card.Text>
//                   <b>Description:</b> {product.description}
//                 </Card.Text>
//                 <Card.Text>
//                   <b>Price:</b> ${product.price}
//                 </Card.Text>
//                 <Card.Text>
//                   {" "}
//                   <b>Rating:</b>
//                   {product.rating.rate}⭐
//                 </Card.Text>
//                 <button className='btn btn-success'>Add to Cart</button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// }

// function CategoryProducts() {
//   const { category } = useParams(); // Extract the category from the URL
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // Fetch products based on the category
//     fetch(`https://fakestoreapi.com/products/category/${category}`)
//       .then((response) => response.json())
//       .then((data) => setProducts(data))
//       .catch((error) => console.error("Error fetching products:", error));
//   }, [category]); // Re-run the effect when the category changes

//   return (
//     <div>
//       <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Products</h1>
//       <div className='product-list'>
//         {products.map((product) => (
//           <div key={product.id} className='product-item'>
//             <img src={product.image} alt={product.title} />
//             <h2>{product.title}</h2>
//             <p>{product.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
