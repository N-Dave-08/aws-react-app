import { Button } from "@/components/ui/button";
import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
import { createFileRoute } from "@tanstack/react-router";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports.js";
Amplify.configure(awsExports);
// Export the component for testing
export function App() {
	return (
		<div className="App">
			<Authenticator>
				{({ signOut }) => (
					<main>
						<header className="App-header">
							{/* Sign Out Button */}
							Welcome to the app
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
				)}
			</Authenticator>
		</div>
	);
}

export const Route = createFileRoute("/")({
	component: App,
});
export default withAuthenticator(App);
