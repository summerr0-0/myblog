import next from "eslint-plugin-next";
import tseslint from "@typescript-eslint/eslint-plugin";

export default [
  next.configs["core-web-vitals"],
  {
    plugins: { "@typescript-eslint": tseslint },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
