"use client";
import { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

export default function Home() {
  const [message, setMessage] = useState([
    {
      role: "assistant",
      content: "Hello, how can I help you?",
    },
  ]);

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
          {message.map((item, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                item.role === "assistant" ? "flex-start" : "flex-end"
              }
            >
              <Box
                bgcolor={
                  item.role === "assistant" ? "primary.main" : "secondary.main"
                }
                color="white"
                borderRadius={16}
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
          />
          <Button variant="contained" color="primary" sx={{ height: "100%" }}>
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
