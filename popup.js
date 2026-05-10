// Load existing settings when popup opens
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['masterPassword', 'blockedSites'], (data) => {
        if (data.masterPassword) {
            document.getElementById('passwordInput').value = data.masterPassword;
        }
        if (data.blockedSites) {
            document.getElementById('sitesInput').value = data.blockedSites.join(', ');
        }
    });
});

// Save settings when button is clicked
document.getElementById('saveBtn').addEventListener('click', () => {
    const password = document.getElementById('passwordInput').value;
    const sitesString = document.getElementById('sitesInput').value;
    
    // Convert comma separated string to array and clean up spaces
    const sitesArray = sitesString.split(',').map(site => site.trim().toLowerCase()).filter(site => site !== "");

    chrome.storage.local.set({
        masterPassword: password || "1234", // Default 1234 agar khali chhod diya
        blockedSites: sitesArray
    }, () => {
        const status = document.getElementById('status');
        status.style.display = 'block';
        setTimeout(() => { status.style.display = 'none'; }, 2000);
    });
});