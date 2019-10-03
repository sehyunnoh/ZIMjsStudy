<?PHP

$latest = file_get_contents('http://danzen.com/code/live/latest.txt');
$latest = trim($latest);
$data = json_decode($latest, true);
$version = $data["zim"];

$url = 'http://zimjs.org/cdn/'.$version.'_doc.js'; // sometimes CDN
$lines = file('http://danzen.com/code/cdn/'.$version.'_doc.js'); // sometimes LOCAL
$file = 'http://danzen.com/code/docs.html';

$bits =["addTo","centerReg","Circle","Frame","pos","Rectangle","sca","Triangle","zog","Container","drag","expand","hitTestBounds","Label","loop","Pane","removeFrom","shuffle","Button","zgo","alp","Layout","rand","scaleTo","Shape","animate","center","Waiter","swapProperties","Grid","mov","Parallax","extend","zob","zot","Swipe","hitTestReg","Damp","reg","Slider","CheckBox","RadioButtons","setMask","mobile","Tabs","place","Dial","Indicator","fit","outline","rot","hitTestGrid","Pad","async","TextArea","Bitmap","hitTestCircle","hitTestRect","ProportionDamp","Sprite","Window","interval","zimify","Proportion","stopAnimate","Pages","distill","timeout","Scroller","ColorPicker","ske","zet"];


$skip = ["pauseZimAnimate", "stopZimAnimate", "styleTransforms", "makeSeries"];

////////////////////////////////////////////////////

// create the docs insert from the documented code
?>
<pre>
ZIM DOCS

http://zimjs.com/docs.html
http://zimjs.com/updates.html
http://zimjs.com/tips.html
http://zimjs.com/bits.html

A. ABOUT ZIM
ZIM is an JavaScript Canvas Framework powered by CreateJS and adds many components, conveniences and controls for making general Interactive Media.

The ZIM site at http://zimjs.com features the following sections:

LEARN tutorials on how to start and code in ZIM
CODE ZIM Frame template and code context
DOCS the objects and commands all defined
NEWS latest features and articles
ABOUT features, applications, archives, reviews, etc.
EXAMPLES sample projects created in ZIM
GOLD BARS with online editor, sharing, tips and badges

B. ABOUT THE DOCS
The docs are divided into modules:
FRAME, DISPLAY, METHODS, CONTROLS, CODE, WRAP, META, LIBRARIES
Let's have a brief look at each...

---------------------------------
1. FRAME - the framework class that makes and scales the canvas and stage
var frame = new Frame("fit"); // defaults to full screen no scaling
frame.on("ready", function() {
    var stage = frame.stage;
    frame.loadAssets(["pic.png", "sound.mp3"]); // optional asset loading
    frame.on("complete", function() {
        var pic = frame.asset("pic.png").center(stage);
        frame.asset("sound.mp3").play();
        stage.update();
    }); // end asset loading complete
}); // end ready
also handles zim colors like frame.blue, tabs, keydown and keyup, etc.
colors are now available on the zim namespace - blue, red, yellow...

---------------------------------
3. DISPLAY - classes for objects viewed on the stage like shapes and components
var circle = new Circle(100, "red"); // also Rectangle, Triangle and Blob
var button = new Button(200, 100, "GO!");
etc. and dozens more like Label, Slider, Dial, Tabs, ColorPicker...

---------------------------------
4. METHODS - methods for the display objects above
circle.center(stage); // adds to and centers button on stage
circle.drag(); // allows the circle to be dragged and dropped
circle.animate(obj:{alpha:0}, 5000); // fades out circle over 5 seconds
etc. and dozens more - also see PRINCIPLES sections below...

---------------------------------
5. CONTROLS - classes that affect Display objects
new MotionController(stage, circle); // circle moves to mouse press
new Pages(stage, {page:home}, {page:help}); // handle pages and swiping
new Layout(stage,[{object:header},{object:content},{object:footer}]);
responsive design with many more options (like css flex table)
etc. including Parallax, Scroller, Guide, Grid, Emitter, SoundWave...

---------------------------------
5. CODE - non-Canvas code convienence functions
var array = ["red", "yellow", "green", "blue"];
var color = shuffle(array)[0]; // shuffles array and picks first color
var color = array[rand(array.length-1)]; // gets random element
etc. many more including browser functions and asynchronus calls

---------------------------------
6. WRAP - a dozen three-letter global functions starting with z
zog("hello world"); // short for console.log();
zid("tagID"); // short for document.getElementById();
etc. including selectors similar to $() in jQuery

---------------------------------
7. META - a few classes and functions operating on zim
DISTILL = true;
distill(); // writes to console all the commands used to reduce code
zimify(createjsObj); // adds zim Methods to native createjs display objects
wonder.count("wow"); // once set up records different types of stats

---------------------------------
8. LIBRARIES - other ZIM helper modules found here:
http://zimjs.com/code.html#libraries
Including: SOCKET, GAME, PHYSICS, THREE, PIZZAZZ 1, 2 and 3 modules
The docs for these are found at the top of the code for each module

C. THE DOCS
<?PHP


