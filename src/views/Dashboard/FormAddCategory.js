// Chakra imports
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
  useToast
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function FormAddCategory() {
  
  let history = useHistory();
  const toast = useToast();
  const [nama, setNama] = useState('');
  const [data, setData] = useState(null);
  const user = useSelector((state) => state.user.data);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      nama: nama
    }
    axios
    .post("http://localhost:8080/api/categories", data, {
      headers: {
        "x-access-token": user.accessToken,
      },
    })
    .then((res) => {
      setData(res.data);
      setNama('');
      if (res.status === 201) { 
        toast({
          title: 'Success.',
          description: "Your changes are saved successfully",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
    })
    .catch((err) => {
      console.error(err);
    });
  }

  const bgForm = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("white", "white");
  const titleColor = useColorModeValue("gray.700", "blue.500");

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px"}}>
      <Flex position="relative">
        <Flex
          minH={{ md: "300px" }}
          h={{ sm: "initial", md: "60vh", lg: "70vh" }}
          w="100%"
          maxW="1044px"
          mx="auto"
          justifyContent="space-between"
          mb="100px"
          pt={{ md: "0px" }}
        >
          <Flex
            w="100%"
            h="100%"
            alignItems="center"
            justifyContent="center"
            mb="60px"
            mt={{ base: "50px", md: "-90px" }}
          >
            <Flex
              zIndex="2"
              direction="column"
              w="430px"
              background="transparent"
              borderRadius="15px"
              p="30px"
              mx={{ base: "100px" }}
              m={{ base: "20px", md: "auto" }}
              bg={bgForm}
              boxShadow={useColorModeValue(
                "0px 5px 14px rgba(0, 0, 0, 0.3)",
                "unset"
              )}
            >
              <Text
                fontSize="xl"
                color={titleColor}
                fontWeight="bold"
                textAlign="center"
                mb="8px"
              >
                Add Category
              </Text>
              <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    Name
                  </FormLabel>
                  <Input
                    fontSize="sm"
                    ms="4px"
                    type="text"
                    placeholder="Contoh: Vitamin"
                    name="name"
                    mb="12px"
                    size="lg"
                    value={nama}
                    onChange={e => setNama(e.target.value)}
                  />
                  <Flex justifyContent="flex-end">
                    <Button
                      type="submit"
                      fontSize="14px"
                      borderColor="blue.400"
                      variant="outline"
                      bg="white"
                      color="blue.400"
                      fontWeight="bold"
                      h="45"
                      mr="5px"
                      _hover={{
                        background: "white",
                        color: "blue.400",
                      }}
                      _focus={{
                        background: "white",
                        color: "blue.400",
                      }}
                      _active={{
                        background: "white",
                        color: "blue.400",
                      }}
                      onClick={history.goBack}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      fontSize="14px"
                      bg="blue.400"
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
                      Save
                    </Button>
                  </Flex>
                </FormControl>
              </form>
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                maxW="100%"
                mt="0px"
              ></Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default FormAddCategory;
