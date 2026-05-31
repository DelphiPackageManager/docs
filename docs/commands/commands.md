# DPM CLI Commands

This list is the implemented and planned cli commands. Subject to change.

Note you can get help for each command from the command line by invoking

```bat
dpm help <command>
```

| Command                          | Description                                                                                                                                                                                                          | Implemented |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| [cache](./cache-command)         | Downloads a package to the local package cache, or with `cache verify` re-checks every package already in the cache.                                                                                                  | yes         |
| [config](./config-command)       | Gets or sets DPM config values.                                                                                                                                                                                      | no          |
| [delete](./delete-command)       | Deletes a package from the server.                                                                                                                                                                                   | no          |
| [help](./help-command)           | Get help                                                                                                                                                                                                             | yes         |
| [info](./info-command)           | Shows information about the active DPM configuration.                                                                                                                                                                | yes         |
| [install](./install-command)     | Installs a package using the specified sources. If no sources are specified, all sources defined in the DPM configuration file are used. If the configuration file specifies no sources, uses the default DPM feed.  | yes         |
| [list](./list-command)           | Displays a list of packages from a given source. If no sources are specified, all sources defined in `%AppData%\.dpm\dpm.config` are used.                                                                            | yes         |
| [pack](./pack-command)           | Creates a DPM package based on the specified `.dspec.yaml` file.                                                                                                                                                     | yes         |
| [prepare](./prepare-command)     | Prepares per-Delphi-version subfolders under `/packages` with version-correct dpk/dproj files.                                                                                                                       | yes         |
| [push](./push-command)           | Pushes a package to a package source and publishes it.                                                                                                                                                               | yes         |
| [restore](./restore-command)     | Restores package(s) using the specified sources. If no sources are specified, all sources defined in the DPM configuration file are used.                                                                            | yes         |
| [sbom](./sbom-command)           | Generates a Software Bill of Materials (CycloneDX / SPDX) for a project or project group.                                                                                                                            | yes         |
| [scan](./scan-command)           | Scans a CycloneDX SBOM or a project for known vulnerabilities (OSV).                                                                                                                                                  | yes         |
| [setapikey](./setapikey-command) | Saves an API key for a given server URL. When no URL is provided the API key is saved for the DPM public repository.                                                                                                            | no          |
| [sign](./sign-command)           | Signs DPM packages with a code-signing certificate.                                                                                                                                                                  | yes         |
| [sources](./sources-command)     | Manages the list of package sources in `%AppData%\.dpm\dpm.config`.                                                                                                                                                  | yes         |
| [spec](./spec-command)           | Generates a `package.dspec.yaml` for a new package. If run in a folder with a `.dproj`, the generated spec is tokenised based on the project.                                                                        | yes         |
| [trust](./trust-command)         | Manages the local trust policy - trusted publishers and trusted repositories.                                                                                                                                         | yes         |
| [uninstall](./uninstall-command) | Uninstalls a package from a project.                                                                                                                                                                                 | yes         |
| [update](./update-command)       | Updates a package using the specified sources.                                                                                                                                                                       | no          |
| [verify](./verify-command)       | Verifies the signatures on a DPM package.                                                                                                                                                                            | yes         |
| [why](./why-command)             | Shows the dependency chain(s) that pull a package into a project.                                                                                                                                                    | yes         |
