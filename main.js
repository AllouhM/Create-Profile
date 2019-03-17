
const btn = document.getElementById("btn")
const nameInput = document.getElementById("input-name")
const ageInput = document.getElementById("input-age");
const hobbyInput = document.getElementById("input-hobby")
const maleCheckBox = document.getElementById("male")
const femaleCheckBox = document.getElementById("female")
const otherCheckBox = document.getElementById("other")
const avatarInput = document.getElementById("UploadAvatar")
const jumbotron = document.getElementById("error-container")
const errorList = document.getElementById("errors-list")
const cancelBtn = document.getElementById("cancel-btn")
const addHobby = document.getElementById("addhobby-btn")
const genderOptionsWrapper = document.getElementById("genderOptionsWrapper")
const nameAgeWrapper = document.getElementById("nameAgeWrapper")

validateInput = () => {
  messagesObj.messages.forEach(message => {
    const liElement = document.createElement("li");
    liElement.setAttribute("class", "li")
    liElement.textContent = message;
    errorList.appendChild(liElement)
    jumbotron.style.display = "block"

  })

  const hobbiesCount = document.getElementById("hobbies-num")
  hobbiesCount.textContent = (`Your hobbies`);
  localStorage.clear()
}

avatarInput.onchange = (e) => {

  const reader = new FileReader()

  reader.onload = () => {
    localStorage.setItem("avatar", reader.result)
  }
  reader.readAsDataURL(avatarInput.files[0])
}
let hobbies = []
addHobby.onclick = (e) => {

  e.preventDefault()
  if (!hobbyInput.value) {
    messagesObj.messages.push("Please insert a hobby to add");
    validateInput()
  }
  hobbies.push(hobbyInput.value)
  hobbyInput.value = ""
  const hobbiesNumber = document.getElementById("hobbies-num")

  hobbiesNumber.textContent = (`You have ${hobbies.length} hobbies`)

}

cancelBtn.onclick = (e) => {

  e.preventDefault()

  location.href = "file:///C:/Users/Mahmoud/Desktop/create-profile/main.html"
}

let messagesObj = {
  ok: true,
  messages: []
}

btn.onclick = function (e) {
  e.preventDefault()
  const ul = document.getElementById("errors-list");
  while (ul.hasChildNodes()) {
    ul.removeChild(ul.firstChild);
  }

  messagesObj.messages = []
  if (nameInput.value.length > 20 || nameInput.value.length == 0) {
    messagesObj.ok = false
    messagesObj.messages.push("Please enter name up to 20 character")

  }
  if (ageInput.value >= 150 || ageInput.value == 0) {
    messagesObj.ok = false
    messagesObj.messages.push("Age required, Max 150")
  }
  if (maleCheckBox.checked === false && femaleCheckBox.checked === false && otherCheckBox.checked === false) {
    messagesObj.ok = false
    messagesObj.messages.push("Please select gender")
  }

  if (messagesObj.ok == false) {
    validateInput()

  }
  else {
    localStorage.setItem("name", nameInput.value)
    localStorage.setItem("age", ageInput.value)
    localStorage.setItem("hobbies", hobbies)
    nameInput.value = "";
    ageInput.value = "";
    if (femaleCheckBox.checked === true) {
      localStorage.removeItem("male");
      localStorage.removeItem("other")
      localStorage.setItem("female", femaleCheckBox.value)
    } if (maleCheckBox.checked === true) {
      localStorage.removeItem("female");
      localStorage.removeItem("other")
      localStorage.setItem("male", maleCheckBox.value)
    } if (otherCheckBox.checked === true) {
      localStorage.removeItem("male");
      localStorage.removeItem("female")
      localStorage.setItem("other", otherCheckBox.value)
    }

    location.href = "file:///C:/Users/Mahmoud/Desktop/create-profile/profile.html";
  }
}
nameAgeWrapper.onchange = (e) => {
  e.preventDefault()
  messagesObj.ok = true;
  messagesObj.messages = []
  jumbotron.style.display = "none"
}

genderOptionsWrapper.onchange = (e) => {
  e.preventDefault()
  messagesObj.ok = true;
  messagesObj.messages = []
  jumbotron.style.display = "none"
}