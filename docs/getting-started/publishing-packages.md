# Publishing Packages

Once you have built a package with [`dpm pack`](../commands/pack-command.md), you can publish it to a [package source](../concepts/package-sources.md) so that others (or your own projects) can install it. Publishing is done with the [`dpm push`](../commands/push-command.md) command.

DPM supports two kinds of targets:

- A **folder source** (local or UNC path) - `dpm push` simply copies the `.dpkg` file into the source folder.
- A **server source** (an HTTPS DPM server such as `https://delphi.dev`) - `dpm push` uploads the file over HTTP and the server publishes it.

## Before you push

1. **Build the package.** `dpm pack` produces one `.dpkg` file per compiler in your spec, for example `VSoft.CommandLine.1.0.1.dpkg`.

2. **Sign the package (optional but recommended).** For server sources you will usually want to [sign](../commands/sign-command.md) the package first so consumers can verify its origin and integrity. See [Package Signing](../concepts/package-signing.md) for background.

   ```bat
   dpm sign .\VSoft.CommandLine.1.0.1.dpkg --thumbprint=AB12CD34EF56
   ```

3. **Make sure the target source is registered.** Pushing uses a source by name (or url). Add one with the [sources command](../commands/sources-command.md) if you have not already:

   ```bat
   dpm sources add -name=local -source=\\myserver\dpmsource
   ```
The public repository is automatically enabled when you first use dpm.

## API keys

A server source requires an API key to authorise the upload. Folder sources do not.

The key can be supplied in two ways:

- Per command, with the `-apiKey` option.
- Stored against the source in your [dpm.config](../concepts/config-files.md) file (the `apiKey` property of the package source).


## Pushing to a folder source

For a folder or UNC source, the package file is copied into the source folder. No API key is needed, however you do need write permissions to the folder.

```bat
dpm push .\VSoft.CommandLine.1.0.1.dpkg -source=local
```

## Pushing to a server source

For an HTTPS server source, the package is uploaded over HTTPS. An API key is required.

```bat
dpm push .\VSoft.CommandLine.1.0.1.dpkg -source=dpm -apiKey=abcdef
```


## Pushing multiple files

`dpm pack` typically produces several `.dpkg` files (one per compiler / platform). Each must be pushed. On the command line you can loop over the output folder:

```bat
for %f in (.\output\*.dpkg) do dpm push "%f" -source=dpm
```

If a package and version already exist on the source, use `-skipDuplicate` so the push skips it instead of failing - handy when re-running a publish step:

```bat
dpm push .\output\*.dpkg -source=dpm -skipDuplicate
```

## Re-publishing and versions

Package sources treat a published `id` + `version` as immutable. To publish a change you must bump the [version](../concepts/package-versioning.md) and pack again - you cannot overwrite an existing version. Use `dpm pack -version=...` to set the version at pack time if you do not want to edit the spec.

## See also

- [push command](../commands/push-command.md) - full option reference.
- [pack command](../commands/pack-command.md) - build `.dpkg` files from a spec.
- [sign command](../commands/sign-command.md) - sign a package before publishing.
- [sources command](../commands/sources-command.md) - register and manage package sources.
- [Package Sources](../concepts/package-sources.md) - folder vs server sources.
- [Config Files](../concepts/config-files.md) - where API keys and sources are stored.
