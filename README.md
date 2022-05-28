# Remix + Cloudflare Pages + Cloudflare KV

- Deployed at https://remix-cloudflare-pages-with-kv.pages.dev

## Instructions

_Change `REMIX_CLOUDFLARE_PAGES_WITH_KV` with your desired KV Namespace name._

1. Complete [Cloudflare | Deploy a Remix site](https://developers.cloudflare.com/pages/framework-guides/remix/) guide.

2. Create KV namespace:

```bash
$ ./node_modules/.bin/wrangler kv:namespace create "REMIX_CLOUDFLARE_PAGES_WITH_KV"
```

3. Add new namespace into `wrangler.toml`:

```toml
kv_namespaces = [
    { binding = "REMIX_CLOUDFLARE_PAGES_WITH_KV", id = "<ID>" }
]
```

4. Setup KV Namespace binding for Cloudflare Pages

- Select project from [Cloudflare Dashboard](https://dash.cloudflare.com/)
  - `Settings`
  - `Functions`
  - `KV namespace bindings`
  - `Add binding`
  - `Variable name = REMIX_CLOUDFLARE_PAGES_WITH_KV`
  - `KV namespace=worker-REMIX_CLOUDFLARE_PAGES_WITH_KV`
  - `Save`

5. Redeploy project and wait for 2-3 mins
