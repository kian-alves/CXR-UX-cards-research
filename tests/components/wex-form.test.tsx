/**
 * WexForm Component Tests
 *
 * Comprehensive tests covering:
 * - Rendering form structure
 * - Form fields and labels
 * - Descriptions and messages
 * - Validation and error display
 * - Form submission
 * - Multiple field types
 */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { WexForm, WexInput, WexButton, WexCheckbox, WexSelect, WexTextarea } from "@/components/wex";

// ============================================
// TEST FORM COMPONENTS
// ============================================

function BasicTestForm() {
  const form = useForm({
    defaultValues: { email: "" },
  });

  return (
    <WexForm {...form}>
      <form>
        <WexForm.Field
          control={form.control}
          name="email"
          render={({ field }) => (
            <WexForm.Item>
              <WexForm.Label>Email</WexForm.Label>
              <WexForm.Control>
                <WexInput {...field} />
              </WexForm.Control>
              <WexForm.Message />
            </WexForm.Item>
          )}
        />
        <WexButton type="submit">Submit</WexButton>
      </form>
    </WexForm>
  );
}

function FormWithDescription() {
  const form = useForm({
    defaultValues: { username: "" },
  });

  return (
    <WexForm {...form}>
      <form>
        <WexForm.Field
          control={form.control}
          name="username"
          render={({ field }) => (
            <WexForm.Item>
              <WexForm.Label>Username</WexForm.Label>
              <WexForm.Control>
                <WexInput {...field} />
              </WexForm.Control>
              <WexForm.Description>This is your public display name.</WexForm.Description>
              <WexForm.Message />
            </WexForm.Item>
          )}
        />
      </form>
    </WexForm>
  );
}

const validationSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function FormWithValidation({ onSubmit }: { onSubmit?: (data: z.infer<typeof validationSchema>) => void }) {
  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <WexForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit || (() => {}))}>
        <WexForm.Field
          control={form.control}
          name="email"
          render={({ field }) => (
            <WexForm.Item>
              <WexForm.Label>Email</WexForm.Label>
              <WexForm.Control>
                <WexInput {...field} type="email" />
              </WexForm.Control>
              <WexForm.Message />
            </WexForm.Item>
          )}
        />
        <WexForm.Field
          control={form.control}
          name="password"
          render={({ field }) => (
            <WexForm.Item>
              <WexForm.Label>Password</WexForm.Label>
              <WexForm.Control>
                <WexInput {...field} type="password" />
              </WexForm.Control>
              <WexForm.Message />
            </WexForm.Item>
          )}
        />
        <WexButton type="submit">Submit</WexButton>
      </form>
    </WexForm>
  );
}

function FormWithMultipleFields() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  return (
    <WexForm {...form}>
      <form>
        <WexForm.Field
          control={form.control}
          name="name"
          render={({ field }) => (
            <WexForm.Item>
              <WexForm.Label>Name</WexForm.Label>
              <WexForm.Control>
                <WexInput {...field} />
              </WexForm.Control>
            </WexForm.Item>
          )}
        />
        <WexForm.Field
          control={form.control}
          name="email"
          render={({ field }) => (
            <WexForm.Item>
              <WexForm.Label>Email</WexForm.Label>
              <WexForm.Control>
                <WexInput {...field} type="email" />
              </WexForm.Control>
            </WexForm.Item>
          )}
        />
        <WexForm.Field
          control={form.control}
          name="message"
          render={({ field }) => (
            <WexForm.Item>
              <WexForm.Label>Message</WexForm.Label>
              <WexForm.Control>
                <WexTextarea {...field} />
              </WexForm.Control>
            </WexForm.Item>
          )}
        />
        <WexButton type="submit">Submit</WexButton>
      </form>
    </WexForm>
  );
}

function FormWithCheckbox() {
  const form = useForm({
    defaultValues: { terms: false },
  });

  return (
    <WexForm {...form}>
      <form>
        <WexForm.Field
          control={form.control}
          name="terms"
          render={({ field }) => (
            <WexForm.Item className="flex flex-row items-start space-x-3 space-y-0">
              <WexForm.Control>
                <WexCheckbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </WexForm.Control>
              <WexForm.Label>Accept terms and conditions</WexForm.Label>
            </WexForm.Item>
          )}
        />
      </form>
    </WexForm>
  );
}

function FormWithSelect() {
  const form = useForm({
    defaultValues: { role: "" },
  });

  return (
    <WexForm {...form}>
      <form>
        <WexForm.Field
          control={form.control}
          name="role"
          render={({ field }) => (
            <WexForm.Item>
              <WexForm.Label>Role</WexForm.Label>
              <WexSelect onValueChange={field.onChange} defaultValue={field.value}>
                <WexForm.Control>
                  <WexSelect.Trigger>
                    <WexSelect.Value placeholder="Select a role" />
                  </WexSelect.Trigger>
                </WexForm.Control>
                <WexSelect.Content>
                  <WexSelect.Item value="admin">Admin</WexSelect.Item>
                  <WexSelect.Item value="user">User</WexSelect.Item>
                  <WexSelect.Item value="guest">Guest</WexSelect.Item>
                </WexSelect.Content>
              </WexSelect>
            </WexForm.Item>
          )}
        />
      </form>
    </WexForm>
  );
}

