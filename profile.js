const getContainer = document.getElementById("details-container")

function createAppendElement(name, parent, options = {}) {
  const htmlElem = document.createElement(name);
  parent.appendChild(htmlElem);
  Object.keys(options).forEach(key => {
    const value = options[key];
    if (key === 'html') {
      htmlElem.innerHTML = value;
    } else {
      htmlElem.setAttribute(key, value);
    }
  });
  return htmlElem;
}

const maleValue = localStorage.getItem("male")
const femaleValue = localStorage.getItem("female")
const otherValue = localStorage.getItem("other")
const imageDiv = createAppendElement("div", getContainer, { id: "imageDiv" });
const img = createAppendElement("img", imageDiv, { id: "image", alt: "profile", width: "200px", height: "200px" })
// const img = new Image()
// img.id = "image";
// img.alt = "profile"
// img.width = 200;
// img.height = 200;

imageDiv.appendChild(img);
if (localStorage.getItem("avatar")) {
  img.setAttribute("src", localStorage.getItem("avatar"));
} else {
  if (femaleValue) { img.src = "images/female avatar.png" }
  else if (maleValue) { img.src = "images/male avatar.png" }
  else {
    img.src = "images/other avatar.png"
  }
}

const nameDiv = createAppendElement("div", getContainer, { id: "nameDiv" })
const nameValue = localStorage.getItem("name")
nameDiv.textContent = `Name: ${nameValue}`

const ageDiv = createAppendElement("div", getContainer, { id: "ageDiv" })
const ageValue = localStorage.getItem("age")
ageDiv.textContent = `Age: ${ageValue}`;



if (maleValue) {
  const maleDiv = createAppendElement("div", getContainer, { class: "genderOpt" })
  maleDiv.textContent = `Gender: ${maleValue}`
} else if (femaleValue) {
  const femaleDiv = createAppendElement("div", getContainer, { class: "genderOpt" })
  femaleDiv.textContent = `Gender: ${femaleValue}`
} else if (otherValue) {
  const otherDiv = createAppendElement("div", getContainer, { class: "genderOpt" })
  otherDiv.textContent = `Gender: ${otherValue}`
}

let hobbiesValue = localStorage.getItem("hobbies");
const hobbiesList = createAppendElement("ul", getContainer, { id: "hobbiesList" })
hobbiesList.innerHTML = "Hobbies"
if (!hobbiesValue.length) {
  const hobbyItem = createAppendElement("li", hobbiesList, { class: "hobbyItem" })
  hobbyItem.textContent = `No hobbies entered`;
} else {
  hobbiesValue = hobbiesValue.split(",")
  hobbiesValue.forEach(hobby => {

    const hobbyItem = createAppendElement("li", hobbiesList, { class: "hobbyItem" })
    hobbyItem.textContent = hobby;
  })
}

const backBtn = createAppendElement("button", getContainer, { id: "backBtn", class: "btn btn-success" })
backBtn.textContent = "Start Over";
backBtn.onclick = () => {
  localStorage.clear()
  location.href = "file:///C:/Users/Mahmoud/Desktop/create-profile/createuser.html"
}

