type Env = "local" | "beta";

interface Environment {
  env: Env;
  nextPublicLiffId: string;
}

const environment: Environment = {
  env: (process.env.NEXT_PUBLIC_ENV as Env) || "local",
  nextPublicLiffId: process.env.NEXT_PUBLIC_LIFF_ID || "",
};

export { environment };
