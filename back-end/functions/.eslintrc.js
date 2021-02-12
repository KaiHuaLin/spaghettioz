module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "google",
    ],
    rules: {
        "quotes": ["error", "double"],
        "indent": ["error", 4, {"MemberExpression": 1}],
        "max-len": ["error", {
            "ignoreUrls": true,
            "code": 120,
        }],
    },
};
