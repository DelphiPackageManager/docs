# Help command

Prints help for DPM. With no arguments, lists every available command. With a command name, prints the usage, options, and examples for that command - exactly the information shown in the per-command pages in this section.

`?` is a short-form alias for `help`.

## Usage

```bat
dpm help [command]

dpm ? [command]
```

## Examples

```bat
dpm help

dpm help install

dpm ? sign
```

Sample output for `dpm help install`:

```
dpm help install

Usage: dpm install <packageId> [options]

Installs a package using the specified sources. If no sources are specified, all sources defined in the DPM configuration file are used. If the configuration file specifies no sources, uses the default DPM feed.

Specify the id and optionally the version of the package to install, or the path to a package file (.dpkg).

Options:
 <projectPath>
 <packageId|packagePath>
 -compiler|-c=<compiler>
 -debugMode|-dm
 -force
 -platforms|-p=<platforms>                 The platforms to install for (comma separated). Default is to install for
                                           all platforms the project targets.

 -preRelease|-pr
 -Sources|-s=<Sources> +
 -upgrade
 -useSource|-us
 -version=<version>                        The package version to install, if not specified the latest will be
                                           downloaded

 -configFile=<configFile>
 -help|-h
 -nobanner|-nb
 -verbosity|-v=<verbosity>
```
