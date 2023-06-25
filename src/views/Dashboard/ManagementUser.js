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

export default function ManagementUser() {
  const user = useSelector((state) => state.user.data);

  // Chakra Color Mode
  const textColor = useColorModeValue("white", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textTableColor = useColorModeValue("gray.900", "white");
  const iconBoxInside = useColorModeValue("white", "white");

  const { colorMode } = useColorMode();

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }} mb="320px">
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
                All User
              </Text>
              <NavLink to="/admin/add-user">
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
                  Add User
                </Button>
              </NavLink>
            </Flex>
            <Box overflow={{ sm: "scroll", lg: "hidden" }}>
              <Table>
                <Thead>
                  <Tr bg={tableRowColor}>
                    <Th
                      color="gray.500"
                      borderColor={borderColor}
                      fontSize="md"
                    >
                      Username
                    </Th>
                    <Th
                      color="gray.500"
                      borderColor={borderColor}
                      fontSize="md"
                    >
                      Role
                    </Th>
                    <Th
                      color="gray.500"
                      borderColor={borderColor}
                      fontSize="md"
                    >
                      Action
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td
                      color={textTableColor}
                      fontSize="sm"
                      borderColor={borderColor}
                      border="none"
                    >
                      admin1
                    </Td>
                    <Td
                      color={textTableColor}
                      fontSize="sm"
                      borderColor={borderColor}
                      border="none"
                    >
                      ROLE_ADMIN
                    </Td>
                    <Td>
                      <NavLink to="admin/dashboard">
                        <Button
                          type="submit"
                          fontSize="14px"
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
                        color={textColor}
                        fontSize="14px"
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
                </Tbody>
              </Table>
            </Box>
          </Flex>
        </Card>
    </Flex>
  );
}
