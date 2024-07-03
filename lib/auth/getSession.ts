import { cookies } from "next/headers";
import { decrypt } from "./encryption";

export async function getSession(): Promise<{ token: string } | null> {
  const session = cookies().get("session")?.value;

  if (!session) return null;

  return await decrypt(session);
}
