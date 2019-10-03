<?PHP
$latest = file_get_contents('http://danzen.com/code/live/latest.txt');
$latest = trim($latest);
$data = json_decode($latest, true);
$version = $data["zim"];
$lines = file('http://danzen.com/code/cdn/'.$version.'_doc.js'); // sometimes LOCAL
$id = (isset($_GET["view"])) ? $_GET["view"] : undefined;
$title = (isset($_GET["title"])) ? $_GET["title"] : "";
$lineNum = (isset($_GET["line"])) ? $_GET["line"] : "";
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">

<title>ZIM CODE VIEW - <?php echo $title; ?></title>

<link rel="shortcut icon" type="image/ico" href="favicon.ico" />

<!-- for Google -->
<meta name="description" content="ZIM DOCS - JavaScript Canvas Framework" />
<meta name="keywords" content="zimjs, createjs, learn, danzen, javascript, code, free, interactive media, html5, canvas, framework" />
<meta name="author" content="Dan Zen" />
<meta name="copyright" content="Dan Zen" />

<!-- for Facebook -->
<meta property="og:title" content="ZIM DOCS - JavaScript Canvas Framework" />
<meta property="og:type" content="website" />
<meta property="og:image" content="https://zimjs.com/code/vee/promo.jpg" />
<meta property="og:url" content="https://zimjs.com/code/index.html" />
<meta property="og:description" content="ZIM - Welcome to the modern world of coding!  A great place to learn and make professional apps, games, puzzles and sites!" />

<!-- for Twitter -->
<meta name="twitter:card" content="summary" /> <!-- do not edit this line (must say "summary") -->
<meta name="twitter:title" content="ZIM DOCS - JavaScript Canvas Framework" />
<meta name="twitter:description" content="ZIM - learn and use modern, simple and professional #Code for #Canvas with #JavaScript and #ZimJS" />
<meta name="twitter:image" content="https://zimjs.com/code/vee/promo.jpg" />

<!-- for Apple -->
<meta name="viewport" content="width=device-width, initial-scale=.5, user-scalable=yes, minimal-ui" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

<!-- icons -->
<link rel="apple-touch-icon-precomposed" sizes="57x57" href="https://zimjs.com/code/icons/apple-touch-icon-57x57.png" />
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="https://zimjs.com/code/icons/apple-touch-icon-114x114.png" />
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="https://zimjs.com/code/icons/apple-touch-icon-72x72.png" />
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="https://zimjs.com/code/icons/apple-touch-icon-144x144.png" />
<link rel="apple-touch-icon-precomposed" sizes="60x60" href="https://zimjs.com/code/icons/apple-touch-icon-60x60.png" />
<link rel="apple-touch-icon-precomposed" sizes="120x120" href="https://zimjs.com/code/icons/apple-touch-icon-120x120.png" />
<link rel="apple-touch-icon-precomposed" sizes="76x76" href="https://zimjs.com/code/icons/apple-touch-icon-76x76.png" />
<link rel="apple-touch-icon-precomposed" sizes="152x152" href="https://zimjs.com/code/icons/apple-touch-icon-152x152.png" />
<link rel="icon" type="image/png" href="https://zimjs.com/code/icons/favicon-196x196.png" sizes="196x196" />
<link rel="icon" type="image/png" href="https://zimjs.com/code/icons/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/png" href="https://zimjs.com/code/icons/favicon-32x32.png" sizes="32x32" />
<link rel="icon" type="image/png" href="https://zimjs.com/code/icons/favicon-16x16.png" sizes="16x16" />
<link rel="icon" type="image/png" href="https://zimjs.com/code/icons/favicon-128.png" sizes="128x128" />
<meta name="application-name" content="ZIM"/>
<meta name="msapplication-TileColor" content="#000000" />
<meta name="msapplication-TileImage" content="https://zimjs.com/code/icons/mstile-144x144.png" />
<meta name="msapplication-square70x70logo" content="https://zimjs.com/code/icons/mstile-70x70.png" />
<meta name="msapplication-square150x150logo" content="https://zimjs.com/code/icons/mstile-150x150.png" />
<meta name="msapplication-wide310x150logo" content="https://zimjs.com/code/icons/mstile-310x150.png" />
<meta name="msapplication-square310x310logo" content="https://zimjs.com/code/icons/mstile-310x310.png" />


<script src="https://d309knd7es5f10.cloudfront.net/run_prettify.js"></script>
<link href="docs2.css" rel="stylesheet" type="text/css" />
<meta name="viewport" content="width=2500">
</head>
<body>
	<p align="center" style="margin-bottom:-22px; margin-top:20px;"><img src="vee/logo_dark.png" border="0" width=120" /><p>
<div id=outer>
<pre class="prettyprint">
<?PHP

if ($id == undefined) {
	echo "not found";
} else {
	echo "<span id=ln>$lineNum</span>// " . strtoupper($title)."  \n\n";
	foreach ($lines as $l) {

		if (preg_match("/(.*)\/\/\-".$id."\s/i", $l, $matches)) {
			$l = $matches[1];
			if ($id > 7) {
				echo preg_replace("/(^\t)/", "", $l);
			} else {
				echo $l;
			}
			break;
		}
		if ($mark) {
			if (preg_match("/z_d\(/i", $l)) {
				echo "\n";
				continue;
			}
			$l = preg_replace("/</", "&lt;", $l);
			if ($id > 7) {
				echo preg_replace("/(^\t)/", "", $l);
			} else {
				echo $l;
			}
		}
		if (preg_match("/--\*\/\/\/\+([\d.]+)/i", $l, $matches)) {
			$functionNum = $matches[1];
			if ($functionNum == $id) {
				$mark = true;
			}
		}
	}
}

?>
</pre>
</div>
<p align="center" id="footer">see ZIM DOCS for more information and &copy;</p>
<p align="center" id="footer">see ZIM DISTILL to only include code that you use</p>
<p align="center" id="footer">https://zimjs.com - code creativity</p>
<script>
var r=Math.round(Math.random()*1000000);
document.write('<img src=/cgi-bin/traffic_plus?company=danzen&page=zimDocsCode&r='+r+' width=1 height=1>');
</script>
</body></html>