// ============================================
// TESTS
// ============================================

describe("WexForm", () => {
  // ============================================
  // RENDERING TESTS
  // ============================================
  describe("Rendering", () => {
    it("renders form without crashing", () => {
      render(<BasicTestForm />);
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
    });

    it("renders submit button", () => {
      render(<BasicTestForm />);
      expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    });

    it("renders form with description", () => {
      render(<FormWithDescription />);
      expect(screen.getByText("This is your public display name.")).toBeInTheDocument();
    });

    it("renders multiple form fields", () => {
      render(<FormWithMultipleFields />);
      expect(screen.getByLabelText("Name")).toBeInTheDocument();
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
      expect(screen.getByLabelText("Message")).toBeInTheDocument();
    });
  });

  // ============================================
  // VALIDATION TESTS
  // ============================================
  describe("Validation", () => {
    it("shows validation error on submit with empty fields", async () => {
      const user = userEvent.setup();
      render(<FormWithValidation />);

      await user.click(screen.getByRole("button", { name: "Submit" }));

      await waitFor(() => {
        expect(screen.getByText("Email is required")).toBeInTheDocument();
      });
    });

    it("shows multiple validation errors", async () => {
      const user = userEvent.setup();
      render(<FormWithValidation />);

      // Submit with empty email and short password
      await user.type(screen.getByLabelText("Password"), "short");
      await user.click(screen.getByRole("button", { name: "Submit" }));

      await waitFor(() => {
        expect(screen.getByText("Email is required")).toBeInTheDocument();
        expect(screen.getByText("Password must be at least 8 characters")).toBeInTheDocument();
      });
    });

    it("shows password length error", async () => {
      const user = userEvent.setup();
      render(<FormWithValidation />);

      await user.type(screen.getByLabelText("Email"), "test@example.com");
      await user.type(screen.getByLabelText("Password"), "short");
      await user.click(screen.getByRole("button", { name: "Submit" }));

      await waitFor(() => {
        expect(screen.getByText("Password must be at least 8 characters")).toBeInTheDocument();
      });
    });

    it("clears error after valid input", async () => {
      const user = userEvent.setup();
      render(<FormWithValidation />);

      // Trigger error
      await user.click(screen.getByRole("button", { name: "Submit" }));
      await waitFor(() => {
        expect(screen.getByText("Email is required")).toBeInTheDocument();
      });

      // Fix the error
      await user.type(screen.getByLabelText("Email"), "test@example.com");
      await user.type(screen.getByLabelText("Password"), "validpassword123");
      await user.click(screen.getByRole("button", { name: "Submit" }));

      await waitFor(() => {
        expect(screen.queryByText("Email is required")).not.toBeInTheDocument();
      });
    });
  });

  // ============================================
  // SUBMISSION TESTS
  // ============================================
  describe("Submission", () => {
    it("calls onSubmit with valid data", async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn();
      render(<FormWithValidation onSubmit={handleSubmit} />);

      await user.type(screen.getByLabelText("Email"), "test@example.com");
      await user.type(screen.getByLabelText("Password"), "validpassword123");
      await user.click(screen.getByRole("button", { name: "Submit" }));

      await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledWith(
          { email: "test@example.com", password: "validpassword123" },
          expect.anything()
        );
      });
    });

    it("does not call onSubmit with invalid data", async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn();
      render(<FormWithValidation onSubmit={handleSubmit} />);

      await user.click(screen.getByRole("button", { name: "Submit" }));

      await waitFor(() => {
        expect(handleSubmit).not.toHaveBeenCalled();
      });
    });
  });

  // ============================================
  // FIELD TYPES TESTS
  // ============================================
  describe("Field Types", () => {
    it("renders checkbox field", () => {
      render(<FormWithCheckbox />);
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
      expect(screen.getByText("Accept terms and conditions")).toBeInTheDocument();
    });

    it("toggles checkbox", async () => {
      const user = userEvent.setup();
      render(<FormWithCheckbox />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it("renders select field", () => {
      render(<FormWithSelect />);
      expect(screen.getByRole("combobox")).toBeInTheDocument();
      expect(screen.getByText("Select a role")).toBeInTheDocument();
    });
  });

  // ============================================
  // ACCESSIBILITY TESTS
  // ============================================
  describe("Accessibility", () => {
    it("associates label with input via htmlFor", () => {
      render(<BasicTestForm />);
      const input = screen.getByLabelText("Email");
      expect(input).toHaveAttribute("id");
    });

    it("associates error message with input via aria-describedby", async () => {
      const user = userEvent.setup();
      render(<FormWithValidation />);

      await user.click(screen.getByRole("button", { name: "Submit" }));

      await waitFor(() => {
        const input = screen.getByLabelText("Email");
        expect(input).toHaveAttribute("aria-describedby");
        expect(input).toHaveAttribute("aria-invalid", "true");
      });
    });
  });
});

