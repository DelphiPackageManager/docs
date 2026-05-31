# Why command

Shows the dependency chain(s) that pull a package into a project - useful for understanding why a transitive package was installed and which top-level package brings it in.

## Usage

```bat
dpm why <packageId> [projectPath] [options]
```

`<packageId>` is the package to explain. `[projectPath]` is the `.dproj` to inspect and defaults to a `.dproj` in the current directory.

## Options

| Option          | Description                                                                          |
| --------------- | ------------------------------------------------------------------------------------ |
| compiler (-c)   | The Delphi compiler version. See [compiler-versions](../compiler-versions.md).        |

## Examples

```bat
dpm why VSoft.HttpClient c:\myprojects\project1.dproj

dpm why Spring4D.Base c:\myprojects\project1.dproj -compiler=12.0
```
