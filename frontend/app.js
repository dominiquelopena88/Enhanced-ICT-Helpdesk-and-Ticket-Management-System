/*
    ============================================================
    ENHANCED ICT HELPDESK
    FRONTEND JAVASCRIPT
    ============================================================
*/


/*
    ============================================================
    API CONFIGURATION
    ============================================================
*/

const API_BASE_URL = '/api';


/*
    ============================================================
    SESSION MANAGEMENT
    ============================================================
*/

function saveSession(token, user) {

    localStorage.setItem(
        'token',
        token
    );

    localStorage.setItem(
        'user',
        JSON.stringify(user)
    );
}


function getToken() {

    return localStorage.getItem('token');
}


function getUser() {

    const savedUser =
        localStorage.getItem('user');

    if (!savedUser) {
        return null;
    }

    try {

        return JSON.parse(savedUser);

    } catch (error) {

        return null;
    }
}


function clearSession() {

    localStorage.removeItem('token');

    localStorage.removeItem('user');
}


/*
    ============================================================
    HTML SAFETY
    ============================================================
*/

function escapeHtml(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return '';
    }

    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}


/*
    ============================================================
    API REQUEST HELPER
    ============================================================
*/

async function apiRequest(
    endpoint,
    options = {}
) {

    const token =
        getToken();

    const headers = {
        ...(options.body
            ? {
                'Content-Type':
                    'application/json'
            }
            : {})
    };


    if (token) {

        headers.Authorization =
            `Bearer ${token}`;
    }


    let response;

    try {

        response =
            await fetch(
                `${API_BASE_URL}${endpoint}`,
                {
                    ...options,

                    headers: {
                        ...headers,
                        ...(options.headers || {})
                    }
                }
            );

    } catch (error) {

        throw new Error(
            'Unable to connect to the server. Please make sure the system is running.'
        );
    }


    const responseText =
        await response.text();

    let data = {};


    if (responseText) {

        try {

            data =
                JSON.parse(responseText);

        } catch (error) {

            data = {
                message:
                    responseText
            };
        }
    }


    if (!response.ok) {

        const error =
            new Error(
                data.message ||
                data.error ||
                `Request failed with status ${response.status}.`
            );

        error.status =
            response.status;

        throw error;
    }


    return data;
}


/*
    ============================================================
    ELEMENTS
    ============================================================
*/


/*
    ------------------------------------------------------------
    LOGIN
    ------------------------------------------------------------
*/

const loginSection =
    document.getElementById(
        'loginSection'
    );

const loginForm =
    document.getElementById(
        'loginForm'
    );

const loginEmail =
    document.getElementById(
        'loginEmail'
    );

const loginPassword =
    document.getElementById(
        'loginPassword'
    );

const loginMessage =
    document.getElementById(
        'loginMessage'
    );


/*
    ------------------------------------------------------------
    REGISTRATION
    ------------------------------------------------------------
*/

const registrationSection =
    document.getElementById(
        'registrationSection'
    );

const registrationForm =
    document.getElementById(
        'registrationForm'
    );

const registerName =
    document.getElementById(
        'registerName'
    );

const registerEmail =
    document.getElementById(
        'registerEmail'
    );

const registerPassword =
    document.getElementById(
        'registerPassword'
    );

const registrationMessage =
    document.getElementById(
        'registrationMessage'
    );

const showRegistrationButton =
    document.getElementById(
        'showRegistrationButton'
    );

const showLoginButton =
    document.getElementById(
        'showLoginButton'
    );


/*
    ------------------------------------------------------------
    EMPLOYEE
    ------------------------------------------------------------
*/

const employeeSection =
    document.getElementById(
        'employeeSection'
    );

const employeeWelcome =
    document.getElementById(
        'employeeWelcome'
    );

const logoutButton =
    document.getElementById(
        'logoutButton'
    );

const dashboardSection =
    document.getElementById(
        'dashboardSection'
    );

const submitTicketSection =
    document.getElementById(
        'submitTicketSection'
    );

const myTicketsSection =
    document.getElementById(
        'myTicketsSection'
    );

const trackTicketSection =
    document.getElementById(
        'trackTicketSection'
    );


/*
    ------------------------------------------------------------
    EMPLOYEE COUNTERS
    ------------------------------------------------------------
*/

const totalTicketsCount =
    document.getElementById(
        'totalTicketsCount'
    );

const openTicketsCount =
    document.getElementById(
        'openTicketsCount'
    );

const inProgressTicketsCount =
    document.getElementById(
        'inProgressTicketsCount'
    );

const resolvedTicketsCount =
    document.getElementById(
        'resolvedTicketsCount'
    );


/*
    ------------------------------------------------------------
    EMPLOYEE BUTTONS
    ------------------------------------------------------------
*/

const showSubmitTicketButton =
    document.getElementById(
        'showSubmitTicketButton'
    );

const showMyTicketsButton =
    document.getElementById(
        'showMyTicketsButton'
    );

const showTrackTicketButton =
    document.getElementById(
        'showTrackTicketButton'
    );

const backToEmployeeDashboardButton =
    document.getElementById(
        'backToEmployeeDashboardButton'
    );

const backFromMyTicketsButton =
    document.getElementById(
        'backFromMyTicketsButton'
    );

const backFromTrackTicketButton =
    document.getElementById(
        'backFromTrackTicketButton'
    );


/*
    ------------------------------------------------------------
    TICKET FORM
    ------------------------------------------------------------
*/

const ticketForm =
    document.getElementById(
        'ticketForm'
    );

const ticketTitle =
    document.getElementById(
        'ticketTitle'
    );

const ticketCategory =
    document.getElementById(
        'ticketCategory'
    );

const ticketDescription =
    document.getElementById(
        'ticketDescription'
    );

const ticketMessage =
    document.getElementById(
        'ticketMessage'
    );


/*
    ------------------------------------------------------------
    MY TICKETS
    ------------------------------------------------------------
*/

const myTicketsTableBody =
    document.getElementById(
        'myTicketsTableBody'
    );


/*
    ------------------------------------------------------------
    TRACK TICKET
    ------------------------------------------------------------
*/

const trackTicketForm =
    document.getElementById(
        'trackTicketForm'
    );

const trackTicketId =
    document.getElementById(
        'trackTicketId'
    );

const trackTicketMessage =
    document.getElementById(
        'trackTicketMessage'
    );

const trackedTicketResult =
    document.getElementById(
        'trackedTicketResult'
    );


/*
    ------------------------------------------------------------
    ACCESSIBILITY
    ------------------------------------------------------------
*/

const accessibilityButton =
    document.getElementById(
        'accessibilityButton'
    );

const accessibilityPanel =
    document.getElementById(
        'accessibilityPanel'
    );

const decreaseTextButton =
    document.getElementById(
        'decreaseTextButton'
    );

const resetTextButton =
    document.getElementById(
        'resetTextButton'
    );

const increaseTextButton =
    document.getElementById(
        'increaseTextButton'
    );

const contrastButton =
    document.getElementById(
        'contrastButton'
    );

const resetAccessibilityButton =
    document.getElementById(
        'resetAccessibilityButton'
    );


/*
    ------------------------------------------------------------
    TECHNICIAN
    ------------------------------------------------------------
*/

const technicianSection =
    document.getElementById(
        'technicianSection'
    );

const technicianWelcome =
    document.getElementById(
        'technicianWelcome'
    );

const technicianLogoutButton =
    document.getElementById(
        'technicianLogoutButton'
    );

const technicianAssignedCount =
    document.getElementById(
        'technicianAssignedCount'
    );

const technicianOpenCount =
    document.getElementById(
        'technicianOpenCount'
    );

const technicianInProgressCount =
    document.getElementById(
        'technicianInProgressCount'
    );

const technicianResolvedCount =
    document.getElementById(
        'technicianResolvedCount'
    );

const technicianTicketsTableBody =
    document.getElementById(
        'technicianTicketsTableBody'
    );

const refreshTechnicianTicketsButton =
    document.getElementById(
        'refreshTechnicianTicketsButton'
    );

