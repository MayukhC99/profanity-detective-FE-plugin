import $ from 'jquery';

import { isProfane } from '../validator';
import { messageFormatter } from './utils/messsageUtils'; 
import { serializeInputs, invalidateField, validateField } from './utils/profanity';

let PROFANITY_INPUT_WATCH_COUNT = 0;

window.profanityDetector = function(element) {
    let { 
        self, 
        profanityAttr, 
        profanityType, 
        errorMessage 
    } = serializeInputs(element);
    
    // For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
    if (typeof profanityAttr !== typeof undefined && profanityAttr !== false) {
        let text = self.val();
        const profanityDetails = isProfane(text);
        if (!profanityDetails.valid) {
            const words = Object.keys(profanityDetails.wordCount);
            let curseWords = '';
            words.map((val, index) => {
                curseWords = index < (words.length - 1) ? `${curseWords + val}, ` : `${curseWords + val}`;
            });
            const PROFINITY_ERROR_MSG = messageFormatter(errorMessage, { words: curseWords });
            // Invalidate the field
            PROFANITY_INPUT_WATCH_COUNT = invalidateField(
                self, PROFINITY_ERROR_MSG, PROFANITY_INPUT_WATCH_COUNT, profanityType
            );
        } else {
            // Validate the field if no profanity found
            validateField(self);
        }
    }
};

$(document).on('keyup', 'input, textarea', function() {  profanityDetector($(this)); });
$(document).on('paste', 'input, textarea', function() {  profanityDetector($(this)); });
$(document).on('change', 'input, textarea', function() { profanityDetector($(this)); });



