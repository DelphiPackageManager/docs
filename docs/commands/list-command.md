# List command

Displays a list of packages from one or more sources. If no sources are specified, all sources defined in `%AppData%\.dpm\dpm.config` are searched.

## Usage

```bat
dpm list [search terms] [options]
```

The optional search terms filter the displayed list. They are applied to package ids (folder sources), and to package tags and descriptions (HTTP sources).

## Options

| Option            | Description                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| source (-s)       | Source to search. May be specified multiple times. If omitted, all registered sources are searched.            |
| exact (-e)        | Search for an exact package id match.                                                                          |
| prerelease (-pr)  | Include prerelease packages in the results.                                                                    |
| includeDelisted (-d) | Include delisted packages in the results.                                                                   |
| skip              | Skip the first _x_ results before listing.                                                                     |
| take              | Return at most _x_ results.                                                                                    |
| compiler (-c)     | Compiler version to filter by. When omitted, packages for every compiler version found are listed.             |
| platforms (-p)    | Comma-separated platforms to filter by. When omitted, packages for every platform found are listed.            |
| configFile        | The DPM configuration file to apply. If not specified, `%AppData%\.dpm\dpm.config` is used.                    |
| verbosity (-v)    | Output verbosity: _quiet_, _normal_, _detailed_.                                                               |
| help (-h)         | Displays help information for the command.                                                                     |

## Examples

```bat
dpm list commandline

dpm list semantic -prerelease -skip=10 -take=10

dpm list commandline -compiler=10.2 -platforms=Win32,Win64 -source=VSoftInternal -prerelease
```
