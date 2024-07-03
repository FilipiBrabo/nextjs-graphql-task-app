import { getClient } from "@/apollo/client";
import { gql } from "@/graphql/__generated__";
import { useServerTranslation } from "@/i18n";
import { getSession } from "@/lib/auth/getSession";
import { redirect } from "next/navigation";

const userQuery = gql(`query User($id: ID!) {
  user(id: $id) {
    firstName
    lastName
  }
}`);

interface HomePageProps {
  params: {
    lng: string;
  };
}

export default async function Home({ params: { lng } }: HomePageProps) {
  const { t } = await useServerTranslation(lng);

  const session = await getSession();
  const client = getClient();

  const token = session?.token;

  if (!session) {
    // TODO:
    redirect(`/${lng}/login`);
  }

  let response;
  try {
    response = await client.query({
      query: userQuery,
      variables: { id: session.userId },
      // TODO: find a way to set this headers for all queries and mutations
      context: {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      },
    });
  } catch (error: unknown) {
    // TODO: handle error
    console.log({ error });
  }

  if (!response) {
    // TODO: logout and redirect
  }

  const user = response?.data.user;

  return (
    <div className="flex flex-col p-4 gap-8">
      <h2 className="text-2xl font-semibold tracking-tight lg:text-5xl">
        {t("homePage.welcome", "Welcome, {{ firstName }} {{ lastName }}", {
          firstName: user?.firstName,
          lastName: user?.lastName,
        })}
      </h2>
    </div>
  );
}
