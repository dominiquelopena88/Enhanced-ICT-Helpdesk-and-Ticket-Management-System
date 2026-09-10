/*
    ============================================================
    ENHANCED ICT HELPDESK - FRONTEND JAVASCRIPT
    ============================================================

    This file controls the behaviour of the frontend.

    It is responsible for:

    1. Handling employee login.
    2. Sending login information to the backend.
    3. Storing the JWT authentication token.
    4. Requesting the employee's tickets.
    5. Displaying the tickets on the webpage.
    6. Logging the employee out.

    The frontend communicates with the Node.js + Express
    backend through HTTP API requests.
*/


/* ============================================================
   1. BACKEND API URL
   ============================================================ */

/*
    The backend server is currently running locally on:

    http://localhost:3000

    The API endpoints are:

    POST /api/auth/login
        Used to authenticate the employee.

    GET /api/tickets
        Used to retrieve the employee's tickets.
*/
const API_BASE_URL = 'http://localhost:3000/api';

/*
    ============================================================
    REGISTRATION FORM ELEMENTS
    ============================================================

    These variables connect JavaScript to the registration
    elements that we added to index.html.

    JavaScript needs these references so it can:
    
    1. Read the employee's registration information.
    2. Send that information to the backend.
    3. Display the registration result.
*/


// Find the registration form in index.html.
const registrationForm =
    document.getElementById('registrationForm');


// Find the full-name input field.
const registerFullName =
    document.getElementById('registerFullName');


// Find the registration email input field.
const registerEmail =
    document.getElementById('registerEmail');


// Find the registration password input field.
const registerPassword =
    document.getElementById('registerPassword');


// Find the paragraph used to display registration messages.
const registrationMessage =
    document.getElementById('registrationMessage');


// Find the button used to switch from registration to login.
const showLoginButton =
    document.getElementById('showLoginButton');


// Find the button used to switch from login to registration.
const showRegistrationButton =
    document.getElementById('showRegistrationButton');


/* ============================================================
   2. GET HTML ELEMENTS
   ============================================================ */

/*
    Find the login form in index.html.

    We use document.getElementById() to access an HTML
    element using its id.
*/
const loginForm = document.getElementById('loginForm');


/*
    Find the email input field.
*/
const emailInput = document.getElementById('email');


/*
    Find the password input field.
*/
const passwordInput = document.getElementById('password');


/*
    Find the paragraph used to display login messages.
*/
const loginMessage = document.getElementById('loginMessage');

/*
    Find the paragraph used to display messages
    related to the My Tickets section.
*/
const ticketsMessage = document.getElementById('ticketsMessage');

/*
    Find the registration section.

    This section contains the employee registration form.
*/
const registrationSection =
    document.getElementById('registrationSection');

/* ============================================================
   SWITCH BETWEEN REGISTRATION AND LOGIN
   ============================================================ */

/*
    When the employee clicks "Login" from the registration
    section, hide registration and show login.
*/
showLoginButton.addEventListener('click', function () {

    registrationSection.hidden = true;

    loginSection.hidden = false;

    registrationMessage.textContent = '';
});


/*
    When the employee clicks "Register" from the login
    section, hide login and show registration.
*/
showRegistrationButton.addEventListener('click', function () {

    // Clear anything previously typed into the login form.
    loginForm.reset();

    // Clear any previous login message.
    loginMessage.textContent = '';

    // Hide the login section.
    loginSection.hidden = true;

    // Show the registration section.
    registrationSection.hidden = false;
});

/*
    Find the login section.

    This section will be hidden after successful login.
*/
const loginSection = document.getElementById('loginSection');


/*
    Find the My Tickets section.

    This section starts hidden in index.html.
*/
const ticketsSection = document.getElementById('ticketsSection');


/*
    Find the container where tickets will be displayed.
*/
const ticketsContainer = document.getElementById('ticketsContainer');


/*
    Find the logout button.
*/
const logoutButton = document.getElementById('logoutButton');

/* ============================================================
   REGISTRATION FORM EVENT
   ============================================================ */

