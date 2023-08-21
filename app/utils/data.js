const data = (name, url) => {
    return `
        <div>
            <h1>Hi ${name}</h1>
            <p>please click this link to verify your account. it will expire in 24 hrs </p>
            <a href="${url}">verify</a>
        </div>
    `;
};

module.exports = data;
