import { Card, Text, Badge, Group, Center, Checkbox } from '@mantine/core';
import { IconCircle, IconCircleX } from '@tabler/icons-react';

interface TodoItem {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

interface TodoCardProps {
  item: TodoItem;
  onToggleCompleted: (id: number) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ item, onToggleCompleted }) => {
  const handleCheckboxChange = () => {
    onToggleCompleted(item.id);
  };

  return (
    <Card
      key={item.id}
      shadow="md"
      padding="lg"
      style={{
        marginBottom: "20px",
        borderRadius: "12px",
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* Task Description and Status */}
      <Group align="apart" style={{ marginBottom: "10px" }}>
        <Text fw={600} size="lg" style={{ color: "#212529" }}>
          {item.todo}
        </Text>
        <Badge
          color={item.completed ? "green" : "red"}
          variant="light"
          size="lg"
        >
          {item.completed ? "Completed" : "Not Completed"}
        </Badge>
      </Group>

      {/* Checkbox and User Information */}
      <Group align="apart">
        <Center>
          <Checkbox
            checked={item.completed}
            onChange={handleCheckboxChange}
            label="Mark as completed"
          />
        </Center>
        <Text size="sm" color="dimmed">
          User ID: {item.userId}
        </Text>
      </Group>
    </Card>
  );
};

export default TodoCard;
