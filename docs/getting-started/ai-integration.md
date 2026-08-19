# AI Agent Integration

DPM includes an MCP (Model Context Protocol) server, so AI coding agents such as Claude Code, Codex, Gemini CLI, Cursor and GitHub Copilot can search DPM packages and understand Delphi projects.

The server is started with the [`dpm mcp`](../commands/mcp-command.md) command. It communicates over stdio and is read only - the agent can search packages, inspect package details and walk a project's dependency tree, but nothing it exposes can install, download or modify anything. When the agent decides to act, it runs the DPM CLI in its own shell, e.g.

```bat
dpm install VSoft.HttpClient MyApp.dproj --compiler=12.0
```

## Requirements

- DPM installed with the "add to path" option enabled (the default), so the agent can launch `dpm` without a full path. See [Installing DPM](./installing.md).
- A recent DPM release - if `dpm mcp` reports an unknown command, update from the [releases page](https://github.com/DelphiPackageManager/DPM/releases).

In every client below the configuration is the same: run `dpm` with the single argument `mcp`. Options such as a default project or a source filter can be appended - see the [command reference](../commands/mcp-command.md) for the full list.

## Claude Code

Register the server from a terminal:

```bat
claude mcp add dpm -- dpm mcp
```

By default this applies to the current project only. To make it available in every project, use the user scope:

```bat
claude mcp add --scope user dpm -- dpm mcp
```

To share the server with your team, commit a `.mcp.json` file at the root of the repository instead:

```json
{
  "mcpServers": {
    "dpm": {
      "command": "dpm",
      "args": ["mcp"]
    }
  }
}
```

Verify with the `/mcp` command inside Claude Code - `dpm` should be listed as connected.

## Claude Desktop

Edit `%APPDATA%\Claude\claude_desktop_config.json` and add:

```json
{
  "mcpServers": {
    "dpm": {
      "command": "dpm",
      "args": ["mcp"]
    }
  }
}
```

Claude Desktop does not start the server in your project directory, so there is no default project. That is fine - the agent passes the project path on each tool call - but you can also set a default:

```json
      "args": ["mcp", "-project=C:\\src\\MyApp\\MyApp.dproj"]
```

If `dpm` is not found, use the full path to the executable, e.g. `C:\\Users\\<you>\\AppData\\Local\\Programs\\DPM Package Manager\\dpm.exe`.

## Codex CLI

```bat
codex mcp add dpm -- dpm mcp
```

Or edit `%USERPROFILE%\.codex\config.toml`:

```toml
[mcp_servers.dpm]
command = "dpm"
args = ["mcp"]
```

## Gemini CLI

```bat
gemini mcp add dpm dpm mcp
```

Or add the server to `%USERPROFILE%\.gemini\settings.json` (all projects) or `.gemini\settings.json` in the project:

```json
{
  "mcpServers": {
    "dpm": {
      "command": "dpm",
      "args": ["mcp"]
    }
  }
}
```

Verify with `gemini mcp list`.

## Cursor

Create `.cursor\mcp.json` in the project (or `%USERPROFILE%\.cursor\mcp.json` for all projects):

```json
{
  "mcpServers": {
    "dpm": {
      "command": "dpm",
      "args": ["mcp"]
    }
  }
}
```

## VS Code (GitHub Copilot)

Create `.vscode\mcp.json` in the workspace - note the top-level key is `servers`, not `mcpServers`:

```json
{
  "servers": {
    "dpm": {
      "type": "stdio",
      "command": "dpm",
      "args": ["mcp"]
    }
  }
}
```

Alternatively run **MCP: Add Server** from the command palette and choose the stdio type.

## Windsurf

Add the server to `%USERPROFILE%\.codeium\windsurf\mcp_config.json`:

```json
{
  "mcpServers": {
    "dpm": {
      "command": "dpm",
      "args": ["mcp"]
    }
  }
}
```

## Other MCP clients

Any MCP client that supports stdio servers will work - configure it to run command `dpm` with arguments `["mcp"]`. The server implements both the current stateless MCP protocol and the older handshake-based revisions (back to `2024-11-05`), so both new and old clients connect.

## What the agent can do

Once connected, the agent has five read-only tools:

| Tool                   | Purpose                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| `dpm_search_packages`  | Find packages by name or capability ("http client", "json serialization").                 |
| `dpm_package_info`     | Details of one package - licence, platforms, dependencies.                                 |
| `dpm_package_versions` | All published versions of a package for a compiler version.                                |
| `dpm_project_info`     | Compiler version, platforms and full dependency tree of a `.dproj`.                        |
| `dpm_why_package`      | Why a package is in a project's dependency tree.                                           |

A typical session: the agent calls `dpm_project_info` to learn which compiler version and platforms the project targets, `dpm_search_packages` to find a suitable library, `dpm_package_info` to check its licence and what it would pull in, and then runs `dpm install` in its shell to actually add it.

Because packages are published separately for each Delphi compiler version, every query is scoped to one compiler, and every result states which compiler was used.

## Troubleshooting

- **The client cannot start the server** - make sure `dpm` is on the PATH (re-run the installer with "add to path" checked, then restart the terminal or editor), or configure the full path to `dpm.exe`.
- **The client connects but does not work** - start the server with a frame log and read what actually crossed the wire:

  ```bat
  dpm mcp -logfile=%TEMP%\dpm-mcp.log
  ```

  Every request and response is appended to the file. Server diagnostics go to stderr, which most clients capture in their MCP logs; stdout carries nothing but protocol.
