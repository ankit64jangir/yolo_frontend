import React, { useState } from "react";
import { data } from "../../dummyData";
import { Container, Box, Grid, GridItem, Image, Badge } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "./Product.css";

function Product() {
  const [Products, setProducts] = useState(data);

  // Getting array from localStorage
  var arrayFromStroage = JSON.parse(localStorage.getItem("user-cart"));

  return (
    <div>
      <Box
        bg="tomato"
        style={{ display: "flex", justifyContent: "flex-end" }}
        p={4}
        color="white"
      >
        <Link to="/cart">
          <i class="fas fa-cart-plus fa-2x"></i>
          <Badge className="cartLength" ml="1" colorScheme="green">
          {/* printing how many items added in the cart */}
          {arrayFromStroage?.length ? arrayFromStroage?.length : 0}
          </Badge>
        </Link>
      </Box>
      <Container maxW="container.xl">
       {/* Display all dummy data using map method */}
        {Products.map((product) => {
          const { id, title, price, description, image, category, rating } =
            product;
          return (
            <Box
              className="productBox"
              boxShadow="md"
              p="6"
              rounded="md"
              bg="white"
              w="100%"
              color="black"
              marginTop={10}
              key={id}
            >
              <Link
                to={{
                  pathname: `/product/${id}`,
                  state: product,
                }}
              >
                <Grid h="200px" templateColumns="repeat(5, 1fr)" gap={6}>
                  <GridItem colSpan={1}>
                    <Image
                      src={image}
                      alt="product_img"
                      height="200px"
                      width="80%"
                    />
                  </GridItem>
                  <GridItem colSpan={3}>
                    <h6 className="productTitle">{title.slice(0, 20)}...</h6>
                    <p className="productRating">
                      <span className="productRate">{rating.rate} ★</span>{" "}
                      <span className="productCount">
                        {rating.count} Counts
                      </span>
                    </p>
                    <br />
                    <p>{description.slice(0, 100)}...</p>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <p className="productPrice">
                      <span style={{ fontFamily: "none", fontWeight: "400" }}>
                        ₹
                      </span>{" "}
                      {price}
                    </p>
                  </GridItem>
                </Grid>
              </Link>
            </Box>
          );
        })}
      </Container>
    </div>
  );
}

export default Product;
