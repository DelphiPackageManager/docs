# Consuming Packages

Before you can use DPM, you need a [Package Source](../concepts/package-sources.md) - you must add at least one package source.

Since we don't yet have a globally accessible package source (ala nuget.org), you will need to download the package files from the where ever the package author publishes them. This will likely be attachments to a GitHub or BitBucket release, or on the author's website.

::: info NOTE
When we have our package server implementation ready, this step will be optional.
:::

### Installing a package

#### In the IDE

See [IDE integration](../getting-started/ide-integration.md)

#### From the command line.

Open a command prompt in your Delphi project's folder (ie the folder where the dproj file lives).

To install a package, we use the dpm [install command](../commands/install-command.md)

e.g

```bat
dpm install VSoft.CommandLine
```

This would install the latest version of the `VSoft.CommandLine` package (assuming it was found), for all supported platforms that are enabled in the Delphi project file. If there are more than one Delphi project files in the folder, the package will be installed into all projects found.

::: warning NOTE
Note that installing a package modifies the dproj file.
:::

For more information on the installation process, see [how it works](../concepts/how-it-works.md).
