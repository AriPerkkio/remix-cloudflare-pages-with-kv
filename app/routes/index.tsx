import { json } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/cloudflare";
import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";

import { getCounter, increaseCounter } from "~/models/counter.server";
import type { Counter } from "~/models/counter.server";

interface LoaderData {
  counter: Counter;
}

export const loader: LoaderFunction = async ({ context }) => {
  const counter = await getCounter(context);

  return json<LoaderData>({ counter });
};

export const action: ActionFunction = async ({ context }) => {
  await increaseCounter(context);

  return redirect("/");
};

export default function Index() {
  const { counter } = useLoaderData<LoaderData>();

  return (
    <main>
      <h1>Remix + Cloudflare Pages + Cloudflare KV</h1>
      <p>Count is {counter}</p>

      <Form method="post">
        <button type="submit">Increase</button>
      </Form>
    </main>
  );
}
