// Chakra imports
import {
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import IconBox from "components/Icons/IconBox";
// Custom icons
import {
  AddIcon,
  ProductIcon,
  CategoryIcon,
  CreditIcon,
} from "components/Icons/Icons.js";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
  const user = useSelector((state) => state.user.data);

  // Chakra Color Mode
  const iconBlue = useColorModeValue("white", "white");
  const iconBoxInside = useColorModeValue("blue.500", "blue.500");
  const textColor = useColorModeValue("white", "white");

  const { colorMode } = useColorMode();

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }} mb="30px">
      <Text fontSize="3xl" color="blackAlpha.800" fontWeight="bold" mb="22px">
        Welcome, {user.username}!
      </Text>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px" mb="130px">
        <NavLink to="/admin/category">
          <Card
            minH="100px"
            bg="blue.700"
            boxShadow={useColorModeValue(
              "0px 5px 14px rgba(0, 0, 0, 0.4)",
              "unset"
            )}
          >
            <Flex direction="column">
              <Flex
                flexDirection="row"
                align="center"
                justify="center"
                w="100%"
              >
                <Stat me="auto">
                  <StatLabel
                    fontSize="3xl"
                    color={textColor}
                    fontWeight="bold"
                    textTransform="uppercase"
                  >
                    Category
                  </StatLabel>
                </Stat>
                <IconBox
                  borderRadius="50%"
                  as="box"
                  h={"45px"}
                  w={"45px"}
                  bg={iconBlue}
                >
                  <CategoryIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                </IconBox>
              </Flex>
            </Flex>
          </Card>
        </NavLink>
        <NavLink to="/admin/product">
          <Card
            minH="100px"
            bg="blue.700"
            boxShadow={useColorModeValue(
              "0px 5px 14px rgba(0, 0, 0, 0.4)",
              "unset"
            )}
          >
            <Flex direction="column">
              <Flex
                flexDirection="row"
                align="center"
                justify="center"
                w="100%"
              >
                <Stat me="auto">
                  <StatLabel
                    fontSize="3xl"
                    color={textColor}
                    fontWeight="bold"
                    textTransform="uppercase"
                  >
                    Product
                  </StatLabel>
                </Stat>
                <IconBox
                  borderRadius="50%"
                  as="box"
                  h={"45px"}
                  w={"45px"}
                  bg={iconBlue}
                >
                  <ProductIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                </IconBox>
              </Flex>
            </Flex>
          </Card>
        </NavLink>
        <NavLink to="/admin/add-category">
          <Card
            minH="100px"
            bg="blue.700"
            boxShadow={useColorModeValue(
              "0px 5px 14px rgba(0, 0, 0, 0.4)",
              "unset"
            )}
          >
            <Flex direction="column">
              <Flex
                flexDirection="row"
                align="center"
                justify="center"
                w="100%"
              >
                <Stat me="auto">
                  <StatLabel
                    fontSize="3xl"
                    color={textColor}
                    fontWeight="extrabold"
                    textTransform="uppercase"
                  >
                    Add Category
                  </StatLabel>
                </Stat>
                <IconBox
                  borderRadius="50%"
                  as="box"
                  h={"45px"}
                  w={"45px"}
                  bg={iconBlue}
                >
                  <AddIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                </IconBox>
              </Flex>
            </Flex>
          </Card>
        </NavLink>
        <NavLink to="/admin/add-product">
          <Card
            minH="100px"
            bg="blue.700"
            boxShadow={useColorModeValue(
              "0px 5px 14px rgba(0, 0, 0, 0.4)",
              "unset"
            )}
          >
            <Flex direction="column">
              <Flex
                flexDirection="row"
                align="center"
                justify="center"
                w="100%"
              >
                <Stat me="auto">
                  <StatLabel
                    fontSize="3xl"
                    color={textColor}
                    fontWeight="extrabold"
                    textTransform="uppercase"
                  >
                    Add Product
                  </StatLabel>
                </Stat>
                <IconBox
                  borderRadius="50%"
                  as="box"
                  h={"45px"}
                  w={"45px"}
                  bg={iconBlue}
                >
                  <AddIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                </IconBox>
              </Flex>
            </Flex>
          </Card>
        </NavLink>
        <NavLink to="/admin/billing">
          <Card
            minH="100px"
            bg="blue.700"
            boxShadow={useColorModeValue(
              "0px 5px 14px rgba(0, 0, 0, 0.4)",
              "unset"
            )}
          >
            <Flex direction="column">
              <Flex
                flexDirection="row"
                align="center"
                justify="center"
                w="100%"
              >
                <Stat me="auto">
                  <StatLabel
                    fontSize="3xl"
                    color={textColor}
                    fontWeight="extrabold"
                    textTransform="uppercase"
                  >
                    Transaksi
                  </StatLabel>
                </Stat>
                <IconBox
                  borderRadius="50%"
                  as="box"
                  h={"45px"}
                  w={"45px"}
                  bg={iconBlue}
                >
                  <CreditIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                </IconBox>
              </Flex>
            </Flex>
          </Card>
        </NavLink>
      </SimpleGrid>
    </Flex>
  );
}