/*
    Listen for the employee submitting the registration form.

    When the Register button is clicked, this function will:

    1. Stop the browser from refreshing the page.
    2. Read the registration information.
    3. Send the information to the backend API.
    4. Wait for the backend response.
    5. Display the registration result.
*/
registrationForm.addEventListener('submit', async function (event) {

    /*
        Prevent the browser's default form submission.

        Without this, the browser would reload the webpage.
    */
    event.preventDefault();


    /*
        Read the values entered by the employee.

        trim() removes unnecessary spaces from the beginning
        and end of the name and email.
    */
    const fullName = registerFullName.value.trim();

    const email = registerEmail.value.trim();

    const password = registerPassword.value;


    /*
        Display a temporary message while the registration
        request is being processed.
    */
    registrationMessage.textContent =
        'Creating your account...';


    try {

        /*
            Send the registration information to the backend.

            The backend endpoint is:

            POST /api/auth/register

            This matches the route defined in:

            backend/src/routes/authRoutes.js
        */
        const response = await fetch(
            `${API_BASE_URL}/auth/register`,
            {
                method: 'POST',

                /*
                    Tell Express that we are sending JSON data.
                */
                headers: {
                    'Content-Type': 'application/json'
                },

                /*
                    Convert the JavaScript object into JSON.

                    These property names MUST match the backend:

                    full_name
                    email
                    password
                */
                body: JSON.stringify({
                    full_name: fullName,
                    email: email,
                    password: password
                })
            }
        );


        /*
            Convert the backend response from JSON text
            into a JavaScript object.
        */
        const data = await response.json();


        /*
            Check whether registration was successful.

            response.ok is true for successful HTTP responses.
        */
        if (!response.ok) {

            /*
                Display the error message returned by
                the backend.

                Example:

                "Email address is already registered"
            */
            registrationMessage.textContent =
                data.message || 'Registration failed.';

            return;
        }


        /*
            Registration was successful.
        */
        registrationMessage.textContent =
            'Account created successfully!';


        /*
            Clear the registration form after success.
        */
        registrationForm.reset();


        /*
            After successful registration, switch the user
            to the login section.

            We wait briefly so the employee can see the
            success message first.
        */
        setTimeout(function () {

            registrationSection.hidden = true;

            loginSection.hidden = false;

            loginMessage.textContent =
                'Registration successful. Please log in.';

        }, 1000);

    } catch (error) {

        /*
            This catches network errors.

            For example, if the Node.js backend is not running.
        */
        console.error(
            'Registration request error:',
            error
        );

        registrationMessage.textContent =
            'Unable to connect to the backend server.';
    }
});

/* ============================================================
   3. LOGIN FORM EVENT
   ============================================================ */

/*
    Listen for the employee submitting the login form.

    preventDefault() stops the browser from refreshing the
    page when the form is submitted.
*/
loginForm.addEventListener('submit', async function (event) {

    event.preventDefault();


    /*
        Get the values entered by the employee.
    */
    const email = emailInput.value.trim();
    const password = passwordInput.value;


    /*
        Display a temporary message while the login request
        is being processed.
    */
    loginMessage.textContent = 'Logging in...';


    try {

        /*
            Send the login information to the backend.

            fetch() is used to communicate with the REST API.
        */
        const response = await fetch(
            `${API_BASE_URL}/auth/login`,
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );


        /*
            Convert the backend response from JSON text
            into a JavaScript object.
        */
        const data = await response.json();


        /*
            Check whether the backend accepted the login.
        */
        if (!response.ok) {

            /*
                Display the error message returned by
                the backend.
            */
            loginMessage.textContent =
                data.message || 'Login failed.';

            return;
        }


        /*
            The backend should return a JWT token after
            successful authentication.

            Example:

            {
                "message": "Login successful.",
                "token": "eyJ..."
            }
        */
        const token = data.token;


        /*
            Make sure a token was actually returned.
        */
        if (!token) {

            loginMessage.textContent =
                'Login failed: no authentication token received.';

            return;
        }


        /*
            Store the JWT token in the browser.

            localStorage allows the token to remain available
            when JavaScript needs to make authenticated requests.
        */
        localStorage.setItem('authToken', token);


        /*
            Tell the employee that login was successful.
        */
        loginMessage.textContent = 'Login successful.';


        /*
            Hide the login section.
        */
        loginSection.hidden = true;


        /*
            Show the My Tickets section.
        */
        ticketsSection.hidden = false;


        /*
            Load the employee's tickets immediately after login.
        */
        loadMyTickets();

    } catch (error) {

        /*
            This handles network errors, such as the backend
            server not running.
        */
        console.error('Login request error:', error);

        loginMessage.textContent =
            'Unable to connect to the backend server.';
    }
});


/* ============================================================
   4. LOAD MY TICKETS
   ============================================================ */

