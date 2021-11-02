import { isProfane } from '../validator';

class detectProfanity {
    constructor(text='') {
        this.details = {};
        //Bind this to the scope of methods
        this.verify = this.verify.bind(this);

        this.verify(text);
    }

    /**
     * The method checks and returns true if
     * the string is valid, otherwise false
     * 
     * @param {String} text : string to verify profanity 
     * @returns {Boolean}   : If the string is valid or not 
     */
    verify(text) {
        const details = isProfane(text);
        this.details = {
            ...details,
            wordsWithCategory: details.words,
            words: Object.keys(details.words)
        };
        return this.details.valid;
    }

    /**
     * Returns the details of profanity check done using verify method
     * The details can also be accessed through instance property details
     * 
     * @returns {Object}   : Details object post validation is done using verify method
     */
    details() {
        return this.details;
    }
}

export default detectProfanity;
