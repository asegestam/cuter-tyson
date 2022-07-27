module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-recommended",
        "plugin:vue/essential",
        "plugin:@typescript-eslint/recommended",
        "@nuxtjs/eslint-config-typescript"
    ],
    parserOptions: {
        ecmaVersion: "latest",
        parser: "@typescript-eslint/parser",
        sourceType: "module"
    },
    plugins: ["vue", "@typescript-eslint"],
    rules: {
        quotes: ["error", "double"],
        semi: ["error", "always"],
        indent: ["error", 4],
        "@typescript-eslint/no-unused-vars": ["off"],
        "vue/multi-word-component-names": ["off"]
    }
};
