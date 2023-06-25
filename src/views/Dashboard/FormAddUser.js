// Chakra imports
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Select,
    Text,
    useColorModeValue,
    useToast
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import { useDispatch } from "react-redux";
  import { useForm } from "react-hook-form";
  import { useHistory } from "react-router-dom";
  import userSlice from "../../store/user";
  import axios from "axios";

  
  function FormAddUser() {

    const { register, handleSubmit, formState: {errors} } = useForm();

    const toast = useToast();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState('');
  
    const dispatch = useDispatch();
    let history = useHistory();

    const formSubmitHandler = (data) => {
      const postData = {
        username: data.username,
        password: data.password,
        roles: data.roles
      };
      axios
      .post("http://localhost:8080/api/auth/signup", postData)
      .then((res) => {
        console.log(res.data);
        if (typeof res.data.accessToken !== "undefined") {
          // console.log(res.data);
          dispatch(userSlice.actions.addUser(res.data));
        }
        setUsername('');
        setPassword('');
      })
      .catch((err) => {
         console.log(err)
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
              mt={{ base: "50px", md: "20px" }}
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
                  Add User
                </Text>
                <form onSubmit={handleSubmit(formSubmitHandler)}>
                  <FormControl isRequired>
                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                      Username
                    </FormLabel>
                    <Input
                      fontSize="sm"
                      ms="4px"
                      type="text"
                      placeholder="Masukkan Username"
                      name="username"
                      {...register("username", { required: true })}
                      mb="12px"
                      size="lg"
                    />
                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                      Password
                    </FormLabel>
                    <Input
                      fontSize="sm"
                      ms="4px"
                      type="password"
                      placeholder="Masukkan Password"
                      name="password"
                      mb="12px"
                      size="lg"
                      {...register("password", { required: true })}
                    />
                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                      Role
                    </FormLabel>
                    <Select placeholder='Select Roles' mb="12px" value={roles} onChange={e => setRoles(e.target.value)} >
                        <option value='option1'>admin</option>
                        <option value='option2'>kasir</option>
                    </Select>
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
                        onClick={() =>
                          toast({
                            title: 'Success.',
                            description: "Your changes are saved successfully",
                            status: 'success',
                            duration: 3000,
                            isClosable: true,
                          })
                        }
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
  
  export default FormAddUser;
  