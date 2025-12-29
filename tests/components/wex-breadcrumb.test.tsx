/**
 * WexBreadcrumb Component Tests
 *
 * Comprehensive tests covering:
 * - Basic rendering
 * - Links and navigation
 * - Current page indicator
 * - Separators
 * - Ellipsis for long breadcrumbs
 * - Accessibility
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexBreadcrumb } from "@/components/wex";

describe("WexBreadcrumb", () => {
  // ============================================
  // BASIC RENDERING TESTS
  // ============================================
  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(
        <WexBreadcrumb>
          <WexBreadcrumb.List>
            <WexBreadcrumb.Item>
              <WexBreadcrumb.Link href="/">Home</WexBreadcrumb.Link>
            </WexBreadcrumb.Item>
            <WexBreadcrumb.Separator />
            <WexBreadcrumb.Item>
              <WexBreadcrumb.Page>Current</WexBreadcrumb.Page>
            </WexBreadcrumb.Item>
          </WexBreadcrumb.List>
        </WexBreadcrumb>
      );
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("renders breadcrumb items", () => {
      render(
        <WexBreadcrumb>
          <WexBreadcrumb.List>
            <WexBreadcrumb.Item>
              <WexBreadcrumb.Link href="/">Home</WexBreadcrumb.Link>
            </WexBreadcrumb.Item>
            <WexBreadcrumb.Separator />
            <WexBreadcrumb.Item>
              <WexBreadcrumb.Link href="/products">Products</WexBreadcrumb.Link>
            </WexBreadcrumb.Item>
          </WexBreadcrumb.List>
        </WexBreadcrumb>
      );
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Products")).toBeInTheDocument();
    });

    it("renders multi-level breadcrumb", () => {
      render(
        <WexBreadcrumb>
          <WexBreadcrumb.List>
            <WexBreadcrumb.Item>
              <WexBreadcrumb.Link href="/">Home</WexBreadcrumb.Link>
            </WexBreadcrumb.Item>
            <WexBreadcrumb.Separator />
            <WexBreadcrumb.Item>
              <WexBreadcrumb.Link href="/products">Products</WexBreadcrumb.Link>
            </WexBreadcrumb.Item>
            <WexBreadcrumb.Separator />
            <WexBreadcrumb.Item>
              <WexBreadcrumb.Link href="/products/electronics">Electronics</WexBreadcrumb.Link>
            </WexBreadcrumb.Item>
            <WexBreadcrumb.Separator />
            <WexBreadcrumb.Item>
              <WexBreadcrumb.Page>Laptop</WexBreadcrumb.Page>
            </WexBreadcrumb.Item>
          </WexBreadcrumb.List>
        </WexBreadcrumb>
      );
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Products")).toBeInTheDocument();
      expect(screen.getByText("Electronics")).toBeInTheDocument();
      expect(screen.getByText("Laptop")).toBeInTheDocument();
    });
  });

  // ============================================
  // LINK TESTS
  // ============================================
  describe("Links", () => {
    it("renders links with correct href", () => {
      render(
        <WexBreadcrumb>
          <WexBreadcrumb.List>
            <WexBreadcrumb.Item>
              <WexBreadcrumb.Link href="/">Home</WexBreadcrumb.Link>
            </WexBreadcrumb.Item>
            <WexBreadcrumb.Separator />
            <WexBreadcrumb.Item>
              <WexBreadcrumb.Link href="/products">Products</WexBreadcrumb.Link>
            </WexBreadcrumb.Item>
          </WexBreadcrumb.List>
        </WexBreadcrumb>
      );
      expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
      expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute("href", "/products");
    });

    it("renders link with asChild for custom elements", () => {
      render(
        <WexBreadcrumb>
          <WexBreadcrumb.List>
            <WexBreadcrumb.Item>
              <WexBreadcrumb.Link asChild>
                <a href="/" data-testid="custom-link">Home</a>
              </WexBreadcrumb.Link>
            </WexBreadcrumb.Item>
          </WexBreadcrumb.List>
        </WexBreadcrumb>
      );
      expect(screen.getByTestId("custom-link")).toBeInTheDocument();
    });
  });

  // ============================================
  // CURRENT PAGE TESTS
  // ============================================
  describe("Current Page", () => {
    it("renders current page as non-link", () => {
      render(
        <WexBreadcrumb>
          <WexBreadcrumb.List>
            <WexBreadcrumb.Item>
              <WexBreadcrumb.Link href="/">Home</WexBreadcrumb.Link>
            </WexBreadcrumb.Item>
            <WexBreadcrumb.Separator />
            <WexBreadcrumb.Item>
              <WexBreadcrumb.Page>Current Page</WexBreadcrumb.Page>
            </WexBreadcrumb.Item>
          </WexBreadcrumb.List>
        </WexBreadcrumb>
      );
      const currentPage = screen.getByText("Current Page");
      expect(currentPage.tagName).toBe("SPAN");
      expect(currentPage).toHaveAttribute("role", "link");
      expect(currentPage).toHaveAttribute("aria-disabled", "true");
      expect(currentPage).toHaveAttribute("aria-current", "page");
    });
  });

  // ============================================
  // SEPARATOR TESTS
  // ============================================
  describe("Separators", () => {
    it("renders default separator", () => {
      render(
        <WexBreadcrumb>
          <WexBreadcrumb.List>
            <WexBreadcrumb.Item>
              <WexBreadcrumb.Link href="/">Home</WexBreadcrumb.Link>
            </WexBreadcrumb.Item>
            <WexBreadcrumb.Separator data-testid="separator" />
            <WexBreadcrumb.Item>
              <WexBreadcrumb.Page>Current</WexBreadcrumb.Page>
            </WexBreadcrumb.Item>
          </WexBreadcrumb.List>
        </WexBreadcrumb>
      );
      expect(screen.getByTestId("separator")).toBeInTheDocument();
      expect(screen.getByTestId("separator")).toHaveAttribute("role", "presentation");
    });

    it("renders custom separator", () => {
      render(
        <WexBreadcrumb>
          <WexBreadcrumb.List>
            <WexBreadcrumb.Item>
              <WexBreadcrumb.Link href="/">Home</WexBreadcrumb.Link>
            </WexBreadcrumb.Item>
            <WexBreadcrumb.Separator>/</WexBreadcrumb.Separator>
            <WexBreadcrumb.Item>
              <WexBreadcrumb.Page>Current</WexBreadcrumb.Page>
            </WexBreadcrumb.Item>
          </WexBreadcrumb.List>
        </WexBreadcrumb>
      );
      // Custom text separator
      expect(screen.getByText("/")).toBeInTheDocument();
    });
  });

  // ============================================
  // ELLIPSIS TESTS
  // ============================================
  describe("Ellipsis", () => {
    it("renders ellipsis for collapsed items", () => {
      render(
        <WexBreadcrumb>
          <WexBreadcrumb.List>
            <WexBreadcrumb.Item>
              <WexBreadcrumb.Link href="/">Home</WexBreadcrumb.Link>
            </WexBreadcrumb.Item>
            <WexBreadcrumb.Separator />
            <WexBreadcrumb.Item>
              <WexBreadcrumb.Ellipsis data-testid="ellipsis" />
            </WexBreadcrumb.Item>
            <WexBreadcrumb.Separator />
            <WexBreadcrumb.Item>
              <WexBreadcrumb.Page>Current</WexBreadcrumb.Page>
            </WexBreadcrumb.Item>
          </WexBreadcrumb.List>
        </WexBreadcrumb>
      );
      expect(screen.getByTestId("ellipsis")).toBeInTheDocument();
    });
  });

  // ============================================
  // ACCESSIBILITY TESTS
  // ============================================
  describe("Accessibility", () => {
    it("has navigation role with aria-label", () => {
      render(
        <WexBreadcrumb>
          <WexBreadcrumb.List>
            <WexBreadcrumb.Item>
              <WexBreadcrumb.Link href="/">Home</WexBreadcrumb.Link>
            </WexBreadcrumb.Item>
          </WexBreadcrumb.List>
        </WexBreadcrumb>
      );
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("aria-label", "breadcrumb");
    });

    it("uses ordered list for breadcrumb structure", () => {
      render(
        <WexBreadcrumb>
          <WexBreadcrumb.List>
            <WexBreadcrumb.Item>
              <WexBreadcrumb.Link href="/">Home</WexBreadcrumb.Link>
            </WexBreadcrumb.Item>
          </WexBreadcrumb.List>
        </WexBreadcrumb>
      );
      expect(screen.getByRole("list")).toBeInTheDocument();
    });

    it("uses list items for each breadcrumb", () => {
      render(
        <WexBreadcrumb>
          <WexBreadcrumb.List>
            <WexBreadcrumb.Item>
              <WexBreadcrumb.Link href="/">Home</WexBreadcrumb.Link>
            </WexBreadcrumb.Item>
            <WexBreadcrumb.Separator />
            <WexBreadcrumb.Item>
              <WexBreadcrumb.Page>Current</WexBreadcrumb.Page>
            </WexBreadcrumb.Item>
          </WexBreadcrumb.List>
        </WexBreadcrumb>
      );
      const listItems = screen.getAllByRole("listitem");
      expect(listItems.length).toBeGreaterThanOrEqual(2);
    });
  });

  // ============================================
  // STYLING TESTS
  // ============================================
  describe("Styling", () => {
    it("applies custom className", () => {
      render(
        <WexBreadcrumb className="custom-breadcrumb" data-testid="breadcrumb">
          <WexBreadcrumb.List>
            <WexBreadcrumb.Item>
              <WexBreadcrumb.Link href="/">Home</WexBreadcrumb.Link>
            </WexBreadcrumb.Item>
          </WexBreadcrumb.List>
        </WexBreadcrumb>
      );
      expect(screen.getByTestId("breadcrumb")).toHaveClass("custom-breadcrumb");
    });
  });
});

