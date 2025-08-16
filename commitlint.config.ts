import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", [
      "feat",
      "fix", 
      "docs",
      "style",
      "refactor",
      "test",
      "chore",
      "perf",
      "ci",
      "build"
    ]],
    "subject-case": [2, "always", "lower-case"],
    "subject-empty": [2, "never"]
  }
};

export default config;
