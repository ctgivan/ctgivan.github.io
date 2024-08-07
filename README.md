Very simple recipe "card" generator suitable for copying to Squarespace code blocks
Enter information in the form (the card updates whenever you click away from the form field)
When noted, fields will try and guess if you intend a list or not...if something goes wrong, clear the field, click away, then enter the correct information -- hopefully simple editing is coming soon!

Paste the script below into the page injection setting to make cookmode (taken straight from the MDN example) work:
<script>
const wakeButton = document.getElementById("cook-mode");

// change button and status if wakelock becomes aquired or is released
const changeUI = (status = 'acquired') => {
  const acquired = status === 'acquired' ? true : false;
  wakeButton.dataset.status = acquired ? 'on' : 'off';
  // wakeButton.textContent = `Turn Wake Lock ${acquired ? 'OFF' : 'ON'}`;
  // statusElem.textContent = `Wake Lock ${acquired ? 'is active!' : 'has been released.'}`;
}

// test support
let isSupported = false;

if ('wakeLock' in navigator) {
  isSupported = true;
  // statusElem.textContent = 'Screen Wake Lock API supported 🎉';
} else {
  wakeButton.disabled = true;
  // statusElem.textContent = 'Wake lock is not supported by this browser.';
}

if (isSupported) {
  // create a reference for the wake lock
  let wakeLock = null;

  // create an async function to request a wake lock
  const requestWakeLock = async () => {
    try {
      wakeLock = await navigator.wakeLock.request('screen');

      console.log("here");

      // change up our interface to reflect wake lock active
      changeUI();

      // listen for our release event
      wakeLock.onrelease = function(ev) {
        console.log(ev);
      }
      wakeLock.addEventListener('release', () => {
        // if wake lock is released alter the button accordingly
        changeUI('released');
      });

    } catch (err) {
      // if wake lock request fails - usually system related, such as battery
      wakeButton.dataset.status = 'off';
      // wakeButton.textContent = 'Turn Wake Lock ON';
      // statusElem.textContent = `${err.name}, ${err.message}`;

    }
  } // requestWakeLock()

  // if we click our button
  wakeButton.addEventListener('click', () => {
    console.log("clicked");
    // if wakelock is off request it
    if (wakeButton.dataset.status === 'off') {
      requestWakeLock()
    } else { // if it's on release it
      wakeLock.release()
        .then(() => {
        wakeLock = null;
      })
    }
  })

  const handleVisibilityChange = () => {
    if (wakeLock !== null && document.visibilityState === 'visible') {
      requestWakeLock();
    }
  }

  // reaquireCheck.addEventListener('change', () => {
  //   if (reaquireCheck.checked) {
  //     document.addEventListener('visibilitychange', handleVisibilityChange);
  //   } else {
  //     document.removeEventListener('visibilitychange', handleVisibilityChange);
  //   }
  // });
  }
  <script>