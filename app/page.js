"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "./styles.css";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello, I'm the LHS Virtual Assistant. How can I help you?",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const sendMessage = async () => {
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
    ]);
    setMessage("");
    setLoading(true); // Set loading to true when sending message

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
    setLoading(false); // Set loading to false when response is received
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      sx={{
        bgcolor: "background.default",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{
          position: "fixed",
          bottom: 16,
          left: 16,
          zIndex: 10,
        }}
      >
        Chat
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            position: "fixed",
            bottom: 30,
            left: -16,
            width: "300px",
            maxWidth: "100%",
            height: "400px",
            maxHeight: "100%",
            borderRadius: 2,
            boxShadow: 3,
          },
        }}
        hideBackdrop
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: 2,
            bgcolor: "background.default",
          }}
        >
          <Stack
            direction="column"
            width="100%"
            height="100%"
            spacing={2}
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
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
                    bgcolor={item.role === "assistant" ? "#0C2D57" : "#2979ff"}
                    color="white"
                    borderRadius={7}
                    padding={2}
                    maxWidth="75%"
                  >
                    <Typography variant="body1">{item.content}</Typography>
                  </Box>
                </Box>
              ))}
              {/* Show loading animation if loading */}
              {loading && (
                <Typography variant="body1" className="loading-dots">
                  {" "}
                </Typography>
              )}
            </Stack>
            <Box
              component="footer"
              display="flex"
              alignItems="center"
              padding={2}
              sx={{
                bgcolor: "background.paper",
                borderTop: "1px solid #ddd",
              }}
              style={{ marginTop: "auto" }}
            >
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
                sx={{ height: "100%", ml: 1 }}
              >
                Send
              </Button>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
