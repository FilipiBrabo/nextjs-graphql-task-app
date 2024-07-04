import { cookies } from "next/headers";
import { getClient } from "../../apollo/client";
import { encrypt } from "./encryption";
import { ApolloError } from "@apollo/client";
import { gql } from "@/graphql/__generated__";

export const loginMutation = gql(`
  mutation Login($email: String!, $password: String!) {
    login(input: { identifier: $email, password: $password }) {
      jwt
      user {
        id
      }
    }
  }
`);

const COOKIE_EXPIRATION_TIME = 60 * 60 * 24 * 1000; // One day

export async function login(email: string, password: string) {
  const client = getClient();

  const { data, errors } = await client.mutate({
    mutation: loginMutation,
    variables: {
      email,
      password,
    },
  });

  if (!data) {
    throw new Error("Login mutation failed");
  }

  const token = data.login.jwt;
  const userId = data.login.user.id;

  const expires = new Date(Date.now() + COOKIE_EXPIRATION_TIME);
  const session = await encrypt({
    token,
    expires,
    userId,
  });

  cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}
