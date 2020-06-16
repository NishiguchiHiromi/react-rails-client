module.exports = {
    "settings": {
        "import/resolver": {
            "node": {
                "moduleDirectory": ["node_modules", "src/"]
            }
        }
    },
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        'eslint:recommended',
        "react-app",
        "airbnb"
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
    // "plugins": ["prettier"],
    "plugins": ['react'],
    "rules": {
        // "prettier/prettier": "error",
        // "max-len": ["error", {"code": 100}],
        // "prefer-promise-reject-errors": ["off"],
        'jsx-a11y/label-has-associated-control': 0,
        "react/prop-types": ["off"],
        // "no-return-assign": ["off"],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        // "react/jsx-props-no-spreading": ["off"]
        "camelcase": ["off"],
        "no-use-before-define": ["off"],
        "no-param-reassign": ["error", { "props": false }],
    }
};