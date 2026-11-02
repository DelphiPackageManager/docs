# Publishing on delphi.dev TLDR


1) Sign up on https://delphi.dev
2) Enable 2fa (only needed if you don't use a social login).
3) Optionally - create an Organisation (profile menu, manage organisations). This is useful if you want multiple users/authors to be able to publish under the same name. Note the org needs a separate email address - can use plus addressing with most mail servers these days - e.g name+dpmorg@somwhere.com
4) Create an API Key, set the package owner to the organisation (if you created one).
5) Use the DSpecCreator tool installed with the client. Open the dspec file. If you want to sign your packages, switch to the Sign tab and configure it. Switch to the Pack tab, set the output folder (anywhere on a local drive), click on Pack.
6) Switch to the Test tab and test that the packages compile on the versions of delphi you have installed. Fix any failures and repeat the process until it tests ok.
7) Switch to the Upload tab, enter your API Key, click on upload.
8) Uploaded packages can take a few minutes to appear on the site (they are verified/scanned etc first).