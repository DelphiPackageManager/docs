# MCP command

Runs a read-only MCP (Model Context Protocol) server over stdio, so an AI coding agent (Claude Code, Codex, Gemini CLI, Cursor etc.) can search DPM packages and inspect Delphi projects.

The server reads JSON-RPC from stdin and writes responses to stdout; all logging goes to stderr. It is read only by design - nothing it exposes can install, download or modify a project. When the agent decides to act, it runs [`dpm install`](./install-command.md) in its own shell.

See [AI Agent Integration](../getting-started/ai-integration.md) for how to register the server with each agent.

## Usage

```bat
dpm mcp [options]
```

The command does not return - it serves requests until the client closes stdin or terminates the process. It is meant to be launched by an MCP client, not run interactively.

## Options

| Option        | Description                                                                                                                                                                                     |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| compiler (-c) | Fallback Delphi compiler version, used only when no project is in play. Normally unnecessary - each tool call reads the compiler from the project it is given. See [compiler-versions](../compiler-versions.md). |
| project (-p)  | Default `.dproj` used when a tool call does not name one. Defaults to the single `.dproj` in the working directory (only when unambiguous).                                                       |
| source (-s)   | Restrict package queries to this source. May be given more than once.                                                                                                                            |
| logfile       | Append every MCP frame, in both directions, to this file. For diagnosing a client that connects but does not work.                                                                               |

## Tools

The server exposes five tools, all read only:

| Tool                   | Description                                                                                                                                          |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dpm_search_packages`  | Search the package sources by name or capability (e.g. "http client", "json serialization"). Returns id, version, description, licence, authors, tags and supported platforms. |
| `dpm_package_info`     | Full details of one package - description, licence, urls, supported platforms, and its dependencies with the version range each is allowed to satisfy. |
| `dpm_package_versions` | Every published version of a package for a compiler version, newest first. Pre-release versions on request.                                            |
| `dpm_project_info`     | Reads a `.dproj` and reports the compiler version, platforms, whether DPM is enabled, and the complete dependency tree (top level vs transitive).      |
| `dpm_why_package`      | Explains why a package is in a project's dependency tree - every chain from the project down to that package.                                          |

### How the compiler version is chosen

Packages are published separately for each Delphi compiler version, so every query is scoped to one. The tools resolve it in this order:

1. The `compiler` argument on the tool call, if the agent passes one.
2. The compiler declared by the `.dproj` the tool call names.
3. The compiler declared by the default project (`-project`, or the single `.dproj` in the working directory).
4. The `-compiler` fallback option.

Every tool result states which compiler it actually used, so an inferred value can never mislead silently.

## Examples

```bat
dpm mcp

dpm mcp -project=C:\src\MyApp.dproj

dpm mcp -logfile=%TEMP%\dpm-mcp.log

dpm mcp -compiler=12.0
```
