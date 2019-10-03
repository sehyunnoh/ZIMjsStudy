<!DOCTYPE html>

<html>

<head>
<meta charset="utf-8" />
</head>
<body>
<?PHP

///////// ADJUST HERE AND RUN IN BROWSER ///////////

$latest = file_get_contents('http://danzen.com/code/live/latest.txt');
$latest = trim($latest);
$data = json_decode($latest, true);
$version = $data["zim"];

$cdn = "https://zimjs.org/cdn/";
$socket = $cdn . $data["socket"] . ".js";
$game = $cdn . $data["game"] . ".js";
$physics = $cdn . $data["physics"] . ".js";
$three = $cdn . $data["three"] . ".js";
$createjs = $data["createjs"];
$box2d = $cdn . $data["box2d"] . ".js";
$threejs = $cdn . $data["threejs"] . ".js";
$socketio = $data["socketio"];
$easystar = $cdn . $data["easystar"] . ".js";
$pizzazz01 = $cdn . $data["pizzazz01"] . ".js";
$pizzazz02 = $cdn . $data["pizzazz02"] . ".js";
$pizzazz03 = $cdn . $data["pizzazz03"] . ".js";

$url = $cdn.$version.'_doc.js';
$cdnurl = $cdn.$version.'.js';
$lines = file('http://danzen.com/code/cdn/'.$version.'_doc.js'); // sometimes LOCAL
$file = 'http://danzen.com/code/docs.html';

// $bits = ["Circle","Frame","Rectangle","Triangle","outline","sca","Container","Label","Pane","Shape","centerReg","drag","expand","hitTestBounds","move","shuffle","Button","zgo","Layout","rand","animate","Waiter","center","dashedLinesOn","swapProperties","Grid","Parallax","zob","Swipe","hitTestReg","Damp","Slider","Ticker","CheckBox","RadioButtons","mobile","Tabs","place","HotSpots","Dial","Indicator","fit","Pad","hitTestGrid","async","zid","Bitmap","hitTestCircle","hitTestRect","ProportionDamp","Sprite","Window","Proportion","Pages","Scroller","setMask","ColorPicker","loop","zet","setCookie"];

$bits =["addTo","centerReg","Circle","Frame","pos","Rectangle","sca","Triangle","zog","Container","drag","expand","hitTestBounds","Label","loop","Pane","removeFrom","shuffle","Button","zgo","alp","Layout","rand","scaleTo","Shape","animate","center","Waiter","swapProperties","Grid","mov","Parallax","extend","zob","zot","Swipe","hitTestReg","Damp","reg","Slider","CheckBox","RadioButtons","setMask","mobile","Tabs","place","Dial","Indicator","fit","outline","rot","hitTestGrid","Pad","async","TextArea","Bitmap","hitTestCircle","hitTestRect","ProportionDamp","Sprite","Window","interval","zimify","Proportion","stopAnimate","Pages","distill","timeout","Scroller","ColorPicker","ske","zet"];

$videos = [
	"zik", "makeSeries", "Damp", "extend", "StageGL", "Container", "Shape", "Sprite", "Circle", "Rectangle", "Triangle", "Squiggle", "Blob", "Label", "LabelOnPath", "Button", "CheckBox", "RadioButtons", "Toggle", "Panel", "Pane", "Window", "Layer", "ProgressBar", "Waiter",
 	"Indicator", "List", "Stepper", "Slider", "Dial", "Tabs", "Pad", "ColorPicker", "Keyboard", "Organizer", "Loader", "TextArea",
	"drag", "noDrag", "dragRect", "transform", "gesture", "noGesture", "gestureRect",
	"hitTestPoint", "hitTestReg", "hitTestRect", "hitTestCircle", "hitTestCircles", "hitTestBounds",
	"animate", "stopAnimate", "pauseAnimate", "wiggle", "loop",
	"cur", "sha", "pos", "cur", "mov", "dep", "alp", "rot", "siz", "ske", "reg", "sca",
	"addTo", "center", "centerReg", "outline", "addTo", "scaleTo", "place", "setMask",
	"ANIMATE", "STYLE", "Ticker", "Accessibility", "Swipe", "Pages", "HotSpot", "HotSpots", "TransformManager", "Guide",
	"Grid", "GuideManager", "GridManager", "Layout", "LayoutManager", "Tile", "Parallax", "Scroller", "Dynamo",
	"Accelerator", "MotionController", "GamePad", "Emitter", "SoundWave", "Pen", "Portal", "VR", "Frame", "Distill",
	"parseAudioSprite", "svgToBitmap", "zimify"
];

