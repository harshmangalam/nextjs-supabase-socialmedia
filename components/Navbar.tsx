import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  SkeletonCircle,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineHome } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { useAuthContext } from "../context/auth";
import CreateMenu from "./CreateMenu";
import NotificationMenu from "./NotificationMenu";
import ProfileMenu from "./ProfileMenu";
import ThemeMode from "./ThemeMode";

export default function Navbar() {
  const router = useRouter();
  const authContext = useAuthContext();

  console.log(router.pathname);
  return (
    <Flex
      as="nav"
      justify={"space-between"}
      py={4}
      borderBottomWidth="thin"
      h={16}
      align="center"
      px={4}
      position="fixed"
      top={0}
      left={0}
      right={0}
      background={useColorModeValue("white", "gray.800")}
      zIndex={"50"}
    >
      {/* logo  */}
      <Link href={"/"} passHref>
        <Box as="a" w={"40px"} h={"40px"}>
          <Image
            w="full"
            h="full"
            background="transparent"
            src="https://marketplace-assets.digitalocean.com/logos/supabase-supabasepostgres-18-04.svg"
          />
        </Box>
      </Link>

      {/* menu links  */}

      {authContext?.user && (
        <HStack
          display={["none", "flex"]}
          spacing={[2, 2, 4]}
          flexGrow={1}
          justify="center"
        >
          {menus.map((menu) => (
            <Link href={menu.href} passHref>
              <Button
                size={["sm", "sm", "md"]}
                variant={"ghost"}
                rounded="full"
                leftIcon={menu.icon}
                as="a"
                colorScheme={router.pathname === menu.href ? "green" : "gray"}
              >
                {menu.name}
              </Button>
            </Link>
          ))}
        </HStack>
      )}

      <HStack spacing={2}>
        <ThemeMode />
        {authContext?.isAuthenticating ? (
          <HStack spacing={2}>
            <SkeletonCircle size="10" />
            <SkeletonCircle size="10" />
            <SkeletonCircle size="10" />
          </HStack>
        ) : authContext?.user ? (
          <HStack spacing={2}>
            <CreateMenu />
            <NotificationMenu />
            <ProfileMenu />
          </HStack>
        ) : (
          <Link href="/auth" passHref>
            <Button
              variant={"solid"}
              size="sm"
              rounded="full"
              leftIcon={<BiLogIn size={16} />}
              as="a"
              colorScheme="green"
            >
              <Box as="span">Authenticate</Box>
            </Button>
          </Link>
        )}
      </HStack>
    </Flex>
  );
}

const menus = [
  {
    icon: <AiOutlineHome size={24} />,
    name: "Home",
    href: "/",
  },
  {
    icon: <BsPeople size={24} />,
    name: "Friends",
    href: "/friends",
  },
];
