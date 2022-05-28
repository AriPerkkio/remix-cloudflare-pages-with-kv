import { json } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/cloudflare";
import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";

import logo from "../logo.svg";
import styles from "~/styles/index.css";
import { getCounter, increaseCounter } from "~/models/counter.server";
import type { Counter } from "~/models/counter.server";

interface LoaderData {
  counter: Counter;
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
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
      <img src={logo} alt="logo" />

      <h1>Hello Remix + Cloudflare Pages + Cloudflare KV!</h1>

      <Form method="post">
        <button type="submit">count is {counter}</button>
      </Form>

      <div className="links">
        <a
          href="https://remix.run/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Remix Docs
        </a>
        {" | "}
        <a
          href="https://pages.cloudflare.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cloudflare Pages Docs
        </a>
        {" | "}
        <a
          href="https://developers.cloudflare.com/workers/runtime-apis/kv/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cloudflare KV Docs
        </a>
      </div>
    </main>
  );
}
