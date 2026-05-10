# 🛡️ Vault Guard - Browser Extension

A sleek, modern, and highly responsive browser extension to password-protect specific websites. Built with Manifest V3, Vault Guard features a beautiful Glassmorphism UI and dynamic settings management to keep your browsing secure and focused.

## ✨ Features

- **Dynamic Site Blocking:** Easily add or remove websites from the blocklist via the extension popup.
- **Custom Master Password:** Set and update your own secure access key anytime.
- **Smart Session Window:** Once unlocked, the website remains accessible for 10 minutes. No need to re-enter the password on every refresh.
- **Modern UI/UX:** Professional Glassmorphism design with smooth CSS animations and a futuristic look.
- **Fully Local & Secure:** Uses the `chrome.storage.local` API. No external servers or databases are used, keeping your data entirely on your machine.

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3 (Glassmorphism), Vanilla JavaScript
- **API:** Chrome Extensions API (Manifest V3)

## 📂 Project Structure

\`\`\`text
📦 Vault-Guard-Extension
 ┣ 📜 manifest.json      # Extension configuration and permissions
 ┣ 📜 content.js         # Injected script for UI overlay and logic
 ┣ 📜 popup.html         # Settings UI when the extension icon is clicked
 ┗ 📜 popup.js           # Logic to handle Chrome Storage API for settings
\`\`\`

## 🚀 Installation Guide

Since this extension is not yet published on the Chrome Web Store, you can install it locally using Developer Mode.

1. **Clone or Download** this repository to your local machine.
2. Open your Chromium-based browser (Google Chrome, Brave, Edge).
3. Navigate to the extensions page:
   - Chrome: `chrome://extensions/`
   - Brave: `brave://extensions/`
4. Enable **Developer mode** (usually a toggle in the top right corner).
5. Click on the **Load unpacked** button in the top left.
6. Select the folder containing the project files.
7. The Vault Guard extension is now installed! 🎉

## 💡 How to Use

1. Click on the **Extensions icon** (🧩 puzzle piece) in your browser's toolbar and pin **Vault Guard**.
2. Click the Vault Guard icon to open the Settings Popup.
3. **Set your Master Password** (Default is `1234`).
4. **Add Websites:** Enter the domains you want to lock, separated by commas (e.g., `facebook.com, youtube.com, instagram.com`).
5. Click **Save Settings**.
6. Navigate to any of the blocked websites. You will be greeted with the Vault Guard lock screen. Enter your password and press **Enter** or click **Authorize** to gain access.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/devwithsk/VaultGuard/issues) if you want to contribute.