const technicianTicketDetailsSection =
    document.getElementById(
        'technicianTicketDetailsSection'
    );

const technicianTicketDetails =
    document.getElementById(
        'technicianTicketDetails'
    );

const backToTechnicianDashboardButton =
    document.getElementById(
        'backToTechnicianDashboardButton'
    );

const technicianUpdateTicketForm =
    document.getElementById(
        'technicianUpdateTicketForm'
    );

const technicianTicketStatus =
    document.getElementById(
        'technicianTicketStatus'
    );

const technicianTicketComment =
    document.getElementById(
        'technicianTicketComment'
    );

const technicianUpdateMessage =
    document.getElementById(
        'technicianUpdateMessage'
    );

const technicianTicketMessage =
    document.getElementById(
        'technicianTicketMessage'
    );


/*
    ------------------------------------------------------------
    ADMIN
    ------------------------------------------------------------
*/

const adminSection =
    document.getElementById(
        'adminSection'
    );

const adminWelcome =
    document.getElementById(
        'adminWelcome'
    );

const adminLogoutButton =
    document.getElementById(
        'adminLogoutButton'
    );

const adminTotalUsersCount =
    document.getElementById(
        'adminTotalUsersCount'
    );

const adminEmployeeCount =
    document.getElementById(
        'adminEmployeeCount'
    );

const adminTechnicianCount =
    document.getElementById(
        'adminTechnicianCount'
    );

const adminTicketCount =
    document.getElementById(
        'adminTicketCount'
    );

const adminOpenTicketCount = 
    document.getElementById(
        'adminOpenTicketCount'
    );
    
const adminInProgressTicketCount = 
    document.getElementById(
        'adminInProgressTicketCount'
    );    

const adminUsersContainer =
    document.getElementById(
        'adminUsersContainer'
    );

const adminTechniciansContainer =
    document.getElementById(
        'adminTechniciansContainer'
    );

const adminTicketsContainer =
    document.getElementById(
        'adminTicketsContainer'
    );

    const analyticsTotalTickets =
    document.getElementById(
        'analyticsTotalTickets'
    );

const analyticsOpenTickets =
    document.getElementById(
        'analyticsOpenTickets'
    );

const analyticsInProgressTickets =
    document.getElementById(
        'analyticsInProgressTickets'
    );

const analyticsResolvedTickets =
    document.getElementById(
        'analyticsResolvedTickets'
    );

const analyticsStatusContainer =
    document.getElementById(
        'analyticsStatusContainer'
    );

const analyticsCategoryContainer =
    document.getElementById(
        'analyticsCategoryContainer'
    );

const analyticsPriorityContainer =
    document.getElementById(
        'analyticsPriorityContainer'
    );

const analyticsTechnicianContainer =
    document.getElementById(
        'analyticsTechnicianContainer'
    );    

const analyticsFromDate =
    document.getElementById(
        'analyticsFromDate'
    );

const analyticsToDate =
    document.getElementById(
        'analyticsToDate'
    );

const applyAnalyticsFilter =
    document.getElementById(
        'applyAnalyticsFilter'
    );

const clearAnalyticsFilter =
    document.getElementById(
        'clearAnalyticsFilter'
    );

const adminTicketsSection =
    document.getElementById(
        'adminTicketsSection'
    );

const exportAnalyticsButton =
    document.getElementById(
        'exportAnalyticsButton'
    );


/*
    ============================================================
    DISPLAY HELPERS
    ============================================================
*/

function hideElement(element) {

    if (!element) {
        return;
    }

    element.style.display =
        'none';
}


function showElement(
    element,
    display = 'block'
) {

    if (!element) {
        return;
    }

    element.style.display =
        display;
}


function hideAllSections() {

    hideElement(loginSection);

    hideElement(registrationSection);

    hideElement(employeeSection);

    hideElement(technicianSection);

    hideElement(adminSection);
}


/*
    ============================================================
    LOGIN / REGISTRATION NAVIGATION
    ============================================================
*/

function showLogin() {

    hideAllSections();

    showElement(
        loginSection
    );
}


function showRegistration() {

    hideAllSections();

    showElement(
        registrationSection
    );
}


if (showRegistrationButton) {

    showRegistrationButton.addEventListener(
        'click',
        showRegistration
    );
}


if (showLoginButton) {

    showLoginButton.addEventListener(
        'click',
        showLogin
    );
}


/*
    ============================================================
    LOGIN
    ============================================================
*/

if (loginForm) {

    loginForm.addEventListener(
        'submit',
        async function (event) {

            event.preventDefault();


            if (loginMessage) {

                loginMessage.textContent =
                    'Logging in...';
            }


            try {

                const data =
                    await apiRequest(
                        '/auth/login',
                        {
                            method: 'POST',

                            body:
                                JSON.stringify({
                                    email:
                                        loginEmail.value.trim(),

                                    password:
                                        loginPassword.value
                                })
                        }
                    );


                const token =
                    data.token ||
                    data.accessToken ||
                    data.access_token;


                if (!token) {

                    throw new Error(
                        'Login succeeded but no authentication token was returned.'
                    );
                }


                const user =
                    data.user || {
                        id:
                            data.id,

                        full_name:
                            data.full_name,

                        email:
                            data.email,

                        role:
                            data.role
                    };


                saveSession(
                    token,
                    user
                );


                if (loginMessage) {

                    loginMessage.textContent =
                        '';
                }


                loginForm.reset();


                handleLoginByRole(
                    user
                );

            } catch (error) {

                if (loginMessage) {

                    loginMessage.textContent =
                        error.message ||
                        'Login failed.';
                }
            }
        }
    );
}


/*
    ============================================================
    ROLE-BASED ACCESS
    ============================================================
*/

function handleLoginByRole(user) {

    hideAllSections();


    /*
        --------------------------------------------------------
        EMPLOYEE
        --------------------------------------------------------
    */

    if (
        user.role ===
        'employee'
    ) {

        showElement(
            employeeSection
        );


        if (employeeWelcome) {

            employeeWelcome.innerHTML = `
                <span class="welcome-label">
                    Welcome back
                </span>

                <span class="user-role">
                    Employee
                </span>

                <span class="user-name">
                    ${escapeHtml(
                        user.full_name ||
                        user.email
                    )}
                </span>
            `;
        }


        showEmployeeDashboard();

        return;
    }


    /*
        --------------------------------------------------------
        ICT TECHNICIAN
        --------------------------------------------------------
    */

    if (
        user.role ===
        'ict_technician'
    ) {

        showElement(
            technicianSection
        );


        if (technicianWelcome) {

            technicianWelcome.innerHTML = `
                <span class="welcome-label">
                    Welcome back
                </span>

                <span class="user-role">
                    ICT Technician
                </span>

                <span class="user-name">
                    ${escapeHtml(
                        user.full_name ||
                        user.email
                    )}
                </span>
            `;
        }


        loadTechnicianDashboard();

        return;
    }


    /*
        --------------------------------------------------------
        ADMINISTRATOR
        --------------------------------------------------------
    */

    if (
        user.role ===
        'administrator'
    ) {

        showElement(
            adminSection
        );


        if (adminWelcome) {

            adminWelcome.innerHTML = `
                <span class="welcome-label">
                    Welcome back
                </span>

                <span class="user-role">
                    Administrator
                </span>

                <span class="user-name">
                    ${escapeHtml(
                        user.full_name ||
                        user.email
                    )}
                </span>
            `;
        }


        showAdminModule(
            'dashboard'
        );

        return;
    }


    clearSession();

    showLogin();


    if (loginMessage) {

        loginMessage.textContent =
            'Unsupported user role.';
    }
}


/*
    ============================================================
    REGISTRATION
    ============================================================
*/

