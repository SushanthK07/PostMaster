// Utility functions

function createElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
    // return div;
}

let urlEl = document.getElementById('url');
let getEl = document.getElementById('get');
let postEl = document.getElementById('post');

let requestParametersBoxEl = document.getElementById('requestParametersBox');
let requestJSONBoxEl = document.getElementById('requestJSONBox');
let requestJSONTextEl = document.getElementById('requestJSONText');

let submitBtnEl = document.getElementById('submitBtn');

let responseJSONBoxEl = document.getElementById('responseJSONBox');
let responseJSONTextEl = document.getElementById('responseJSONText');

let jsonRadioEl = document.getElementById('jsonRadio');
let paramsRadioEl = document.getElementById('paramsRadio');
let addParamBtnEl = document.getElementById('addParamBtn');

let paramCount = 1;

// hide paramsbox if json radio is checked
paramsRadioEl.addEventListener('change', function () {

    if (paramsRadioEl.checked) {
        requestJSONBoxEl.classList.add('d-none');
        requestParametersBoxEl.classList.remove('d-none');
    }
})

// hide jsonbox if params radio is checked
jsonRadioEl.addEventListener('change', function () {
    if (jsonRadioEl.checked) {
        requestJSONBoxEl.classList.remove('d-none');
        requestParametersBoxEl.classList.add('d-none');
    }
})

addParamBtnEl.addEventListener('click', () => {
    console.log("Add clicked");
    paramCount += 1
    html = `<div class="row my-3 form-group">
            <label for="url" class="col-2 col-form-label">Parameter ${paramCount}</label>
            <div id="parametersBox${paramCount}" class="col-9">
                <form>
                <div class="row">
                    <div class="col">
                    <input id="parameterKey${paramCount}" type="text" class="form-control" placeholder="Enter Parameter Key">
                    </div>
                    <div class="col">
                    <input id="parameterValue${paramCount}" type="text" class="form-control" placeholder="Enter Parameter Value">
                    </div>
                </div>
                </form>
            </div>
            <div class="col-1">
                <button class="btn btn-primary deleteParamBox">-</button>
            </div>
            </div>
            `;
    let newParameterBox = createElementFromString(html);
    // console.log(newParameterBox);
    requestParametersBoxEl.appendChild(newParameterBox);

    // Add an event listener to remove parambox on clicking - button
    let deleteParamBoxEls = document.getElementsByClassName('deleteParamBox');
    for (item of deleteParamBoxEls) {
        item.addEventListener('click', e => {
            // TODO: add a confirmation box to remove the box
            e.target.parentElement.parentElement.remove();
        })
    }
})

submitBtnEl.addEventListener('click', () => {
    // Show Loading... (spinner)
    // responseJSONTextEl.value = "Please Wait...Fetching Response";
    responseJSONTextEl.textContent = "Please Wait...Fetching Response";

    // Fetch all values the user has entered
  
    let url = urlEl.value;
    let request;
    if (getEl.checked) request = getEl.value;
    else request = postEl.value;
    
    let content = document.querySelector("input[name='content']:checked").value;

    // For Debugging
    console.log("URL is", url);
    console.log("Request is", request);
    console.log("Content is", content);

    // if user opts for parameters, then collect all parameters in an object
    if (content === 'parameters') {
        data = {};
        for (i = 1; i <= paramCount; i++) {
            let keyEl = document.getElementById('parameterKey' + i);
            if (keyEl) {
                key = keyEl.value;
                let value = document.getElementById('parameterValue' + i).value;
                data[key] = value;
            }
        }
    }
    else {
        data = requestJSONTextEl.value;
    }
    console.log("Data is ", data);

    // Request configuration
    let options = {
        method: request,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer b7530e4d3b8752e1b4bf82976697d001fe336219a76df455e03a5687efb6df1e'
        },
        body: data
    }
    console.log("Options Configuration is", options);
    
    // Making fetch request
    if (request === "GET") {
        fetch(url)
        .then(response => response.json())
        .then(jsonData => {
            let stringifiedData = JSON.stringify(jsonData);
            // responseJSONTextEl.value = stringifiedData;
            responseJSONTextEl.innerHTML = stringifiedData;
            Prism.highlightAll();
            console.log(jsonData);
        });
    }
    else {
        fetch(url, options)
        .then(response => response.json())
        .then(jsonData => {
            let stringifiedData = JSON.stringify(jsonData);
            // responseJSONTextEl.value = stringifiedData;
            responseJSONTextEl.innerHTML = stringifiedData;
            Prism.highlightAll();
            console.log(jsonData);
        });
    }
})

/*
{
"name": "Random",
"email": "random@email.com",
"gender": "Male",
"status": "Active",
}

https://randomuser.me/api
https://jsonplaceholder.typicode.com/todos/1
*/