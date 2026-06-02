# Creating Packages

DPM packages are defined by a YAML spec file with the extension `.dspec.yaml`. The spec describes the package, the compiler / platform combinations it supports, the source files and projects to include, and any dependencies on other packages.

Scaffold a starter spec with [`dpm spec`](../commands/spec-command.md) and build it with [`dpm pack`](../commands/pack-command.md):

```bat
dpm spec VSoft.CommandLine

dpm pack VSoft.CommandLine.dspec.yaml -o=i:\dpmfeed
```

`dpm pack` produces one `.dpkg` file per compiler / platform combination defined in `targetPlatforms`.

## Root structure

| Key                       | Required | Description                                                                                  |
| ------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| `min dpm client version`  | no       | Minimum DPM client version required to install or build this package. Note the literal spaces in the key. |
| `metadata`                | yes      | Package identity and descriptive metadata.                                                    |
| `variables`               | no       | Spec-wide variables, referenced as `$name$` (see [variables](#variables)).                     |
| `targetPlatforms`         | yes      | Sequence of compiler / platform combinations this package supports.                            |
| `templates`               | yes      | Sequence of build templates referenced by `targetPlatforms`.                                  |

Skeleton:

```yaml
min dpm client version: 1.0
metadata:
  ...
variables:
  ...
targetPlatforms:
  - ...
templates:
  - name: default
    ...
```

## metadata

The `metadata` section identifies the package and provides descriptive information shown by clients and on the server ui.

| Field              | Required | Description                                                                                |
| ------------------ | -------- | ------------------------------------------------------------------------------------------ |
| `id`               | yes      | Package id, e.g. `VSoft.CommandLine`.                                                       |
| `version`          | yes      | Semantic version, e.g. `1.0.0`.                                                              |
| `description`      | yes      | Short description of the package.                                                           |
| `authors`          | yes      | Sequence of author names.                                                                   |
| `projectUrl`       | no       | URL of the project home page.                                                               |
| `repositoryUrl`    | no       | URL of the source code repository.                                                          |
| `repositoryBranch` | no       | Default branch name in the repository.                                                      |
| `repositoryCommit` | no       | Specific commit hash, or `#HASH#` to be substituted at pack time.                            |
| `license`          | no       | SPDX license identifier, e.g. `Apache-2.0`. See [SPDX License List](https://spdx.org/licenses/). |
| `copyright`        | no       | Copyright notice.                                                                           |
| `icon`             | no       | Path inside the package to a 64x64 image (PNG with transparent background) shown in the UI. |
| `readme`           | no       | Path to a README file inside the package.                                                   |
| `releaseNotes`     | no       | Release notes text or a path to a release notes file.                                       |
| `tags`             | no       | Sequence of searchable tags.                                                                |
| `frameworks`       | no       | Sequence of UI frameworks supported: `VCL`, `FMX`, or both.                                 |
| `isTrial`          | no       | `true` if this is a trial release. Default `false`.                                          |
| `isCommercial`     | no       | `true` if this is a commercial package. Default `false`.                                     |

Example:

```yaml
metadata:
  id: VSoft.VirtualListView
  version: 1.0.0
  description: Virtual List View control.
  authors:
    - Vincent Parrett
  projectUrl: https://github.com/VSoftTechnologies/VSoft.VirtualListView
  repositoryUrl: https://github.com/VSoftTechnologies/VSoft.VirtualListView
  license: Apache-2.0
  copyright: Vincent Parrett and contributors
  tags:
    - list
    - virtual
  frameworks:
    - VCL
```

## targetPlatforms

`targetPlatforms` is a sequence of entries that each declare which compiler(s) and platform(s) the package supports. Each entry uses exactly **one** of three compiler-specification forms.

**Single compiler:**

```yaml
targetPlatforms:
  - compiler: 12.0
    platforms: [Win32, Win64]
    template: default
```

**Compiler range (inclusive on both ends):**

```yaml
targetPlatforms:
  - compiler from: XE2
    compiler to: 12.0
    platforms: [Win32, Win64]
    template: default
```

Note: `compiler from` and `compiler to` contain literal spaces - they are not camel case.

**Discrete list of compilers:**

```yaml
targetPlatforms:
  - compilers: [XE2, XE7, 12.0]
    platforms: [Win32, Win64]
    template: default
```

Per-entry fields:

| Field             | Required          | Description                                                                            |
| ----------------- | ----------------- | -------------------------------------------------------------------------------------- |
| `compiler`        | one of the three  | A single compiler version.                                                              |
| `compiler from`   | one of the three  | Lower bound of an inclusive compiler range. Used with `compiler to`.                    |
| `compiler to`     | one of the three  | Upper bound of an inclusive compiler range. Used with `compiler from`.                  |
| `compilers`       | one of the three  | Sequence of compiler versions.                                                          |
| `platforms`       | yes               | Sequence of platforms supported by this entry. See the platform list below.             |
| `template`        | no                | Name of a `templates` entry to use. Defaults to `default`.                              |
| `variables`       | no                | Mapping of variable overrides applied only to this entry.                               |

### Supported compiler versions

| Value | Delphi version       |
| ----- | -------------------- |
| `XE2` | Delphi XE2           |
| `XE3` | Delphi XE3           |
| `XE4` | Delphi XE4           |
| `XE5` | Delphi XE5           |
| `XE6` | Delphi XE6           |
| `XE7` | Delphi XE7           |
| `XE8` | Delphi XE8           |
| `10.0` | Delphi 10 Seattle    |
| `10.1` | Delphi 10.1 Berlin   |
| `10.2` | Delphi 10.2 Tokyo    |
| `10.3` | Delphi 10.3 Rio      |
| `10.4` | Delphi 10.4 Sydney   |
| `11.0` | Delphi 11 Alexandria |
| `12.0` | Delphi 12 Athens     |
| `13.0` | Delphi 13            |

### Supported platforms

| Value           | Description                       |
| --------------- | --------------------------------- |
| `Win32`         | Windows 32-bit                    |
| `Win64`         | Windows 64-bit                    |
| `WinARM64EC`    | Windows on ARM64EC                |
| `MacOS32`       | macOS 32-bit (legacy)             |
| `MacOS64`       | macOS 64-bit Intel                |
| `MacOSARM64`    | macOS ARM64 (Apple Silicon)       |
| `Android`       | Android 32-bit                    |
| `Android64`     | Android 64-bit                    |
| `iOS32`         | iOS 32-bit (legacy)               |
| `iOS64`         | iOS 64-bit                        |
| `iOSSimulator`  | iOS Simulator (Intel)             |
| `iOSSimARM64`   | iOS Simulator (ARM64)             |
| `Linux64`       | Linux 64-bit                      |

Not every platform is valid for every compiler - older compilers only target Windows, and design-time packages are limited to `Win32` and `Win64` (plus `Win64` from Delphi 12 onwards).

## templates

`templates` is a sequence of named build templates. Each `targetPlatforms` entry references a template by name (defaulting to `default`). A template describes the dependencies, source files, and projects that go into the package.

| Field          | Description                                                              |
| -------------- | ------------------------------------------------------------------------ |
| `name`         | Template identifier. Required.                                            |
| `dependencies` | Sequence of dependency entries.                                           |
| `source`       | Sequence of source-file entries to include in the package.                |
| `build`        | Sequence of runtime package projects to build.                             |
| `design`       | Sequence of design-time package projects to build.                         |

### dependencies

Each dependency declares another DPM package that must be installed alongside this one. Use the special token `$version$` to pin to the current package's own version.

```yaml
dependencies:
  - id: Spring4D.Core
    version: "[2.0.0,)"
  - id: VSoft.SemanticVersion
    version: "[1.0.0,2.0.0]"
  - id: MyCompany.Shared
    version: $version$
```

| Field     | Required | Description                                                                                     |
| --------- | -------- | ----------------------------------------------------------------------------------------------- |
| `id`      | yes      | Dependency package id.                                                                          |
| `version` | yes      | Version range. See [Version Range](../concepts/version-range.md) for the supported syntax.       |

### source

`source` Each entry maps one or more files from the project's working tree into the package archive.

```yaml
source:
  - src: ./src/*.pas
    dest: src
    exclude:
      - "*.dcu"
      - "Test*.pas"
  - src: ./inc/*.inc
    dest: inc
```

| Field     | Required | Description                                                                                          |
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `src`     | yes      | Relative path or glob describing which files to include. Supports `*`, `**`, and `*.ext`.             |
| `dest`    | no       | Destination folder within the package. If omitted, the relative directory structure is preserved.    |
| `exclude` | no       | Sequence of glob patterns to exclude from this `src`.                                                |

### build

`build` lists runtime package projects (`.dpk` / `.dproj`) to compile into the package.

```yaml
build:
  - project: ./packages/$packageSource$/MyPackage.dproj
    platforms: [Win32, Win64]
    defines: RELEASE;DPM
```

| Field        | Required | Description                                                                                      |
| ------------ | -------- | ------------------------------------------------------------------------------------------------ |
| `project`    | yes      | Path to a `.dpk` or `.dproj` file.                                                                |
| `platforms`  | no       | Sequence of platforms to build. Defaults to the platforms of the enclosing `targetPlatforms` entry. |
| `defines`    | no       | Semicolon-separated additional compiler defines.                                                  |
| `references` | no       | Sequence of dependent runtime packages (dcp) that this project links against.                                |

### design

`design` lists design-time package projects to build. Design-time packages are installed into the IDE and so are limited to `Win32` (and `Win64` from Delphi 12 onwards).

```yaml
design:
  - project: ./packages/$packageSource$/MyPackageDesign.dproj
    platforms: [Win32]
    defines: DESIGNTIME
    libPrefix: dcl
    libSuffix: "280"
```

| Field        | Required | Description                                                                                       |
| ------------ | -------- | ------------------------------------------------------------------------------------------------- |
| `project`    | yes      | Path to a design-time `.dpk` or `.dproj`.                                                          |
| `platforms`  | no       | Defaults to `Win32` (plus `Win64` from Delphi 12 onwards).                                          |
| `defines`    | no       | Semicolon-separated compiler defines.                                                              |
| `references` | no       | Sequence of dependent runtime packages (dcp) this design package links against.                                |
| `libPrefix`  | no       | Override library prefix. Defaults to `dcl`.                                                        |
| `libSuffix`  | no       | Override library suffix, e.g. `280` for Delphi 12.                                                 |
| `libVersion` | no       | Override library version string.                                                                   |

## variables

`variables` are reusable values you can reference anywhere in the spec using `$name$` substitution. Use them to avoid repeating compiler-specific folder names or build flags.

Variables can be declared at the spec root and overridden per `targetPlatforms` entry:

```yaml
variables:
  packageSource: "Delphi $compilernoprefix$ $compilerCodeName$"

targetPlatforms:
  - compiler: delphi10.0
    platforms: [Win32, Win64]
    # override for this compiler version
    variables:
      packageSource: "Delphi 10 $compilerCodeName$"
```

Variable values may themselves contain other variables (see below).

## Built in variables

`dpm pack` expands `$name$` references before processing the spec. Names are matched **case-insensitively**, and references may appear in paths, file globs, `defines`, and other variable values. **An unknown name causes the pack to fail** - only the variables listed below (plus any you defined in `variables` or supplied via `dpm pack -variables=name=value;...`) are valid.

Example expansions are shown for Delphi 12.0 (Athens). The same variables work for every supported compiler.

| Variable                    | Expands to                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------ |
| `$version$`                 | Package version. Defaults to `metadata.version`; overridden by `dpm pack -version=...`.           |
| `$compiler$`                | Compiler version (the lowercase enum name), e.g. `delphi12.0`, `delphixe7`.                       |
| `$target$`                  | Alias for `$compiler$`.                                                                           |
| `$compilernoprefix$`        | Compiler version without the `delphi` prefix, e.g. `12.0`, `XE7`.                                  |
| `$compilermajornoprefix$`   | Major number only, with no prefix and no minor, e.g. `12`, `XE7`.                                  |
| `$compilernopoint$`         | Compiler with the dot removed, e.g. `delphi120`, `delphixe7`.                                      |
| `$compilercodename$`        | Delphi release code name from 10.0 onwards, e.g. `Athens`. Empty string for XE-series compilers.   |
| `$compilerwithcodename$`    | `$compiler$` plus a space and `$compilercodename$`, e.g. `delphi12.0 Athens`.                      |
| `$compilerversion$`         | Internal Delphi compiler version as an integer string, e.g. `36`.                                  |
| `$compilershortversion$`    | Simplified compiler version used by some - xe2-xe8, then 100, 101,102, 103,104,110,120,130        |
| `$libsuffix$`               | DCC lib suffix for the compiler, e.g. `290` for Delphi 12.                                          |
| `$bdsversion$`              | BDS / RAD Studio product version, e.g. `23.0` for Delphi 12.                                        |

Any name you define under `variables:` (at the spec root or per `targetPlatforms` entry) is also available as `$name$`, and variable values may themselves reference other variables.

## Complete example

```yaml
min dpm client version: 1.0

metadata:
  id: Gabr42.OmniThreadLibrary
  version: 3.7.12
  description: A powerful threading library for Delphi.
  authors:
    - Primož Gabrijelčič
  projectUrl: https://github.com/gabr42/OmniThreadLibrary
  repositoryUrl: https://github.com/gabr42/OmniThreadLibrary
  license: BSD-3-Clause
  copyright: Primož Gabrijelčič
  readme: README.md
  tags:
    - threading
    - async

variables:
  packageSource: "Delphi $compilernoprefix$ $compilerCodeName$"

targetPlatforms:
  - compiler from: XE2
    compiler to: XE8
    platforms: [Win32, Win64]
  - compiler: 10.0
    platforms: [Win32, Win64]
    variables:
      packageSource: "Delphi 10 $compilerCodeName$"
  - compiler from: 10.1
    compiler to: 13.0
    platforms: [Win32, Win64]

templates:
  - name: default
    # Omnithread has all source in the root, so we specify dest to move it where we want it
    source:
      - src: ./*.pas
        dest: src
      - src: ./*.inc
        dest: src
      - src: ./LICENSE.txt
        dest: src
      - src: ./src/**/*.pas
        dest: src/src
        exclude:
          - ./tests/**
          - ./examples/**
      - src: ./packages/$packageSource$/**
        dest: src/packages/$packageSource$
    build:
      - project: ./src/packages/$packageSource$/OmniThreadLibraryRuntime.dproj
    design:
      - project: ./src/packages/$packageSource$/OmniThreadLibraryDesigntime.dproj
```

## See also

- [spec command](../commands/spec-command.md) - scaffold a new `.dspec.yaml`.
- [pack command](../commands/pack-command.md) - build `.dpkg` files from a spec.
- [prepare command](../commands/prepare-command.md) - generate per-compiler dpk/dproj subfolders.
- [Version Range](../concepts/version-range.md) - the dependency version range syntax.
