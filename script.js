/* Character Sets */

const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";

const numbers = "0123456789";

const symbols = "!@#$%^&*()_+{}[]|;:,.<>?";

/* DOM Elements */

const passwordInput =
document.getElementById("password");

const copyBtn =
document.getElementById("copyBtn");

const copyMessage =
document.getElementById("copyMessage");

const lengthSlider =
document.getElementById("length");

const lengthValue =
document.getElementById("lengthValue");

const uppercaseCheckBox =
document.getElementById("uppercase");

const lowercaseCheckBox =
document.getElementById("lowercase");

const numbersCheckBox =
document.getElementById("numbers");

const symbolsCheckBox =
document.getElementById("symbols");

const generateBtn =
document.getElementById("generateBtn");

const strengthText =
document.getElementById("strengthText");

const strengthFill =
document.getElementById("strengthFill");

/* Update Length */

lengthSlider.addEventListener("input", () => {

lengthValue.textContent =
    lengthSlider.value;

generatePassword();

});

/* Secure Random Character */

function getRandomCharacter(characters) {

const randomIndex =
    Math.floor(
        Math.random() * characters.length
    );

return characters[randomIndex];

}

/* Shuffle Password */

function shufflePassword(passwordArray) {

for (
    let i = passwordArray.length - 1;
    i > 0;
    i--
) {

    const randomIndex =
        Math.floor(
            Math.random() * (i + 1)
        );

    [
        passwordArray[i],
        passwordArray[randomIndex]
    ] = [
        passwordArray[randomIndex],
        passwordArray[i]
    ];

}

return passwordArray;

}

/* Generate Password */

function generatePassword() {

const length =
    Number(lengthSlider.value);

let availableCharacters = "";

const selectedCharacters = [];


/* Check Uppercase */

if (uppercaseCheckBox.checked) {

    availableCharacters +=
        uppercaseLetters;

    selectedCharacters.push(
        getRandomCharacter(
            uppercaseLetters
        )
    );

}


/* Check Lowercase */

if (lowercaseCheckBox.checked) {

    availableCharacters +=
        lowercaseLetters;

    selectedCharacters.push(
        getRandomCharacter(
            lowercaseLetters
        )
    );

}


/* Check Numbers */

if (numbersCheckBox.checked) {

    availableCharacters +=
        numbers;

    selectedCharacters.push(
        getRandomCharacter(
            numbers
        )
    );

}


/* Check Symbols */

if (symbolsCheckBox.checked) {

    availableCharacters +=
        symbols;

    selectedCharacters.push(
        getRandomCharacter(
            symbols
        )
    );

}


/* No Options Selected */

if (availableCharacters.length === 0) {

    passwordInput.value =
        "Select an option";

    updateStrength("");

    return;

}


/* Selected Character Count
   Cannot exceed password length */

const passwordArray = [];


for (
    let i = 0;
    i < Math.min(
        selectedCharacters.length,
        length
    );
    i++
) {

    passwordArray.push(
        selectedCharacters[i]
    );

}


/* Fill Remaining Characters */

while (
    passwordArray.length < length
) {

    passwordArray.push(
        getRandomCharacter(
            availableCharacters
        )
    );

}


/* Shuffle */

shufflePassword(passwordArray);


/* Create Password */

const password =
    passwordArray.join("");


/* Display */

passwordInput.value =
    password;


/* Update Strength */

updateStrength(password);

}

/* Password Strength */

function updateStrength(password) {

if (!password) {

    strengthText.textContent =
        "None";

    strengthText.style.color =
        "gray";

    strengthFill.style.width =
        "0%";

    strengthFill.style.backgroundColor =
        "gray";

    return;

}


let score = 0;


/* Length */

if (password.length >= 8) {
    score++;
}

if (password.length >= 12) {
    score++;
}

if (password.length >= 16) {
    score++;
}


/* Uppercase */

if (/[A-Z]/.test(password)) {
    score++;
}


/* Lowercase */

if (/[a-z]/.test(password)) {
    score++;
}


/* Numbers */

if (/[0-9]/.test(password)) {
    score++;
}


/* Symbols */

if (/[^A-Za-z0-9]/.test(password)) {
    score++;
}


/* Strength Level */

if (score <= 2) {

    strengthText.textContent =
        "Weak";

    strengthText.style.color =
        "red";

    strengthFill.style.backgroundColor =
        "red";

    strengthFill.style.width =
        "30%";

}

else if (score <= 4) {

    strengthText.textContent =
        "Medium";

    strengthText.style.color =
        "orange";

    strengthFill.style.backgroundColor =
        "orange";

    strengthFill.style.width =
        "60%";

}

else {

    strengthText.textContent =
        "Strong";

    strengthText.style.color =
        "limegreen";

    strengthFill.style.backgroundColor =
        "limegreen";

    strengthFill.style.width =
        "100%";

}

}

/* Generate Button */

generateBtn.addEventListener(
"click",
() => {

    generatePassword();

    generateBtn.style.transform =
        "scale(0.95)";

    setTimeout(() => {

        generateBtn.style.transform =
            "";

    }, 100);

}

);

/* Character Options */

uppercaseCheckBox.addEventListener(
"change",
generatePassword
);

lowercaseCheckBox.addEventListener(
"change",
generatePassword
);

numbersCheckBox.addEventListener(
"change",
generatePassword
);

symbolsCheckBox.addEventListener(
"change",
generatePassword
);

/* Copy Password */

copyBtn.addEventListener(
"click",
async () => {

    const password =
        passwordInput.value;


    if (
        !password ||
        password === "Select an option"
    ) {

        return;

    }


    try {

        await navigator.clipboard.writeText(
            password
        );

        showCopyMessage();

    }

    catch (error) {

        passwordInput.select();

        document.execCommand("copy");

        showCopyMessage();

    }

}

);

/* Copy Message */

function showCopyMessage() {

copyMessage.classList.add("show");


setTimeout(() => {

    copyMessage.classList.remove(
        "show"
    );

}, 1500);

}

/* Initial Password */

generatePassword();