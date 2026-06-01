# Uninstall command

Removes a package reference from a project. Dependencies that were pulled in solely by this package are also removed during the next restore.

## Usage

```bat
dpm uninstall <packageId> [projectPath] [options]
```

`<packageId>` names the package to remove. `[projectPath]` defaults to the current directory and may point to a `.dproj`, a `.groupproj`, or a folder containing project files.

## Options

| Option         | Description                                                                                                                |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- |
| compiler (-c)  | The Delphi compiler version to target. If omitted, the version is detected from the `.dproj` file.                          |
| platforms (-p) | Comma-separated platforms to uninstall for. Default is all platforms the project targets. See [platforms](../platforms.md). |
| configFile     | The DPM configuration file to apply. If not specified, `%AppData%\.dpm\dpm.config.yaml` is used.                                 |
| verbosity (-v) | Output verbosity: _quiet_, _normal_, _detailed_.                                                                            |
| help (-h)      | Displays help information for the command.                                                                                  |

## Examples

```bat
dpm uninstall VSoft.CommandLine

dpm uninstall VSoft.CommandLine c:\myprojects\project1.dproj -platforms=Win32,Win64
```