if (registrationForm) {

    registrationForm.addEventListener(
        'submit',
        async function (event) {

            event.preventDefault();


            if (registrationMessage) {

                registrationMessage.textContent =
                    'Creating account...';
            }


            try {

                await apiRequest(
                    '/auth/register',
                    {
                        method: 'POST',

                        body:
                            JSON.stringify({

                                full_name:
                                    registerName.value.trim(),

                                email:
                                    registerEmail.value.trim(),

                                password:
                                    registerPassword.value
                            })
                    }
                );


                if (registrationMessage) {

                    registrationMessage.textContent =
                        'Registration successful. You can now log in.';
                }


                registrationForm.reset();

            } catch (error) {

                if (registrationMessage) {

                    registrationMessage.textContent =
                        error.message ||
                        'Registration failed.';
                }
            }
        }
    );
}


/*
    ============================================================
    EMPLOYEE DASHBOARD
    ============================================================
*/

function showEmployeeDashboard() {

    hideElement(
        submitTicketSection
    );

    hideElement(
        myTicketsSection
    );

    hideElement(
        trackTicketSection
    );


    showElement(
        dashboardSection
    );


    loadMyTickets();
}


function showSubmitTicket() {

    hideElement(
        dashboardSection
    );

    hideElement(
        myTicketsSection
    );

    hideElement(
        trackTicketSection
    );


    showElement(
        submitTicketSection
    );


    if (ticketMessage) {

        ticketMessage.textContent =
            '';
    }
}


function showMyTickets() {

    hideElement(
        dashboardSection
    );

    hideElement(
        submitTicketSection
    );

    hideElement(
        trackTicketSection
    );


    showElement(
        myTicketsSection
    );


    loadMyTickets();
}


function showTrackTicket() {

    hideElement(
        dashboardSection
    );

    hideElement(
        submitTicketSection
    );

    hideElement(
        myTicketsSection
    );


    showElement(
        trackTicketSection
    );


    if (trackTicketMessage) {

        trackTicketMessage.textContent =
            '';
    }


    if (trackedTicketResult) {

        hideElement(
            trackedTicketResult
        );
    }
}


if (showSubmitTicketButton) {

    showSubmitTicketButton.addEventListener(
        'click',
        showSubmitTicket
    );
}


if (showMyTicketsButton) {

    showMyTicketsButton.addEventListener(
        'click',
        showMyTickets
    );
}


if (showTrackTicketButton) {

    showTrackTicketButton.addEventListener(
        'click',
        showTrackTicket
    );
}


if (backToEmployeeDashboardButton) {

    backToEmployeeDashboardButton.addEventListener(
        'click',
        showEmployeeDashboard
    );
}


if (backFromMyTicketsButton) {

    backFromMyTicketsButton.addEventListener(
        'click',
        showEmployeeDashboard
    );
}


if (backFromTrackTicketButton) {

    backFromTrackTicketButton.addEventListener(
        'click',
        showEmployeeDashboard
    );
}


/*
    ============================================================
    EMPLOYEE - MY TICKETS
    ============================================================
*/

async function loadMyTickets() {

    if (!getToken()) {
        return;
    }


    try {

        const data =
            await apiRequest(
                '/tickets',
                {
                    method: 'GET'
                }
            );


        const tickets =
            data.tickets || [];


        displayMyTickets(
            tickets
        );


        updateEmployeeDashboard(
            tickets
        );

    } catch (error) {

        if (myTicketsTableBody) {

            myTicketsTableBody.innerHTML = `
                <tr>
                    <td colspan="8">
                        ${escapeHtml(
                            error.message ||
                            'Unable to load tickets.'
                        )}
                    </td>
                </tr>
            `;
        }
    }
}


/*
    ============================================================
    EMPLOYEE - DISPLAY MY TICKETS
    ============================================================
*/

function displayMyTickets(tickets) {

    if (!myTicketsTableBody) {
        return;
    }


    myTicketsTableBody.innerHTML = '';


    if (
        !tickets ||
        tickets.length === 0
    ) {

        myTicketsTableBody.innerHTML = `
            <tr>
                <td colspan="8">
                    No tickets found.
                </td>
            </tr>
        `;

        return;
    }


    tickets.forEach(ticket => {

        const row =
            document.createElement('tr');


        /*
            ----------------------------------------------------
            ASSIGNED TECHNICIAN
            ----------------------------------------------------
        */

        const assignedTechnician =
            ticket.assigned_technician ||
            ticket.technician_name ||
            ticket.assignedTechnician ||
            '';


        /*
            ----------------------------------------------------
            TECHNICIAN COMMENT
            ----------------------------------------------------
        */

        const technicianComment =
            ticket.technician_comment ||
            ticket.technicianComment ||
            'No update yet.';


        /*
            ----------------------------------------------------
            RESOLVED BY
            ----------------------------------------------------
        */

        const resolvedBy =
            ticket.resolved_by_name ||
            ticket.resolved_by ||
            ticket.resolvedBy ||
            '';


        /*
            ----------------------------------------------------
            RESOLVED DATE
            ----------------------------------------------------
        */

        const resolvedDate =
            ticket.resolved_at ||
            ticket.resolved_date ||
            ticket.resolvedAt ||
            null;


        /*
            ----------------------------------------------------
            CREATE TABLE ROW
            ----------------------------------------------------
        */

        row.innerHTML = `

            <td>
                ${escapeHtml(
                    ticket.id ?? ''
                )}
            </td>

            <td>
                ${escapeHtml(
                    ticket.subject ??
                    ticket.title ??
                    ''
                )}
            </td>

            <td>
                ${escapeHtml(
                    ticket.category ?? ''
                )}
            </td>

            <td>
                ${escapeHtml(
                    ticket.status ?? ''
                )}
            </td>

            <td>
                ${escapeHtml(
                    assignedTechnician ||
                    'Unassigned'
                )}
            </td>

            <td>
                ${escapeHtml(
                    technicianComment
                )}
            </td>

            <td>
                ${escapeHtml(
                    resolvedBy ||
                    'Not Resolved'
                )}
            </td>

            <td>
                ${
                    resolvedDate
                        ? escapeHtml(
                            formatDate(
                                resolvedDate
                            )
                        )
                        : 'Not resolved'
                }
            </td>

        `;


        myTicketsTableBody.appendChild(
            row
        );

    });
}

/*
    ============================================================
    EMPLOYEE DASHBOARD COUNTERS
    ============================================================
*/

function updateEmployeeDashboard(tickets) {

    const total =
        tickets.length;


    const open =
        tickets.filter(
            ticket =>
                String(
                    ticket.status
                ).toLowerCase() ===
                'open'
        ).length;


    const inProgress =
        tickets.filter(
            ticket =>
                String(
                    ticket.status
                ).toLowerCase() ===
                'in progress'
        ).length;


    const resolved =
        tickets.filter(
            ticket =>
                String(
                    ticket.status
                ).toLowerCase() ===
                'resolved'
        ).length;


    if (totalTicketsCount) {

        totalTicketsCount.textContent =
            total;
    }


    if (openTicketsCount) {

        openTicketsCount.textContent =
            open;
    }


    if (inProgressTicketsCount) {

        inProgressTicketsCount.textContent =
            inProgress;
    }


    if (resolvedTicketsCount) {

        resolvedTicketsCount.textContent =
            resolved;
    }
}


/*
    ============================================================
    EMPLOYEE - SUBMIT TICKET
    ============================================================
*/

if (ticketForm) {

    ticketForm.addEventListener(
        'submit',
        async function (event) {

            event.preventDefault();


            if (!getToken()) {
                return;
            }


            if (ticketMessage) {

                ticketMessage.textContent =
                    'Submitting ticket...';
            }


            try {

                const data =
                    await apiRequest(
                        '/tickets',
                        {
                            method: 'POST',

                            body:
                                JSON.stringify({

                                    subject:
                                        ticketTitle.value.trim(),

                                    description:
                                        ticketDescription.value.trim(),

                                    priority:
                                        'Medium'
                                })
                        }
                    );


                const ticketId =
                    data.ticketId ||
                    data.id ||
                    '';


                let message =
                    `Ticket submitted successfully. Ticket ID: ${ticketId}`;


                if (
                    data.assigned_technician
                ) {

                    message +=
                        ` Assigned technician: ${
                            data.assigned_technician.name ||
                            data.assigned_technician.full_name ||
                            'Assigned'
                        }.`;
                }


                if (ticketMessage) {

                    ticketMessage.textContent =
                        message;
                }


                ticketForm.reset();


                await loadMyTickets();

            } catch (error) {

                if (ticketMessage) {

                    ticketMessage.textContent =
                        error.message ||
                        'Unable to submit ticket.';
                }
            }
        }
    );
}


