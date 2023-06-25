// Chakra imports
import {
  Box,
  Flex,
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
import axios from "axios";

function Billing() {
  const [transactions, setTransactions] = useState(null);
  const [transactionDates, settransactionDates] = useState(null);

  // GET ALL TRANSACTION
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/transactions", {
        headers: {
          "x-access-token": user.accessToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data != 0) {
          const dates = res.data[0].createdAt;
          const transactionDates = new Date(dates).toLocaleDateString("en-US");
          console.log(transactionDates);
          settransactionDates(transactionDates);
        }
        setTransactions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  // const borderColor = useColorModeValue("#dee2e6", "transparent");
  const { colorMode } = useColorMode();
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textTableColor = useColorModeValue("gray.900", "white");

  console.log(colorMode);

  const user = useSelector((state) => state.user.data);

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }} mb="350px">
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
                Rekap Transaksi
              </Text>
            </Flex>
            {transactions != 0 && (
            <Box overflow={{ sm: "scroll", lg: "hidden" }}>
              <Table>
                <Thead>
                  <Tr bg={tableRowColor}>
                    <Th
                      color="gray.400"
                      borderColor={borderColor}
                      fontSize="md"
                    >
                      Id Transaksi
                    </Th>
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
                      Tgl Transaksi
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
                      Harga
                    </Th>
                    <Th
                      color="gray.400"
                      borderColor={borderColor}
                      fontSize="md"
                    >
                      Subtotal
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  { transactions?.map((transaction, index) => {
                  return (
                    <Tr key={`transaction-${index}`}>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        borderColor={borderColor}
                        border="none"
                      >
                        {transaction.id}
                      </Td>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        borderColor={borderColor}
                        border="none"
                      >
                        {transaction.productInfo.nama}
                      </Td>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        border="none"
                        borderColor={borderColor}
                      >
                        {transactionDates}
                      </Td>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        border="none"
                        borderColor={borderColor}
                      >
                        Rp. {(+transaction.productInfo.harga).toLocaleString("id-ID")}
                      </Td>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        border="none"
                        borderColor={borderColor}
                      >
                        {transaction.quantity}
                      </Td>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        border="none"
                        borderColor={borderColor}
                      >
                        Rp. {(+transaction.productInfo.harga * transaction.quantity).toLocaleString("id-ID")}
                      </Td>
                    </Tr>
                  );
                })}
                </Tbody>
              </Table>
            </Box>
            )}
            {transactions == 0 && (
              <Text
                fontSize="xl"
                color="gray.800"
                fontWeight="bold"
                align="center"
                mt="14px"
                mb="16px"
              >
                No Transaction
              </Text>
            )}
          </Flex>
        </Card>
    </Flex>
  );
}

export default Billing;
