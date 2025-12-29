/**
 * WexSonner (Toaster) Component Tests
 *
 * Comprehensive tests covering:
 * - Rendering
 * - Toast triggering via wexToast (success, error, warning, info)
 * - Toast dismissal
 * - Toast with description
 * - Toast with action
 */

import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { WexToaster, wexToast } from "@/components/wex";

describe("WexToaster", () => {
  afterEach(() => {
    // Dismiss all toasts between tests
    wexToast.dismiss();
  });

  // ============================================
  // RENDERING TESTS
  // ============================================
  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(<WexToaster />);
      // Toaster renders as a section element with role="region"
      expect(document.querySelector("section")).toBeInTheDocument();
    });

    it("renders as an accessible region", () => {
      render(<WexToaster />);
      const region = document.querySelector('section[aria-label]');
      expect(region).toBeInTheDocument();
    });
  });

  // ============================================
  // TOAST TRIGGERING TESTS
  // ============================================
  describe("Toast Triggering", () => {
    it("shows a basic toast message", async () => {
      render(<WexToaster />);
      wexToast("Hello World");
      
      await waitFor(() => {
        expect(screen.getByText("Hello World")).toBeInTheDocument();
      });
    });

    it("shows a success toast", async () => {
      render(<WexToaster />);
      wexToast.success("Operation successful");
      
      await waitFor(() => {
        expect(screen.getByText("Operation successful")).toBeInTheDocument();
      });
    });

    it("shows an error toast", async () => {
      render(<WexToaster />);
      wexToast.error("Something went wrong");
      
      await waitFor(() => {
        expect(screen.getByText("Something went wrong")).toBeInTheDocument();
      });
    });

    it("shows a warning toast", async () => {
      render(<WexToaster />);
      wexToast.warning("Be careful");
      
      await waitFor(() => {
        expect(screen.getByText("Be careful")).toBeInTheDocument();
      });
    });

    it("shows an info toast", async () => {
      render(<WexToaster />);
      wexToast.info("Just so you know");
      
      await waitFor(() => {
        expect(screen.getByText("Just so you know")).toBeInTheDocument();
      });
    });

    it("shows a loading toast", async () => {
      render(<WexToaster />);
      wexToast.loading("Loading...");
      
      await waitFor(() => {
        expect(screen.getByText("Loading...")).toBeInTheDocument();
      });
    });
  });

  // ============================================
  // TOAST WITH OPTIONS TESTS
  // ============================================
  describe("Toast Options", () => {
    it("shows toast with description", async () => {
      render(<WexToaster />);
      wexToast("Title", {
        description: "This is a description",
      });
      
      await waitFor(() => {
        expect(screen.getByText("Title")).toBeInTheDocument();
        expect(screen.getByText("This is a description")).toBeInTheDocument();
      });
    });

    it("shows multiple toasts", async () => {
      render(<WexToaster />);
      wexToast("First toast");
      wexToast("Second toast");
      wexToast("Third toast");
      
      await waitFor(() => {
        expect(screen.getByText("First toast")).toBeInTheDocument();
        expect(screen.getByText("Second toast")).toBeInTheDocument();
        expect(screen.getByText("Third toast")).toBeInTheDocument();
      });
    });
  });

  // ============================================
  // TOAST DISMISSAL TESTS
  // ============================================
  describe("Toast Dismissal", () => {
    it("dismisses all toasts", async () => {
      render(<WexToaster />);
      wexToast("Toast 1");
      wexToast("Toast 2");
      
      await waitFor(() => {
        expect(screen.getByText("Toast 1")).toBeInTheDocument();
      });
      
      wexToast.dismiss();
      
      await waitFor(() => {
        expect(screen.queryByText("Toast 1")).not.toBeInTheDocument();
        expect(screen.queryByText("Toast 2")).not.toBeInTheDocument();
      });
    });

    it("dismisses a specific toast by id", async () => {
      render(<WexToaster />);
      const toastId = wexToast("Dismissable toast");
      wexToast("Persistent toast");
      
      await waitFor(() => {
        expect(screen.getByText("Dismissable toast")).toBeInTheDocument();
        expect(screen.getByText("Persistent toast")).toBeInTheDocument();
      });
      
      wexToast.dismiss(toastId);
      
      await waitFor(() => {
        expect(screen.queryByText("Dismissable toast")).not.toBeInTheDocument();
        expect(screen.getByText("Persistent toast")).toBeInTheDocument();
      });
    });
  });

  // ============================================
  // PROMISE TOAST TESTS
  // ============================================
  describe("Promise Toast", () => {
    it("shows loading, then success state", async () => {
      render(<WexToaster />);
      
      const promise = Promise.resolve({ name: "Test" });
      wexToast.promise(promise, {
        loading: "Loading data...",
        success: "Data loaded!",
        error: "Failed to load",
      });
      
      // Should show loading first
      await waitFor(() => {
        expect(screen.getByText("Loading data...")).toBeInTheDocument();
      });
      
      // Then success
      await waitFor(() => {
        expect(screen.getByText("Data loaded!")).toBeInTheDocument();
      });
    });

    it("shows loading, then error state on rejection", async () => {
      render(<WexToaster />);
      
      const promise = Promise.reject(new Error("Failed"));
      wexToast.promise(promise, {
        loading: "Saving...",
        success: "Saved!",
        error: "Failed to save",
      });
      
      // Should show loading first
      await waitFor(() => {
        expect(screen.getByText("Saving...")).toBeInTheDocument();
      });
      
      // Then error
      await waitFor(() => {
        expect(screen.getByText("Failed to save")).toBeInTheDocument();
      });
    });
  });
});