/*
    ============================================================
    EMPLOYEE - TRACK TICKET
    ============================================================
*/

if (trackTicketForm) {

    trackTicketForm.addEventListener(
        'submit',
        async function (event) {

            event.preventDefault();


            if (!getToken()) {
                return;
            }


            const requestedTicketId =
                Number(
                    trackTicketId.value
                );


            if (!requestedTicketId) {

                if (trackTicketMessage) {

                    trackTicketMessage.textContent =
                        'Please enter a valid ticket ID.';
                }

                return;
            }


            if (trackTicketMessage) {

                trackTicketMessage.textContent =
                    'Loading ticket...';
            }


            hideElement(
                trackedTicketResult
            );


            try {

                /*
                    The employee endpoint already
                    returns only the employee's own tickets.
                */

                const data =
                    await apiRequest(
                        '/tickets',
                        {
                            method: 'GET'
                        }
                    );


                const tickets =
                    data.tickets || [];


                const ticket =
                    tickets.find(
                        item =>
                            Number(item.id) ===
                            requestedTicketId
                    );


                if (!ticket) {

                    if (trackTicketMessage) {

                        trackTicketMessage.textContent =
                            'Ticket not found or does not belong to your account.';
                    }

                    return;
                }


                const assignedTechnician =
                    ticket.assigned_technician ||
                    'Unassigned';


                const technicianComment =
                    ticket.technician_comment ||
                    'No update yet.';


                const resolvedBy =
                    ticket.resolved_by_name ||
                    ticket.resolved_by ||
                    ticket.resolvedBy ||
                    'Not resolved';


                const resolvedDate =
                    ticket.resolved_at ||
                    '';


                if (trackedTicketResult) {

                    trackedTicketResult.innerHTML = `

                        <h3>
                            Ticket #${escapeHtml(
                                ticket.id
                            )}
                        </h3>

                        <p>
                            <strong>Title:</strong>
                            ${escapeHtml(
                                ticket.subject
                            )}
                        </p>

                        <p>
                            <strong>Category:</strong>
                            ${escapeHtml(
                                ticket.category
                            )}
                        </p>

                        <p>
                            <strong>Description:</strong>
                            ${escapeHtml(
                                ticket.description
                            )}
                        </p>

                        <p>
                            <strong>Priority:</strong>
                            ${escapeHtml(
                                ticket.priority
                            )}
                        </p>

                        <p>
                            <strong>Status:</strong>
                            ${escapeHtml(
                                ticket.status ||
                                ''
                            )}
                        </p>

                        <p>
                            <strong>Assigned Technician:</strong>
                            ${escapeHtml(
                                assignedTechnician
                            )}
                        </p>

                        <p>
                            <strong>Technician Update:</strong>
                            ${escapeHtml(
                                technicianComment
                            )}
                        </p>

                        <p>
                            <strong>Resolved By:</strong>
                            ${escapeHtml(
                                resolvedBy
                            )}
                        </p>

                        <p>
                            <strong>Resolved Date:</strong>
                            ${
                                resolvedDate
                                    ? escapeHtml(
                                        formatDate(
                                            resolvedDate
                                        )
                                    )
                                    : 'Not resolved'
                            }
                        </p>

                        <p>
                            <strong>Created Date:</strong>
                            ${
                                ticket.created_at
                                    ? escapeHtml(
                                        formatDate(
                                            ticket.created_at
                                        )
                                    )
                                    : 'Not available'
                            }
                        </p>
                    `;


                    showElement(
                        trackedTicketResult
                    );
                }


                if (trackTicketMessage) {

                    trackTicketMessage.textContent =
                        '';
                }

            } catch (error) {

                if (trackTicketMessage) {

                    trackTicketMessage.textContent =
                        error.message ||
                        'Unable to load ticket.';
                }
            }
        }
    );
}


/*
    ============================================================
    TECHNICIAN DASHBOARD
    ============================================================
*/

function showTechnicianDashboard() {

    hideElement(
        technicianTicketDetailsSection
    );


    const technicianDashboard =
        document.querySelector(
            '.technician-dashboard'
        );


    showElement(
        technicianDashboard
    );


    loadTechnicianDashboard();
}


async function loadTechnicianDashboard() {

    if (!getToken()) {
        return;
    }


    try {

        const data =
            await apiRequest(
                '/technician/dashboard',
                {
                    method: 'GET'
                }
            );


        const dashboard =
            data.dashboard || {};


        if (technicianAssignedCount) {

            technicianAssignedCount.textContent =
                dashboard.total_tickets || 0;
        }


        if (technicianOpenCount) {

            technicianOpenCount.textContent =
                dashboard.open_tickets || 0;
        }


        if (technicianInProgressCount) {

            technicianInProgressCount.textContent =
                dashboard.in_progress_tickets || 0;
        }


        if (technicianResolvedCount) {

            technicianResolvedCount.textContent =
                dashboard.resolved_tickets || 0;
        }

    } catch (error) {

        /*
            Ticket loading below will still run.
        */
    }


    await loadTechnicianTickets();
}


/*
    ============================================================
    TECHNICIAN TICKETS
    ============================================================
*/

let technicianTickets = [];

async function loadTechnicianTickets() {

    if (!getToken()) {
        return;
    }


    try {

        const data =
            await apiRequest(
                '/technician/tickets',
                {
                    method: 'GET'
                }
            );


        const tickets =
            data.tickets || [];


        technicianTickets =
            tickets;


        applyTechnicianTicketFilters();


        updateTechnicianCounts(
            tickets
        );


        if (technicianTicketMessage) {

            technicianTicketMessage.textContent =
                '';
        }

    } catch (error) {

        if (technicianTicketMessage) {

            technicianTicketMessage.textContent =
                error.message ||
                'Unable to load assigned tickets.';
        }
    }
}

/*
    ============================================================
    SCRUM-30 - FILTER TECHNICIAN TICKETS
    ============================================================
*/

function applyTechnicianTicketFilters() {

    const searchValue =
        technicianTicketSearch
            ? technicianTicketSearch.value
                .trim()
                .toLowerCase()
            : '';


    const statusValue =
        technicianStatusFilter
            ? technicianStatusFilter.value
            : '';


    const priorityValue =
        technicianPriorityFilter
            ? technicianPriorityFilter.value
            : '';


    const categoryValue =
        technicianCategoryFilter
            ? technicianCategoryFilter.value
            : '';


    const filteredTickets =
        technicianTickets.filter(
            ticket => {

                const subject =
                    String(
                        ticket.subject ||
                        ticket.title ||
                        ''
                    ).toLowerCase();


                const category =
                    String(
                        ticket.category ||
                        ''
                    ).toLowerCase();


                const matchesSearch =
                    !searchValue ||
                    subject.includes(
                        searchValue
                    ) ||
                    category.includes(
                        searchValue
                    );


                const matchesStatus =
                    !statusValue ||
                    String(
                        ticket.status ||
                        ''
                    ).toLowerCase() ===
                    statusValue.toLowerCase();


                const matchesPriority =
                    !priorityValue ||
                    String(
                        ticket.priority ||
                        ''
                    ).toLowerCase() ===
                    priorityValue.toLowerCase();


                const matchesCategory =
                    !categoryValue ||
                    String(
                        ticket.category ||
                        ''
                    ).toLowerCase() ===
                    categoryValue.toLowerCase();


                return (
                    matchesSearch &&
                    matchesStatus &&
                    matchesPriority &&
                    matchesCategory
                );
            }
        );


    displayTechnicianTickets(
        filteredTickets
    );
}


