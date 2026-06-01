# Install command

Downloads and installs a package into a project. If no sources are specified, all sources defined in the DPM configuration file are used. If the configuration file specifies no sources, the default DPM feed is used.

The configuration file in effect is `%AppData%\.dpm\dpm.config.yaml` unless overridden with `-configFile`.

## Usage

```bat
dpm install <packageId> [projectPath] [options]
```

`<packageId>` names the package to install (the latest version is used unless `-version` is given). `[projectPath]` defaults to the current directory and may point to a `.dproj`, a `.groupproj`, or a folder containing project files.

## Options

| Option         | Description                                                                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| version        | The package version to install. If omitted, the latest version is downloaded.                                                                          |
| compiler (-c)  | The Delphi compiler version to target. If not specified, the version is detected from the `.dproj` file. See [compiler-versions](../compiler-versions.md). |
| platforms (-p) | Comma-separated platforms to install for. Default is all platforms the project targets. See [platforms](../platforms.md).                              |
| group (-g)     | The project group the projects belong to. Used to ensure package compatibility.                                                                        |
| sources (-s)   | Source(s) from which to install. May be specified multiple times. If omitted, sources from the configuration file are used.                            |
| preRelease (-pr) | Allow installation of pre-release packages.                                                                                                          |
| force          | Force install of the package even if it is already installed.                                                                                          |
| upgrade        | Indicates the install is replacing an existing version of the package.                                                                                 |
| useSource (-us) | Reference the package source rather than the compiled binaries.                                                                                       |
| debugMode (-dm) | Install the Debug configuration of the package.                                                                                                       |
| configFile     | The DPM configuration file to apply. If not specified, `%AppData%\.dpm\dpm.config.yaml` is used.                                                            |
| verbosity (-v) | Output verbosity: _quiet_, _normal_, _detailed_.                                                                                                      |
| help (-h)      | Displays help information for the command.                                                                                                             |

## Examples

```bat
dpm install VSoft.CommandLine

dpm install VSoft.CommandLine -version=1.0.1 c:\myprojects\project1.dproj

dpm install Spring.Base c:\myprojects -compiler=10.3

dpm install DUnitX.Framework c:\myproject\tests\mytest.dproj -compiler=10.3 -platforms=Win32,Win64,MacOS32
```
