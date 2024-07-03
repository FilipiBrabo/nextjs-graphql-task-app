import { SignJWT, jwtVerify } from "jose";
import { z } from "zod";

const envSchema = z.object({
  AUTH_SECRET: z.string(),
});

const env = envSchema.parse(process.env);
const key = new TextEncoder().encode(env.AUTH_SECRET);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}
