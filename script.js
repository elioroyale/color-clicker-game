document.addEventListener("DOMContentLoaded", function(event) {

    let clickerCounter = 0
    let autoClickerPurchased = false
    const autoClicker50PayValue = 50
    const autoClickerInterval = 1500

    function updateClickCounter() {

    }

    const bgButton = document.getElementById("colorButton");
    bgButton.addEventListener("click", function() {
        const colorButton = document.getElementById("colorButton")
        const h1Welcome = document.getElementById("h1-welcome")

        // colorButton.style.display = "none"
        h1Welcome.style.display = "none"

        clickerCounter++

        updateAutoClickerButton()

        manualColorClicker()
    });

    const autoClickButton50 = document.getElementById("auto-clicker-50");
    autoClickButton50.addEventListener("click", function() {
        if (autoClickerPurchased === false && clickerCounter >= autoClicker50PayValue) {
            clickerCounter -= autoClicker50PayValue
            autoColorClicker(autoClickerInterval)
            autoClickerPurchased = true
        }
    })

    const boostButtonAutoClick = document.getElementById("boost-auto-clicker")
    boostButtonAutoClick.addEventListener("click", function() {
        if (clickerCounter >= autoClicker50PayValue) {
            clickerCounter -= autoClicker50PayValue
            autoColorClicker(autoClickerInterval)
        }
    })
    

    function manualColorClicker() {
        const colorClicker = document.getElementById("color-clicker")

        changeBackgroundWithRandomColor()

        if (clickerCounter === 1) {
            value = `${clickerCounter} Color`
        } else {
            value = `${clickerCounter} Colors`
        }

        colorClicker.textContent = value
    }

    function autoColorClicker(interval) {
        setInterval(() => {
            changeBackgroundWithRandomColor()

            // update counter
            clickerCounter++

            updateAutoClickerButton()

            // update
            manualColorClicker()
        }, interval);
    }

    function changeBackgroundWithRandomColor() {
        // Random color generator
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        console.log('Random Color Value: ' ,  randomColor) 
        document.body.style.backgroundColor = randomColor;
    }

    function updateAutoClickerButton() {
        if (autoClickerPurchased === false && clickerCounter >= autoClicker50PayValue) {
            const autoClickButton50 = document.getElementById("auto-clicker-50")
            autoClickButton50.disabled = false
            autoClickButton50.style.display = "inline"

            // Remove greyed-out appearance
            autoClickButton50.style.backgroundColor = ""; // Reset the background color
            autoClickButton50.style.color = "";          // Reset the text color
            autoClickButton50.style.cursor = "pointer";  // Enable cursor pointer
        } else if (autoClickerPurchased === true) {
            autoClickButton50.style.display = "none"
            autoClickButton50.disabled = true
            
            const boostButton = document.getElementById("boost-auto-clicker")
            boostButton.disabled = false
            boostButton.style.display = "inline"
        }
    }


    // manual click button

    // auto click button for 50 colors (1 time purchase)

    // boost auto clicks for 50 colors (reapeatable as long as you have collected colors)
});
