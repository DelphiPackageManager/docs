# Cache command

Manages the local package cache. The command takes one of three sub-commands:

- `add` - downloads a package into the local package cache.
- `remove` - evicts cached package version(s) so the next install/restore re-downloads them. Useful for package authors testing a package they keep re-publishing under the same version.
- `verify` - re-hashes and re-verifies every package already in the cache.

See [Package Cache](../concepts/package-cache.md) and [Package Signing](../concepts/package-signing.md).

If no sources are specified, those listed in `%appdata%\.dpm\dpm.config.yaml` are used.

## Usage

```bat
dpm cache <add|remove|verify> [packageId] [options]
```

The first positional argument is the sub-command. `add` and `remove` take a package id; `verify` takes no further arguments.

## add

Downloads a package (and its dependencies) into the local cache without installing it into a project.

```bat
dpm cache add <packageId> -compiler=<version> [options]
```

`-compiler` is required. If `-version` is omitted, the latest version is downloaded.

## remove

Removes cached package version(s) from the cache - both the extracted folder and the raw `.dpkg` file (and its `.sha256` sidecar) - so the next install or restore fetches a fresh copy.

```bat
dpm cache remove <packageId> [options]
```

Only the package id is required. The `-compiler` and `-version` options act as optional filters:

- Omit `-version` to remove **every** cached version of the package id.
- Omit `-compiler` to remove matches across **all** compiler versions.

By default the matching packages are listed and you are prompted to confirm before anything is deleted. Pass `-force` to skip the prompt (for scripted/CI use). If nothing matches, the command reports this and exits successfully without prompting.

## verify

Re-hashes every cached package against its manifest and re-runs signature verification.

```bat
dpm cache verify
```

## Options

| Option         | Description                                                                                                                           |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| version        | The package version. For `add`, the version to download (latest if omitted). For `remove`, the version to evict (all cached versions if omitted). |
| compiler (-c)  | The Delphi compiler version. Required for `add`; an optional filter for `remove` (all compilers if omitted); ignored by `verify`. See [compiler-versions](../compiler-versions.md). |
| force (-f)     | For `remove`, skip the confirmation prompt.                                                                                            |
| sources (-s)   | Source(s) to fetch from (`add`). May be specified multiple times. If omitted, all configured sources are used.                          |
| configFile     | The DPM configuration file to apply. If not specified, `%AppData%\.dpm\dpm.config.yaml` is used.                                            |
| verbosity (-v) | Output verbosity: _quiet_, _normal_, _detailed_.                                                                                       |
| help (-h)      | Displays help information for the command.                                                                                             |

## Examples

```bat
dpm cache add VSoft.CommandLine -compiler=10.3

dpm cache add VSoft.CommandLine -compiler=10.3 -version=1.0.1

dpm cache add Spring.Base -compiler=10.3 -source=VSoftInternal

dpm cache remove VSoft.CommandLine -compiler=10.3 -version=1.0.1

dpm cache remove VSoft.CommandLine

dpm cache remove VSoft.CommandLine -force

dpm cache verify
```
