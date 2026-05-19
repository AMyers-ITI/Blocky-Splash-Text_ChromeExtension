# Blocky-Splash-Text_ChromeExtension
A Manifest V3 browser extension for Chrome that adds randomly-generated splash text to the Google homepage, in a style reminiscent of the Minecraft title screen.

This project was a personal exercise to learn asynchronous Javascript, DOM manipulation, and secure browser extension practices.

## Highlights
1.**Dynamic Mutation Monitoring**: Employs the MutationObserver API to reliably detect and anchor splash text to a dynamic DOM element (the Google logo) without reliance on polling intervals.

2.**Asynchronous Resource Synching**: Utilizes `promise.all` to simultaneously fetch localized splash text file and register a custom Minecraft-style font via the FontFace API before rendering in the DOM.

3.**XSS Mitigation:** Utilizes `textContent` rather than insecure injection sinks like `innerHTML` to prevent Cross-Site Scripting.

4.**Principle of Least Privilege:** Strictly adheres to Manifest V3 security standards, requesting zero global system permissions and restricting asset web accessibility solely to target domains.

## Installation (Developer Mode)
Since this project is open-source, you can install and test it locally without using the Chrome Web Store:

1.**Download the project**: Click the green **Code** button at the top of this page and select **Download ZIP**. Extract the folder on your computer.

2.**Open Chrome Extensions**: In your browser, navigate to `chrome://extensions/`.

3.**Enable Developer Mode:**: Toggle the switch in the top-right corner labelled **Developer mode**.

4.**Load the extension:**: Click the **Load unpacked** button in the top-left corner.

5.**Select the Folder**: Select the extracted folder on your computer.

6.**Test it out**: Ensure that the extension is toggled on, navigate to `https://www.google.com` and enjoy the splashes!
