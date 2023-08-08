# Known Issues

## Delphi Compiler Version detection

DPM uses the ProjectVersion element in the dproj file to determine the compiler version. This is unfortunately not 100% reliable for all compiler versions.

- Version 14.4 is valid for Delphi XE3 Update 2 and Delphi XE4
- Version 18.1 is valid for Delphi 10.0 Update 1 and Delphi 10.1
- Version 18.2 is valid for Delphi 10.1 Update 1 and Delphi 10.2

In these cases, you will see a warning about an ambiguous version. You can avoid this by specifying the -compiler option on the command line. When useing the IDE Integration this is not an issue since we will know which Delphi version we are using from the IDE environment.

## Package Reference Versions are fixed

Currently, when a package is installed in a project, a PackageReference is added to the dproj with the exact version that was installed. In theory (and this is true for nuget), the version should be able to float, for example you should be able to specify a [Version Range](../concepts/version-range.md) and the package restore would resolve the highest compatible version (taking into account other dependencies). This could result in more successful package installs as there are more versions to chose from

We chose not to implement floating versions (ie a version range) at this time. However, it is something we'll consider for the future.
