/*jslint browser: true, white: true */
/*global define, require */

module.exports = function (refNumber) {

    // Table from https://www.credit-suisse.com/media/production/pb/docs/unternehmen/kmugrossunternehmen/besr_technische_dokumentation_fr.pdf
    var table = [
        [0,9,4,6,8,2,7,1,3,5],
        [9,4,6,8,2,7,1,3,5,0],
        [4,6,8,2,7,1,3,5,0,9],
        [6,8,2,7,1,3,5,0,9,4],
        [8,2,7,1,3,5,0,9,4,6],
        [2,7,1,3,5,0,9,4,6,8],
        [7,1,3,5,0,9,4,6,8,2],
        [1,3,5,0,9,4,6,8,2,7],
        [3,5,0,9,4,6,8,2,7,1],
        [5,0,9,4,6,8,2,7,1,3]
      ],
    maxLength = 26, // The maximun length for the reference number on base 0
    report = 0; // The default report number

    /**
     * Get the key number for the given reference number
     *
     * @param {string} refNumber The reference number without the key number (26 characters)
     * @return {int} The valid key number for the current reference number
     */
    this.getKey = function () {
        // Reset the report
        report = 0;

        // Remove the white space in the reference number and convert it to array
        refNumber = refNumber.split(" ").join("").split("");

        // Get the report number
        for (var i = 0; i < refNumber.length && i < maxLength; i++) {
            report = table[report][refNumber[i]];
        }

        // Return the validation key for a mod-10
        return (report !== 0) ? 10 - report : 0;
    }
};