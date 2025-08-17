import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

// Export the component for testing
export function App() {
	return (
		<div>
			<Button>dasd</Button>
		</div>
	);
}

export const Route = createFileRoute("/")({
	component: App,
});
