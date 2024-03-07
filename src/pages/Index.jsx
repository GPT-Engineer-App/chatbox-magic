import React, { useState } from "react";
import { Box, VStack, Input, IconButton, useDisclosure, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Text, useBreakpointValue } from "@chakra-ui/react";
import { FaPaperPlane, FaRegSmile, FaRegCommentDots } from "react-icons/fa";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const drawerSize = useBreakpointValue({ base: "full", md: "md" });

  const sendMessage = () => {
    if (inputValue.trim() === "") return;

    // Add the new message to the messages state
    setMessages([...messages, { type: "sent", content: inputValue }]);
    setInputValue("");

    // Simulate a reply
    setTimeout(() => {
      const reply = "Let's pretend I understood that 😄";
      setMessages((prevMessages) => [...prevMessages, { type: "received", content: reply }]);
    }, 1000);
  };

  return (
    <>
      <IconButton ref={btnRef} icon={<FaRegCommentDots />} onClick={onOpen} position="fixed" bottom="20px" right="20px" zIndex="overlay" />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef} size={drawerSize}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Chat with us!</DrawerHeader>

          <DrawerBody>
            <VStack spacing={4} align="stretch" overflowY="auto" maxHeight="calc(100vh - 140px)" paddingY={4}>
              {messages.map((message, index) => (
                <Box key={index} alignSelf={message.type === "sent" ? "flex-end" : "flex-start"} backgroundColor={message.type === "sent" ? "blue.500" : "gray.100"} color={message.type === "sent" ? "white" : "black"} paddingX={4} paddingY={2} borderRadius="lg" maxWidth="70%">
                  <Text>{message.content}</Text>
                </Box>
              ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Input
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              marginRight={2}
              flexGrow={1}
            />
            <IconButton aria-label="Send message" icon={<FaPaperPlane />} onClick={sendMessage} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Index;
