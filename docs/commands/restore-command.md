# Restore command

Downloads and installs any packages that are referenced by a project but not yet present locally. If no sources are specified, all sources defined in the DPM configuration file are used.

If a `.groupproj` is supplied, every project in the group is restored. If a folder is supplied, every `.dproj` in the folder is restored.

## Usage

```bat
dpm restore <project | groupproj | folder> [options]
```

## Options

| Option         | Description                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------ |
| source (-s)    | Source(s) to fetch from. May be specified multiple times. If omitted, all configured sources are used.        |
| compiler (-c)  | The Delphi compiler version to restore. If omitted, the version is detected from the `.dproj` file.            |
| debugMode (-dm) | Restore the Debug configuration of the packages.                                                             |
| configFile     | The DPM configuration file to apply. If not specified, `%AppData%\.dpm\dpm.config` is used.                   |
| verbosity (-v) | Output verbosity: _quiet_, _normal_, _detailed_.                                                              |
| help (-h)      | Displays help information for the command.                                                                    |

## Examples

```bat
dpm restore .\MyProject.dproj

dpm restore c:\Projects\MyProject.dproj -source=local

dpm restore c:\Projects -source=local

dpm restore c:\Projects\AllProjects.groupproj -source=local

dpm restore c:\Projects\AllProjects.groupproj -configFile=.\dev.dpm.config
```
