// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
// Custom icons
import { AddIcon } from "components/Icons/Icons.js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function Product() {
  const [products, setProducts] = useState(null);
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

  // DELETE CATEGORY
  const deleteProductById = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirm) {
      axios
        .delete(`http://localhost:8080/api/products/${id}`, {
          headers: {
            "x-access-token": user.accessToken,
          },
        })
        .then((res) => {
          location.reload();
          console.log(res.data);
        });
    }
  };

  // Chakra Color Mode
  const textColor = useColorModeValue("white", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textTableColor = useColorModeValue("gray.900", "white");
  const iconBoxInside = useColorModeValue("white", "white");

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
              {user.roles == "ROLE_KASIR" ? null : (
                <NavLink to="/admin/add-product">
                  <Button
                    bg="blue.400"
                    fontSize="small"
                    color={textColor}
                    fontWeight="bold"
                    h="45"
                    _hover={{
                      background: "blue.400",
                      color: { textColor },
                    }}
                    _focus={{
                      background: "blue.400",
                      color: { textColor },
                    }}
                    _active={{
                      background: "blue.400",
                      color: { textColor },
                    }}
                  >
                    <AddIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                    Add Product
                  </Button>
                </NavLink>
              )}
            </Flex>
            <Box overflow={{ sm: "scroll", lg: "hidden" }}>
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
                    <Th
                      color="gray.400"
                      borderColor={borderColor}
                      fontSize="md"
                      width="150px"
                    >
                      Price
                    </Th>
                    <Th
                      color="gray.400"
                      borderColor={borderColor}
                      fontSize="md"
                      width="350px"
                    >
                      Deskripsi
                    </Th>
                    <Th
                      color="gray.400"
                      borderColor={borderColor}
                      fontSize="md"
                    >
                      Expired
                    </Th>
                    <Th
                      color="gray.400"
                      borderColor={borderColor}
                      fontSize="md"
                      width="330px"
                    >
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
                          <NavLink to={`/admin/edit-product/${product.id}`}>
                            <Button
                              type="submit"
                              fontSize="14px"
                              size="sm"
                              bg="yellow.300"
                              fontWeight="bold"
                              mr="5px"
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
                            >
                              <Icon as={FaPencilAlt} me="4px" />
                              Edit
                            </Button>
                          </NavLink>
                          <Button
                            type="submit"
                            onClick={() => deleteProductById(product.id)}
                            color={textColor}
                            fontSize="14px"
                            size="sm"
                            bg="red.500"
                            fontWeight="bold"
                            _hover={{
                              background: "red.500",
                              color: "white",
                            }}
                            _focus={{
                              background: "red.500",
                              color: "white",
                            }}
                            _active={{
                              background: "red.500",
                              color: "white",
                            }}
                          >
                            <Icon as={FaTrashAlt} me="4px" />
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Box>
          </Flex>
        </Card>
    </Flex>
  );
}
