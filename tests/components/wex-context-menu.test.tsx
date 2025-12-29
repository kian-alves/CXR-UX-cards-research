/**
 * WexContextMenu Component Tests
 *
 * Comprehensive tests covering:
 * - Rendering trigger and content
 * - Opening via right-click
 * - Menu items (standard, checkbox, radio)
 * - Sub-menus
 * - Labels, separators, shortcuts
 */

import { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { WexContextMenu } from "@/components/wex";

describe("WexContextMenu", () => {
  // ============================================
  // RENDERING TESTS
  // ============================================
  describe("Rendering", () => {
    it("renders trigger without crashing", () => {
      render(
        <WexContextMenu>
          <WexContextMenu.Trigger>
            <div>Right click me</div>
          </WexContextMenu.Trigger>
          <WexContextMenu.Content>
            <WexContextMenu.Item>Cut</WexContextMenu.Item>
            <WexContextMenu.Item>Copy</WexContextMenu.Item>
          </WexContextMenu.Content>
        </WexContextMenu>
      );
      expect(screen.getByText("Right click me")).toBeInTheDocument();
    });

    it("content is hidden by default", () => {
      render(
        <WexContextMenu>
          <WexContextMenu.Trigger>
            <div>Right click me</div>
          </WexContextMenu.Trigger>
          <WexContextMenu.Content>
            <WexContextMenu.Item>Cut</WexContextMenu.Item>
          </WexContextMenu.Content>
        </WexContextMenu>
      );
      expect(screen.queryByText("Cut")).not.toBeInTheDocument();
    });
  });

  // ============================================
  // INTERACTION TESTS
  // ============================================
  describe("Interaction", () => {
    it("opens menu on right-click", async () => {
      const user = userEvent.setup();
      render(
        <WexContextMenu>
          <WexContextMenu.Trigger>
            <div data-testid="trigger">Right click me</div>
          </WexContextMenu.Trigger>
          <WexContextMenu.Content>
            <WexContextMenu.Item>Cut</WexContextMenu.Item>
            <WexContextMenu.Item>Copy</WexContextMenu.Item>
          </WexContextMenu.Content>
        </WexContextMenu>
      );

      await user.pointer({ keys: "[MouseRight>]", target: screen.getByTestId("trigger") });

      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
        expect(screen.getByText("Cut")).toBeInTheDocument();
        expect(screen.getByText("Copy")).toBeInTheDocument();
      });
    });

    it("calls onSelect when item is clicked", async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();

      render(
        <WexContextMenu>
          <WexContextMenu.Trigger>
            <div data-testid="trigger">Right click me</div>
          </WexContextMenu.Trigger>
          <WexContextMenu.Content>
            <WexContextMenu.Item onSelect={handleSelect}>Cut</WexContextMenu.Item>
          </WexContextMenu.Content>
        </WexContextMenu>
      );

      await user.pointer({ keys: "[MouseRight>]", target: screen.getByTestId("trigger") });

      await waitFor(() => {
        expect(screen.getByText("Cut")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Cut"));
      expect(handleSelect).toHaveBeenCalled();
    });
  });

  // ============================================
  // MENU ITEM VARIANTS
  // ============================================
  describe("Item Variants", () => {
    it("renders disabled item", async () => {
      const user = userEvent.setup();
      render(
        <WexContextMenu>
          <WexContextMenu.Trigger>
            <div data-testid="trigger">Right click me</div>
          </WexContextMenu.Trigger>
          <WexContextMenu.Content>
            <WexContextMenu.Item disabled>Disabled Item</WexContextMenu.Item>
          </WexContextMenu.Content>
        </WexContextMenu>
      );

      await user.pointer({ keys: "[MouseRight>]", target: screen.getByTestId("trigger") });

      await waitFor(() => {
        expect(screen.getByText("Disabled Item")).toBeInTheDocument();
      });
      
      expect(screen.getByRole("menuitem")).toHaveAttribute("data-disabled");
    });

    it("renders checkbox item", async () => {
      const user = userEvent.setup();
      function CheckboxContextMenu() {
        const [checked, setChecked] = useState(false);
        return (
          <WexContextMenu>
            <WexContextMenu.Trigger>
              <div data-testid="trigger">Right click me</div>
            </WexContextMenu.Trigger>
            <WexContextMenu.Content>
              <WexContextMenu.CheckboxItem
                checked={checked}
                onCheckedChange={setChecked}
              >
                Show Grid
              </WexContextMenu.CheckboxItem>
            </WexContextMenu.Content>
          </WexContextMenu>
        );
      }

      render(<CheckboxContextMenu />);

      await user.pointer({ keys: "[MouseRight>]", target: screen.getByTestId("trigger") });

      await waitFor(() => {
        expect(screen.getByText("Show Grid")).toBeInTheDocument();
      });

      expect(screen.getByRole("menuitemcheckbox")).toBeInTheDocument();
    });

    it("renders radio group items", async () => {
      const user = userEvent.setup();
      function RadioContextMenu() {
        const [value, setValue] = useState("small");
        return (
          <WexContextMenu>
            <WexContextMenu.Trigger>
              <div data-testid="trigger">Right click me</div>
            </WexContextMenu.Trigger>
            <WexContextMenu.Content>
              <WexContextMenu.RadioGroup value={value} onValueChange={setValue}>
                <WexContextMenu.RadioItem value="small">Small</WexContextMenu.RadioItem>
                <WexContextMenu.RadioItem value="medium">Medium</WexContextMenu.RadioItem>
                <WexContextMenu.RadioItem value="large">Large</WexContextMenu.RadioItem>
              </WexContextMenu.RadioGroup>
            </WexContextMenu.Content>
          </WexContextMenu>
        );
      }

      render(<RadioContextMenu />);

      await user.pointer({ keys: "[MouseRight>]", target: screen.getByTestId("trigger") });

      await waitFor(() => {
        expect(screen.getByText("Small")).toBeInTheDocument();
      });

      const radioItems = screen.getAllByRole("menuitemradio");
      expect(radioItems).toHaveLength(3);
    });
  });

  // ============================================
  // LABELS AND SEPARATORS
  // ============================================
  describe("Labels and Separators", () => {
    it("renders label", async () => {
      const user = userEvent.setup();
      render(
        <WexContextMenu>
          <WexContextMenu.Trigger>
            <div data-testid="trigger">Right click me</div>
          </WexContextMenu.Trigger>
          <WexContextMenu.Content>
            <WexContextMenu.Label>Edit Actions</WexContextMenu.Label>
            <WexContextMenu.Item>Cut</WexContextMenu.Item>
          </WexContextMenu.Content>
        </WexContextMenu>
      );

      await user.pointer({ keys: "[MouseRight>]", target: screen.getByTestId("trigger") });

      await waitFor(() => {
        expect(screen.getByText("Edit Actions")).toBeInTheDocument();
      });
    });

    it("renders separator", async () => {
      const user = userEvent.setup();
      render(
        <WexContextMenu>
          <WexContextMenu.Trigger>
            <div data-testid="trigger">Right click me</div>
          </WexContextMenu.Trigger>
          <WexContextMenu.Content>
            <WexContextMenu.Item>Cut</WexContextMenu.Item>
            <WexContextMenu.Separator data-testid="separator" />
            <WexContextMenu.Item>Delete</WexContextMenu.Item>
          </WexContextMenu.Content>
        </WexContextMenu>
      );

      await user.pointer({ keys: "[MouseRight>]", target: screen.getByTestId("trigger") });

      await waitFor(() => {
        expect(screen.getByTestId("separator")).toBeInTheDocument();
      });
    });

    it("renders shortcut", async () => {
      const user = userEvent.setup();
      render(
        <WexContextMenu>
          <WexContextMenu.Trigger>
            <div data-testid="trigger">Right click me</div>
          </WexContextMenu.Trigger>
          <WexContextMenu.Content>
            <WexContextMenu.Item>
              Cut
              <WexContextMenu.Shortcut>⌘X</WexContextMenu.Shortcut>
            </WexContextMenu.Item>
          </WexContextMenu.Content>
        </WexContextMenu>
      );

      await user.pointer({ keys: "[MouseRight>]", target: screen.getByTestId("trigger") });

      await waitFor(() => {
        expect(screen.getByText("⌘X")).toBeInTheDocument();
      });
    });
  });

  // ============================================
  // SUB-MENU TESTS
  // ============================================
  describe("Sub-menus", () => {
    it("renders sub-menu trigger", async () => {
      const user = userEvent.setup();
      render(
        <WexContextMenu>
          <WexContextMenu.Trigger>
            <div data-testid="trigger">Right click me</div>
          </WexContextMenu.Trigger>
          <WexContextMenu.Content>
            <WexContextMenu.Sub>
              <WexContextMenu.SubTrigger>More Options</WexContextMenu.SubTrigger>
              <WexContextMenu.SubContent>
                <WexContextMenu.Item>Sub Item 1</WexContextMenu.Item>
                <WexContextMenu.Item>Sub Item 2</WexContextMenu.Item>
              </WexContextMenu.SubContent>
            </WexContextMenu.Sub>
          </WexContextMenu.Content>
        </WexContextMenu>
      );

      await user.pointer({ keys: "[MouseRight>]", target: screen.getByTestId("trigger") });

      await waitFor(() => {
        expect(screen.getByText("More Options")).toBeInTheDocument();
      });
    });
  });

  // ============================================
  // GROUP TESTS
  // ============================================
  describe("Groups", () => {
    it("renders group of items", async () => {
      const user = userEvent.setup();
      render(
        <WexContextMenu>
          <WexContextMenu.Trigger>
            <div data-testid="trigger">Right click me</div>
          </WexContextMenu.Trigger>
          <WexContextMenu.Content>
            <WexContextMenu.Group data-testid="group">
              <WexContextMenu.Item>Item 1</WexContextMenu.Item>
              <WexContextMenu.Item>Item 2</WexContextMenu.Item>
            </WexContextMenu.Group>
          </WexContextMenu.Content>
        </WexContextMenu>
      );

      await user.pointer({ keys: "[MouseRight>]", target: screen.getByTestId("trigger") });

      await waitFor(() => {
        expect(screen.getByTestId("group")).toBeInTheDocument();
      });
    });
  });
});

