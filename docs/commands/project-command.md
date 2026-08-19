# Project command

Reports what a project targets - compiler version, platforms - and the DPM packages it references, showing which are top level and which were pulled in as dependencies. Read only - the project file is never modified.

## Usage

```bat
dpm project [path] [options]
```

`[path]` is a `.dproj`, a `.groupproj`, or a directory containing one, and defaults to the current directory. A `.groupproj` reports every project in the group. When given a directory, a `.groupproj` is preferred over a `.dproj`; if more than one candidate is found the command lists them and asks you to specify one rather than guessing.

## Options

| Option        | Description                                                                                                    |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| compiler (-c) | Compiler version. Defaults to whatever the project itself declares. See [compiler-versions](../compiler-versions.md). |
| format        | Output format: `Text` (the default) or `Json`. `Json` emits a single machine-readable document and suppresses the banner. |

## Output

```text
MyApp.dproj
  Compiler   : delphi12.0
  Platforms  : win32,win64
  DPM        : True
  Packages   :
    Spring4D.Core 2.0.3
      Spring4D.Base 2.0.3
    VSoft.HttpClient 2.10.0
      VSoft.CancellationToken 0.1.6
      VSoft.Uri 0.3.3
```

Top-level packages were installed into the project deliberately; the packages indented beneath one are its dependencies, pulled in transitively. Use [`dpm why`](./why-command.md) to see every chain that pulls a particular package in.

With `-format=Json` the output is always a `projects` array, even for a single `.dproj`, so a caller does not have to branch on whether it passed a project or a project group.

## Examples

```bat
dpm project

dpm project MyApp.dproj

dpm project MyGroup.groupproj

dpm project MyApp.dproj -format=Json
```