$demo = [
	"Frame","Stage","StageGL","Container","Shape","Bitmap","Sprite","MovieClip","SVGContainer",
	"Circle", "Rectangle", "Triangle", "Squiggle", "Blob",

];


$skip = ["Coordinates", "pauseZimAnimate", "stopZimAnimate", "styleTransforms", "makeSeries"];

////////////////////////////////////////////////////

// create the docs insert from the documented code

$version2 = explode("/", $version);
$version2 = "ZIM " . $version2[0];
$output = "<div id=list></div>\nHere is a docs <a href=https://www.youtube.com/watch?v=VIUywABekCQ&list=PLCIzupgRt1pYtMlYPtNTKCtztFBeOtyc0 target=docIntro class=\"plain see\">Intro</a> video.  Use the ZIM <a href=".$cdnurl." target=cdn class=\"plain see\">CDN</a> minified file.<br>See <a href=".$url." target=code class=\"plain see\">".$version2."</a> for code, <a href=updates.html class=\"plain see\">updates</a> for changes and <a href=docs_text.php target=_blank class=\"plain see\">text</a> for full search.\n<a href=customize.html class=\"plain see\">Customize</a> docs with feature items. <a href=distill/ class=\"plain see\">Distill</a> for less code!\n\n";

$output .= "ZIM HELPER modules have docs in files (see <a href=code.html#libraries target=_blank class=\"plain see\">LIBRARIES</a> for examples)\nCode: <a href=$socket target=_blank class=\"plain see\">SOCKET</a>, <a href=$game target=_blank class=\"plain see\">GAME</a>, <a href=$physics target=_blank class=\"plain see\">PHYSICS</a>, <a href=$three target=_blank class=\"plain see\">THREE</a>, <a href=$pizzazz01 target=_blank class=\"plain see\">PIZZAZZ</a>, <a href=$pizzazz02 target=_blank class=\"plain see\">PIZZAZZ 2</a>, <a href=$pizzazz03 target=_blank class=\"plain see\">PIZZAZZ 3</a>, <a href=nio/paths.html target=_blank class=\"plain see\">PIZZAZZ 4</a>.\nZIM works with: <a href=$createjs target=_blank class=\"plain see\">CreateJS</a>, <a href=$box2d target=_blank class=\"plain see\">Box2D</a>, <a href=$threejs target=_blank class=\"plain see\">ThreeJS</a>, <a href=$socketio target=_blank class=\"plain see\">SocketIO</a> and <a href=$easystar target=_blank class=\"plain see\">EasyStar</a> libraries.\n<a href=typescript.html class=\"plain see\">TYPESCRIPT</a> definitions and <a href=npm.html class=\"plain see\">NPM</a> modules are available for ZIM.\n";

$startOutput = $output;
// want to put modules in docs in different order than modules in file
$moduleText = [];
$moduleFunctions = [];
$moduleOrder = [6,5,2,3,4,1,7,8];
$newModuleOrder = [6,3,4,5,2,1,7,8];
$output = "";
$titles = [];
$originalTitles = [];
$commands = [];
$duoCommands = [];

