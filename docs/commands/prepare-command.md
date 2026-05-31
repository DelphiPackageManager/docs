# Prepare command

Prepares per-Delphi-version subfolders under `/packages` with version-correct dpk/dproj files.

Given a `.dspec.yaml` (or one auto-discovered in the current directory), `prepare` ensures a `RAD Studio XXX` subfolder exists under `/packages` for each supported compiler, finds an existing dpk/dproj pair to use as the source of truth, and propagates that pair into the other folders with per-version transforms applied. If no pair exists anywhere, a minimal pair is scaffolded into the lowest supported compiler's folder for you to edit and then re-run `prepare`.

## Usage

```bat
dpm prepare [<.dspec.yaml file>] [options]
```

The spec file argument is optional - if omitted, the current directory is scanned for a single `*.dspec.yaml`.

## Options

| Option           | Description                                                                                              |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| force (-f)       | Overwrite existing dpk/dproj files in target folders. Default is to skip files that already exist.        |
| dryrun (-dr)     | Preview what the command would do without creating folders or writing files.                              |

## Examples

```bat
dpm prepare

dpm prepare MyPackage.dspec.yaml

dpm prepare MyPackage.dspec.yaml -force

dpm prepare MyPackage.dspec.yaml -dryrun
```
