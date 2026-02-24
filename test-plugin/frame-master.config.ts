import type { FrameMasterConfig } from "frame-master/server/types";
import EnvInHtml from "../";

export default {
  HTTPServer: {
    port: 3000,
  },
  plugins: [
    EnvInHtml({
      prefix: "TEST_",
    }),
  ],
  pluginsOptions: {
    entrypoints: ["index.html"],
  },
} satisfies FrameMasterConfig;
