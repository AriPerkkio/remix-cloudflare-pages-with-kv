import type { AppLoadContext } from "@remix-run/cloudflare";

export type Counter = number;

export async function getCounter(context: AppLoadContext): Promise<Counter> {
  const currentValue = await getKv(context).get("count", { type: "text" });

  return parseInt(currentValue || "0");
}

export async function increaseCounter(context: AppLoadContext): Promise<void> {
  const currentValue = await getCounter(context);
  const nextValue = 1 + currentValue;

  await getKv(context).put("count", nextValue.toString());
}

/**
 * Get Cloudflare KV namespace from request context
 */
function getKv(context: AppLoadContext): KVNamespace {
  if (!context) {
    throw new Error("context not available");
  }

  if (!context.REMIX_CF_PAGES_DEMO_KV) {
    throw new Error("context.REMIX_CF_PAGES_DEMO_KV not available");
  }

  if (!isKvNamespace(context.REMIX_CF_PAGES_DEMO_KV)) {
    throw new Error(
      "context.REMIX_CF_PAGES_DEMO_KV doesnt look like KVNamespace"
    );
  }

  return context.REMIX_CF_PAGES_DEMO_KV;
}

function isKvNamespace(kvNamespace: any): kvNamespace is KVNamespace {
  if (kvNamespace == null) return false;
  if (typeof kvNamespace !== "object") return false;

  if (!("get" in kvNamespace) || typeof kvNamespace.get !== "function") {
    return false;
  }

  if (!("put" in kvNamespace) || typeof kvNamespace.put !== "function") {
    return false;
  }

  return true;
}
