import $ from 'jquery';

import { DEFAULT_ERROR_MESSAGE } from './messsageUtils'; 

/**
 * Reads and returns the input provided by the
 * host application
 * 
 * @param element : The dom element which is getting processed
 * @returns       : The serialized input value from host application
 */
export const serializeInputs = (element) => {
    let self = $(element),
        profanityAttr = self.attr('detect-profanity'),
        profanityType = self.attr('profanity-type'),
        errorMessage = self.attr('profanity-message') || DEFAULT_ERROR_MESSAGE;

    // filter profanity-type
    if (!(profanityType === 'error')) {
        profanityType = 'warn';
    }
    
    return {
        self,
        profanityAttr,
        profanityType,
        errorMessage
    };
}


/**
 * Invalidates the field and renders a message in the DOM under the
 * input element
 *  
 * @param {*} self : The element which is getting processed
 * @param {String} PROFINITY_ERROR_MSG : The error message needed to be rendered 
 * @param {Number} PROFANITY_INPUT_WATCH_COUNT : THe watch count of input elements
 * @param {String} profanityType : The type of message to be displayed
 * @returns : The updated watch count of input elements
 */
export const invalidateField = (
    self, 
    PROFINITY_ERROR_MSG, 
    PROFANITY_INPUT_WATCH_COUNT,
    profanityType
) => {
    // set a profane-valid and aria-invalid attribute as False
    self.attr('profane-valid', false);

    if (self.data('profanity-count')) {
        $(`span[data-profanity-count="${self.data('profanity-count')}"]`).empty().append(PROFINITY_ERROR_MSG);
    } else {
        PROFANITY_INPUT_WATCH_COUNT = PROFANITY_INPUT_WATCH_COUNT + 1; // incrementing by 1 for unique `data-profanity-count` val for each input and its char counter
        self.attr('data-profanity-count', PROFANITY_INPUT_WATCH_COUNT);

        // insert span char counter after textarea
        $(
            `<span class="profanity-help-block ${profanityType}" data-profanity-count="${PROFANITY_INPUT_WATCH_COUNT}" style="display:none;">${PROFINITY_ERROR_MSG}</span>`
        ).insertAfter(self).fadeIn();
    }

    return PROFANITY_INPUT_WATCH_COUNT;
}


/**
 * Validates the field and removes any rendered message
 * 
 * @param {*} self : The element which is getting processed
 */
export const validateField = (self) => {
    if (self.data('profanity-count')) {
        self.attr('profane-valid', true);
        $(`span[data-profanity-count="${self.data('profanity-count')}"]`).empty().append('');
    }
}

