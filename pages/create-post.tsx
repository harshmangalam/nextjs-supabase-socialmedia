import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Stack,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiImage } from "react-icons/fi";
import UploadMedia from "../components/UploadMedia";

export default function CreatePostRoute() {
  const [content, setContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");

  const handleCreatePost = async () => {
    console.log(content, mediaUrl);
    setContent("");
  };
  return (
    <Container>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"sm"}
        borderWidth={"2px"}
        p={8}
        mt={4}
      >
        <Heading fontSize={"4xl"} textAlign="center">
          Create Post
        </Heading>

        <Stack spacing={4} mt={8}>
          <Textarea
            rows={8}
            placeholder={"Start typing post content..."}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <HStack spacing={4}>
            <UploadMedia addMediaUrl={(url) => setMediaUrl(url)}>
              <Icon fontSize={"xl"} as={FiImage} color="green.400" />
            </UploadMedia>
          </HStack>
          <Button colorScheme="green" w="full" onClick={handleCreatePost}>
            Create Post
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
