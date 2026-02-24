import type { FrameMasterConfig } from "frame-master/server/types";
import EnvInHtml from "../";

export default {
  HTTPServer: {
    port: 3000,
  },
  plugins: [
    EnvInHtml({
      prefix: "TEST_",
      entries: ["NODE_ENV"],
    }),
  ],
  pluginsOptions: {
    entrypoints: ["index.html"],
  },
} satisfies FrameMasterConfig;
