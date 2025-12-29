/**
 * WexInputOTP Component Tests
 *
 * Comprehensive tests covering:
 * - Rendering with various slot configurations
 * - Separator between groups
 * - User input
 * - Controlled value
 * - Disabled state
 * - Accessibility
 */

import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { WexInputOTP } from "@/components/wex";

describe("WexInputOTP", () => {
  // ============================================
  // RENDERING TESTS
  // ============================================
  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(
        <WexInputOTP maxLength={6}>
          <WexInputOTP.Group>
            <WexInputOTP.Slot index={0} />
            <WexInputOTP.Slot index={1} />
            <WexInputOTP.Slot index={2} />
          </WexInputOTP.Group>
        </WexInputOTP>
      );
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("renders 4-digit OTP", () => {
      render(
        <WexInputOTP maxLength={4}>
          <WexInputOTP.Group data-testid="group">
            <WexInputOTP.Slot index={0} data-testid="slot-0" />
            <WexInputOTP.Slot index={1} data-testid="slot-1" />
            <WexInputOTP.Slot index={2} data-testid="slot-2" />
            <WexInputOTP.Slot index={3} data-testid="slot-3" />
          </WexInputOTP.Group>
        </WexInputOTP>
      );
      expect(screen.getByTestId("slot-0")).toBeInTheDocument();
      expect(screen.getByTestId("slot-3")).toBeInTheDocument();
    });

    it("renders 6-digit OTP with separator", () => {
      render(
        <WexInputOTP maxLength={6}>
          <WexInputOTP.Group>
            <WexInputOTP.Slot index={0} />
            <WexInputOTP.Slot index={1} />
            <WexInputOTP.Slot index={2} />
          </WexInputOTP.Group>
          <WexInputOTP.Separator data-testid="separator" />
          <WexInputOTP.Group>
            <WexInputOTP.Slot index={3} />
            <WexInputOTP.Slot index={4} />
            <WexInputOTP.Slot index={5} />
          </WexInputOTP.Group>
        </WexInputOTP>
      );
      expect(screen.getByTestId("separator")).toBeInTheDocument();
      expect(screen.getByRole("separator")).toBeInTheDocument();
    });

    it("renders multiple groups", () => {
      render(
        <WexInputOTP maxLength={6}>
          <WexInputOTP.Group data-testid="group-1">
            <WexInputOTP.Slot index={0} />
            <WexInputOTP.Slot index={1} />
          </WexInputOTP.Group>
          <WexInputOTP.Group data-testid="group-2">
            <WexInputOTP.Slot index={2} />
            <WexInputOTP.Slot index={3} />
          </WexInputOTP.Group>
          <WexInputOTP.Group data-testid="group-3">
            <WexInputOTP.Slot index={4} />
            <WexInputOTP.Slot index={5} />
          </WexInputOTP.Group>
        </WexInputOTP>
      );
      expect(screen.getByTestId("group-1")).toBeInTheDocument();
      expect(screen.getByTestId("group-2")).toBeInTheDocument();
      expect(screen.getByTestId("group-3")).toBeInTheDocument();
    });
  });

  // ============================================
  // INPUT TESTS
  // ============================================
  describe("Input", () => {
    it("accepts numeric input", async () => {
      const user = userEvent.setup();
      render(
        <WexInputOTP maxLength={4}>
          <WexInputOTP.Group>
            <WexInputOTP.Slot index={0} data-testid="slot-0" />
            <WexInputOTP.Slot index={1} data-testid="slot-1" />
            <WexInputOTP.Slot index={2} data-testid="slot-2" />
            <WexInputOTP.Slot index={3} data-testid="slot-3" />
          </WexInputOTP.Group>
        </WexInputOTP>
      );
      
      const input = screen.getByRole("textbox");
      await user.type(input, "1234");
      
      expect(screen.getByTestId("slot-0")).toHaveTextContent("1");
      expect(screen.getByTestId("slot-1")).toHaveTextContent("2");
      expect(screen.getByTestId("slot-2")).toHaveTextContent("3");
      expect(screen.getByTestId("slot-3")).toHaveTextContent("4");
    });

    it("calls onChange when input changes", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <WexInputOTP maxLength={4} onChange={handleChange}>
          <WexInputOTP.Group>
            <WexInputOTP.Slot index={0} />
            <WexInputOTP.Slot index={1} />
            <WexInputOTP.Slot index={2} />
            <WexInputOTP.Slot index={3} />
          </WexInputOTP.Group>
        </WexInputOTP>
      );
      
      const input = screen.getByRole("textbox");
      await user.type(input, "1");
      
      expect(handleChange).toHaveBeenCalled();
    });

    it("calls onComplete when all slots filled", async () => {
      const user = userEvent.setup();
      const handleComplete = vi.fn();
      
      render(
        <WexInputOTP maxLength={4} onComplete={handleComplete}>
          <WexInputOTP.Group>
            <WexInputOTP.Slot index={0} />
            <WexInputOTP.Slot index={1} />
            <WexInputOTP.Slot index={2} />
            <WexInputOTP.Slot index={3} />
          </WexInputOTP.Group>
        </WexInputOTP>
      );
      
      const input = screen.getByRole("textbox");
      await user.type(input, "1234");
      
      expect(handleComplete).toHaveBeenCalledWith("1234");
    });
  });

  // ============================================
  // CONTROLLED VALUE TESTS
  // ============================================
  describe("Controlled Value", () => {
    function ControlledOTP() {
      const [value, setValue] = useState("12");
      return (
        <WexInputOTP maxLength={4} value={value} onChange={setValue}>
          <WexInputOTP.Group>
            <WexInputOTP.Slot index={0} data-testid="slot-0" />
            <WexInputOTP.Slot index={1} data-testid="slot-1" />
            <WexInputOTP.Slot index={2} data-testid="slot-2" />
            <WexInputOTP.Slot index={3} data-testid="slot-3" />
          </WexInputOTP.Group>
        </WexInputOTP>
      );
    }

    it("renders with initial value", () => {
      render(<ControlledOTP />);
      expect(screen.getByTestId("slot-0")).toHaveTextContent("1");
      expect(screen.getByTestId("slot-1")).toHaveTextContent("2");
    });

    it("updates when typing", async () => {
      const user = userEvent.setup();
      render(<ControlledOTP />);
      
      const input = screen.getByRole("textbox");
      await user.type(input, "34");
      
      expect(screen.getByTestId("slot-2")).toHaveTextContent("3");
      expect(screen.getByTestId("slot-3")).toHaveTextContent("4");
    });
  });

  // ============================================
  // DISABLED STATE TESTS
  // ============================================
  describe("Disabled State", () => {
    it("renders with disabled attribute", () => {
      render(
        <WexInputOTP maxLength={4} disabled>
          <WexInputOTP.Group>
            <WexInputOTP.Slot index={0} />
            <WexInputOTP.Slot index={1} />
            <WexInputOTP.Slot index={2} />
            <WexInputOTP.Slot index={3} />
          </WexInputOTP.Group>
        </WexInputOTP>
      );
      expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("does not accept input when disabled", async () => {
      const user = userEvent.setup();
      render(
        <WexInputOTP maxLength={4} disabled>
          <WexInputOTP.Group>
            <WexInputOTP.Slot index={0} data-testid="slot-0" />
            <WexInputOTP.Slot index={1} />
            <WexInputOTP.Slot index={2} />
            <WexInputOTP.Slot index={3} />
          </WexInputOTP.Group>
        </WexInputOTP>
      );
      
      const input = screen.getByRole("textbox");
      await user.type(input, "1234");
      
      expect(screen.getByTestId("slot-0")).not.toHaveTextContent("1");
    });
  });

  // ============================================
  // ACCESSIBILITY TESTS
  // ============================================
  describe("Accessibility", () => {
    it("has accessible textbox role", () => {
      render(
        <WexInputOTP maxLength={4}>
          <WexInputOTP.Group>
            <WexInputOTP.Slot index={0} />
            <WexInputOTP.Slot index={1} />
            <WexInputOTP.Slot index={2} />
            <WexInputOTP.Slot index={3} />
          </WexInputOTP.Group>
        </WexInputOTP>
      );
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("separator has separator role", () => {
      render(
        <WexInputOTP maxLength={6}>
          <WexInputOTP.Group>
            <WexInputOTP.Slot index={0} />
          </WexInputOTP.Group>
          <WexInputOTP.Separator />
          <WexInputOTP.Group>
            <WexInputOTP.Slot index={1} />
          </WexInputOTP.Group>
        </WexInputOTP>
      );
      expect(screen.getByRole("separator")).toBeInTheDocument();
    });
  });

  // ============================================
  // STYLING TESTS
  // ============================================
  describe("Styling", () => {
    it("applies custom className to container", () => {
      render(
        <WexInputOTP maxLength={4} containerClassName="custom-container">
          <WexInputOTP.Group>
            <WexInputOTP.Slot index={0} />
          </WexInputOTP.Group>
        </WexInputOTP>
      );
      // The container has the custom class
      const container = document.querySelector(".custom-container");
      expect(container).toBeInTheDocument();
    });

    it("applies custom className to slot", () => {
      render(
        <WexInputOTP maxLength={4}>
          <WexInputOTP.Group>
            <WexInputOTP.Slot index={0} className="custom-slot" data-testid="slot" />
          </WexInputOTP.Group>
        </WexInputOTP>
      );
      expect(screen.getByTestId("slot")).toHaveClass("custom-slot");
    });
  });
});

