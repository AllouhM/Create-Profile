
const btn = document.getElementById("btn")
const nameInput = document.getElementById("input-name")
const ageInput = document.getElementById("input-age");
const hobbyInput = document.getElementById("input-hobby")
const maleRadio = document.getElementById("male")
const femaleRadio = document.getElementById("female")
const otherRadio = document.getElementById("other")
const avatarInput = document.getElementById("UploadAvatar")
const jumbotron = document.getElementById("error-container")
const errorList = document.getElementById("errors-list")
const cancelBtn = document.getElementById("cancel-btn")
const resetBtn = document.getElementById("reset-btn")
const addHobby = document.getElementById("addhobby-btn")
const genderOptionsWrapper = document.getElementById("genderOptionsWrapper")
const nameAgeWrapper = document.getElementById("nameAgeWrapper")
const hobbiesNumber = document.getElementById("hobbies-num")
const ul = document.getElementById("errors-list");
let messagesObj = {
  ok: true,
  messages: []
}
let hobbies = []

validateInput = () => {
  messagesObj.messages.forEach(message => {
    const liElement = document.createElement("li");
    liElement.setAttribute("class", "li")
    liElement.textContent = message;
    errorList.appendChild(liElement)
    jumbotron.style.display = "block"

  })

  const hobbiesCount = document.getElementById("hobbies-num")
  if (!hobbies.length) { hobbiesCount.textContent = (`Your hobbies`) };
  localStorage.clear()
}

avatarInput.onchange = (e) => {

  const reader = new FileReader()

  reader.onload = () => {
    localStorage.setItem("avatar", reader.result)
  }
  reader.readAsDataURL(avatarInput.files[0])
}

addHobby.onclick = (e) => {

  e.preventDefault()
  while (ul.hasChildNodes()) {
    ul.removeChild(ul.firstChild);
  }
  // messagesObj.messages = []
  if (hobbyInput.value === "") {
    if (!messagesObj.messages.includes("Please insert a hobby to add")) {
      messagesObj.messages.push("Please insert a hobby to add");
      // hobbies = [];
      validateInput()
    }
  } else {
    hobbies.push(hobbyInput.value)
    hobbyInput.value = ""


    hobbiesNumber.textContent = (`You have ${hobbies.length} hobbies`)
  }


}

cancelBtn.onclick = (e) => {

  e.preventDefault()

  location.href = "file:///C:/Users/Mahmoud/Desktop/create-profile/main.html"
}


btn.onclick = function (e) {
  e.preventDefault()

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
  if (maleRadio.checked === false && femaleRadio.checked === false && otherRadio.checked === false) {
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
    if (femaleRadio.checked) {
      localStorage.removeItem("male");
      localStorage.removeItem("other")
      localStorage.setItem("female", femaleRadio.value)
    } if (maleRadio.checked) {
      localStorage.removeItem("female");
      localStorage.removeItem("other")
      localStorage.setItem("male", maleRadio.value)
    } if (otherRadio.checked) {
      localStorage.removeItem("male");
      localStorage.removeItem("female")
      localStorage.setItem("other", otherRadio.value)
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

resetBtn.onclick = (e) => {
  e.preventDefault()
  nameInput.value = "";
  ageInput.value = "";
  if (hobbies.length) {
    hobbies = [];
    hobbiesNumber.textContent = "Your hobbies"
  }
  if (femaleRadio.checked || maleRadio.checked || otherRadio.checked) {
    femaleRadio.checked = false;
    maleRadio.checked = false;
    otherRadio.checked = false
  }
  if (avatarInput.files[0]) {
    avatarInput.value = "";
  }
  localStorage.clear()
}