/*
    Request all tickets belonging to the currently
    authenticated employee.
*/
async function loadMyTickets() {

    /*
        Retrieve the JWT token stored during login.
    */
    const token = localStorage.getItem('authToken');


    /*
        If there is no token, the employee is not logged in.
    */
    if (!token) {

        ticketsMessage.textContent =
            'Please log in to view your tickets.';

        return;
    }


    /*
        Display a temporary loading message.
    */
    ticketsMessage.textContent = 'Loading tickets...';


    try {

        /*
            Send a GET request to the backend.

            The Authorization header contains the JWT token.

            The backend authentication middleware will use
            this token to identify the logged-in employee.
        */
        const response = await fetch(
            `${API_BASE_URL}/tickets`,
            {
                method: 'GET',

                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );


        /*
            Convert the response into a JavaScript object.
        */
        const data = await response.json();


        /*
            If the backend rejects the request, display
            the returned error message.
        */
        if (!response.ok) {

            ticketsMessage.textContent =
                data.message || 'Unable to retrieve tickets.';

            return;
        }


        /*
            Display the tickets returned by the backend.
        */
        displayTickets(data.tickets);

    } catch (error) {

        /*
            Handle connection errors.
        */
        console.error('Load tickets error:', error);

        ticketsMessage.textContent =
            'Unable to connect to the backend server.';
    }
}


/* ============================================================
   5. DISPLAY TICKETS
   ============================================================ */

/*
    Display the tickets inside the ticketsContainer element.

    The backend returns an array of ticket objects.

    Example:

    [
        {
            id: 1,
            subject: "Cannot connect to WiFi",
            description: "...",
            category: "Network",
            priority: "High",
            status: "Open"
        }
    ]
*/
function displayTickets(tickets) {

    /*
        Remove any previous ticket content.
    */
    ticketsContainer.innerHTML = '';


    /*
        Check whether the employee has submitted any tickets.
    */
    if (!tickets || tickets.length === 0) {

        ticketsMessage.textContent =
            'You have not submitted any tickets yet.';

        return;
    }


    /*
        Clear the loading message because tickets were found.
    */
    ticketsMessage.textContent =
        `${tickets.length} ticket(s) found.`;


    /*
        Loop through every ticket returned by the backend.
    */
    tickets.forEach(function (ticket) {

        /*
            Create a new article element for the ticket.
        */
        const ticketElement = document.createElement('article');


        /*
            Add a CSS class so we can style ticket cards later.
        */
        ticketElement.className = 'ticket-card';


        /*
            Add the ticket information to the page.

            textContent is used for user-provided values
            rather than inserting raw HTML.
        */
        const ticketTitle = document.createElement('h3');
        ticketTitle.textContent = ticket.subject;


        const ticketDescription = document.createElement('p');
        ticketDescription.textContent = ticket.description;


        const ticketCategory = document.createElement('p');
        ticketCategory.textContent =
            `Category: ${ticket.category}`;


        const ticketPriority = document.createElement('p');
        ticketPriority.textContent =
            `Priority: ${ticket.priority}`;


        const ticketStatus = document.createElement('p');
        ticketStatus.textContent =
            `Status: ${ticket.status}`;


        const ticketDate = document.createElement('p');
        ticketDate.textContent =
            `Submitted: ${ticket.created_at}`;


        /*
            Add all ticket information to the ticket article.
        */
        ticketElement.appendChild(ticketTitle);

        ticketElement.appendChild(ticketDescription);

        ticketElement.appendChild(ticketCategory);

        ticketElement.appendChild(ticketPriority);

        ticketElement.appendChild(ticketStatus);

        ticketElement.appendChild(ticketDate);


        /*
            Add the completed ticket card to the page.
        */
        ticketsContainer.appendChild(ticketElement);
    });
}


/* ============================================================
   6. LOGOUT
   ============================================================ */

/*
    Listen for the employee clicking the Logout button.
*/
logoutButton.addEventListener('click', function () {

    /*
        Remove the JWT token from the browser.
    */
    localStorage.removeItem('authToken');


    /*
        Hide the My Tickets section.
    */
    ticketsSection.hidden = true;


    /*
        Show the login section again.
    */
    loginSection.hidden = false;


    /*
        Clear the login form fields.
    */
    loginForm.reset();


    /*
        Clear previous ticket information.
    */
    ticketsContainer.innerHTML = '';


    /*
        Clear the ticket status message.
    */
    ticketsMessage.textContent = '';


    /*
        Display a logout confirmation.
    */
    loginMessage.textContent = 'You have been logged out.';
});


/* ============================================================
   7. CHECK EXISTING LOGIN
   ============================================================ */

/*
    When the page loads, check whether a JWT token already
    exists in localStorage.

    If one exists, we attempt to load the employee's tickets.
*/
const existingToken = localStorage.getItem('authToken');


if (existingToken) {

    /*
        Hide the login section because a token already exists.
    */
    loginSection.hidden = true;


    /*
        Show the My Tickets section.
    */
    ticketsSection.hidden = false;


    /*
        Request the employee's tickets.
    */
    loadMyTickets();
}