$count = 0; $mark = false; $continue = false; $index=0; $second=false;
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

	if (preg_match("/^END EXAMPLE/", $l)) {
		$output .= "</div>\n";
		continue;
	}

	if (preg_match("/\/\/\/\/\/\//i", $l)) {

		array_push($moduleText, $output);
		array_push($moduleFunctions, $titles);
		$output = "";
		$titles = [];

		$l = preg_replace("/\//", "",  $l);
		list($g, $section) = preg_split("/ /", trim($l));
		$section = strtolower($section);
		$output .= "\n<div id=$section class=section>".trim($l)."</div>";
	}
	$l = preg_replace("/\t/", "&nbsp;&nbsp;&nbsp;", $l);
	$l = preg_replace("/</", "&lt;", $l);

	if (preg_match("/^extends /i", $l)) {
		$l = "<span class=extends>" . $l . "</span>";
	}
	if ($markTitle) {
		if (trim($l) != "")	{
			$markTitle = false;
			$title = $l;
			array_push($titles, trim($l));
			array_push($originalTitles, trim($l));
			$l = "<span class=functionTitle>" . $l . "</span>";
		}
	}
	// PROPERTIES|EVENTS|EXAMPLE|DESCRIPTION|METHODS
	if (preg_match("/^(LEGACY|SPECIFIC METHODS|MORE|USAGE|RETURNS|ACTIONEVENT|OPTIMIZED|EXAMPLE|PROPERTIES|EVENTS|PARAMETERS|DESCRIPTION|METHODS)/", $l)) {
		if (preg_match("/^RETURNS/", $l)) {
			$a = preg_split("/ /", $l);
			$a[0] = "<span class=heading>" . $a[0] . "</span>";
			$l = join(" ", $a);
		} else {
			$l = "<span class=heading>" . $l . "</span>";
		}
	}

	if (preg_match("/^(ALSO:|NOTE:)/", $l)) {
		$a = preg_split("/ /", $l);
		$a[0] = substr($a[0],0,4);
		$a[0] = "<span class=subheading>" . $a[0] . "</span>";
		$l = join(" ", $a);
	}
	// --*///+70




	if (!$skipCheck && preg_match("/--\*\//i", $l)) {
		$continue = false;
		$added = "";
		if (in_array(trim($title), $demo)) $added .= "<a href='demo' class='view demo' onclick='return d(\"".trim($title)."\");'>DEMO<span>&#128522</span></a>";

		if (in_array(trim($title), $bits)) $added .= "<a href='bits' class='view bits' onclick='return b(\"".trim($title)."\");'>BITS <img class=b src=images/b.png /></a>";

		if (in_array(trim($title), $videos)) $added .= "<a href='vids' class='view vids' onclick='return y(\"".trim($title)."\");'>VIDS <img class=v src=images/v.png /></a>";

		$output .= "\n<a href='close' class=close2 onclick='return c($index);'>CLOSE &#x25b2;</a><a href='view' class=view onclick='return v(\"".trim($functionNum)."\", \"".trim($title)."\", \"".trim($lastLineNum)."\");'>VIEW ▤</a>$added</div>";
	}

	// subsections
	if (preg_match("/SUBSECTION (.*)/", $l, $matches)) {
		$output .= "<span class='sub'>--------------</span> <span class='".$section."Subtitle'>".$matches[1]."</span>";
	}
	$l = preg_replace("/(.*)(http[^\/]*\/\/)([^\s\n]*)(.*)/i", "$1"."<a href=$2$3 target=_blank class=links>$2$3</a>$4", $l);
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
				if (preg_match("/\)/", $l)) {
					array_push($commands, $l);
					if ($section=="display" || $section=="methods"||$section=="controls"||$section=="frame") {
						array_push($duoCommands, $l);
					}
				}
				$output .= "<a href='doc:$lineNum' class='$section' onclick='return o($index);'>EXPAND $lineNum <span class=t>&#x25b6;&#xfe0e;</span></a> ".trim($l)."\n";
				$mark = false;
				$second = true;
				$output .= "<div id=s".$index." class=info><div class='".$section."Title titleT'><div class=titleA><a href='close' class=close onclick='return c($index);'>CLOSE &#x25b2;</a></div><div class=titleD>".trim($l)."</div></div>";
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
	if (preg_match("/^<span class=heading>EXAMPLE/", $l)) {
		$output .= "<div class=example>";
	}


}

