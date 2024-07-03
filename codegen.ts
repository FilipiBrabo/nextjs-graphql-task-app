import "dotenv/config";

import { CodegenConfig } from "@graphql-codegen/cli";
import { z } from "zod";

const envSchema = z.object({
  API_ENDPOINT: z.string().url(),
});

const env = envSchema.parse(process.env);

const config: CodegenConfig = {
  schema: env.API_ENDPOINT,
  documents: ["**/*.{ts,tsx}"],
  generates: {
    "./graphql/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
