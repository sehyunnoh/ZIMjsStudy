/// <reference path="./typings/zim/index.d.ts" />

// This version uses the zim namespace - if concerned about conflicting with other libraries
// IMPORTANT - the zim_ns.html file has the zns variable set to true so ZIM will not make its members global
// The ZIM Wrap module of short global functions is still in place - zog(), zid)(), etc.
// TypeScript will still allow global types unless you delete the GLOBALS section in the index.d.ts
// To remove the GLOBALS do the following in the zim/index.d.ts file:
// 1. delete from // GLOBALS to // END GLOBALS - note, leave the ZIM Wrap module of global functions
// 2. change references of Stage and Container to zim.Stage and zim.Container
// Now TypeScript will enforce the zim namespace (aside from the Wrap module)
var scaling:string = "fit"; // fit scales to fit the browser window while keeping the aspect ratio
var width:number = 1024; // can go higher...
var height:number = 768;
var frame:zim.Frame = new zim.Frame(scaling, width, height); // see docs for more options and info
frame.on("ready", function() {
	zog("ready from ZIM Frame");

	var stage:zim.Stage = frame.stage;
	var stageW:number = frame.width;
	var stageH:number = frame.height;
	frame.color = frame.blue;
	frame.outerColor = frame.dark;

	// put your code here (you can delete this code)

	var button:zim.Button = new zim.Button(140, 60, "ZIM");
	button.center(stage); // this adds to stage as well otherwise stage.addChild(button);
	button.on("click", function() { // on() is like addEventListener()
		zgo("http://zimjs.com/frame.html"); // or relative URL, target is available too
	});

	stage.update(); // update the stage to see any changes

}); // end of ready

