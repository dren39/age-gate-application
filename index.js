document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    //------------------Variables------------------------------------
    const monthForm = document.querySelector('#month-form');
    const monthSelect = document.querySelector('#month-select');
    const yearForm = document.querySelector('#year-form');
    const yearSelect = document.querySelector('#year-select');
    const btn = document.querySelector('#submit-btn');
    const body = document.querySelector('body');
    const checkbox = document.querySelector('#checkbox');
    const gateContainer = document.querySelector('#gate-container');
    const errMsg = document.querySelector('#err-message');
    const welcomeMsg = document.querySelector('#welcome-msg')
    let userMonth;
    let userYear;
    let currentMonth;
    let currentYear;
    const currentDate = new Date();
    let token;

    //--------------------------Functions-----------------------------------------
    function renderMonth(month, monthCounter) {
        //this helper method creates an option element for each month and adds it to the month selector
        monthSelect.innerHTML += `
            <option value = ${monthCounter}>${month}</option>
        `
    }

    function iterateMonths() {
        //this function iterates over the months array and calls renderMonth for each month element
        const monthArray = ["Janunary", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let monthCounter = 0;
        monthArray.forEach(month => {
            monthCounter = monthCounter+1;
            renderMonth(month, monthCounter);
        })
    }

    function makeRange() {
        //this function creates a range of integers from 1920-2019 to present the last 99 years
        const yearRange = Array.from(Array(100), (x, index) => index + 1920 )
        yearRange.reverse().forEach(year => {
            //iterate over the array in reverse and create an option element for each year and add to the yearSelect element
            yearSelect.innerHTML += `
                <option value=${year}>${year}</option>
            `
        })
    }

    function removeGate() {
        //replace dropdown with welcome message
        errMsg.style.display = "none";
        errMsg.innerText = "";
        gateContainer.style.display = 'none';
        welcomeMsg.style.display = 'block';
    }

    function getToken() {
        //check for token in localStorage on page load, if it exists then go straight to welcome message
        const foundToken = localStorage.getItem('token');
        if(foundToken) {
            removeGate();
        }
    }

    function Initialize() {
        getToken();
        iterateMonths();
        makeRange();
    }

    //---------------------Eventlistener----------------------------------
    monthForm.addEventListener('change', event => {
        //save the user input month and check to see it's a valid integer
        userMonth = parseInt(event.target.value);
        if(userMonth) {
            currentMonth = currentDate.getMonth()+1;
        }
    })

    yearForm.addEventListener('change', event => {
        //save the user input for year and check to see if it's a valid integer
        userYear = parseInt(event.target.value);
        if(userYear) {
            currentYear = currentDate.getFullYear();
        }
    })

    checkbox.addEventListener('input', event => {
        //if the checkbox has been checked then create and save a token to localstorage
        if(event.target.checked && currentYear - userYear > 21 || event.target.checked && currentYear - userYear == 21 && currentMonth >= userMonth) {
            token = "age token";
            localStorage.setItem('token', token);
        } else {
                localStorage.removeItem('token');
        }
    })

    btn.addEventListener('click', event => {
        //if user doesn't enter a valid value for month or year then don't let them proceed
        if(!userMonth || !userYear) {
            errMsg.innerText = "Please enter a valid month or year";
            errMsg.style.display = "block";
        } else if(currentYear - userYear > 21 || currentYear - userYear == 21 && currentMonth >= userMonth) {
                //if they are older then 21 or is 21 and the birth month has come or passed then they are allowed to enter
                removeGate();
        } else {
                errMsg.innerText = "You must be of legal drinking age to enter this site";
                errMsg.style.display = "block";
        }
    })

    //Initialize function
    Initialize();
 
});