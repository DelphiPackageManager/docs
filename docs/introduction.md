# Introduction

DPM is an open-source package/library manager for Delphi XE2 or later.

### What is a Package Manager

A package manager provides a standard for developers to share and consume code. Authors create packages that other developers can consume. The package manager provides a simple way to automate the installation, upgrading or removal of packages. This streamlines the development process, allowing developers to get up and running on a project quickly, without needing to understand the (usually ad-hoc) way the project or organization has structured their third party libraries. This also translates into simpler build/CI processes, with less 'compiles on my machine' style issues.

### Who and Why

DPM's initial developer is Vincent Parrett (DUnitX, FinalBuilder, Continua CI). Why is discussed in [this blog post](https://www.finalbuilder.com/resources/blogs/delphi-package-manager-rfc).

### DPM Status

DPM is still in development, so not all functionality is ready yet. At this time, it's at the stage where we are encouraging library authors to take a look and play with it and provide feedback (and perhaps get involved in the development). It's very much at a minimum viable product stage.

#### What works

- Creating packages
- Installing packages, including dependencies
- Restoring packages, including dependencies.
- Pushing packages to a package source.

### Can I use it with non DPM third party libraries?

Yes! DPM will not interfere with other libraries that may be installed. The manner in which is adds packages to the search path will not change existing settings.

### How do I use it

See the [getting started guide](./getting-started/installing.md).

The command line documentation can be found [here](./commands/commands.md).

### Is DPM integrated into the Delphi IDE

Yes, IDE integration is provided in the installer for all supported IDE versions. See [IDE Integration](./getting-started/ide-integration.md).

### Is there a central package source

It is currently being developed. The site is at [https://delphi.dev](https://delphi.dev) - but bear in mind we are still fleshing out the user and management ui's, so it's not yet ready for testing (feel free to have a browse). If it's down, that just means we're updating it or working on our infrastructure.

Package files will be stored and served by a [CDN](https://en.wikipedia.org/wiki/Content_delivery_network) - we are currently testing out options for this to find the best pricing

### Is my old version of delphi supported

Maybe, [see here](./compiler-versions.md) for supported compiler versions. All target [platforms](./platforms.md) for supported compiler versions are supported.

### What about C++ Builder or FPC

[see here](./compiler-versions.md)

### Does it support design-time components

Not yet, but is being worked on.

### How does it work

See [this page](./concepts/how-it-works.md)

### Known Issues

See [known issues](./getting-started/known-issues.md)

### Can I help

Yep, see [Contributing to DPM](./contributing.md).
