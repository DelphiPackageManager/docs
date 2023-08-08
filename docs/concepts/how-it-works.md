# How does DPM work

Many people have expressed a concern that using DPM would force them to give up using other techniques for working with third-party libraries. This is not the case, and this page will explain just how it all hangs together. Let's start with the basics:

## Packages

DPM packages are a zip file that contains source files and/or compiled dcu/dcp/bpl files, and a manifest file that describes the package, how it should be used, which paths to add to the project search path (more on this below), which design time packages should be install, which runtime files should be included etc. The manifest also describes the other packages this package depends on. When this package is installed, any dependencies are also installed, and their dependencies are also installed.

### So how are packages created?

See [Creating Packages](../getting-started/creating-packages).

### What does installing a package actually do?

Let's walk through the installation process, starting with the command line.

`dpm install vsoft.commandline .\myproject.dproj`

The first step is to determine the Delphi compiler version, which is done by reading the dproj file ([see known issues](../getting-started/known-issues)).

The next step is find our package (VSoft.CommandLine). In the above example, we didn't specify a package version, so dpm searches the registered [sources](./package-sources) to determine the latest version (if any) available.

DPM then checks it's [package cache](./package-cache) to see if it already has the package version downloaded.

If the package is not already cached, dpm downloads it from the registered [source](./package-sources) and extracts the package file into the package cache. This provides us with access to the package manifest.

Using the package manifest, we then start the package [dependency resolution](./package-dependencies) process, which walks the dependency tree to ensure that all dependencies can be resolved. The dependent packages are also downloaded to the package cache during this process (as we need the manifest).

When all the dependencies are met, the dproj is updated with the package references (id and version) and the collected search paths are added to the base configuration for each platform. Note that the command line default is to attempt to install the package for all supported platforms that are enabled in the project. You can install different packages for different platforms by specifying the platform on the command line. In the IDE, you specify which platform you are working on from the UI.

### What changes does dpm make to my dproj?

### So do I need to install the package on every dev machine?

No. DPM has a [restore command](../commands/restore-command) which will look at the package references in the dproj, and go through the process of downloading and installing the packages and dependencies. If the [IDE integration](../getting-started/ide-integration) is installed, then when opening the project in the IDE, the restore command is run as the project is loading to ensure that all packages are available.

### How do I upgrade package versions?

Using the IDE integration, the package search view will show when newer versions are available. See [IDE integration](../getting-started/ide-integration) for more details.

### What about upgrading IDE Versions

Provided the referenced packages/versions are available for the new IDE, then loading the project into the new IDE should restore the packages for that IDE version and away you go. The likely scenario is that package authors will add the new compiler version support, and publish a new package version. First upgrade the package to that version in your old IDE, and then load the project in the new IDE.

Our hope is that using DPM will make upgrading Delphi versions trivial compared to the current situation (as of 2023), where managing third party libraries is an impediment to upgrading.
