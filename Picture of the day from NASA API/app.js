var baseUrl = new URL("https://api.nasa.gov/planetary/apod?api_key=rLYEnPwoNeVa6MoVLrnPP5U8TSogNxHesbDtc32Q&");


function getPicture() {
    showLoader();
    displayInput()
    // set the query params
    var dateValue = document.getElementById("inputDate");
    console.log(dateValue.value);
    baseUrl.searchParams.set("date", dateValue.value);
    console.log(baseUrl);

    fetch(baseUrl, {
        method: 'GET'
    })
        .then(handleResponse)
        .then(function (jsonResponse) {
            console.log(jsonResponse);
            if (jsonResponse.media_type !== "image") {
                dateWithoutPicture(jsonResponse);
            } else {
                displayPicture(jsonResponse);
            }
        })
        .catch(function (error) {
            console.log(error);
            console.log("error!");
        })
        .finally(hideLoader)
}


function handleResponse(response) {
    if (response.status === 404 || response.status === 400) {
        throw new Error("Date must be between Jun 16, 1995 and today!");
    } else if (response.status === 500) {
        throw new Error("Something went wrong!Plese try again!");
    } else if (response.status === 200) {
        return response.json();
    }
    console.log(response);
}

// display the picture for the selected date and its title
function displayPicture(result) {
    console.log('result: ' + result);
    var pictureCard = document.createElement("div");
    pictureCard.classList.add("picture-card");
    pictureCard.setAttribute("id", "pictureCard");

    var input = document.getElementById("inputDate");
    var pictureTitle = document.createElement("div");
    pictureTitle.classList.add("picture-title");

    if (input.value == '') {
        pictureTitle = "Today's picture: " + result.title;
    } else {
        pictureTitle = input.value + " picture: " + result.title;
    }

    var picture = document.createElement("img");
    picture.src = result.url;
    console.log('display picture: ' + result.url);

    pictureCard.append(pictureTitle, picture);
    document.getElementById("displayPicture").prepend(pictureCard);
    console.log(document.getElementById("displayPicture"));
}

// some dates don't have an image they have video or another type of media throw an error to inform the user
function dateWithoutPicture(result) {
    console.log(result);
    if (result.media_type !== "image") {
        var missingPicture = document.getElementById("displayError");
        missingPicture.innerHTML = "Error: Selected day doesn't have a picture! Please try another day!";
        var result = document.getElementById("displayResult");
        result.append(missingPicture);
        missingPicture.style.display = "block";
    } else {
        missingPicture.style.display = "none";
    }
}


function displayInput() {
    var input = document.getElementById("inputDate");
    var inputValue = input.value;
    console.log(inputValue);

    if (inputValue !== '') {
        var userChoice = new Date(inputValue);
        console.log(userChoice);
    } else if (inputValue == '') {
        todaysPicture();
    }
    var todayDate = Date.now();

    var minDate = new Date(1995, 06, 16);

    // displayed error for the dates outside of the interval
    var error = document.getElementById("displayError");
    error.innerHTML = "Error: Date must be between Jun 16, 1995 and Today";

    var result = document.getElementById("displayResult");
    result.append(error);
    console.log(result);

    if (userChoice > todayDate || userChoice < minDate) {
        error.style.display = "block";
    } else {
        error.style.display = "none";
    }

    //  display by default today's picture
    function todaysPicture() {
        if (inputValue == '') {
            inputValue = new Date(Date.now());
            formatDate(inputValue);
            console.log(formatDate(inputValue));
        }

        function formatDate(inputValue) {
            var day = inputValue.getDate();

            var month = inputValue.getMonth();
            month = month + 1;

            var year = inputValue.getFullYear();
            return year + "-" + month + "-" + day;
        }
    }
}

// show a loader
function showLoader() {
    var loader = document.getElementById("appLoader");
    loader.style.display = "block";
}

function hideLoader() {
    var loader = document.getElementById("appLoader");
    loader.style.display = "none";
}



window.addEventListener("load", function () {
    displayInput();
    getPicture();

    var addDate = document.getElementById("seePicture");
    addDate.addEventListener("click", function () {
        getPicture();

        // Before making a request to the server hide the previouse picture
        document.getElementById("pictureCard").style.display = "none";
    });
})