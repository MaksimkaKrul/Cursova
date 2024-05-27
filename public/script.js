let buttons = document.querySelectorAll('.button-collection button');
let currentTime = new Date(2024, 0, 1, 8, 0); 
let timeIncrement = 5; 
let currentIndexTextGame = 0;

const texts = [
    "First text for the content goes here.",
    "Second text for the content goes here.",
    "Third text for the content goes here.",
];


const setLocalStorageItem = (key, value) => {
    localStorage.setItem(key, value);
};


// ---------------------------------------
//ALL OF THE MOVING
// ---------------------------------------


const goToLogin = () => {
    window.location.href = '/login'; 
};

const goToRegister = () => {
    window.location.href = '/register';
};

const moveToChat = () => {
    window.location.href = '/chat';
};

// ---------------------------------------
// MODALS
// ---------------------------------------


const toggleModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal.style.display === "block") {
        modal.style.display = "none";
    } else {
        modal.style.display = "block";
    }
};


function closeModal(modal) {
    modal.style.display = "none";
    document.getElementById('content').style.opacity = "1";
}


// ---------------------------------------
//MAIN PAGE FUNCTIONS
// ---------------------------------------


const toggleMenu = () => {
    const menuContainer = document.getElementById("menu-container");
    const contentContainer = document.getElementById("content");
    const menuButton = document.getElementById("menu-button");

    const isMenuOpen = menuContainer.style.left === "0px";

    menuContainer.style.transition = "left 0.3s ease";
    contentContainer.style.transition = "margin-left 0.3s ease";
    menuButton.style.transition = "margin-left 0.3s ease";

    if (isMenuOpen) {
        menuContainer.style.left = "-250px";
        contentContainer.style.marginLeft = "0";
        menuButton.style.marginLeft = "0";
    } else {
        menuContainer.style.left = "0";
        contentContainer.style.marginLeft = "250px";
        menuButton.style.marginLeft = "250px";
    }
};


const changeContent = (content) => {
    const contentTextBox = document.getElementById("content-text-box");
    const selectedButton = event.target;

    document.querySelectorAll('.button-collection button').forEach(button => button.classList.remove('selected'));
    selectedButton.classList.add('selected');

    switch (content) {
        case 'Basic':
            contentTextBox.value = "With this customization you can change your character appearance and some other options.";
            break;
        case 'Advance':
            contentTextBox.value = "With this customization you can change your character appearance, some fetishes and other options.";
            break;
        case 'Full':
            contentTextBox.value = "With this customization you can change every option I can give you!";
            break;
        default:
            break;
    }
};

const selectOption = (option) => {
    const buttons = document.querySelectorAll('.option-button');
    const modalText = document.querySelector('.modal-text p');

    buttons.forEach(button => button.classList.remove('selected'));
    document.getElementById('option' + option + 'Button').classList.add('selected');

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
};

const changeTheme = (theme) => {
    const themes = {
        'default': {
            bodyBackgroundColor: '#000000',
            contentBackgroundColor: '#000000',
            contentTextColor: '#ffffff',
            buttonBackgroundColor: '#333',
            buttonTextColor: '#ffffff',
            menuButtonBackgroundColor: '#272727'
        },
        'white': {
            bodyBackgroundColor: '#FFFFFF',
            contentBackgroundColor: '#ffffff',
            contentTextColor: '#000000',
            buttonBackgroundColor: '#ffffff',
            buttonTextColor: '#000000',
            menuButtonBackgroundColor: '#dcdcdc'
        }
    };

    const {
        bodyBackgroundColor,
        contentBackgroundColor,
        contentTextColor,
        buttonBackgroundColor,
        buttonTextColor,
        menuButtonBackgroundColor
    } = themes[theme];

    document.body.style.backgroundColor = bodyBackgroundColor;
    document.getElementById("content-text-box").style.backgroundColor = contentBackgroundColor;
    document.getElementById("content-text-box").style.color = contentTextColor;

    const saveFileInput = document.querySelector(".save-file-input");
    saveFileInput.style.backgroundColor = contentBackgroundColor;
    saveFileInput.style.color = contentTextColor;

    document.getElementById("menu-button").style.backgroundColor = menuButtonBackgroundColor;

    const buttons = document.querySelectorAll('.button-collection button');
    buttons.forEach(button => {
        button.style.backgroundColor = buttonBackgroundColor;
        button.style.color = buttonTextColor;
    });

    const startGameButton = document.querySelector(".save-name button");
    startGameButton.style.backgroundColor = buttonBackgroundColor;
    startGameButton.style.color = buttonTextColor;

    console.log("Theme changed to: " + theme);
};

