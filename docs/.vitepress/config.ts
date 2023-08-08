import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "DPM Documentation",
  description: "Documentation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Getting Started", link: "/getting-started/installing" },
    ],

    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "Introduction", link: "introduction" },
          { text: "Contributing", link: "contributing" },
          { text: "Compiler Versions", link: "compiler-versions" },
          { text: "Platforms", link: "platforms" },
        ],
      },
      {
        text: "Getting Started",
        items: [
          { text: "Installing DPM", link: "/getting-started/installing" },
          { text: "IDE Integration", link: "/getting-started/ide-integration" },
          { text: "Consuming Packages", link: "/getting-started/consuming-packages" },
          { text: "Creating Packages", link: "/getting-started/creating-packages" },
        ],
      },
      {
        text: "Concepts",
        items: [
          { text: "Concepts", link: "/concepts/index" },
          { text: "Config Files", link: "/concepts/config-files" },
          { text: "Package Cache", link: "/concepts/package-cache" },
          { text: "Package Versioning", link: "/concepts/package-versioning" },
          { text: "Package Dependencies", link: "/concepts/package-dependencies" },
        ],
      },
      {
        text: "Command Line",
        items: [
          { text: "Commands", link: "/commands/commands" },
          { text: "cache", link: "/commands/cache-command" },
          { text: "config", link: "/commands/config-command" },
          { text: "delete", link: "/commands/delete-command" },
          { text: "help", link: "/commands/help-command" },
          { text: "install", link: "/commands/install-command" },
          { text: "list", link: "/commands/list-command" },
          { text: "pack", link: "/commands/pack-command" },
          { text: "push", link: "/commands/push-command" },
          { text: "restore", link: "/commands/restore-command" },
          { text: "setapikey", link: "/commands/setapikey-command" },
          { text: "sign", link: "/commands/sign-command" },
          { text: "sources", link: "/commands/sources-command" },
          { text: "spec", link: "/commands/spec-command" },
          { text: "uninstall", link: "/commands/uninstall-command" },
          { text: "update", link: "/commands/update-command" },
          { text: "verify", link: "/commands/verify-command" },
          { text: "why", link: "/commands/why-command" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/DelphiPackageManager" }],
    footer: {
      copyright: "Copyright © 2023-present Vincent Parrett & Contributors. All Rights Reserved.",
      message: 'Sponsored by <a href="https://www.finalbuilder.com">VSoft Technologies Pty</a>',
    },
  },
});
