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
import { useAuthContext } from "../../context/auth";
import { useRouter } from "next/router";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
  })
  .required();

export default function AuthSignupRoute() {
  const router = useRouter();
  const authContext = useAuthContext();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<{ name:string,email: string; password: string }>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({
    name,
    email,
    password,
  }: {
    name:string;
    email: string;
    password: string;
  }) => {
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      },{
        data:{
            handler:email.split("@")[0],
            name
        }
      });

      if (user) {
        authContext?.loadUserSession();
        toast({
          title: "Authentication",
          description: "Your account created successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router.push("/auth/signin/login-with-email");
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
          <FormControl id="name" isInvalid={Boolean(errors.name)}>
              <FormLabel>Name</FormLabel>
              <Input type="text" {...register("name")} />
              {errors?.name && (
                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="email" isInvalid={Boolean(errors.email)}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" {...register("email")} />
              {errors?.email && (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="password" isInvalid={Boolean(errors.password)}>
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
