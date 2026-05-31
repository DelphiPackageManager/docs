# Trust command

Manages the local trust policy - trusted publishers, trusted repositories, and related signing settings - by editing the `signing` section of your [dpm.config](../concepts/config-files.md). See [Package Signing](../concepts/package-signing.md) for background on what trust pinning does.

## Usage

```bat
dpm trust <list|add|remove|show> [publisher|repository] [options]
```

The first positional argument selects the action; the second selects the kind of entry (`publisher` is the default). Without arguments, `dpm trust` lists every entry of both kinds.

## Options

| Option        | Description                                                                                  |
| ------------- | -------------------------------------------------------------------------------------------- |
| spki          | SHA-256 SPKI hash of the certificate's public key, e.g. `sha256:AB12CD34...`. Required for `add`. |
| name (-n)     | Display name for the entry. Used with `add publisher`.                                       |
| url (-u)      | Repository URL. Used with `add repository`.                                                  |

## Examples

```bat
dpm trust list

dpm trust add publisher -name="VSoft Technologies" -spki=sha256:895eb1c77dc114802e80c6ff22b5140483bd09379482f4babfee752865207e16

dpm trust add repository -url=https://delphi.dev -spki=sha256:7a3f9b2c5d6e8f1a4b7c9d2e5f8a1b4c7d9e2f5a8b1c4d7e9f2a5b8c1d4e7f9a

dpm trust show publisher -name="VSoft Technologies"

dpm trust remove repository -url=https://delphi.dev
```