/*
    ============================================================
    SCRUM-30 - FILTER EVENTS
    ============================================================
*/

if (technicianTicketSearch) {

    technicianTicketSearch.addEventListener(
        'input',
        applyTechnicianTicketFilters
    );
}


if (technicianStatusFilter) {

    technicianStatusFilter.addEventListener(
        'change',
        applyTechnicianTicketFilters
    );
}


if (technicianPriorityFilter) {

    technicianPriorityFilter.addEventListener(
        'change',
        applyTechnicianTicketFilters
    );
}


if (technicianCategoryFilter) {

    technicianCategoryFilter.addEventListener(
        'change',
        applyTechnicianTicketFilters
    );
}


if (clearTechnicianFiltersButton) {

    clearTechnicianFiltersButton.addEventListener(
        'click',
        function () {

            if (technicianTicketSearch) {

                technicianTicketSearch.value =
                    '';
            }


            if (technicianStatusFilter) {

                technicianStatusFilter.value =
                    '';
            }


            if (technicianPriorityFilter) {

                technicianPriorityFilter.value =
                    '';
            }


            if (technicianCategoryFilter) {

                technicianCategoryFilter.value =
                    '';
            }


            applyTechnicianTicketFilters();
        }
    );
}

function updateTechnicianCounts(tickets) {

    if (technicianAssignedCount) {

        technicianAssignedCount.textContent =
            tickets.length;
    }


    if (technicianOpenCount) {

        technicianOpenCount.textContent =
            tickets.filter(
                ticket =>
                    String(
                        ticket.status
                    ).toLowerCase() ===
                    'open'
            ).length;
    }


    if (technicianInProgressCount) {

        technicianInProgressCount.textContent =
            tickets.filter(
                ticket =>
                    String(
                        ticket.status
                    ).toLowerCase() ===
                    'in progress'
            ).length;
    }


    if (technicianResolvedCount) {

        technicianResolvedCount.textContent =
            tickets.filter(
                ticket =>
                    String(
                        ticket.status
                    ).toLowerCase() ===
                    'resolved'
            ).length;
    }
}


function displayTechnicianTickets(tickets) {

    if (!technicianTicketsTableBody) {
        return;
    }


    technicianTicketsTableBody.innerHTML = '';


    if (
        !tickets ||
        tickets.length === 0
    ) {

        technicianTicketsTableBody.innerHTML = `
            <tr>
                <td colspan="8">
                    No tickets assigned to you.
                </td>
            </tr>
        `;

        return;
    }


    tickets.forEach(
        ticket => {
    
            const row =
                document.createElement('tr');
    
    
            // Get the assigned technician name.
            const assignedTechnician =
                ticket.assigned_technician ||
                ticket.technician_name ||
                ticket.assignedTechnician ||
                'Unassigned';
    
    
            // Get the technician who resolved the ticket.
            const resolvedBy =
                ticket.resolved_by_name ||
                ticket.resolvedBy ||
                ticket.resolved_by ||
                'Not Resolved';
    
    
            // Get the resolved date.
            const resolvedDate =
                ticket.resolved_at ||
                ticket.resolved_date ||
                ticket.resolvedAt ||
                '';
    
    
            row.innerHTML = `
    
                <!-- ID -->
                <td>
                    ${escapeHtml(
                        String(ticket.id ?? '')
                    )}
                </td>
    
    
                <!-- Title -->
                <td>
                    ${escapeHtml(
                        ticket.subject ??
                        ticket.title ??
                        ''
                    )}
                </td>
    
    
                <!-- Category -->
                <td>
                    ${escapeHtml(
                        ticket.category ?? ''
                    )}
                </td>
    
    
                <!-- Status -->
                <td>
                    ${escapeHtml(
                        ticket.status ?? ''
                    )}
                </td>
    
    
                <!-- Assigned Technician -->
                <td>
                    ${escapeHtml(
                        assignedTechnician
                    )}
                </td>
    
    
                <!-- Technician Update -->
                <td>
                    ${escapeHtml(
                        ticket.technician_comment ||
                        'No update yet.'
                    )}
                </td>
    
    
                <!-- Resolved By -->
                <td>
                    ${escapeHtml(
                        resolvedBy
                    )}
                </td>
    
    
                <!-- Resolved Date -->
                <td>
                    ${
                        resolvedDate
                            ? escapeHtml(
                                formatDate(
                                    resolvedDate
                                )
                            )
                            : 'Not resolved'
                    }
                </td>
    
    
                <!-- View -->
                <td>
                    <button
                        type="button"
                        class="secondary-button"
                        onclick="viewTechnicianTicket(${Number(
                            ticket.id
                        )})"
                    >
                        View
                    </button>
                </td>
    
            `;
    
    
            technicianTicketsTableBody.appendChild(
                row
            );
        }
    );
   
}


/*
    ============================================================
    VIEW TECHNICIAN TICKET
    ============================================================
*/

async function viewTechnicianTicket(ticketId) {

    if (!getToken()) {
        return;
    }


    try {

        const data =
            await apiRequest(
                `/technician/tickets/${ticketId}`,
                {
                    method: 'GET'
                }
            );


        const ticket =
            data.ticket;


        if (!ticket) {

            throw new Error(
                'Ticket information was not returned.'
            );
        }


        if (technicianTicketDetails) {

            technicianTicketDetails.innerHTML = `

                <h3>
                    Ticket #${escapeHtml(
                        ticket.id
                    )}
                </h3>

                <p>
                    <strong>Employee:</strong>
                    ${escapeHtml(
                        ticket.employee_name
                    )}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${escapeHtml(
                        ticket.employee_email
                    )}
                </p>

                <p>
                    <strong>Title:</strong>
                    ${escapeHtml(
                        ticket.subject
                    )}
                </p>

                <p>
                    <strong>Category:</strong>
                    ${escapeHtml(
                        ticket.category
                    )}
                </p>

                <p>
                    <strong>Priority:</strong>
                    ${escapeHtml(
                        ticket.priority
                    )}
                </p>

                <p>
                    <strong>Description:</strong>
                    ${escapeHtml(
                        ticket.description
                    )}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${escapeHtml(
                        ticket.status
                    )}
                </p>

                <p>
                    <strong>Technician Update:</strong>
                    ${escapeHtml(
                        ticket.technician_comment || 
                        'No update yet.'
                    )}
                </p>

                <p>
                    <strong>Assigned Date:</strong>
                    ${
                        ticket.assigned_at
                            ? escapeHtml(
                                formatDate(
                                    ticket.assigned_at
                                )
                            )
                            : 'Not available'
                    }
                </p>

                <p>
                    <strong>Resolved By:</strong>
                    ${escapeHtml(
                        ticket.resolved_by ||
                        ticket.resolved_by_name ||
                        'Not resolved'
                    )}
                </p>

                <p>
                    <strong>Resolved Date:</strong>
                    ${
                        ticket.resolved_at
                            ? escapeHtml(
                                formatDate(
                                    ticket.resolved_at
                                )
                            )
                            : 'Not resolved'
                    }
                </p>
            `;
        }


        if (technicianTicketStatus) {

            technicianTicketStatus.value =
                ticket.status ||
                'Open';
        }


        if (technicianTicketComment) {

            technicianTicketComment.value =
                ticket.technician_comment ||
                '';
        }


        if (technicianUpdateTicketForm) {

            technicianUpdateTicketForm.dataset.ticketId =
                ticket.id;
        }


        hideElement(
            document.querySelector(
                '.technician-dashboard'
            )
        );


        showElement(
            technicianTicketDetailsSection
        );


        if (technicianUpdateMessage) {

            technicianUpdateMessage.textContent =
                '';
        }

    } catch (error) {

        if (technicianTicketMessage) {

            technicianTicketMessage.textContent =
                error.message ||
                'Unable to load ticket.';
        }
    }
}


/*
    ============================================================
    TECHNICIAN UPDATE
    ============================================================
*/

