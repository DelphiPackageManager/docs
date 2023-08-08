# Help command

The help command outputs the list of commands available.

When invoked with a command name parameter it will show the help for that command, eg.

`dpm help install`

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

Examples :

  dpm install VSoft.CommandLine

  dpm install VSoft.CommandLine -version=1.0.1 c:\myprojects\project1.dproj

  dpm install Spring.Base c:\myprojects -compiler=10.3

  dpm install DUnitX.Framework c:\myproject\tests\mytest.dproj -compiler=10.3 -platforms=Win32,Win64,OSX32
```
