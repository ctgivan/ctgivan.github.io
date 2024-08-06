function smallField(e) {
  const popOffExtra = "form-".length;
  const name = e.id.substring(popOffExtra);
  
  if (name == "image-url") {
    document.getElementById("thumbnail").src = e.value;
  } else {
    document.getElementById(name).innerHTML = e.value;
  }
}

function listField(e) {
  const popOffExtra = "form-".length;
  const name = e.id.substring(popOffExtra);
  const point = (name == "ingredients") ? document.getElementsByClassName("container")[0] : document.getElementsByTagName("li")[0];
  const parent = (document.getElementById(name).getElementsByTagName("ol").length) ? document.getElementById(name).getElementsByTagName("ol")[0] : document.getElementById(name);
  
  if (e.value.includes("\n") && name == "ingredients") {
    // point.style.display = "block";
    var ingredients = e.value.match(/(^\S*.*\b)/gm);
        for (i in ingredients) {
          var clone = point.cloneNode(true);
          parent.appendChild(clone);
          clone.innerHTML += ingredients[i].trim();
        }
  } else if (e.value.includes("\n") &&  e.value.includes("1.") && e.value.includes("2.")) {
    // point.style.display = "block";
    var not_ingredients = e.value.match(/(^\S*.*\b)/gm);
    for (i in not_ingredients) {
      var clone = point.cloneNode(true);
      not_ingredients[i] = not_ingredients[i].substring(3);
      parent.appendChild(clone);
      clone.innerHTML = not_ingredients[i].trim();
    }
  } else if (e.value.includes("\n")) {
    // point.style.display = "block";
    var paras = e.value.split(/\n/gm);
    for (i in paras) {
      var p = document.createElement("p");
      p.className = "introduction";
      var tx = document.createTextNode(paras[i]);
      p.appendChild(tx);
      parent.appendChild(p);
    }
  } else {
    // point.style.display = "none";
    document.getElementById(name).innerHTML = e.value;
  }
  if (parent.getElementsByTagName("li").length) {
    if (parent.getElementsByTagName("li")[0].innerHTML == "") parent.getElementsByTagName("li")[0].remove();
  }
}

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

function copyToClipB() {
  var generatedSource = new XMLSerializer().serializeToString(document.getElementsByClassName("custom-recipe-block-crb")[0].outerHTML);
  generatedSource += "<style>" + document.styleSheets + "</style>";
  navigator.clipboard.writeText(generatedSource);
  alert("Copied source code");
}