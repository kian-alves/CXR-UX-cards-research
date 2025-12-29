/**
 * WexPagination Component Tests
 *
 * Comprehensive tests covering:
 * - Basic rendering
 * - Navigation links (previous, next, first, last)
 * - Page links with active state
 * - Ellipsis
 * - Rows per page
 * - Page report
 * - Jump to page
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexPagination } from "@/components/wex";

describe("WexPagination", () => {
  // ============================================
  // BASIC RENDERING TESTS
  // ============================================
  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(
        <WexPagination>
          <WexPagination.Content>
            <WexPagination.Item>
              <WexPagination.Previous href="#" />
            </WexPagination.Item>
            <WexPagination.Item>
              <WexPagination.Link href="#">1</WexPagination.Link>
            </WexPagination.Item>
            <WexPagination.Item>
              <WexPagination.Next href="#" />
            </WexPagination.Item>
          </WexPagination.Content>
        </WexPagination>
      );
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("renders page links", () => {
      render(
        <WexPagination>
          <WexPagination.Content>
            <WexPagination.Item>
              <WexPagination.Link href="#">1</WexPagination.Link>
            </WexPagination.Item>
            <WexPagination.Item>
              <WexPagination.Link href="#">2</WexPagination.Link>
            </WexPagination.Item>
            <WexPagination.Item>
              <WexPagination.Link href="#">3</WexPagination.Link>
            </WexPagination.Item>
          </WexPagination.Content>
        </WexPagination>
      );
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
    });
  });

  // ============================================
  // NAVIGATION LINKS TESTS
  // ============================================
  describe("Navigation Links", () => {
    it("renders previous and next links", () => {
      render(
        <WexPagination>
          <WexPagination.Content>
            <WexPagination.Item>
              <WexPagination.Previous href="/page/1" />
            </WexPagination.Item>
            <WexPagination.Item>
              <WexPagination.Link href="#">2</WexPagination.Link>
            </WexPagination.Item>
            <WexPagination.Item>
              <WexPagination.Next href="/page/3" />
            </WexPagination.Item>
          </WexPagination.Content>
        </WexPagination>
      );
      const prevLink = screen.getByRole("link", { name: /previous/i });
      const nextLink = screen.getByRole("link", { name: /next/i });
      expect(prevLink).toHaveAttribute("href", "/page/1");
      expect(nextLink).toHaveAttribute("href", "/page/3");
    });

    it("renders first and last links", () => {
      render(
        <WexPagination>
          <WexPagination.Content>
            <WexPagination.Item>
              <WexPagination.First href="/page/1" />
            </WexPagination.Item>
            <WexPagination.Item>
              <WexPagination.Link href="#">5</WexPagination.Link>
            </WexPagination.Item>
            <WexPagination.Item>
              <WexPagination.Last href="/page/10" />
            </WexPagination.Item>
          </WexPagination.Content>
        </WexPagination>
      );
      const firstLink = screen.getByRole("link", { name: /first/i });
      const lastLink = screen.getByRole("link", { name: /last/i });
      expect(firstLink).toHaveAttribute("href", "/page/1");
      expect(lastLink).toHaveAttribute("href", "/page/10");
    });
  });

  // ============================================
  // ACTIVE STATE TESTS
  // ============================================
  describe("Active State", () => {
    it("renders active page link", () => {
      render(
        <WexPagination>
          <WexPagination.Content>
            <WexPagination.Item>
              <WexPagination.Link href="#">1</WexPagination.Link>
            </WexPagination.Item>
            <WexPagination.Item>
              <WexPagination.Link href="#" isActive>2</WexPagination.Link>
            </WexPagination.Item>
            <WexPagination.Item>
              <WexPagination.Link href="#">3</WexPagination.Link>
            </WexPagination.Item>
          </WexPagination.Content>
        </WexPagination>
      );
      const activeLink = screen.getByText("2");
      expect(activeLink).toHaveAttribute("aria-current", "page");
    });
  });

  // ============================================
  // ELLIPSIS TESTS
  // ============================================
  describe("Ellipsis", () => {
    it("renders ellipsis for collapsed pages", () => {
      render(
        <WexPagination>
          <WexPagination.Content>
            <WexPagination.Item>
              <WexPagination.Link href="#">1</WexPagination.Link>
            </WexPagination.Item>
            <WexPagination.Item>
              <WexPagination.Ellipsis data-testid="ellipsis" />
            </WexPagination.Item>
            <WexPagination.Item>
              <WexPagination.Link href="#">10</WexPagination.Link>
            </WexPagination.Item>
          </WexPagination.Content>
        </WexPagination>
      );
      expect(screen.getByTestId("ellipsis")).toBeInTheDocument();
    });
  });

  // ============================================
  // ROWS PER PAGE TESTS
  // ============================================
  describe("Rows Per Page", () => {
    it("renders rows per page selector", () => {
      render(
        <WexPagination.RowsPerPage
          options={[10, 25, 50, 100]}
          value={10}
          onChange={() => {}}
        />
      );
      expect(screen.getByRole("combobox")).toBeInTheDocument();
      expect(screen.getByText("Rows per page")).toBeInTheDocument();
    });
  });

  // ============================================
  // PAGE REPORT TESTS
  // ============================================
  describe("Page Report", () => {
    it("renders page report with correct info", () => {
      render(
        <WexPagination.PageReport
          currentPage={2}
          totalPages={10}
          totalItems={100}
          pageSize={10}
        />
      );
      // Template: "{first} - {last} of {total}" => "11 - 20 of 100"
      expect(screen.getByText("11 - 20 of 100")).toBeInTheDocument();
    });

    it("renders custom template page report", () => {
      render(
        <WexPagination.PageReport
          currentPage={2}
          totalPages={10}
          totalItems={100}
          pageSize={10}
          template="Page {page} of {pages}"
        />
      );
      expect(screen.getByText("Page 2 of 10")).toBeInTheDocument();
    });
  });

  // ============================================
  // JUMP TO PAGE TESTS
  // ============================================
  describe("Jump To Page", () => {
    it("renders jump to page input", () => {
      render(
        <WexPagination.JumpToPage
          currentPage={1}
          totalPages={10}
          onPageChange={() => {}}
        />
      );
      expect(screen.getByRole("spinbutton")).toBeInTheDocument();
      expect(screen.getByText("Go to page")).toBeInTheDocument();
    });
  });

  // ============================================
  // ACCESSIBILITY TESTS
  // ============================================
  describe("Accessibility", () => {
    it("has navigation landmark", () => {
      render(
        <WexPagination>
          <WexPagination.Content>
            <WexPagination.Item>
              <WexPagination.Link href="#">1</WexPagination.Link>
            </WexPagination.Item>
          </WexPagination.Content>
        </WexPagination>
      );
      expect(screen.getByRole("navigation")).toHaveAttribute("aria-label", "pagination");
    });

    it("uses list structure", () => {
      render(
        <WexPagination>
          <WexPagination.Content>
            <WexPagination.Item>
              <WexPagination.Link href="#">1</WexPagination.Link>
            </WexPagination.Item>
            <WexPagination.Item>
              <WexPagination.Link href="#">2</WexPagination.Link>
            </WexPagination.Item>
          </WexPagination.Content>
        </WexPagination>
      );
      expect(screen.getByRole("list")).toBeInTheDocument();
      expect(screen.getAllByRole("listitem").length).toBeGreaterThanOrEqual(2);
    });
  });
});

