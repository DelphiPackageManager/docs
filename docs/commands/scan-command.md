# Scan command

Scans a CycloneDX SBOM or a Delphi project for known vulnerabilities. The command reads (or generates) a CycloneDX SBOM, queries the [Open Source Vulnerabilities](https://osv.dev) database, and writes a CycloneDX 1.5 VEX report next to the input.

OSV responses are cached under `%APPDATA%\.dpm\vuln-cache` for 24 hours. Use `-fail-on` to make the command exit non-zero in CI when a vulnerability above a chosen severity is found.

## Usage

```bat
dpm scan <sbom-or-project> [options]
```

The input is either a CycloneDX SBOM `.json` file or a `.dproj` / `.groupproj`. When given a project, `scan` generates an SBOM internally and then scans it.

## Options

| Option            | Description                                                                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| output (-o)       | Output `.vex.json` path. File path when the input is an SBOM, directory when it is a project. Defaults: `<input>.vex.json`, or per-platform files in the project folder. |
| source (-s)       | Vulnerability database. Only `osv` is supported. Default: `osv`.                                                                                              |
| fail-on           | Exit code 1 if any vulnerability of this severity (or higher) is found. Accepted: `none`, `low`, `medium`, `high`, `critical`. Default: `none`.               |
| no-cache          | Bypass the 24h response cache for this run. Fresh responses are still written back to the cache.                                                              |
| platforms (-p)    | Comma-separated platforms to scan. Only used when the input is a project. Default: all enabled.                                                               |

## Examples

```bat
dpm scan MyProject.cdx.json

dpm scan MyProject.cdx.json -fail-on=high

dpm scan MyProject.dproj -platforms=Win32,Win64

dpm scan MySolution.groupproj -output=c:\reports

dpm scan MyProject.cdx.json -no-cache
```
