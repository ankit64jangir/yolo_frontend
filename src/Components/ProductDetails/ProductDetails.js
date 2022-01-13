import React, { useState, useEffect } from "react";
import "./ProductDetails.css";
import { data } from "../../dummyData";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Container,
  Button,
  Grid,
  GridItem,
  Image,
  Box,
  Badge,
} from "@chakra-ui/react";

// getting items from localstorage if present, if items are not present then return a new array
const getLocalStorage = () => {
  let list = localStorage.getItem("user-cart");
  if (list) {
    return JSON.parse(localStorage.getItem("user-cart"));
  } else {
    return [];
  }
};

function ProductDetails() {
  // Getting array from localStorage
  var arrayFromStroage = JSON.parse(localStorage.getItem("user-cart"));

  const navigate = useNavigate();
  const [localStorageProduct, setlocalStorageProduct] = useState(
    getLocalStorage()
  );
  const [Products, setProducts] = useState(data);
  const [ProductDetail, setProductDetail] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: "",
  });
  const location = useLocation();
  const idUrl = location.pathname.split("/")[2];

  useEffect(() => {
    var res = Products.find((obj) => {
      return obj.id === Number(idUrl);
    });
    setProductDetail(res);
  }, [ProductDetail, idUrl, Products]);

  const { id, title, price, description, image, category, rating } =
    ProductDetail;

    // addToCart function add the particular item in localstorage when user click on add to cart button
  const addToCart = (e) => {
    e.preventDefault();
    setlocalStorageProduct(() => {
      const newItems = [...localStorageProduct, ProductDetail];
      newItems[newItems.length - 1]["Quantity"] = 1;
      localStorage.setItem("user-cart", JSON.stringify(newItems));
    });
    navigate("/cart");
  };

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
        <Grid h="500px" templateColumns="repeat(2, 1fr)" gap={1} marginTop="10">
          <GridItem w="100%" h="10">
            <Image src={image} alt="product_img" height="400px" width="80%" />
          </GridItem>
          <GridItem w="100%" h="10">
            <h6 className="productTitle">{title}</h6>
            <p className="productPrice">
              <span style={{ fontFamily: "none", fontWeight: "400" }}>₹</span>{" "}
              {price}
            </p>
            <p className="productRating">
              <span className="productRate">{rating.rate} ★</span>{" "}
              <span className="productCount">{rating.count} Counts</span>
            </p>
            <br />
            <p>
              <strong>Category : </strong>
              {category}
            </p>
            <br />
            <p>{description}</p>
            <br />

            {/* if item is already added to the cart, then "MOVE TO CART" button will display else "ADD TO CART" button will display */}
            {localStorageProduct.filter((item) => item.id === Number(idUrl))[0]
              ?.id === Number(idUrl) ? (
              <Button
                colorScheme="#FF9F00"
                style={{ backgroundColor: "#FF9F00", letterSpacing: "1px" }}
                size="lg"
              >
                <Link to="/cart">
                  <i class="fas fa-cart-plus"></i>&nbsp;MOVE TO CART
                </Link>
              </Button>
            ) : (
              <Button
                onClick={addToCart}
                colorScheme="#FF9F00"
                style={{ backgroundColor: "#FF9F00", letterSpacing: "1px" }}
                size="lg"
              >
                <i class="fas fa-cart-plus"></i>&nbsp;ADD TO CART
              </Button>
            )}
          </GridItem>
        </Grid>
      </Container>
    </div>
  );
}

export default ProductDetails;
