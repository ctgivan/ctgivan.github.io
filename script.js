function smallField(e) {
  const popOffExtra = "form-".length;
  const name = e.id.substring(popOffExtra);
  var tag = "";

//no the most efficient, but it works
  switch (name) {
    case "author-name":
    tag = "Author: ";
    break;
    case "servings":
    tag = "Servings: ";
    break;
    case "prep-time":
    tag = "Prep Time: ";
    break;
    case "cook-time":
    tag = "Cook Time: ";
    break;
    case "total-time":
    tag = "Total Time: "
    break;
  }

  if (name == "image-url") {
    if (isValidHttpUrl(e.value))
    document.getElementById("thumbnail").src = e.value;
  } else {
    document.getElementById(name).innerHTML = tag + e.value;
  }
}

function listField(e) {
  const popOffExtra = "form-".length;
  const name = e.id.substring(popOffExtra);
  const point = (name == "ingredients") ? document.getElementsByClassName("container")[0] : document.getElementsByTagName("li")[0];
  const parent = (document.getElementById(name).getElementsByTagName("ol").length) ? document.getElementById(name).getElementsByTagName("ol")[0] : document.getElementById(name);

  if (e.value.includes("\n") && name == "ingredients") {
    // point.style.display = "block";
    var ingredients = e.value.match(/(^\S*.*)/gm);
        for (i in ingredients) {
          console.log("Adding " + ingredients[i])
          var clone = point.cloneNode(true);
          parent.appendChild(clone);
          clone.innerHTML += ingredients[i].trim();
        }
  } else if (e.value.includes("\n") &&  e.value.includes("1.") && e.value.includes("2.")) {
    // point.style.display = "block";
    var not_ingredients = e.value.match(/(^\S*.*)/gm);
    for (i in not_ingredients) {
      console.log("Adding " + ingredients[i])
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

//directly from user "Pavlo" on StackOverflow: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

  // reaquireCheck.addEventListener('change', () => {
  //   if (reaquireCheck.checked) {
  //     document.addEventListener('visibilitychange', handleVisibilityChange);
  //   } else {
  //     document.removeEventListener('visibilitychange', handleVisibilityChange);
  //   }
  // });

function copyToClipB() {
  var style = document.getElementsByTagName("style")[0];
  var script = document.getElementById("on-load-items");
  var body = document.getElementsByClassName("custom-recipe-block-crb")[0];
  var generatedSource = new XMLSerializer().serializeToString(style) + new XMLSerializer().serializeToString(script) + new XMLSerializer().serializeToString(body);
  navigator.clipboard.writeText(generatedSource);
  alert("Copied source code");
}
