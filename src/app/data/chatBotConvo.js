const keywordAliases = {
    trustable: ['trustworthiness', 'reliable'],
    legit: ['legitimate', 'genuine'],
    contact: ['support', 'help']
};

const keywordResponses = {
    trustable: 'Yes, this website is trustable.',
    legit: 'Yes, this website is legit.',
    name: 'I am a friendly chatbot here to assist you.',
    contact: 'You can contact support by emailing support@example.com or calling 123-456-7890.'
};

Object.keys(keywordAliases).forEach(key => {
    keywordAliases[key].forEach(alias => {
        keywordResponses[alias] = keywordResponses[key];
    });
});

export default function conversation(params) {
    if (!params) {
        return "Please enter a message so that I can help you.";
    }

    const string = params.toLowerCase().replace(/\s+/g, ''); // Convert to lowercase and remove spaces

    for (const keyword in keywordResponses) {
        if (string.includes(keyword.replace(/\s+/g, ''))) {
            return keywordResponses[keyword];
        }
    }

    return "I'm sorry, I didn't understand that. Can you please rephrase?";
}
