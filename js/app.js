import QrScanner from "../libraries/qr-scanner/qr-scanner.min.js";
// import the QrScanner object from the qr-scanner.min.js file. Otherwise we can't use it.

(function () {

    'use strict';

    var app = angular.module('little_scanner_SPWA', []);

    app.controller('Main', control);

    control.$inject = [];

    function control() {
        var vm = angular.extend(this, {
            date: new Date().toString()
        });

        function scanHandler(result) {
            // function that executes when a barcode is detected

            // display the data read from the QR code
            alert(result);
        }

        vm.scanBarcode = function () {
            // get the <video> element
            let videoElement = document.querySelector('#qr-video');

            // create the scanner
            const scanner = new QrScanner(videoElement, scanHandler);

            // start scanning
            scanner.start();
        };

        return vm;
    }

})();