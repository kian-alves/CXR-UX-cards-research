/**
 * WexFloatLabel Component Tests
 *
 * Comprehensive tests covering:
 * - Rendering and prop forwarding
 * - Size variants
 * - Icon support (left/right)
 * - Accessibility (ARIA attributes, labels)
 * - Invalid state
 * - User interactions
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { axe } from "vitest-axe";
import { createRef } from "react";

import { WexFloatLabel } from "@/components/wex";

describe("WexFloatLabel", () => {
  // ============================================
  // RENDERING TESTS
  // ============================================
  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(<WexFloatLabel label="Username" />);
      expect(screen.getByLabelText("Username")).toBeInTheDocument();
    });

    it("associates label text with the input element", () => {
      render(<WexFloatLabel label="Email Address" type="email" />);
      const input = screen.getByLabelText("Email Address");
      expect(input).toBeInstanceOf(HTMLInputElement);
      expect(input).toHaveAttribute("type", "email");
    });

    it("forwards ref correctly", () => {
      const ref = createRef<HTMLInputElement>();
      render(<WexFloatLabel label="Test" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it("applies className to input element", () => {
      render(<WexFloatLabel label="Test" className="custom-class" />);
      const input = screen.getByLabelText("Test");
      expect(input).toHaveClass("custom-class");
    });

    it("applies containerClassName to container element", () => {
      const { container } = render(
        <WexFloatLabel label="Test" containerClassName="container-class" />
      );
      expect(container.firstChild).toHaveClass("container-class");
    });
  });

  // ============================================
  // SIZE TESTS
  // ============================================
  describe("Sizes", () => {
    it("renders with sm size", () => {
      render(<WexFloatLabel label="Small" size="sm" />);
      const input = screen.getByLabelText("Small");
      expect(input).toHaveClass("h-10");
    });

    it("renders with md (default) size", () => {
      render(<WexFloatLabel label="Medium" size="md" />);
      const input = screen.getByLabelText("Medium");
      expect(input).toHaveClass("h-14");
    });

    it("renders with lg size", () => {
      render(<WexFloatLabel label="Large" size="lg" />);
      const input = screen.getByLabelText("Large");
      expect(input).toHaveClass("h-16");
    });
  });

  // ============================================
  // ICON TESTS
  // ============================================
  describe("Icons", () => {
    it("renders left icon", () => {
      render(
        <WexFloatLabel 
          label="Email" 
          leftIcon={<span data-testid="left-icon">📧</span>} 
        />
      );
      expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    });

    it("renders right icon", () => {
      render(
        <WexFloatLabel 
          label="Search" 
          rightIcon={<span data-testid="right-icon">🔍</span>} 
        />
      );
      expect(screen.getByTestId("right-icon")).toBeInTheDocument();
    });

    it("renders both icons", () => {
      render(
        <WexFloatLabel 
          label="Username" 
          leftIcon={<span data-testid="left-icon">👤</span>}
          rightIcon={<span data-testid="right-icon">✓</span>}
        />
      );
      expect(screen.getByTestId("left-icon")).toBeInTheDocument();
      expect(screen.getByTestId("right-icon")).toBeInTheDocument();
    });

    it("adds left padding when left icon is present", () => {
      render(
        <WexFloatLabel 
          label="Email" 
          leftIcon={<span>📧</span>} 
        />
      );
      const input = screen.getByLabelText("Email");
      expect(input).toHaveClass("pl-10");
    });

    it("adds right padding when right icon is present", () => {
      render(
        <WexFloatLabel 
          label="Search" 
          rightIcon={<span>🔍</span>} 
        />
      );
      const input = screen.getByLabelText("Search");
      expect(input).toHaveClass("pr-10");
    });
  });

  // ============================================
  // INTERACTION TESTS
  // ============================================
  describe("Interactions", () => {
    it("accepts text input", async () => {
      const user = userEvent.setup();
      render(<WexFloatLabel label="Username" />);

      const input = screen.getByLabelText("Username");
      await user.type(input, "john_doe");
      expect(input).toHaveValue("john_doe");
    });

    it("calls onChange when typing", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<WexFloatLabel label="Test" onChange={handleChange} />);

      await user.type(screen.getByLabelText("Test"), "test");
      expect(handleChange).toHaveBeenCalledTimes(4); // Once per character
    });

    it("calls onFocus when focused", async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      render(<WexFloatLabel label="Test" onFocus={handleFocus} />);

      await user.click(screen.getByLabelText("Test"));
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur when focus is lost", async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();
      render(
        <>
          <WexFloatLabel label="Test" onBlur={handleBlur} />
          <button>Other</button>
        </>
      );

      const input = screen.getByLabelText("Test");
      await user.click(input);
      await user.click(screen.getByRole("button"));
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("can be focused with keyboard", async () => {
      const user = userEvent.setup();
      render(<WexFloatLabel label="Test" />);

      await user.tab();
      expect(screen.getByLabelText("Test")).toHaveFocus();
    });
  });

  // ============================================
  // STATE TESTS
  // ============================================
  describe("States", () => {
    it("exposes invalid state to assistive tech", () => {
      render(<WexFloatLabel label="Username" invalid />);
      const input = screen.getByLabelText("Username");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("supports disabled state", () => {
      render(<WexFloatLabel label="Disabled" disabled />);
      const input = screen.getByLabelText("Disabled");
      expect(input).toBeDisabled();
    });

    it("supports required attribute", () => {
      render(<WexFloatLabel label="Required" required />);
      const input = screen.getByLabelText("Required");
      expect(input).toBeRequired();
    });

    it("supports native required + disabled attributes", () => {
      render(<WexFloatLabel label="Account #" required disabled />);
      const input = screen.getByLabelText("Account #");
      expect(input).toBeDisabled();
      expect(input).toBeRequired();
    });

    it("supports defaultValue", () => {
      render(<WexFloatLabel label="Prefilled" defaultValue="Hello" />);
      const input = screen.getByLabelText("Prefilled");
      expect(input).toHaveValue("Hello");
    });

    it("supports controlled value", () => {
      render(<WexFloatLabel label="Controlled" value="controlled value" onChange={() => {}} />);
      const input = screen.getByLabelText("Controlled");
      expect(input).toHaveValue("controlled value");
    });
  });

  // ============================================
  // INPUT TYPE TESTS
  // ============================================
  describe("Input Types", () => {
    it("renders with email type", () => {
      render(<WexFloatLabel label="Email" type="email" />);
      expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    });

    it("renders with password type", () => {
      render(<WexFloatLabel label="Password" type="password" />);
      const input = document.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });

    it("renders with number type", () => {
      render(<WexFloatLabel label="Amount" type="number" />);
      expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    });

    it("renders with tel type", () => {
      render(<WexFloatLabel label="Phone" type="tel" />);
      expect(screen.getByLabelText("Phone")).toHaveAttribute("type", "tel");
    });
  });

  // ============================================
  // ACCESSIBILITY TESTS
  // ============================================
  describe("Accessibility", () => {
    it("has no obvious axe-core accessibility violations", async () => {
      const { container } = render(
        <form>
          <WexFloatLabel label="First Name" required />
        </form>
      );

      const results = await axe(container, {
        rules: {
          // Allow dynamic theme colors to avoid false positives in unit tests.
          "color-contrast": { enabled: false },
        },
      });

      expect(results).toHaveNoViolations();
    });

    it("has no violations with icons", async () => {
      const { container } = render(
        <form>
          <WexFloatLabel 
            label="Email" 
            type="email"
            leftIcon={<span aria-hidden="true">📧</span>}
            rightIcon={<span aria-hidden="true">✓</span>}
          />
        </form>
      );

      const results = await axe(container, {
        rules: {
          "color-contrast": { enabled: false },
        },
      });

      expect(results).toHaveNoViolations();
    });

    it("has no violations when invalid", async () => {
      const { container } = render(
        <form>
          <WexFloatLabel label="Username" invalid />
        </form>
      );

      const results = await axe(container, {
        rules: {
          "color-contrast": { enabled: false },
        },
      });

      expect(results).toHaveNoViolations();
    });
  });
});

