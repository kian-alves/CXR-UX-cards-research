/**
 * WexSidebar Component Tests
 *
 * Comprehensive tests covering:
 * - Provider and basic rendering
 * - Sidebar sections (Header, Content, Footer)
 * - Menu and menu items
 * - Collapsible behavior
 * - Sub-menus
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { WexSidebar, useWexSidebar } from "@/components/wex";

// Helper component to test useSidebar hook
function SidebarStateDisplay() {
  const { open, isMobile, state } = useWexSidebar();
  return (
    <div data-testid="sidebar-state">
      <span data-testid="open">{String(open)}</span>
      <span data-testid="mobile">{String(isMobile)}</span>
      <span data-testid="state">{state}</span>
    </div>
  );
}

// Wrapper for all sidebar tests
function SidebarTestWrapper({ children }: { children?: React.ReactNode }) {
  return (
    <WexSidebar.Provider>
      <WexSidebar data-testid="sidebar">
        {children}
      </WexSidebar>
      <WexSidebar.Inset>
        <main>Main Content</main>
      </WexSidebar.Inset>
    </WexSidebar.Provider>
  );
}

describe("WexSidebar", () => {
  // ============================================
  // PROVIDER TESTS
  // ============================================
  describe("Provider", () => {
    it("renders provider without crashing", () => {
      render(
        <WexSidebar.Provider>
          <div data-testid="content">Content</div>
        </WexSidebar.Provider>
      );
      expect(screen.getByTestId("content")).toBeInTheDocument();
    });

    it("provides sidebar context via hook", () => {
      render(
        <WexSidebar.Provider>
          <SidebarStateDisplay />
        </WexSidebar.Provider>
      );
      // Should expose state, open, and isMobile
      expect(screen.getByTestId("sidebar-state")).toBeInTheDocument();
      expect(screen.getByTestId("state")).toHaveTextContent(/expanded|collapsed/);
    });

    it("accepts defaultOpen prop", () => {
      render(
        <WexSidebar.Provider defaultOpen={false}>
          <SidebarStateDisplay />
        </WexSidebar.Provider>
      );
      expect(screen.getByTestId("open")).toHaveTextContent("false");
    });
  });

  // ============================================
  // SIDEBAR STRUCTURE TESTS
  // ============================================
  describe("Structure", () => {
    it("renders sidebar with header, content, and footer", () => {
      render(
        <SidebarTestWrapper>
          <WexSidebar.Header data-testid="header">Header</WexSidebar.Header>
          <WexSidebar.Content data-testid="content">Content</WexSidebar.Content>
          <WexSidebar.Footer data-testid="footer">Footer</WexSidebar.Footer>
        </SidebarTestWrapper>
      );
      expect(screen.getByTestId("header")).toHaveTextContent("Header");
      expect(screen.getByTestId("content")).toHaveTextContent("Content");
      expect(screen.getByTestId("footer")).toHaveTextContent("Footer");
    });

    it("renders sidebar inset area", () => {
      render(
        <WexSidebar.Provider>
          <WexSidebar />
          <WexSidebar.Inset data-testid="inset">
            <main>Main Area</main>
          </WexSidebar.Inset>
        </WexSidebar.Provider>
      );
      expect(screen.getByTestId("inset")).toHaveTextContent("Main Area");
    });

    it("renders rail for collapsing", () => {
      render(
        <SidebarTestWrapper>
          <WexSidebar.Content>Content</WexSidebar.Content>
          <WexSidebar.Rail data-testid="rail" />
        </SidebarTestWrapper>
      );
      expect(screen.getByTestId("rail")).toBeInTheDocument();
    });
  });

  // ============================================
  // MENU TESTS
  // ============================================
  describe("Menu", () => {
    it("renders menu with items", () => {
      render(
        <SidebarTestWrapper>
          <WexSidebar.Content>
            <WexSidebar.Menu data-testid="menu">
              <WexSidebar.MenuItem>
                <WexSidebar.MenuButton data-testid="menu-btn-1">Dashboard</WexSidebar.MenuButton>
              </WexSidebar.MenuItem>
              <WexSidebar.MenuItem>
                <WexSidebar.MenuButton data-testid="menu-btn-2">Settings</WexSidebar.MenuButton>
              </WexSidebar.MenuItem>
            </WexSidebar.Menu>
          </WexSidebar.Content>
        </SidebarTestWrapper>
      );
      expect(screen.getByTestId("menu")).toBeInTheDocument();
      expect(screen.getByTestId("menu-btn-1")).toHaveTextContent("Dashboard");
      expect(screen.getByTestId("menu-btn-2")).toHaveTextContent("Settings");
    });

    it("renders menu button as link when asChild is used", () => {
      render(
        <SidebarTestWrapper>
          <WexSidebar.Content>
            <WexSidebar.Menu>
              <WexSidebar.MenuItem>
                <WexSidebar.MenuButton asChild>
                  <a href="/dashboard" data-testid="link">Dashboard</a>
                </WexSidebar.MenuButton>
              </WexSidebar.MenuItem>
            </WexSidebar.Menu>
          </WexSidebar.Content>
        </SidebarTestWrapper>
      );
      const link = screen.getByTestId("link");
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "/dashboard");
    });

    it("renders menu badge", () => {
      render(
        <SidebarTestWrapper>
          <WexSidebar.Content>
            <WexSidebar.Menu>
              <WexSidebar.MenuItem>
                <WexSidebar.MenuButton>Notifications</WexSidebar.MenuButton>
                <WexSidebar.MenuBadge data-testid="badge">5</WexSidebar.MenuBadge>
              </WexSidebar.MenuItem>
            </WexSidebar.Menu>
          </WexSidebar.Content>
        </SidebarTestWrapper>
      );
      expect(screen.getByTestId("badge")).toHaveTextContent("5");
    });

    it("renders menu action button", () => {
      render(
        <SidebarTestWrapper>
          <WexSidebar.Content>
            <WexSidebar.Menu>
              <WexSidebar.MenuItem>
                <WexSidebar.MenuButton>Projects</WexSidebar.MenuButton>
                <WexSidebar.MenuAction data-testid="action">+</WexSidebar.MenuAction>
              </WexSidebar.MenuItem>
            </WexSidebar.Menu>
          </WexSidebar.Content>
        </SidebarTestWrapper>
      );
      expect(screen.getByTestId("action")).toHaveTextContent("+");
    });
  });

  // ============================================
  // GROUP TESTS
  // ============================================
  describe("Groups", () => {
    it("renders sidebar group with label", () => {
      render(
        <SidebarTestWrapper>
          <WexSidebar.Content>
            <WexSidebar.Group>
              <WexSidebar.GroupLabel data-testid="label">Navigation</WexSidebar.GroupLabel>
              <WexSidebar.GroupContent data-testid="group-content">
                <WexSidebar.Menu>
                  <WexSidebar.MenuItem>
                    <WexSidebar.MenuButton>Home</WexSidebar.MenuButton>
                  </WexSidebar.MenuItem>
                </WexSidebar.Menu>
              </WexSidebar.GroupContent>
            </WexSidebar.Group>
          </WexSidebar.Content>
        </SidebarTestWrapper>
      );
      expect(screen.getByTestId("label")).toHaveTextContent("Navigation");
      expect(screen.getByTestId("group-content")).toBeInTheDocument();
    });

    it("renders group with action button", () => {
      render(
        <SidebarTestWrapper>
          <WexSidebar.Content>
            <WexSidebar.Group>
              <WexSidebar.GroupLabel>Files</WexSidebar.GroupLabel>
              <WexSidebar.GroupAction data-testid="group-action">Add</WexSidebar.GroupAction>
            </WexSidebar.Group>
          </WexSidebar.Content>
        </SidebarTestWrapper>
      );
      expect(screen.getByTestId("group-action")).toHaveTextContent("Add");
    });
  });

  // ============================================
  // SUB-MENU TESTS
  // ============================================
  describe("Sub-menus", () => {
    it("renders nested sub-menu", () => {
      render(
        <SidebarTestWrapper>
          <WexSidebar.Content>
            <WexSidebar.Menu>
              <WexSidebar.MenuItem>
                <WexSidebar.MenuButton>Settings</WexSidebar.MenuButton>
                <WexSidebar.MenuSub data-testid="submenu">
                  <WexSidebar.MenuSubItem>
                    <WexSidebar.MenuSubButton data-testid="sub-btn">Account</WexSidebar.MenuSubButton>
                  </WexSidebar.MenuSubItem>
                </WexSidebar.MenuSub>
              </WexSidebar.MenuItem>
            </WexSidebar.Menu>
          </WexSidebar.Content>
        </SidebarTestWrapper>
      );
      expect(screen.getByTestId("submenu")).toBeInTheDocument();
      expect(screen.getByTestId("sub-btn")).toHaveTextContent("Account");
    });
  });

  // ============================================
  // TRIGGER TESTS
  // ============================================
  describe("Trigger", () => {
    it("renders trigger button", () => {
      render(
        <WexSidebar.Provider>
          <WexSidebar.Trigger data-testid="trigger" />
        </WexSidebar.Provider>
      );
      expect(screen.getByTestId("trigger")).toBeInTheDocument();
    });

    it("toggles sidebar on trigger click", async () => {
      const user = userEvent.setup();
      render(
        <WexSidebar.Provider defaultOpen={true}>
          <WexSidebar.Trigger data-testid="trigger" />
          <SidebarStateDisplay />
        </WexSidebar.Provider>
      );
      
      expect(screen.getByTestId("open")).toHaveTextContent("true");
      
      await user.click(screen.getByTestId("trigger"));
      
      expect(screen.getByTestId("open")).toHaveTextContent("false");
    });
  });

  // ============================================
  // SEPARATOR & INPUT TESTS
  // ============================================
  describe("Utilities", () => {
    it("renders separator", () => {
      render(
        <SidebarTestWrapper>
          <WexSidebar.Content>
            <WexSidebar.Separator data-testid="separator" />
          </WexSidebar.Content>
        </SidebarTestWrapper>
      );
      expect(screen.getByTestId("separator")).toBeInTheDocument();
    });

    it("renders input field", () => {
      render(
        <SidebarTestWrapper>
          <WexSidebar.Content>
            <WexSidebar.Input placeholder="Search..." data-testid="input" />
          </WexSidebar.Content>
        </SidebarTestWrapper>
      );
      expect(screen.getByTestId("input")).toHaveAttribute("placeholder", "Search...");
    });

    it("renders menu skeleton for loading state", () => {
      render(
        <SidebarTestWrapper>
          <WexSidebar.Content>
            <WexSidebar.Menu>
              <WexSidebar.MenuItem>
                <WexSidebar.MenuSkeleton data-testid="skeleton" />
              </WexSidebar.MenuItem>
            </WexSidebar.Menu>
          </WexSidebar.Content>
        </SidebarTestWrapper>
      );
      expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    });
  });
});

