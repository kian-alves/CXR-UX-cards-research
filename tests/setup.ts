/**
 * Vitest Setup File
 * 
 * Configures the test environment with:
 * - jest-dom matchers for DOM assertions
 * - Browser API mocks for JSDOM environment
 */

import "@testing-library/jest-dom/vitest";
import { expect } from "vitest";
import { toHaveNoViolations } from "vitest-axe/matchers";

expect.extend({ toHaveNoViolations });

// Mock Element.scrollIntoView (used by cmdk/Command component)
Element.prototype.scrollIntoView = function () {};

// Mock window.matchMedia for components that use theme detection
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock ResizeObserver for components that use it
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  value: ResizeObserverMock,
});

// Mock IntersectionObserver for lazy-loading components
class IntersectionObserverMock {
  root = null;
  rootMargin = "";
  thresholds = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: IntersectionObserverMock,
});

