import $ from 'jquery';

import { DEFAULT_ERROR_MESSAGE } from './messsageUtils'; 

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
}

export const validateField = (self) => {
    if (self.data('profanity-count')) {
        self.attr('profane-valid', true);
        $(`span[data-profanity-count="${self.data('profanity-count')}"]`).empty().append('');
    }
}

