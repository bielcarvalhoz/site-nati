/** Guard for rendering a config-supplied URL as an href — blocks a stray
    `javascript:` / `data:` / malformed value from becoming a live link. */
export const isHttps = (url: string | undefined): url is string =>
  !!url && url.startsWith('https://')
