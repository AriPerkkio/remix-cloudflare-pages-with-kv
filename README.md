# Remix + Cloudflare Pages + Cloudflare KV

- Deployed at https://remix-cloudflare-pages-with-kv.pages.dev

## Instructions

1. Create KV namespace:

```bash
$ ./node_modules/.bin/wrangler kv:namespace create "REMIX_CLOUDFLARE_PAGES_WITH_KV"
```

2. Add new namespace into `wrangler.toml`:

```toml
kv_namespaces = [
    { binding = "REMIX_CLOUDFLARE_PAGES_WITH_KV", id = "ea387286be1047ed8e91c428d63e9684" }
]
```

3. Setup Cloudflare Pages in [Cloudflare Dashboard](https://dash.cloudflare.com/).

4. Setup KV Namespace binding for Cloudflare Pages

- Select project from [Cloudflare Dashboard](https://dash.cloudflare.com/)
- `Settings` - `Functions` - `KV namespace bindings` - `Add binding` - `Variable name = REMIX_CLOUDFLARE_PAGES_WITH_KV` - `KV namespace=worker-REMIX_CLOUDFLARE_PAGES_WITH_KV` - `Save`

5. Redeploy project and wait for 2-3 mins