const changeFont = (font) => {
    const fonts = {
        'default': 'Calibri, sans-serif',
        'times-new-roman': 'Times New Roman, serif'
    };

    const bodyFontFamily = fonts[font];
    const buttonFontFamily = fonts[font];
    const inputFontFamily = fonts[font];

    document.body.style.fontFamily = bodyFontFamily;

    const settingsButtons = document.querySelectorAll('.settings-buttons button');
    settingsButtons.forEach(button => button.style.fontFamily = buttonFontFamily);

    const settingsContainer = document.querySelector('.settings-buttons');
    settingsContainer.style.fontFamily = bodyFontFamily;

    const contentTextBox = document.getElementById("content-text-box");
    contentTextBox.style.fontFamily = bodyFontFamily;

    const saveFileInput = document.querySelector(".save-file-input");
    saveFileInput.style.fontFamily = inputFontFamily;

    console.log("Font changed to: " + font);
};

const youShouldLogin = () => {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = 'You need to log in first.';

    document.body.appendChild(popup);

    void popup.offsetWidth;

    popup.style.bottom = '10px';

    setTimeout(() => {
        popup.style.bottom = '-150px';
        popup.addEventListener('transitionend', () => {
            document.body.removeChild(popup);
        }, { once: true });
    }, 2500);
};


// ---------------------------------------
//SAVE NAME, STARTING GAME AND CHARACTER OPTION
// ---------------------------------------


const startGame = () => {
    const saveFileName = document.getElementById("saveFileName").value;
    const customizationOption = document.querySelector(".button-collection .selected").textContent;
    const urls = {
        "Basic": "/basic",
        "Advance": "/advance",
        "Full": "/Full"
    };

    setLocalStorageItem('saveFileName', saveFileName);
    window.location.href = urls[customizationOption];
};

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

const displayCharacter = () => {
    let hairColor = localStorage.getItem('hairColor');
    let bodyColor = localStorage.getItem('bodyColor');
    let clothes = localStorage.getItem('clothes');
    let season = localStorage.getItem('season');
    let gender = localStorage.getItem('gender');
    let eyeColor = localStorage.getItem('eyeColor');
    let saveFileName = localStorage.getItem('saveFileName');

    const options = [
        { key: 'boobSize', default: 'normal' },
        { key: 'penisSize', default: 'normal' },
        { key: 'assSize', default: 'normal' },
        { key: 'rape', default: 'normal' },
        { key: 'footFetish', default: 'normal' },
        { key: 'sizeDifference', default: 'normal' },
    ];

    options.forEach(option => {
        if (!localStorage.getItem(option.key)) {
            localStorage.setItem(option.key, option.default);
        }
    });

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
};

const displayCharacterHidden = () => {
    const characterDetailsContainers = document.querySelectorAll('#menu-container .character-details div');
    
    characterDetailsContainers.forEach(container => {
        if (container.classList.contains('hidden')) {
            container.classList.remove('hidden');
        } else {
            container.classList.add('hidden');
        }
    });
};

document.getElementById('saveFileName').addEventListener('input', function() {
    var inputValue = this.value;

    var sanitizedValue = inputValue.replace(/[^a-zA-Z0-9]/g, '');

    this.value = sanitizedValue;
});


// ---------------------------------------
// FUNCTIONS FOR GAME
// ---------------------------------------


const updateTimeDisplay = () => {
    const timeDisplay = document.getElementById('timeDisplay');
    const formattedTime = currentTime.toLocaleTimeString('en-US', { hour12: false });
    timeDisplay.textContent = `Current Time: ${formattedTime}`;
}

const continueAction = () => {
    const mainText = document.getElementById('mainText');

    mainText.textContent = texts[currentIndexTextGame];

    if (currentIndexTextGame % 2 === 0) {
        timeIncrement = 5;
    } else {
        timeIncrement = 10;
    }

    currentIndexTextGame = (currentIndexTextGame + 1) % texts.length;

    currentTime.setMinutes(currentTime.getMinutes() + timeIncrement);

    updateTimeDisplay();
}
