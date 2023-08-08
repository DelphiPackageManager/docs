# DPM CLI Commands

This list is the implemented and planned cli commands. Subject to change.

Note you can get help for each command from the command line by invoking

```bat
dpm help <command>
```

| Command                          | Description                                                                                                                                                                                                          | Implemented |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| [cache](./cache-command)         | Downloads a package to the local package cache using the specified sources. If no sources are specified, those listed in the global configuration file, `%appdata%\DPM\dpm.Config`                                   | yes         |
| [config](./config-command)       | Gets or sets DPM config values.                                                                                                                                                                                      | no          |
| [delete](./delete-command)       | Deletes a package from the server.                                                                                                                                                                                   | no          |
| [help](./help-command)           | Get help                                                                                                                                                                                                             | yes         |
| [install](./install-command)     | Installs a package using the specified sources. If no sources are specified, all sources defined in the DPM configuration file are used. If the configuration file specifies no sources, uses the default DPM feed.  | yes         |
| [list](./list-command)           | Displays a list of packages from a given source. If no sources are specified, all sources defined in %AppData%\DPM\DPM.config are used. If DPM.config specifies no sources, uses the default DPM feed.               | yes         |
| [pack](./pack-command)           | Creates a DPM package based on the specified .dspec file.                                                                                                                                                            | yes         |
| [push](./push-command)           | Pushes a package to a package source and publishes it.                                                                                                                                                               | yes         |
| [restore](./restore-command)     | Restores package(s) using the specified sources. If no sources are specified, all sources defined in the DPM configuration file are used. If the configuration file specifies no sources, uses the default DPM feed. | yes         |
| [setapikey](./setapikey-command) | Saves an API key for a given server URL. When no URL is provided API key is saved for the DPM gallery.                                                                                                               | no          |
| [sign](./sign-command)           | Signs all the packages matching the first argument with a certificate.                                                                                                                                               | no          |
| [sources](./sources-command)     | Provides the ability to manage list of sources located in %AppData%\DPM\dpm.config                                                                                                                                   | yes         |
| [spec](./spec-command)           | Generates a package.dspec for a new package. If this command is run in the same folder as a project file (.dproj), it will create a tokenized dspec file.                                                            | no          |
| [uninstall](./uninstall-command) | Uninstalls a package from a project.                                                                                                                                                                                 | yes         |
| [update](./update-command)       | Updates a package using the specified sources. If no sources are specified, all sources defined in the DPM configuration file are used. If the configuration file specifies no sources, uses the default DPM feed.   | no          |
| [verify](./verify-command)       | Verifies the signature of the specified package files.                                                                                                                                                               | no          |
| [why](./why-command)             | Explains why a package is referenced.                                                                                                                                                                                | no          |
