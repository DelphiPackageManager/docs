# Cache command

Downloads a package into the local package cache, or - with the `verify` subcommand - re-hashes and re-verifies every package already in the cache. See [Package Cache](../concepts/package-cache.md) and [Package Signing](../concepts/package-signing.md).

If no sources are specified, those listed in `%appdata%\.dpm\dpm.config` are used.

## Usage

```bat
dpm cache <packageId>|verify [options]
```

The positional argument is either a package id to cache, or the literal `verify` which re-checks every package in the cache.

## Options

| Option         | Description                                                                                                                           |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| version        | The version to cache. If omitted, the latest version is downloaded. (Download form only.)                                              |
| compiler (-c)  | The Delphi compiler version of the package to cache. Required for the download form; ignored by `cache verify`. See [compiler-versions](../compiler-versions.md). |
| sources (-s)   | Source(s) to fetch from. May be specified multiple times. If omitted, all configured sources are used.                                  |
| configFile     | The DPM configuration file to apply. If not specified, `%AppData%\.dpm\dpm.config` is used.                                            |
| verbosity (-v) | Output verbosity: _quiet_, _normal_, _detailed_.                                                                                       |
| help (-h)      | Displays help information for the command.                                                                                             |

## Examples

```bat
dpm cache VSoft.CommandLine -compiler=10.3

dpm cache VSoft.CommandLine -compiler=10.3 -version=1.0.1

dpm cache Spring.Base -compiler=10.3 -source=VSoftInternal

dpm cache verify
```
