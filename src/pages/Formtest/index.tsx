import React, { useState } from "react";
import { Select } from "@mantine/core";

const DependentDropdown = () => {
  // State for the first dropdown
  const [firstDropdown, setFirstDropdown] = useState("");
  
  // State for the second dropdown
  const [secondDropdown, setSecondDropdown] = useState("");

  // Options for the first dropdown
  const firstDropdownOptions = [
    { value: "fruits", label: "Fruits" },
    { value: "vegetables", label: "Vegetables" },
    { value: "beverages", label: "Beverages" },
  ];

  // Options for the second dropdown based on the first dropdown's selection
  const secondDropdownOptions = {
    fruits: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "mango", label: "Mango" },
    ],
    vegetables: [
      { value: "carrot", label: "Carrot" },
      { value: "broccoli", label: "Broccoli" },
      { value: "spinach", label: "Spinach" },
    ],
    beverages: [
      { value: "coffee", label: "Coffee" },
      { value: "tea", label: "Tea" },
      { value: "juice", label: "Juice" },
    ],
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: "1rem" }}>
      {/* First dropdown */}
      <Select
        label="Category"
        placeholder="Pick a category"
        data={firstDropdownOptions}
        value={firstDropdown}
        onChange={(value) => {
          setFirstDropdown(value ?? "");
          setSecondDropdown(""); // Reset second dropdown when the first dropdown changes
        }}
      />

      {/* Second dropdown */}
      <Select
        label="Options"
        placeholder="Pick an option"
        data={firstDropdown ? secondDropdownOptions[firstDropdown as keyof typeof secondDropdownOptions] : []}
        value={secondDropdown}
        onChange={(value) => setSecondDropdown(value ?? "")}
        disabled={!firstDropdown} // Disable the second dropdown if no category is selected
      />
    </div>
  );
};

export default DependentDropdown;
