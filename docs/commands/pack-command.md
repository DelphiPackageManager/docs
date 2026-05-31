# Pack command

Creates a DPM package (`.dpkg`) from a [`.dspec.yaml`](../getting-started/creating-packages.md) file.

## Usage

```bat
dpm pack <.dspec.yaml file> [options]
```

## Options

| Option                       | Description                                                                                                                                                                  |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| excludeEmptyDirectories (-e) | Prevent inclusion of empty directories when building the package.                                                                                                             |
| outputfolder (-o)            | Directory in which the created `.dpkg` file is written. Defaults to the current directory.                                                                                    |
| basepath (-b)                | Base path of the files referenced by the `.dspec.yaml`. Defaults to the directory containing the `.dspec.yaml`.                                                               |
| minclientversion (-mc)       | Set the `minClientVersion` attribute on the created package. Overrides any value in the `.dspec.yaml`.                                                                        |
| variables (-p)               | Semicolon-delimited list of `name=value` variables to substitute into the spec during packing.                                                                                |
| version                      | Override the version number from the `.dspec.yaml`.                                                                                                                            |
| configFile                   | The DPM configuration file to apply. If not specified, `%AppData%\.dpm\dpm.config` is used.                                                                                   |
| verbosity (-v)               | Output verbosity: _quiet_, _normal_, _detailed_.                                                                                                                              |
| help (-h)                    | Displays help information for the command.                                                                                                                                    |

## Examples

```bat
dpm pack foo.dspec.yaml

dpm pack foo.dspec.yaml -variables=Configuration=Release

dpm pack foo.dspec.yaml -version=2.1.0

dpm pack VSoft.CommandLine.dspec.yaml -version=1.0.1 -outputFolder=.\output
```