$titles = [];
$count = 0; $mark = false; $continue = false; $index=0; $second=false;
$moduleCount = 1;
// want to put modules in docs in different order than modules in file
$moduleText = [];
$moduleOrder = [6,5,2,3,4,1,7];
$newModuleOrder = [6,3,4,5,2,1,7];
$output = "";
foreach ($lines as $l) {
	$count++;
	if ($count < 10) {
		$lineNum = "0000".$count;
	} else if ($count < 100) {
		$lineNum = "000".$count;
	} else if ($count < 1000) {
		$lineNum = "00".$count;
	} else if ($count < 10000) {
		$lineNum = "0".$count;
	}  else {
		$lineNum = $count;
	}

	if (preg_match("/--\*\/\/\/\+([\d.]+)/i", $l, $matches)) {
	    $functionNum = $matches[1];
	}

	// for ZIM 4.6.0 uncomment this - and remove pre zim 4th methods examples
	// $l = preg_replace("/zim\./", "",  $l);

	if (preg_match("/^END EXAMPLE/", $l)) {
		// $output .= "</div>\n";
		continue;
	}

	if (preg_match("/\/\/\/\/\/\//i", $l)) {
        array_push($moduleText, $output);
        $output = "";
		$l = preg_replace("/\//", "",  $l);
		$output .= "\n------------------------------------\nMODULE ".$moduleOrder[$moduleCount-1].": ".trim($l)."\n------------------------------------\n\n";
		$moduleCount++;
		list($g, $section) = preg_split("/ /", trim($l));
		$section = strtolower($section);
	}
	$l = preg_replace("/\t/", "&nbsp;&nbsp;&nbsp;", $l);
	$l = preg_replace("/</", "&lt;", $l);

	if (preg_match("/^extends /i", $l)) {
		$l = "<span class=extends>" . $l . "</span>";
	}
	if ($markTitle) {
		if (trim($l) != "")	{
			$markTitle = false;
			// continue;
			$title = $l;
			array_push($titles, trim($l));
			// $l = $l . "</span>";
		}
	}
	// PROPERTIES|EVENTS|EXAMPLE|DESCRIPTION|METHODS
	// if (preg_match("/^(LEGACY|SPECIFIC METHODS|USAGE|RETURNS|ACTIONEVENT|OPTIMIZED|EXAMPLE|PROPERTIES|EVENTS|PARAMETERS|DESCRIPTION|METHODS)/", $l)) {
	// 	if (preg_match("/^RETURNS/", $l)) {
	// 		$a = split(" ", $l);
	// 		$a[0] = "<span class=heading>" . $a[0] . "</span>";
	// 		$l = join(" ", $a);
	// 	} else {
	// 		$l = "<span class=heading>" . $l . "</span>";
	// 	}
	// }

	// if (preg_match("/^(ALSO:|NOTE:)/", $l)) {
	// 	$a = split(" ", $l);
	// 	$a[0] = substr($a[0],0,4);
	// 	$a[0] = "<span class=subheading>" . $a[0] . "</span>";
	// 	$l = join(" ", $a);
	// }
// --*///+70
	if (!$skipCheck && preg_match("/--\*\//i", $l)) {
		$continue = false;
		$added = "";
		if (in_array(trim($title), $bits)) $added = "\nMORE: http://zimjs.com/code/bits.html?title=".trim($title)."\n";
		$output .= "$added\n\n";
	}
	if (preg_match("/\/\*--/i", $l)) {
		$mark = true;
		$continue = true;
		$skipCheck = false;
		$index++;
	} else {
		if ($mark) {
			$okay = true;
			foreach ($skip as $sk) {
				if (preg_match("/$sk/i", $l)) {
					$okay = false;
					break;
				}
			}
			if (!$okay) {
				$continue = false;
				$mark = false;
				$skipCheck = true;
				$index--;
			} else {
				$lastLineNum = $lineNum;
				$l = preg_replace("/ = function/i", "", $l);
				$l = preg_replace("/zim\./i", "", $l);
				$output .= "************************************\n[$lineNum] ".trim($l)."\n";
				$mark = false;
				$second = true;
				$markTitle = true;
			}
		} else if ($continue) {
			if ($second) {
				$second = false;
				if (trim($l) != "")	{
					$output .= "\n";
				}
			}
			$output .= trim($l)."\n";
		}

	}
	// if (preg_match("/^<span class=heading>EXAMPLE/", $l)) {
	// 	$output .= "<div class=example>";
	// }


}

array_push($moduleText, $output);

// prepare array of function names
$functionNames = join($titles, "\",\"");
$functionNames = "[\"".$functionNames."\"]";


foreach ($newModuleOrder as $o) {
    echo $moduleText[$o];
}


?>

------------------------------------
------------------------------------

D. ZIM SUPPORT

See the ZIM Site under the CODE section for support links.

Join the ZIM Community
https://www.zimjs.com/slack

Help Dr. Abstract and Pragma reach their goals on Patreon:
https://www.patreon.com/zimjs

Give ZIM a star on GitHub:
https://github.com/danzen/zimjs

Subscribe to the ZIM Learn YouTube Channel:
https://www.youtube.com/c/zimlearn

Like the ZIM Facebook Page:
https://www.facebook.com/zimjs

And follow on Twitter:
https://twitter.com/zimlearn

Thanks for using ZIM - all the best!









</pre>
