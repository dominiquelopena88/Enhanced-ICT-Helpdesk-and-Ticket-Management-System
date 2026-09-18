// Classify a support ticket based on its subject
// and description.
function classifyTicket(subject, description) {

    // Combine the subject and description so the
    // classifier can analyse the complete ticket.
    const text = `${subject} ${description}`.toLowerCase();


    // Network-related keywords.
    const networkKeywords = [
        'wifi',
        'wi-fi',
        'internet',
        'network',
        'connection',
        'connect',
        'router',
        'ethernet',
        'vpn',
        'offline',
        'dns'
    ];


    // Hardware-related keywords.
    const hardwareKeywords = [
        'laptop',
        'computer',
        'keyboard',
        'mouse',
        'monitor',
        'screen',
        'printer',
        'hardware',
        'headset',
        'battery',
        'charger',
        'usb'
    ];


    // Software-related keywords.
    const softwareKeywords = [
        'software',
        'application',
        'app',
        'program',
        'system',
        'error',
        'crash',
        'install',
        'installation',
        'update',
        'microsoft',
        'office',
        'excel',
        'word'
    ];


    // Account-related keywords.
    const accountKeywords = [
        'account',
        'password',
        'login',
        'log in',
        'sign in',
        'username',
        'locked',
        'access',
        'permission',
        'reset password'
    ];


    // Count how many keywords from each category
    // appear in the ticket text.
    const scores = {
        Network: 0,
        Hardware: 0,
        Software: 0,
        Account: 0
    };


    networkKeywords.forEach(keyword => {
        if (text.includes(keyword)) {
            scores.Network++;
        }
    });


    hardwareKeywords.forEach(keyword => {
        if (text.includes(keyword)) {
            scores.Hardware++;
        }
    });


    softwareKeywords.forEach(keyword => {
        if (text.includes(keyword)) {
            scores.Software++;
        }
    });


    accountKeywords.forEach(keyword => {
        if (text.includes(keyword)) {
            scores.Account++;
        }
    });


    // Find the category with the highest score.
    let predictedCategory = 'Software';
    let highestScore = scores.Software;


    if (scores.Network > highestScore) {
        predictedCategory = 'Network';
        highestScore = scores.Network;
    }


    if (scores.Hardware > highestScore) {
        predictedCategory = 'Hardware';
        highestScore = scores.Hardware;
    }


    if (scores.Account > highestScore) {
        predictedCategory = 'Account';
        highestScore = scores.Account;
    }


    // Return the predicted category and score.
    return {
        category: predictedCategory,
        confidence: highestScore
    };
}


module.exports = {
    classifyTicket
};
