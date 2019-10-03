/// <reference path="./typings/zim/index.d.ts" />

// This version uses globals - good for stand-alone ZIM / CreateJS

var scaling:string = "fit"; // fit scales to fit the browser window while keeping the aspect ratio
var width:number = 1024; // can go higher...
var height:number = 768;
var color:string = green;
var outerColor:string = dark;
var frame:Frame = new Frame(scaling, width, height, color, outerColor); // see docs for more options and info
frame.on("ready", function() {
	zog("ready from ZIM Frame");

	var stage:Stage = frame.stage;
	var stageW:number = frame.width;
	var stageH:number = frame.height;

	// put your code here (you can delete this code)

	STYLE = {
		type:{
			Button:{
				center:true,
				width:140,
				height:60,
				label:"ZIM",
				backgroundColor:pink,
				rollBackgroundColor:blue,
				animate:{props:{alpha:0}, from:true}
			}
		}
	}

	var button:Button = new Button().pos(stageW/2, stageH/2);

	// Or the traditional chaining way below:
	// var button:Button = new Button(140, 60, "ZIM")
	// 	.animate({props:{alpha:0}, from:true})
	// 	.center();

	button.on("click", function() { // on() is like addEventListener()
		zgo("http://zimjs.com/frame.html"); // or relative URL, target is available too
	});

	stage.update(); // update the stage to see any changes

}); // end of ready

