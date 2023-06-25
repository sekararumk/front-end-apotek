// Chakra imports
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Select,
    Textarea,
    Text,
    useToast,
    useColorModeValue
  } from "@chakra-ui/react";
  // Custom components
  import React, { useEffect, useState } from "react";
  import { useHistory, useParams } from "react-router-dom";
  import { useSelector } from "react-redux";
  import axios from "axios";
  
  function FormEditProduct() {
  
    let history = useHistory();
    const toast = useToast();
    const [nama, setNama] = useState('');
    const [categoryList, setCategoryList] = useState(null);
    const [selected, setSelected] = useState('');
    const [harga, setHarga] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [date, setDate] = useState('');
    const [data, setData] = useState(null);
    const {id} = useParams();
    const user = useSelector((state) => state.user.data);
  
    // GET ALL CATEGORIES
    useEffect(() => {
      // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgxNzAwNjQyLCJleHAiOjE2ODE3ODcwNDJ9.qWgcvQEdRNouWvxrfJQVvgdDHKEKkv3EBu2zYU4a3do"
      // { headers : { "Authorization": `${token}`}}
      axios
        .get("http://localhost:8080/api/categories",
        {
          headers: {
          "x-access-token": user.accessToken,
          },
        }
        )
        .then((res) => {
          console.log(res.data);
          setCategoryList(res.data);
          setSelected(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    // GET ALL PRODUCTS
    useEffect(() => {
        const getProductById = async () => {
          const {data} = await axios.get(`http://localhost:8080/api/products/${id}`,
          {
            headers: {
            "x-access-token": user.accessToken,
            },
          })
          console.log(data);
          setNama(data.nama)
          setSelected(data.selected)
          setHarga(data.harga)
          setDeskripsi(data.deskripsi)
          setDate(data.date)
        }
        getProductById();
      }, [id])
  
      const updateHandler = async (e) => {
        e.preventDefault();
        const data = {
            nama: nama,
            categoryId: selected,
            harga: harga,
            deskripsi: deskripsi,
            expired: date
        }
          await axios.put(`http://localhost:8080/api/products/${id}`, data,
          {
            headers: {
            "x-access-token": user.accessToken,
            },
          })
          .then((res) => {
            console.log(res)
            setNama('');
            setSelected('')
            setHarga('')
            setDeskripsi('')
            setDate('')
            if (res.status === 200) { 
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
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Flex position="relative">
          <Flex
            minH={{ md: "300px" }}
            h={{ sm: "initial", md: "60vh", lg: "70vh" }}
            w="100%"
            maxW="1044px"
            mx="auto"
            justifyContent="space-between"
            mb="200px"
            pt={{ md: "0px" }}
          >
            <Flex
              w="100%"
              h="100%"
              alignItems="center"
              justifyContent="center"
              mb="60px"
              mt={{ base: "50px", md: "10px" }}
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
                  Edit Product
                </Text>
                <form onSubmit={updateHandler}>
                  <FormControl isRequired>
                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                      Nama
                    </FormLabel>
                    <Input
                      variant="auth"
                      fontSize="sm"
                      ms="4px"
                      type="text"
                      placeholder="Nama Produk"
                      name="nama"
                      mb="12px"
                      size="lg"
                      value={nama}
                      onChange={e => setNama(e.target.value)}
                    />
                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                      Category
                    </FormLabel>
                    <Select placeholder="Pilih Kategori" mb="12px" value={selected} onChange={e => setSelected(e.target.value)}>
                      {categoryList?.map((category) => {
                        return (
                          <option
                            value={category.id}
                            key={category.id}
                          >
                            {category.nama}
                          </option>
                        );
                      })}
                    </Select>
                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                      Harga
                    </FormLabel>
                    <Input
                      variant="auth"
                      fontSize="sm"
                      ms="4px"
                      type="text"
                      placeholder="Harga Produk"
                      name="harga"
                      mb="12px"
                      size="lg"
                      value={harga}
                      onChange={e => setHarga(e.target.value)}
                    />
                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                      Deskripsi
                    </FormLabel>
                    <Textarea placeholder="Deskripsi Produk" mb="12px" value={deskripsi} onChange={e => setDeskripsi(e.target.value)}/>
                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                      Expired
                    </FormLabel>
                    <Input
                      variant="auth"
                      fontSize="sm"
                      ms="4px"
                      type="date"
                      placeholder="Tgl Expired"
                      name="expired"
                      mb="12px"
                      size="lg"
                      value={date}
                      onChange={e => setDate(e.target.value)}
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
  
  export default FormEditProduct;
  