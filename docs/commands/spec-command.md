# Spec command

Generates a `package.dspec.yaml` for a new package. When run in a folder that contains a `.dproj`, the generated spec is tokenised based on that project so you can fill in the details and pack it.

See [Creating Packages](../getting-started/creating-packages.md) for the full authoring guide.

## Usage

```bat
dpm spec [packageId]
```

`[packageId]` is the package id to write into the spec (e.g. `VSoft.LibA`). It is optional - if omitted, the generated spec uses a placeholder you can edit.

## Options

| Option           | Description                                                                       |
| ---------------- | --------------------------------------------------------------------------------- |
| overwrite (-o)   | Overwrite an existing `.dspec.yaml` in the current folder without prompting.       |
| noflatten (-n)   | Do not flatten the source folder structure when listing files in the spec.         |

## Examples

```bat
dpm spec

dpm spec VSoft.CommandLine

dpm spec VSoft.CommandLine -overwrite

dpm spec VSoft.CommandLine -noflatten
```
