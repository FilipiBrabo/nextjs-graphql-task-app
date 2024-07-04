import { getClient } from "@/apollo/client";
import { gql } from "@/graphql/__generated__";
import { getServerTranslation } from "@/i18n";
import { getSession } from "@/lib/auth/getSession";
import { redirect } from "next/navigation";
import { BuggyButton } from "../(auth)/login/_components/BuggyButton";

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
  const { t } = await getServerTranslation(lng);

  const session = await getSession();
  const client = getClient();

  const token = session?.token;

  if (!session) {
    // TODO:
    redirect(`/${lng}/login`);
  }

  const response = await client.query({
    query: userQuery,
    variables: { id: session.userId },
    // TODO: find a way to set this headers for all queries and mutations
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
  });

  const user = response?.data.user;

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-semibold tracking-tight lg:text-5xl">
        {t("homePage.welcome", "Welcome, {{ firstName }} {{ lastName }}", {
          firstName: user?.firstName,
          lastName: user?.lastName,
        })}
      </h2>
      <div className="absolute right-4 bottom-4">
        <BuggyButton />
      </div>
    </div>
  );
}