if (technicianUpdateTicketForm) {

    technicianUpdateTicketForm.addEventListener(
        'submit',
        async function (event) {

            event.preventDefault();


            const ticketId =
                technicianUpdateTicketForm.dataset.ticketId;


            if (
                !getToken() ||
                !ticketId
            ) {

                return;
            }


            if (technicianUpdateMessage) {

                technicianUpdateMessage.textContent =
                    'Updating ticket...';
            }


            try {

                await apiRequest(
                    `/technician/tickets/${ticketId}/status`,
                    {
                        method: 'PUT',

                        body:
                            JSON.stringify({

                                status:
                                    technicianTicketStatus.value,

                                technician_comment:
                                    technicianTicketComment
                                        ? technicianTicketComment.value.trim()
                                        : ''
                            })
                    }
                );


                if (technicianUpdateMessage) {

                    technicianUpdateMessage.textContent =
                        'Ticket updated successfully.';
                }


                /*
                    Reload technician ticket list.
                */

                await loadTechnicianTickets();


                /*
                    Reload the current ticket.

                    This also means the saved technician
                    comment will immediately appear.
                */

                await viewTechnicianTicket(
                    ticketId
                );

            } catch (error) {

                if (technicianUpdateMessage) {

                    technicianUpdateMessage.textContent =
                        error.message ||
                        'Unable to update ticket.';
                }
            }
        }
    );
}


/*
    ============================================================
    TECHNICIAN NAVIGATION
    ============================================================
*/

if (refreshTechnicianTicketsButton) {

    refreshTechnicianTicketsButton.addEventListener(
        'click',
        loadTechnicianTickets
    );
}


if (backToTechnicianDashboardButton) {

    backToTechnicianDashboardButton.addEventListener(
        'click',
        showTechnicianDashboard
    );
}


/*
    ============================================================
    ADMIN DASHBOARD
    ============================================================
*/

function showAdminDashboard() {

    showAdminModule(
        'dashboard'
    );
}


async function loadAdminDashboard() {

    if (!getToken()) {
        return;
    }


    await loadAdminUsers();

    await loadAdminTechnicians();

    await loadAdminTickets();

    await loadTicketAnalytics();

    if (exportAnalyticsButton) {
        exportAnalyticsButton.addEventListener(
            'click',
            exportTicketAnalytics
        );
    }
}


/*
    ============================================================
    ADMIN - USERS
    ============================================================
*/

async function loadAdminUsers() {

    if (!getToken()) {
        return;
    }


    try {

        const data =
            await apiRequest(
                '/admin/users',
                {
                    method: 'GET'
                }
            );


        const users =
            data.users || [];


        updateAdminUserCounts(
            users
        );


        displayAdminUsers(
            users
        );

    } catch (error) {

        if (adminUsersContainer) {

            adminUsersContainer.innerHTML = `
                <p class="error-message">
                    ${escapeHtml(
                        error.message ||
                        'Unable to load users.'
                    )}
                </p>
            `;
        }
    }
}


function updateAdminUserCounts(users) {

    if (adminTotalUsersCount) {

        adminTotalUsersCount.textContent =
            users.length;
    }


    const employees =
        users.filter(
            user =>
                user.role ===
                'employee'
        ).length;


    const technicians =
        users.filter(
            user =>
                user.role ===
                'ict_technician'
        ).length;


    if (adminEmployeeCount) {

        adminEmployeeCount.textContent =
            employees;
    }


    if (adminTechnicianCount) {

        adminTechnicianCount.textContent =
            technicians;
    }
}


/*
    ============================================================
    ADMIN USERS TABLE
    ============================================================
*/

function displayAdminUsers(users) {

    if (!adminUsersContainer) {
        return;
    }


    if (
        !users ||
        users.length === 0
    ) {

        adminUsersContainer.innerHTML = `
            <div class="admin-empty-state">
                <p>No users found.</p>
            </div>
        `;

        return;
    }


    let html = `

        <div class="admin-table-wrapper">

            <table class="tickets-table admin-users-table">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Role</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>
    `;


    users.forEach(
        user => {

            html += `

                <tr>

                    <td>
                        ${escapeHtml(
                            user.id
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            user.full_name
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            user.email
                        )}
                    </td>

                    <td>

                        <select
                            id="role-${Number(
                                user.id
                            )}"
                            class="admin-role-select"
                        >

                            <option
                                value="employee"
                                ${
                                    user.role ===
                                    'employee'
                                        ? 'selected'
                                        : ''
                                }
                            >
                                Employee
                            </option>

                            <option
                                value="ict_technician"
                                ${
                                    user.role ===
                                    'ict_technician'
                                        ? 'selected'
                                        : ''
                                }
                            >
                                ICT Technician
                            </option>

                            <option
                                value="administrator"
                                ${
                                    user.role ===
                                    'administrator'
                                        ? 'selected'
                                        : ''
                                }
                            >
                                Administrator
                            </option>

                        </select>

                    </td>

                    <td>

                        <button
                            type="button"
                            class="primary-button admin-role-button"
                            onclick="updateUserRole(${Number(
                                user.id
                            )})"
                        >
                            Update Role
                        </button>

                    </td>

                </tr>
            `;
        }
    );


    html += `

                </tbody>

            </table>

        </div>
    `;


    adminUsersContainer.innerHTML =
        html;
}


/*
    ============================================================
    ADMIN - UPDATE USER ROLE
    ============================================================
*/

async function updateUserRole(userId) {

    if (!getToken()) {
        return;
    }


    const roleSelect =
        document.getElementById(
            `role-${userId}`
        );


    if (!roleSelect) {
        return;
    }


    try {

        await apiRequest(
            `/admin/users/${userId}/role`,
            {
                method: 'PUT',

                body:
                    JSON.stringify({
                        role:
                            roleSelect.value
                    })
            }
        );


        if (
            getUser() &&
            Number(getUser().id) ===
            Number(userId)
        ) {

            const currentUser =
                getUser();

            currentUser.role =
                roleSelect.value;

            saveSession(
                getToken(),
                currentUser
            );
        }


        await loadAdminUsers();

        await loadAdminTechnicians();

        await loadAdminTickets();

        alert(
            'User role updated successfully.'
        );

    } catch (error) {

        alert(
            error.message ||
            'Unable to update user role.'
        );
    }
}


/*
    ============================================================
    ADMIN - TECHNICIANS
    ============================================================
*/

async function loadAdminTechnicians() {

    if (!getToken()) {
        return;
    }


    try {

        const data =
            await apiRequest(
                '/admin/technicians',
                {
                    method: 'GET'
                }
            );


        const technicianRows =
            data.technicians || [];


        const technicianMap =
            new Map();


        technicianRows.forEach(
            row => {

                if (
                    !technicianMap.has(
                        row.id
                    )
                ) {

                    technicianMap.set(
                        row.id,
                        {
                            id:
                                row.id,

                            full_name:
                                row.full_name,

                            email:
                                row.email,

                            role:
                                row.role,

                            skills:
                                []
                        }
                    );
                }


                const technician =
                    technicianMap.get(
                        row.id
                    );


                if (
                    row.skill_id &&
                    row.category
                ) {

                    technician.skills.push({
                        id:
                            row.skill_id,

                        category:
                            row.category
                    });
                }
            }
        );


        const technicians =
            Array.from(
                technicianMap.values()
            );


        displayAdminTechnicians(
            technicians
        );

    } catch (error) {

        if (
            adminTechniciansContainer
        ) {

            adminTechniciansContainer.innerHTML = `
                <p class="error-message">
                    ${escapeHtml(
                        error.message ||
                        'Unable to load technicians.'
                    )}
                </p>
            `;
        }
    }
}


/*
    ============================================================
    ADMIN TECHNICIAN CARDS
    ============================================================
*/

