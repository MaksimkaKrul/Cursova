const { localsName } = require("ejs");

let buttons = document.querySelectorAll('.button-collection button');

function toggleMenu() {
  var menuContainer = document.getElementById("menu-container");
  var contentContainer = document.getElementById("content");
  var menuButton = document.getElementById("menu-button");
  menuContainer.style.left === "0px";
  
  if (menuContainer.style.left === "0px") {
      menuContainer.style.transition = "left 0.3s ease";
      menuContainer.style.left = "-250px";
      contentContainer.style.transition = "margin-left 0.3s ease";
      contentContainer.style.marginLeft = "0";
      menuButton.style.transition = "margin-left 0.3s ease";
      menuButton.style.marginLeft = "0";
  } else {
      menuContainer.style.transition = "left 0.3s ease";
      menuContainer.style.left = "0";
      contentContainer.style.transition = "margin-left 0.3s ease";
      contentContainer.style.marginLeft = "250px";
      menuButton.style.transition = "margin-left 0.3s ease";
      menuButton.style.marginLeft = "250px";
  }
}



function changeContent(content) {
    var contentTextBox = document.getElementById("content-text-box");
    var buttons = document.querySelectorAll('.button-collection button');

    buttons.forEach(button => button.classList.remove('selected'));
    event.target.classList.add('selected');
    contentTextBox.value = content;

    if (content === 'Basic') {
        contentTextBox.value = "With this customization you can change your character appearance and some other options.";
    } else if (content === 'Advance') {
        contentTextBox.value = "With this customization you can change your character appearance, some fetishes and other options.";
    } else if (content === 'Full') {
        contentTextBox.value = "With this customization you can change every option I can give you!";
    }
}

document.getElementById('saveFileName').addEventListener('input', function() {
    var inputValue = this.value;

    var sanitizedValue = inputValue.replace(/[^a-zA-Z0-9]/g, '');

    this.value = sanitizedValue;
});



// Function to toggle modal visibility
function toggleModal(modalId) {
    var modal = document.getElementById(modalId);
    var content = document.getElementById('content');

    if (modal.style.display === "block") {
        modal.style.display = "none";
        content.style.opacity = "1"; 
        return; 
    }

    var openModals = document.querySelectorAll('.modal');
    openModals.forEach(function(openModal) {
        openModal.style.display = "none";
    });

    modal.style.display = "block";
    content.style.opacity = "0.5"; 

    selectOption(1);
}

function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
    document.getElementById('content').style.opacity = "1"; 
}

function selectOption(option) {
    var buttons = document.querySelectorAll('.option-button');
    buttons.forEach(function(button) {
        button.classList.remove('selected');
    });
    
    var selectedButton = document.getElementById('option' + option + 'Button');
    selectedButton.classList.add('selected');
    
    var modalText = document.querySelector('.modal-text p');
    if (option === 1) {
        modalText.innerHTML = `
            <p>Theme:</p>
            <div class="settings-buttons">
                <button onclick="changeTheme('default')">Default</button>
                <button onclick="changeTheme('white')">White Theme</button>
            </div>
            <p>Font:</p>
            <div class="settings-buttons">
                <button onclick="changeFont('default')">Default</button>
                <button onclick="changeFont('times')">Times New Roman</button>
            </div>
        `;
    } else if (option === 2) {
        modalText.textContent = "Content for Option 2...";
    }
}

function changeTheme(theme) {
    var bodyBackgroundColor, contentBackgroundColor, contentTextColor;
    var buttonBackgroundColor, buttonTextColor;

    if (theme === 'default') {
        bodyBackgroundColor = '#000000';
        contentBackgroundColor = '#000000';
        contentTextColor = '#ffffff';
        buttonBackgroundColor = '#333';
        buttonTextColor = '#ffffff';
    } else if (theme === 'white') {
        bodyBackgroundColor = '#FFFFFF';
        contentBackgroundColor = '#ffffff';
        contentTextColor = '#000000';
        buttonBackgroundColor = '#ffffff';
        buttonTextColor = '#000000';
    }

    document.body.style.backgroundColor = bodyBackgroundColor;
    document.getElementById("content-text-box").style.backgroundColor = contentBackgroundColor;
    document.getElementById("content-text-box").style.color = contentTextColor;

    var saveFileInput = document.querySelector(".save-file-input");
    saveFileInput.style.backgroundColor = contentBackgroundColor;
    saveFileInput.style.color = contentTextColor;

    document.getElementById("menu-button").style.backgroundColor = (theme === 'default') ? '#272727' : '#dcdcdc';

    var buttonCollection = document.querySelector(".button-collection");
    var buttons = buttonCollection.getElementsByTagName('button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = buttonBackgroundColor;
        buttons[i].style.color = buttonTextColor;
    }

    var startGameButton = document.querySelector(".save-name button");
    startGameButton.style.backgroundColor = buttonBackgroundColor;
    startGameButton.style.color = buttonTextColor;

    console.log("Theme changed to: " + theme);
}


