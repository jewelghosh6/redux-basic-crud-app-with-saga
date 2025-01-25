import React, { useState } from "react";
import { MentionsInput, Mention } from "react-mentions";
import { Popover, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

// Type for user data
interface User {
  id: string;
  display: string;
}

// Component
const App: React.FC = () => {
  const [value, setValue] = useState<string>(""); // State for MentionsInput value
  const [tooltipData, setTooltipData] = useState<{ id: string; name: string; role: string } | null>(null); // Tooltip data
  const [hoveredMention, setHoveredMention] = useState<string | null>(null); // Currently hovered mention ID
  const [opened, { open, close }] = useDisclosure(false); // Mantine's useDisclosure hook

  // Example user data
  const users: User[] = [
    { id: "1", display: "Alice" },
    { id: "2", display: "Bob" },
    { id: "3", display: "Charlie" },
  ];

  // Fetch tooltip data from an API when hovering
  const fetchTooltipData = async (id: string) => {
    try {
      // Simulate API call (replace this with your real API)
      const response = await new Promise<{ id: string; name: string; role: string }>((resolve) =>
        setTimeout(() => resolve({ id, name: `User ${id}`, role: "Engineer" }), 500)
      );
      setTooltipData(response);
    } catch (error) {
      console.error("Error fetching tooltip data:", error);
      setTooltipData(null);
    }
  };

  // Handle mouse enter
  const handleMouseEnter = (id: string) => {
    setHoveredMention(id);
    open(); // Open the popover
    fetchTooltipData(id); // Fetch tooltip data asynchronously
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setHoveredMention(null);
    close(); // Close the popover
    setTooltipData(null);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h3>React Mentions with Mantine Tooltip</h3>

      {/* MentionsInput */}
      <MentionsInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          control: {
            // fontSize: 16,
            // padding: "10px",
            backgroundColor: "#f9f9f9",
            // border: "1px solid #ccc",
            // borderRadius: "6px",
          },
          highlighter: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "inline-block",
            // width: "100%",
          },
          input: {
            margin: 0,
          },
          suggestions: {
            list: {
              backgroundColor: "white",
              border: "1px solid rgba(0,0,0,0.15)",
              fontSize: 14,
              borderRadius: "4px",
            },
            item: {
              padding: "5px 10px",
              "&focused": {
                backgroundColor: "#e6f7ff",
              },
            },
          },
        }}
      >
        <Mention
          trigger="@"
          data={users}
          style={{
            backgroundColor: "#daf4fa",
            borderRadius: "4px",
            padding: "2px 5px",
            fontSize: "16px",
            margin: "0 0 0 5px",
            display: "inline-block",
            color: "#2e7d32",
            fontWeight: "bold",
          }}
          renderSuggestion={(suggestion, search, highlightedDisplay, index) => (
            <div
              key={index}
              onMouseEnter={() => handleMouseEnter(suggestion.id.toString())}
              onMouseLeave={handleMouseLeave}
              style={{
                padding: "5px 10px",
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                cursor: "pointer",
              }}
            >
              {highlightedDisplay}
            </div>
          )}
        />
      </MentionsInput>

      {/* Mantine Popover */}
      {/* <Popover
        width={200}
        position="bottom"
        withArrow
        shadow="md"
        opened={opened && tooltipData !== null}
      >
        <Popover.Target>
          <span />
        </Popover.Target>
        <Popover.Dropdown style={{ pointerEvents: "none" }}>
          {tooltipData ? (
            <>
              <Text size="sm" fw={500}>
                {tooltipData.name}
              </Text>
              <Text size="xs" color="dimmed">
                {tooltipData.role}
              </Text>
            </>
          ) : (
            <Text size="sm" color="dimmed">
              Loading...
            </Text>
          )}
        </Popover.Dropdown>
      </Popover> */}
    </div>
  );
};

export default App;
