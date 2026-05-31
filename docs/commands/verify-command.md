# Verify Command

Verifies the signatures on a DPM package against the trust policy in your [dpm.config](../concepts/config-files.md). See [Package Signing](../concepts/package-signing.md) for background.

Most users do not need to run this manually - `dpm install`, `dpm restore`, and `dpm update` verify packages automatically. Use `dpm verify` for ad-hoc checks (e.g. inspecting a package before publishing it), and `dpm cache verify` to re-verify everything in the local cache.

## Synopsis

```bat
dpm verify <packageFile> [options]
```

`<packageFile>` is a single `.dpkg` file. Wildcards and folders are not supported.

## Options

| Option           | Default | Description                                                                                |
| ---------------- | ------- | ------------------------------------------------------------------------------------------ |
| `--offline`      | false   | Skip network operations (revocation checks, timestamp authority). Uses cached data only.   |
| `--json-output`  | false   | Emit the result as a single JSON object on stdout. Suppresses human-readable output.       |

## Exit codes

| Code | When                                                                                                  |
| ---- | ----------------------------------------------------------------------------------------------------- |
| 0    | Result is `trusted`, `unsigned`, or `untrustedPublisher` - the package itself is structurally valid.  |
| 1    | Result is `invalid`, or an exception occurred.                                                        |

Whether `unsigned` or `untrustedPublisher` is acceptable depends on your `signing.validationMode` - `dpm verify` reports the verdict, but does not impose policy beyond marking truly invalid signatures as a failure. The `--json-output` mode is the easiest way to consume the verdict in a CI pipeline.

## Examples

```bat
dpm verify Foo.dpkg
```

```bat
dpm verify Foo.dpkg --offline
```

```bat
dpm verify Foo.dpkg --json-output | jq .
```
