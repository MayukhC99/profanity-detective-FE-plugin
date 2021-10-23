import $ from 'jquery';
import swearjar from 'swearjar-extended2';

var PROFANITY_INPUT_WATCH_COUNT = 0;

window.profanityDetector = function(element) {
    let self = $(element),
        profanityAttr = self.attr('detectProfanity'),
        profanityType = self.attr('profanity-type');
    
    // For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
    if (typeof profanityAttr !== typeof undefined && profanityAttr !== false) {
        // filter profanity-type
        if (!(profanityType === 'error')) {
            profanityType = 'warn';
        }

        let text = self.val();
        const profanityDetails = swearjar.detailedProfane(text);
        if (profanityDetails.profane) {
            const words = Object.keys(profanityDetails.wordCount);
            let curseWords = '';
            words.map((val, index) => {
                curseWords = index < (words.length - 1) ? `${curseWords + val}, ` : `${curseWords + val}`;
            });
            const PROFINITY_ERROR_MSG = `There are profane words: ${curseWords}. Please fix them.`;

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
        } else {
            if (self.data('profanity-count')) {
                $(`span[data-profanity-count="${self.data('profanity-count')}"]`).empty().append('');
            }
        }
    }
};

$(document).on('keyup', 'input, textarea', function() {  profanityDetector($(this)); });
$(document).on('paste', 'input, textarea', function() {  profanityDetector($(this)); });
$(document).on('change', 'input, textarea', function() { profanityDetector($(this)); });



