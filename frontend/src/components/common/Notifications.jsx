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
  Icon,
  AvatarBadge,
} from "@chakra-ui/react";
import { FaComment } from "react-icons/fa";
import { EditIcon } from "@chakra-ui/icons";
import { CheckCircleIcon } from "@chakra-ui/icons";

import axios from "axios";

export const Notifications = () => {
  const token = useSelector((store) => store.authReducer.token);
  const navigate = useNavigate();
  const toast = useToast();
  const [notifications, setNotifications] = useState([]);
  const reversedNoti = notifications?.slice().reverse().slice(0, 5);
  const getNotificationIcon = (type) => {
    switch (type) {
      case "comment":
        return <FaComment color="#fb8600ca" />; // Chakra UI Comment icon
      case "like":
        return <CheckCircleIcon color="#fb8500ca" />; // Chakra UI CheckCircle icon
      case "post":
        return <EditIcon color="#fb8500ca" />; // Chakra UI Edit icon
      default:
        return null;
    }
  };

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
      {reversedNoti.length > 0 ? (
        reversedNoti.map((notification, index) => (
          <>
            <Flex gap="0.5rem" alignItems="center">
              <Avatar
                size="sm"
                src={`${process.env.REACT_APP_API_URL}/${notification.senderImage}`}
              ></Avatar>
              <Center height="50px">
                <Divider orientation="vertical" />
              </Center>
              <Text key={index} fontSize="0.9rem">
                {getNotificationIcon(notification.type)} {notification.message}{" "}
                at {notification.time}
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
