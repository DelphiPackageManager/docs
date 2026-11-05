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
| version           | Product version. Overrides `version` in the [.sbom.yaml file](#sbom-yaml-file). Default: ProductVersion (or FileVersion) from the project version info.             |
| supplier          | Name of the product's supplier. Overrides `supplier` in the [.sbom.yaml file](#sbom-yaml-file). Default: CompanyName from the project version info.                 |
| supplier-url      | How to contact the supplier - a URL or an email address. Overrides `supplierUrl` in the [.sbom.yaml file](#sbom-yaml-file).                                         |
| license           | Licence the product is distributed under - an SPDX identifier or expression, e.g. `MIT`. Overrides `license` in the [.sbom.yaml file](#sbom-yaml-file).             |
| sbom-creator      | Email address or http(s) URL of whoever produces the SBOM. Overrides `sbomCreator` in the [.sbom.yaml file](#sbom-yaml-file).                                       |

## Examples

```bat
dpm sbom .\MyProject.dproj

dpm sbom .\MyProject.dproj -outdir=c:\temp -format=cyclonedx

dpm sbom .\MyProject.dproj -supplier="Acme Pty Ltd" -supplier-url=https://acme.example -license=MIT -sbom-creator=sbom@acme.example

dpm sbom .\MyProject.dproj -format=html,markdown

dpm sbom .\MyProject.dproj -format=all

dpm sbom .\MyProject.dproj -platforms=Win32,Win64 -config=Release

dpm sbom .\MySolution.groupproj

dpm sbom .\MySolution.groupproj -per-project
```

## The .sbom.yaml file {#sbom-yaml-file}

A build can't tell DPM who supplies your product, which licence it ships under, or which library a unit from outside DPM belongs to. A project can keep that information in a YAML file next to it, named after the project: `MyApp.dproj` uses `MyApp.sbom.yaml`, and `MySolution.groupproj` uses `MySolution.sbom.yaml`. The file is optional. `dpm sbom` and the IDE's **Generate SBOM** commands both read it, so commit it with the project and every SBOM gets the same values.

The file holds:

- **product information** for the root of the SBOM - the product's version, supplier and licence, and who created the SBOM. The EU Cyber Resilience Act (CRA) and BSI TR-03183-2 expect all of these.
- **component rules** that name the libraries behind units no DPM package provides, such as a commercial component suite, a library on the search path, or source copied into the project.
- the units that are **your own code**.

```yaml
# MyApp.sbom.yaml
version: 2.4.1
supplier: Acme Pty Ltd
supplierUrl: https://acme.example
license: LicenseRef-Acme-EULA
sbomCreator: sbom@acme.example

components:
  - name: Acme Charts
    version: 5.2.0
    supplier: Acme Components Inc
    supplierUrl: https://components.acme.example
    license: LicenseRef-AcmeCharts-Commercial
    unitPrefixes:
      - AcmeChart
  - name: QuickParse
    version: 1.4.0
    license: MIT
    purl: pkg:github/example/quickparse@1.4.0
    units:
      - QuickParse
      - QuickParse.Lexer
    notes: source copied into the project
  - name: SQLite
    version: 3.46.0
    license: blessing
    notes: sqlite3.dll is loaded at runtime, so the MAP file can't show it

ownUnits:
  - MyApp.Version
ownUnitPrefixes:
  - Shared.
```

Keys are matched ignoring case. A key DPM doesn't know, or a value of the wrong kind (a list where a single value belongs), is ignored with a warning ([DPMW8103](../error-codes.md#dpmw8103)) and the rest of the file is used. A file that isn't valid YAML ([DPME8102](../error-codes.md#dpme8102)), or isn't a list of `key: value` pairs ([DPME8101](../error-codes.md#dpme8101)), stops the SBOM being generated.

### Product information

| Key         | Description                                                                                                                                                       | When it is not set                                                 |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| version     | The product's version.                                                                                                                                            | ProductVersion from the project's version info, else FileVersion. |
| supplier    | The company or person who supplies the product.                                                                                                                   | CompanyName from the project's version info.                       |
| supplierUrl | How to contact the supplier - a URL or an email address. Not needed when `supplier` is itself an email address.                                                   | Left out.                                                          |
| license     | The licence the product is distributed under - an SPDX identifier or expression such as `MIT` or `Apache-2.0 OR MIT`, or `LicenseRef-<name>` for your own licence. | Left out.                                                          |
| sbomCreator | Who created the SBOM - an email address or an http(s) URL. Anything else is an error ([DPME8101](../error-codes.md#dpme8101)) and no SBOM is written.            | Left out.                                                          |

The options `-version`, `-supplier`, `-supplier-url`, `-license` and `-sbom-creator` override the file, and the file overrides the version info. The version info is only used when **Include version information in project** is on for the configuration and platform the SBOM is for.

When the supplier, a way to contact them, the version, the licence or the SBOM creator is still missing, `dpm sbom` warns ([DPMW8106](../error-codes.md#dpmw8106)) and the HTML and Markdown reports list what is missing. The SBOM is still written. A version of 1.0.0.0 taken from the version info gets a warning too, since that is the default for a new Delphi project.

### Components

DPM finds the units a build linked in its MAP file. Units from DPM packages and from Delphi itself are identified automatically. Any other unit is grouped with the units from the same folder - each folder becomes a component named after the folder, with no version - or, when DPM can't find the unit's source, listed as unidentified. A component rule names the library instead.

`components` is a list with one entry per library:

| Key          | Description                                                                                                                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name         | Required. An entry without a name is skipped with a warning ([DPMW8104](../error-codes.md#dpmw8104)).                                                                                         |
| version      | The library's version.                                                                                                                                                                       |
| supplier     | Who supplies the library.                                                                                                                                                                    |
| supplierUrl  | How to contact the supplier - a URL or an email address.                                                                                                                                     |
| license      | The library's licence - an SPDX identifier or expression where there is one.                                                                                                                 |
| purl         | The library's [package URL](https://github.com/package-url/purl-spec), which vulnerability scanners use to identify it.                                                                      |
| type         | `library` (the default), `framework` or `application`. Anything else gets a warning ([DPMW8104](../error-codes.md#dpmw8104)) and `library` is used.                                          |
| units        | The names of the units that belong to the library.                                                                                                                                           |
| unitPrefixes | Unit name prefixes - every unit whose name starts with one of them belongs to the library. A prefix shorter than three characters gets a warning, since it may claim units of other libraries. |
| notes        | Free text for people reading the file. DPM ignores it.                                                                                                                                       |

`units` and `unitPrefixes` take a list, or a single value. Unit names and prefixes are matched ignoring case.

- Rules apply to the units that aren't from a DPM package or from Delphi. They also apply inside the project's folder, so library source copied into the project can be listed as a library. A rule for a library you have since installed with DPM does no harm - the package wins.
- An exact name beats a prefix. A rule's `units` are checked first, then `ownUnits`, then a rule's `unitPrefixes`, then `ownUnitPrefixes`. When two rules of the same kind match, the first one in the file wins.
- An entry with neither `units` nor `unitPrefixes` is always added to the SBOM. Use one for something the build can't show, such as a DLL the program loads at runtime.
- An entry whose units match nothing in the MAP file gets a warning ([DPMW8105](../error-codes.md#dpmw8105)) - the library may no longer be used, or its `units` or `unitPrefixes` are wrong.
- Matching units needs the MAP file, so turn on **Map file = Detailed** as described at the top of this page.

### Your own code

Units in the project's folder are the project's own code and never appear as components. `ownUnits` (unit names) and `ownUnitPrefixes` (unit name prefixes) mark other units as your own code too - for example a folder of code shared between your projects. Each takes a list, or a single value.

### Project groups

For a `.groupproj`, DPM reads the group's file and the file of each project in the group.

- The group's product information describes the group, which is the root of the SBOM. Its `sbomCreator` is the SBOM's creator - `sbomCreator` in a project's file isn't used.
- A project's own product information describes that project's entry in the SBOM. When the project's file doesn't set `supplier`, `supplierUrl` or `license`, the group's value is used. The project's version comes from its own file or its version info, never from the group's `version`.
- Options override the group's file, so like the group's file they describe the group, and fill in what a project's own file leaves out.
- Each project uses the component rules and own-code lists in its own file first, then the group's, so a rule in the group's file covers every project.

With `-per-project`, each project's SBOM uses only that project's own file.

### Editing the file from the IDE

In the IDE, the **Generate SBOM** commands on the **DPM** menu and on the Project Manager's right-click menu open a dialog filled in from the file. With **Save the product information to ...** ticked, which is the default, the version, supplier, supplier contact, licence and SBOM creator you enter are saved to the file. A value you clear is cleared in the file, and the file is created if there isn't one.

The rest of the file, including `components`, `ownUnits` and `ownUnitPrefixes`, is kept. The file is only rewritten when a value changes. When it is, it is written in a standard layout, and a comment on a line of its own can end up somewhere else in the file. If the file can't be saved ([DPME8117](../error-codes.md#dpme8117)), the SBOM is still generated with the values from the dialog.
