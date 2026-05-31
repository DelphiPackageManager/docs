# Contributing

We welcome contributions, however before submitting any changes, create an [issue on GitHub](https://github.com/DelphiPackageManager/DPM/issues) so we can discuss your ideas, bugs etc. That way we all avoid wasting effort.

We make extensive use of Spring4D for Dependency Injection and collections. Make sure you are up to speed with DI and use it where possible.

- Use an extremely defensive coding style, with useful/detailed error messages.
- Pass an ILogger in everywhere. There is one available through Dependency Injection.
- Start with high-level classes for functionality, that take an options object for the command.
- Do not use the RTL generic collections, we're using the Spring4D collections (interfaced).
- Use interfaces where possible and only expose what is needed.
- Use unit namespaces, but avoid prefixes or name-spacing of types where possible (makes for simpler renaming).
- Since we're targeting multiple compiler versions, avoid new language features or RTL features.
- Do not add/use new external libraries before checking with the team. Whilst using libraries is unavoidable, we would like to keep the dependencies as low as possible. Many of the libraries listed below were created specifically for this project.

## Building DPM

DPM is bootstrapped, so you need dpm to build it. Follow the [getting started guide](./getting-started/installing.md) first.

Use the dpm release version to get your dev environment setup. 

The dpm IDE plugin will restore the packages automatically when you load the project and you should be able to build without issue.

You should now be able to load the dpm projects - there are IDE plugin projects for XE2-13.x, the unit tests and the command line are developed with 13.1

For debugging the IDE plugin dll, set the host application to the Delphi IDE version you are using (eg. E:\Emb\Studio\37.0\bin\bds.exe) and in the parameters to -rDPMTesting

This will start an new IDE instance, with a clean registry. Do this once, then open regedit to

`HKEY_CURRENT_USER\Software\Embarcadero\DPMTesting\37.0\Experts`

and add a string value pointing to the dll you just build

eg. `I:\Github\DelphiPackageManager\DPMMaster\Output\DPM.IDE.D130.dll`

Then try debugging again - this time the new IDE instanced should load the plugin (you will see the logo on the splash screen).
