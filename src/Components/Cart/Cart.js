import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Grid,
  GridItem,
  Image,
  Button,
  Center,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const [localStorageData, setlocalStorageData] = useState([]);
  const [count, setcount] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    let list = JSON.parse(localStorage.getItem("user-cart"));
    setlocalStorageData(list);
  }, []);

  // remove all items from localstorage
  const removeAll = () => {
    localStorage.removeItem("user-cart");
    navigate("/");
  };

  const handleCount = (id) => {};


  // decrement the quantity when click
  const decrement = (id) => {
    localStorageData.filter((item) => item.id === id)[0]["Quantity"] =
      localStorageData.filter((item) => item.id === id)[0]["Quantity"] - 1;
    localStorage.setItem("user-cart", JSON.stringify(localStorageData));
    setcount(localStorageData.filter((item) => item.id === id)[0]["Quantity"]);
    // when quantity is zero then item will remove from localstorage because quantity is not in minus.
    if (
      localStorageData.filter((item) => item.id === id)[0]["Quantity"] === 0
    ) {
      removeSingle(id);
    }
  };

  // incerment the quantity when click
  const incerment = (id) => {
    localStorageData.filter((item) => item.id === id)[0]["Quantity"] =
      localStorageData.filter((item) => item.id === id)[0]["Quantity"] + 1;
    localStorage.setItem("user-cart", JSON.stringify(localStorageData));
    setcount(localStorageData.filter((item) => item.id === id)[0]["Quantity"]);
  };

  // remove particular item from localstorage
  const removeSingle = (id) => {
    setlocalStorageData(localStorageData.filter((item) => item.id !== id));
    localStorage.setItem(
      "user-cart",
      JSON.stringify(localStorageData.filter((item) => item.id !== id))
    );
  };

  return (
    <div>
      <Container
        maxW="container.sm"
        boxShadow="md"
        p="6"
        rounded="md"
        bg="white"
      >
        <Box border="1px" w="100%" p={4} color="black">
          MY CART ({localStorageData?.length ? localStorageData?.length : 0}){/* MY CART */}
        </Box>
        {localStorageData?.map((data) => {
          return (
            <>
              <Grid
                h="150px"
                templateColumns="repeat(4, 1fr)"
                gap={1}
                marginTop={2.5}
                marginBottom={2.5}
                key={data.id}
              >
                <GridItem colSpan={1} w="100%" h="100%">
                  <Image
                    src={data.image}
                    alt="product_img"
                    height="100px"
                    width="80%"
                  />
                  <br />
                  <div className="quantity">
                    <button
                      onClick={() => decrement(data.id)}
                      className="decrement"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="0"
                      name="count"
                      value={
                        localStorageData.filter(
                          (item) => item.id === data.id
                        )[0]["Quantity"]
                      }
                      onChange={() => handleCount(data.id)}
                    />
                    <button
                      onClick={() => incerment(data.id)}
                      className="increment"
                    >
                      +
                    </button>
                  </div>
                </GridItem>
                <GridItem colSpan={3} w="100%" h="100%">
                  <p>{data.title}</p>
                  <br />
                  <h5>
                    <span style={{ fontFamily: "none", fontWeight: "400" }}>
                      ₹
                    </span>{" "}
                    <strong>
                      {data.price *
                        localStorageData.filter(
                          (item) => item.id === data.id
                        )[0]["Quantity"]}
                    </strong>
                  </h5>
                  <br />
                  <Center>
                    <button type="submit" onClick={() => removeSingle(data.id)}>
                      Remove
                    </button>
                  </Center>
                </GridItem>
              </Grid>
              <hr />
            </>
          );
        }) || <h3>There is nothing in your cart. Let's add some items.</h3>}
        
        <Box w="100%" p={4} color="white" marginTop={1}>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <GridItem w="100%" h="10">
              <Button
                colorScheme="#FFFF"
                style={{
                  backgroundColor: "#FFFF",
                  color: "black",
                  letterSpacing: "1px",
                }}
                size="md"
              >
                <Link to="/">CONTINUE SHOPPING</Link>
              </Button>
            </GridItem>
            <GridItem w="100%" h="10">
              <Button
                colorScheme="#FF9F00"
                style={{ backgroundColor: "#FF9F00", letterSpacing: "1px" }}
                size="md"
                onClick={removeAll}
              >
                REMOVE ALL
              </Button>
            </GridItem>
            <GridItem w="100%" h="10">
              <Button
                colorScheme="tomato"
                style={{ backgroundColor: "tomato", letterSpacing: "1px" }}
                size="md"
              >
                PLACE ORDER
              </Button>
            </GridItem>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default Cart;
