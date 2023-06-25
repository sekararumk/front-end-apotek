// Chakra imports
import {
  Box,
  Button,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
// Custom icons
import { OrderIcon } from "components/Icons/Icons.js";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function KasirProduct() {

  const toast = useToast();
  let history = useHistory()
  const [products, setProducts] = useState(null);
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [selected, setSelected] = useState();
  const user = useSelector((state) => state.user.data);

  // GET ALL PRODUCT
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products", {
        headers: {
          "x-access-token": user.accessToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // GET ALL CATEGORIES
  useEffect(() => {
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgxNzAwNjQyLCJleHAiOjE2ODE3ODcwNDJ9.qWgcvQEdRNouWvxrfJQVvgdDHKEKkv3EBu2zYU4a3do"
    // { headers : { "Authorization": `${token}`}}
    axios
      .get("http://localhost:8080/api/categories", {
        headers: {
          "x-access-token": user.accessToken,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      quantity: quantity,
      productId: selected
    }
    console.log(selected)
    axios
    .post("http://localhost:8080/api/carts", data, {
      headers: {
        "x-access-token": user.accessToken,
      },
    })
    .then((res) => {
      setData(res.data);
      setQuantity('');
      setSelected('');
      if (res.status === 201) {
        toast({
          title: 'Success.',
          description: "Your item are successfully added to cart",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
      history.push('/kasir/order')
    })
    .catch((err) => {
      console.log(err);
    })

  }

  // Chakra Color Mode
  const textColor = useColorModeValue("white", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textTableColor = useColorModeValue("gray.900", "white");

  const { colorMode } = useColorMode();

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }} mb="80px">
      <Text fontSize="3xl" color="blackAlpha.800" fontWeight="bold">
        Welcome, {user.username}!
      </Text>
      <Card p="0px" maxW={{ sm: "320px", md: "100%" }} mt="12px">
        <Flex direction="column">
          <Flex align="center" justify="space-between" p="22px">
            <Text
              fontSize="xl"
              color="gray.800"
              fontWeight="bold"
              align="center"
            >
              All Products
            </Text>
          </Flex>
          <Box overflow={{ sm: "scroll", lg: "hidden" }}>
            <form onSubmit={handleSubmit}>
            <Table>
              <Thead>
                <Tr bg={tableRowColor}>
                  <Th
                    color="gray.400"
                    borderColor={borderColor}
                    fontSize="md"
                    width="100px"
                  >
                    Name
                  </Th>
                  <Th
                    color="gray.400"
                    borderColor={borderColor}
                    fontSize="md"
                    width="50px"
                  >
                    Category
                  </Th>
                  <Th color="gray.400" borderColor={borderColor} fontSize="md" width="150px">
                    Harga
                  </Th>
                  <Th
                    color="gray.400"
                    borderColor={borderColor}
                    fontSize="md"
                    width="400px"
                  >
                    Deskripsi
                  </Th>
                  <Th color="gray.400" borderColor={borderColor} fontSize="md">
                    Expired
                  </Th>
                  <Th color="gray.400" borderColor={borderColor} fontSize="md">
                    Action
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                { products?.map((product, index, arr) => {
                  return (
                    <Tr key={`product-${index}`}>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        borderColor={borderColor}
                        border={index === arr.length - 1 ? "none" : null}
                      >
                        {product.nama}
                      </Td>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        border={index === arr.length - 1 ? "none" : null}
                        borderColor={borderColor}
                      >
                        {product.categoryInfo.nama}
                      </Td>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        border={index === arr.length - 1 ? "none" : null}
                        borderColor={borderColor}
                      >
                        Rp. {(+product.harga).toLocaleString("id-ID")}
                      </Td>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        border={index === arr.length - 1 ? "none" : null}
                        borderColor={borderColor}
                      >
                        {product.deskripsi}
                      </Td>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        border={index === arr.length - 1 ? "none" : null}
                        borderColor={borderColor}
                      >
                        {product.expired}
                      </Td>
                      <Td>
                        <Flex>
                          <Flex align="center" width="80px">
                            <NumberInput max={10} min={1}>
                              <NumberInputField value={quantity} onChange={e => setQuantity(e.target.value)}/>
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          </Flex>
                          <Button
                            type="submit"
                            fontSize="14px"
                            size="sm"
                            bg="yellow.300"
                            fontWeight="bold"
                            ml="12px"
                            _hover={{
                              background: "yellow.300",
                              color: "black",
                            }}
                            _focus={{
                              background: "yellow.300",
                              color: "black",
                            }}
                            _active={{
                              background: "yellow.300",
                              color: "black",
                            }}
                            onClick={() => (setSelected(product.id))}
                          >
                            <OrderIcon me="4px" />
                            Pesan
                          </Button>
                        </Flex>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
            </form>
          </Box>
        </Flex>
      </Card>
    </Flex>
  );
}
