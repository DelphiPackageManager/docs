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

Any signature that is present but doesn't verify makes the result `invalid`, whatever the mode - a package with
one good signature and one broken one is `invalid`. A package in a newer package format than this version of DPM
reads is reported with DPME7109 rather than DPME7001.

Whether `unsigned` or `untrustedPublisher` is acceptable depends on your `signing.validationMode` - `dpm verify` reports the verdict, but does not impose policy beyond marking truly invalid signatures as a failure. `untrustedPublisher` means every signature verifies, but the author certificate doesn't chain to a trusted root (a self-signed or private CA certificate) and its SPKI isn't in `signing.trustedPublishers` - see [Private feeds](../concepts/package-signing.md#private-feeds-self-signed-and-private-ca-certificates). The `--json-output` mode is the easiest way to consume the verdict in a CI pipeline.

## JSON output

Each entry in `signatures` has the signature's `role`, `valid`, and for a valid one the signer's `signerSubject`,
`signerSpki` and `thumbprint`. For one that doesn't verify there is a `failureReason`, and the certificate it
claims to be signed with as `claimedSignerSubject` and `claimedSignerSpki` - nothing vouches for those, so they are
for diagnosis only. An author signature has `untrustedRoot` (true for a self-signed or private CA certificate) and
`publisherTrusted`. `timestampAuthority` names the timestamp authority, and `timestampAuthorityUntrusted` is true
when this machine doesn't trust it - the certificate was then checked as of now (DPMW7011).

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
