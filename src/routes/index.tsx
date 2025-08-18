import { Button } from "@/components/ui/button";
// Import the main Authenticator component from AWS Amplify UI React
// This provides a complete authentication flow with sign-in, sign-up, password reset, etc.
import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
import { createFileRoute } from "@tanstack/react-router";
// Import the default Amplify UI styles for consistent theming
import "@aws-amplify/ui-react/styles.css";
// Import the Amplify core library for configuration
import { Amplify } from "aws-amplify";
// Import the auto-generated AWS configuration file
// This file contains your AWS service endpoints, region, and other settings
import awsExports from "../aws-exports.js";

// Configure Amplify with your AWS settings
// This must be called before using any Amplify services
// The awsExports file is automatically generated when you run 'amplify init' or 'amplify push'
Amplify.configure(awsExports);

// Export the component for testing
export function App() {
	return (
		<div className="App">
			{/* 
				The Authenticator component wraps your app and provides authentication state
				It automatically handles:
				- User sign-in/sign-up forms
				- Password reset flows
				- Multi-factor authentication
				- Session management
				- Token refresh
				
				The component only renders its children when the user is authenticated
				If not authenticated, it shows the sign-in form automatically
			*/}
			<Authenticator>
				{/* 
					This is a render prop pattern - the Authenticator passes authentication state
					and functions to its children. The destructured object contains:
					- signOut: function to log out the current user
					- user: the current authenticated user object
					- signInState: current state of the authentication flow
					- and many other useful properties
				*/}
				{({ signOut }) => (
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
				)}
			</Authenticator>
		</div>
	);
}

export const Route = createFileRoute("/")({
	component: App,
});

// withAuthenticator is a Higher-Order Component (HOC) that wraps your component
// It provides the same authentication functionality but as a wrapper instead of a component
// This is useful when you want to protect an entire component tree
// The wrapped component will only render when the user is authenticated
export default withAuthenticator(App);