function changeFont(font) {
    var bodyFontFamily, buttonFontFamily, inputFontFamily;

    if (font === 'default') {
        bodyFontFamily = 'Calibri, sans-serif';
        buttonFontFamily = 'Calibri, sans-serif';
        inputFontFamily = 'Calibri, sans-serif';
    } else if (font === 'times-new-roman') {
        bodyFontFamily = 'Times New Roman, serif';
        buttonFontFamily = 'Times New Roman, serif';
        inputFontFamily = 'Times New Roman, serif';
    }

    document.body.style.fontFamily = bodyFontFamily;

    var settingsButtons = document.querySelectorAll('.settings-buttons button');
    for (var i = 0; i < settingsButtons.length; i++) {
        settingsButtons[i].style.fontFamily = buttonFontFamily;
    }

    var settingsContainer = document.querySelector('.settings-buttons');
    settingsContainer.style.fontFamily = bodyFontFamily;

    var contentTextBox = document.getElementById("content-text-box");
    contentTextBox.style.fontFamily = bodyFontFamily;

    var saveFileInput = document.querySelector(".save-file-input");
    saveFileInput.style.fontFamily = inputFontFamily;

    console.log("Font changed to: " + font);
}

function goToLogin() {
    window.location.href = '/login'; 
}

function goToRegister() {
    window.location.href = '/register';
}


function startGame() {
    var saveFileName = document.getElementById("saveFileName").value;

    var customizationOption = document.querySelector(".button-collection .selected").textContent;

    // Define the URLs for different customization options
    var urls = {
        "Basic": "/basic",
        "Advance": "/advance",
        "Full": "/Full"
    };

    localStorage.setItem('saveFileName', saveFileName);
    window.location.href = urls[customizationOption]
}


function selectOptionCharacter(category, option, event) {
    var buttons = event.target.parentElement.querySelectorAll('button');
    buttons.forEach(function(button) {
        button.classList.remove('selected');
    });

    event.target.classList.add('selected');

    console.log("Selected", option, "for", category);
}

function createCharacter() {
    var hairColor = document.querySelector('.customization-option:nth-child(2) .button-row .selected').innerText;
    var bodyColor = document.querySelector('.customization-option:nth-child(3) .button-row .selected').innerText;
    var clothes = document.querySelector('.customization-option:nth-child(4) .button-row .selected').innerText;
    var season = document.querySelector('.customization-option:nth-child(5) .button-row .selected').innerText;
    var gender = document.querySelector('.customization-option:nth-child(6) .button-row .selected').innerText;
    var eyeColor = document.querySelector('.customization-option:nth-child(7) .button-row .selected').innerText;

    localStorage.setItem('hairColor', hairColor);
    localStorage.setItem('bodyColor', bodyColor);
    localStorage.setItem('clothes', clothes);
    localStorage.setItem('season', season);
    localStorage.setItem('gender', gender);
    localStorage.setItem('eyeColor', eyeColor);

    var optionalOptions = ['boobSize', 'penisSize', 'assSize', 'rape', 'footFetish', 'sizeDifference'];

    optionalOptions.forEach(function(option) {
        var selectedOption = document.querySelector('.customization-option:nth-child(' + (8 + optionalOptions.indexOf(option)) + ') .button-row .selected');
        if (selectedOption) {
            localStorage.setItem(option, selectedOption.innerText);
        }
    });


    window.location.href = "/game";
}

function displayCharacter() {
    var hairColor = localStorage.getItem('hairColor');
    var bodyColor = localStorage.getItem('bodyColor');
    var clothes = localStorage.getItem('clothes');
    var season = localStorage.getItem('season');
    var gender = localStorage.getItem('gender');
    var eyeColor = localStorage.getItem('eyeColor');
    var saveFileName = localStorage.getItem('saveFileName');


    var options = [
        { key: 'boobSize', default: 'normal' },
        { key: 'penisSize', default: 'normal' },
        { key: 'assSize', default: 'normal' },
        { key: 'rape', default: 'normal' },
        { key: 'footFetish', default: 'normal' },
        { key: 'sizeDifference', default: 'normal' },
    ];

    options.forEach(function(option) {
        if (!localStorage.getItem(option.key)) {
            localStorage.setItem(option.key, option.default);
        }
    });

    
    // Display saved options
    document.getElementById('hairColor').innerText = hairColor;
    document.getElementById('bodyColor').innerText = bodyColor;
    document.getElementById('clothes').innerText = clothes;
    document.getElementById('season').innerText = season;
    document.getElementById('gender').innerText = gender;
    document.getElementById('eyeColor').innerText = eyeColor;
    document.getElementById('saveFileName').innerText = saveFileName;
    document.getElementById('boobSize').innerText = localStorage.getItem('boobSize');
    document.getElementById('penisSize').innerText = localStorage.getItem('penisSize');
    document.getElementById('assSize').innerText = localStorage.getItem('assSize');
    document.getElementById('rape').innerText = localStorage.getItem('rape');
    document.getElementById('footFetish').innerText = localStorage.getItem('footFetish');
    document.getElementById('sizeDifference').innerText = localStorage.getItem('sizeDifference');
}


function moveToChat(){
    window.location.href = '/chat'
}

function youShouldLogin() {
    console.log("You should login function called");
    var popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = 'You need to log in first.';
    
    document.body.appendChild(popup);
    console.log("Popup element created and appended to the document");

    popup.style.bottom = '-50px';

    setTimeout(function() {
        popup.style.bottom = '10px'; 
    }, 100);

    setTimeout(function() {
        popup.style.bottom = '-150px'; 
    }, 2000);

    setTimeout(function() {
        document.body.removeChild(popup);
        console.log("Popup element removed from the document");
    }, 2500);
}




