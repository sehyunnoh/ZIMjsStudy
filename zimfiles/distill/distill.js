
// NODEJS SETUP

var express = require("express");
var app = express();
app.use(express.static(__dirname + '/public'));
// npm install --save body-parser
var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
var http = require("http").Server(app);
var fs = require("fs");

// HELPER FUNCTIONS

function zog(t) {
	console.log(t);
}

function zot(v) {
	return v == null;
}

function shuffle(array) {
    if (array == null) return;
    var i = array.length, j, temp;
    if (i == 0) return array;
    while(--i) {
        j = Math.floor(Math.random()*(i+1));
        temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    return array;
}


app.post('/distill', function (req, res) {

    var request = require('request');
    // append the entry into a log file and analyse later offline

    if (req.body.version || !req.body.version.match(/zim/i)) {
        var version = req.body.version;
    } else {
        res.redirect('http://zimjs.com/distill/oops.html?NO_VERSION');
        return;
    }

    var add = [];
    if (req.body.add) {
        var add = req.body.add;
    }
    if (add.join) add = add.join(" ");
    add = add.replace(/>>\s?/g, "");
    var code = req.body.code + " " + add;
    code = code.trim();
    code = code.replace(/\s{2,}/g," ");
    if (!code || code == "") {
        res.redirect('http://zimjs.com/distill/oops.html?NO_INPUT');
        return;
    }
    var log = req.body.company + "|" + req.body.appname + "|" + code + "\n";
    fs.appendFile("distillData/distillery.txt", log, function (err) {});

    request.get(version, function (err, response, body) {
    // request.get('https://d309knd7es5f10.cloudfront.net/zim3.js', function (err, response, body) {
        if (!err && response.statusCode == 200) {

            function enterZim() {
                return 'var zim = function(zim) {\n';
            }
            function exitZim() {
                return 'return zim;} (zim || {});\n';
            }
            var c = code.split(" "); // this is the numbers for the functions in zim
            function uniq(a) {
                var seen = {};
                return a.filter(function(item) {
                    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
                });
            }
            function sortNumber(a,b) {
                return Number(a) - Number(b);
            }
            c = uniq(c).sort(sortNumber); // make them unique and sort them

            // check for dependencies (assuming no recursion)
            // dependencies are only for functions that can run without a function
            // but call the function in other cases - like Ticker not always needing Dictionary
            // because then Dictionary will not show up in Distill, etc.
            var dependencies = JSON.parse(req.body.dependencies);
            // {f12:[22, 33], f16:[1]}
            var num;
            var add = [];
            var zCheck = false; // include zimify
            for (var i=0; i<c.length; i++) {
                num = c[i];
                if (num >= 50) zCheck = true;
                if (dependencies["f"+num]) add = add.concat(dependencies["f"+num]);
            }
            if (zCheck) c.push(83.3);
            c = c.concat(add);
            c = uniq(c).sort(sortNumber); // filter again

            // loop through all the numbers and pull out the functions
            // start with required global settings and functions
            var output = 'var zimDefaultFrame; var zog = console.log.bind(console); if (typeof zon === "undefined") zon = false; if (typeof zns == "undefined") zns = false; function zot(v) {return v==null;}';
            var exp, rx, match, m;
            var modCheck = false;
            var buildCheck = false;
            var zenableCheck = false;
            var zimifyCheck = false;
            for (i=0; i<c.length; i++) {
            	num = c[i];
                if (num >= 7.6 && !modCheck) {
                    modCheck = true;
                    // now that we are past global functions add zob as all zim module functions check it
                    // output += 'function isDUO(a) {return a.length == 1 && a[0].constructor === {}.constructor;}\n';
                    // output += 'function zob(func, args, sig, scope) {\n';
                    // output += '	if (args.length == 1 && args[0].constructor === {}.constructor) {\n';
                    // output += '		var zp = args[0];\n';
                    // output += '		var za = (zot(sig))?func.toString().split(/\\n/,1)[0].match(/\\((.*)\\)/)[1].replace(/\\s+/g,"").split(","):sig.replace(/\\s+/g,"").split(",");\n';
                    // output += '		var zv = []; var zi; var zt;\n';
                    // output += '		for (zi=0; zi<za.length; zi++) {zt=za[zi].split("=")[0]; za[zi]=zt; zv.push(zp[zt]);}\n';
                    // output += '		for (zi in zp) {if (za.indexOf(zi)<0) {if (zon) zog(func,"bad argument "+zi);}};\n';
                    // output += '		var zr; if (zr=(func.prototype.isPrototypeOf(scope))?new (func.bind.apply(func,[null].concat(zv)))():func.apply(null,zv)) {return zr;} else {return true;}\n';
                    // output += '	}\n';
                    // output += '}\n';

                    output += 'function isDUO(a) {return a.length == 1 && a[0] != undefined && a[0].constructor === {}.constructor;}\n';
                    output += 'function zob(func, args, sig, scope) {\n';
                    output += '	var zimon = (zim && (zim.ZIMONON || window.ZIMONON));\n';
                    output += '	if (isDUO(args)) {\n';
                    output += '		var zp = args[0];\n';
                    output += '		var za = (zot(sig))?func.toString().split(/\\n/,1)[0].match(/\\((.*)\\)/)[1].replace(/\\s+/g,"").split(","):sig.replace(/\\s+/g,"").split(",");\n';
                    output += '		var zv = []; var zi; var zt;\n';
                    output += '		for (zi=0; zi<za.length; zi++) {zt=za[zi].split("=")[0]; za[zi]=zt; zv.push(zp[zt]);}\n';
                    output += '		for (zi in zp) {if (za.indexOf(zi)<0) {if (zon) zog(func,"bad argument "+zi);}};\n';
                    output += '		var zr; if (zr=(func.prototype.isPrototypeOf(scope))?new (func.bind.apply(func,[null].concat(zv)))():func.apply(null,zv)) {if (zimon && !zr.arguments) {zr.arguments = [zp]}; return zr;} else {return true;}\n';
                    output += '	} else {\n';
                    output += '		if (zimon && scope && args && zot(scope.arguments)) {\n';
                    output += '			scope.arguments = Array.prototype.slice.call(args);\n';
                    output += '		}\n';
                    output += '	}\n';
                    output += '}\n';

                    output += 'if (!zns) {var orange="#f58e25"; var green="#acd241"; var pink="#e472c4"; var blue="#50c4b7"; var brown="#d1a170"; var yellow="#ebcb35"; var purple="#993399"; var red="#fb4758"; var silver="#999999"; var tin="#777777"; var grey="#555555"; var gray="#555555"; var lighter="#eeeeee"; var moon = "#dddddd"; var light="#cccccc"; var dark="#333333"; var darker="#111111"; var black="#000000"; var white="#ffffff"; var clear="rgba(0,0,0,0)"; var faint="rgba(0,0,0,.01)";}\n';
                    output += 'if (!zns) {var ANIMATE=true; var OPTIMIZE=false; var ACTIONEVENT="mousedown"; var POSREG=true; var DRAGALL=true;}\n';
                    // add module pattern
                    output += enterZim();
                    // add constants and any required zim module functions
                    output += 'zim.orange="#f58e25"; zim.green="#acd241"; zim.pink="#e472c4"; zim.blue="#50c4b7"; zim.brown="#d1a170"; zim.yellow="#ebcb35"; zim.purple="#993399"; zim.red="#fb4758"; zim.silver="#999999"; zim.tin="#777777"; zim.grey="#555555"; zim.gray="#555555"; zim.lighter="#eeeeee"; zim.moon="#dddddd"; zim.light="#cccccc"; zim.dark="#333333"; zim.darker="#111111"; zim.black="#000000"; zim.white="#ffffff"; zim.clear="rgba(0,0,0,0)"; zim.faint="rgba(0,0,0,.01)";\n';
                    output += 'zim.ANIMATE = true; zim.OPTIMIZE = false; zim.ACTIONEVENT = "mousedown"; zim.POSREG = false; zim.DRAGALL = false;\n';
                    output += 'zim.distill = function(){zog("zim.Distill() - done - you can remove command")};\n';
                    // add internal global functions
                    output += 'function zenable(t,v) {if (v) {t.mouseChildren = true;t.mouseEnabled = true;t._enabled = true;} else {t.mouseChildren = false;t.mouseEnabled = false;t._enabled = false;}}\n';

                }
                if (num == 7) continue; // don't add zob again (still use num to record zob usage)
                if (num >= 50 && !buildCheck) { // add extends function used by all Build module code
                    buildCheck = true;
                    zimifyCheck = true;
                    getNum("50.35");
                }

                // these two are global functions
                if (num == "83.3") {
                    output += exitZim();
                    getNum("83.3");
                    if (c.indexOf("83.35") == -1) output += enterZim();
                    zimifyCheck = true;
                    continue;
                }
                if (num == "83.35") {
                    if (!zimifyCheck) output += exitZim();
                    getNum("83.35");
                    output += enterZim();
                    continue;
                }

                getNum(String(num));

            }

            // outside loop

            function getNum(theNum) {
                exp = "\\/\\/\\+"+theNum+"[\r\n]([^]*?)\\/\\/-"+theNum+"[\r\n]";
                rx = new RegExp(exp);
                match = body.match(rx);
                if (!match) {
                    zog("broken " + theNum);
                } else {
                    var m = match[1];
                    m = m.replace(/^.*z_d.*\r?\n?/mg, "");
                    output += m+"\n";
                }
            }

            if (num >= 7.6) {
                // end module pattern
                output += 'return zim;} (zim || {});\nif (!window.zns && window.zimplify) zimplify();';
            }


            // minify seems to need a file (sigh)
            var filename = "z"+(shuffle([2,3,4,5,6,7,8,9,"i","m"]).join("")) + ".js";
            fs.appendFile("distillRaw/"+filename, output, function (err) {
                var compressor = require('node-minify');
                // Using Google Closure
                new compressor.minify({
                    // type: 'gcc',
                    type: 'yui-js',
                    // type: 'uglifyjs',
                    // compilation_level: "SIMPLE_OPTIMIZATIONS",
                    // warning_level:'VERBOSE',

                    fileIn: "distillRaw/"+filename,
                    fileOut: "distillRaw/z"+filename,
                    callback: function(err, min){
                        // delete the files once done
                        if (err) {
                            var e = err
                            fs.unlink("distillRaw/"+filename, function(err) {
                                fs.unlink("distillRaw/z"+filename, function(err) {
                                    // res.redirect('http://zimjs.com/distill/oops.html?PARSE_PROBLEMS' + e);
                                    res.send("<body style='margin:0px auto; width:800px; padding:20px; background-color:#222;'><a href='http://zimjs.com/distill/' style='outline:0px;'><img src='http://zimjs.com/tri/distill_s.jpg' /></a><br><textarea autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' style='background-color:#ccc; color:#333; width:100%; height:600px; padding:20px; font-size:16px;'>"+e+"</textarea><p style='text-align:center;'><a href='http://zimjs.com' target='_blank' style='outline:0px;'><img src='http://zimjs.com/images/footerLogo.png' /></a></p></body>");
                                });
                            });
                            return;
                        }
                        fs.unlink("distillRaw/"+filename, function(err) {
                            fs.unlink("distillRaw/z"+filename, function(err) {
                                // var percent = min.length / output.length;
                                // send the minified code back to the user
                                if (!min) {
                                    res.redirect('http://zimjs.com/distill/oops.html?FILE_PROBLEMS');
                                    return;
                                };
                                var k = Math.round(min.length / 1024 * 10) / 10;
                                var k2 = Math.round(output.length / 1024 * 10) / 10;
                                min = min.replace(/\&/g, "&amp;");
                                res.send("<body style='margin:0px auto; width:800px; padding:20px; background-color:#222;'><a href='http://zimjs.com/distill/' style='outline:0px;'><img src='http://zimjs.com/tri/distill_s.jpg' /></a><br><textarea id='min' autocomplete='off' autofocus autocorrect='off' autocapitalize='off' spellcheck='false' style='background-color:#ccc; color:#333; width:100%; height:600px; padding:20px; font-size:16px;'>// ZIMjs - http://zimjs.com - DISTILLED ("+k+" KB)\n// for "+req.body.appname+" by "+req.body.company+"\n"+min+"</textarea><br><br><span style='color:#999; font-family:verdana'>DISTILLED NON-MINIFIED REFERENCE</span><br><br><textarea autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' style='background-color:#ccc; color:#333; width:100%; height:600px; padding:20px; font-size:16px;'>// ZIMjs - http://zimjs.com - DISTILLED NON-MINIFIED ("+k2+" KB)\n// for "+req.body.appname+" by "+req.body.company+"\n"+output+"</textarea><p style='text-align:center;'><a href='http://zimjs.com' target='_blank' style='outline:0px;'><img width='90' src='http://zimjs.com/4th/icon4.png' /></a></p><script>var m=document.getElementById('min'); m.select(); setTimeout(function(){m.scrollTop=0;},100);</script></body>");
                                return;
                            });
                        });
                    }
                });
            });

        } else {
            res.redirect('http://zimjs.com/distill/oops.html?FILE_PROBLEMS');
            return;
        }
    });
});

// START THE SERVER

http.listen(3002, function() {
zog("ZIM DISTILL Server listening on port 3002");
});
