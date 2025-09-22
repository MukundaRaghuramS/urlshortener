
import React, { useEffect, useState } from "react";
import Service from "../../utils/http";
import {
  Anchor,
  Button,
  Modal,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

const MyUrls = () => {
  const service = new Service();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editUrl, setEditUrl] = useState("");
  const [editTitle, setEditTitle] = useState("");

  // Fetch all user URLs
  const getData = async () => {
    try {
      const response = await service.get("user/my/urls");
      setData(response.shortURLs);
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Failed to fetch URLs. Please try again later.",
        color: "red",
      });
    }
  };

  // Save edited URL
  const handleSave = async () => {
    try {
      await service.patch(`s/${editId}`, {
        originalUrl: editUrl,
        title: editTitle,
      });

      setData((prev) =>
        prev.map((item) =>
          item.shortCode === editId
            ? { ...item, originalUrl: editUrl, title: editTitle }
            : item
        )
      );

      notifications.show({
        title: "Success",
        message: "URL updated successfully!",
        color: "green",
      });

      setOpen(false);
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Failed to update URL. Please try again.",
        color: "red",
      });
    }
  };

  // Delete URL
  const handleDelete = async (shortCode) => {
    try {
      await service.delete(`s/${shortCode}`);

      setData((prev) => prev.filter((item) => item.shortCode !== shortCode));

      notifications.show({
        title: "Deleted",
        message: "URL deleted successfully!",
        color: "green",
      });
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Failed to delete URL. Please try again.",
        color: "red",
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title="Edit URL" centered>
        <TextInput
          label="Original URL"
          value={editUrl}
          onChange={(e) => setEditUrl(e.target.value)}
        />
        <TextInput
          mt="sm"
          label="Title (optional)"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <Button fullWidth mt="md" onClick={handleSave}>
          Save
        </Button>
      </Modal>

      <div>
        <Table withColumnBorders withRowBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Original URL</Table.Th>
              <Table.Th>Short Code</Table.Th>
              <Table.Th>Clicks</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.map((d) => (
              <Table.Tr key={d._id}>
                <Table.Td>
                  <Text>{d?.title || "NA"}</Text>
                </Table.Td>
                <Table.Td>
                  <Anchor href={d?.originalUrl} target="_blank">
                    {d?.originalUrl}
                  </Anchor>
                </Table.Td>
                <Table.Td>
                  <Text>{d?.shortCode}</Text>
                </Table.Td>
                <Table.Td>
                  <Text>{d?.clickCount ?? 0}</Text>
                </Table.Td>
                <Table.Td>
                  <Button
                    variant="subtle"
                    mx={10}
                    onClick={() => {
                      setEditId(d.shortCode);
                      setEditUrl(d.originalUrl);
                      setEditTitle(d.title || "");
                      setOpen(true);
                    }}
                  >
                    <IconEdit />
                  </Button>
                  <Button
                    variant="subtle"
                    color="red"
                    onClick={() => handleDelete(d.shortCode)}
                  >
                    <IconTrash />
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </>
  );
};

export default MyUrls;