function displayAdminTechnicians(
    technicians
) {

    if (!adminTechniciansContainer) {
        return;
    }


    if (
        !technicians ||
        technicians.length === 0
    ) {

        adminTechniciansContainer.innerHTML = `
            <div class="admin-empty-state">
                <p>No technicians found.</p>
            </div>
        `;

        return;
    }


    let html = '';


    technicians.forEach(
        technician => {

            const skills =
                technician.skills || [];


            const technicianName =
                technician.full_name ||
                'Unnamed Technician';


            const technicianEmail =
                technician.email ||
                'No email available';


            const technicianRole =
                technician.role ||
                'ICT Technician';


            html += `

                <article class="technician-card">

                    <div class="technician-card-header">

                        <div class="technician-info">

                            <h3 class="technician-name">
                                ${escapeHtml(
                                    technicianName
                                )}
                            </h3>

                            <p class="technician-email">
                                ${escapeHtml(
                                    technicianEmail
                                )}
                            </p>

                        </div>

                        <span class="technician-role">
                            ${escapeHtml(
                                technicianRole
                            )}
                        </span>

                    </div>


                    <div class="technician-skills-section">

                        <h4>
                            Current Skills
                        </h4>

                        <div class="technician-skills-list">
            `;


            if (
                skills.length ===
                0
            ) {

                html += `

                    <p class="no-skills-message">
                        No skills assigned yet.
                    </p>

                `;

            } else {

                skills.forEach(
                    skill => {

                        const skillId =
                            skill.id ??
                            skill.skill_id;


                        const skillName =
                            skill.category ||
                            skill.name ||
                            'Skill';


                        html += `

                            <div class="technician-skill-item">

                                <span class="skill-tag">
                                    ${escapeHtml(
                                        skillName
                                    )}
                                </span>

                                <button
                                    type="button"
                                    class="admin-remove-skill-button"
                                    onclick="removeTechnicianSkill(
                                        ${Number(
                                            technician.id
                                        )},
                                        ${Number(
                                            skillId
                                        )}
                                    )"
                                >
                                    Remove
                                </button>

                            </div>

                        `;
                    }
                );
            }


            html += `

                        </div>

                    </div>


                    <div class="add-skill-section">

                        <h4>
                            Add Technician Skill
                        </h4>

                        <div class="add-skill-controls">

                            <select
                                id="skill-${Number(
                                    technician.id
                                )}"
                                class="admin-skill-input"
                                aria-label="New skill for ${escapeHtml(
                                    technicianName
                                )}"
                            >

                                <option value="">
                                    Select a skill
                                </option>

                                <option value="Network">
                                    Network
                                </option>

                                <option value="Hardware">
                                    Hardware
                                </option>

                                <option value="Software">
                                    Software
                                </option>

                                <option value="Account">
                                    Account
                                </option>

                            </select>


                            <button
                                type="button"
                                class="primary-button admin-add-skill-button"
                                onclick="addTechnicianSkill(
                                    ${Number(
                                        technician.id
                                    )}
                                )"
                            >
                                Add Skill
                            </button>

                        </div>

                    </div>

                </article>
            `;
        }
    );


    adminTechniciansContainer.innerHTML =
        html;
}


/*
    ============================================================
    ADMIN - ADD TECHNICIAN SKILL
    ============================================================
*/

async function addTechnicianSkill(
    technicianId
) {

    if (!getToken()) {
        return;
    }


    const input =
        document.getElementById(
            `skill-${technicianId}`
        );


    if (!input) {
        return;
    }


    const category =
        input.value;


    if (!category) {

        alert(
            'Please select a skill.'
        );

        return;
    }


    try {

        await apiRequest(
            `/admin/technicians/${technicianId}/skills`,
            {
                method: 'POST',

                body:
                    JSON.stringify({
                        category:
                            category
                    })
            }
        );


        input.value =
            '';


        await loadAdminTechnicians();

    } catch (error) {

        alert(
            error.message ||
            'Unable to add technician skill.'
        );
    }
}


/*
    ============================================================
    ADMIN - REMOVE TECHNICIAN SKILL
    ============================================================
*/

async function removeTechnicianSkill(
    technicianId,
    skillId
) {

    if (!getToken()) {
        return;
    }


    try {

        await apiRequest(
            `/admin/technicians/${technicianId}/skills/${skillId}`,
            {
                method: 'DELETE'
            }
        );


        await loadAdminTechnicians();

    } catch (error) {

        alert(
            error.message ||
            'Unable to remove technician skill.'
        );
    }
}


/*
    ============================================================
    ADMIN - ACTIVE TICKETS
    ============================================================
*/

async function loadAdminTickets() {

    if (!getToken()) {
        return;
    }


    if (adminTicketsContainer) {

        adminTicketsContainer.innerHTML = `
            <p>
                Loading active tickets...
            </p>
        `;
    }


    try {

        const data =
            await apiRequest(
                '/admin/tickets/active',
                {
                    method: 'GET'
                }
            );


        const tickets =
            data.tickets || [];


        if (adminTicketCount) {

            adminTicketCount.textContent =
                tickets.length;
        }

        const openTickets =
            tickets.filter(
                ticket =>
                    (ticket.status || '').toLowerCase() === 'open'
            ).length;


        const inProgressTickets =
            tickets.filter(
                ticket =>
                    (ticket.status || '').toLowerCase() === 'in progress'
            ).length;


        if (adminOpenTicketCount) {

            adminOpenTicketCount.textContent =
                openTickets;
        }


        if (adminInProgressTicketCount) {

            adminInProgressTicketCount.textContent =
                inProgressTickets;
        }
                displayAdminTickets(
                    tickets
                );

    } catch (error) {

        if (adminTicketCount) {

            adminTicketCount.textContent =
                '—';
        }


        if (adminTicketsContainer) {

            adminTicketsContainer.innerHTML = `
                <p class="error-message">
                    ${escapeHtml(
                        error.message ||
                        'Unable to load active tickets.'
                    )}
                </p>
            `;
        }
    }
}

async function loadTicketAnalytics() {

    try {

        const fromDate =
            analyticsFromDate
                ? analyticsFromDate.value
                : '';

        const toDate =
            analyticsToDate
                ? analyticsToDate.value
                : '';

        let analyticsUrl =
            `${API_BASE_URL}/admin/tickets/analytics`;

        if (fromDate && toDate) {
            analyticsUrl +=
                `?fromDate=${fromDate}&toDate=${toDate}`;
        }

        const response = await fetch(
            analyticsUrl,
            {
                method: 'GET',

                headers: {
                    'Authorization':
                        `Bearer ${localStorage.getItem('token')}`
                }
            }
        );


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                'Unable to load ticket analytics.'
            );

        }


        // Total tickets.

        if (analyticsTotalTickets) {

            analyticsTotalTickets.textContent =
                data.totalTickets || 0;

        }


        // Status counts.

        const statusCounts = {};

        data.statusBreakdown.forEach(
            item => {

                statusCounts[item.status] =
                    item.count;

            }
        );


        if (analyticsOpenTickets) {

            analyticsOpenTickets.textContent =
                statusCounts['Open'] || 0;

        }


        if (analyticsInProgressTickets) {

            analyticsInProgressTickets.textContent =
                statusCounts['In Progress'] || 0;

        }


        if (analyticsResolvedTickets) {

            analyticsResolvedTickets.textContent =
                statusCounts['Resolved'] || 0;

        }


        // Display status breakdown.

        displayAnalyticsTable(
            analyticsStatusContainer,
            data.statusBreakdown,
            'Status'
        );


        // Display category breakdown.

        displayAnalyticsTable(
            analyticsCategoryContainer,
            data.categoryBreakdown,
            'Category'
        );


        // Display priority breakdown.

        displayAnalyticsTable(
            analyticsPriorityContainer,
            data.priorityBreakdown,
            'Priority'
        );


        // Display technician workload.

        displayTechnicianWorkload(
            data.technicianWorkload
        );


    } catch (error) {

        console.error(
            'Ticket analytics error:',
            error
        );


        if (analyticsStatusContainer) {

            analyticsStatusContainer.innerHTML =
                '<p>Unable to load ticket analytics.</p>';

        }

    }

}

