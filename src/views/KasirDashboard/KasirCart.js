// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";

function KasirCart() {

  let history = useHistory();
  const user = useSelector((state) => state.user.data);
  const [carts, setCarts] = useState(null);
  const [data, setData] = useState(null);
  const [sumPrices, setSumPrices] = useState(null);
  // GET ALL CART
  useEffect(() => {
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgxNzAwNjQyLCJleHAiOjE2ODE3ODcwNDJ9.qWgcvQEdRNouWvxrfJQVvgdDHKEKkv3EBu2zYU4a3do"
    // { headers : { "Authorization": `${token}`}}
    axios
      .get("http://localhost:8080/api/carts", {
        headers: {
          "x-access-token": user.accessToken,
        },
      })
      .then((res) => {
        console.log(res.data);

        // Logic inisialisasi menyimpan data quantity dan harga
        const listTotal = res.data.map((e) => {
          return {
            qty: Number(e.quantity),
            harga: Number(e.productInfo.harga),
          };
        });

        // Menyimpan hasil perkalian masing-masing produk (qty*harga) pada variabel total
        const sumPrices = listTotal.map((e) => e.qty * e.harga);

        // Menyimpan penjumlahan dari hasil perkalian semua produk pada variabel subTotal
        const subTotal = sumPrices.reduce((itemA, itemB) => itemA + itemB, 0);

        // console.log(listTotal);
        console.log(sumPrices);
        console.log(subTotal);
        setSumPrices(subTotal);
        setCarts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addToTransaciton = () => {
    carts.map((cart) => {
      const data = {
        total: cart.productInfo.harga * cart.quantity,
        quantity: cart.quantity,
        productId: cart.productId,
      };
      axios
        .post("http://localhost:8080/api/transactions", data, {
          headers: {
            "x-access-token": user.accessToken,
          }
        })
        .then((res) => {
          setData(res.data);
          console.log(res.status);
          if (res.status === 201) {
            return axios.delete("http://localhost:8080/api/carts", {
              headers: {
                "x-access-token": user.accessToken,
              },
            })
            .then((r) => {
              console.log("berhasil");
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      history.push("/kasir/billing");
    });
  };

  const deleteCartById = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this item from cart?"
    );
    if (confirm) {
      axios.delete(`http://localhost:8080/api/carts/${id}`, {
        headers: {
          "x-access-token": user.accessToken,
        },
      }).then((res) => {
        location.reload();
        console.log(res.data);
      });
    }
  };

  // Chakra color mode
  const textColor = useColorModeValue("white", "white");
  // const borderColor = useColorModeValue("#dee2e6", "transparent");
  const { colorMode } = useColorMode();
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textTableColor = useColorModeValue("gray.900", "white");

  console.log(colorMode);

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }} mb="160px">
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
              Your Cart
            </Text>
          </Flex>
          {carts != 0 && (
            <Box overflow={{ sm: "scroll", lg: "hidden" }}>
              <Table>
                <Thead>
                  <Tr bg={tableRowColor}>
                    <Th
                      color="gray.400"
                      borderColor={borderColor}
                      fontSize="md"
                    >
                      Nama Produk
                    </Th>
                    <Th
                      color="gray.400"
                      borderColor={borderColor}
                      fontSize="md"
                    >
                      Harga
                    </Th>
                    <Th
                      color="gray.400"
                      borderColor={borderColor}
                      fontSize="md"
                    >
                      Qty
                    </Th>
                    <Th
                      color="gray.400"
                      borderColor={borderColor}
                      fontSize="md"
                    >
                      Subtotal
                    </Th>
                    <Th
                      color="gray.400"
                      borderColor={borderColor}
                      fontSize="md"
                    >
                      Action
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {carts?.map((cart, index) => {
                    return (
                      <Tr key={`cart-${index}`}>
                        <Td
                          color={textTableColor}
                          fontSize="sm"
                          borderColor={borderColor}
                          border="none"
                        >
                          {cart.productInfo.nama}
                        </Td>
                        <Td
                          color={textTableColor}
                          fontSize="sm"
                          borderColor={borderColor}
                          border="none"
                        >
                          Rp.{" "}
                          {(+cart.productInfo.harga).toLocaleString("id-ID")}
                        </Td>
                        <Td
                          color={textTableColor}
                          fontSize="sm"
                          border="none"
                          borderColor={borderColor}
                        >
                          {cart.quantity}
                        </Td>
                        <Td
                          color={textTableColor}
                          fontSize="sm"
                          border="none"
                          borderColor={borderColor}
                        >
                          Rp.{" "}
                          {(
                            +cart.productInfo.harga * cart.quantity
                          ).toLocaleString("id-ID")}
                        </Td>
                        <Td
                          color={textTableColor}
                          fontSize="sm"
                          border="none"
                          borderColor={borderColor}
                        >
                          <Button
                            type="submit"
                            onClick={() => deleteCartById(cart.id)}
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
                            Remove
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Box>
          )}
          {carts == 0 && (
            <Text
              fontSize="xl"
              color="gray.800"
              fontWeight="bold"
              align="center"
              mb="16px"
            >
              No items in Your Cart
            </Text>
          )}
        </Flex>
      </Card>
      <Card
        p="0px"
        maxW={{ sm: "320px", md: "100%" }}
        width="400px"
        mt="14px"
        alignSelf="flex-end"
      >
        <Flex direction="column">
          <Flex p="22px">
            <Text fontSize="xl" color="gray.800" fontWeight="bold">
              Cart Totals
            </Text>
          </Flex>
          <Box
            overflow={{ sm: "scroll", lg: "hidden" }}
            padding="22px"
            marginTop="-30px"
            align="right"
          >
            <Flex justifyContent="space-between">
              <Text>Totals : </Text>
              <Text>Rp. {(+sumPrices).toLocaleString("id-ID")} </Text>
            </Flex>
            <Button
              disabled={carts == 0 ? true : false}
              bg="blue.400"
              fontSize="small"
              color={textColor}
              fontWeight="bold"
              h="45"
              mt="20px"
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
              onClick={() => addToTransaciton()}
            >
              Proses Pesanan
            </Button>
          </Box>
        </Flex>
      </Card>
    </Flex>
  );
}

export default KasirCart;
