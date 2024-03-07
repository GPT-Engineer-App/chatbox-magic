import React, { useState } from "react";
import { Box, VStack, Input, IconButton, Text } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  // Removed Drawer-related states, references, and breakpoint values as they are no longer needed.

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
      <Box position="fixed" bottom="0" right="0" width="full" maxWidth="md" paddingX={4} paddingY={4} boxShadow="lg" backgroundColor="white" zIndex="overlay">
        <VStack spacing={4} align="stretch">
          <Box borderBottomWidth="1px" paddingY={2}>
            <Text fontSize="xl" fontWeight="bold">
              Chat with us!
            </Text>
          </Box>
          <VStack spacing={4} align="stretch" overflowY="auto" maxHeight="calc(100vh - 180px)" paddingY={4}>
            {messages.map((message, index) => (
              <Box key={index} alignSelf={message.type === "sent" ? "flex-end" : "flex-start"} backgroundColor={message.type === "sent" ? "blue.500" : "gray.100"} color={message.type === "sent" ? "white" : "black"} paddingX={4} paddingY={2} borderRadius="lg" maxWidth="70%">
                <Text>{message.content}</Text>
              </Box>
            ))}
          </VStack>
          <Box borderTopWidth="1px" paddingY={2} display="flex" alignItems="center">
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
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default Index;
