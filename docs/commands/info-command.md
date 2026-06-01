# Info command

Prints information about the active DPM configuration. Currently this is just the path to the `dpm.config.yaml` file in effect for the current invocation (taking `-configFile` and the discovery rules into account).

## Usage

```bat
dpm info
```

## Options

This command takes no command-specific options. Global flags (`-configFile`, `-verbosity`, `-nobanner`) still apply.

## Examples

```bat
dpm info

dpm info -configFile=.\dev.dpm.config.yaml
```
