import type { FrameMasterPlugin } from "frame-master/plugin/types";
import { name, version } from "./package.json";

export type EnvInHtmlPluginOptions = {
  prefix?: string;
};

/**
 * frame-master-plugin-env-in-html - Frame-Master Plugin
 *
 * @description Injects environment variables into the HTML during the build process. This plugin allows you to specify a prefix for environment variables that should be included in the HTML, making them accessible to client-side scripts.
 *
 * @param {EnvInHtmlPluginOptions} [options] - Optional configuration for the plugin.
 * @param {string} [options.prefix="PUBLIC_"] - The prefix for environment variables to be included in the HTML. Only variables that start with this prefix will be injected. Default is "PUBLIC_".
 */
export default function EnvInHtml(
  options?: EnvInHtmlPluginOptions,
): FrameMasterPlugin {
  return {
    name,
    version,
    build: {
      buildConfig: {
        plugins: [
          {
            name: "frame-master-plugin-env-in-html",
            setup(build) {
              build.finally("html", ({ contents }) => {
                const prefix = options?.prefix || "PUBLIC_";
                const envVars = Object.entries(process.env)
                  .filter(([key]) => key.startsWith(prefix))
                  .reduce(
                    (acc, [key, value]) => {
                      acc[key] = value!;
                      return acc;
                    },
                    {} as Record<string, string>,
                  );
                const parsedContents = new HTMLRewriter()
                  .on("head", {
                    element(head) {
                      head.append(
                        `<script>globalThis.process ??= {}; globalThis.process.env ??= ${JSON.stringify(envVars)};</script>`,
                        {
                          html: true,
                        },
                      );
                    },
                  })
                  .transform(contents as string);

                return {
                  contents: parsedContents,
                };
              });
            },
          },
        ],
      },
    },
  };
}
