# Sign Command

Signs a DPM package (`.dpkg`) so consumers can verify its origin and integrity. See [Package Signing](../concepts/package-signing.md) for background.

## Synopsis

```bat
dpm sign <packageFile> [options]
```

`<packageFile>` may be a single `.dpkg` file, a folder containing `.dpkg` files, or a wildcard pattern (e.g. `C:\out\*-Win64-*.dpkg`).

When signing a folder or wildcard, the signing provider session is opened once for the whole batch - relevant when your certificate lives on a smart card or HSM and would otherwise prompt for a PIN per file.

## Common options

| Option                  | Default                            | Description                                                                                  |
| ----------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------- |
| `--provider`            | `local`                            | Signing provider: `local`, `keyvault`, or `signotaur`.                                       |
| `--thumbprint`, `-t`    |                                    | SHA-1 thumbprint of the signing certificate (local or signotaur providers).                  |
| `--store`               | `CurrentUser`                      | Windows certificate store location: `CurrentUser` or `LocalMachine`.                         |
| `--pfx`, `-p`           |                                    | Path to a PFX file (local provider only). Mutually exclusive with `--thumbprint`.            |
| `--pfx-password-env`    |                                    | Name of an environment variable holding the PFX password.                                    |
| `--timestamper`         | `http://timestamp.digicert.com`    | RFC3161 timestamp authority URL.                                                             |
| `--digest`, `-d`        | auto                               | CMS digest algorithm: `sha256`, `sha384`, or `sha512`. Default is chosen from the cert.      |
| `--recursive`, `-r`     | false                              | When the target is a folder, recurse into subfolders.                                        |
| `--pattern`             | `*.dpkg`                           | File pattern to match when the target is a folder.                                           |
| `--fail-fast`           | false                              | Stop on the first failure. By default the batch continues and exits non-zero at the end.     |

For the `local` provider, one of `--thumbprint` or `--pfx` is required.

## Azure Key Vault options

Set `--provider=keyvault` and supply:

| Option                  | Description                                                                |
| ----------------------- | -------------------------------------------------------------------------- |
| `--vault-url`           | Azure Key Vault URL, e.g. `https://my-vault.vault.azure.net`.              |
| `--cert-name`           | Name of the code-signing certificate in the vault.                         |
| `--key-version`         | Specific key version. Omit to use the latest.                              |
| `--tenant-id`           | Azure AAD tenant id.                                                       |
| `--client-id`           | AAD application (client) id used to authenticate.                          |
| `--client-secret-env`   | Name of an environment variable holding the AAD client secret.             |

## Signotaur options

Set `--provider=signotaur` and supply:

| Option                  | Description                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| `--endpoint`            | Signotaur service endpoint URL.                                                             |
| `--api-key-env`         | Name of an environment variable holding the API key (preferred over `--api-key`).           |
| `--api-key`             | API key as a literal value (discouraged - leaks into shell history and process listings).   |
| `--subject`             | Select the certificate by its Subject. Alternative to `--thumbprint` / `--label`.           |
| `--label`               | Select the certificate by its user-assigned label.                                          |
| `--allow-untrusted`     | Trust untrusted TLS chains. For local development only.                                     |

One of `--thumbprint`, `--subject`, or `--label` must be supplied.

## Examples

```bat
dpm sign Foo.dpkg --thumbprint=AB12CD34EF56
```

```bat
dpm sign Foo.dpkg --pfx=cert.pfx --pfx-password-env=PFX_PWD
```

```bat
dpm sign C:\out -r --thumbprint=AB12CD34EF56
```

```bat
dpm sign Foo.dpkg --provider=keyvault --vault-url=https://my-vault.vault.azure.net --cert-name=codesign --tenant-id=GUID --client-id=GUID --client-secret-env=AAD_SECRET
```

```bat
dpm sign Foo.dpkg --provider=signotaur --endpoint=https://signotaur.example.com --api-key-env=SIGNOTAUR_KEY --label=CodeSign
```
