import { Card, Center, Stack, Avatar, Text, Divider } from "@mantine/core";
import "@mantine/core/styles.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const user = useSelector((state) => state.user);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let savedUserId = localStorage.getItem("userId");
    if (!savedUserId) {
      savedUserId = Array.from({ length: 24 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("");
      localStorage.setItem("userId", savedUserId);
    }

    let savedCreatedAt = localStorage.getItem("createdAt");
    if (!savedCreatedAt) {
      savedCreatedAt = new Date().toLocaleString();
      localStorage.setItem("createdAt", savedCreatedAt);
    }

    const fallbackUser = {
      name: "Mukunda Raghuram",
      email: "2210080019@klh.edu.in",
      avatar: "/default-avatar.png", 
      userId: savedUserId,
      createdAt: savedCreatedAt,
    };

    setProfile(
      user?.name
        ? {
            ...user,
            avatar: user.avatar || "/default-avatar.png",
            userId: savedUserId,
            createdAt: savedCreatedAt,
          }
        : fallbackUser
    );
  }, [user]);

  if (!profile) return null;

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Center style={{ height: "100%", width: "100%" }}>
        <Card
          shadow="lg"
          padding="xl"
          radius="lg"
          style={{
            backgroundColor: "#fff", 
            border: "1px solid rgba(0, 0, 0, 0.1)",
            maxWidth: 500,
            width: "90%",
            textAlign: "center",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Stack align="center" spacing="md">
            
            <Avatar
              src={profile.avatar}
              size={120}
              radius={120}
              style={{
                border: "3px solid #eee",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
              }}
            >
              {profile.name.charAt(0)}
            </Avatar>

            <Text size="xl" fw={700} tt="uppercase" c="black">
              {profile.name}
            </Text>

            <Text size="sm" c="dimmed">
              {profile.email}
            </Text>

            <Divider style={{ width: "80%", marginTop: "1rem" }} />

            <Text size="sm" c="black">
              <b>User ID:</b> {profile.userId}
            </Text>

            <Text size="sm" c="black">
              <b>Account Created:</b> {profile.createdAt}
            </Text>
          </Stack>
        </Card>
      </Center>
    </div>
  );
}
