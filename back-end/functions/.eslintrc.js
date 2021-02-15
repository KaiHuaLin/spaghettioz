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
    parserOptions: {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
        },
    },
    rules: {
        "quotes": ["error", "double"],
        "indent": ["error", 4, {"MemberExpression": 1}],
        "max-len": ["error", {
            "ignoreUrls": true,
            "code": 120,
        }],
    },
};
