import { redirect } from "@remix-run/cloudflare";
import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ context }) => {
  return json(await getKv(context).get("count", { type: "text" }));
};

export const action: ActionFunction = async ({ context }) => {
  const currentValue = await getKv(context).get("count", { type: "text" });
  const nextValue = 1 + parseInt(currentValue || "0");

  await getKv(context).put("count", nextValue.toString());

  return redirect("/");
};

export default function Index() {
  const count = useLoaderData();

  return (
    <main>
      <h1>Remix + Cloudflare Pages + Cloudflare KV</h1>
      <p>Count is {parseInt(count) || 0}</p>

      <Form method="post">
        <button type="submit">Increase</button>
      </Form>
    </main>
  );
}

function getKv(context: any) {
  if (!context) {
    throw new Error("context not available");
  }

  if (!context.REMIX_CF_PAGES_DEMO_KV) {
    throw new Error("context.REMIX_CF_PAGES_DEMO_KV not available");
  }

  return context.REMIX_CF_PAGES_DEMO_KV as KVNamespace;
}
