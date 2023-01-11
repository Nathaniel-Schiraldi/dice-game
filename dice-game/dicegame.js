/*Author: Nathaniel Schiraldi
Student Number: 000855552
File Created: February 26, 2022
Description: Script used to create functionality to the dice rolling game and provide validation to user input on the index.html webpage.*/

/**
 * Code is executed after the window is loaded.
 */
window.addEventListener("load", function() {
    
    // Allow variables to be used throughout the program.
    let helpButton = document.querySelector(".help");
    let rollDiceButton = document.querySelector(".rolldice");
    let resetButton = document.querySelector(".reset");
    let difficultyList = document.forms.gameform.querySelectorAll(".difficulty");
    let userName = "";
    let hasError = false;
    let userDifficultyLevel = 0;
    let winCounter = 0;
    let lossCounter = 0;

    document.querySelector(".winlosscounter").innerHTML = "<p>Won: " + winCounter + " Lost: " + lossCounter + "</p>";

    /**
     * Code executes when the game form receives a submission from the submit button (.startgame).
     */
    document.forms.gameform.addEventListener("submit", function(event) {
        event.preventDefault();
        userName = document.forms.gameform.username.value;
        let errorNumber = 0;
        // Regular Expression used to check all letters in user input https://www.w3resource.com/javascript/form/all-letters-field.php 
        const ONLYLETTERS = /^[A-Za-z]+$/; // I wanted to use this because its a clean method of validating one part of the username. (I know we didn't learn this exactly in class but I wanted to try a different approach)
        hasError = false;

        /**
         * Performs username validation. Checks for appropriate length, characters, and order.
         * Will call the formValidationError function when an error is calculated for the username.
         * Hides the error message when no error is calculated.
         */
        function userNameValidation() {
            if (userName.length < 4 || userName.length > 8 || !(userName.match(ONLYLETTERS))) {
                hasError = true;
                errorNumber = 1;
                formValidationError();
            }
            
            for (let indexCounter = 0; indexCounter < userName.length - 1; indexCounter ++) {
                if ((userName.toLowerCase().charCodeAt(indexCounter)) >= (userName.toLowerCase().charCodeAt(indexCounter + 1))) {
                    hasError = true;
                    errorNumber = 1;
                    formValidationError();
                }
            }
            
            if (hasError === false) {
                document.querySelector(".error1").style.display="none";
            }    
        }

        /**
         * Performs difficulty level valdiation. Identifies the checked status of all 3 radio difficulty level radio buttons.
         * Will call the formValidationError function when an error is calculated for the difficulty level.
         * Hides the error message and calls the setUserDifficultyLevel function when no error is calculated.  
         */
        function difficultyLevelValidation() {
            if ((document.forms.gameform.difficulty[0].checked == false) && (document.forms.gameform.difficulty[1].checked == false) && (document.forms.gameform.difficulty[2].checked == false)) {
                hasError = true;
                errorNumber = 2;
                formValidationError();
            }
            else {
                document.querySelector(".error2").style.display="none";
                setUserDifficultyLevel();
            }    
        }

        /**
         * Determines the error number that the corresponding error is assigned to.
         * Displays the error text to the screen.
         */
        function formValidationError() {
            if (errorNumber === 1) {
                let firstError = document.querySelector(".error1");
                firstError.style.display="block";
                firstError.style.color = "red";
                firstError.innerHTML = "<p>Error: Username MUST have 4-8 ASCENDING LETTERS</p>";
            }
            else {
                let secondError = document.querySelector(".error2");
                secondError.style.display="block";
                secondError.style.color = "red";
                secondError.innerHTML = "<p>Error: Select Difficulty EASY, MEDIUM, or HARD</p>";
            }
        }

        /**
         * Determines the difficulty level the user selected.
         * Will turn the difficulty level value from a string into a Number.
         */
        function setUserDifficultyLevel() {
            for (let currentDifficultyLevel = 0; currentDifficultyLevel < 3; currentDifficultyLevel++) {
                if (document.forms.gameform.difficulty[currentDifficultyLevel].checked == true) {
                    userDifficultyLevel = document.forms.gameform.difficulty[currentDifficultyLevel].value;
                    userDifficultyLevel = parseInt(userDifficultyLevel);
                }
            }
        }
        
        /**
         * Sets the current game state after username and difficulty level validation.
         * Prevents the user from changing the difficulty level and their username.
         * Automatically turns their first letter of their username to an upper case letter.
         * Displays and enables the total prediction section, help button, and roll dice button. 
         */
        function gameSetup() {
            document.querySelector(".startgame").disabled = true;
            document.querySelector(".totalprediction").style.display="block";
            document.querySelector(".rolldice").style.display="inline";
            document.querySelector(".help").style.display="inline";
            
            
            userName = userName.split("");
            userName[0] = userName[0].toUpperCase();
            userName = userName.join("");
            document.forms.gameform.username.value = userName;
            document.querySelector("#username").disabled = true;
            
            for (let value = 0; value < difficultyList.length; value++) {
                difficultyList[value].disabled = true;
            }

            helpButton.disabled = false;
            rollDiceButton.disabled = false;
            
        }

        // Calls the userNameValidation and difficultyLevelValidation functions.
        userNameValidation();
        difficultyLevelValidation();

        // If there are no errors identified the gameSetup function will be called.
        if (hasError === false) {
            gameSetup();
        }
    });

    /**
     * Code executes when the help button (.help) is clicked. 
     */
    helpButton.addEventListener("click", function() {
        // The help button is disabled after clicked.
        // Provides user with further instructions to play the game.
        document.querySelector(".help").disabled = true;
        document.querySelector(".helpmessage").style.display="block";
        document.querySelector(".helpmessage").style.color = "blue";
        document.querySelector(".helpmessage").innerHTML = "<p>Enter a Numeric Total in the Prediciton Text Box and Click the \"Roll Dice\" Button</p>";
    });

    /**
     * Code executes when the roll dice button (.rolldice) is clicked. 
     */
    rollDiceButton.addEventListener("click", function() {
        let predictTotal = document.forms.gameform.predicttotal.value;
        let thirdError = document.querySelector(".error3");

        /**
         * Performs total predicition valdiation. Checks if the prediction total is a number and the magnitude of the predction.
         * Will call the totalValidationError function when an error is calculated in the total prediction.
         */
        function predictTotalValidation() {
            if (isNaN(predictTotal) === false) {
                predictTotal = parseInt(predictTotal);
                if (predictTotal >= 2 && predictTotal <= 12) {
                    hasError = false;
                }
                else {
                    hasError = true;
                    totalValidationError();
                }
            }
            else {
                hasError = true;
                totalValidationError();
            }
        }

        /**
         * Displays the error text to the screen.
         */
        function totalValidationError() {
            thirdError.style.display="block";
            thirdError.style.color = "red";
            thirdError.innerHTML = "<p>Error: Select a NUMBER between 2-12</p>";
        }

        /**
         * Determines the state of the game for the user either being a win or a loss.
         * If the user won the game the userWin function is called.
         * If the user lost the game the userLoss function is called.
         * @param {Number} sum 
         */
        function determineWinOrLoss(sum) {
            if (sum === predictTotal) {
                userWin();
            }

            else {
                if (userDifficultyLevel === 1) {
                    if (sum >= 6 && sum <= 12) {
                        userWin();
                    }
                    else {
                        userLoss();
                    }
                }

                else if (userDifficultyLevel === 2) {
                    if (sum >= 8 && sum <= 12) {
                        userWin();
                    }
                    else {
                        userLoss();
                    }
                }

                else {
                    if (sum >= 10 && sum <= 12) {
                        userWin();
                    }
                    else {
                        userLoss();
                    }
                }
            }
        }

        /**
         * Updates total win counter and displays win message.
         */
        function userWin() {
            winCounter++;
            document.querySelector(".victorydefeatmessage").style.display="block";
            document.querySelector(".victorydefeatmessage").style.color = "green";
            document.querySelector(".winlosscounter").innerHTML = "<p>Won: " + winCounter + " Lost: " + lossCounter + "</p>";
            document.querySelector(".victorydefeatmessage").innerHTML = "<p>" + userName + " conquered their dice rolling achieving great victory!</p>";
        }

        /**
         * Updates total loss counter and displays loss message.
         */
        function userLoss() {
            lossCounter++;
            document.querySelector(".victorydefeatmessage").style.display="block";
            document.querySelector(".victorydefeatmessage").style.color = "red";
            document.querySelector(".winlosscounter").innerHTML = "<p>Won: " + winCounter + " Lost: " + lossCounter + "</p>";
            document.querySelector(".victorydefeatmessage").innerHTML = "<p>" + userName + " failed their dice rolling resulting in a miserable defeat!</p>";
        }

        /**
         * Rolls two dice, displays the images of the two dice and the operators, computes a sum, and applies styles to the images and sum.
         * Disables the previous buttons (help button and roll dice button) and displays the reset button (.reset).
         * Calls the determineWinOrLoss function passing through sum (Number).
         */
        function rollDice() {
            document.querySelector(".helpmessage").style.display="none";
            helpButton.disabled = true;
            rollDiceButton.disabled = true;
            resetButton.style.display="inline";

            let diceSpace = document.querySelector("#showsum");
        
            thirdError.style.display="none";
            
            let firstDiceRoll = Math.floor((Math.random() * 6) + 1);
            let secondDiceRoll = Math.floor((Math.random() * 6) + 1);
            let sum = firstDiceRoll + secondDiceRoll;
            let firstDiceImg = document.createElement("img");
            let secondDiceImg = document.createElement("img");
            let additionSignImg = document.createElement("img");
            let equalSignImg = document.createElement("img");
            let sumDisplay = document.createElement("p");
            let sumTotal = document.createTextNode(sum);
            sumDisplay.appendChild(sumTotal);

            firstDiceImg.src = "dicegamephotos/dice" + firstDiceRoll + ".png";
            additionSignImg.src = "dicegamephotos/addition.jpg";
            secondDiceImg.src = "dicegamephotos/dice" + secondDiceRoll + ".png";
            equalSignImg.src = "dicegamephotos/equal.png";
            diceSpace.appendChild(firstDiceImg);
            diceSpace.appendChild(additionSignImg);
            diceSpace.appendChild(secondDiceImg);
            diceSpace.appendChild(equalSignImg);
            diceSpace.appendChild(sumDisplay);
            diceSpace.setAttribute("class", "textcenter");
            firstDiceImg.setAttribute("class", "rightmargin");
            secondDiceImg.setAttribute("class", "leftmargin rightmargin");
            sumDisplay.setAttribute("class", "leftmargin bigFont");
            sumDisplay.style.display="inline";

            determineWinOrLoss(sum);
        }

        // Calls the predictTotalValidation function.
        predictTotalValidation();

        // If there are no errors identified the rollDice function will be called.
        if (hasError === false) {
            rollDice();
        }
    });

    /**
     * Code executes when the reset button (.reset) is clicked.
     */
    resetButton.addEventListener("click", function() {
        
        /**
         * Hides buttons and messages which are used later in the game.
         * Removes dice images, operator images, and sum total from the previous game.
         * Enables the username selection, difficulty level selection, and start game button for the user to choose new settings or keep the previous ones.
         */
        function performReset() {
            resetButton.style.display="none";
            helpButton.style.display="none";
            rollDiceButton.style.display="none";
            document.querySelector(".totalprediction").style.display="none";
            document.querySelector(".victorydefeatmessage").style.display="none";
            
            let diceSpace = document.querySelector("#showsum");
            let correctIndex = document.querySelector(".bigFont");
            diceSpace.removeChild(correctIndex);
            let imagesList = document.querySelectorAll("img");
            for (let image = 0; image < imagesList.length; image++) {
                imagesList[image].remove();
            }
        
            document.querySelector("#username").disabled = false;
            for (let value = 0; value < difficultyList.length; value++) {
                difficultyList[value].disabled = false;
            }
            document.querySelector(".startgame").disabled = false;
        }

        // Calls the performReset function.
        performReset();
    });
});
