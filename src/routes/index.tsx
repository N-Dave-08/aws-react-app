import { Button } from "@/components/ui/button";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { createFileRoute } from "@tanstack/react-router";

// Export the component for testing
export function App() {
	const { signOut } = useAuthenticator();

	return (
		<div className="App">
			<main>
				<header className="App-header">
					{/* Sign Out Button */}
					Welcome to the app
					{/* 
						The signOut function will:
						- Clear the user's session
						- Remove authentication tokens
						- Redirect back to the sign-in form
						- Handle AWS Cognito logout
					*/}
					<Button
						onClick={signOut}
						style={{
							margin: "20px",
							fontSize: "0.8rem",
							padding: "5px 10px",
							marginTop: "20px",
						}}
					>
						Sign Out
					</Button>
				</header>
			</main>
		</div>
	);
}

export const Route = createFileRoute("/")({
	component: App,
});
