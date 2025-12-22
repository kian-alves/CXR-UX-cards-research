/**
 * WexCombobox Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexCombobox } from "@/components/wex";

describe("WexCombobox", () => {
  const options = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
  ];

  it("renders trigger without crashing", () => {
    render(
      <WexCombobox
        options={options}
        placeholder="Select option"
      />
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows placeholder", () => {
    render(
      <WexCombobox
        options={options}
        placeholder="Choose..."
      />
    );
    expect(screen.getByText("Choose...")).toBeInTheDocument();
  });

  it("can be disabled", () => {
    render(
      <WexCombobox
        options={options}
        disabled
        placeholder="Disabled"
      />
    );
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("displays selected value", () => {
    render(
      <WexCombobox
        options={options}
        value="react"
        placeholder="Select option"
      />
    );
    expect(screen.getByText("React")).toBeInTheDocument();
  });
});

