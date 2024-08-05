"use client";
import { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello, how can I help you?",
    },
  ]);

  const sendMessage = async () => {
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
    ]);
    setMessage("");
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    });

    const data = await response.json();
    setMessages((messages) => [
      ...messages,
      { role: "assistant", content: data.message },
    ]);
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{ bgcolor: "background.default" }}
    >
      <Stack
        padding={2}
        direction="column"
        width="500px"
        height="700px"
        borderRadius={2}
        border="1px solid #ddd"
        sx={{ boxShadow: 3 }}
        spacing={2}
      >
        <Stack direction="column" spacing={2} flexGrow={1} overflow="auto">
          {messages.map((item, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                item.role === "assistant" ? "flex-start" : "flex-end"
              }
            >
              <Box
                bgcolor={
                  item.role === "assistant" ? "primary.main" : "success.main"
                }
                color="white"
                borderRadius={7}
                padding={2}
                maxWidth="75%"
              >
                <Typography variant="body1">{item.content}</Typography>
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction="row" spacing={1} padding={2}>
          <TextField
            label="Message"
            fullWidth
            variant="outlined"
            sx={{ bgcolor: "background.paper" }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={sendMessage}
            sx={{ height: "100%" }}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
