const UNLOCK_DURATION = 10 * 60 * 1000; // 10 minutes
const LOCK_NAME = "VAULT GUARD";

// Extension load hote hi storage se setting fetch karein
chrome.storage.local.get(['masterPassword', 'blockedSites'], (data) => {
    const CORRECT_PASSWORD = data.masterPassword || "1234";
    const blockedSites = data.blockedSites || ["facebook.com"];
    
    const currentHost = window.location.hostname.toLowerCase();
    
    // Check if current website matches any in our blocked list
    const isBlocked = blockedSites.some(site => currentHost.includes(site));

    if (isBlocked) {
        lockScreen(CORRECT_PASSWORD);
    }
});

function lockScreen(CORRECT_PASSWORD) {
    const lastUnlockTime = localStorage.getItem('site_locker_unlock_time');
    const currentTime = new Date().getTime();

    if (lastUnlockTime && (currentTime - lastUnlockTime < UNLOCK_DURATION)) {
        return; // Skip locking if within 10 minutes
    }

    if (!document.body) {
        requestAnimationFrame(() => lockScreen(CORRECT_PASSWORD));
        return;
    }

    const overlay = document.createElement("div");
    overlay.id = "vault-guard-overlay";
    
    const style = document.createElement('style');
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=Poppins:wght@300;500&display=swap');
        #vault-guard-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle, #1a1a2e 0%, #0f0f1b 100%); z-index: 2147483647; display: flex; flex-direction: column; justify-content: center; align-items: center; font-family: 'Poppins', sans-serif; animation: fadeIn 0.8s ease-out; }
        .glass-card { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(15px); padding: 40px 60px; border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.1); text-align: center; box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.8); animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .brand-name { font-family: 'Orbitron', sans-serif; font-size: 28px; letter-spacing: 4px; color: #00d2ff; margin-bottom: 10px; text-shadow: 0 0 15px rgba(0, 210, 255, 0.5); animation: glow 2s ease-in-out infinite alternate; }
        .sub-text { color: #888; font-size: 14px; margin-bottom: 30px; }
        input[type="password"] { width: 280px; padding: 15px; border: none; border-radius: 10px; background: rgba(255, 255, 255, 0.1); color: white; font-size: 16px; outline: none; margin-bottom: 20px; transition: 0.3s; border: 1px solid transparent; }
        input[type="password"]:focus { background: rgba(255, 255, 255, 0.15); border-color: #00d2ff; box-shadow: 0 0 10px rgba(0, 210, 255, 0.3); }
        #unlock-btn { background: linear-gradient(45deg, #00d2ff, #3a7bd5); color: white; border: none; padding: 12px 40px; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 16px; transition: 0.3s; width: 100%; }
        #unlock-btn:hover { transform: translateY(-2px); box-shadow: 0 5px 20px rgba(0, 210, 255, 0.4); }
        #error-msg { color: #ff4b2b; font-size: 13px; margin-top: 15px; display: none; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glow { from { text-shadow: 0 0 10px rgba(0, 210, 255, 0.5); } to { text-shadow: 0 0 25px rgba(0, 210, 255, 0.9); } }
        @keyframes shake { 0%, 100% {transform: translateX(0);} 25% {transform: translateX(-10px);} 75% {transform: translateX(10px);} }
    `;
    document.head.appendChild(style);

    overlay.innerHTML = `
        <div class="glass-card">
            <div class="brand-name">${LOCK_NAME}</div>
            <div class="sub-text">Encrypted Access Only</div>
            <input type="password" id="site-password" placeholder="Enter Access Key" autofocus>
            <button id="unlock-btn">AUTHORIZE</button>
            <p id="error-msg">❌ Access Denied! Invalid Key.</p>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    const handleUnlock = () => {
        const pwd = document.getElementById("site-password").value;
        if (pwd === CORRECT_PASSWORD) {
            localStorage.setItem('site_locker_unlock_time', new Date().getTime());
            overlay.remove();
            document.body.style.overflow = "auto";
        } else {
            const error = document.getElementById("error-msg");
            error.style.display = "block";
            document.querySelector('.glass-card').style.animation = 'none';
            setTimeout(() => { document.querySelector('.glass-card').style.animation = 'shake 0.4s'; }, 10);
        }
    };

    document.getElementById("unlock-btn").addEventListener("click", handleUnlock);
    document.getElementById("site-password").addEventListener("keypress", (e) => {
        if (e.key === 'Enter') handleUnlock();
    });
}