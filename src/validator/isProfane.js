import swearjar from 'swearjar-extended2';

const isProfane = (text) => {
    const profanityDetails = swearjar.detailedProfane(text);
    return { ...profanityDetails, valid: (!profanityDetails.profane) };
};

export default isProfane;
