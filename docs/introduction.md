# Introduction

DPM is an open-source package/library manager for Delphi XE2 or later.

### What is a Package Manager

A package manager provides a standard for developers to share and consume code. Authors create packages that other developers can consume. The package manager provides a simple way to automate the installation, upgrading or removal of packages. This streamlines the development process, allowing developers to get up and running on a project quickly, without needing to understand the (usually ad-hoc) way the project or organization has structured their third party libraries. This also translates into simpler build/CI processes, with less 'compiles on my machine' style issues.

### Who and Why

DPM's initial developer is Vincent Parrett (DUnitX, FinalBuilder, Continua CI). Why is discussed in [this blog post](https://www.finalbuilder.com/resources/blogs/delphi-package-manager-rfc).

### DPM Status

DPM is in beta - we have put a lot of work in to getting it to a point where it should be usable for most Delphi developers. 

#### What works

- Creating packages (library authors)
- Pushing packages to a package source (directory or server)
- Installing and Restoring packages, including dependencies and design time components.
- Multiple package sources
- Package Signing - both Author (using a code signing certificate) and Repository signing (automatic).
- Repository and Author Trust.
- SBOM generation.
- CLI and IDE plugin clients.


### Can I use it with non DPM third party libraries?

Yes! DPM will not interfere with other libraries that may be installed. The manner in which it adds packages to the search path will not change existing settings.

### How do I use it

See the [getting started guide](./getting-started/installing.md).

The command line documentation can be found [here](./commands/commands.md).

### Is DPM integrated into the Delphi IDE

Yes, IDE integration is provided in the installer for all supported IDE versions. See [IDE Integration](./getting-started/ide-integration.md).

### Is there a central package source

Yes. The site is at [https://delphi.dev](https://delphi.dev) - it is relatively feature complete - **note** you do not need to register on this site to use packages from it - you only need to register if you want to publish packages.

Package files are stored on cloudflare R2 

### Do I have to use the public package server?

No - you can put package files in a directory and configure a dpm package source to point to that directory. Or if you are feeling adventurous you can run the package server project locally.  

### Is my old version of delphi supported

[See here](./compiler-versions.md) for supported compiler versions. All target [platforms](./platforms.md) for supported compiler versions are supported.

### What about C++ Builder or FPC

[see here](./compiler-versions.md)

### Does it support design-time components

YES, design time components are installed automatically when the package is installed or restored (during project load).

### How does it work

See [this page](./concepts/how-it-works.md)

### Known Issues

See [known issues](./getting-started/known-issues.md)

### Can I help

Yep, see [Contributing to DPM](./contributing.md).
