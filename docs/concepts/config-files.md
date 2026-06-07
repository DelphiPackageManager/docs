# DPM Config Files

dpm.config files are yaml format files which store the location of the package cache, along with the registered sources.

The default config file lives in `%APPDATA%\.dpm\dpm.config.yaml` - it will be created when first accessed.

Most [dpm cli commands](../commands/commands.md) have a -configFile option. If that is not specified, then dpm will look for a dpm.config file in the current folder. If that is not found, then the default config file will be used.

**Example**

```yaml
packageCacheLocation: "C:\\Users\\vincent.OFFICE\\AppData\\Roaming\\.dpm\\package_cache"
author: Vincent Parrett
signing:
  validationMode: permissive
  authorDowngradePolicy: prompt
  allowKeyCompromiseOverride: false
  trustedPublishers:
    - name: VSoft Technologies
      spki: 895eb1c77dc114802e80c6ff22b5140483bd09379482f4babfee752865207e16
  trustedRepositories:
    - url: https://delphi.dev
      spki: 7a3f9b2c5d6e8f1a4b7c9d2e5f8a1b4c7d9e2f5a8b1c4d7e9f2a5b8c1d4e7f9a
packageSources:
  - name: dpminternal
    source: "i:\\dpm-internal"
    type: Folder
    enabled: true
  - name: DPM
    source: 'https://delphi.dev/api/v2/index.json'
    type: DPMServer
    enabled: true
```



| Property             | Value                                                                                        |
| -------------------- | -------------------------------------------------------------------------------------------- |
| packageCacheLocation | The location of the default global packages folder. The default is `%APPDATA%\.dpm\package_cache` |
| author        | The default author used by the spec scaffolder - optional |   
| signing | Package signing configuration |
| packagesSources      | An array of packageSource objects                                                            |

**signing**

See [Package Signing](./package-signing.md) for an overview of how signing and verification work.

| Property                     | Value                                                                                                                |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| validationMode               | How strictly signatures are verified: `permissive` (default), `require`, `repository-required`, `author-and-repository`. |
| authorDowngradePolicy        | What to do when a previously-signed package id appears unsigned: `prompt` (default), `deny`, or `allow`.             |
| allowKeyCompromiseOverride   | Whether the user may override a known-compromised key warning. Defaults to `false`.                                  |
| trustedPublishers            | List of trusted publishers, each with a `name` and the SPKI fingerprint (`spki`) of their signing certificate.       |
| trustedRepositories          | List of trusted repositories, each with a `url` and the SPKI fingerprint (`spki`) of the repository signing key.     |



**packageSource**

| Property | Value                                                            |
| -------- | ---------------------------------------------------------------- |
| name     | The name of the source                                           |
| source   | The uri of the packageSource                                     |
| enabled  | Whether the source is enabled or not (boolean)                   |
| apiKey   | The push apiKey for a httpspackageSource                         |
