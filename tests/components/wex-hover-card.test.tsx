/**
 * WexHoverCard Component Tests
 *
 * Comprehensive tests covering:
 * - Basic rendering
 * - Open/closed states
 * - Content variations
 * - Trigger as child
 * - Accessibility
 */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { WexHoverCard } from "@/components/wex";

describe("WexHoverCard", () => {
  // ============================================
  // BASIC RENDERING TESTS
  // ============================================
  describe("Rendering", () => {
    it("renders trigger without crashing", () => {
      render(
        <WexHoverCard>
          <WexHoverCard.Trigger>Hover over me</WexHoverCard.Trigger>
          <WexHoverCard.Content>Card content</WexHoverCard.Content>
        </WexHoverCard>
      );
      expect(screen.getByText("Hover over me")).toBeInTheDocument();
    });

    it("hides content by default", () => {
      render(
        <WexHoverCard>
          <WexHoverCard.Trigger>Trigger</WexHoverCard.Trigger>
          <WexHoverCard.Content>Hidden content</WexHoverCard.Content>
        </WexHoverCard>
      );
      expect(screen.queryByText("Hidden content")).not.toBeInTheDocument();
    });

    it("shows content when open prop is true", () => {
      render(
        <WexHoverCard open>
          <WexHoverCard.Trigger>Trigger</WexHoverCard.Trigger>
          <WexHoverCard.Content>Visible content</WexHoverCard.Content>
        </WexHoverCard>
      );
      expect(screen.getByText("Visible content")).toBeInTheDocument();
    });

    it("renders complex content", () => {
      render(
        <WexHoverCard open>
          <WexHoverCard.Trigger>Trigger</WexHoverCard.Trigger>
          <WexHoverCard.Content>
            <div>
              <h3 data-testid="title">User Profile</h3>
              <p data-testid="description">View more details about this user.</p>
            </div>
          </WexHoverCard.Content>
        </WexHoverCard>
      );
      expect(screen.getByTestId("title")).toHaveTextContent("User Profile");
      expect(screen.getByTestId("description")).toBeInTheDocument();
    });
  });

  // ============================================
  // INTERACTION TESTS
  // ============================================
  describe("Interactions", () => {
    it("opens on hover", async () => {
      const user = userEvent.setup();
      render(
        <WexHoverCard>
          <WexHoverCard.Trigger data-testid="trigger">Hover me</WexHoverCard.Trigger>
          <WexHoverCard.Content>Content appears</WexHoverCard.Content>
        </WexHoverCard>
      );

      expect(screen.queryByText("Content appears")).not.toBeInTheDocument();

      await user.hover(screen.getByTestId("trigger"));

      await waitFor(() => {
        expect(screen.getByText("Content appears")).toBeInTheDocument();
      });
    });

    it("closes on unhover", async () => {
      const user = userEvent.setup();
      render(
        <WexHoverCard>
          <WexHoverCard.Trigger data-testid="trigger">Hover me</WexHoverCard.Trigger>
          <WexHoverCard.Content>Hover content</WexHoverCard.Content>
        </WexHoverCard>
      );

      await user.hover(screen.getByTestId("trigger"));

      await waitFor(() => {
        expect(screen.getByText("Hover content")).toBeInTheDocument();
      });

      await user.unhover(screen.getByTestId("trigger"));

      await waitFor(() => {
        expect(screen.queryByText("Hover content")).not.toBeInTheDocument();
      });
    });
  });

  // ============================================
  // TRIGGER VARIATIONS
  // ============================================
  describe("Trigger Variations", () => {
    it("renders trigger as link with asChild", () => {
      render(
        <WexHoverCard>
          <WexHoverCard.Trigger asChild>
            <a href="/profile" data-testid="link-trigger">@username</a>
          </WexHoverCard.Trigger>
          <WexHoverCard.Content>Profile info</WexHoverCard.Content>
        </WexHoverCard>
      );
      const link = screen.getByTestId("link-trigger");
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "/profile");
    });

    it("renders trigger as button with asChild", () => {
      render(
        <WexHoverCard>
          <WexHoverCard.Trigger asChild>
            <button type="button" data-testid="btn-trigger">Show info</button>
          </WexHoverCard.Trigger>
          <WexHoverCard.Content>Button info</WexHoverCard.Content>
        </WexHoverCard>
      );
      const btn = screen.getByTestId("btn-trigger");
      expect(btn.tagName).toBe("BUTTON");
    });
  });

  // ============================================
  // CONTROLLED STATE TESTS
  // ============================================
  describe("Controlled State", () => {
    it("respects open prop", () => {
      const { rerender } = render(
        <WexHoverCard open={false}>
          <WexHoverCard.Trigger>Trigger</WexHoverCard.Trigger>
          <WexHoverCard.Content>Controlled content</WexHoverCard.Content>
        </WexHoverCard>
      );
      expect(screen.queryByText("Controlled content")).not.toBeInTheDocument();

      rerender(
        <WexHoverCard open={true}>
          <WexHoverCard.Trigger>Trigger</WexHoverCard.Trigger>
          <WexHoverCard.Content>Controlled content</WexHoverCard.Content>
        </WexHoverCard>
      );
      expect(screen.getByText("Controlled content")).toBeInTheDocument();
    });

    it("respects defaultOpen prop", () => {
      render(
        <WexHoverCard defaultOpen>
          <WexHoverCard.Trigger>Trigger</WexHoverCard.Trigger>
          <WexHoverCard.Content>Default open content</WexHoverCard.Content>
        </WexHoverCard>
      );
      expect(screen.getByText("Default open content")).toBeInTheDocument();
    });
  });

  // ============================================
  // STYLING TESTS
  // ============================================
  describe("Styling", () => {
    it("applies custom className to content", () => {
      render(
        <WexHoverCard open>
          <WexHoverCard.Trigger>Trigger</WexHoverCard.Trigger>
          <WexHoverCard.Content className="custom-content" data-testid="content">
            Styled content
          </WexHoverCard.Content>
        </WexHoverCard>
      );
      expect(screen.getByTestId("content")).toHaveClass("custom-content");
    });
  });
});

