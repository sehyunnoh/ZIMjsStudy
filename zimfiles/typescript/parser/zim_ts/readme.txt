ZIM (http://zimjs.com) TypeScript Typings

TypeScript lets you specify types (string, number, etc.) in JavaScript
http://www.typescriptlang.org

In this ZIP, the typings folder holds ZIMjs and CreateJS typings.
We use TypeScript with ATOM and https://atom.io/packages/atom-typescript

There are two examples of ZIM with TypeScript:

1. zim.html which calls zim.js which is made from zim.ts
This uses globals so no zim namespace - eg. var frame:Frame = new Frame();

2. zim_ns.html which calls zim_ns.js which is made from zim_ns.ts
This uses the zim namespace - eg. var frame:zim.Frame = new zim.Frame();
To make it so TypeScript enforces the namespace you need to adjust as follows:
Remove the GLOBALS from the zim/index.d.ts file:
1. delete from // GLOBALS to // END GLOBALS - note, leave the ZIM Wrap module of global functions
2. change references of Stage and Container to zim.Stage and zim.Container
Now TypeScript will enforce the zim namespace (aside from the Wrap module)

Please report any problems to https://github.com/danzen/zimjs/issues/26
or in our requests Slack Channel http://zimjs.com/slack

Dan Zen
http://danzen.com
