// Import the main Authenticator component from AWS Amplify UI React
import { Authenticator } from "@aws-amplify/ui-react";
import { TanstackDevtools } from "@tanstack/react-devtools";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
// Import the default Amplify UI styles for consistent theming
import "@aws-amplify/ui-react/styles.css";
// Import the Amplify core library for configuration
import { Amplify } from "aws-amplify";
// Import the auto-generated AWS configuration file
import awsExports from "../aws-exports.js";

// Configure Amplify with your AWS settings
Amplify.configure(awsExports);

export const Route = createRootRoute({
	component: () => (
		<>
			{/* 
				The Authenticator component wraps your entire app and provides authentication state
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
					The Authenticator component provides authentication context to all child routes
					Child routes can access authentication functions via the useAuthenticator hook
				*/}
				{() => (
					<>
						<Outlet />
						<TanstackDevtools
							config={{
								position: "bottom-left",
							}}
							plugins={[
								{
									name: "Tanstack Router",
									render: <TanStackRouterDevtoolsPanel />,
								},
							]}
						/>
					</>
				)}
			</Authenticator>
		</>
	),
});
