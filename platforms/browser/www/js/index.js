/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        checkLogin();
        takePicture();
        // predict();
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);

        console.log('Received Event: ' + id);
    },
};

app.initialize();

function checkLogin() {
    var storage = window.localStorage;
    if (!storage.getItem('secret_key'))
        window.location = "login.html";
}

function takePicture() {
    console.log(navigator.camera);
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
        destinationType: Camera.DestinationType.DATA_URL });
    
    function onSuccess(imageData) {
        alert("sending");
        $.ajax({url: "http://anish.banaborg.tech:5000/gender", dataType:'text', cache:false, type:"POST",
                data: {image : imageData},
            success: function(result){
                alert(result);
            },
            error: function(xhr,status,error) {
                alert("Server Error");
            }
        });
    }
    
    function onFail(message) {
        alert('Failed because: ' + message);
    }
}

function predict() {
    // More API functions here:
            // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

            // the link to your model provided by Teachable Machine export panel
            const URL = '';

            let model, webcam, labelContainer, maxPredictions;

            // Load the image model and setup the webcam
            async function init() {
                const modelURL = URL + 'model.json';
                const metadataURL = URL + 'metadata.json';

                // load the model and metadata
                // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
                // or files from your local hard drive
                model = await tmImage.load(modelURL, metadataURL);
                maxPredictions = model.getTotalClasses();

                const pred = await model.predict(document.getElementById('face'), false);
                console.log(pred);
            }
}