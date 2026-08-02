import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactForm } from "./contact-form";

describe("ContactForm", () => {
  it("renders all fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tell us what you need/i)).toBeInTheDocument();
  });

  it("requires name, email and message", () => {
    render(<ContactForm />);
    const name = screen.getByLabelText(/your name/i) as HTMLInputElement;
    const email = screen.getByLabelText(/email/i) as HTMLInputElement;
    const message = screen.getByLabelText(/tell us what you need/i) as HTMLTextAreaElement;
    expect(name).toBeRequired();
    expect(email).toBeRequired();
    expect(message).toBeRequired();
  });

  it("company field is optional", () => {
    render(<ContactForm />);
    const company = screen.getByLabelText(/company/i) as HTMLInputElement;
    expect(company).not.toBeRequired();
  });

  it("shows success state after submission", async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: "Min" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "min@test.com" } });
    fireEvent.change(screen.getByLabelText(/tell us what you need/i), { target: { value: "Need a CRM setup" } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it("calls onSuccess after submission", async () => {
    const onSuccess = vi.fn();
    render(<ContactForm onSuccess={onSuccess} />);
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: "Min" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "min@test.com" } });
    fireEvent.change(screen.getByLabelText(/tell us what you need/i), { target: { value: "Help" } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
    }, { timeout: 2000 });
  });
});
