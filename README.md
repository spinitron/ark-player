<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

The Spinitron Ark Player is a widget you can use on a web page. It allows
visitors to play recordings of a radio webcast from Spinitron's Ark
service.

## Demo and instructions

[Combined demo and instructions](https://spinitron.github.io/ark-player/) for web page authors on how to use the widget.



## Use the widget on your web site

You can use the widget on your web site if you comply with these [Terms of Service](https://forum.spinitron.com/t/ark-terms-of-service/277). The
example page linked above has instructions.

## Access to audio files

If you run the Ark Player on a server of your own and for listeners to access archives managed by Spinitron, ask Spinitron to authorize your origin (CORS) to access the audio files.

## Using the widget as a dependency in your project

If you're using NPM then you can

```
npm install ark-player
```

and import it from there into your project.

## Developer instructions

If you intend customize or change the player, e.g. to change it style sheet
or modify its behavior, please fork this repo in Github and push your changes
to your repo. (We use MPL for this work to encourage you to give your improvments
back to the community.) Feel free to send pull requests.

We use git, Sass, and NPM. Find instructions for using those elsewhere.

Clone the git repo locally and then, in the repo dir, run `npm install`.

After making your change in the `src` directory, `npm run build` should update the files in `dist`.

## Copyright and license

All files in this repository are Copyright Spinitron LLC.

You may use, modify, and/and redsitribute this work under conditions of the
[Mozilla Public License 2.0](https://www.mozilla.org/en-US/MPL/).
