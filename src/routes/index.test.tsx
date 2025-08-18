import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./index";

describe("Root Page (App)", () => {
	it("renders the Authenticator component", () => {
		render(<App />);

		const container = screen.getByText("Welcome to the app");
		expect(container).toBeInTheDocument();
	});

	it("renders a sign out button", () => {
		render(<App />);

		const button = screen.getByRole("button", { name: "Sign Out" });
		expect(button).toBeInTheDocument();
	});

	it("renders in a div container", () => {
		render(<App />);

		const container = screen.getByText("Welcome to the app").closest("div");
		expect(container).toBeInTheDocument();
	});
});
