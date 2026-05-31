# Sources command

Manages the list of package sources in `%appdata%\.dpm\dpm.config` (or the configuration file specified with `-configFile`).

## Usage

```bat
dpm sources <operation> -name=<name> -source=<source> [-type=<type>] [options]
```

`<operation>` is one of `List`, `Add`, `Remove`, `Enable`, `Disable`, or `Update`. You can operate on one source at a time.

## Options

| Option         | Description                                                                                                |
| -------------- | ---------------------------------------------------------------------------------------------------------- |
| name (-n)      | The source name.                                                                                            |
| source (-s)    | The source URL or path.                                                                                     |
| type (-t)      | The source type: `Folder`, `DPMServer`, `GitHubDPM`, or `GitHubDN`.                                          |
| format (-f)    | Applies to the `List` action. `Detailed` (default) or `Short`.                                              |
| userName (-u)  | User name for authenticating with the source.                                                               |
| password (-p)  | Password for authenticating with the source. See note below.                                                |
| configFile     | The DPM configuration file to apply. If not specified, `%AppData%\.dpm\dpm.config` is used.                 |
| verbosity (-v) | Output verbosity: _quiet_, _normal_, _detailed_.                                                            |
| help (-h)      | Displays help information for the command.                                                                  |

> [!Note]
> Add the source's password under the same user context that `dpm.exe` will later run as. The password is stored encrypted in the config file and can only be decrypted by the user that encrypted it - on a build server, encrypt under the user the build task runs as.

## Examples

```bat
dpm sources Add -name=MyServer -source=\\myserver\packages

dpm sources Add -name=DPMOrg -source=https://delphi.dev/api/v2/index.json -type=DPMServer

dpm sources Disable -name=MyServer

dpm sources Enable -name=DPMOrg

dpm sources add -name=foo.bar -source=C:\dpm\local -username=foo -password=bar -configfile=%AppData%\.dpm\my.config
```
