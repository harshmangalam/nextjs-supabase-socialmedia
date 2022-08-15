import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Container,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "../../utils/supabaseClient";

const schema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
  })
  .required();

export default function LoginWithEmailRoute() {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async ({ email, password }) => {
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (user) {
        toast({
          title: "Authentication",
          description: "You have logged in successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }

      if (error) {
        toast({
          title: "Authentication Error",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Authenticate</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Login With Email
          </Text>
        </Stack>

        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
            <FormControl id="email" isInvalid={errors.email}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" {...register("email")} />
              {errors?.email && (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="password" isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <Input type="password" {...register("password")} />
              {errors?.password && (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              )}
            </FormControl>

            <Button isLoading={isSubmitting} type="submit" colorScheme="green">
              Sign in
            </Button>
          </Stack>
          <Link href={"/auth"} passHref>
            <Button
              as="a"
              variant={"link"}
              colorScheme="twitter"
              size="sm"
              mt={3}
              w="full"
            >
              View other login options
            </Button>
          </Link>
        </Box>
      </Stack>
    </Container>
  );
}
