import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  useToast,
  Box,
  Text,
  Button,
  Flex,
  Avatar,
  Divider,
  Center,
} from "@chakra-ui/react";
import axios from "axios";

export const Notifications = () => {
  const token = useSelector((store) => store.authReducer.token);
  const navigate = useNavigate();
  const toast = useToast();
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/notification`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setNotifications(response.data.notifications);
      })
      .catch((error) => {
        // Handle errors
        toast({
          title: "Error",
          description: "Failed to fetch notifications",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.log(error);
      });
  };

  useEffect(() => {
    // Fetch notifications when the component mounts
    fetchNotifications();

    // Set up an interval to fetch new notifications every 5 seconds
    const intervalId = setInterval(() => {
      fetchNotifications();
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [token, toast]);

  return (
    <Box>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <>
            <Flex gap="0.5rem" alignItems="center">
              <Avatar
                size="sm"
                src={`${process.env.REACT_APP_API_URL}/${notification.senderImage}`}
              />
              <Center height="50px">
                <Divider orientation="vertical" />
              </Center>
              <Text key={index} fontSize="0.9rem">
                {notification.message} at {notification.time}
              </Text>
            </Flex>
            <Divider my={2} />
          </>
        ))
      ) : (
        <Text>Loading...</Text>
      )}
    </Box>
  );
};