array_push($moduleText, $output);
array_push($moduleFunctions, $titles);

// prepare array of function names
$allTitles = [];
foreach ($newModuleOrder as $o) {
	foreach($moduleFunctions[$o] as $t) {
		array_push($allTitles, $t);
	}
}

$functionNames = join($allTitles, "\",\"");
$functionNames = "[\"".$functionNames."\"]";

$originalFunctionNames = join($originalTitles, "\",\"");
$originalFunctionNames = "[\"".$originalFunctionNames."\"]";

$output = $startOutput;
foreach ($newModuleOrder as $o) {
    $output .= $moduleText[$o];
}

// insert into docs
$final = "";
$docs = file($file);
$preCheck = false;
$postCheck = false;
foreach ($docs as $d) {
	if ($postCheck && (preg_match("/<a href=/i", $d))) $postCheck = false;
	if (!$preCheck && !$postCheck) $final .= $d;
	if (preg_match("/<pre>/i", $d)) {
		$preCheck = true;
		$final .= $output;
	}
	if ($preCheck && preg_match("/<\/pre>/i", $d)) {
		$preCheck = false;
		$postCheck = true;
		$final .= "</pre>\n";
		$final .= "\n<script>\nvar lookup=".$functionNames.";\nvar originalLookup=".$originalFunctionNames.";\n</script>\n\n";
	}
}

$myfile = fopen("/home/danzen/public_html/code/docs.html", "w") or die("Unable to open file!");
fwrite($myfile, $final);
fclose($myfile);

$com = "{";
foreach ($commands as $c) {
	$c = preg_replace("/obj\./", "", $c);
	$d = explode("(", $c);
	$n = $d[0];
	$d2 = explode(")", $d[1])[0];
	$arr = preg_split('/(\s*,\s*)*,+(\s*,\s*)*/', $d2);
	$good = '["' .implode('", "', array_map("trim",array_filter($arr))). '"]';
	$good = preg_replace('/\[""\]/', "[]", $good);
	$com .= $n.":".$good.", ";
}
$com = preg_replace("/,\s$/", "", $com);
$com .= "}";

$myfile = fopen("/home/danzen/public_html/code/docs_commands.html", "w") or die("Unable to open file!");
fwrite($myfile, $com);
fclose($myfile);

$com = "{";
foreach ($duoCommands as $c) {
	$c = preg_replace("/obj\./", "", $c);
	$d = explode("(", $c);
	$n = $d[0];
	$d2 = explode(")", $d[1])[0];
	$arr = preg_split('/(\s*,\s*)*,+(\s*,\s*)*/', $d2);
	$good = '["' .implode('", "', array_map("trim",array_filter($arr))). '"]';
	$good = preg_replace('/\[""\]/', "[]", $good);
	$com .= $n.":".$good.", ";
}
$com = preg_replace("/,\s$/", "", $com);
$com .= "}";

$myfile = fopen("/home/danzen/public_html/code/docs_commands_duo.html", "w") or die("Unable to open file!");
fwrite($myfile, $com);
fclose($myfile);

$com = "";
foreach ($commands as $c) {
	$c = preg_replace("/obj\./", "", $c);
	$d = explode("(", $c);
	$n = $d[0];
	$d2 = explode(")", $d[1])[0];
	$arr = preg_split('/(\s*,\s*)*,+(\s*,\s*)*/', $d2);
	$good = '["' .implode('", "', array_map("trim",array_filter($arr))). '"]';
	$good = preg_replace('/\[""\]/', "[]", $good);
	$com .= "zim.".$n."();\n";
}

$myfile = fopen("/home/danzen/public_html/code/docs_call.html", "w") or die("Unable to open file!");
fwrite($myfile, $com);
fclose($myfile);

echo "done!";


?>

</body></html>
