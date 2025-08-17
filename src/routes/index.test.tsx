import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./index";

describe("Root Page (App)", () => {
	it('renders a button with text "dasd"', () => {
		render(<App />);

		const button = screen.getByRole("button", { name: "dasd" });
		expect(button).toBeInTheDocument();
	});

	it("button is clickable", () => {
		render(<App />);

		const button = screen.getByRole("button", { name: "dasd" });
		expect(button).not.toBeDisabled();
	});

	it("renders in a div container", () => {
		render(<App />);

		const container = screen.getByText("dasd").closest("div");
		expect(container).toBeInTheDocument();
	});
});
