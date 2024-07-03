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
        username
        email
      }
    }
  }
`);

const COOKIE_EXPIRATION_TIME = 60 * 60 * 24 * 1000; // One day

export async function login(email: string, password: string) {
  const client = getClient();

  console.log({ email, password });

  try {
    const { data, errors } = await client.mutate({
      mutation: loginMutation,
      variables: {
        email,
        password,
      },
    });
    const token = data?.login.jwt;

    const expires = new Date(Date.now() + COOKIE_EXPIRATION_TIME);
    const session = await encrypt({ token, expires });

    cookies().set("session", session, { expires, httpOnly: true });
  } catch (error) {
    if (error instanceof ApolloError) {
      // TODO: handle errors
    }
  }
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}
