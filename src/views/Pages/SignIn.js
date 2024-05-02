import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import userSlice from "../../store/user";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import signInImage from "/assets/img/signInImage.jpg";
import axios from "axios";

function SignIn() {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [loginStatus, setLoginStatus] = useState({
    succes: false,
    message: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const formSubmitHandler = (data) => {
    const postData = {
      username: data.username,
      password: data.password
    };
    axios
    .post("http://localhost:8080/api/auth/signin", postData)
    .then((res) => {
      if (typeof res.data.accessToken !== "undefined") {
        console.log(res.data);
        dispatch(userSlice.actions.addUser(res.data));

        if (res.data.roles[0] === "ROLE_ADMIN") {
          history.push('/admin/dashboard');
        }

        if (res.data.roles[0] === "ROLE_KASIR") {
          history.push('/kasir/dashboard');
        }
        
      }
    })
    .catch((err) => {
      setLoginStatus({
        success: false,
        message: "Sorry, something is wrong. Try again later.",
      });
       console.log(err)
    });
  }

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");
 
  return (
    <Flex position="relative">
      <Flex
        minH={{ md: "1000px" }}
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ md: "0px" }}
      >
        <Flex
          w="100%"
          h="100%"
          alignItems="center"
          justifyContent="center"
          mb='20px'
          mt={{ base: "50px", md: "-150px" }}
        >
          <Flex
            zIndex="2"
            direction="column"
            w="445px"
            background="transparent"
            borderRadius="15px"
            p="30px"
            mx={{ base: "100px" }}
            m={{ base: "20px", md: "auto" }}
            bg={bgForm}
            boxShadow={useColorModeValue(
              "0px 5px 14px rgba(0, 0, 0, 0.05)",
              "unset"
            )}
          >
            <Text
              fontSize="xl"
              color={textColor}
              fontWeight="bold"
              textAlign="center"
              mb="8px"
            >
              Sign In
            </Text>
            {!loginStatus.succes && loginStatus.message && (
              <Text fontSize="xs" color="red" fontWeight="semibold" mb="12px">
                {loginStatus.message}
              </Text>
            )}
            <form onSubmit={handleSubmit(formSubmitHandler)}>
              <FormControl isRequired>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Username
                </FormLabel>
                <Input
                  variant="auth"
                  fontSize="sm"
                  ms="4px"
                  type="text"
                  placeholder="Contoh: johndee"
                  name="username"
                  {...register("username", { required: true })}
                  mb="8px"
                  size="lg"
                />
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Password
                </FormLabel>
                <Input
                  variant="auth"
                  fontSize="sm"
                  ms="4px"
                  type="password"
                  placeholder="Input Password"
                  name="password"
                  {...register("password", { required: true })}
                  mb="24px"
                  size="lg"
                />
                <Button
                  type="submit"
                  fontSize="14px"
                  variant="dark"
                  fontWeight="bold"
                  w="100%"
                  h="45"
                >
                  Sign In
                </Button>
              </FormControl>
            </form>
          </Flex>
        </Flex>
        <Box
          overflowX="hidden"
          h="100%"
          w="100%"
          left="0px"
          position="absolute"
          bgImage={signInImage}
        >
          <Box
            w="100%"
            h="100%"
            bgSize="cover"
            bg="blue.400"
            opacity="0.4"
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
