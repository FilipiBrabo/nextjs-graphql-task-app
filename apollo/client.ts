import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";
import { z } from "zod";

const envSchema = z.object({
  API_ENDPOINT: z.string().url(),
});

const env = envSchema.parse(process.env);

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: env.API_ENDPOINT,
    }),
  });
});
