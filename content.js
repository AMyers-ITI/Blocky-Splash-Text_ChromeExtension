// Personal test to see if code runs properly in developer mode
console.log("Yahaha! You found me! :3")

function fontLoader() {

    // Loads and sets up font
    // Learned from https://stackoverflow.com/questions/5586845/how-to-import-font-file-using-javascript
    const fontUrl = chrome.runtime.getURL("minecraft_font.ttf");
    const fontName = new FontFace('minecraft', `url("${fontUrl}")`);

    // Ensures font is loaded before adding it
    return fontName.load()

}

function splashLoader() {

  // Loads in splashes file
  const txtUrl = chrome.runtime.getURL("splashes.txt");

  // Opens splashes file
  // Learned from https://stackoverflow.com/questions/14446447/how-can-i-read-a-local-text-file-in-the-browser
  return fetch(txtUrl)
    .then((res) => res.text())
    .then((text) => {

      // Initializes array of splashes
      const textByLine = text.split("\n");

      // Chooses a splash text at random
      // Learned from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
      return textByLine[Math.floor(Math.random() * textByLine.length)];
    })

     .catch((e) => console.error(e));

}

function splashFormat(splash, logo) {

  // Splash formatting
  splash.style.fontFamily = "minecraft";
  splash.style.textShadow = "2px 2px #454500";
  splash.style.whiteSpace = "nowrap";
  splash.id = "splash";

  // Ensures splash text is relative to logo
  const logoContainer = logo.parentElement; 
  logoContainer.style.position = "relative";
  splash.style.position = "absolute";
  splash.style.top = "80%";  
  splash.style.left = "95%"; 

  logoContainer.appendChild(splash);
}

function splashColor(splash) {

  // Makes 'Colormatic' rainbow as it appears in the game
  if (splash.innerText == "Colormatic"){

    const text = splash.innerText;
    splash.innerText = '';

    // Uses textContent rather than InnerHTML to prevent cross-site scripting
    // Learned from https://stackoverflow.com/questions/36793529/how-to-generate-rainbow-colored-text-in-javascript
    for (let i = 0; i < text.length; i++) {
      let character = document.createElement("span");
      character.style.color = "hsl(" + (360 * i / text.length) + ",80%,50%)";
      character.textContent = text[i];
      splash.appendChild(character);
    }
  }

  // Default color
  else{
    splash.style.color = "#f7fb1f";
  }
}

function splashSizeAndAnimation(splash) {

  // Base size
  let base = 1; 
  
  let minScale = 0.4;

  // Sizes splash text based on text length
  let scaleStart = base - (splash.innerText.length * 0.03);

  scaleStart = Math.max(scaleStart, minScale)

  let scaleEnd = scaleStart * 1.25;

  // Rotating Animation
  // Learned from https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
  const splashAnimation = [
  { transform: `translate(-50%, -50%) rotate(-20deg) scale(${scaleStart})`},
  { transform: `translate(-50%, -50%) rotate(-20deg) scale(${scaleEnd})`},
  { transform: `translate(-50%, -50%) rotate(-20deg) scale(${scaleStart})`},
  ];

  // Time set to 1 second while looping infinitely
  const animationTiming = {
    duration: 1000,
    iterations: Infinity,
  };

  splash.animate(splashAnimation, animationTiming);

}

// Ensures that logo exists before searching for it
// Learned from https://macarthur.me/posts/use-mutation-observer-to-handle-nodes-that-dont-exist-yet/
const domObserver = new MutationObserver((mutationList) => {

	const logo = document.querySelector(`[aria-label="Google"]`);

  if (logo) {

    // Prevents looping once found
    domObserver.disconnect(); 

    // Extra Precaution to Prevent duplicates
    if (document.querySelector("#splash")) return;

    // Ensures font and splash text is loaded before adding it
    // Learned from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    Promise.all([fontLoader(), splashLoader()])
      .then(([font, splashText]) => {

        document.fonts.add(font);

        // Creates splash text element and gives it text
        let splash = document.createElement("h1");
        splash.innerText = splashText;

        splashFormat(splash, logo);
        splashColor(splash);
        splashSizeAndAnimation(splash);
      
      })

      .catch((e) => console.error(e));
  }

});

domObserver.observe(document.body, { childList: true, subtree: true });