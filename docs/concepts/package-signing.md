# Package Signing

DPM supports signing packages so that consumers can verify who built a package, that its contents have not been altered, and that a repository accepted it. Signing is optional but strongly recommended for any package you distribute publicly.

## Why sign packages

A signature on a `.dpkg` file gives three guarantees:

- **Integrity** - the package contents are exactly what the signer produced, byte for byte.
- **Authenticity** - the package came from the person or organisation identified by the signing certificate.
- **Repository trust** - the repository that distributed the package vouches that it accepted and validated it.

Unsigned packages can still be installed, but consumers can configure DPM to reject them. See [Validation modes](#validation-modes) below.

## Author and repository signatures

There are two independent signature layers, and a package can carry either, both, or neither.

- **Author signature** - applied by the package publisher before pushing to a package repository. It proves the package came from a specific author and has not been tampered with since they signed it.
- **Repository signature** - applied by the DPM server after it accepts an upload. It records that the server verified the package (including the author signature, if any) and is serving it to the world.

Both signatures embed an RFC3161 trusted timestamp, so they remain verifiable after the signing certificate eventually expires.

## Signing a package

Authors sign their packages with the [sign command](../commands/sign-command.md):

```bat
dpm sign yourpackage.dpkg --thumbprint=AB12CD34EF56...
```

DPM supports three signing providers, chosen with the `--provider` option:

- `local` (default) - uses a certificate from the Windows certificate store (by SHA-1 thumbprint) or a PFX file on disk.
- `keyvault` - uses a code-signing certificate stored in Azure Key Vault. The private key never leaves the vault. Currently Untested.
- `signotaur` - uses VSoft's Signotaur server (v2) for remote signing. The private key never leaves the Token or HSM used.

A typical publishing flow looks like this:

1. Obtain a code-signing certificate. For public distribution this should be a publicly trusted code-signing certificate; for internal use an organisation's own CA is fine (e.g, ADCS, Signotaur etc). RSA and ECDSA certificates are accepted.
2. Export your certificates Public Key - add it as a Signing Key to your account on the server (personal or organisation).
2. Run `dpm sign` to produce a signed package.
3. Run `dpm push` to upload it to a DPM server. The server re-verifies your author signature and adds its own repository signature before publishing.

## Verifying a package

Consumers do not normally need to run verification manually - it happens automatically during `dpm install`, `dpm restore`, and `dpm update`, using the trust policy from your [dpm.config](./config-files.md).

For ad-hoc checks there is the [verify command](../commands/verify-command.md):

```bat
dpm verify yourpackage.dpkg
```

To re-hash and re-verify every package already in your local cache (useful as a periodic integrity check or after changing trust settings), use:

```bat
dpm cache verify
```

## Validation modes

The `signing.validationMode` setting in [dpm.config](./config-files.md) controls how strict verification is. The default while the ecosystem transitions is `permissive`.

| Mode                       | Behaviour                                                                                  |
| -------------------------- | ------------------------------------------------------------------------------------------ |
| `permissive`               | Unsigned packages are allowed. Packages that are signed must verify successfully.          |
| `require`                  | An author signature is required. Unsigned packages are rejected.                           |
| `repository-required`      | A repository signature is required. Unsigned or repository-unsigned packages are rejected. |
| `author-and-repository`    | Both an author signature and a repository signature are required.                          |

## Trusted publishers and repositories

DPM identifies signers by the **SPKI hash** of their certificate - a SHA-256 fingerprint of the certificate's public key. Pinning by SPKI rather than by certificate name or thumbprint means trust survives routine certificate renewals as long as the same key pair is reused, while still uniquely identifying the signer.

Add a trusted publisher or repository to your `dpm.config`:

```yaml
signing:
  trustedPublishers:
    - name: VSoft Technologies
      spki: 895eb1c77dc114802e80c6ff22b5140483bd09379482f4babfee752865207e16
  trustedRepositories:
    - url: https://delphi.dev
      spki: 7a3f9b2c5d6e8f1a4b7c9d2e5f8a1b4c7d9e2f5a8b1c4d7e9f2a5b8c1d4e7f9a
```

See [Config Files](./config-files.md) for the full schema.

## Downgrade protection

DPM remembers whether a package id was previously seen signed. If a later version of the same package shows up unsigned, that is suspicious - either an attacker is trying to substitute a malicious package, or the publisher has lost their signing key. The `signing.authorDowngradePolicy` setting controls what happens:

- `prompt` (default) - asks the user to acknowledge the downgrade.
- `deny` - rejects the downgrade outright.
- `allow` - accepts the downgrade silently (not recommended).

## See also

- [Config Files](./config-files.md) - the `signing` section reference.
- [sign command](../commands/sign-command.md) - signing packages from the CLI.
- [verify command](../commands/verify-command.md) - verifying a single package.
- [cache command](../commands/cache-command.md) - including `dpm cache verify` for the whole cache.
