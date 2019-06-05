module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react", "prettier", "import", "react-hooks",
    ],
    "rules": {
    },
    "settings": {
      "react": {
        "createClass": "createReactClass",
        "pragma": "React",
        "version": "detect",
        "flowVersion": "0.53" // Flow version
      },
      "propWrapperFunctions": [
        "forbidExtraProps",
        {"property": "freeze", "object": "Object"},
        {"property": "myFavoriteWrapper"}
      ],
      "linkComponents": [
        "Hyperlink",
        {"name": "Link", "linkAttribute": "to"}
      ]
    }
};
