# frame-master-plugin-env-in-html

A [Frame-Master](https://github.com/frame-master/frame-master) plugin that injects environment variables into your HTML during the build process, making them accessible to client-side scripts.

## Installation

```bash
bun add frame-master-plugin-env-in-html
```

## Usage

Add the plugin to your `frame-master.config.ts`:

```typescript
import EnvInHtml from "frame-master-plugin-env-in-html";

export default {
  plugins: [
    EnvInHtml({
      prefix: "PUBLIC_", // Optional: variables starting with this will be injected
      entries: ["API_URL", "NODE_ENV"], // Optional: specific variables to inject
    }),
  ],
};
```

### Accessing variables in the browser

The injected variables are available globally under `process.env`:

```typescript
console.log(process.env.PUBLIC_ANALYTICS_ID);
console.log(process.env.API_URL);
```

## Configuration

| Option    | Type       | Default     | Description                                                                 |
| --------- | ---------- | ----------- | --------------------------------------------------------------------------- |
| `prefix`  | `string`   | `"PUBLIC_"` | Only environment variables starting with this prefix will be injected.      |
| `entries` | `string[]` | `[]`        | Specific environment variable keys to be injected regardless of the prefix. |

## Features

- **Automated Injection**: Uses `HTMLRewriter` to inject a script tag into the `<head>` of your HTML files.
- **Selective Exposure**: Only exposes variables you explicitly allow via prefix or direct naming, preventing accidental leakage of sensitive secrets.
- **Client-Side Compatibility**: Seamlessly integrates with client-side code by shiming `globalThis.process.env`.

## License

MIT

```

```
