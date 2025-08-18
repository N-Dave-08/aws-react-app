import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { App } from "./index";

// Mock the Authenticator component
vi.mock("@aws-amplify/ui-react", () => ({
	Authenticator: ({ children }: { children: React.ReactNode }) => {
		if (typeof children === "function") {
			return (children as (props: { signOut: () => void }) => React.ReactNode)({
				signOut: vi.fn(),
			});
		}
		return children;
	},
	withAuthenticator: (Component: React.ComponentType) => Component,
}));

describe("Root Page (App)", () => {
	it("renders the welcome message", () => {
		render(<App />);

		const welcome = screen.getByText("Welcome to the app");
		expect(welcome).toBeInTheDocument();
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
