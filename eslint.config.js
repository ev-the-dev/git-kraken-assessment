import eslint from "@eslint/js"
import tslint from "typescript-eslint"

export default tslint.config(
  eslint.configs.recommended,
  tslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.js", "*.ts"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }
)
