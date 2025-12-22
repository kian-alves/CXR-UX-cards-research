/**
 * WexDatePicker Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexDatePicker } from "@/components/wex";

describe("WexDatePicker", () => {
  it("renders trigger without crashing", () => {
    render(
      <WexDatePicker
        placeholder="Pick a date"
      />
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("shows placeholder", () => {
    render(
      <WexDatePicker
        placeholder="Choose a date..."
      />
    );
    expect(screen.getByText("Choose a date...")).toBeInTheDocument();
  });

  it("can be disabled", () => {
    render(
      <WexDatePicker
        disabled
        placeholder="Disabled"
      />
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("displays selected date", () => {
    const date = new Date(2024, 0, 15);
    render(
      <WexDatePicker
        date={date}
        placeholder="Pick a date"
      />
    );
    expect(screen.getByText(/Jan.*15.*2024/i)).toBeInTheDocument();
  });
});

