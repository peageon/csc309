# team56

Navigate to the application:

URL: https://fast-caverns-07362.herokuapp.com/

First screen the user sees is the Log In page
The log in credentials are 'user' for both Id and Password

**Note:**
Other credentials that can be used are user1/user1 or admin/admin

To sign up the user can click the 'Don't have an account? Sign up' on the bottom right corner of the login box

On the signup screen, the user needs to provide a user name, an email address and a password.

**Note:**
Both the user name and the email address are unique, so if a user tries to sign up with an existing user name or email address an error message will be displayed and the user will need to provide different values.

Upon successful signup, the user will be created in the application, but will be inactive until the user confirms their email. An email will be sent to the email address provided during signup, prompting the user to provide confirmation. By clicking on the link provided in the email, the user confirms their email and the account is activated.

If the user forgot their password they can click 'Forgot Password?' on the login screen which will redirect them to a page where they can send a reset password link to their email address associated with their account.

Once the user has logged in, they will be redirected to the Projects page where other users posted listings for their project looking for partners.

When 'My Cool Project' is clicked the user will be redirected to the details page of the project. Since 'user' created this listing, they have permissions to change the postings as they like.

If you click the second listing it will redirect you to another user's listing which you have no permissions to modify.

If you find a project listing to be inappropriate you can use 'flag project as inappropriate' button to flag the project listing which an admin can later review and handle accordingly.

'User Search' button on the header on top of the site will redirect to a page with a list of users. You can use the filter tab on the left to filter users by various ways.

Clicking on one of the users will redirect to their profile page where their information is listed.

Clicking on the Chat button on the header will display the chat room screen. There are three panes:

* the leftmost pane displays the chat messages sent and received by the logged in user, with the most recent message at the top
* the middle pane allows to search a user to which to send a chat message and send a chat message by populating the message box and pressing the send message button.
* the rightmost pane, displays the user information for the user searched in the middle pane.

Clicking on the react icon (which will later be changed to represent the user) will redirect to current signed in user's profile page where they can modify their information, except their username which is permanent.

Finally, the 'Log Out' button on the top right will log the user out and redirect to the log in page.

Documentation for server routes can be found in the server.js file.
In brief, there are CRUD operations for projects and users, as well as session management and authentication.

**Configuration**

The application will send emails to the user for various scenarios:
* during the sign up process to confirm the email account
* when a user forgets the password to reset the password

By default, Ethereal email will be used for email notifications.

To configure another email server you need to set the following environment variables:

EMAIL_HOST

EMAIL_PORT

EMAIL_SECURE

EMAIL_USER

EMAIL_PASS

**Note:**
For production applications we should use more secure authentication methods like OAuth2, however for this project we are using a simplified authentication mechanism using user and password.

*Example:*

EMAIL_HOST=smtp.gmail.com

EMAIL_PORT=465

EMAIL_SECURE=true

EMAIL_USER=myemail@gmail.com

EMAIL_PASS=mypassword

**Note:**
For the application deployed on heroku (URL mentioned at the top of this document) we have configured emails to be sent using the gmail smtp server, so if the email address provided for a user account is valid, actual emails will be sent.
