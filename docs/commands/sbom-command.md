# Sbom command

Generates a Software Bill of Materials (SBOM) for a project or project group. By default the command emits CycloneDX 1.5 JSON for each enabled platform, SPDX 2.3 JSON is also available.

DPM packages are detected automatically. For non-DPM libraries the command relies on linker MAP files - make sure **Linking > Map file = Detailed** is enabled in the build configuration you point at, otherwise non-DPM dependencies will be missing from the SBOM.

## Usage

```bat
dpm sbom [project] [options]
```

`[project]` is a `.dproj` or `.groupproj` and defaults to the current directory.

## Options

| Option            | Description                                                                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| outdir (-o)       | Output directory for SBOM files. Defaults to the project directory.                                                                                                  |
| format (-f)       | Comma-separated list of formats: `cyclonedx`, `spdx`, `html`, `markdown`. Aliases: `both` = `cyclonedx,spdx`; `all` = every format. Default: `cyclonedx,spdx`.       |
| platforms (-p)    | Comma-separated platforms to generate for. Default: all enabled in the project.                                                                                      |
| config (-c)       | Build configuration to use when locating the MAP file. Default: `Release`, falling back to `Debug`, then the first available.                                       |
| map (-m)          | Path to a specific MAP file. Overrides auto-detection. Only valid for single-platform invocations.                                                                  |
| no-runtime        | Exclude the Delphi RTL / VCL / FMX component from the SBOM (included by default).                                                                                   |
| strict            | Fail with a non-zero exit code if a MAP file is missing. Default: warn and emit a partial SBOM.                                                                     |
| per-project       | When the input is a `.groupproj`, emit one SBOM per dproj per platform (legacy behaviour). Default: one aggregated SBOM per platform spanning the whole group.       |

## Examples

```bat
dpm sbom .\MyProject.dproj

dpm sbom .\MyProject.dproj -outdir=c:\temp -format=cyclonedx

dpm sbom .\MyProject.dproj -format=html,markdown

dpm sbom .\MyProject.dproj -format=all

dpm sbom .\MyProject.dproj -platforms=Win32,Win64 -config=Release

dpm sbom .\MySolution.groupproj

dpm sbom .\MySolution.groupproj -per-project
```