function displayAnalyticsTable(
    container,
    rows,
    label
) {

    if (!container) {
        return;
    }


    if (!rows || rows.length === 0) {

        container.innerHTML =
            '<p>No analytics data available.</p>';

        return;

    }


    container.innerHTML = `

        <table class="tickets-table">

            <thead>

                <tr>

                    <th>
                        ${label}
                    </th>

                    <th>
                        Tickets
                    </th>

                </tr>

            </thead>

            <tbody>

                ${rows.map(item => `

                    <tr>

                        <td>
                            ${item.status ||
                              item.category ||
                              item.priority}
                        </td>

                        <td>
                            ${item.count}
                        </td>

                    </tr>

                `).join('')}

            </tbody>

        </table>

    `;

}


function displayTechnicianWorkload(
    technicians
) {

    if (!analyticsTechnicianContainer) {
        return;
    }


    if (
        !technicians ||
        technicians.length === 0
    ) {

        analyticsTechnicianContainer.innerHTML =
            '<p>No technician workload data available.</p>';

        return;

    }


    analyticsTechnicianContainer.innerHTML = `

        <table class="tickets-table">

            <thead>

                <tr>

                    <th>
                        Technician
                    </th>

                    <th>
                        Assigned Tickets
                    </th>

                </tr>

            </thead>

            <tbody>

                ${technicians.map(technician => `

                    <tr>

                        <td>
                            ${technician.technician_name}
                        </td>

                        <td>
                            ${technician.ticket_count}
                        </td>

                    </tr>

                `).join('')}

            </tbody>

        </table>

    `;

}

async function exportTicketAnalytics() {
    
    try {
        const response = await fetch(
            `${API_BASE_URL}/admin/tickets/analytics/export`,
            {
                method: 'GET',
                headers: {
                    'Authorization':
                        `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        if (!response.ok) {
            const data = await response.json();

            throw new Error(
                data.message ||
                'Unable to export report.'
            );
        }

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');

        link.href = url;

        link.download =
            'ict-ticket-analytics.csv';

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error(
            'Export analytics error:',
            error
        );

        alert(
            'Unable to export the report.'
        );
    }
}

/*
    ============================================================
    ADMIN ACTIVE TICKETS TABLE
    ============================================================
*/

function displayAdminTickets(
    tickets
) {

    if (!adminTicketsContainer) {
        return;
    }


    if (
        !tickets ||
        tickets.length === 0
    ) {

        adminTicketsContainer.innerHTML = `
            <div class="admin-empty-state">
                <p>
                    No active tickets found.
                </p>
            </div>
        `;

        return;
    }


    let html = `

        <div class="admin-table-wrapper">

            <table class="tickets-table admin-tickets-table">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Subject</th>

                        <th>Requester</th>

                        <th>Category</th>

                        <th>Priority</th>

                        <th>Status</th>

                        <th>Assigned Technician</th>

                        <th>Created</th>

                    </tr>

                </thead>

                <tbody>
    `;


    tickets.forEach(
        ticket => {

            const technicianName =
                ticket.technician_name ||
                'Unassigned';


            html += `

                <tr>

                    <td>
                        ${escapeHtml(
                            ticket.id
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            ticket.subject
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            ticket.requester_name ||
                            'Unknown'
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            ticket.category
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            ticket.priority
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            ticket.status
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            technicianName
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            formatDate(
                                ticket.created_at
                            )
                        )}
                    </td>

                </tr>
            `;
        }
    );


    html += `

                </tbody>

            </table>

        </div>
    `;


    adminTicketsContainer.innerHTML =
        html;
}

if (applyAnalyticsFilter) {
    applyAnalyticsFilter.addEventListener(
        'click',
        loadTicketAnalytics
    );
}

if (clearAnalyticsFilter) {
    clearAnalyticsFilter.addEventListener(
        'click',
        () => {

            if (analyticsFromDate) {
                analyticsFromDate.value = '';
            }

            if (analyticsToDate) {
                analyticsToDate.value = '';
            }

            loadTicketAnalytics();
        }
    );
}

/*
    ============================================================
    ADMIN NAVIGATION
    ============================================================
*/

function showAdminModule(
    moduleName
) {

    const dashboard =
        document.getElementById(
            'adminDashboardSection'
        );

    const users =
        document.getElementById(
            'adminUsersSection'
        );

    const technicians =
        document.getElementById(
            'adminTechniciansSection'
        );

    const tickets =
        document.getElementById(
            'adminTicketsSection'
        );


    hideElement(
        dashboard
    );

    hideElement(
        users
    );

    hideElement(
        technicians
    );

    hideElement(
        tickets
    );


    if (
        moduleName ===
        'dashboard'
    ) {

        showElement(
            dashboard
        );

        loadAdminDashboard();

        return;
    }


    if (
        moduleName ===
        'users'
    ) {

        showElement(
            users
        );

        loadAdminUsers();

        return;
    }


    if (
        moduleName ===
        'technicians'
    ) {

        showElement(
            technicians
        );

        loadAdminTechnicians();

        return;
    }


    if (
        moduleName ===
        'tickets'
    ) {

        showElement(
            tickets
        );

        loadAdminTickets();

        return;
    }
}


/*
    ============================================================
    LOGOUT
    ============================================================
*/

function logout() {

    clearSession();

    hideAllSections();

    showLogin();


    if (loginForm) {

        loginForm.reset();
    }


    if (loginMessage) {

        loginMessage.textContent =
            '';
    }
}


if (logoutButton) {

    logoutButton.addEventListener(
        'click',
        logout
    );
}


if (technicianLogoutButton) {

    technicianLogoutButton.addEventListener(
        'click',
        logout
    );
}


if (adminLogoutButton) {

    adminLogoutButton.addEventListener(
        'click',
        logout
    );
}


/*
    ============================================================
    ACCESSIBILITY
    ============================================================
*/

let textSize = 100;


if (accessibilityButton) {

    accessibilityButton.addEventListener(
        'click',
        function () {

            if (
                accessibilityPanel.style.display ===
                    'none' ||
                accessibilityPanel.style.display ===
                    ''
            ) {

                accessibilityPanel.style.display =
                    'block';

            } else {

                accessibilityPanel.style.display =
                    'none';
            }
        }
    );
}


function applyTextSize() {

    document.documentElement.style.fontSize =
        `${textSize}%`;
}


if (increaseTextButton) {

    increaseTextButton.addEventListener(
        'click',
        function () {

            if (
                textSize <
                130
            ) {

                textSize +=
                    10;
            }


            applyTextSize();
        }
    );
}


if (decreaseTextButton) {

    decreaseTextButton.addEventListener(
        'click',
        function () {

            if (
                textSize >
                80
            ) {

                textSize -=
                    10;
            }


            applyTextSize();
        }
    );
}


if (resetTextButton) {

    resetTextButton.addEventListener(
        'click',
        function () {

            textSize =
                100;

            applyTextSize();
        }
    );
}


if (contrastButton) {

    contrastButton.addEventListener(
        'click',
        function () {

            document.body.classList.toggle(
                'high-contrast'
            );
        }
    );
}


if (resetAccessibilityButton) {

    resetAccessibilityButton.addEventListener(
        'click',
        function () {

            textSize =
                100;

            applyTextSize();


            document.body.classList.remove(
                'high-contrast'
            );
        }
    );
}


/*
    ============================================================
    DATE FORMAT
    ============================================================
*/

function formatDate(value) {

    if (!value) {
        return '';
    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return value;
    }


    return date.toLocaleString(
        'en-AU',
        {
            dateStyle:
                'medium',

            timeStyle:
                'short'
        }
    );
}


/*
    ============================================================
    RESTORE SESSION
    ============================================================
*/

function restoreSession() {

    const token =
        getToken();

    const user =
        getUser();


    if (
        !token ||
        !user
    ) {

        clearSession();

        showLogin();

        return;
    }


    handleLoginByRole(
        user
    );
}


/*
    ============================================================
    START APPLICATION
    ============================================================
*/

restoreSession();