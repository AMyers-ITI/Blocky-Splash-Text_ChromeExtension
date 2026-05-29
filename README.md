# Blocky-Splash-Text_ChromeExtension
A Manifest V3 browser extension for Chrome that adds randomly-generated splash text to the Google homepage, inspired by the splash messages featured on the Minecraft title screen.

This project was a personal exercise to learn asynchronous JavaScript, DOM manipulation, and secure browser extension practices.

## Technical Implementation
1.**Dynamic DOM Detection**: Uses the MutationObserver API to detect when the Google logo loads and safely injects splash text without polling or hard-coded delays.

2.**Asynchronous Asset Loading**: Uses `Promise.all` to load splash text data and Minecraft-style font simultaneously before rendering in the DOM.

3.**XSS Mitigation:** Utilizes `textContent` rather than `innerHTML` to prevent Cross-Site Scripting.

4.**Minimal Permissions:** Built using Manifest V3, with no unnecessary permissions or restricted content access.

## Installation
### Chrome Web Store
Navigate to the [Chrome Web Store](https://chromewebstore.google.com/detail/blocky-splash-text/kcfokjhamjofieedkiajkabhlkgklmhb) and click **Add to Chrome** to install the extension directly!
### Developer Mode
Since this project is open-source, you can install and test it locally without using the Chrome Web Store:

1.Download or clone the repository.

2.Open Chrome Extensions (`chrome://extensions/`).

3.Enable **Developer mode** (top-right).

4.Click **Load unpacked** (top-left).

5.Select the project folder.

6.Navigate to `https://www.google.com` and test the extension.

## What I Learned
- Working with Chrome Extensions (Manifest V3)

- DOM manipulation and dynamic rendering

- Asynchronous JavaScript patterns

- Safe DOM practices to prevent XSS vulnerabilities

- Working with the MutationObserver and FontFace APIs
