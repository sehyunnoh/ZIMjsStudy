// Type definitions for ZIM at https://zimjs.com
// Definitions by: Dan Zen (Dr. Abstract)
// with thanks to Manthan224, Geoffrey Nwachukwu, Kenil Domadia, and a lost teacher
// Documentation : https://zimjs.com/docs.html

/// <reference path="../createjs-lib/index.d.ts" />
/// <reference path="../easeljs/index.d.ts" />
/// <reference path="../preloadjs/index.d.ts" />
/// <reference path="../soundjs/index.d.ts" />
/// <reference path="../tweenjs/index.d.ts" />

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// INSTRUCTIONS
// Use index.d.ts provides TypeScript typings for ZIM.
// FYI - these are created by parser
// 1500 lines of unique definitions are parsed to create this file of 4000 lines.
// The ZIM Typings need the CreateJS typings as seen above.
// To use the ZIM Typings in a TypeScript file use the reference:
// /// <reference path="./typings/zim/index.d.ts" />
// This would be if the TypeScript file is in the same folder as the typings folder
// You may need another path depending on the position of the file.

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// FIXES
// If you have any issues using the typing please contact us on GitHub
// https://github.com/danzen/zimjs/issues/26
// Or join our Slack team and post in the requests channel:
// http://zimjs.com/slack/

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// PARSING RULES (internal - used by parser.html)
// 1. the comment // IMPLEMENTS nameOfInterface above a class adds the "implements nameOfInterface" on the class definition
// and adds the interface elements to the class under the constructor with start and end of interface marked
// 2. ZIM DUO - any function starting with config_or_ gets an override method with {around original params} and config_or_ removed from param in {}
// we leave the config_or_ in front of the non-override first parameter so the user sees the option to use the configuration object
// as soon as the user types a {} then TypeScript tips the config object settings
// 3. All code from GLOBALS to END GLOBALS gets copied to and exported from the zim namespace declaration
// There are a few classes with names that conflict with the global scope that only available through the namespace
// these are positioned at the start of the namespace declaration and are not overwritten by the parser
// NOTE: references to the zim namespace in the global code will be broken until the PARSER copies code to the zim namespace

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// TYPES AND INTERFACES
// A ZIM VEE expression can be evaluated in the receiving function with zik (pick) to delay random selection
// See http://zimjs.com/docs.html?item=zik
// The basic parameter type should be used first then | zimVee to get the zik options
// Example: interval(time:number|zimVee, function:Function, etc.)
type zimVee = {}|Function|any[]
// So, any time we see {}|Function|[any] in the code hints (probably after a number, boolean or string) it means ZIM VEE
// Below is the full type but it complicates the code tips too much:
// type zimVee = {min?:number, max?:number, integer?:boolean, negative?:boolean, noZick?:[any]|Function}|Function|[any]

// ZIM DISPLAY OBJECTS
// All ZIM Display Objects extend from a DisplayObject at some point through inheritance
// There is no zim.DisplayObject but when we use the term we are referring to:
// zim.Container, zim.Bitmap, zim.Shape, zim.Sprite and zim.MovieClip at the top level
// and then all the objects that extend from the zim.Container:
// such as the ZIM Shapes (Rectangle, Circle, Triangle, Squiggle, Blob)
// and all the ZIM Components (Label, Button, CheckBox, RadioButton, etc.)
// In many places we want the value to be typed as a DisplayObject
// but if we hint a DisplayObject then that might mislead people to thinking it can't be a ZIM Display Object
// so this interface will provide a more generic name to handle both CreateJS and ZIM Display Objects
interface DisplayObject extends createjs.DisplayObject {}

// ZIM 4TH Display members set all of the original ZIM functions as methods on the ZIM Display objects
// ZIM also adds width, height, widthOnly, heightOnly, depth and blendMode properties to all as well as a read only type property
interface zimDisplay {
    // ZIM Display Interface
    // ZIM 4TH Methods
    tap(call:Function, distance?:number, time?:number, once?:Boolean):this
    noTap():this
    drag(config_or_boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, overCursor?:string, dragCursor?:string, all?:boolean, swipe?:boolean, localBounds?:boolean, onTop?:boolean, surround?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:boolean, reg?:boolean, removeTweens?:boolean, startBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, currentTarget?:boolean):this
    drag(config:{boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, overCursor?:string, dragCursor?:string, all?:boolean, swipe?:boolean, localBounds?:boolean, onTop?:boolean, surround?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:boolean, reg?:boolean, removeTweens?:boolean, startBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, currentTarget?:boolean}):this
    noDrag():this
    dragBoundary(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    dragRect(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    transform(config_or_move?:boolean, stretchX?:boolean, stretchY?:boolean, scale?:boolean, rotate?:boolean, allowToggle?:boolean, visible?:boolean, onTop?:boolean, showStretch?:boolean, showRotate?:boolean, showScale?:boolean, showReg?:boolean, showBorder?:boolean, borderColor?:string, borderWidth?:number, dashed?:boolean, customCursors?:boolean, handleSize?:number, regSize?:number, snapDistance?:number, snapRotation?:number, cache?:boolean, events?:boolean, ghostColor?:string, ghostWidth?:number, ghostDashed?:boolean, ghostHidden?:boolean):this
    transform(config:{move?:boolean, stretchX?:boolean, stretchY?:boolean, scale?:boolean, rotate?:boolean, allowToggle?:boolean, visible?:boolean, onTop?:boolean, showStretch?:boolean, showRotate?:boolean, showScale?:boolean, showReg?:boolean, showBorder?:boolean, borderColor?:string, borderWidth?:number, dashed?:boolean, customCursors?:boolean, handleSize?:number, regSize?:number, snapDistance?:number, snapRotation?:number, cache?:boolean, events?:boolean, ghostColor?:string, ghostWidth?:number, ghostDashed?:boolean, ghostHidden?:boolean}):this
    setSwipe(swipe?:boolean):this
    gesture(config_or_move?:boolean, scale?:boolean, rotate?:boolean, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, minScale?:number, maxScale?:number, snapRotate?:number, localBounds?:boolean, slide?:boolean, slideEffect?:number, regControl?:boolean, onTop?:boolean, surround?:boolean, circularBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    gesture(config:{move?:boolean, scale?:boolean, rotate?:boolean, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, minScale?:number, maxScale?:number, snapRotate?:number, localBounds?:boolean, slide?:boolean, slideEffect?:number, regControl?:boolean, onTop?:boolean, surround?:boolean, circularBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}}):this
    noGesture(config_or_move?:boolean, scale?:boolean, rotate?:boolean):this
    noGesture(config:{move?:boolean, scale?:boolean, rotate?:boolean}):this
    gestureBoundary(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, update?:boolean):this
    addPhysics(dynamic?:boolean, contract?:number, shape?:string, friction?:number, linear?:number, angular?:number, density?:number, restitution?:number, maskBits?:number, categoryBits?:number, physics?:Physics):this
    removePhysics():this
    impulse(x?:number, y?:number, targetX?:number, targetY?:number):this
    force(x?:number, y?:number, targetX?:number, targetY?:number):this
    torque(amount?:number):this
    sleep():this
    wake():this
    follow(damp?:number, dampY?:number, leftOffset?:number, rightOffset?:number, upOffset?:number, downOffset?:number, offsetDamp?:number, offsetDampY?:number, horizontal?:boolean, vertical?:boolean, borderLock?:boolean, borderOriginal?:boolean):this
    control(type?:string, speed?:number, speedY?:number, horizontal?:boolean, vertical?:boolean):this
    noControl():this
    contact(call:Function):this
    contactEnd(call:Function):this
    noContact():this
    noContactEnd():this
    hitTestPoint(x:number, y:number, boundsCheck?:boolean):boolean
    hitTestReg(other:DisplayObject):boolean
    hitTestRect(other:DisplayObject, num?:number, boundsCheck?:boolean):boolean
    hitTestCircle(other:DisplayObject, num?:number, boundsCheck?:boolean):boolean
    hitTestCircles(other:DisplayObject, margin?:number):boolean
    hitTestBounds(other:DisplayObject, margin?:number, boundsShape?:boolean):boolean
    boundsToGlobal(rect:createjs.Rectangle|{x:number,y:number,width:number,height:number}, flip?:boolean):createjs.Rectangle
    resetBounds(width_or_boundsX?:number, height_or_boundsY?:number, width?:number, height?:number):this
    hitTestPath(other:DisplayObject, num?:number, showPoints?:boolean):boolean
    hitTestGrid(width?:number, height?:number, cols?:number, rows?:number, x?:number, y?:number, offsetX?:number, offsetY?:number, spacingX?:number, spacingY?:number, local?:boolean, type?:string):any
    animate(config_or_props:{}|[{}], time?:number|zimVee, ease?:string|zimVee, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, sequence?:number, sequenceCall?:Function, sequenceParams?:any, sequenceReverse?:boolean|zimVee, ticker?:boolean, cjsProps?:{}, css?:boolean, protect?:boolean, override?:boolean, from?:boolean|zimVee, set?:{}|zimVee, id?:string, events?:boolean, sequenceTarget?:any, dynamic?:boolean, drag?:boolean, clamp?:boolean, startPaused?:boolean, clean?:boolean, obj?:{}|[{}]):this
    animate(config:{props:{}|[{}], time?:number|zimVee, ease?:string|zimVee, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, sequence?:number, sequenceCall?:Function, sequenceParams?:any, sequenceReverse?:boolean|zimVee, ticker?:boolean, cjsProps?:{}, css?:boolean, protect?:boolean, override?:boolean, from?:boolean|zimVee, set?:{}|zimVee, id?:string, events?:boolean, sequenceTarget?:any, dynamic?:boolean, drag?:boolean, clamp?:boolean, startPaused?:boolean, clean?:boolean, obj?:{}|[{}]}):this
    stopAnimate(ids?:string|[string]):this
    pauseAnimate(state?:boolean, ids?:string|[string]):this
    wiggle(config_or_property:string, baseAmount:number|zimVee, minAmount?:number|zimVee, maxAmount?:number|zimVee, minTime?:number|zimVee, maxTime?:number|zimVee, totalTime?:number, type?:string, ease?:string, integer?:boolean, id?:string, startType?:string):this
    wiggle(config:{property:string, baseAmount:number|zimVee, minAmount?:number|zimVee, maxAmount?:number|zimVee, minTime?:number|zimVee, maxTime?:number|zimVee, totalTime?:number, type?:string, ease?:string, integer?:boolean, id?:string, startType?:string}):this
    copyMatrix(source:DisplayObject):this
    cur(type?:string):this
    sha(color_or_shadow?:string|createjs.Shadow, offsetX?:number, offsetY?:number, blur?:number):this
    pos(x?:number, y?:number, right?:boolean, bottom?:boolean, container?:Container|Stage, index?:number, add?:boolean, reg?:boolean, regX?:boolean, regY?:boolean):this
    loc(target_or_x?:{}|DisplayObject|Point|number, y?:number, container?:Container|Stage, index?:number, add?:boolean, localToLocal?:boolean, x?:number):this
    mov(x:number, y?:number):this
    top():this
    bot():this
    ord(num:number):this
    dep(depth:number):this
    alp(alpha:number):this
    hov(value?:any, prop?:string):this
    rot(rotation:number):this
    siz(width:number, height?:number, only?:boolean):this
    ske(skewx:number, skewY?:number):this
    reg(regx:number, regY?:number, still?:boolean):this
    sca(scale:number, scaleY?:number):this
    scaleTo(boundObj?:DisplayObject, percentX?:number, percentY?:number, type?:string, boundsOnly?:boolean):this
    fit(left?:number, top?:number, width?:number, height?:number, inside?:boolean):{}
    outline(color?:string, size?:number):this
    addTo(container?:Container|Stage, index?:number, localToLocal?:boolean):this
    removeFrom(container?:Container|Stage):this
    added(call:Function, interval?:number, maxTime?:number):string
    centerReg(container?:Container|Stage, index?:number, add?:boolean):this
    center(container?:Container|Stage, index?:number, add?:boolean):this
    place(id?:string):this
    placeReg(id?:string):this
    expand(padding?:number, paddingVertical?:number):this
    setMask(mask:DisplayObject, dynamic?:boolean):this
    toggle(state?:boolean):this
    outlineToggle(state?:boolean):this
    // animate adds these:
    endTween():this
    resetTween():this
    replayTween():this
    // ZIM 4TH Properties
    readonly type:string
    width:number
    height:number
    widthOnly:number
    heightOnly:number
    depth:number
    percentSpeed:number
    percentComplete:number
    blendMode:string
    readonly paused:boolean
    readonly toggled:boolean
    readonly outlineToggled:boolean
    group:string
    dynamic:boolean
    // END ZIM Display Interface
}

interface zimShape {
    // ZIM Shape Interface
    readonly shape:Shape
    color:string
    colorRange:number
    readonly colorCommand:createjs.Graphics.Fill
    borderColor:string
    readonly borderColorCommand:createjs.Graphics.Stroke
    borderWidth:number
    readonly borderDashedCommand:createjs.Graphics.StrokeDash
    setColorRange(color1?:string, color2?:string):this
    linearGradient(colors:[any], ratios:[any], x0:number, y0:number, x1:number, y1:number):this
    radialGradient(colors:[any], ratios:[any], x0:number, y0:number, radius0:number, x1:number, y1:number, radius1:number):this
    // END ZIM Shape Interface
}

interface zimComponent {
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
}

// ZIM CODE
// The wrap module contains global functions
// These were always global and are not available in the zim namespace
// The PARSER will not add these functions to the namespace

// ++++++++++++++++++++++++++++++++++++++
// ZIM WRAP - global functions
declare function zog(item1, ...item2):string
declare function zid(id:string):HTMLElement
declare function zss(id:string):CSSStyleDeclaration
declare function zgo(url:string, target?:string, width?:number, height?:number, fullscreen?:boolean, modal?:boolean)
declare function zum(string:string):number
declare function zot(value:any):boolean
declare function zop(e):void
declare function zil():[Function]
declare function zet(selector:string):{}
declare function zob(func:Function, args:any, sig:string, scope:Function):boolean
declare function zik(arg: any):any
declare function zta(item: any):any

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// OVERVIEW OF MODULES AND NAMESPACE
// ZIM did use modules and the zim namespace
// In ZIM TRI (3) the modules were discontinued as we moved to ZIM Distill https://wp.me/p6Nuw8-82
// In ZIM SIX (6) the namespace was made optional and all was made global https://wp.me/p6Nuw8-Jg
// The types below are for both globals and the zim namespace
// If you do not want types for globals then comment out the GLOBALS section
// Also set var zns = true; in your HTML before the script call to bring in ZIM
// Note: the ZIM Wrap functions above should remain globals

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// GLOBALS
// The PARSER will copy all these globals and export them in the module

// COLORS
declare var orange:string
declare var green:string
declare var pink:string
declare var blue:string
declare var brown:string
declare var yellow:string
declare var purple:string
declare var red:string
declare var silver:string
declare var tin:string
declare var grey:string
declare var gray:string
declare var lighter:string
declare var light:string
declare var dark:string
declare var darker:string
declare var black:string
declare var white:string
declare var clear:string
declare var faint:string

// ++++++++++++++++++++++++++++++++++++++
// ZIM CODE
declare function shuffle(array:[any]):[any]
declare function rand(a?:number, b?:number, integer?:boolean, negative?:boolean):number
declare function loop(obj:number|{}|[any], call:Function, reverse?:boolean, step?:number, start?:number, end?:number):any
declare function timeout(time:number|zimVee, call:Function):{pause:Function, clear:Function, time:number, paused:boolean, done:boolean}
declare function interval(time:number|zimVee, call:Function, total?:number, immediate?:boolean):{pause:Function, clear:Function, time:number, count:number, total:number, paused:boolean, pauseTimeLeft:number}
declare function copy<T>(obj:T, clone?:boolean):T
declare function arraysEqual(a:[any], b:[any], strict?:boolean):boolean
declare function isEmpty(obj:{}):boolean
declare function isJSON(str:string):boolean
declare function merge(object1:{}, object2:{}, ...objects:{}[]):{}
declare function decimals(num:number, places?:number, addZeros?:number, addZerosBefore?:number, includeZero?:boolean, time?:boolean):number|string
declare function sign(num:number):1|0|-1
declare function constrain(num:number, min?:number, max?:number, negative?:boolean):number
declare function dist(x1:number, y1:number, x2?:number, y2?:number):number
declare function rectIntersect(a:{}|Boundary, b:{}|Boundary, margin?:number):{}
declare function boundsAroundPoints(points:[{}]):number
declare function angle(x1:number, y1:number, x2:number, y2:number):number
declare class Point {
    constructor (x:number, y:number, z?:number, w?:number)
    x:number
    y:number
    z:number
    w:number
}
declare class Boundary {
    constructor (x:number, y:number, width:number, height:number)
    x:number
    y:number
    width:number
    height:number
    contract(x:number, y?:number, width?:number, height?:number):this
}
declare function makeID(length?:number, type?:string, letterCase?:string):string
declare function series(array_item:any):Function
declare function makeSeries(array:[any]):Function
declare function smoothStep(num:number, min:number, max:number):number
declare class Noise {
    constructor (seed?:number)
    seed:number
    simplex1D(x:number):number
    simplex2D(x:number, y:number):number
    simplex3D(x:number, y:number, z:number):number
    simplex4D(x:number, y:number, z:number, w:number):number
}
declare class Damp {
    constructor (startValue?:number, damp?:number)
    damp:number
    lastValue:number
    convert(input:number):number
    immediate(num:number):this
}
declare class Proportion {
    constructor (baseMin:number, baseMax:number, targetMin?:number, targetMax?:number, factor?:number, targetRound?:boolean)
    convert(input:number):number
}
declare class ProportionDamp {
    constructor (baseMin:number, baseMax:number, targetMin?:number, targetMax?:number, damp?:number, factor?:number, targetRound?:boolean)
    damp:number
    convert(input:number):number
    immediate(num:number):this
    dispose():boolean
}
declare class Dictionary {
    constructor (unique:boolean)
    length:number
    unique:boolean
    objects:any[]
    values:any[]
    add(object:any, value:any):void
    clear():this
    at(object:any):any
    remove(object:any):boolean
    dispose():boolean
}
declare class Hierarchy {
    constructor (input:[any]|{})
    processSimple(input:[any]|{}):{}
    processComplex(input:[any]|{}):[any]|{}
    getLinearList(data:[any]|{}):[any]
    getLinearIds(data:[any]|{}):[any]
    getData(id:String):any
    getNextSibling(id:String):string
    getPrevSibling(id:String):string
}
declare function swapProperties(property:string, objA:any, objB:any):boolean
declare function swapHTML(idA:string, idB:string):Boolean
// scrollX and scrollY are available only in zim namespace due to global conflict
declare function windowWidth():number
declare function windowHeight():number
declare function getQueryString(string?:string):{}
declare function urlEncode(string:string):string
declare function urlDecode(string:string):string
declare function setCookie(name:string, value:string, days?:number):boolean
declare function getCookie(name:string):string
declare function deleteCookie(name:string):boolean
declare function convertColor(color:string, toColorType?:string, alpha?:number):string
declare function pointAlongCurve(points:[any], ratio?:number, getAngle?:boolean):{}
declare function distanceAlongCurve(points:[any]):number
declare function closestPointAlongCurve(point:any, segmentPoints:[any], num?:number, interpolate?:boolean, percentage?:boolean):number
declare function transformPoints(points:[any], transformType:string, amount:number, x?:number, y?:number):[any]
declare function mobile(orientation?:boolean):string|boolean
declare function vee(obj?:any):boolean
declare function async(url:string, callback?:Function):void
// not sure how to type any class... is it Function?
declare function extend(subclass:Function, superclass:Function, override?:string|string[], prefix?:string, prototype?:boolean):Function

// ++++++++++++++++++++++++++++++++++++++
// ZIM DISPLAY
declare class Stage extends createjs.Stage {
    constructor(canvasID:string|HTMLCanvasElement)
    loop(config_or_call:Function, reverse?:boolean, step?:number, start?:number, end?:number):any
    loop(config:{call:Function, reverse?:boolean, step?:number, start?:number, end?:number}):any
    loop(config:{call:Function, reverse?:boolean, step?:number, start?:number, end?:number}):any
    hitTestGrid(width?:number, height?:number, cols?:number, rows?:number, x?:number, y?:number, offsetX?:number, offsetY?:number, spacingX?:number, spacingY?:number, local?:boolean, type?:string):any
    type:string
    readonly width:number
    readonly height:number
}

declare class StageGL extends Stage {
    constructor(canvasID:string|HTMLCanvasElement, options:{preserveBuffer:boolean, antialias:boolean, transparent:boolean, premultiply:false, autoPurge:number})
    loop(config_or_call:Function, reverse?:boolean, step?:number, start?:number, end?:number):any
    loop(config:{call:Function, reverse?:boolean, step?:number, start?:number, end?:number}):any
    loop(config:{call:Function, reverse?:boolean, step?:number, start?:number, end?:number}):any
    hitTestGrid(width?:number, height?:number, cols?:number, rows?:number, x?:number, y?:number, offsetX?:number, offsetY?:number, spacingX?:number, spacingY?:number, local?:boolean, type?:string):any
    type:string
    readonly width:number
    readonly height:number
}

declare class Container extends createjs.Container implements zimDisplay {
    constructor(width_or_boundsX?:number, height_or_boundsY?:number, width?:number, height?:number, style?:boolean, group?:string, inherit?:{})
    // ZIM Display Interface
    // ZIM 4TH Methods
    tap(call:Function, distance?:number, time?:number, once?:Boolean):this
    noTap():this
    drag(config_or_boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, overCursor?:string, dragCursor?:string, all?:boolean, swipe?:boolean, localBounds?:boolean, onTop?:boolean, surround?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:boolean, reg?:boolean, removeTweens?:boolean, startBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, currentTarget?:boolean):this
    drag(config:{boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, overCursor?:string, dragCursor?:string, all?:boolean, swipe?:boolean, localBounds?:boolean, onTop?:boolean, surround?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:boolean, reg?:boolean, removeTweens?:boolean, startBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, currentTarget?:boolean}):this
    noDrag():this
    dragBoundary(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    dragRect(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    transform(config_or_move?:boolean, stretchX?:boolean, stretchY?:boolean, scale?:boolean, rotate?:boolean, allowToggle?:boolean, visible?:boolean, onTop?:boolean, showStretch?:boolean, showRotate?:boolean, showScale?:boolean, showReg?:boolean, showBorder?:boolean, borderColor?:string, borderWidth?:number, dashed?:boolean, customCursors?:boolean, handleSize?:number, regSize?:number, snapDistance?:number, snapRotation?:number, cache?:boolean, events?:boolean, ghostColor?:string, ghostWidth?:number, ghostDashed?:boolean, ghostHidden?:boolean):this
    transform(config:{move?:boolean, stretchX?:boolean, stretchY?:boolean, scale?:boolean, rotate?:boolean, allowToggle?:boolean, visible?:boolean, onTop?:boolean, showStretch?:boolean, showRotate?:boolean, showScale?:boolean, showReg?:boolean, showBorder?:boolean, borderColor?:string, borderWidth?:number, dashed?:boolean, customCursors?:boolean, handleSize?:number, regSize?:number, snapDistance?:number, snapRotation?:number, cache?:boolean, events?:boolean, ghostColor?:string, ghostWidth?:number, ghostDashed?:boolean, ghostHidden?:boolean}):this
    setSwipe(swipe?:boolean):this
    gesture(config_or_move?:boolean, scale?:boolean, rotate?:boolean, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, minScale?:number, maxScale?:number, snapRotate?:number, localBounds?:boolean, slide?:boolean, slideEffect?:number, regControl?:boolean, onTop?:boolean, surround?:boolean, circularBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    gesture(config:{move?:boolean, scale?:boolean, rotate?:boolean, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, minScale?:number, maxScale?:number, snapRotate?:number, localBounds?:boolean, slide?:boolean, slideEffect?:number, regControl?:boolean, onTop?:boolean, surround?:boolean, circularBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}}):this
    noGesture(config_or_move?:boolean, scale?:boolean, rotate?:boolean):this
    noGesture(config:{move?:boolean, scale?:boolean, rotate?:boolean}):this
    gestureBoundary(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, update?:boolean):this
    addPhysics(dynamic?:boolean, contract?:number, shape?:string, friction?:number, linear?:number, angular?:number, density?:number, restitution?:number, maskBits?:number, categoryBits?:number, physics?:Physics):this
    removePhysics():this
    impulse(x?:number, y?:number, targetX?:number, targetY?:number):this
    force(x?:number, y?:number, targetX?:number, targetY?:number):this
    torque(amount?:number):this
    sleep():this
    wake():this
    follow(damp?:number, dampY?:number, leftOffset?:number, rightOffset?:number, upOffset?:number, downOffset?:number, offsetDamp?:number, offsetDampY?:number, horizontal?:boolean, vertical?:boolean, borderLock?:boolean, borderOriginal?:boolean):this
    control(type?:string, speed?:number, speedY?:number, horizontal?:boolean, vertical?:boolean):this
    noControl():this
    contact(call:Function):this
    contactEnd(call:Function):this
    noContact():this
    noContactEnd():this
    hitTestPoint(x:number, y:number, boundsCheck?:boolean):boolean
    hitTestReg(other:DisplayObject):boolean
    hitTestRect(other:DisplayObject, num?:number, boundsCheck?:boolean):boolean
    hitTestCircle(other:DisplayObject, num?:number, boundsCheck?:boolean):boolean
    hitTestCircles(other:DisplayObject, margin?:number):boolean
    hitTestBounds(other:DisplayObject, margin?:number, boundsShape?:boolean):boolean
    boundsToGlobal(rect:createjs.Rectangle|{x:number,y:number,width:number,height:number}, flip?:boolean):createjs.Rectangle
    resetBounds(width_or_boundsX?:number, height_or_boundsY?:number, width?:number, height?:number):this
    hitTestPath(other:DisplayObject, num?:number, showPoints?:boolean):boolean
    hitTestGrid(width?:number, height?:number, cols?:number, rows?:number, x?:number, y?:number, offsetX?:number, offsetY?:number, spacingX?:number, spacingY?:number, local?:boolean, type?:string):any
    animate(config_or_props:{}|[{}], time?:number|zimVee, ease?:string|zimVee, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, sequence?:number, sequenceCall?:Function, sequenceParams?:any, sequenceReverse?:boolean|zimVee, ticker?:boolean, cjsProps?:{}, css?:boolean, protect?:boolean, override?:boolean, from?:boolean|zimVee, set?:{}|zimVee, id?:string, events?:boolean, sequenceTarget?:any, dynamic?:boolean, drag?:boolean, clamp?:boolean, startPaused?:boolean, clean?:boolean, obj?:{}|[{}]):this
    animate(config:{props:{}|[{}], time?:number|zimVee, ease?:string|zimVee, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, sequence?:number, sequenceCall?:Function, sequenceParams?:any, sequenceReverse?:boolean|zimVee, ticker?:boolean, cjsProps?:{}, css?:boolean, protect?:boolean, override?:boolean, from?:boolean|zimVee, set?:{}|zimVee, id?:string, events?:boolean, sequenceTarget?:any, dynamic?:boolean, drag?:boolean, clamp?:boolean, startPaused?:boolean, clean?:boolean, obj?:{}|[{}]}):this
    stopAnimate(ids?:string|[string]):this
    pauseAnimate(state?:boolean, ids?:string|[string]):this
    wiggle(config_or_property:string, baseAmount:number|zimVee, minAmount?:number|zimVee, maxAmount?:number|zimVee, minTime?:number|zimVee, maxTime?:number|zimVee, totalTime?:number, type?:string, ease?:string, integer?:boolean, id?:string, startType?:string):this
    wiggle(config:{property:string, baseAmount:number|zimVee, minAmount?:number|zimVee, maxAmount?:number|zimVee, minTime?:number|zimVee, maxTime?:number|zimVee, totalTime?:number, type?:string, ease?:string, integer?:boolean, id?:string, startType?:string}):this
    copyMatrix(source:DisplayObject):this
    cur(type?:string):this
    sha(color_or_shadow?:string|createjs.Shadow, offsetX?:number, offsetY?:number, blur?:number):this
    pos(x?:number, y?:number, right?:boolean, bottom?:boolean, container?:Container|Stage, index?:number, add?:boolean, reg?:boolean, regX?:boolean, regY?:boolean):this
    loc(target_or_x?:{}|DisplayObject|Point|number, y?:number, container?:Container|Stage, index?:number, add?:boolean, localToLocal?:boolean, x?:number):this
    mov(x:number, y?:number):this
    top():this
    bot():this
    ord(num:number):this
    dep(depth:number):this
    alp(alpha:number):this
    hov(value?:any, prop?:string):this
    rot(rotation:number):this
    siz(width:number, height?:number, only?:boolean):this
    ske(skewx:number, skewY?:number):this
    reg(regx:number, regY?:number, still?:boolean):this
    sca(scale:number, scaleY?:number):this
    scaleTo(boundObj?:DisplayObject, percentX?:number, percentY?:number, type?:string, boundsOnly?:boolean):this
    fit(left?:number, top?:number, width?:number, height?:number, inside?:boolean):{}
    outline(color?:string, size?:number):this
    addTo(container?:Container|Stage, index?:number, localToLocal?:boolean):this
    removeFrom(container?:Container|Stage):this
    added(call:Function, interval?:number, maxTime?:number):string
    centerReg(container?:Container|Stage, index?:number, add?:boolean):this
    center(container?:Container|Stage, index?:number, add?:boolean):this
    place(id?:string):this
    placeReg(id?:string):this
    expand(padding?:number, paddingVertical?:number):this
    setMask(mask:DisplayObject, dynamic?:boolean):this
    toggle(state?:boolean):this
    outlineToggle(state?:boolean):this
    // animate adds these:
    endTween():this
    resetTween():this
    replayTween():this
    // ZIM 4TH Properties
    readonly type:string
    width:number
    height:number
    widthOnly:number
    heightOnly:number
    depth:number
    percentSpeed:number
    percentComplete:number
    blendMode:string
    readonly paused:boolean
    readonly toggled:boolean
    readonly outlineToggled:boolean
    group:string
    dynamic:boolean
    // END ZIM Display Interface
    loop(config_or_call:Function, reverse?:boolean, step?:number, start?:number, end?:number):any
    loop(config:{call:Function, reverse?:boolean, step?:number, start?:number, end?:number}):any
    cache(width_or_boundsX?:number, height_or_boundsY?:number, width?:number, height?:number, scale?:number, options?:{}):this
    setBounds(width_or_boundsX?:number, height_or_boundsY?:number, width?:number, height?:number):this
    hasProp(prop:string):boolean
    dispose():boolean
    clone():this
}

declare class Sprite extends createjs.Sprite implements zimDisplay {
    constructor(config_or_image?:Bitmap, cols?:number, rows?:number, count?:number, offsetX?:number, offsetY?:number, spacingX?:number, spacingY?:number, width?:number, height?:number, animations?:{}, json?:string|{}, id?:string|number, globalControl?:boolean, spriteSheet?:createjs.SpriteSheet, style?:boolean, group?:string, inherit?:{})
    constructor(config:{image?:Bitmap, cols?:number, rows?:number, count?:number, offsetX?:number, offsetY?:number, spacingX?:number, spacingY?:number, width?:number, height?:number, animations?:{}, json?:string|{}, id?:string|number, globalControl?:boolean, spriteSheet?:createjs.SpriteSheet, style?:boolean, group?:string, inherit?:{}})
    // ZIM Display Interface
    // ZIM 4TH Methods
    tap(call:Function, distance?:number, time?:number, once?:Boolean):this
    noTap():this
    drag(config_or_boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, overCursor?:string, dragCursor?:string, all?:boolean, swipe?:boolean, localBounds?:boolean, onTop?:boolean, surround?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:boolean, reg?:boolean, removeTweens?:boolean, startBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, currentTarget?:boolean):this
    drag(config:{boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, overCursor?:string, dragCursor?:string, all?:boolean, swipe?:boolean, localBounds?:boolean, onTop?:boolean, surround?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:boolean, reg?:boolean, removeTweens?:boolean, startBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, currentTarget?:boolean}):this
    noDrag():this
    dragBoundary(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    dragRect(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    transform(config_or_move?:boolean, stretchX?:boolean, stretchY?:boolean, scale?:boolean, rotate?:boolean, allowToggle?:boolean, visible?:boolean, onTop?:boolean, showStretch?:boolean, showRotate?:boolean, showScale?:boolean, showReg?:boolean, showBorder?:boolean, borderColor?:string, borderWidth?:number, dashed?:boolean, customCursors?:boolean, handleSize?:number, regSize?:number, snapDistance?:number, snapRotation?:number, cache?:boolean, events?:boolean, ghostColor?:string, ghostWidth?:number, ghostDashed?:boolean, ghostHidden?:boolean):this
    transform(config:{move?:boolean, stretchX?:boolean, stretchY?:boolean, scale?:boolean, rotate?:boolean, allowToggle?:boolean, visible?:boolean, onTop?:boolean, showStretch?:boolean, showRotate?:boolean, showScale?:boolean, showReg?:boolean, showBorder?:boolean, borderColor?:string, borderWidth?:number, dashed?:boolean, customCursors?:boolean, handleSize?:number, regSize?:number, snapDistance?:number, snapRotation?:number, cache?:boolean, events?:boolean, ghostColor?:string, ghostWidth?:number, ghostDashed?:boolean, ghostHidden?:boolean}):this
    setSwipe(swipe?:boolean):this
    gesture(config_or_move?:boolean, scale?:boolean, rotate?:boolean, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, minScale?:number, maxScale?:number, snapRotate?:number, localBounds?:boolean, slide?:boolean, slideEffect?:number, regControl?:boolean, onTop?:boolean, surround?:boolean, circularBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    gesture(config:{move?:boolean, scale?:boolean, rotate?:boolean, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, minScale?:number, maxScale?:number, snapRotate?:number, localBounds?:boolean, slide?:boolean, slideEffect?:number, regControl?:boolean, onTop?:boolean, surround?:boolean, circularBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}}):this
    noGesture(config_or_move?:boolean, scale?:boolean, rotate?:boolean):this
    noGesture(config:{move?:boolean, scale?:boolean, rotate?:boolean}):this
    gestureBoundary(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, update?:boolean):this
    addPhysics(dynamic?:boolean, contract?:number, shape?:string, friction?:number, linear?:number, angular?:number, density?:number, restitution?:number, maskBits?:number, categoryBits?:number, physics?:Physics):this
    removePhysics():this
    impulse(x?:number, y?:number, targetX?:number, targetY?:number):this
    force(x?:number, y?:number, targetX?:number, targetY?:number):this
    torque(amount?:number):this
    sleep():this
    wake():this
    follow(damp?:number, dampY?:number, leftOffset?:number, rightOffset?:number, upOffset?:number, downOffset?:number, offsetDamp?:number, offsetDampY?:number, horizontal?:boolean, vertical?:boolean, borderLock?:boolean, borderOriginal?:boolean):this
    control(type?:string, speed?:number, speedY?:number, horizontal?:boolean, vertical?:boolean):this
    noControl():this
    contact(call:Function):this
    contactEnd(call:Function):this
    noContact():this
    noContactEnd():this
    hitTestPoint(x:number, y:number, boundsCheck?:boolean):boolean
    hitTestReg(other:DisplayObject):boolean
    hitTestRect(other:DisplayObject, num?:number, boundsCheck?:boolean):boolean
    hitTestCircle(other:DisplayObject, num?:number, boundsCheck?:boolean):boolean
    hitTestCircles(other:DisplayObject, margin?:number):boolean
    hitTestBounds(other:DisplayObject, margin?:number, boundsShape?:boolean):boolean
    boundsToGlobal(rect:createjs.Rectangle|{x:number,y:number,width:number,height:number}, flip?:boolean):createjs.Rectangle
    resetBounds(width_or_boundsX?:number, height_or_boundsY?:number, width?:number, height?:number):this
    hitTestPath(other:DisplayObject, num?:number, showPoints?:boolean):boolean
    hitTestGrid(width?:number, height?:number, cols?:number, rows?:number, x?:number, y?:number, offsetX?:number, offsetY?:number, spacingX?:number, spacingY?:number, local?:boolean, type?:string):any
    animate(config_or_props:{}|[{}], time?:number|zimVee, ease?:string|zimVee, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, sequence?:number, sequenceCall?:Function, sequenceParams?:any, sequenceReverse?:boolean|zimVee, ticker?:boolean, cjsProps?:{}, css?:boolean, protect?:boolean, override?:boolean, from?:boolean|zimVee, set?:{}|zimVee, id?:string, events?:boolean, sequenceTarget?:any, dynamic?:boolean, drag?:boolean, clamp?:boolean, startPaused?:boolean, clean?:boolean, obj?:{}|[{}]):this
    animate(config:{props:{}|[{}], time?:number|zimVee, ease?:string|zimVee, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, sequence?:number, sequenceCall?:Function, sequenceParams?:any, sequenceReverse?:boolean|zimVee, ticker?:boolean, cjsProps?:{}, css?:boolean, protect?:boolean, override?:boolean, from?:boolean|zimVee, set?:{}|zimVee, id?:string, events?:boolean, sequenceTarget?:any, dynamic?:boolean, drag?:boolean, clamp?:boolean, startPaused?:boolean, clean?:boolean, obj?:{}|[{}]}):this
    stopAnimate(ids?:string|[string]):this
    pauseAnimate(state?:boolean, ids?:string|[string]):this
    wiggle(config_or_property:string, baseAmount:number|zimVee, minAmount?:number|zimVee, maxAmount?:number|zimVee, minTime?:number|zimVee, maxTime?:number|zimVee, totalTime?:number, type?:string, ease?:string, integer?:boolean, id?:string, startType?:string):this
    wiggle(config:{property:string, baseAmount:number|zimVee, minAmount?:number|zimVee, maxAmount?:number|zimVee, minTime?:number|zimVee, maxTime?:number|zimVee, totalTime?:number, type?:string, ease?:string, integer?:boolean, id?:string, startType?:string}):this
    copyMatrix(source:DisplayObject):this
    cur(type?:string):this
    sha(color_or_shadow?:string|createjs.Shadow, offsetX?:number, offsetY?:number, blur?:number):this
    pos(x?:number, y?:number, right?:boolean, bottom?:boolean, container?:Container|Stage, index?:number, add?:boolean, reg?:boolean, regX?:boolean, regY?:boolean):this
    loc(target_or_x?:{}|DisplayObject|Point|number, y?:number, container?:Container|Stage, index?:number, add?:boolean, localToLocal?:boolean, x?:number):this
    mov(x:number, y?:number):this
    top():this
    bot():this
    ord(num:number):this
    dep(depth:number):this
    alp(alpha:number):this
    hov(value?:any, prop?:string):this
    rot(rotation:number):this
    siz(width:number, height?:number, only?:boolean):this
    ske(skewx:number, skewY?:number):this
    reg(regx:number, regY?:number, still?:boolean):this
    sca(scale:number, scaleY?:number):this
    scaleTo(boundObj?:DisplayObject, percentX?:number, percentY?:number, type?:string, boundsOnly?:boolean):this
    fit(left?:number, top?:number, width?:number, height?:number, inside?:boolean):{}
    outline(color?:string, size?:number):this
    addTo(container?:Container|Stage, index?:number, localToLocal?:boolean):this
    removeFrom(container?:Container|Stage):this
    added(call:Function, interval?:number, maxTime?:number):string
    centerReg(container?:Container|Stage, index?:number, add?:boolean):this
    center(container?:Container|Stage, index?:number, add?:boolean):this
    place(id?:string):this
    placeReg(id?:string):this
    expand(padding?:number, paddingVertical?:number):this
    setMask(mask:DisplayObject, dynamic?:boolean):this
    toggle(state?:boolean):this
    outlineToggle(state?:boolean):this
    // animate adds these:
    endTween():this
    resetTween():this
    replayTween():this
    // ZIM 4TH Properties
    readonly type:string
    width:number
    height:number
    widthOnly:number
    heightOnly:number
    depth:number
    percentSpeed:number
    percentComplete:number
    blendMode:string
    readonly paused:boolean
    readonly toggled:boolean
    readonly outlineToggled:boolean
    group:string
    dynamic:boolean
    // END ZIM Display Interface
    run(time?:number, label?, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, startFrame?:number, end ?:number, tweek?:number, id?:string, globalControl?:boolean):this
    pauseRun(state?:boolean):this
    stopRun():this
    hasProp(prop:string):boolean
    dispose():boolean
    clone():this
    id:any // string for Sprite and number for createjs.Sprite
    frame:number
    normalizedFrame:number
    normalizedFrames:[any]
    totalFrames:number
    animations:{}
    running:boolean
    runPaused:boolean
}

declare class Shape extends createjs.Shape implements zimDisplay {
    constructor(width_or_boundsX?:number, height_or_boundsY?:number, width?:number, height?:number, graphics?:createjs.Graphics, style?:boolean, group?:string, inherit?:{})
    // ZIM Display Interface
    // ZIM 4TH Methods
    tap(call:Function, distance?:number, time?:number, once?:Boolean):this
    noTap():this
    drag(config_or_boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, overCursor?:string, dragCursor?:string, all?:boolean, swipe?:boolean, localBounds?:boolean, onTop?:boolean, surround?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:boolean, reg?:boolean, removeTweens?:boolean, startBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, currentTarget?:boolean):this
    drag(config:{boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, overCursor?:string, dragCursor?:string, all?:boolean, swipe?:boolean, localBounds?:boolean, onTop?:boolean, surround?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:boolean, reg?:boolean, removeTweens?:boolean, startBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, currentTarget?:boolean}):this
    noDrag():this
    dragBoundary(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    dragRect(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    transform(config_or_move?:boolean, stretchX?:boolean, stretchY?:boolean, scale?:boolean, rotate?:boolean, allowToggle?:boolean, visible?:boolean, onTop?:boolean, showStretch?:boolean, showRotate?:boolean, showScale?:boolean, showReg?:boolean, showBorder?:boolean, borderColor?:string, borderWidth?:number, dashed?:boolean, customCursors?:boolean, handleSize?:number, regSize?:number, snapDistance?:number, snapRotation?:number, cache?:boolean, events?:boolean, ghostColor?:string, ghostWidth?:number, ghostDashed?:boolean, ghostHidden?:boolean):this
    transform(config:{move?:boolean, stretchX?:boolean, stretchY?:boolean, scale?:boolean, rotate?:boolean, allowToggle?:boolean, visible?:boolean, onTop?:boolean, showStretch?:boolean, showRotate?:boolean, showScale?:boolean, showReg?:boolean, showBorder?:boolean, borderColor?:string, borderWidth?:number, dashed?:boolean, customCursors?:boolean, handleSize?:number, regSize?:number, snapDistance?:number, snapRotation?:number, cache?:boolean, events?:boolean, ghostColor?:string, ghostWidth?:number, ghostDashed?:boolean, ghostHidden?:boolean}):this
    setSwipe(swipe?:boolean):this
    gesture(config_or_move?:boolean, scale?:boolean, rotate?:boolean, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, minScale?:number, maxScale?:number, snapRotate?:number, localBounds?:boolean, slide?:boolean, slideEffect?:number, regControl?:boolean, onTop?:boolean, surround?:boolean, circularBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    gesture(config:{move?:boolean, scale?:boolean, rotate?:boolean, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, minScale?:number, maxScale?:number, snapRotate?:number, localBounds?:boolean, slide?:boolean, slideEffect?:number, regControl?:boolean, onTop?:boolean, surround?:boolean, circularBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}}):this
    noGesture(config_or_move?:boolean, scale?:boolean, rotate?:boolean):this
    noGesture(config:{move?:boolean, scale?:boolean, rotate?:boolean}):this
    gestureBoundary(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, update?:boolean):this
    addPhysics(dynamic?:boolean, contract?:number, shape?:string, friction?:number, linear?:number, angular?:number, density?:number, restitution?:number, maskBits?:number, categoryBits?:number, physics?:Physics):this
    removePhysics():this
    impulse(x?:number, y?:number, targetX?:number, targetY?:number):this
    force(x?:number, y?:number, targetX?:number, targetY?:number):this
    torque(amount?:number):this
    sleep():this
    wake():this
    follow(damp?:number, dampY?:number, leftOffset?:number, rightOffset?:number, upOffset?:number, downOffset?:number, offsetDamp?:number, offsetDampY?:number, horizontal?:boolean, vertical?:boolean, borderLock?:boolean, borderOriginal?:boolean):this
    control(type?:string, speed?:number, speedY?:number, horizontal?:boolean, vertical?:boolean):this
    noControl():this
    contact(call:Function):this
    contactEnd(call:Function):this
    noContact():this
    noContactEnd():this
    hitTestPoint(x:number, y:number, boundsCheck?:boolean):boolean
    hitTestReg(other:DisplayObject):boolean
    hitTestRect(other:DisplayObject, num?:number, boundsCheck?:boolean):boolean
    hitTestCircle(other:DisplayObject, num?:number, boundsCheck?:boolean):boolean
    hitTestCircles(other:DisplayObject, margin?:number):boolean
    hitTestBounds(other:DisplayObject, margin?:number, boundsShape?:boolean):boolean
    boundsToGlobal(rect:createjs.Rectangle|{x:number,y:number,width:number,height:number}, flip?:boolean):createjs.Rectangle
    resetBounds(width_or_boundsX?:number, height_or_boundsY?:number, width?:number, height?:number):this
    hitTestPath(other:DisplayObject, num?:number, showPoints?:boolean):boolean
    hitTestGrid(width?:number, height?:number, cols?:number, rows?:number, x?:number, y?:number, offsetX?:number, offsetY?:number, spacingX?:number, spacingY?:number, local?:boolean, type?:string):any
    animate(config_or_props:{}|[{}], time?:number|zimVee, ease?:string|zimVee, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, sequence?:number, sequenceCall?:Function, sequenceParams?:any, sequenceReverse?:boolean|zimVee, ticker?:boolean, cjsProps?:{}, css?:boolean, protect?:boolean, override?:boolean, from?:boolean|zimVee, set?:{}|zimVee, id?:string, events?:boolean, sequenceTarget?:any, dynamic?:boolean, drag?:boolean, clamp?:boolean, startPaused?:boolean, clean?:boolean, obj?:{}|[{}]):this
    animate(config:{props:{}|[{}], time?:number|zimVee, ease?:string|zimVee, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, sequence?:number, sequenceCall?:Function, sequenceParams?:any, sequenceReverse?:boolean|zimVee, ticker?:boolean, cjsProps?:{}, css?:boolean, protect?:boolean, override?:boolean, from?:boolean|zimVee, set?:{}|zimVee, id?:string, events?:boolean, sequenceTarget?:any, dynamic?:boolean, drag?:boolean, clamp?:boolean, startPaused?:boolean, clean?:boolean, obj?:{}|[{}]}):this
    stopAnimate(ids?:string|[string]):this
    pauseAnimate(state?:boolean, ids?:string|[string]):this
    wiggle(config_or_property:string, baseAmount:number|zimVee, minAmount?:number|zimVee, maxAmount?:number|zimVee, minTime?:number|zimVee, maxTime?:number|zimVee, totalTime?:number, type?:string, ease?:string, integer?:boolean, id?:string, startType?:string):this
    wiggle(config:{property:string, baseAmount:number|zimVee, minAmount?:number|zimVee, maxAmount?:number|zimVee, minTime?:number|zimVee, maxTime?:number|zimVee, totalTime?:number, type?:string, ease?:string, integer?:boolean, id?:string, startType?:string}):this
    copyMatrix(source:DisplayObject):this
    cur(type?:string):this
    sha(color_or_shadow?:string|createjs.Shadow, offsetX?:number, offsetY?:number, blur?:number):this
    pos(x?:number, y?:number, right?:boolean, bottom?:boolean, container?:Container|Stage, index?:number, add?:boolean, reg?:boolean, regX?:boolean, regY?:boolean):this
    loc(target_or_x?:{}|DisplayObject|Point|number, y?:number, container?:Container|Stage, index?:number, add?:boolean, localToLocal?:boolean, x?:number):this
    mov(x:number, y?:number):this
    top():this
    bot():this
    ord(num:number):this
    dep(depth:number):this
    alp(alpha:number):this
    hov(value?:any, prop?:string):this
    rot(rotation:number):this
    siz(width:number, height?:number, only?:boolean):this
    ske(skewx:number, skewY?:number):this
    reg(regx:number, regY?:number, still?:boolean):this
    sca(scale:number, scaleY?:number):this
    scaleTo(boundObj?:DisplayObject, percentX?:number, percentY?:number, type?:string, boundsOnly?:boolean):this
    fit(left?:number, top?:number, width?:number, height?:number, inside?:boolean):{}
    outline(color?:string, size?:number):this
    addTo(container?:Container|Stage, index?:number, localToLocal?:boolean):this
    removeFrom(container?:Container|Stage):this
    added(call:Function, interval?:number, maxTime?:number):string
    centerReg(container?:Container|Stage, index?:number, add?:boolean):this
    center(container?:Container|Stage, index?:number, add?:boolean):this
    place(id?:string):this
    placeReg(id?:string):this
    expand(padding?:number, paddingVertical?:number):this
    setMask(mask:DisplayObject, dynamic?:boolean):this
    toggle(state?:boolean):this
    outlineToggle(state?:boolean):this
    // animate adds these:
    endTween():this
    resetTween():this
    replayTween():this
    // ZIM 4TH Properties
    readonly type:string
    width:number
    height:number
    widthOnly:number
    heightOnly:number
    depth:number
    percentSpeed:number
    percentComplete:number
    blendMode:string
    readonly paused:boolean
    readonly toggled:boolean
    readonly outlineToggled:boolean
    group:string
    dynamic:boolean
    // END ZIM Display Interface
    cache(width_or_boundsX?:number, height_or_boundsY?:number, width?:number, height?:number, scale?:number, options?:{}):this
    hasProp(prop:string):boolean
    clone():this
}

declare class Bitmap extends createjs.Bitmap implements zimDisplay {
    constructor(image?:HTMLImageElement, width?:number, height?:number, id?:string, style?:boolean, group?:string, inherit?:{})
    // ZIM Display Interface
    // ZIM 4TH Methods
    tap(call:Function, distance?:number, time?:number, once?:Boolean):this
    noTap():this
    drag(config_or_boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, overCursor?:string, dragCursor?:string, all?:boolean, swipe?:boolean, localBounds?:boolean, onTop?:boolean, surround?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:boolean, reg?:boolean, removeTweens?:boolean, startBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, currentTarget?:boolean):this
    drag(config:{boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, overCursor?:string, dragCursor?:string, all?:boolean, swipe?:boolean, localBounds?:boolean, onTop?:boolean, surround?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:boolean, reg?:boolean, removeTweens?:boolean, startBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, currentTarget?:boolean}):this
    noDrag():this
    dragBoundary(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    dragRect(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    transform(config_or_move?:boolean, stretchX?:boolean, stretchY?:boolean, scale?:boolean, rotate?:boolean, allowToggle?:boolean, visible?:boolean, onTop?:boolean, showStretch?:boolean, showRotate?:boolean, showScale?:boolean, showReg?:boolean, showBorder?:boolean, borderColor?:string, borderWidth?:number, dashed?:boolean, customCursors?:boolean, handleSize?:number, regSize?:number, snapDistance?:number, snapRotation?:number, cache?:boolean, events?:boolean, ghostColor?:string, ghostWidth?:number, ghostDashed?:boolean, ghostHidden?:boolean):this
    transform(config:{move?:boolean, stretchX?:boolean, stretchY?:boolean, scale?:boolean, rotate?:boolean, allowToggle?:boolean, visible?:boolean, onTop?:boolean, showStretch?:boolean, showRotate?:boolean, showScale?:boolean, showReg?:boolean, showBorder?:boolean, borderColor?:string, borderWidth?:number, dashed?:boolean, customCursors?:boolean, handleSize?:number, regSize?:number, snapDistance?:number, snapRotation?:number, cache?:boolean, events?:boolean, ghostColor?:string, ghostWidth?:number, ghostDashed?:boolean, ghostHidden?:boolean}):this
    setSwipe(swipe?:boolean):this
    gesture(config_or_move?:boolean, scale?:boolean, rotate?:boolean, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, minScale?:number, maxScale?:number, snapRotate?:number, localBounds?:boolean, slide?:boolean, slideEffect?:number, regControl?:boolean, onTop?:boolean, surround?:boolean, circularBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    gesture(config:{move?:boolean, scale?:boolean, rotate?:boolean, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, minScale?:number, maxScale?:number, snapRotate?:number, localBounds?:boolean, slide?:boolean, slideEffect?:number, regControl?:boolean, onTop?:boolean, surround?:boolean, circularBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}}):this
    noGesture(config_or_move?:boolean, scale?:boolean, rotate?:boolean):this
    noGesture(config:{move?:boolean, scale?:boolean, rotate?:boolean}):this
    gestureBoundary(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, update?:boolean):this
    addPhysics(dynamic?:boolean, contract?:number, shape?:string, friction?:number, linear?:number, angular?:number, density?:number, restitution?:number, maskBits?:number, categoryBits?:number, physics?:Physics):this
    removePhysics():this
    impulse(x?:number, y?:number, targetX?:number, targetY?:number):this
    force(x?:number, y?:number, targetX?:number, targetY?:number):this
    torque(amount?:number):this
    sleep():this
    wake():this
    follow(damp?:number, dampY?:number, leftOffset?:number, rightOffset?:number, upOffset?:number, downOffset?:number, offsetDamp?:number, offsetDampY?:number, horizontal?:boolean, vertical?:boolean, borderLock?:boolean, borderOriginal?:boolean):this
    control(type?:string, speed?:number, speedY?:number, horizontal?:boolean, vertical?:boolean):this
    noControl():this
    contact(call:Function):this
    contactEnd(call:Function):this
    noContact():this
    noContactEnd():this
    hitTestPoint(x:number, y:number, boundsCheck?:boolean):boolean
    hitTestReg(other:DisplayObject):boolean
    hitTestRect(other:DisplayObject, num?:number, boundsCheck?:boolean):boolean
    hitTestCircle(other:DisplayObject, num?:number, boundsCheck?:boolean):boolean
    hitTestCircles(other:DisplayObject, margin?:number):boolean
    hitTestBounds(other:DisplayObject, margin?:number, boundsShape?:boolean):boolean
    boundsToGlobal(rect:createjs.Rectangle|{x:number,y:number,width:number,height:number}, flip?:boolean):createjs.Rectangle
    resetBounds(width_or_boundsX?:number, height_or_boundsY?:number, width?:number, height?:number):this
    hitTestPath(other:DisplayObject, num?:number, showPoints?:boolean):boolean
    hitTestGrid(width?:number, height?:number, cols?:number, rows?:number, x?:number, y?:number, offsetX?:number, offsetY?:number, spacingX?:number, spacingY?:number, local?:boolean, type?:string):any
    animate(config_or_props:{}|[{}], time?:number|zimVee, ease?:string|zimVee, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, sequence?:number, sequenceCall?:Function, sequenceParams?:any, sequenceReverse?:boolean|zimVee, ticker?:boolean, cjsProps?:{}, css?:boolean, protect?:boolean, override?:boolean, from?:boolean|zimVee, set?:{}|zimVee, id?:string, events?:boolean, sequenceTarget?:any, dynamic?:boolean, drag?:boolean, clamp?:boolean, startPaused?:boolean, clean?:boolean, obj?:{}|[{}]):this
    animate(config:{props:{}|[{}], time?:number|zimVee, ease?:string|zimVee, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, sequence?:number, sequenceCall?:Function, sequenceParams?:any, sequenceReverse?:boolean|zimVee, ticker?:boolean, cjsProps?:{}, css?:boolean, protect?:boolean, override?:boolean, from?:boolean|zimVee, set?:{}|zimVee, id?:string, events?:boolean, sequenceTarget?:any, dynamic?:boolean, drag?:boolean, clamp?:boolean, startPaused?:boolean, clean?:boolean, obj?:{}|[{}]}):this
    stopAnimate(ids?:string|[string]):this
    pauseAnimate(state?:boolean, ids?:string|[string]):this
    wiggle(config_or_property:string, baseAmount:number|zimVee, minAmount?:number|zimVee, maxAmount?:number|zimVee, minTime?:number|zimVee, maxTime?:number|zimVee, totalTime?:number, type?:string, ease?:string, integer?:boolean, id?:string, startType?:string):this
    wiggle(config:{property:string, baseAmount:number|zimVee, minAmount?:number|zimVee, maxAmount?:number|zimVee, minTime?:number|zimVee, maxTime?:number|zimVee, totalTime?:number, type?:string, ease?:string, integer?:boolean, id?:string, startType?:string}):this
    copyMatrix(source:DisplayObject):this
    cur(type?:string):this
    sha(color_or_shadow?:string|createjs.Shadow, offsetX?:number, offsetY?:number, blur?:number):this
    pos(x?:number, y?:number, right?:boolean, bottom?:boolean, container?:Container|Stage, index?:number, add?:boolean, reg?:boolean, regX?:boolean, regY?:boolean):this
    loc(target_or_x?:{}|DisplayObject|Point|number, y?:number, container?:Container|Stage, index?:number, add?:boolean, localToLocal?:boolean, x?:number):this
    mov(x:number, y?:number):this
    top():this
    bot():this
    ord(num:number):this
    dep(depth:number):this
    alp(alpha:number):this
    hov(value?:any, prop?:string):this
    rot(rotation:number):this
    siz(width:number, height?:number, only?:boolean):this
    ske(skewx:number, skewY?:number):this
    reg(regx:number, regY?:number, still?:boolean):this
    sca(scale:number, scaleY?:number):this
    scaleTo(boundObj?:DisplayObject, percentX?:number, percentY?:number, type?:string, boundsOnly?:boolean):this
    fit(left?:number, top?:number, width?:number, height?:number, inside?:boolean):{}
    outline(color?:string, size?:number):this
    addTo(container?:Container|Stage, index?:number, localToLocal?:boolean):this
    removeFrom(container?:Container|Stage):this
    added(call:Function, interval?:number, maxTime?:number):string
    centerReg(container?:Container|Stage, index?:number, add?:boolean):this
    center(container?:Container|Stage, index?:number, add?:boolean):this
    place(id?:string):this
    placeReg(id?:string):this
    expand(padding?:number, paddingVertical?:number):this
    setMask(mask:DisplayObject, dynamic?:boolean):this
    toggle(state?:boolean):this
    outlineToggle(state?:boolean):this
    // animate adds these:
    endTween():this
    resetTween():this
    replayTween():this
    // ZIM 4TH Properties
    readonly type:string
    width:number
    height:number
    widthOnly:number
    heightOnly:number
    depth:number
    percentSpeed:number
    percentComplete:number
    blendMode:string
    readonly paused:boolean
    readonly toggled:boolean
    readonly outlineToggled:boolean
    group:string
    dynamic:boolean
    // END ZIM Display Interface
    // clone():this
    hasProp(prop:string):boolean
    dispose():boolean
    cache(width_or_boundsX?:number, height_or_boundsY?:number, width?:number, height?:number, scale?:number, options?:{}):this
    drawImageData(x?:number, y?:number, sourceX?:number, srcY?:number, srcWidth?:number, srcHeight?:number)
    imageData:{data:[number]}
}

declare class MovieClip extends createjs.MovieClip implements zimDisplay {
    constructor(mode?:string, startPosition?:number, loop?:boolean, labels?:{}, style?:boolean, group?:string, inherit?:{})
    // ZIM Display Interface
    // ZIM 4TH Methods
    tap(call:Function, distance?:number, time?:number, once?:Boolean):this
    noTap():this
    drag(config_or_boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, overCursor?:string, dragCursor?:string, all?:boolean, swipe?:boolean, localBounds?:boolean, onTop?:boolean, surround?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:boolean, reg?:boolean, removeTweens?:boolean, startBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, currentTarget?:boolean):this
    drag(config:{boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, overCursor?:string, dragCursor?:string, all?:boolean, swipe?:boolean, localBounds?:boolean, onTop?:boolean, surround?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:boolean, reg?:boolean, removeTweens?:boolean, startBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, currentTarget?:boolean}):this
    noDrag():this
    dragBoundary(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    dragRect(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    transform(config_or_move?:boolean, stretchX?:boolean, stretchY?:boolean, scale?:boolean, rotate?:boolean, allowToggle?:boolean, visible?:boolean, onTop?:boolean, showStretch?:boolean, showRotate?:boolean, showScale?:boolean, showReg?:boolean, showBorder?:boolean, borderColor?:string, borderWidth?:number, dashed?:boolean, customCursors?:boolean, handleSize?:number, regSize?:number, snapDistance?:number, snapRotation?:number, cache?:boolean, events?:boolean, ghostColor?:string, ghostWidth?:number, ghostDashed?:boolean, ghostHidden?:boolean):this
    transform(config:{move?:boolean, stretchX?:boolean, stretchY?:boolean, scale?:boolean, rotate?:boolean, allowToggle?:boolean, visible?:boolean, onTop?:boolean, showStretch?:boolean, showRotate?:boolean, showScale?:boolean, showReg?:boolean, showBorder?:boolean, borderColor?:string, borderWidth?:number, dashed?:boolean, customCursors?:boolean, handleSize?:number, regSize?:number, snapDistance?:number, snapRotation?:number, cache?:boolean, events?:boolean, ghostColor?:string, ghostWidth?:number, ghostDashed?:boolean, ghostHidden?:boolean}):this
    setSwipe(swipe?:boolean):this
    gesture(config_or_move?:boolean, scale?:boolean, rotate?:boolean, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, minScale?:number, maxScale?:number, snapRotate?:number, localBounds?:boolean, slide?:boolean, slideEffect?:number, regControl?:boolean, onTop?:boolean, surround?:boolean, circularBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    gesture(config:{move?:boolean, scale?:boolean, rotate?:boolean, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, minScale?:number, maxScale?:number, snapRotate?:number, localBounds?:boolean, slide?:boolean, slideEffect?:number, regControl?:boolean, onTop?:boolean, surround?:boolean, circularBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}}):this
    noGesture(config_or_move?:boolean, scale?:boolean, rotate?:boolean):this
    noGesture(config:{move?:boolean, scale?:boolean, rotate?:boolean}):this
    gestureBoundary(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, update?:boolean):this
    addPhysics(dynamic?:boolean, contract?:number, shape?:string, friction?:number, linear?:number, angular?:number, density?:number, restitution?:number, maskBits?:number, categoryBits?:number, physics?:Physics):this
    removePhysics():this
    impulse(x?:number, y?:number, targetX?:number, targetY?:number):this
    force(x?:number, y?:number, targetX?:number, targetY?:number):this
    torque(amount?:number):this
    sleep():this
    wake():this
    follow(damp?:number, dampY?:number, leftOffset?:number, rightOffset?:number, upOffset?:number, downOffset?:number, offsetDamp?:number, offsetDampY?:number, horizontal?:boolean, vertical?:boolean, borderLock?:boolean, borderOriginal?:boolean):this
    control(type?:string, speed?:number, speedY?:number, horizontal?:boolean, vertical?:boolean):this
    noControl():this
    contact(call:Function):this
    contactEnd(call:Function):this
    noContact():this
    noContactEnd():this
    hitTestPoint(x:number, y:number, boundsCheck?:boolean):boolean
    hitTestReg(other:DisplayObject):boolean
    hitTestRect(other:DisplayObject, num?:number, boundsCheck?:boolean):boolean
    hitTestCircle(other:DisplayObject, num?:number, boundsCheck?:boolean):boolean
    hitTestCircles(other:DisplayObject, margin?:number):boolean
    hitTestBounds(other:DisplayObject, margin?:number, boundsShape?:boolean):boolean
    boundsToGlobal(rect:createjs.Rectangle|{x:number,y:number,width:number,height:number}, flip?:boolean):createjs.Rectangle
    resetBounds(width_or_boundsX?:number, height_or_boundsY?:number, width?:number, height?:number):this
    hitTestPath(other:DisplayObject, num?:number, showPoints?:boolean):boolean
    hitTestGrid(width?:number, height?:number, cols?:number, rows?:number, x?:number, y?:number, offsetX?:number, offsetY?:number, spacingX?:number, spacingY?:number, local?:boolean, type?:string):any
    animate(config_or_props:{}|[{}], time?:number|zimVee, ease?:string|zimVee, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, sequence?:number, sequenceCall?:Function, sequenceParams?:any, sequenceReverse?:boolean|zimVee, ticker?:boolean, cjsProps?:{}, css?:boolean, protect?:boolean, override?:boolean, from?:boolean|zimVee, set?:{}|zimVee, id?:string, events?:boolean, sequenceTarget?:any, dynamic?:boolean, drag?:boolean, clamp?:boolean, startPaused?:boolean, clean?:boolean, obj?:{}|[{}]):this
    animate(config:{props:{}|[{}], time?:number|zimVee, ease?:string|zimVee, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, sequence?:number, sequenceCall?:Function, sequenceParams?:any, sequenceReverse?:boolean|zimVee, ticker?:boolean, cjsProps?:{}, css?:boolean, protect?:boolean, override?:boolean, from?:boolean|zimVee, set?:{}|zimVee, id?:string, events?:boolean, sequenceTarget?:any, dynamic?:boolean, drag?:boolean, clamp?:boolean, startPaused?:boolean, clean?:boolean, obj?:{}|[{}]}):this
    stopAnimate(ids?:string|[string]):this
    pauseAnimate(state?:boolean, ids?:string|[string]):this
    wiggle(config_or_property:string, baseAmount:number|zimVee, minAmount?:number|zimVee, maxAmount?:number|zimVee, minTime?:number|zimVee, maxTime?:number|zimVee, totalTime?:number, type?:string, ease?:string, integer?:boolean, id?:string, startType?:string):this
    wiggle(config:{property:string, baseAmount:number|zimVee, minAmount?:number|zimVee, maxAmount?:number|zimVee, minTime?:number|zimVee, maxTime?:number|zimVee, totalTime?:number, type?:string, ease?:string, integer?:boolean, id?:string, startType?:string}):this
    copyMatrix(source:DisplayObject):this
    cur(type?:string):this
    sha(color_or_shadow?:string|createjs.Shadow, offsetX?:number, offsetY?:number, blur?:number):this
    pos(x?:number, y?:number, right?:boolean, bottom?:boolean, container?:Container|Stage, index?:number, add?:boolean, reg?:boolean, regX?:boolean, regY?:boolean):this
    loc(target_or_x?:{}|DisplayObject|Point|number, y?:number, container?:Container|Stage, index?:number, add?:boolean, localToLocal?:boolean, x?:number):this
    mov(x:number, y?:number):this
    top():this
    bot():this
    ord(num:number):this
    dep(depth:number):this
    alp(alpha:number):this
    hov(value?:any, prop?:string):this
    rot(rotation:number):this
    siz(width:number, height?:number, only?:boolean):this
    ske(skewx:number, skewY?:number):this
    reg(regx:number, regY?:number, still?:boolean):this
    sca(scale:number, scaleY?:number):this
    scaleTo(boundObj?:DisplayObject, percentX?:number, percentY?:number, type?:string, boundsOnly?:boolean):this
    fit(left?:number, top?:number, width?:number, height?:number, inside?:boolean):{}
    outline(color?:string, size?:number):this
    addTo(container?:Container|Stage, index?:number, localToLocal?:boolean):this
    removeFrom(container?:Container|Stage):this
    added(call:Function, interval?:number, maxTime?:number):string
    centerReg(container?:Container|Stage, index?:number, add?:boolean):this
    center(container?:Container|Stage, index?:number, add?:boolean):this
    place(id?:string):this
    placeReg(id?:string):this
    expand(padding?:number, paddingVertical?:number):this
    setMask(mask:DisplayObject, dynamic?:boolean):this
    toggle(state?:boolean):this
    outlineToggle(state?:boolean):this
    // animate adds these:
    endTween():this
    resetTween():this
    replayTween():this
    // ZIM 4TH Properties
    readonly type:string
    width:number
    height:number
    widthOnly:number
    heightOnly:number
    depth:number
    percentSpeed:number
    percentComplete:number
    blendMode:string
    readonly paused:boolean
    readonly toggled:boolean
    readonly outlineToggled:boolean
    group:string
    dynamic:boolean
    // END ZIM Display Interface
    hasProp(prop:string):boolean
    dispose():boolean
}

declare class SVGContainer extends Container implements zimDisplay {
    constructor(config_or_svg?:any, splitTypes?:boolean, geometric?:boolean, showControls?:boolean, interactive?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{svg?:any, splitTypes?:boolean, geometric?:boolean, showControls?:boolean, interactive?:boolean, style?:boolean, group?:string, inherit?:{}})
    // ZIM Display Interface
    // ZIM 4TH Methods
    tap(call:Function, distance?:number, time?:number, once?:Boolean):this
    noTap():this
    drag(config_or_boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, overCursor?:string, dragCursor?:string, all?:boolean, swipe?:boolean, localBounds?:boolean, onTop?:boolean, surround?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:boolean, reg?:boolean, removeTweens?:boolean, startBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, currentTarget?:boolean):this
    drag(config:{boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, overCursor?:string, dragCursor?:string, all?:boolean, swipe?:boolean, localBounds?:boolean, onTop?:boolean, surround?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:boolean, reg?:boolean, removeTweens?:boolean, startBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, currentTarget?:boolean}):this
    noDrag():this
    dragBoundary(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    dragRect(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    transform(config_or_move?:boolean, stretchX?:boolean, stretchY?:boolean, scale?:boolean, rotate?:boolean, allowToggle?:boolean, visible?:boolean, onTop?:boolean, showStretch?:boolean, showRotate?:boolean, showScale?:boolean, showReg?:boolean, showBorder?:boolean, borderColor?:string, borderWidth?:number, dashed?:boolean, customCursors?:boolean, handleSize?:number, regSize?:number, snapDistance?:number, snapRotation?:number, cache?:boolean, events?:boolean, ghostColor?:string, ghostWidth?:number, ghostDashed?:boolean, ghostHidden?:boolean):this
    transform(config:{move?:boolean, stretchX?:boolean, stretchY?:boolean, scale?:boolean, rotate?:boolean, allowToggle?:boolean, visible?:boolean, onTop?:boolean, showStretch?:boolean, showRotate?:boolean, showScale?:boolean, showReg?:boolean, showBorder?:boolean, borderColor?:string, borderWidth?:number, dashed?:boolean, customCursors?:boolean, handleSize?:number, regSize?:number, snapDistance?:number, snapRotation?:number, cache?:boolean, events?:boolean, ghostColor?:string, ghostWidth?:number, ghostDashed?:boolean, ghostHidden?:boolean}):this
    setSwipe(swipe?:boolean):this
    gesture(config_or_move?:boolean, scale?:boolean, rotate?:boolean, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, minScale?:number, maxScale?:number, snapRotate?:number, localBounds?:boolean, slide?:boolean, slideEffect?:number, regControl?:boolean, onTop?:boolean, surround?:boolean, circularBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    gesture(config:{move?:boolean, scale?:boolean, rotate?:boolean, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, minScale?:number, maxScale?:number, snapRotate?:number, localBounds?:boolean, slide?:boolean, slideEffect?:number, regControl?:boolean, onTop?:boolean, surround?:boolean, circularBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}}):this
    noGesture(config_or_move?:boolean, scale?:boolean, rotate?:boolean):this
    noGesture(config:{move?:boolean, scale?:boolean, rotate?:boolean}):this
    gestureBoundary(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, update?:boolean):this
    addPhysics(dynamic?:boolean, contract?:number, shape?:string, friction?:number, linear?:number, angular?:number, density?:number, restitution?:number, maskBits?:number, categoryBits?:number, physics?:Physics):this
    removePhysics():this
    impulse(x?:number, y?:number, targetX?:number, targetY?:number):this
    force(x?:number, y?:number, targetX?:number, targetY?:number):this
    torque(amount?:number):this
    sleep():this
    wake():this
    follow(damp?:number, dampY?:number, leftOffset?:number, rightOffset?:number, upOffset?:number, downOffset?:number, offsetDamp?:number, offsetDampY?:number, horizontal?:boolean, vertical?:boolean, borderLock?:boolean, borderOriginal?:boolean):this
    control(type?:string, speed?:number, speedY?:number, horizontal?:boolean, vertical?:boolean):this
    noControl():this
    contact(call:Function):this
    contactEnd(call:Function):this
    noContact():this
    noContactEnd():this
    hitTestPoint(x:number, y:number, boundsCheck?:boolean):boolean
    hitTestReg(other:DisplayObject):boolean
    hitTestRect(other:DisplayObject, num?:number, boundsCheck?:boolean):boolean
    hitTestCircle(other:DisplayObject, num?:number, boundsCheck?:boolean):boolean
    hitTestCircles(other:DisplayObject, margin?:number):boolean
    hitTestBounds(other:DisplayObject, margin?:number, boundsShape?:boolean):boolean
    boundsToGlobal(rect:createjs.Rectangle|{x:number,y:number,width:number,height:number}, flip?:boolean):createjs.Rectangle
    resetBounds(width_or_boundsX?:number, height_or_boundsY?:number, width?:number, height?:number):this
    hitTestPath(other:DisplayObject, num?:number, showPoints?:boolean):boolean
    hitTestGrid(width?:number, height?:number, cols?:number, rows?:number, x?:number, y?:number, offsetX?:number, offsetY?:number, spacingX?:number, spacingY?:number, local?:boolean, type?:string):any
    animate(config_or_props:{}|[{}], time?:number|zimVee, ease?:string|zimVee, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, sequence?:number, sequenceCall?:Function, sequenceParams?:any, sequenceReverse?:boolean|zimVee, ticker?:boolean, cjsProps?:{}, css?:boolean, protect?:boolean, override?:boolean, from?:boolean|zimVee, set?:{}|zimVee, id?:string, events?:boolean, sequenceTarget?:any, dynamic?:boolean, drag?:boolean, clamp?:boolean, startPaused?:boolean, clean?:boolean, obj?:{}|[{}]):this
    animate(config:{props:{}|[{}], time?:number|zimVee, ease?:string|zimVee, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, sequence?:number, sequenceCall?:Function, sequenceParams?:any, sequenceReverse?:boolean|zimVee, ticker?:boolean, cjsProps?:{}, css?:boolean, protect?:boolean, override?:boolean, from?:boolean|zimVee, set?:{}|zimVee, id?:string, events?:boolean, sequenceTarget?:any, dynamic?:boolean, drag?:boolean, clamp?:boolean, startPaused?:boolean, clean?:boolean, obj?:{}|[{}]}):this
    stopAnimate(ids?:string|[string]):this
    pauseAnimate(state?:boolean, ids?:string|[string]):this
    wiggle(config_or_property:string, baseAmount:number|zimVee, minAmount?:number|zimVee, maxAmount?:number|zimVee, minTime?:number|zimVee, maxTime?:number|zimVee, totalTime?:number, type?:string, ease?:string, integer?:boolean, id?:string, startType?:string):this
    wiggle(config:{property:string, baseAmount:number|zimVee, minAmount?:number|zimVee, maxAmount?:number|zimVee, minTime?:number|zimVee, maxTime?:number|zimVee, totalTime?:number, type?:string, ease?:string, integer?:boolean, id?:string, startType?:string}):this
    copyMatrix(source:DisplayObject):this
    cur(type?:string):this
    sha(color_or_shadow?:string|createjs.Shadow, offsetX?:number, offsetY?:number, blur?:number):this
    pos(x?:number, y?:number, right?:boolean, bottom?:boolean, container?:Container|Stage, index?:number, add?:boolean, reg?:boolean, regX?:boolean, regY?:boolean):this
    loc(target_or_x?:{}|DisplayObject|Point|number, y?:number, container?:Container|Stage, index?:number, add?:boolean, localToLocal?:boolean, x?:number):this
    mov(x:number, y?:number):this
    top():this
    bot():this
    ord(num:number):this
    dep(depth:number):this
    alp(alpha:number):this
    hov(value?:any, prop?:string):this
    rot(rotation:number):this
    siz(width:number, height?:number, only?:boolean):this
    ske(skewx:number, skewY?:number):this
    reg(regx:number, regY?:number, still?:boolean):this
    sca(scale:number, scaleY?:number):this
    scaleTo(boundObj?:DisplayObject, percentX?:number, percentY?:number, type?:string, boundsOnly?:boolean):this
    fit(left?:number, top?:number, width?:number, height?:number, inside?:boolean):{}
    outline(color?:string, size?:number):this
    addTo(container?:Container|Stage, index?:number, localToLocal?:boolean):this
    removeFrom(container?:Container|Stage):this
    added(call:Function, interval?:number, maxTime?:number):string
    centerReg(container?:Container|Stage, index?:number, add?:boolean):this
    center(container?:Container|Stage, index?:number, add?:boolean):this
    place(id?:string):this
    placeReg(id?:string):this
    expand(padding?:number, paddingVertical?:number):this
    setMask(mask:DisplayObject, dynamic?:boolean):this
    toggle(state?:boolean):this
    outlineToggle(state?:boolean):this
    // animate adds these:
    endTween():this
    resetTween():this
    replayTween():this
    // ZIM 4TH Properties
    readonly type:string
    width:number
    height:number
    widthOnly:number
    heightOnly:number
    depth:number
    percentSpeed:number
    percentComplete:number
    blendMode:string
    readonly paused:boolean
    readonly toggled:boolean
    readonly outlineToggled:boolean
    group:string
    dynamic:boolean
    // END ZIM Display Interface
    svg:string
}

declare class Circle extends Container implements zimShape {
    constructor(radius?:number, color?:string, borderColor?:string, borderWidth?:number, dashed?, percent?:number, strokeObj?:{}, style?:boolean, group?:string, inherit?:{})
    // ZIM Shape Interface
    readonly shape:Shape
    color:string
    colorRange:number
    readonly colorCommand:createjs.Graphics.Fill
    borderColor:string
    readonly borderColorCommand:createjs.Graphics.Stroke
    borderWidth:number
    readonly borderDashedCommand:createjs.Graphics.StrokeDash
    setColorRange(color1?:string, color2?:string):this
    linearGradient(colors:[any], ratios:[any], x0:number, y0:number, x1:number, y1:number):this
    radialGradient(colors:[any], ratios:[any], x0:number, y0:number, radius0:number, x1:number, y1:number, radius1:number):this
    // END ZIM Shape Interface
    radius:number
}

declare class Rectangle extends Container implements zimShape {
    constructor(config_or_width?:number, height?:number, color?:string, borderColor?:string, borderWidth?:number, corner?:number|any[], dashed?:boolean, strokeObj?:{}, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, height?:number, color?:string, borderColor?:string, borderWidth?:number, corner?:number|any[], dashed?:boolean, strokeObj?:{}, style?:boolean, group?:string, inherit?:{}})
    // ZIM Shape Interface
    readonly shape:Shape
    color:string
    colorRange:number
    readonly colorCommand:createjs.Graphics.Fill
    borderColor:string
    readonly borderColorCommand:createjs.Graphics.Stroke
    borderWidth:number
    readonly borderDashedCommand:createjs.Graphics.StrokeDash
    setColorRange(color1?:string, color2?:string):this
    linearGradient(colors:[any], ratios:[any], x0:number, y0:number, x1:number, y1:number):this
    radialGradient(colors:[any], ratios:[any], x0:number, y0:number, radius0:number, x1:number, y1:number, radius1:number):this
    // END ZIM Shape Interface
}

declare class Triangle extends Container implements zimShape {
    constructor(config_or_a?:number, b?:number, c?:number, color?:string, borderColor?:string, borderWidth?:number, center?:boolean, adjust?:number, dashed?:boolean, strokeObj?:{}, style?:boolean, group?:string, inherit?:{})
    constructor(config:{a?:number, b?:number, c?:number, color?:string, borderColor?:string, borderWidth?:number, center?:boolean, adjust?:number, dashed?:boolean, strokeObj?:{}, style?:boolean, group?:string, inherit?:{}})
    // ZIM Shape Interface
    readonly shape:Shape
    color:string
    colorRange:number
    readonly colorCommand:createjs.Graphics.Fill
    borderColor:string
    readonly borderColorCommand:createjs.Graphics.Stroke
    borderWidth:number
    readonly borderDashedCommand:createjs.Graphics.StrokeDash
    setColorRange(color1?:string, color2?:string):this
    linearGradient(colors:[any], ratios:[any], x0:number, y0:number, x1:number, y1:number):this
    radialGradient(colors:[any], ratios:[any], x0:number, y0:number, radius0:number, x1:number, y1:number, radius1:number):this
    // END ZIM Shape Interface
    readonly one:{x:number, y:number}
    readonly two:{x:number, y:number}
    readonly three:{x:number, y:number}
    readonly angles:number[]
}

declare class Squiggle extends Container {
    constructor(config_or_color?:string, thickness?:number, points?:number|any[], length?:number, controlLength?:number|zimVee, controlType?:string, lockControlType?:string, showControls?:boolean, lockControls?:boolean, handleSize?:number, allowToggle?:boolean, move?:boolean, ctrlclick?:boolean, dashed?:boolean, onTop?:boolean, stickColor?:string, selectColor?:string, selectPoints?:boolean, editPoints?:string|boolean, interactive?:boolean, strokeObj?:{}, style?:boolean, group?:string, inherit?:{})
    constructor(config:{color?:string, thickness?:number, points?:number|any[], length?:number, controlLength?:number|zimVee, controlType?:string, lockControlType?:string, showControls?:boolean, lockControls?:boolean, handleSize?:number, allowToggle?:boolean, move?:boolean, ctrlclick?:boolean, dashed?:boolean, onTop?:boolean, stickColor?:string, selectColor?:string, selectPoints?:boolean, editPoints?:string|boolean, interactive?:boolean, strokeObj?:{}, style?:boolean, group?:string, inherit?:{}})
    readonly shape:Shape
    color:string
    colorRange:number
    stickColor:string
    readonly colorCommand:createjs.Graphics.Fill
    thickness:number
    readonly thicknessCommand:createjs.Graphics.Stroke
    readonly dashedCommand:createjs.Graphics.StrokeDash
    addPoint(percent?:number, controlType?:string):this
    addPoints(num?:number, controlType?:string, startPoint?:number, spread?:boolean, dataOnly?:boolean, points?:any[]):this
    interpolate(num?:number, startPoint?:number, spread?:boolean):any[]
    setColorRange(color1?:string, color2?:string):this
    recordData(toJSON?:boolean):{x:number, y:number, points:any[][], color:string, borderColor:string, borderWidth:number, move:boolean, toggle:boolean, controls:boolean}
    setData(data:string|{x:number, y:number, points:any[][], color:string, borderColor:string, borderWidth:number, move:boolean, toggle:boolean, controls:boolean}, fromJSON?:boolean):this
    recordPoints(popup:boolean):any[][]
    setPoints(data:any[][]):this
    changeControl(config_or_index:number, type?:string, rect1X?:number, rect1Y?:number, rect2X?:number, rect2Y?:number, circleX?:number, circleY?:number, update?:boolean):this
    changeControl(config:{index:number, type?:string, rect1X?:number, rect1Y?:number, rect2X?:number, rect2Y?:number, circleX?:number, circleY?:number, update?:boolean}):this
    transformPoints(transformType:string, amount:number, x?:number, y?:number):this
    update(normalized?:boolean):this
    showControls():this
    hideControls():this
    traverse(obj:DisplayObject, start?:number, end?:number, time?:number):this
    readonly num:number
    points:any[]
    pointsAdjusted:any[]
    pointObjects:any[]
    readonly segmentPoints:any[]
    readonly segmentRatios:any[]
    getPointAngle(index:number):number
    getSegmentPoint(point1:any[], point2:any[]):any[]
    getCurvePoint(ratio?:number, segmentRatios?:any[], segmentPoints?:any[], getAngle?:boolean):{}
    readonly controls:Container
    controlsVisible:boolean
    readonly sticks:Container
    readonly lastSelected:Container
    readonly lastSelectedIndex:number
    types:string[]
    lockControls:boolean
    lockControlType:boolean
    allowToggle:boolean
    move:boolean
    ctrlclick:boolean
    addPointFactor:number
    addMinDistance:number
}
// ZIM Blob is only available in the module using the zim namespace

declare class Label extends Container implements zimComponent {
    constructor(config_or_text?:string|zimVee, size?:number, font?:string, color?:string, rollColor?:string, shadowColor?:string, shadowBlur?:number, align?:string, valign?:string, lineWidth?:number, lineHeight?:number, fontOptions?:string, backing?:DisplayObject, outlineColor?:string, outlineWidth?:number, backgroundColor?:string, backgroundBorderColor?:string, backgroundBorderWidth?:number, corner?:number|any[], backgroundDashed?:boolean, padding?:number, paddingHorizontal?:number, paddingVertical?:number, shiftHorizontal?:number, shiftVertical?:number, rollPersist?:boolean, labelWidth?:number, labelHeight?:number, maxSize?:number, style?:boolean, group?:string, inherit?:{})
    constructor(config:{text?:string|zimVee, size?:number, font?:string, color?:string, rollColor?:string, shadowColor?:string, shadowBlur?:number, align?:string, valign?:string, lineWidth?:number, lineHeight?:number, fontOptions?:string, backing?:DisplayObject, outlineColor?:string, outlineWidth?:number, backgroundColor?:string, backgroundBorderColor?:string, backgroundBorderWidth?:number, corner?:number|any[], backgroundDashed?:boolean, padding?:number, paddingHorizontal?:number, paddingVertical?:number, shiftHorizontal?:number, shiftVertical?:number, rollPersist?:boolean, labelWidth?:number, labelHeight?:number, maxSize?:number, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    showRollColor(visible:boolean):this
    label:createjs.Text
    color:string
    backgroundColor:string
    colorRange:number
    rollColor:string
    labelWidth:number
    labelHeight:number
    text:string
    size:number
    backing:DisplayObject
    background:Rectangle
    setColorRange(color1?:string, color2?:string):this
}
declare class LabelOnPath extends Container implements zimComponent {
    constructor(config_or_label?:string|Label, path?:Squiggle|zim.Blob, percentAngle?:number, percents?:number[], showPath?:boolean, allowToggle?:boolean, interactive?:boolean, onTop?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{label?:string|Label, path?:Squiggle|zim.Blob, percentAngle?:number, percents?:number[], showPath?:boolean, allowToggle?:boolean, interactive?:boolean, onTop?:boolean, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    toggle(state?:boolean):this
    hidePath():this
    showPath():this
    resize():this
    text:string
    readonly path:Squiggle|zim.Blob
    readonly letters:Container
    readonly numLetters:number
    readonly percents:number[]
    allowToggle:boolean
    interactive:boolean
}
declare class Button extends Container implements zimComponent {
    constructor(config_or_width?:number, height?:number, label?:string|Label, backgroundColor?:string, rollBackgroundColor?:string, color?:string, rollColor?:string, borderColor?:string, borderRollColor?:string, borderWidth?:number, corner?:number|any[], shadowColor?:string, shadowBlur?:number, hitPadding?:number, gradient?:number, gloss?:number, dashed?:boolean, backing?:DisplayObject, rollBacking?:DisplayObject, rollPersist?:boolean, icon?:DisplayObject, rollIcon?:DisplayObject, toggle?:string, toggleBacking?:DisplayObject, rollToggleBacking?:DisplayObject, toggleIcon?:DisplayObject, rollToggleIcon?:DisplayObject, toggleEvent?:string, wait?:string, waitTime?:boolean, waitBackgroundColor?:string, rollWaitBackgroundColor?:string, waitColor?:string, rollWaitColor?:string, waitModal?:boolean, waitEnabled?:boolean, waitBacking?:DisplayObject, rollWaitBacking?:DisplayObject, waitIcon?:DisplayObject, rollWaitIcon?:DisplayObject, align?:number, valign?:number, indent?:number, indentHorizontal?:number, indentVertical?:number, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, height?:number, label?:string|Label, backgroundColor?:string, rollBackgroundColor?:string, color?:string, rollColor?:string, borderColor?:string, borderRollColor?:string, borderWidth?:number, corner?:number|any[], shadowColor?:string, shadowBlur?:number, hitPadding?:number, gradient?:number, gloss?:number, dashed?:boolean, backing?:DisplayObject, rollBacking?:DisplayObject, rollPersist?:boolean, icon?:DisplayObject, rollIcon?:DisplayObject, toggle?:string, toggleBacking?:DisplayObject, rollToggleBacking?:DisplayObject, toggleIcon?:DisplayObject, rollToggleIcon?:DisplayObject, toggleEvent?:string, wait?:string, waitTime?:boolean, waitBackgroundColor?:string, rollWaitBackgroundColor?:string, waitColor?:string, rollWaitColor?:string, waitModal?:boolean, waitEnabled?:boolean, waitBacking?:DisplayObject, rollWaitBacking?:DisplayObject, waitIcon?:DisplayObject, rollWaitIcon?:DisplayObject, align?:number, valign?:number, indent?:number, indentHorizontal?:number, indentVertical?:number, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    setBackings(newBacking:DisplayObject, newRollBacking:DisplayObject):this
    setIcons(newIcon:DisplayObject, newRollIcon:DisplayObject):this
    toggle(state?:boolean):this
    wait():this
    clearWait():this
    removeWait():this
    text:string
    label:Label
    color:string
    rollColor:string
    rollPersist:Boolean
    borderColor:string
    borderRollColor:string
    hitPadding:number
    readonly backing:DisplayObject
    readonly rollBacking:DisplayObject
    readonly icon:DisplayObject
    readonly rollIcon:DisplayObject
    readonly rolled:boolean
    readonly toggled:boolean
    readonly toggleBacking:DisplayObject
    readonly rollToggleBacking:DisplayObject
    readonly toggleIcon:DisplayObject
    readonly rollToggleIcon:DisplayObject
    readonly waiting:boolean
    readonlywaitBacking:DisplayObject
    readonly rollWaitBacking:DisplayObject
    readonly waitIcon:DisplayObject
    readonly rollWaitIcon:DisplayObject
    focus:boolean

}
declare class CheckBox extends Container implements zimComponent {
    constructor(config_or_size?:number, label?:string|Label, startChecked?:boolean, color?:string, backgroundColor?:string, margin?:number, indicatorType?:string, indicatorColor?:string, tap?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{size?:number, label?:string|Label, startChecked?:boolean, color?:string, backgroundColor?:string, margin?:number, indicatorType?:string, indicatorColor?:string, tap?:boolean, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    setChecked(type:Boolean):this
    toggle(type:Boolean):this
    checked:boolean
    toggled:boolean
    label:Label
    text:string
    indicator:Shape
    indicatorColor:string
    backgroundColor:string
}
declare class RadioButtons extends Container implements zimComponent {
    constructor(config_or_size?:number, buttons?:string[]|{}[], vertical?:boolean, color?:string, backgroundColor?:string, spacing?:number, margin?:number, always?:boolean, indicatorColor?:string, style?:boolean, group?:string, inherit?:{})
    constructor(config:{size?:number, buttons?:string[]|{}[], vertical?:boolean, color?:string, backgroundColor?:string, spacing?:number, margin?:number, always?:boolean, indicatorColor?:string, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    setSelected(num:number):this
    readonly selected:{index:number, selected:boolean, label:Label}
    selectedIndex:number
    label:Label
    text:string
    id:any
    buttons:Container[]
    labels:Label[]
    indicators:Shape[]
}
declare class Toggle extends Container implements zimComponent {
    constructor(config_or_width?:number, height?:number, label?:string|Label, startToggled?:boolean, backgroundColor?:string, margin?:number, indicatorType?:string, indicatorColor?:string, toggleBackgroundColor?:string, color?:string, borderColor?:string, borderWidth?:number, corner?:number|number[], indicatorCorner?:number|number[], shadowColor?:string, shadowBlur?:number, time?:number, labelLeft?:string|Label, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, height?:number, label?:string|Label, startToggled?:boolean, backgroundColor?:string, margin?:number, indicatorType?:string, indicatorColor?:string, toggleBackgroundColor?:string, color?:string, borderColor?:string, borderWidth?:number, corner?:number|number[], indicatorCorner?:number|number[], shadowColor?:string, shadowBlur?:number, time?:number, labelLeft?:string|Label, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    toggle(state:boolean):this
    readonly toggled:boolean
    readonly text:string
    readonly indicator:DisplayObject
    readonly background:Rectangle
    readonly label:Label
    readonly labelLeft:Label
}
declare class Tip extends Label implements zimComponent {
    constructor(config_or_text?:string, align?:string, valign?:string, margin?:number, marginH?:number, marginV?:number, outside?:boolean, target?:DisplayObject,  size?:number, font?:string, color?:string, rollColor?:string, shadowColor?:string, shadowBlur?:number, textAlign?:string, textValign?:string, lineWidth?:number, lineHeight?:number, fontOptions?:string, backing?:DisplayObject, outlineColor?:string, outlineWidth?:number, backgroundColor?:string, backgroundBorderColor?:string, backgroundBorderWidth?:number, corner?:number|any[], backgroundDashed?:boolean, padding?:number, paddingHorizontal?:number, paddingVertical?:number, shiftHorizontal?:number, shiftVertical?:number, rollPersist?:boolean, labelWidth?:number, labelHeight?:number, maxSize?:number, style?:boolean, group?:string, inherit?:{})
    constructor(config:{text?:string, align?:string, valign?:string, margin?:number, marginH?:number, marginV?:number, outside?:boolean, target?:DisplayObject,  size?:number, font?:string, color?:string, rollColor?:string, shadowColor?:string, shadowBlur?:number, textAlign?:string, textValign?:string, lineWidth?:number, lineHeight?:number, fontOptions?:string, backing?:DisplayObject, outlineColor?:string, outlineWidth?:number, backgroundColor?:string, backgroundBorderColor?:string, backgroundBorderWidth?:number, corner?:number|any[], backgroundDashed?:boolean, padding?:number, paddingHorizontal?:number, paddingVertical?:number, shiftHorizontal?:number, shiftVertical?:number, rollPersist?:boolean, labelWidth?:number, labelHeight?:number, maxSize?:number, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    show(delay?:number, time?:number):this
    hide():this
    clear():this
    align:string
    valign:string
}
declare class Panel extends Container implements zimComponent {
    constructor(config_or_width?:number, height?:number, titleBar?:string|Label, titleBarColor?:string, titleBarBackroundColor?:string, titleBarHeight?:number, backgroundColor?:string, borderColor?:string, borderWidth?:number, corner?:number|any[], arrow?:boolean, align?:string, shadowColor?:string, shadowBlur?:number, draggable?:boolean, boundary?:Boundary|{}, extraButton?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, height?:number, titleBar?:string|Label, titleBarColor?:string, titleBarBackroundColor?:string, titleBarHeight?:number, backgroundColor?:string, borderColor?:string, borderWidth?:number, corner?:number|any[], arrow?:boolean, align?:string, shadowColor?:string, shadowBlur?:number, draggable?:boolean, boundary?:Boundary|{}, extraButton?:boolean, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    nextPanel(index?:number, event?:boolean):this
    readonly titleBar:Rectangle
    readonly label:Label
    readonly text:string
    readonly arrow:Shape
    readonly background:Rectangle
    readonly overlay:Rectangle
    readonly extraButton:Label
}
declare class Pane extends Container implements zimComponent {
    constructor(config_or_width?:number, height?:number, label?:string|Label, backgroundColor?:string, color?:string, draggable?:boolean, resets?:boolean, modal?:boolean, corner?:number|any[], backdropColor?:string, shadowColor?:string, shadowBlur?:number, center?:boolean, displayClose?:boolean, backdropClose?:boolean, backing?:DisplayObject, fadeTime?:number, container?:Stage|Container, titleBar?:string|Label, titleBarColor?:string, titleBarBackroundColor?:string, titleBarHeight?:number, close?:boolean, closeColor?:string, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, height?:number, label?:string|Label, backgroundColor?:string, color?:string, draggable?:boolean, resets?:boolean, modal?:boolean, corner?:number|any[], backdropColor?:string, shadowColor?:string, shadowBlur?:number, center?:boolean, displayClose?:boolean, backdropClose?:boolean, backing?:DisplayObject, fadeTime?:number, container?:Stage|Container, titleBar?:string|Label, titleBarColor?:string, titleBarBackroundColor?:string, titleBarHeight?:number, close?:boolean, closeColor?:string, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    show():this
    hide():this
    readonly display:Rectangle
    text:string
    label:Label
    titleBar:Container
    titleBarLabel:Label
    titleBarBacking:Rectangle
    close:Shape
    readonly backdrop:Shape
    resetX:number
    resetY:number
}

// Window is only available in the module using the zim namespace

declare class Layer extends Container implements zimComponent {
    constructor(config_or_width?:number, height?:number, titleBar?:string|number|Label, titleBarContainer?:Container, backgroundColor?:string, rollBackgroundColor?:string, selectedBackgroundColor?:string, color?:string, rollColor?:string, selectedColor?:string, borderWidth?:number, borderColor?:string, dashed?:boolean, transformObject?:{}, titleBarWidth?:number, titleBarHeight?:number, titleBarDraggable?:string, close?:boolean, closeColor?:string, closeBackgroundColor?:string, closeIndicatorColor?:string, anchor?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, height?:number, titleBar?:string|number|Label, titleBarContainer?:Container, backgroundColor?:string, rollBackgroundColor?:string, selectedBackgroundColor?:string, color?:string, rollColor?:string, selectedColor?:string, borderWidth?:number, borderColor?:string, dashed?:boolean, transformObject?:{}, titleBarWidth?:number, titleBarHeight?:number, titleBarDraggable?:string, close?:boolean, closeColor?:string, closeBackgroundColor?:string, closeIndicatorColor?:string, anchor?:boolean, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    transformControls:{}
    anchor:boolean
    readonly toggled:boolean
    readonly titleBar:Container
    titleBarDraggable:boolean
    readonly checkBox:CheckBox
    readonly button:Button
    readonly label:Label
}

declare class Waiter extends Container implements zimComponent {
    constructor(config_or_container?:Stage|Container, speed?:number, foregroundColor?:string, backgroundColor?:string, circleColor?:string, corner?:number|any[], shadowColor?:string, shadowBlur?:number, fadeTime?:number, style?:boolean, group?:string, inherit?:{})
    constructor(config:{container?:Stage|Container, speed?:number, foregroundColor?:string, backgroundColor?:string, circleColor?:string, corner?:number|any[], shadowColor?:string, shadowBlur?:number, fadeTime?:number, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface

    titleBarPos(x?:number, y?:number, right?:boolean, bottom?:boolean):this
    resetTitleBar():this
    toggle(state?:boolean):this
    resize(dispatch?:boolean):this
    display:Shape
}
declare class ProgressBar extends Container implements zimComponent {
    constructor(config_or_barType?:string, foregroundColor?:string, backgroundColor?:string, borderColor?:string, borderWidth?:number, padding?:number, label?:Label, color?:string, labelPosition?:string, percentage?:number, corner?:number|any[], shadowColor?:string, shadowBlur?:number, backing?:DisplayObject, delay?:number, fastClose?:boolean, container?:Stage|Container, style?:boolean, group?:string, inherit?:{})
    constructor(config:{barType?:string, foregroundColor?:string, backgroundColor?:string, borderColor?:string, borderWidth?:number, padding?:number, label?:Label, color?:string, labelPosition?:string, percentage?:number, corner?:number|any[], shadowColor?:string, shadowBlur?:number, backing?:DisplayObject, delay?:number, fastClose?:boolean, container?:Stage|Container, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    show():this
    hide():this
    percent:number
    readonly label:Label
    readonly backing:DisplayObject
    readonly bar:DisplayObject
}
declare class Indicator extends Container implements zimComponent {
    constructor(config_or_width?:number, height?:number, num?:number, foregroundColor?:string, backgroundColor?:string, borderColor?:string, borderWidth?:number, backdropColor?:string, corner?:number|any[], indicatorType?:string, fill?:boolean, scale?:number, lightScale?:number, interactive?:boolean, shadowColor?:string, shadowBlur?:number, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, height?:number, num?:number, foregroundColor?:string, backgroundColor?:string, borderColor?:string, borderWidth?:number, backdropColor?:string, corner?:number|any[], indicatorType?:string, fill?:boolean, scale?:number, lightScale?:number, interactive?:boolean, shadowColor?:string, shadowBlur?:number, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    selectedIndex:number
    readonly num:number
    readonly backdrop:Rectangle
    lights:Circle[]|Rectangle[]
    lightsContainer:Container
}
declare class List extends zim.Window implements zimComponent {
    constructor(config_or_width?:number, height?:number, list?:any[], viewNum?:number, vertical?:boolean, currentSelected?:boolean, align?:string, valign?:string, labelAlign?:string, labelValign?:string, labelIndent?:number, labelIndentHorizontal?:boolean, labelIndentVertical?:boolean, indent?:number, spacing?:number, backgroundColor?:string, rollBackgroundColor?:string, selectedBackgroundColor?:string, backdropColor?:string, color?:string, selectedColor?:string, rollColor?:string, borderColor?:string, borderWidth?:number, padding?:number, corner?:number|any[], swipe?:boolean, scrollBarActive?:boolean, scrollBarDrag?:boolean, scrollBarColor?:string, scrollBarAlpha?:number, scrollBarFade?:boolean, scrollBarH?:boolean, scrollBarV?:boolean, scrollBarOverlay?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:string, shadowColor?:string, shadowBlur?:number, paddingHorizontal?:number, paddingVertical?:number, scrollWheel?:boolean, damp?:number, titleBar?:string|Label, titleBarColor?:string, titleBarBackgroundColor?:string, titleBarHeight?:number, draggable?:boolean, boundary?:{}|Boundary, onTop?:boolean, close?:boolean, closeColor?:string, excludeCustomTap?:boolean, organizer?:Organizer, checkBox?:boolean, pulldown?:boolean, clone?:boolean, cancelCurrentDrag?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, height?:number, list?:any[], viewNum?:number, vertical?:boolean, currentSelected?:boolean, align?:string, valign?:string, labelAlign?:string, labelValign?:string, labelIndent?:number, labelIndentHorizontal?:boolean, labelIndentVertical?:boolean, indent?:number, spacing?:number, backgroundColor?:string, rollBackgroundColor?:string, selectedBackgroundColor?:string, backdropColor?:string, color?:string, selectedColor?:string, rollColor?:string, borderColor?:string, borderWidth?:number, padding?:number, corner?:number|any[], swipe?:boolean, scrollBarActive?:boolean, scrollBarDrag?:boolean, scrollBarColor?:string, scrollBarAlpha?:number, scrollBarFade?:boolean, scrollBarH?:boolean, scrollBarV?:boolean, scrollBarOverlay?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:string, shadowColor?:string, shadowBlur?:number, paddingHorizontal?:number, paddingVertical?:number, scrollWheel?:boolean, damp?:number, titleBar?:string|Label, titleBarColor?:string, titleBarBackgroundColor?:string, titleBarHeight?:number, draggable?:boolean, boundary?:{}|Boundary, onTop?:boolean, close?:boolean, closeColor?:string, excludeCustomTap?:boolean, organizer?:Organizer, checkBox?:boolean, pulldown?:boolean, clone?:boolean, cancelCurrentDrag?:boolean, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    animateTo(index?:number, timePerItem?:number):this
    addAt(items?:any, index?:number, clone?:boolean):this
    removeAt(number?:number, index?:number):this
    clear():this
    first():this
    last():this
    static slider(label?:string|Label, min?:number, max?:number, val?:number, call?:Function, step?:number, obj?:any, property?:string, paddingLeft?:number, paddingRight?:number):Container
    static checkBox(label?:string|Label, checked?:boolean, call?:Function, step?:number, obj?:any, property?:string, paddingLeft?:number, paddingRight?:number):Container
    static colorPicker(label?:string|Label, color?:string, picker?:ColorPicker, call?:Function, step?:number, obj?:any, property?:string, paddingLeft?:number, paddingRight?:number):Container
    static checkItem(text?:string, width?:number, paddingHorizontal?:number, paddingVertical?:number, color?:string, rollColor?:string, backgroundColor?:string, rollBackgroundColor?:string, selectedColor?:string, selectedRollColor?:string, selectedBackgroundColor?:string, selectedRollBackgroundColor?:string):Container
    setCheck(index?:number, type?:boolean):this
    setChecks(type?:boolean):this
    getCheck(index?:number):boolean
    selectedIndex:number
    selectedIndexPlusPosition:number
    readonly selected:DisplayObject
    readonly text:string
    readonly label:Label
    readonly list:any[]
    readonly items:any[]
    readonly itemsText:string[]
    readonly length:number
    readonly tabs:Tabs
    readonly checkBoxes:[CheckBox]
}
declare class Stepper extends Container implements zimComponent {
    constructor(config_or_list?:string[]|number[], width?:number, backgroundColor?:string, borderColor?:string, borderWidth?:number, label?:Label, color?:string, vertical?:boolean, arrows?:number, corner?:number|any[], shadowColor?:string, shadowBlur?:number, loop?:boolean, display?:boolean, press?:boolean, hold?:boolean, holdDelay?:number, holdSpeed?:number, draggable?:boolean, dragSensitivity?:number, dragRange?:number, stepperType?:string, min?:number, max?:number, step?:number, step2?:number, arrows2?:boolean, arrows2Scale?:number, keyEnabled?:boolean, keyArrows?:number, rightForward?:boolean, downForward?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{list?:string[]|number[], width?:number, backgroundColor?:string, borderColor?:string, borderWidth?:number, label?:Label, color?:string, vertical?:boolean, arrows?:number, corner?:number|any[], shadowColor?:string, shadowBlur?:number, loop?:boolean, display?:boolean, press?:boolean, hold?:boolean, holdDelay?:number, holdSpeed?:number, draggable?:boolean, dragSensitivity?:number, dragRange?:number, stepperType?:string, min?:number, max?:number, step?:number, step2?:number, arrows2?:boolean, arrows2Scale?:number, keyEnabled?:boolean, keyArrows?:number, rightForward?:boolean, downForward?:boolean, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    next():void
    prev():void
    selectedIndex:number
    currentValue:string|number
    currentValueEvent:string|number
    stepperArray:string[]|number[]
    containerPrev:Container
    containerNext:Container
    arrowPrev:Triangle
    arrowNext:Triangle
    prev2:Triangle
    next2:Triangle
    arrowPrev2:Triangle
    arrowNext2:Triangle
    min:number
    max:number
    label:Label
    textBox:Shape
    keyFocus:Boolean
}
declare class Slider extends Container implements zimComponent {
    constructor(config_or_min?:number, max?:number, step?:number, button?:Button, barLength?:number, barWidth?:number, barColor?:string, vertical?:boolean, useTicks?:boolean, inside?:boolean, keyArrows?:number, keyArrowsStep?:number, keyArrowsH?:boolean, keyArrowsV?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{min?:number, max?:number, step?:number, button?:Button, barLength?:number, barWidth?:number, barColor?:string, vertical?:boolean, useTicks?:boolean, inside?:boolean, keyArrows?:number, keyArrowsStep?:number, keyArrowsH?:boolean, keyArrowsV?:boolean, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    currentValue:number
    currentValueEvent:number
    readonly min:number
    readonly max:number
    readonly step:number
    bar:Rectangle
    button:Button
    ticks:Shape
    keyArrowsH:number
    keyArrowsV:number
    keyFocus:Boolean
}
declare class Dial extends Container implements zimComponent {
    constructor(config_or_min?:number, max?:number, step?:number, width?:number, backgroundColor?:string, indicatorColor?:string, indicatorScale?:number, indicatorType?:string, innerCircle?:boolean, innerScale?:number, useTicks?:boolean, innerTicks?:boolean, tickColor?:string, limit?:boolean, keyArrows?:number, keyArrowsStep?:number, keyArrowsH?:boolean, keyArrowsV?:boolean, continuous?:boolean, continuousMin?:number, continuousMax?:number, style?:boolean, group?:string, inherit?:{})
    constructor(config:{min?:number, max?:number, step?:number, width?:number, backgroundColor?:string, indicatorColor?:string, indicatorScale?:number, indicatorType?:string, innerCircle?:boolean, innerScale?:number, useTicks?:boolean, innerTicks?:boolean, tickColor?:string, limit?:boolean, keyArrows?:number, keyArrowsStep?:number, keyArrowsH?:boolean, keyArrowsV?:boolean, continuous?:boolean, continuousMin?:number, continuousMax?:number, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    currentValue:number
    currentValueEvent:number
    readonly min:number
    readonly max:number
    readonly step:number
    readonly continuous:boolean
    continuousMin:number
    continuousMax:number
    backing:Circle
    inner:Circle
    inner2:Circle
    ticks:Container
    indicator:Triangle|Circle|Rectangle
    indicatorShape:Shape
    keyArrowsH:number
    keyArrowsV:number
    keyFocus:Boolean
}
declare class Tabs extends Container implements zimComponent {
    constructor(config_or_width?:number, height?:number, tabs?:string[]|{}[], backgroundColor?:string, rollBackgroundColor?:string, offBackgroundColor?:string, color?:string, rollColor?:string, offColor?:string, vertical?:boolean, spacing?:number, currentEnabled?:boolean, currentSelected?:boolean, corner?:number|any[], base?:string, keyEnabled?:boolean, gradient?:number, gloss?:number, backing?:DisplayObject, rollBacking?:DisplayObject, wait?:string, waitTime?:number, waitBackgroundColor?:string, rollWaitBackgroundColor?:string, waitColor?:string, rollWaitColor?:string, waitModal?:boolean, waitEnabled?:boolean, backdropColor?:string, align?:number, valign?:number, labelAlign?:string, labelValign?:string, labelIndent?:number, labelIndentHorizontal?:number, labelIndentVertical?:number, indent?:number, useTap?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, height?:number, tabs?:string[]|{}[], backgroundColor?:string, rollBackgroundColor?:string, offBackgroundColor?:string, color?:string, rollColor?:string, offColor?:string, vertical?:boolean, spacing?:number, currentEnabled?:boolean, currentSelected?:boolean, corner?:number|any[], base?:string, keyEnabled?:boolean, gradient?:number, gloss?:number, backing?:DisplayObject, rollBacking?:DisplayObject, wait?:string, waitTime?:number, waitBackgroundColor?:string, rollWaitBackgroundColor?:string, waitColor?:string, rollWaitColor?:string, waitModal?:boolean, waitEnabled?:boolean, backdropColor?:string, align?:number, valign?:number, labelAlign?:string, labelValign?:string, labelIndent?:number, labelIndentHorizontal?:number, labelIndentVertical?:number, indent?:number, useTap?:boolean, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    selectedIndex:number
    selected:Button
    tabs:any[]
    backgroundColor:string
    rollBackgroundColor:string
    offBackgroundColor:string
    color:string
    offColor:string
    rollColor:string
    text:string
    label:Label
    buttons:Button[]
    labels:Label[]
    backdrop:Rectangle
    keyEnabled:boolean
    keyFocus:Boolean
}
declare class Pad extends Container implements zimComponent {
    constructor(config_or_width?:number, cols?:number, rows?:number, keys?:string[]|{}[], backgroundColor?:string, rollBackgroundColor?:string, offBackgroundColor?:string, color?:string, rollColor?:string, offColor?:string, spacing?:number, currentEnabled?:boolean, currentSelected?:boolean, corner?:number|any[], labelColor?:string, gradient?:number, gloss?:number, backing?:DisplayObject, rollBacking?:DisplayObject, wait?:string, waitTime?:number, waitBackgroundColor?:string, rollWaitBackgroundColor?:string, waitColor?:string, rollWaitColor?:string, waitModal?:boolean, waitEnabled?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, cols?:number, rows?:number, keys?:string[]|{}[], backgroundColor?:string, rollBackgroundColor?:string, offBackgroundColor?:string, color?:string, rollColor?:string, offColor?:string, spacing?:number, currentEnabled?:boolean, currentSelected?:boolean, corner?:number|any[], labelColor?:string, gradient?:number, gloss?:number, backing?:DisplayObject, rollBacking?:DisplayObject, wait?:string, waitTime?:number, waitBackgroundColor?:string, rollWaitBackgroundColor?:string, waitColor?:string, rollWaitColor?:string, waitModal?:boolean, waitEnabled?:boolean, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    selectedIndex:number
    selected:Button
    color:string
    rollColor:string
    offColor:string
    text:string
    label:Label
    buttons:Button[]
    labels:Label[]
    tabs:Tabs[]
    keyEnabled:boolean
}
declare class ColorPicker extends Container implements zimComponent {
    constructor(config_or_width?:number, colors?:string[], cols?:number, spacing?:number, greyPicker?:boolean, alphaPicker?:boolean, startBackgroundColor?:string, draggable?:boolean, shadowColor?:string, shadowBlur?:number, buttonBar?:boolean, circles?:boolean, indicator?:boolean, backgroundColor?:string, keyArrows?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, colors?:string[], cols?:number, spacing?:number, greyPicker?:boolean, alphaPicker?:boolean, startBackgroundColor?:string, draggable?:boolean, shadowColor?:string, shadowBlur?:number, buttonBar?:boolean, circles?:boolean, indicator?:boolean, backgroundColor?:string, keyArrows?:boolean, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    show():this
    hide():this
    selectedColor:string
    currentValue:string
    currentValueEvent:string
    selectedAlpha:number
    selectedIndex:number
    swatch:Rectangle
    swatchbackground:Shape
    swatchText:Label
    grip:Shape
    background:Rectangle
    okBut:Button
    closeBut:Button
    indicator:Shape
    alpaBacking:Rectangle
    alphaBut:Button
    alphaSlider:Slider
    alphaText:Label
    keyFocus:Boolean
}
declare class Keyboard extends Container implements zimComponent {
    constructor(config_or_labels?:Label[]|Label, backgroundColor?:string, color?:string, shiftBackgroundColor?:string, shiftHoldBackgroundColor?:string, placeBackgroundColor?:string, placeColor?:string, cursorColor?:string, shadeAlpha?:number, borderColor?:string, borderWidth?:number, margin?:number, corner?:number|any[], draggable?:boolean, placeClose?:boolean, shadowColor?:string, shadowBlur?:number, container?:Container, data?:[any], place?:boolean, special?:string, rtl?:boolean, hardKeyboard?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{labels?:Label[]|Label, backgroundColor?:string, color?:string, shiftBackgroundColor?:string, shiftHoldBackgroundColor?:string, placeBackgroundColor?:string, placeColor?:string, cursorColor?:string, shadeAlpha?:number, borderColor?:string, borderWidth?:number, margin?:number, corner?:number|any[], draggable?:boolean, placeClose?:boolean, shadowColor?:string, shadowBlur?:number, container?:Container, data?:[any], place?:boolean, special?:string, rtl?:boolean, hardKeyboard?:boolean, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    show(index?:number):this
    hide():this
    showPlace():this
    hidePlace():this
    addLabels(labels:Label[]|Label):this
    removeLabels(labels:Label[]|Label):this
    resize():this
    readonly data:any[]
    readonly labels:Label[]
    selectedLabel:Label
    selectedIndex:number
}
declare class Organizer extends Tabs implements zimComponent {
    constructor(config_or_width?:number, list?:List, useAdd?:boolean, useRemove?:boolean, usePosition?:boolean, autoAdd?:boolean, autoRemove?:boolean, autoPosition?:boolean, addForward?:boolean, removeForward?:boolean, backgroundColor?:string, rollBackgroundColor?:string, selectedBackgroundColor?:string, color?:string,  rollColor?:string, selectedColor?:string, spacing?:number, corner?:number|any[], keyEnabled?:boolean, gradient?:number, gloss?:number, backdropColor?:string, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, list?:List, useAdd?:boolean, useRemove?:boolean, usePosition?:boolean, autoAdd?:boolean, autoRemove?:boolean, autoPosition?:boolean, addForward?:boolean, removeForward?:boolean, backgroundColor?:string, rollBackgroundColor?:string, selectedBackgroundColor?:string, color?:string,  rollColor?:string, selectedColor?:string, spacing?:number, corner?:number|any[], keyEnabled?:boolean, gradient?:number, gloss?:number, backdropColor?:string, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    add(index?:number, item?:any, clone?:boolean):this
    up(index?:number):this
    down(index?:number):this
    toTop(index?:number):this
    toBottom(index?:number):this
    remove(index?:number):this
    setButtons():this
    list:List
    readonly lastIndex:number
    readonly orgIndex:number
    readonly orgItem:string|DisplayObject
    readonly orgType:string
    readonly removedItem:DisplayObject
}
declare class Marquee extends Container implements zimComponent {
    constructor(config_or_width?:number, height?:number, items?:[any], transition?:string, speed?:number, direction?:string, marginLeft?:number, marginRight?:number, marqueeType?:string, borderColor?:string, borderWidth?:number, refresh?:number, mix?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, height?:number, items?:[any], transition?:string, speed?:number, direction?:string, marginLeft?:number, marginRight?:number, marqueeType?:string, borderColor?:string, borderWidth?:number, refresh?:number, mix?:boolean, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    add(obj:any, url?:string, target?:string):this
    remove(obj:any):this
    go(obj:any):this
    pause(state?:boolean, immediate?:boolean):this
    load(data:string|[any]|{any}, path?:string):this
    readonly content:DisplayObject
    readonly pages:Pages
    readonly button:Button
    readonly indicator:Indicator
    readonly selectedIndex:number
    readonly selected:DisplayObject
    readonly lastSelected:DisplayObject
    time:number
    readonly speed:number
    readonly paused:boolean
    readonly interval:boolean
    readonly left:Container
    readonly right:Container
    readonly icon:Container
    readonly label:Label
    readonly marqueeLoader:Queue
}
declare class Loader extends Button implements zimComponent {
    constructor(config_or_width?:number, height?:number, label?:string|Label, backgroundColor?:string, rollBackgroundColor?:string, color?:string, rollColor?:string, borderColor?:string, borderWidth?:number, corner?:number|any[], shadowColor?:string, shadowBlur?:number, hitPadding?:number, gradient?:number, gloss?:number, dashed?:boolean, backing?:DisplayObject, rollBacking?:DisplayObject, rollPersist?:boolean, icon?:DisplayObject, rollIcon?:DisplayObject, toggle?:string, rollToggle?:DisplayObject, toggleEvent?:string, frame?:Frame, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, height?:number, label?:string|Label, backgroundColor?:string, rollBackgroundColor?:string, color?:string, rollColor?:string, borderColor?:string, borderWidth?:number, corner?:number|any[], shadowColor?:string, shadowBlur?:number, hitPadding?:number, gradient?:number, gloss?:number, dashed?:boolean, backing?:DisplayObject, rollBacking?:DisplayObject, rollPersist?:boolean, icon?:DisplayObject, rollIcon?:DisplayObject, toggle?:string, rollToggle?:DisplayObject, toggleEvent?:string, frame?:Frame, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    resize():this
    save(content?:DisplayObject, x?:number, y?:number, width?:number, height?:number, url?:string, cached?:boolean, cachedBounds?:any, type?:string, data?:boolean):this
    tag:HTMLInputElement
}
declare class TextArea extends Container implements zimComponent {
    constructor(config_or_width?:number, height?:number, size?:number, padding?:number, color?:string, backgroundColor?:string, borderColor?:string, borderWidth?:number, corner?:number|any[], shadowColor?:string, shadowBlur?:number, dashed?:boolean, id?:string, placeholder?:string, readOnly?:boolean, spellCheck?:boolean, password?:boolean, frame?:Frame, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, height?:number, size?:number, padding?:number, color?:string, backgroundColor?:string, borderColor?:string, borderWidth?:number, corner?:number|any[], shadowColor?:string, shadowBlur?:number, dashed?:boolean, id?:string, placeholder?:string, readOnly?:boolean, spellCheck?:boolean, password?:boolean, frame?:Frame, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    setFocus(type:boolean):this
    resize():this
    currentValue:string
    text:string
    focus:boolean
    readOnly:boolean
    tag:HTMLTextAreaElement
    background:Rectangle
    keyFocus:boolean
}

declare class Tag extends Container implements zimComponent {
    constructor(config_or_width?:number, height?:number, id?:string, frame?:Frame, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, height?:number, id?:string, frame?:Frame, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    add(htmlString:string):this
    resize():this
    readonly tagID:string
    tag:HTMLDivElement
    innerHTML:string
}

// ++++++++++++++++++++++++++++++++++++++
// ZIM CONTROLS
declare var ANIMATE:boolean
declare var OPTIMIZE:boolean
declare var ACTIONEVENT:string
declare var STYLE:{}
declare var POSREG:boolean
declare var DRAGALL:boolean
declare var Ticker:{
    always:(stage?: Stage) => void,
    alwaysOff:(stage?: Stage) => void,
    add:(f:Function, stage?: Stage) => void,
    remove:(f:Function) => void,
    removeAll:(stage?: Stage) => void,
    has:(f:Function, stage?: Stage) => boolean,
    setFPS:(mobile?:Function, pc?: Stage) => void,
    setTimingMode:(mode?:string) => void,
    raw:(f:Function) => void,
    removeRaw:(id:any) => void,
    dispose:(stage?: Stage) => void,
    update:boolean,
    list:Dictionary,
    framerate:number,
}
declare class Accessibility extends createjs.EventDispatcher {
    constructor (config_or_appName?:string, tabOrder?:DisplayObject[], tabIndex?:number, cycle?:boolean, decimals?:number, frame?:Frame, application?:boolean, alwaysHighlight?:boolean, AHTime?:number, AHColor?:string, AHBorderWidth?:number, AHBorderPadding?:number, AHAlpha?:number, AHObject?:DisplayObject, AHObjectScale?:number)
    constructor (config:{appName?:string, tabOrder?:DisplayObject[], tabIndex?:number, cycle?:boolean, decimals?:number, frame?:Frame, application?:boolean, alwaysHighlight?:boolean, AHTime?:number, AHColor?:string, AHBorderWidth?:number, AHBorderPadding?:number, AHAlpha?:number, AHObject?:DisplayObject, AHObjectScale?:number})
    tab(dir:1|-1):void
    changeTitle(DisplayObject:number, title?:string, activate?:boolean):void
    talk(words:string):void
    resize(target?:DisplayObject):void
    readonly type:string
    tabOrder:DisplayObject[]
    tabIndex:number
    currentObject:DisplayObject
    readonly activatedObject:DisplayObject
    readonly startAppTag:HTMLElement
    readonly endAppTag:HTMLElement
    cycle:boolean
    decimals:number
    readonly frame:Frame
    alwaysHighlight:boolean
    AHTime:number
    AHColor:string
    AHBorderWidth:number
    AHBorderPadding:number
    AHAlpha:number
    AHObject:DisplayObject
    AHObjectScale:number
    enabled:boolean
}
declare class Swipe extends createjs.EventDispatcher {
    constructor (config_or_obj:DisplayObject, distance?:number, duration?:number)
    constructor (config:{obj:DisplayObject, distance?:number, duration?:number})
    enable():void
    disable():void
    readonly type:string
    distance:number
    duration:number
    direction:string
    obj:DisplayObject
    active:boolean
}
declare class Pages extends Container {
    constructor (config_or_pages?:DisplayObject[]|{page:DisplayObject, swipe?:DisplayObject[]}[], transition?:string, speed?:number, transitionTable?:any[][], holder?:Stage|Container)
    constructor (config:{pages?:DisplayObject[]|{page:DisplayObject, swipe?:DisplayObject[]}[], transition?:string, speed?:number, transitionTable?:any[][], holder?:Stage|Container})
    addPage(page, swipeArray?:string[]):void
    removePage(page):void
    setSwipeArray(page, swipeArray?:string[]):void
    go(newPage:DisplayObject|number, direction:string, trans?:string, ms?:number):void
    resize():void
    pause():void
    unpause():void
    puff(time:number):void
    settle():void
    disable():void
    enable():void
    dispose():boolean
    readonly type:string
    speed:number
    transitionTable:any[][]
    readonly page:DisplayObject
    pages:DisplayObject[]|{page:DisplayObject, swipe?:DisplayObject[]}[]
    readonly lastPage:DisplayObject
    readonly direction:string
    readonly transitioning:boolean
    active:boolean
    swipe:Swipe
}
declare class HotSpots extends Container {
    constructor (config_or_spots:{page:Container, rect:number[]|DisplayObject, call:Function}[], local?:boolean, mouseDowns?:boolean)
    constructor (config:{spots:{page:Container, rect:number[]|DisplayObject, call:Function}[], local?:boolean, mouseDowns?:boolean})
    show():void
    hide():void
    addHotSpot(page:DisplayObject,rect:number[]|DisplayObject,call:Function):void
    removeHotSpots(page:DisplayObject,rect:number[]|DisplayObject):void
    readonly type:string
}
declare class HotSpot extends Container {
    constructor (config_or_obj:Stage|Container, x:number, y:number, width:number, height:number, call:Function, local?:boolean)
    constructor (config:{obj:Stage|Container, x:number, y:number, width:number, height:number, call:Function, local?:boolean})
    show():void
    hide():void
    readonly type:string
}
declare class Manager {
    constructor ()
    add(element:DisplayObject|DisplayObject[]):void
    remove(element:DisplayObject|DisplayObject[]):void
    resize():void
    dispose():boolean
    toggle(state?:boolean):this
    readonly type:string
    items:DisplayObject[]
}
declare class ResizeManager extends Manager {
    constructor ()
}
declare class TransformManager extends Manager {
    constructor (objects:DisplayObject|DisplayObject[], persistID?:string)
    show(obj:DisplayObject)
    hide(obj:DisplayObject)
    hideAll():void
    persist(id:string):void
    clearPersist(id:string):void
    savePersist():void
    stopPersist():void
    readonly type:string
    currentObject:DisplayObject
    persistData:any // could be data for Blob, Squiggle, transform
}
declare class Guide extends Container {
    constructor (config_or_obj?:Stage|Container, vertical?:boolean, percent?:boolean, hideKey?:string, pixelKey?:string)
    constructor (config:{obj?:Stage|Container, vertical?:boolean, percent?:boolean, hideKey?:string, pixelKey?:string})
    resize():void
    readonly type:string
    pixels:boolean
}
declare class GuideManager extends Manager {
    constructor ()
}
declare class Grid extends Container {
    constructor (config_or_obj?:Stage|Container, color?:string, percent?:boolean, hideKey?:string, pixelKey?:string)
    constructor (config:{obj?:Stage|Container, color?:string, percent?:boolean, hideKey?:string, pixelKey?:string})
    resize():void
    readonly type:string
    pixels:boolean
}
declare class GridManager extends Manager {
    constructor ()
}
declare class Layout extends createjs.EventDispatcher {
    constructor (config_or_holder:Stage|Container, regions:{}[], lastmargin?:number, backgroundColor?:string, vertical?:boolean, regionShape?:Shape, scalingObject?:Stage|Container, hideKey?:string)
    constructor (config:{holder:Stage|Container, regions:{}[], lastmargin?:number, backgroundColor?:string, vertical?:boolean, regionShape?:Shape, scalingObject?:Stage|Container, hideKey?:string})
    resize():void
    dispose():boolean
    addShape(shape:Shape):void
    removeShape():void
    disable():void
    enable():void
    toggle(state?:boolean):this
    readonly type:string
    readonly toggled:boolean
    regions:{}[]
}
declare class LayoutManager extends Manager {
    constructor ()
    enable():void
    disable():void
}
declare class SelectionSet {
    constructor (selections?:any[])
    readonly type:string
    items:any[]
    clear():void
    isSelected(item:any):boolean
    toggle(item:any, multiple?:boolean, match?:SelectionSet, unmatch?:SelectionSet):void
    add(item:any, multiple?:boolean, match?:SelectionSet, unmatch?:SelectionSet):void
    remove(item:any, multiple?:boolean, match?:SelectionSet, unmatch?:SelectionSet):void
    dispose():boolean
}
declare class SelectionManager extends createjs.EventDispatcher {
    constructor (sets?:[SelectionSet], multipleKey?:boolean, multipleSets?:boolean)
    readonly type:string
    sets:[SelectionSet]
    multipleKey:string
    readonly multiple:boolean
    readonly ctrlKey:boolean
    readonly shiftKey:boolean
    readonly metaKey:boolean
    clear():void
    setCurrent(set:SelectionSet)
    dispose():boolean
}
declare class Tile extends Container {
    constructor(config_or_obj:DisplayObject|zimVee, cols?:number, rows?:number, spacingH?:number, spacingV?:number, width?:number, height?:number, squeezeH?:boolean, squeezeV?:boolean, colSize?:number|zimVee, rowSize?:number|zimVee, align?:string|zimVee, valign?:string|zimVee, count?:number, mirrorH?:boolean, mirrorV?:boolean, snapToPixel?:boolean, clone?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{obj:DisplayObject|zimVee, cols?:number, rows?:number, spacingH?:number, spacingV?:number, width?:number, height?:number, squeezeH?:boolean, squeezeV?:boolean, colSize?:number|zimVee, rowSize?:number|zimVee, align?:string|zimVee, valign?:string|zimVee, count?:number, mirrorH?:boolean, mirrorV?:boolean, snapToPixel?:boolean, clone?:boolean, style?:boolean, group?:string, inherit?:{}})
    remake(items?:any[]):this
    resize(width?:number, height?:number):this
    readonly type:string
    items:any[]
    cols:number
    rows:number
    spacingH:number
    spacingV:number
    squeezeH:boolean
    squeezeV:boolean
    align:string
    valign:string
    mirrorH:boolean
    mirrorV:boolean
    readonly group:string
}
declare class Parallax {
    constructor (config_or_layers?:{obj:DisplayObject, prop:string, propChange:number, input?:string, inMin?:number, inMax?:number, factor?:number, integer?:boolean}[], damp?:number, auto?:boolean, stage?:Stage, startPaused?:boolean, mouseMoveOutside?:boolean)
    constructor (config:{layers?:{obj:DisplayObject, prop:string, propChange:number, input?:string, inMin?:number, inMax?:number, factor?:number, integer?:boolean}[], damp?:number, auto?:boolean, stage?:Stage, startPaused?:boolean, mouseMoveOutside?:boolean})
    addLayer(layer:{obj:DisplayObject, prop:string, propChange:number, input?:string, inMin?:number, inMax?:number, factor?:number, integer?:boolean}):number
    removeLayer(index:number):void
    step(input?:number):void
    immediate(array:number[]):void
    pause(state:boolean):void
    dispose():boolean
    readonly type:string
    readonly paused:boolean
    damp:number
}
declare class Scroller extends createjs.EventDispatcher {
    constructor (config_or_backing:DisplayObject, speed?:number, direction?:number, horizontal?:boolean, gapFix?:number, stage?:Stage, container?:Stage|DisplayObject)
    constructor (config:{backing:DisplayObject, speed?:number, direction?:number, horizontal?:boolean, gapFix?:number, stage?:Stage, container?:Stage|DisplayObject})
    pause(state:boolean):void
    dispose():boolean
    readonly type:string
    backing1:DisplayObject
    backing2:DisplayObject
    speed:number
    baseSpeed:number
    percentSpeed:number
    direction:number
    readonly paused:boolean
}
declare class Dynamo extends createjs.EventDispatcher {
    constructor (config_or_sprite:Sprite, speed?:number, label?:string, startFrame?:number, endFrame?:number, update?:boolean, reversible?:boolean, flip?:boolean, flipVertical?:boolean)
    constructor (config:{sprite:Sprite, speed?:number, label?:string, startFrame?:number, endFrame?:number, update?:boolean, reversible?:boolean, flip?:boolean, flipVertical?:boolean})
    pause(state:boolean, time:number, frame:number):void
    dispose():boolean
    readonly type:string
    frames:number[]
    frame:number
    totalFrames:number
    percentSpeed:number
    baseSpeed:number
    readonly paused:boolean
    scaleX:number
    scaleY:number
}
declare class Accelerator extends createjs.EventDispatcher {
    constructor (objects:Scroller|Dynamo|[Scroller|Dynamo])
    add(objects:Scroller|Dynamo|[Scroller|Dynamo]):this
    remove(objects:Scroller|Dynamo|[Scroller|Dynamo]):this
    pause(state:boolean, time:number, frameNumber:number):void
    dispose():boolean
    readonly type:string
    percentSpeed:number
    readonly paused
    items:[Scroller|Dynamo]
}
declare class Swiper extends createjs.EventDispatcher {
    constructor (config_or_swipeOn:Stage|DisplayObject, target:Object, property:string, sensitivity?:number, horizontal?:boolean, min?:number, max?:number, damp?:number, integer?:boolean, factor?:number, pauseTime?:number)
    constructor (config:{swipeOn:Stage|DisplayObject, target:Object, property:string, sensitivity?:number, horizontal?:boolean, min?:number, max?:number, damp?:number, integer?:boolean, factor?:number, pauseTime?:number})
    immediate(val:number):void
    dispose():boolean
    readonly type:string
    target:Object
    property:string
    desiredValue:number
    enabled:boolean
}
declare class MotionController extends createjs.EventDispatcher {
    constructor (config_or_target?:DisplayObject, type?:string, speed?:number, axis?:string, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, map?:[number|number[]], diagonal?:boolean, damp?:number, flip?:string, moveThreshold?:number, stickThreshold?:number, container?:Stage|StageGL|Container, localBounds?:boolean, mouseMoveOutside?:boolean, mousedownIncludes?:DisplayObject[], minPercentSpeed?:number, maxPercentSpeed?:number)
    constructor (config:{target?:DisplayObject, type?:string, speed?:number, axis?:string, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, map?:[number|number[]], diagonal?:boolean, damp?:number, flip?:string, moveThreshold?:number, stickThreshold?:number, container?:Stage|StageGL|Container, localBounds?:boolean, mouseMoveOutside?:boolean, mousedownIncludes?:DisplayObject[], minPercentSpeed?:number, maxPercentSpeed?:number})
    immediate(x:number, y:number):void
    convert(x:number, y:number):void
    dispose():boolean
    readonly type:string
    target:Object
    x:number
    y:number
    dirX:number
    dirY:number
    boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}
    readonly rotation:number
    readonly scaleX:number
    readonly scaleY:number
    readonly dampX:Damp
    readonly dampY:Damp
    speed:number
    turnSpeed:number
    axis:string
    readonly moving:boolean
    readonly movingX:boolean
    readonly movingY:boolean
    readonly gamepad:GamePad
    moveThreshold:number
    stickThreshold:number
    enabled:boolean
}
declare class GamePad extends createjs.EventDispatcher {
    constructor ()
    dispose():boolean
    readonly type:string
    connected:boolean
    currentIndex:number
    data:{}
    buttons:boolean[]
    A:number
    B:number
    X:number
    Y:number
    LB:number
    RB:number
    LT:number
    RT:number
    BACK:number
    START:number
    LS:number
    RS:number
    DPAD_UP:number
    DPAD_DOWN:number
    DPAD_LEFT:number
    DPAD_RIGHT:number
    LSX:number
    LSY:number
    RSX:number
    RSY:number
    axes:number[]
}
declare class Emitter extends Container {
    constructor (config_or_obj:DisplayObject|zimVee, width?:number, height?:number, interval?:number|zimVee, num?:number|zimVee, life?:number, fade?:boolean, shrink?:boolean, decayTime?:number, decayStart?:number, trace?:boolean, traceFadeTime?:number, traceShiftX?:number, traceShiftY?:number, angle?:number|zimVee, force?:number|zimVee, gravity?:number, wind?:number, layers?:string, animation?:{}|zimVee, random?:{}, horizontal?:boolean, vertical?:boolean, sink?:DisplayObject|{x:number,y:number}, sinkForce?:number, cache?:boolean, events?:boolean, startPaused?:boolean, pool?:boolean, poolMin?:number, particles?:Container)
    constructor (config:{obj:DisplayObject|zimVee, width?:number, height?:number, interval?:number|zimVee, num?:number|zimVee, life?:number, fade?:boolean, shrink?:boolean, decayTime?:number, decayStart?:number, trace?:boolean, traceFadeTime?:number, traceShiftX?:number, traceShiftY?:number, angle?:number|zimVee, force?:number|zimVee, gravity?:number, wind?:number, layers?:string, animation?:{}|zimVee, random?:{}, horizontal?:boolean, vertical?:boolean, sink?:DisplayObject|{x:number,y:number}, sinkForce?:number, cache?:boolean, events?:boolean, startPaused?:boolean, pool?:boolean, poolMin?:number, particles?:Container})
    spurt(num?:number|zimVee, time?:number|zimVee, restart?:boolean):void
    pauseEmitter(state?:boolean, restart?:boolean, freeze?:boolean, immediate?:boolean):void
    clearPool():void
    resize(width:number, height:number):void
    readonly type:string
    obj:DisplayObject|zimVee
    interval:number|zimVee
    num:number|zimVee
    life:number
    fade:boolean
    shrink:boolean
    decayTime:number
    decayStart:number
    trace:boolean
    traceFadeTime:number
    traceShiftX:number
    traceShiftY:number
    angle:number|zimVee
    emitterForce:number|zimVee
    gravity:number
    wind:number
    layers:string
    animation:{}|zimVee
    random:{}
    horizontal:boolean
    vertical:boolean
    sink:DisplayObject|{x:number,y:number}
    sinkForce:number
    events:boolean
    startPaused:boolean
    pool:boolean
    poolMin:number
    readonly emitterPaused:boolean
    currentParticle:DisplayObject
    particlesEmitted:number
    spurtNum:number
    spurtCount:number
    zimInterval:{pause:Function, clear:Function, time:number, count:number, total:number, paused:boolean, pauseTimeLeft:number}
    zimTicker:Function
    particles:Container
}
declare class Pen extends Container {
    constructor (config_or_size?:number|zimVee, color?:string|zimVee, penType?:string, damp?:number, spread?:number|zimVee, borderColor?:number|zimVee, borderWidth?:number|zimVee, end?:string, paper?:Container, nib?:DisplayObject, cache?:boolean, ctrlKey?:boolean, cropScale?:number, undo?:number, undoKeys?:boolean, draggable?:boolean, onTop?:boolean, deleteable?:boolean, doubleClickDelete?:boolean, immediateStop?:boolean, lineAlpha?:number, lineBlendMode?:string)
    constructor (config:{size?:number|zimVee, color?:string|zimVee, penType?:string, damp?:number, spread?:number|zimVee, borderColor?:number|zimVee, borderWidth?:number|zimVee, end?:string, paper?:Container, nib?:DisplayObject, cache?:boolean, ctrlKey?:boolean, cropScale?:number, undo?:number, undoKeys?:boolean, draggable?:boolean, onTop?:boolean, deleteable?:boolean, doubleClickDelete?:boolean, immediateStop?:boolean, lineAlpha?:number, lineBlendMode?:string})
    setPen(newPen?:string):this
    saveState(obj:DisplayObject):this
    undo():this
    redo():this
    immediate(x?:number, y?:number):this
    delete(index:number):this
    deleteSegment(segmentObject:Bitmap|Shape):this
    clear():this
    dispose():boolean
    readonly type:string
    undoLevels:number
    draggable:boolean
    paper:DisplayObject
    readonly lastSegment:Shape|Bitmap
    readonly lastSelected:Shape|Bitmap
    readonly nib:DisplayObject
    write:boolean
    readonly drawing:boolean
    size:number|zimVee
    sizeFactor:number
    sizeScale:number
    spread:number|zimVee
    spreadFactor:number
    spreadScale:number
    color:string|zimVee
    borderColor:string|zimVee
    borderWidth:number|zimVee
    penType:string
    immediateStop:boolean
    infinite:boolean
}
declare class SoundWave extends createjs.EventDispatcher {
    constructor (config_or_num?:number, input?:string, include?:number, smoothing?:number, min?:number, max?:number, operation?:Function, baseline?:number, magnify?:number, reduce?:number)
    constructor (config:{num?:number, input?:string, include?:number, smoothing?:number, min?:number, max?:number, operation?:Function, baseline?:number, magnify?:number, reduce?:number})
    calculate():number[]
    readonly type:string
    readonly num:number
    smoothing:number
    analyser:AnalyserNode
    baseline:number
    magnify:number
    reduce:number
}
declare class Portal extends createjs.EventDispatcher {
    constructor (obj:DisplayObject, lands?:Stage|DisplayObject)
    dispose():boolean
    readonly type:string
    portal:DisplayObject
    enabled:boolean
    readonly currentLand:DisplayObject
    readonly nextLand:DisplayObject
}
declare class Physics {
    constructor (config_or_gravity?:number, borders?:Boundary|{}, scroll?:boolean, frame?:Frame)
    constructor (config:{gravity?:number, borders?:Boundary|{}, scroll?:boolean, frame?:Frame})
    borders(boundary?:Boundary|{}):void
    drag(array?:[any]):void
    noDrag():void
    join(obj1:DisplayObject, obj2:DisplayObject, point1?:Point|{}, point2?:Point|{}, minAngle?:number, maxAngle?:number, type?:string):any
    break(joint:any):void
    debug():void
    updateDebug():void
    removeDebug():void
    remove(obj:DisplayObject):void
    dispose():void
    readonly world:any
    readonly scale:number
    readonly step:number
    readonly gravity:number
    readonly Ticker:any
    controlObject:DisplayObject
    followObject:DisplayObject
    readonly borderTop:any
    readonly borderBottom:any
    readonly borderLeft:any
    readonly borderRight:any
}
declare class VR extends Container {
    constructor (config_or_content:Container, angle?:number, distance?:number, parallax?:number, parallaxAngle?:number, damp?:number, parallaxDamp?:number, startAngle?:number, negativeParallax?:boolean, boundaryMarkers?:boolean, swiper?:boolean, holder?:Stage|Container)
    constructor (config:{content:Container, angle?:number, distance?:number, parallax?:number, parallaxAngle?:number, damp?:number, parallaxDamp?:number, startAngle?:number, negativeParallax?:boolean, boundaryMarkers?:boolean, swiper?:boolean, holder?:Stage|Container})
    register(item:DisplayObject):DisplayObject
    remove(item:DisplayObject):DisplayObject
    position(item:DisplayObject, x:number, y:number):DisplayObject
    showAdjuster():this
    hideAdjuster():this
    resize():this
    readonly type:string
    readonly angle:number
    readonly currentAngle:number
    content:Container
    contentLeft:Container
    contentRight:Container
    left:Container
    right:Container
    adjuster:Container
    swiper:Swiper
    boundaryLeft:Container
    boundaryRight:Container
}

// ++++++++++++++++++++++++++++++++++++++
// ZIM FRAME
declare class Queue extends createjs.EventDispatcher {
    constructor()
    readonly isLoading:boolean
}
declare class Frame extends createjs.EventDispatcher {
    constructor(config_or_scaling?:string, width?:number, height?:number, color?:string, outerColor?:string, assets?:[string,{}]|string|{}, path?:string, progress?:Waiter|ProgressBar, rollover?:boolean, touch?:boolean, scrollTop?:boolean, align?:string, valign?:string, canvasID?:string, rollPerSecond?:number, delay?:number, canvasCheck?:boolean, gpu?:boolean, gpuObj?:boolean, nextFrame?:Frame, nextStage?:Stage, allowDefault?:boolean, loadFailObj?:DisplayObject, sensors?:boolean, retina?:boolean, mouseMoveOutside?:boolean, captureMouse?:boolean, shim?:{any})
    constructor(config:{scaling?:string, width?:number, height?:number, color?:string, outerColor?:string, assets?:[string,{}]|string|{}, path?:string, progress?:Waiter|ProgressBar, rollover?:boolean, touch?:boolean, scrollTop?:boolean, align?:string, valign?:string, canvasID?:string, rollPerSecond?:number, delay?:number, canvasCheck?:boolean, gpu?:boolean, gpuObj?:boolean, nextFrame?:Frame, nextStage?:Stage, allowDefault?:boolean, loadFailObj?:DisplayObject, sensors?:boolean, retina?:boolean, mouseMoveOutside?:boolean, captureMouse?:boolean, shim?:{any}})
    loadAssets(config_or_assets:[string,{}]|string|{}, path?:string, progress?:Waiter|ProgressBar, xhr?:boolean, time?:number, loadTimeout?:number, outputAudioSprite?:boolean, crossOrigin?:string, fileType?:string, queueOnly?:boolean, shim?:{any}):Queue
    loadAssets(config:{assets:[string,{}]|string|{}, path?:string, progress?:Waiter|ProgressBar, xhr?:boolean, time?:number, loadTimeout?:number, outputAudioSprite?:boolean, crossOrigin?:string, fileType?:string, queueOnly?:boolean, shim?:{any}}):Queue
    asset(file:string):any
    follow(config_or_obj?:DisplayObject, boundary?:Boundary|{any}, damp?:number, dampY?:number, leftOffset?:number, rightOffset?:number, upOffset?:number, downOffset?:number, offsetDamp?:number, offsetDampY?:number, horizontal?:boolean, vertical?:boolean, borderLock?:boolean, lag?:boolean):this
    follow(config:{obj?:DisplayObject, boundary?:Boundary|{any}, damp?:number, dampY?:number, leftOffset?:number, rightOffset?:number, upOffset?:number, downOffset?:number, offsetDamp?:number, offsetDampY?:number, horizontal?:boolean, vertical?:boolean, borderLock?:boolean, lag?:boolean}):this
    makeCircles(radius?:number, multiple?:false):Shape
    makeCircles(radius?:number, multiple?:true):Container
    remakeCanvas(width:number, height:number):null
    dispose():boolean
    readonly type:string
    stage:Stage|StageGL
    canvas:HTMLCanvasElement
    canvasID:string
    color:string
    outerColor:string
    tag:HTMLElement
    isLoading:boolean
    readonly width:number
    readonly height:number
    readonly scale:number
    readonly mouseX:number
    readonly mouseY:number
    readonly mouseEvent:any
    orientation:string
    visibleLeft:number
    visibleTop:number
    visibleRight:number
    visibleBottom:number
    zil:Function[]
    readonly orange:string
    readonly green:string
    readonly pink:string
    readonly blue:string
    readonly brown:string
    readonly yellow:string
    readonly red:string
    readonly purple:string
    readonly silver:string
    readonly tin:string
    readonly grey:string
    readonly lighter:string
    readonly light:string
    readonly dark:string
    readonly darker:string
    readonly white:string
    readonly black:string
    readonly clear:string
    readonly faint:string
    altKey:boolean
    ctrlKey:boolean
    metaKey:boolean
    shiftKey:boolean
    loadFailObj:DisplayObject
    readonly retina:boolean
}

// ++++++++++++++++++++++++++++++++++++++
// ZIM META
declare var DISTILL:boolean
declare function distill():void
declare function parseAudioSprite(audioSpriteData:{resources:string[], spritemap:{}}, outputAudioSprite?:boolean):{src:string, data:{}}
declare function previewAudioSprite(audioSpriteData:{}, numLetters?:number, frame?:Frame)
declare function svgToBitmap(svg:string|SVGElement, callBack:Function)
declare function zimify(obj:createjs.DisplayObject, list:boolean):DisplayObject
declare function zimplify(exclude?:string|string[]):void
declare var ZIMONON:boolean
declare var ZIMON:{
    stringify:(obj:any, key?:{}) => string,
    parse:(string:string) => any
}
declare class Wonder {
    constructor (wid:string, client:string, app:string, notes?:string, server?:string)
    count(keyword:string):void
    timeStart(keyword:string):void
    timePause(keyword:string):void
    timeUnpause(keyword:string):void
    timeEnd(keyword:string):void
    order(keyword:string, item):void
    countOff(keyword:string):void
    countOn(keyword:string):void
    timeOff(keyword:string):void
    timeOn(keyword:string):void
    orderOff(keyword:string):void
    orderOn(keyword:string):void
    dispose():boolean
}
// END GLOBALS - that are copied by the PARSER into the namespace and exported


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ZIM NAMESPACE

// Below is a repeat of above but declared in the zim namespace
// If you only want to use the namespace then comment out the GLOBALS above
// Also set var zns = true; in your HTML before the script call to bring in ZIM

declare namespace zim {

    // UNIQUE - namespace only exports - not added by parser

    // scrollX and scrollY conflict with JavaScript names
    export function scrollX(num?:number, time?:number):number // use scrollX
    export function scrollY(num?:number, time?:number):number // use scrollY

    // Blob cannot be added to global namespace because duplicates JavaScript Blob
    export class Blob extends Container implements zimShape {
        constructor(config_or_color?:string, borderColor?:string, borderWidth?:number, points?:number|any[]|string|Rectangle|Circle|Triangle, radius?:number, controlLength?:number, controlType?:string, lockControlType?:string, showControls?:boolean, lockControls?:boolean, handleSize?:number, allowToggle?:boolean, move?:boolean, ctrlclick?:boolean, dashed?:boolean, onTop?:boolean, stickColor?:string, selectColor?:string, selectPoints?:boolean, editPoints?:string|boolean, interactive?:boolean, strokeObj?:{}, style?:boolean, group?:string, inherit?:{})
        constructor(config:{color?:string, borderColor?:string, borderWidth?:number, points?:number|any[]|string|Rectangle|Circle|Triangle, radius?:number, controlLength?:number, controlType?:string, lockControlType?:string, showControls?:boolean, lockControls?:boolean, handleSize?:number, allowToggle?:boolean, move?:boolean, ctrlclick?:boolean, dashed?:boolean, onTop?:boolean, stickColor?:string, selectColor?:string, selectPoints?:boolean, editPoints?:string|boolean, interactive?:boolean, strokeObj?:{}, style?:boolean, group?:string, inherit?:{}})
    // ZIM Shape Interface
    readonly shape:Shape
    color:string
    colorRange:number
    readonly colorCommand:createjs.Graphics.Fill
    borderColor:string
    readonly borderColorCommand:createjs.Graphics.Stroke
    borderWidth:number
    readonly borderDashedCommand:createjs.Graphics.StrokeDash
    setColorRange(color1?:string, color2?:string):this
    linearGradient(colors:[any], ratios:[any], x0:number, y0:number, x1:number, y1:number):this
    radialGradient(colors:[any], ratios:[any], x0:number, y0:number, radius0:number, x1:number, y1:number, radius1:number):this
    // END ZIM Shape Interface
            addPoint(percent?:number, controlType?:string):this
            addPoints(num?:number, controlType?:string, startPoint?:number, spread?:boolean, dataOnly?:boolean, points?:any[]):this
            interpolate(num?:number, startPoint?:number, spread?:boolean):any[]
            setColorRange(color1?:string, color2?:string):this
            recordData(toJSON?:boolean):{x:number, y:number, points:any[][], color:string, borderColor:string, borderWidth:number, move:boolean, toggle:boolean, controls:boolean}
            setData(data:string|{x:number, y:number, points:any[][], color:string, borderColor:string, borderWidth:number, move:boolean, toggle:boolean, controls:boolean}, fromJSON?:boolean):this
            recordPoints(popup:boolean):any[][]
            setPoints(data:any[][]):this
            changeControl(config_or_index:number, type?:string, rect1X?:number, rect1Y?:number, rect2X?:number, rect2Y?:number, circleX?:number, circleY?:number, update?:boolean):this
            changeControl(config:{index:number, type?:string, rect1X?:number, rect1Y?:number, rect2X?:number, rect2Y?:number, circleX?:number, circleY?:number, update?:boolean}):this
            transformPoints(transformType:string, amount:number, x?:number, y?:number):this
            update(normalized?:boolean):this
            showControls():this
            hideControls():this
            traverse(obj:DisplayObject, start?:number, end?:number, time?:number):this
            readonly num:number
            points:number|any[]|string|Rectangle|Circle|Triangle
            pointsAdjusted:[any]
            pointObjects:[any]
            readonly segmentPoints:any[]
            readonly segmentRatios:any[]
            getPointAngle(index:number):number
            getSegmentPoint(point1:any[], point2:any[]):any[]
            getCurvePoint(ratio?:number, segmentRatios?:any[], segmentPoints?:any[], getAngle?:boolean):{}
            stickColor:string
            readonly controls:Container
            readonly sticks:Container
            readonly lastSelected:Container
            readonly lastSelectedIndex:number
            controlsVisible:boolean
            types:string[]
            lockControls:boolean
            lockControlType:boolean
            allowToggle:boolean
            move:boolean
            ctrlclick:boolean
            addPointFactor:number
            addMinDistance:number
    }
    // Window cannot be added to global namespace because duplicates JavaScript Window
    export class Window extends Container implements zimComponent {
        constructor(width?:number, height?:number, backgroundColor?:string, borderColor?:string, borderWidth?:number, padding?:number, corner?:number|any[], swipe?:boolean, scrollBarActive?:boolean, scrollBarDrag?:boolean, scrollBarColor?:string, scrollBarAlpha?:number, scrollBarFade?:boolean, scrollBarH?:boolean, scrollBarV?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:string, interactive?:boolean, shadowColor?:string, shadowBlur?:number, paddingHorizontal?:number, paddingVertical?:number, scrollWheel?:boolean, damp?:number, titleBar?:string|Label, titleBarColor?:string, titleBarBackgroundColor?:string, titleBarHeight?:number, draggable?:boolean, boundary?:Boundary, onTop?:boolean, close?:boolean, closeColor?:string, style?:boolean, group?:string, inherit?:{})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
        add(obj:DisplayObject, replace:boolean):this
        remove(obj:DisplayObject):this
        removeAll():this
        resize(width?:number, height?:number):this
        update():void
        background:Shape
        content:Container
        titleBar:Container
        titleBarLabel:Label
        titleBarBacking:Rectangle
        readonly scrollBar:{size:number, minSize:number, spacing:number, margin:number, corner:number, showTime:number, fadeTime:number}
        scrollX:number
        scrollY:number
        readonly scrollXMax:number
        readonly scrollYMax:number
    }
    // Pick seems to be flagging a duplicate - don't know what!
    export class Pick {
        constructor (choices:any)
        num(number:number):this
        loop(number:number, call:Function):any
        static choose(choice:any):any;
        static rand(a?:number, b?:number, integer?:boolean, negative?:boolean):number
        static series(array_item:any):Function
        type:string
        choices:any
    }
    // END UNIQUE - end of exports not added by parser

    // PARSER - start of exports added by parser from globalsundefined// The PARSER will copy all these globals and export them in the module

// COLORS
export var orange:string
export var green:string
export var pink:string
export var blue:string
export var brown:string
export var yellow:string
export var purple:string
export var red:string
export var silver:string
export var tin:string
export var grey:string
export var gray:string
export var lighter:string
export var light:string
export var dark:string
export var darker:string
export var black:string
export var white:string
export var clear:string
export var faint:string

// ++++++++++++++++++++++++++++++++++++++
// ZIM CODE
export function shuffle(array:[any]):[any]
export function rand(a?:number, b?:number, integer?:boolean, negative?:boolean):number
export function loop(obj:number|{}|[any], call:Function, reverse?:boolean, step?:number, start?:number, end?:number):any
export function timeout(time:number|zimVee, call:Function):{pause:Function, clear:Function, time:number, paused:boolean, done:boolean}
export function interval(time:number|zimVee, call:Function, total?:number, immediate?:boolean):{pause:Function, clear:Function, time:number, count:number, total:number, paused:boolean, pauseTimeLeft:number}
export function copy<T>(obj:T, clone?:boolean):T
export function arraysEqual(a:[any], b:[any], strict?:boolean):boolean
export function isEmpty(obj:{}):boolean
export function isJSON(str:string):boolean
export function merge(object1:{}, object2:{}, ...objects:{}[]):{}
export function decimals(num:number, places?:number, addZeros?:number, addZerosBefore?:number, includeZero?:boolean, time?:boolean):number|string
export function sign(num:number):1|0|-1
export function constrain(num:number, min?:number, max?:number, negative?:boolean):number
export function dist(x1:number, y1:number, x2?:number, y2?:number):number
export function rectIntersect(a:{}|Boundary, b:{}|Boundary, margin?:number):{}
export function boundsAroundPoints(points:[{}]):number
export function angle(x1:number, y1:number, x2:number, y2:number):number
export class Point {
    constructor (x:number, y:number, z?:number, w?:number)
    x:number
    y:number
    z:number
    w:number
}
export class Boundary {
    constructor (x:number, y:number, width:number, height:number)
    x:number
    y:number
    width:number
    height:number
    contract(x:number, y?:number, width?:number, height?:number):this
}
export function makeID(length?:number, type?:string, letterCase?:string):string
export function series(array_item:any):Function
export function makeSeries(array:[any]):Function
export function smoothStep(num:number, min:number, max:number):number
export class Noise {
    constructor (seed?:number)
    seed:number
    simplex1D(x:number):number
    simplex2D(x:number, y:number):number
    simplex3D(x:number, y:number, z:number):number
    simplex4D(x:number, y:number, z:number, w:number):number
}
export class Damp {
    constructor (startValue?:number, damp?:number)
    damp:number
    lastValue:number
    convert(input:number):number
    immediate(num:number):this
}
export class Proportion {
    constructor (baseMin:number, baseMax:number, targetMin?:number, targetMax?:number, factor?:number, targetRound?:boolean)
    convert(input:number):number
}
export class ProportionDamp {
    constructor (baseMin:number, baseMax:number, targetMin?:number, targetMax?:number, damp?:number, factor?:number, targetRound?:boolean)
    damp:number
    convert(input:number):number
    immediate(num:number):this
    dispose():boolean
}
export class Dictionary {
    constructor (unique:boolean)
    length:number
    unique:boolean
    objects:any[]
    values:any[]
    add(object:any, value:any):void
    clear():this
    at(object:any):any
    remove(object:any):boolean
    dispose():boolean
}
export class Hierarchy {
    constructor (input:[any]|{})
    processSimple(input:[any]|{}):{}
    processComplex(input:[any]|{}):[any]|{}
    getLinearList(data:[any]|{}):[any]
    getLinearIds(data:[any]|{}):[any]
    getData(id:String):any
    getNextSibling(id:String):string
    getPrevSibling(id:String):string
}
export function swapProperties(property:string, objA:any, objB:any):boolean
export function swapHTML(idA:string, idB:string):Boolean
// scrollX and scrollY are available only in zim namespace due to global conflict
export function windowWidth():number
export function windowHeight():number
export function getQueryString(string?:string):{}
export function urlEncode(string:string):string
export function urlDecode(string:string):string
export function setCookie(name:string, value:string, days?:number):boolean
export function getCookie(name:string):string
export function deleteCookie(name:string):boolean
export function convertColor(color:string, toColorType?:string, alpha?:number):string
export function pointAlongCurve(points:[any], ratio?:number, getAngle?:boolean):{}
export function distanceAlongCurve(points:[any]):number
export function closestPointAlongCurve(point:any, segmentPoints:[any], num?:number, interpolate?:boolean, percentage?:boolean):number
export function transformPoints(points:[any], transformType:string, amount:number, x?:number, y?:number):[any]
export function mobile(orientation?:boolean):string|boolean
export function vee(obj?:any):boolean
export function async(url:string, callback?:Function):void
// not sure how to type any class... is it Function?
export function extend(subclass:Function, superclass:Function, override?:string|string[], prefix?:string, prototype?:boolean):Function

// ++++++++++++++++++++++++++++++++++++++
// ZIM DISPLAY
export class Stage extends createjs.Stage {
    constructor(canvasID:string|HTMLCanvasElement)
    loop(config_or_call:Function, reverse?:boolean, step?:number, start?:number, end?:number):any
    loop(config:{call:Function, reverse?:boolean, step?:number, start?:number, end?:number}):any
    loop(config:{call:Function, reverse?:boolean, step?:number, start?:number, end?:number}):any
    hitTestGrid(width?:number, height?:number, cols?:number, rows?:number, x?:number, y?:number, offsetX?:number, offsetY?:number, spacingX?:number, spacingY?:number, local?:boolean, type?:string):any
    type:string
    readonly width:number
    readonly height:number
}

export class StageGL extends Stage {
    constructor(canvasID:string|HTMLCanvasElement, options:{preserveBuffer:boolean, antialias:boolean, transparent:boolean, premultiply:false, autoPurge:number})
    loop(config_or_call:Function, reverse?:boolean, step?:number, start?:number, end?:number):any
    loop(config:{call:Function, reverse?:boolean, step?:number, start?:number, end?:number}):any
    loop(config:{call:Function, reverse?:boolean, step?:number, start?:number, end?:number}):any
    hitTestGrid(width?:number, height?:number, cols?:number, rows?:number, x?:number, y?:number, offsetX?:number, offsetY?:number, spacingX?:number, spacingY?:number, local?:boolean, type?:string):any
    type:string
    readonly width:number
    readonly height:number
}

export class Container extends createjs.Container implements zimDisplay {
    constructor(width_or_boundsX?:number, height_or_boundsY?:number, width?:number, height?:number, style?:boolean, group?:string, inherit?:{})
    // ZIM Display Interface
    // ZIM 4TH Methods
    tap(call:Function, distance?:number, time?:number, once?:Boolean):this
    noTap():this
    drag(config_or_boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, overCursor?:string, dragCursor?:string, all?:boolean, swipe?:boolean, localBounds?:boolean, onTop?:boolean, surround?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:boolean, reg?:boolean, removeTweens?:boolean, startBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, currentTarget?:boolean):this
    drag(config:{boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, overCursor?:string, dragCursor?:string, all?:boolean, swipe?:boolean, localBounds?:boolean, onTop?:boolean, surround?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:boolean, reg?:boolean, removeTweens?:boolean, startBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, currentTarget?:boolean}):this
    noDrag():this
    dragBoundary(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    dragRect(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    transform(config_or_move?:boolean, stretchX?:boolean, stretchY?:boolean, scale?:boolean, rotate?:boolean, allowToggle?:boolean, visible?:boolean, onTop?:boolean, showStretch?:boolean, showRotate?:boolean, showScale?:boolean, showReg?:boolean, showBorder?:boolean, borderColor?:string, borderWidth?:number, dashed?:boolean, customCursors?:boolean, handleSize?:number, regSize?:number, snapDistance?:number, snapRotation?:number, cache?:boolean, events?:boolean, ghostColor?:string, ghostWidth?:number, ghostDashed?:boolean, ghostHidden?:boolean):this
    transform(config:{move?:boolean, stretchX?:boolean, stretchY?:boolean, scale?:boolean, rotate?:boolean, allowToggle?:boolean, visible?:boolean, onTop?:boolean, showStretch?:boolean, showRotate?:boolean, showScale?:boolean, showReg?:boolean, showBorder?:boolean, borderColor?:string, borderWidth?:number, dashed?:boolean, customCursors?:boolean, handleSize?:number, regSize?:number, snapDistance?:number, snapRotation?:number, cache?:boolean, events?:boolean, ghostColor?:string, ghostWidth?:number, ghostDashed?:boolean, ghostHidden?:boolean}):this
    setSwipe(swipe?:boolean):this
    gesture(config_or_move?:boolean, scale?:boolean, rotate?:boolean, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, minScale?:number, maxScale?:number, snapRotate?:number, localBounds?:boolean, slide?:boolean, slideEffect?:number, regControl?:boolean, onTop?:boolean, surround?:boolean, circularBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    gesture(config:{move?:boolean, scale?:boolean, rotate?:boolean, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, minScale?:number, maxScale?:number, snapRotate?:number, localBounds?:boolean, slide?:boolean, slideEffect?:number, regControl?:boolean, onTop?:boolean, surround?:boolean, circularBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}}):this
    noGesture(config_or_move?:boolean, scale?:boolean, rotate?:boolean):this
    noGesture(config:{move?:boolean, scale?:boolean, rotate?:boolean}):this
    gestureBoundary(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, update?:boolean):this
    addPhysics(dynamic?:boolean, contract?:number, shape?:string, friction?:number, linear?:number, angular?:number, density?:number, restitution?:number, maskBits?:number, categoryBits?:number, physics?:Physics):this
    removePhysics():this
    impulse(x?:number, y?:number, targetX?:number, targetY?:number):this
    force(x?:number, y?:number, targetX?:number, targetY?:number):this
    torque(amount?:number):this
    sleep():this
    wake():this
    follow(damp?:number, dampY?:number, leftOffset?:number, rightOffset?:number, upOffset?:number, downOffset?:number, offsetDamp?:number, offsetDampY?:number, horizontal?:boolean, vertical?:boolean, borderLock?:boolean, borderOriginal?:boolean):this
    control(type?:string, speed?:number, speedY?:number, horizontal?:boolean, vertical?:boolean):this
    noControl():this
    contact(call:Function):this
    contactEnd(call:Function):this
    noContact():this
    noContactEnd():this
    hitTestPoint(x:number, y:number, boundsCheck?:boolean):boolean
    hitTestReg(other:DisplayObject):boolean
    hitTestRect(other:DisplayObject, num?:number, boundsCheck?:boolean):boolean
    hitTestCircle(other:DisplayObject, num?:number, boundsCheck?:boolean):boolean
    hitTestCircles(other:DisplayObject, margin?:number):boolean
    hitTestBounds(other:DisplayObject, margin?:number, boundsShape?:boolean):boolean
    boundsToGlobal(rect:createjs.Rectangle|{x:number,y:number,width:number,height:number}, flip?:boolean):createjs.Rectangle
    resetBounds(width_or_boundsX?:number, height_or_boundsY?:number, width?:number, height?:number):this
    hitTestPath(other:DisplayObject, num?:number, showPoints?:boolean):boolean
    hitTestGrid(width?:number, height?:number, cols?:number, rows?:number, x?:number, y?:number, offsetX?:number, offsetY?:number, spacingX?:number, spacingY?:number, local?:boolean, type?:string):any
    animate(config_or_props:{}|[{}], time?:number|zimVee, ease?:string|zimVee, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, sequence?:number, sequenceCall?:Function, sequenceParams?:any, sequenceReverse?:boolean|zimVee, ticker?:boolean, cjsProps?:{}, css?:boolean, protect?:boolean, override?:boolean, from?:boolean|zimVee, set?:{}|zimVee, id?:string, events?:boolean, sequenceTarget?:any, dynamic?:boolean, drag?:boolean, clamp?:boolean, startPaused?:boolean, clean?:boolean, obj?:{}|[{}]):this
    animate(config:{props:{}|[{}], time?:number|zimVee, ease?:string|zimVee, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, sequence?:number, sequenceCall?:Function, sequenceParams?:any, sequenceReverse?:boolean|zimVee, ticker?:boolean, cjsProps?:{}, css?:boolean, protect?:boolean, override?:boolean, from?:boolean|zimVee, set?:{}|zimVee, id?:string, events?:boolean, sequenceTarget?:any, dynamic?:boolean, drag?:boolean, clamp?:boolean, startPaused?:boolean, clean?:boolean, obj?:{}|[{}]}):this
    stopAnimate(ids?:string|[string]):this
    pauseAnimate(state?:boolean, ids?:string|[string]):this
    wiggle(config_or_property:string, baseAmount:number|zimVee, minAmount?:number|zimVee, maxAmount?:number|zimVee, minTime?:number|zimVee, maxTime?:number|zimVee, totalTime?:number, type?:string, ease?:string, integer?:boolean, id?:string, startType?:string):this
    wiggle(config:{property:string, baseAmount:number|zimVee, minAmount?:number|zimVee, maxAmount?:number|zimVee, minTime?:number|zimVee, maxTime?:number|zimVee, totalTime?:number, type?:string, ease?:string, integer?:boolean, id?:string, startType?:string}):this
    copyMatrix(source:DisplayObject):this
    cur(type?:string):this
    sha(color_or_shadow?:string|createjs.Shadow, offsetX?:number, offsetY?:number, blur?:number):this
    pos(x?:number, y?:number, right?:boolean, bottom?:boolean, container?:Container|Stage, index?:number, add?:boolean, reg?:boolean, regX?:boolean, regY?:boolean):this
    loc(target_or_x?:{}|DisplayObject|Point|number, y?:number, container?:Container|Stage, index?:number, add?:boolean, localToLocal?:boolean, x?:number):this
    mov(x:number, y?:number):this
    top():this
    bot():this
    ord(num:number):this
    dep(depth:number):this
    alp(alpha:number):this
    hov(value?:any, prop?:string):this
    rot(rotation:number):this
    siz(width:number, height?:number, only?:boolean):this
    ske(skewx:number, skewY?:number):this
    reg(regx:number, regY?:number, still?:boolean):this
    sca(scale:number, scaleY?:number):this
    scaleTo(boundObj?:DisplayObject, percentX?:number, percentY?:number, type?:string, boundsOnly?:boolean):this
    fit(left?:number, top?:number, width?:number, height?:number, inside?:boolean):{}
    outline(color?:string, size?:number):this
    addTo(container?:Container|Stage, index?:number, localToLocal?:boolean):this
    removeFrom(container?:Container|Stage):this
    added(call:Function, interval?:number, maxTime?:number):string
    centerReg(container?:Container|Stage, index?:number, add?:boolean):this
    center(container?:Container|Stage, index?:number, add?:boolean):this
    place(id?:string):this
    placeReg(id?:string):this
    expand(padding?:number, paddingVertical?:number):this
    setMask(mask:DisplayObject, dynamic?:boolean):this
    toggle(state?:boolean):this
    outlineToggle(state?:boolean):this
    // animate adds these:
    endTween():this
    resetTween():this
    replayTween():this
    // ZIM 4TH Properties
    readonly type:string
    width:number
    height:number
    widthOnly:number
    heightOnly:number
    depth:number
    percentSpeed:number
    percentComplete:number
    blendMode:string
    readonly paused:boolean
    readonly toggled:boolean
    readonly outlineToggled:boolean
    group:string
    dynamic:boolean
    // END ZIM Display Interface
    loop(config_or_call:Function, reverse?:boolean, step?:number, start?:number, end?:number):any
    loop(config:{call:Function, reverse?:boolean, step?:number, start?:number, end?:number}):any
    cache(width_or_boundsX?:number, height_or_boundsY?:number, width?:number, height?:number, scale?:number, options?:{}):this
    setBounds(width_or_boundsX?:number, height_or_boundsY?:number, width?:number, height?:number):this
    hasProp(prop:string):boolean
    dispose():boolean
    clone():this
}

export class Sprite extends createjs.Sprite implements zimDisplay {
    constructor(config_or_image?:Bitmap, cols?:number, rows?:number, count?:number, offsetX?:number, offsetY?:number, spacingX?:number, spacingY?:number, width?:number, height?:number, animations?:{}, json?:string|{}, id?:string|number, globalControl?:boolean, spriteSheet?:createjs.SpriteSheet, style?:boolean, group?:string, inherit?:{})
    constructor(config:{image?:Bitmap, cols?:number, rows?:number, count?:number, offsetX?:number, offsetY?:number, spacingX?:number, spacingY?:number, width?:number, height?:number, animations?:{}, json?:string|{}, id?:string|number, globalControl?:boolean, spriteSheet?:createjs.SpriteSheet, style?:boolean, group?:string, inherit?:{}})
    // ZIM Display Interface
    // ZIM 4TH Methods
    tap(call:Function, distance?:number, time?:number, once?:Boolean):this
    noTap():this
    drag(config_or_boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, overCursor?:string, dragCursor?:string, all?:boolean, swipe?:boolean, localBounds?:boolean, onTop?:boolean, surround?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:boolean, reg?:boolean, removeTweens?:boolean, startBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, currentTarget?:boolean):this
    drag(config:{boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, overCursor?:string, dragCursor?:string, all?:boolean, swipe?:boolean, localBounds?:boolean, onTop?:boolean, surround?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:boolean, reg?:boolean, removeTweens?:boolean, startBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, currentTarget?:boolean}):this
    noDrag():this
    dragBoundary(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    dragRect(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    transform(config_or_move?:boolean, stretchX?:boolean, stretchY?:boolean, scale?:boolean, rotate?:boolean, allowToggle?:boolean, visible?:boolean, onTop?:boolean, showStretch?:boolean, showRotate?:boolean, showScale?:boolean, showReg?:boolean, showBorder?:boolean, borderColor?:string, borderWidth?:number, dashed?:boolean, customCursors?:boolean, handleSize?:number, regSize?:number, snapDistance?:number, snapRotation?:number, cache?:boolean, events?:boolean, ghostColor?:string, ghostWidth?:number, ghostDashed?:boolean, ghostHidden?:boolean):this
    transform(config:{move?:boolean, stretchX?:boolean, stretchY?:boolean, scale?:boolean, rotate?:boolean, allowToggle?:boolean, visible?:boolean, onTop?:boolean, showStretch?:boolean, showRotate?:boolean, showScale?:boolean, showReg?:boolean, showBorder?:boolean, borderColor?:string, borderWidth?:number, dashed?:boolean, customCursors?:boolean, handleSize?:number, regSize?:number, snapDistance?:number, snapRotation?:number, cache?:boolean, events?:boolean, ghostColor?:string, ghostWidth?:number, ghostDashed?:boolean, ghostHidden?:boolean}):this
    setSwipe(swipe?:boolean):this
    gesture(config_or_move?:boolean, scale?:boolean, rotate?:boolean, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, minScale?:number, maxScale?:number, snapRotate?:number, localBounds?:boolean, slide?:boolean, slideEffect?:number, regControl?:boolean, onTop?:boolean, surround?:boolean, circularBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    gesture(config:{move?:boolean, scale?:boolean, rotate?:boolean, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, minScale?:number, maxScale?:number, snapRotate?:number, localBounds?:boolean, slide?:boolean, slideEffect?:number, regControl?:boolean, onTop?:boolean, surround?:boolean, circularBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}}):this
    noGesture(config_or_move?:boolean, scale?:boolean, rotate?:boolean):this
    noGesture(config:{move?:boolean, scale?:boolean, rotate?:boolean}):this
    gestureBoundary(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, update?:boolean):this
    addPhysics(dynamic?:boolean, contract?:number, shape?:string, friction?:number, linear?:number, angular?:number, density?:number, restitution?:number, maskBits?:number, categoryBits?:number, physics?:Physics):this
    removePhysics():this
    impulse(x?:number, y?:number, targetX?:number, targetY?:number):this
    force(x?:number, y?:number, targetX?:number, targetY?:number):this
    torque(amount?:number):this
    sleep():this
    wake():this
    follow(damp?:number, dampY?:number, leftOffset?:number, rightOffset?:number, upOffset?:number, downOffset?:number, offsetDamp?:number, offsetDampY?:number, horizontal?:boolean, vertical?:boolean, borderLock?:boolean, borderOriginal?:boolean):this
    control(type?:string, speed?:number, speedY?:number, horizontal?:boolean, vertical?:boolean):this
    noControl():this
    contact(call:Function):this
    contactEnd(call:Function):this
    noContact():this
    noContactEnd():this
    hitTestPoint(x:number, y:number, boundsCheck?:boolean):boolean
    hitTestReg(other:DisplayObject):boolean
    hitTestRect(other:DisplayObject, num?:number, boundsCheck?:boolean):boolean
    hitTestCircle(other:DisplayObject, num?:number, boundsCheck?:boolean):boolean
    hitTestCircles(other:DisplayObject, margin?:number):boolean
    hitTestBounds(other:DisplayObject, margin?:number, boundsShape?:boolean):boolean
    boundsToGlobal(rect:createjs.Rectangle|{x:number,y:number,width:number,height:number}, flip?:boolean):createjs.Rectangle
    resetBounds(width_or_boundsX?:number, height_or_boundsY?:number, width?:number, height?:number):this
    hitTestPath(other:DisplayObject, num?:number, showPoints?:boolean):boolean
    hitTestGrid(width?:number, height?:number, cols?:number, rows?:number, x?:number, y?:number, offsetX?:number, offsetY?:number, spacingX?:number, spacingY?:number, local?:boolean, type?:string):any
    animate(config_or_props:{}|[{}], time?:number|zimVee, ease?:string|zimVee, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, sequence?:number, sequenceCall?:Function, sequenceParams?:any, sequenceReverse?:boolean|zimVee, ticker?:boolean, cjsProps?:{}, css?:boolean, protect?:boolean, override?:boolean, from?:boolean|zimVee, set?:{}|zimVee, id?:string, events?:boolean, sequenceTarget?:any, dynamic?:boolean, drag?:boolean, clamp?:boolean, startPaused?:boolean, clean?:boolean, obj?:{}|[{}]):this
    animate(config:{props:{}|[{}], time?:number|zimVee, ease?:string|zimVee, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, sequence?:number, sequenceCall?:Function, sequenceParams?:any, sequenceReverse?:boolean|zimVee, ticker?:boolean, cjsProps?:{}, css?:boolean, protect?:boolean, override?:boolean, from?:boolean|zimVee, set?:{}|zimVee, id?:string, events?:boolean, sequenceTarget?:any, dynamic?:boolean, drag?:boolean, clamp?:boolean, startPaused?:boolean, clean?:boolean, obj?:{}|[{}]}):this
    stopAnimate(ids?:string|[string]):this
    pauseAnimate(state?:boolean, ids?:string|[string]):this
    wiggle(config_or_property:string, baseAmount:number|zimVee, minAmount?:number|zimVee, maxAmount?:number|zimVee, minTime?:number|zimVee, maxTime?:number|zimVee, totalTime?:number, type?:string, ease?:string, integer?:boolean, id?:string, startType?:string):this
    wiggle(config:{property:string, baseAmount:number|zimVee, minAmount?:number|zimVee, maxAmount?:number|zimVee, minTime?:number|zimVee, maxTime?:number|zimVee, totalTime?:number, type?:string, ease?:string, integer?:boolean, id?:string, startType?:string}):this
    copyMatrix(source:DisplayObject):this
    cur(type?:string):this
    sha(color_or_shadow?:string|createjs.Shadow, offsetX?:number, offsetY?:number, blur?:number):this
    pos(x?:number, y?:number, right?:boolean, bottom?:boolean, container?:Container|Stage, index?:number, add?:boolean, reg?:boolean, regX?:boolean, regY?:boolean):this
    loc(target_or_x?:{}|DisplayObject|Point|number, y?:number, container?:Container|Stage, index?:number, add?:boolean, localToLocal?:boolean, x?:number):this
    mov(x:number, y?:number):this
    top():this
    bot():this
    ord(num:number):this
    dep(depth:number):this
    alp(alpha:number):this
    hov(value?:any, prop?:string):this
    rot(rotation:number):this
    siz(width:number, height?:number, only?:boolean):this
    ske(skewx:number, skewY?:number):this
    reg(regx:number, regY?:number, still?:boolean):this
    sca(scale:number, scaleY?:number):this
    scaleTo(boundObj?:DisplayObject, percentX?:number, percentY?:number, type?:string, boundsOnly?:boolean):this
    fit(left?:number, top?:number, width?:number, height?:number, inside?:boolean):{}
    outline(color?:string, size?:number):this
    addTo(container?:Container|Stage, index?:number, localToLocal?:boolean):this
    removeFrom(container?:Container|Stage):this
    added(call:Function, interval?:number, maxTime?:number):string
    centerReg(container?:Container|Stage, index?:number, add?:boolean):this
    center(container?:Container|Stage, index?:number, add?:boolean):this
    place(id?:string):this
    placeReg(id?:string):this
    expand(padding?:number, paddingVertical?:number):this
    setMask(mask:DisplayObject, dynamic?:boolean):this
    toggle(state?:boolean):this
    outlineToggle(state?:boolean):this
    // animate adds these:
    endTween():this
    resetTween():this
    replayTween():this
    // ZIM 4TH Properties
    readonly type:string
    width:number
    height:number
    widthOnly:number
    heightOnly:number
    depth:number
    percentSpeed:number
    percentComplete:number
    blendMode:string
    readonly paused:boolean
    readonly toggled:boolean
    readonly outlineToggled:boolean
    group:string
    dynamic:boolean
    // END ZIM Display Interface
    run(time?:number, label?, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, startFrame?:number, end ?:number, tweek?:number, id?:string, globalControl?:boolean):this
    pauseRun(state?:boolean):this
    stopRun():this
    hasProp(prop:string):boolean
    dispose():boolean
    clone():this
    id:any // string for Sprite and number for createjs.Sprite
    frame:number
    normalizedFrame:number
    normalizedFrames:[any]
    totalFrames:number
    animations:{}
    running:boolean
    runPaused:boolean
}

export class Shape extends createjs.Shape implements zimDisplay {
    constructor(width_or_boundsX?:number, height_or_boundsY?:number, width?:number, height?:number, graphics?:createjs.Graphics, style?:boolean, group?:string, inherit?:{})
    // ZIM Display Interface
    // ZIM 4TH Methods
    tap(call:Function, distance?:number, time?:number, once?:Boolean):this
    noTap():this
    drag(config_or_boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, overCursor?:string, dragCursor?:string, all?:boolean, swipe?:boolean, localBounds?:boolean, onTop?:boolean, surround?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:boolean, reg?:boolean, removeTweens?:boolean, startBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, currentTarget?:boolean):this
    drag(config:{boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, overCursor?:string, dragCursor?:string, all?:boolean, swipe?:boolean, localBounds?:boolean, onTop?:boolean, surround?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:boolean, reg?:boolean, removeTweens?:boolean, startBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, currentTarget?:boolean}):this
    noDrag():this
    dragBoundary(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    dragRect(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    transform(config_or_move?:boolean, stretchX?:boolean, stretchY?:boolean, scale?:boolean, rotate?:boolean, allowToggle?:boolean, visible?:boolean, onTop?:boolean, showStretch?:boolean, showRotate?:boolean, showScale?:boolean, showReg?:boolean, showBorder?:boolean, borderColor?:string, borderWidth?:number, dashed?:boolean, customCursors?:boolean, handleSize?:number, regSize?:number, snapDistance?:number, snapRotation?:number, cache?:boolean, events?:boolean, ghostColor?:string, ghostWidth?:number, ghostDashed?:boolean, ghostHidden?:boolean):this
    transform(config:{move?:boolean, stretchX?:boolean, stretchY?:boolean, scale?:boolean, rotate?:boolean, allowToggle?:boolean, visible?:boolean, onTop?:boolean, showStretch?:boolean, showRotate?:boolean, showScale?:boolean, showReg?:boolean, showBorder?:boolean, borderColor?:string, borderWidth?:number, dashed?:boolean, customCursors?:boolean, handleSize?:number, regSize?:number, snapDistance?:number, snapRotation?:number, cache?:boolean, events?:boolean, ghostColor?:string, ghostWidth?:number, ghostDashed?:boolean, ghostHidden?:boolean}):this
    setSwipe(swipe?:boolean):this
    gesture(config_or_move?:boolean, scale?:boolean, rotate?:boolean, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, minScale?:number, maxScale?:number, snapRotate?:number, localBounds?:boolean, slide?:boolean, slideEffect?:number, regControl?:boolean, onTop?:boolean, surround?:boolean, circularBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    gesture(config:{move?:boolean, scale?:boolean, rotate?:boolean, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, minScale?:number, maxScale?:number, snapRotate?:number, localBounds?:boolean, slide?:boolean, slideEffect?:number, regControl?:boolean, onTop?:boolean, surround?:boolean, circularBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}}):this
    noGesture(config_or_move?:boolean, scale?:boolean, rotate?:boolean):this
    noGesture(config:{move?:boolean, scale?:boolean, rotate?:boolean}):this
    gestureBoundary(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, update?:boolean):this
    addPhysics(dynamic?:boolean, contract?:number, shape?:string, friction?:number, linear?:number, angular?:number, density?:number, restitution?:number, maskBits?:number, categoryBits?:number, physics?:Physics):this
    removePhysics():this
    impulse(x?:number, y?:number, targetX?:number, targetY?:number):this
    force(x?:number, y?:number, targetX?:number, targetY?:number):this
    torque(amount?:number):this
    sleep():this
    wake():this
    follow(damp?:number, dampY?:number, leftOffset?:number, rightOffset?:number, upOffset?:number, downOffset?:number, offsetDamp?:number, offsetDampY?:number, horizontal?:boolean, vertical?:boolean, borderLock?:boolean, borderOriginal?:boolean):this
    control(type?:string, speed?:number, speedY?:number, horizontal?:boolean, vertical?:boolean):this
    noControl():this
    contact(call:Function):this
    contactEnd(call:Function):this
    noContact():this
    noContactEnd():this
    hitTestPoint(x:number, y:number, boundsCheck?:boolean):boolean
    hitTestReg(other:DisplayObject):boolean
    hitTestRect(other:DisplayObject, num?:number, boundsCheck?:boolean):boolean
    hitTestCircle(other:DisplayObject, num?:number, boundsCheck?:boolean):boolean
    hitTestCircles(other:DisplayObject, margin?:number):boolean
    hitTestBounds(other:DisplayObject, margin?:number, boundsShape?:boolean):boolean
    boundsToGlobal(rect:createjs.Rectangle|{x:number,y:number,width:number,height:number}, flip?:boolean):createjs.Rectangle
    resetBounds(width_or_boundsX?:number, height_or_boundsY?:number, width?:number, height?:number):this
    hitTestPath(other:DisplayObject, num?:number, showPoints?:boolean):boolean
    hitTestGrid(width?:number, height?:number, cols?:number, rows?:number, x?:number, y?:number, offsetX?:number, offsetY?:number, spacingX?:number, spacingY?:number, local?:boolean, type?:string):any
    animate(config_or_props:{}|[{}], time?:number|zimVee, ease?:string|zimVee, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, sequence?:number, sequenceCall?:Function, sequenceParams?:any, sequenceReverse?:boolean|zimVee, ticker?:boolean, cjsProps?:{}, css?:boolean, protect?:boolean, override?:boolean, from?:boolean|zimVee, set?:{}|zimVee, id?:string, events?:boolean, sequenceTarget?:any, dynamic?:boolean, drag?:boolean, clamp?:boolean, startPaused?:boolean, clean?:boolean, obj?:{}|[{}]):this
    animate(config:{props:{}|[{}], time?:number|zimVee, ease?:string|zimVee, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, sequence?:number, sequenceCall?:Function, sequenceParams?:any, sequenceReverse?:boolean|zimVee, ticker?:boolean, cjsProps?:{}, css?:boolean, protect?:boolean, override?:boolean, from?:boolean|zimVee, set?:{}|zimVee, id?:string, events?:boolean, sequenceTarget?:any, dynamic?:boolean, drag?:boolean, clamp?:boolean, startPaused?:boolean, clean?:boolean, obj?:{}|[{}]}):this
    stopAnimate(ids?:string|[string]):this
    pauseAnimate(state?:boolean, ids?:string|[string]):this
    wiggle(config_or_property:string, baseAmount:number|zimVee, minAmount?:number|zimVee, maxAmount?:number|zimVee, minTime?:number|zimVee, maxTime?:number|zimVee, totalTime?:number, type?:string, ease?:string, integer?:boolean, id?:string, startType?:string):this
    wiggle(config:{property:string, baseAmount:number|zimVee, minAmount?:number|zimVee, maxAmount?:number|zimVee, minTime?:number|zimVee, maxTime?:number|zimVee, totalTime?:number, type?:string, ease?:string, integer?:boolean, id?:string, startType?:string}):this
    copyMatrix(source:DisplayObject):this
    cur(type?:string):this
    sha(color_or_shadow?:string|createjs.Shadow, offsetX?:number, offsetY?:number, blur?:number):this
    pos(x?:number, y?:number, right?:boolean, bottom?:boolean, container?:Container|Stage, index?:number, add?:boolean, reg?:boolean, regX?:boolean, regY?:boolean):this
    loc(target_or_x?:{}|DisplayObject|Point|number, y?:number, container?:Container|Stage, index?:number, add?:boolean, localToLocal?:boolean, x?:number):this
    mov(x:number, y?:number):this
    top():this
    bot():this
    ord(num:number):this
    dep(depth:number):this
    alp(alpha:number):this
    hov(value?:any, prop?:string):this
    rot(rotation:number):this
    siz(width:number, height?:number, only?:boolean):this
    ske(skewx:number, skewY?:number):this
    reg(regx:number, regY?:number, still?:boolean):this
    sca(scale:number, scaleY?:number):this
    scaleTo(boundObj?:DisplayObject, percentX?:number, percentY?:number, type?:string, boundsOnly?:boolean):this
    fit(left?:number, top?:number, width?:number, height?:number, inside?:boolean):{}
    outline(color?:string, size?:number):this
    addTo(container?:Container|Stage, index?:number, localToLocal?:boolean):this
    removeFrom(container?:Container|Stage):this
    added(call:Function, interval?:number, maxTime?:number):string
    centerReg(container?:Container|Stage, index?:number, add?:boolean):this
    center(container?:Container|Stage, index?:number, add?:boolean):this
    place(id?:string):this
    placeReg(id?:string):this
    expand(padding?:number, paddingVertical?:number):this
    setMask(mask:DisplayObject, dynamic?:boolean):this
    toggle(state?:boolean):this
    outlineToggle(state?:boolean):this
    // animate adds these:
    endTween():this
    resetTween():this
    replayTween():this
    // ZIM 4TH Properties
    readonly type:string
    width:number
    height:number
    widthOnly:number
    heightOnly:number
    depth:number
    percentSpeed:number
    percentComplete:number
    blendMode:string
    readonly paused:boolean
    readonly toggled:boolean
    readonly outlineToggled:boolean
    group:string
    dynamic:boolean
    // END ZIM Display Interface
    cache(width_or_boundsX?:number, height_or_boundsY?:number, width?:number, height?:number, scale?:number, options?:{}):this
    hasProp(prop:string):boolean
    clone():this
}

export class Bitmap extends createjs.Bitmap implements zimDisplay {
    constructor(image?:HTMLImageElement, width?:number, height?:number, id?:string, style?:boolean, group?:string, inherit?:{})
    // ZIM Display Interface
    // ZIM 4TH Methods
    tap(call:Function, distance?:number, time?:number, once?:Boolean):this
    noTap():this
    drag(config_or_boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, overCursor?:string, dragCursor?:string, all?:boolean, swipe?:boolean, localBounds?:boolean, onTop?:boolean, surround?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:boolean, reg?:boolean, removeTweens?:boolean, startBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, currentTarget?:boolean):this
    drag(config:{boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, overCursor?:string, dragCursor?:string, all?:boolean, swipe?:boolean, localBounds?:boolean, onTop?:boolean, surround?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:boolean, reg?:boolean, removeTweens?:boolean, startBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, currentTarget?:boolean}):this
    noDrag():this
    dragBoundary(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    dragRect(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    transform(config_or_move?:boolean, stretchX?:boolean, stretchY?:boolean, scale?:boolean, rotate?:boolean, allowToggle?:boolean, visible?:boolean, onTop?:boolean, showStretch?:boolean, showRotate?:boolean, showScale?:boolean, showReg?:boolean, showBorder?:boolean, borderColor?:string, borderWidth?:number, dashed?:boolean, customCursors?:boolean, handleSize?:number, regSize?:number, snapDistance?:number, snapRotation?:number, cache?:boolean, events?:boolean, ghostColor?:string, ghostWidth?:number, ghostDashed?:boolean, ghostHidden?:boolean):this
    transform(config:{move?:boolean, stretchX?:boolean, stretchY?:boolean, scale?:boolean, rotate?:boolean, allowToggle?:boolean, visible?:boolean, onTop?:boolean, showStretch?:boolean, showRotate?:boolean, showScale?:boolean, showReg?:boolean, showBorder?:boolean, borderColor?:string, borderWidth?:number, dashed?:boolean, customCursors?:boolean, handleSize?:number, regSize?:number, snapDistance?:number, snapRotation?:number, cache?:boolean, events?:boolean, ghostColor?:string, ghostWidth?:number, ghostDashed?:boolean, ghostHidden?:boolean}):this
    setSwipe(swipe?:boolean):this
    gesture(config_or_move?:boolean, scale?:boolean, rotate?:boolean, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, minScale?:number, maxScale?:number, snapRotate?:number, localBounds?:boolean, slide?:boolean, slideEffect?:number, regControl?:boolean, onTop?:boolean, surround?:boolean, circularBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    gesture(config:{move?:boolean, scale?:boolean, rotate?:boolean, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, minScale?:number, maxScale?:number, snapRotate?:number, localBounds?:boolean, slide?:boolean, slideEffect?:number, regControl?:boolean, onTop?:boolean, surround?:boolean, circularBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}}):this
    noGesture(config_or_move?:boolean, scale?:boolean, rotate?:boolean):this
    noGesture(config:{move?:boolean, scale?:boolean, rotate?:boolean}):this
    gestureBoundary(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, update?:boolean):this
    addPhysics(dynamic?:boolean, contract?:number, shape?:string, friction?:number, linear?:number, angular?:number, density?:number, restitution?:number, maskBits?:number, categoryBits?:number, physics?:Physics):this
    removePhysics():this
    impulse(x?:number, y?:number, targetX?:number, targetY?:number):this
    force(x?:number, y?:number, targetX?:number, targetY?:number):this
    torque(amount?:number):this
    sleep():this
    wake():this
    follow(damp?:number, dampY?:number, leftOffset?:number, rightOffset?:number, upOffset?:number, downOffset?:number, offsetDamp?:number, offsetDampY?:number, horizontal?:boolean, vertical?:boolean, borderLock?:boolean, borderOriginal?:boolean):this
    control(type?:string, speed?:number, speedY?:number, horizontal?:boolean, vertical?:boolean):this
    noControl():this
    contact(call:Function):this
    contactEnd(call:Function):this
    noContact():this
    noContactEnd():this
    hitTestPoint(x:number, y:number, boundsCheck?:boolean):boolean
    hitTestReg(other:DisplayObject):boolean
    hitTestRect(other:DisplayObject, num?:number, boundsCheck?:boolean):boolean
    hitTestCircle(other:DisplayObject, num?:number, boundsCheck?:boolean):boolean
    hitTestCircles(other:DisplayObject, margin?:number):boolean
    hitTestBounds(other:DisplayObject, margin?:number, boundsShape?:boolean):boolean
    boundsToGlobal(rect:createjs.Rectangle|{x:number,y:number,width:number,height:number}, flip?:boolean):createjs.Rectangle
    resetBounds(width_or_boundsX?:number, height_or_boundsY?:number, width?:number, height?:number):this
    hitTestPath(other:DisplayObject, num?:number, showPoints?:boolean):boolean
    hitTestGrid(width?:number, height?:number, cols?:number, rows?:number, x?:number, y?:number, offsetX?:number, offsetY?:number, spacingX?:number, spacingY?:number, local?:boolean, type?:string):any
    animate(config_or_props:{}|[{}], time?:number|zimVee, ease?:string|zimVee, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, sequence?:number, sequenceCall?:Function, sequenceParams?:any, sequenceReverse?:boolean|zimVee, ticker?:boolean, cjsProps?:{}, css?:boolean, protect?:boolean, override?:boolean, from?:boolean|zimVee, set?:{}|zimVee, id?:string, events?:boolean, sequenceTarget?:any, dynamic?:boolean, drag?:boolean, clamp?:boolean, startPaused?:boolean, clean?:boolean, obj?:{}|[{}]):this
    animate(config:{props:{}|[{}], time?:number|zimVee, ease?:string|zimVee, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, sequence?:number, sequenceCall?:Function, sequenceParams?:any, sequenceReverse?:boolean|zimVee, ticker?:boolean, cjsProps?:{}, css?:boolean, protect?:boolean, override?:boolean, from?:boolean|zimVee, set?:{}|zimVee, id?:string, events?:boolean, sequenceTarget?:any, dynamic?:boolean, drag?:boolean, clamp?:boolean, startPaused?:boolean, clean?:boolean, obj?:{}|[{}]}):this
    stopAnimate(ids?:string|[string]):this
    pauseAnimate(state?:boolean, ids?:string|[string]):this
    wiggle(config_or_property:string, baseAmount:number|zimVee, minAmount?:number|zimVee, maxAmount?:number|zimVee, minTime?:number|zimVee, maxTime?:number|zimVee, totalTime?:number, type?:string, ease?:string, integer?:boolean, id?:string, startType?:string):this
    wiggle(config:{property:string, baseAmount:number|zimVee, minAmount?:number|zimVee, maxAmount?:number|zimVee, minTime?:number|zimVee, maxTime?:number|zimVee, totalTime?:number, type?:string, ease?:string, integer?:boolean, id?:string, startType?:string}):this
    copyMatrix(source:DisplayObject):this
    cur(type?:string):this
    sha(color_or_shadow?:string|createjs.Shadow, offsetX?:number, offsetY?:number, blur?:number):this
    pos(x?:number, y?:number, right?:boolean, bottom?:boolean, container?:Container|Stage, index?:number, add?:boolean, reg?:boolean, regX?:boolean, regY?:boolean):this
    loc(target_or_x?:{}|DisplayObject|Point|number, y?:number, container?:Container|Stage, index?:number, add?:boolean, localToLocal?:boolean, x?:number):this
    mov(x:number, y?:number):this
    top():this
    bot():this
    ord(num:number):this
    dep(depth:number):this
    alp(alpha:number):this
    hov(value?:any, prop?:string):this
    rot(rotation:number):this
    siz(width:number, height?:number, only?:boolean):this
    ske(skewx:number, skewY?:number):this
    reg(regx:number, regY?:number, still?:boolean):this
    sca(scale:number, scaleY?:number):this
    scaleTo(boundObj?:DisplayObject, percentX?:number, percentY?:number, type?:string, boundsOnly?:boolean):this
    fit(left?:number, top?:number, width?:number, height?:number, inside?:boolean):{}
    outline(color?:string, size?:number):this
    addTo(container?:Container|Stage, index?:number, localToLocal?:boolean):this
    removeFrom(container?:Container|Stage):this
    added(call:Function, interval?:number, maxTime?:number):string
    centerReg(container?:Container|Stage, index?:number, add?:boolean):this
    center(container?:Container|Stage, index?:number, add?:boolean):this
    place(id?:string):this
    placeReg(id?:string):this
    expand(padding?:number, paddingVertical?:number):this
    setMask(mask:DisplayObject, dynamic?:boolean):this
    toggle(state?:boolean):this
    outlineToggle(state?:boolean):this
    // animate adds these:
    endTween():this
    resetTween():this
    replayTween():this
    // ZIM 4TH Properties
    readonly type:string
    width:number
    height:number
    widthOnly:number
    heightOnly:number
    depth:number
    percentSpeed:number
    percentComplete:number
    blendMode:string
    readonly paused:boolean
    readonly toggled:boolean
    readonly outlineToggled:boolean
    group:string
    dynamic:boolean
    // END ZIM Display Interface
    // clone():this
    hasProp(prop:string):boolean
    dispose():boolean
    cache(width_or_boundsX?:number, height_or_boundsY?:number, width?:number, height?:number, scale?:number, options?:{}):this
    drawImageData(x?:number, y?:number, sourceX?:number, srcY?:number, srcWidth?:number, srcHeight?:number)
    imageData:{data:[number]}
}

export class MovieClip extends createjs.MovieClip implements zimDisplay {
    constructor(mode?:string, startPosition?:number, loop?:boolean, labels?:{}, style?:boolean, group?:string, inherit?:{})
    // ZIM Display Interface
    // ZIM 4TH Methods
    tap(call:Function, distance?:number, time?:number, once?:Boolean):this
    noTap():this
    drag(config_or_boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, overCursor?:string, dragCursor?:string, all?:boolean, swipe?:boolean, localBounds?:boolean, onTop?:boolean, surround?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:boolean, reg?:boolean, removeTweens?:boolean, startBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, currentTarget?:boolean):this
    drag(config:{boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, overCursor?:string, dragCursor?:string, all?:boolean, swipe?:boolean, localBounds?:boolean, onTop?:boolean, surround?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:boolean, reg?:boolean, removeTweens?:boolean, startBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, currentTarget?:boolean}):this
    noDrag():this
    dragBoundary(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    dragRect(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    transform(config_or_move?:boolean, stretchX?:boolean, stretchY?:boolean, scale?:boolean, rotate?:boolean, allowToggle?:boolean, visible?:boolean, onTop?:boolean, showStretch?:boolean, showRotate?:boolean, showScale?:boolean, showReg?:boolean, showBorder?:boolean, borderColor?:string, borderWidth?:number, dashed?:boolean, customCursors?:boolean, handleSize?:number, regSize?:number, snapDistance?:number, snapRotation?:number, cache?:boolean, events?:boolean, ghostColor?:string, ghostWidth?:number, ghostDashed?:boolean, ghostHidden?:boolean):this
    transform(config:{move?:boolean, stretchX?:boolean, stretchY?:boolean, scale?:boolean, rotate?:boolean, allowToggle?:boolean, visible?:boolean, onTop?:boolean, showStretch?:boolean, showRotate?:boolean, showScale?:boolean, showReg?:boolean, showBorder?:boolean, borderColor?:string, borderWidth?:number, dashed?:boolean, customCursors?:boolean, handleSize?:number, regSize?:number, snapDistance?:number, snapRotation?:number, cache?:boolean, events?:boolean, ghostColor?:string, ghostWidth?:number, ghostDashed?:boolean, ghostHidden?:boolean}):this
    setSwipe(swipe?:boolean):this
    gesture(config_or_move?:boolean, scale?:boolean, rotate?:boolean, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, minScale?:number, maxScale?:number, snapRotate?:number, localBounds?:boolean, slide?:boolean, slideEffect?:number, regControl?:boolean, onTop?:boolean, surround?:boolean, circularBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    gesture(config:{move?:boolean, scale?:boolean, rotate?:boolean, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, minScale?:number, maxScale?:number, snapRotate?:number, localBounds?:boolean, slide?:boolean, slideEffect?:number, regControl?:boolean, onTop?:boolean, surround?:boolean, circularBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}}):this
    noGesture(config_or_move?:boolean, scale?:boolean, rotate?:boolean):this
    noGesture(config:{move?:boolean, scale?:boolean, rotate?:boolean}):this
    gestureBoundary(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, update?:boolean):this
    addPhysics(dynamic?:boolean, contract?:number, shape?:string, friction?:number, linear?:number, angular?:number, density?:number, restitution?:number, maskBits?:number, categoryBits?:number, physics?:Physics):this
    removePhysics():this
    impulse(x?:number, y?:number, targetX?:number, targetY?:number):this
    force(x?:number, y?:number, targetX?:number, targetY?:number):this
    torque(amount?:number):this
    sleep():this
    wake():this
    follow(damp?:number, dampY?:number, leftOffset?:number, rightOffset?:number, upOffset?:number, downOffset?:number, offsetDamp?:number, offsetDampY?:number, horizontal?:boolean, vertical?:boolean, borderLock?:boolean, borderOriginal?:boolean):this
    control(type?:string, speed?:number, speedY?:number, horizontal?:boolean, vertical?:boolean):this
    noControl():this
    contact(call:Function):this
    contactEnd(call:Function):this
    noContact():this
    noContactEnd():this
    hitTestPoint(x:number, y:number, boundsCheck?:boolean):boolean
    hitTestReg(other:DisplayObject):boolean
    hitTestRect(other:DisplayObject, num?:number, boundsCheck?:boolean):boolean
    hitTestCircle(other:DisplayObject, num?:number, boundsCheck?:boolean):boolean
    hitTestCircles(other:DisplayObject, margin?:number):boolean
    hitTestBounds(other:DisplayObject, margin?:number, boundsShape?:boolean):boolean
    boundsToGlobal(rect:createjs.Rectangle|{x:number,y:number,width:number,height:number}, flip?:boolean):createjs.Rectangle
    resetBounds(width_or_boundsX?:number, height_or_boundsY?:number, width?:number, height?:number):this
    hitTestPath(other:DisplayObject, num?:number, showPoints?:boolean):boolean
    hitTestGrid(width?:number, height?:number, cols?:number, rows?:number, x?:number, y?:number, offsetX?:number, offsetY?:number, spacingX?:number, spacingY?:number, local?:boolean, type?:string):any
    animate(config_or_props:{}|[{}], time?:number|zimVee, ease?:string|zimVee, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, sequence?:number, sequenceCall?:Function, sequenceParams?:any, sequenceReverse?:boolean|zimVee, ticker?:boolean, cjsProps?:{}, css?:boolean, protect?:boolean, override?:boolean, from?:boolean|zimVee, set?:{}|zimVee, id?:string, events?:boolean, sequenceTarget?:any, dynamic?:boolean, drag?:boolean, clamp?:boolean, startPaused?:boolean, clean?:boolean, obj?:{}|[{}]):this
    animate(config:{props:{}|[{}], time?:number|zimVee, ease?:string|zimVee, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, sequence?:number, sequenceCall?:Function, sequenceParams?:any, sequenceReverse?:boolean|zimVee, ticker?:boolean, cjsProps?:{}, css?:boolean, protect?:boolean, override?:boolean, from?:boolean|zimVee, set?:{}|zimVee, id?:string, events?:boolean, sequenceTarget?:any, dynamic?:boolean, drag?:boolean, clamp?:boolean, startPaused?:boolean, clean?:boolean, obj?:{}|[{}]}):this
    stopAnimate(ids?:string|[string]):this
    pauseAnimate(state?:boolean, ids?:string|[string]):this
    wiggle(config_or_property:string, baseAmount:number|zimVee, minAmount?:number|zimVee, maxAmount?:number|zimVee, minTime?:number|zimVee, maxTime?:number|zimVee, totalTime?:number, type?:string, ease?:string, integer?:boolean, id?:string, startType?:string):this
    wiggle(config:{property:string, baseAmount:number|zimVee, minAmount?:number|zimVee, maxAmount?:number|zimVee, minTime?:number|zimVee, maxTime?:number|zimVee, totalTime?:number, type?:string, ease?:string, integer?:boolean, id?:string, startType?:string}):this
    copyMatrix(source:DisplayObject):this
    cur(type?:string):this
    sha(color_or_shadow?:string|createjs.Shadow, offsetX?:number, offsetY?:number, blur?:number):this
    pos(x?:number, y?:number, right?:boolean, bottom?:boolean, container?:Container|Stage, index?:number, add?:boolean, reg?:boolean, regX?:boolean, regY?:boolean):this
    loc(target_or_x?:{}|DisplayObject|Point|number, y?:number, container?:Container|Stage, index?:number, add?:boolean, localToLocal?:boolean, x?:number):this
    mov(x:number, y?:number):this
    top():this
    bot():this
    ord(num:number):this
    dep(depth:number):this
    alp(alpha:number):this
    hov(value?:any, prop?:string):this
    rot(rotation:number):this
    siz(width:number, height?:number, only?:boolean):this
    ske(skewx:number, skewY?:number):this
    reg(regx:number, regY?:number, still?:boolean):this
    sca(scale:number, scaleY?:number):this
    scaleTo(boundObj?:DisplayObject, percentX?:number, percentY?:number, type?:string, boundsOnly?:boolean):this
    fit(left?:number, top?:number, width?:number, height?:number, inside?:boolean):{}
    outline(color?:string, size?:number):this
    addTo(container?:Container|Stage, index?:number, localToLocal?:boolean):this
    removeFrom(container?:Container|Stage):this
    added(call:Function, interval?:number, maxTime?:number):string
    centerReg(container?:Container|Stage, index?:number, add?:boolean):this
    center(container?:Container|Stage, index?:number, add?:boolean):this
    place(id?:string):this
    placeReg(id?:string):this
    expand(padding?:number, paddingVertical?:number):this
    setMask(mask:DisplayObject, dynamic?:boolean):this
    toggle(state?:boolean):this
    outlineToggle(state?:boolean):this
    // animate adds these:
    endTween():this
    resetTween():this
    replayTween():this
    // ZIM 4TH Properties
    readonly type:string
    width:number
    height:number
    widthOnly:number
    heightOnly:number
    depth:number
    percentSpeed:number
    percentComplete:number
    blendMode:string
    readonly paused:boolean
    readonly toggled:boolean
    readonly outlineToggled:boolean
    group:string
    dynamic:boolean
    // END ZIM Display Interface
    hasProp(prop:string):boolean
    dispose():boolean
}

export class SVGContainer extends Container implements zimDisplay {
    constructor(config_or_svg?:any, splitTypes?:boolean, geometric?:boolean, showControls?:boolean, interactive?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{svg?:any, splitTypes?:boolean, geometric?:boolean, showControls?:boolean, interactive?:boolean, style?:boolean, group?:string, inherit?:{}})
    // ZIM Display Interface
    // ZIM 4TH Methods
    tap(call:Function, distance?:number, time?:number, once?:Boolean):this
    noTap():this
    drag(config_or_boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, overCursor?:string, dragCursor?:string, all?:boolean, swipe?:boolean, localBounds?:boolean, onTop?:boolean, surround?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:boolean, reg?:boolean, removeTweens?:boolean, startBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, currentTarget?:boolean):this
    drag(config:{boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, overCursor?:string, dragCursor?:string, all?:boolean, swipe?:boolean, localBounds?:boolean, onTop?:boolean, surround?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:boolean, reg?:boolean, removeTweens?:boolean, startBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, currentTarget?:boolean}):this
    noDrag():this
    dragBoundary(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    dragRect(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    transform(config_or_move?:boolean, stretchX?:boolean, stretchY?:boolean, scale?:boolean, rotate?:boolean, allowToggle?:boolean, visible?:boolean, onTop?:boolean, showStretch?:boolean, showRotate?:boolean, showScale?:boolean, showReg?:boolean, showBorder?:boolean, borderColor?:string, borderWidth?:number, dashed?:boolean, customCursors?:boolean, handleSize?:number, regSize?:number, snapDistance?:number, snapRotation?:number, cache?:boolean, events?:boolean, ghostColor?:string, ghostWidth?:number, ghostDashed?:boolean, ghostHidden?:boolean):this
    transform(config:{move?:boolean, stretchX?:boolean, stretchY?:boolean, scale?:boolean, rotate?:boolean, allowToggle?:boolean, visible?:boolean, onTop?:boolean, showStretch?:boolean, showRotate?:boolean, showScale?:boolean, showReg?:boolean, showBorder?:boolean, borderColor?:string, borderWidth?:number, dashed?:boolean, customCursors?:boolean, handleSize?:number, regSize?:number, snapDistance?:number, snapRotation?:number, cache?:boolean, events?:boolean, ghostColor?:string, ghostWidth?:number, ghostDashed?:boolean, ghostHidden?:boolean}):this
    setSwipe(swipe?:boolean):this
    gesture(config_or_move?:boolean, scale?:boolean, rotate?:boolean, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, minScale?:number, maxScale?:number, snapRotate?:number, localBounds?:boolean, slide?:boolean, slideEffect?:number, regControl?:boolean, onTop?:boolean, surround?:boolean, circularBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}):this
    gesture(config:{move?:boolean, scale?:boolean, rotate?:boolean, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, minScale?:number, maxScale?:number, snapRotate?:number, localBounds?:boolean, slide?:boolean, slideEffect?:number, regControl?:boolean, onTop?:boolean, surround?:boolean, circularBounds?:boolean, rect?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}}):this
    noGesture(config_or_move?:boolean, scale?:boolean, rotate?:boolean):this
    noGesture(config:{move?:boolean, scale?:boolean, rotate?:boolean}):this
    gestureBoundary(boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, update?:boolean):this
    addPhysics(dynamic?:boolean, contract?:number, shape?:string, friction?:number, linear?:number, angular?:number, density?:number, restitution?:number, maskBits?:number, categoryBits?:number, physics?:Physics):this
    removePhysics():this
    impulse(x?:number, y?:number, targetX?:number, targetY?:number):this
    force(x?:number, y?:number, targetX?:number, targetY?:number):this
    torque(amount?:number):this
    sleep():this
    wake():this
    follow(damp?:number, dampY?:number, leftOffset?:number, rightOffset?:number, upOffset?:number, downOffset?:number, offsetDamp?:number, offsetDampY?:number, horizontal?:boolean, vertical?:boolean, borderLock?:boolean, borderOriginal?:boolean):this
    control(type?:string, speed?:number, speedY?:number, horizontal?:boolean, vertical?:boolean):this
    noControl():this
    contact(call:Function):this
    contactEnd(call:Function):this
    noContact():this
    noContactEnd():this
    hitTestPoint(x:number, y:number, boundsCheck?:boolean):boolean
    hitTestReg(other:DisplayObject):boolean
    hitTestRect(other:DisplayObject, num?:number, boundsCheck?:boolean):boolean
    hitTestCircle(other:DisplayObject, num?:number, boundsCheck?:boolean):boolean
    hitTestCircles(other:DisplayObject, margin?:number):boolean
    hitTestBounds(other:DisplayObject, margin?:number, boundsShape?:boolean):boolean
    boundsToGlobal(rect:createjs.Rectangle|{x:number,y:number,width:number,height:number}, flip?:boolean):createjs.Rectangle
    resetBounds(width_or_boundsX?:number, height_or_boundsY?:number, width?:number, height?:number):this
    hitTestPath(other:DisplayObject, num?:number, showPoints?:boolean):boolean
    hitTestGrid(width?:number, height?:number, cols?:number, rows?:number, x?:number, y?:number, offsetX?:number, offsetY?:number, spacingX?:number, spacingY?:number, local?:boolean, type?:string):any
    animate(config_or_props:{}|[{}], time?:number|zimVee, ease?:string|zimVee, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, sequence?:number, sequenceCall?:Function, sequenceParams?:any, sequenceReverse?:boolean|zimVee, ticker?:boolean, cjsProps?:{}, css?:boolean, protect?:boolean, override?:boolean, from?:boolean|zimVee, set?:{}|zimVee, id?:string, events?:boolean, sequenceTarget?:any, dynamic?:boolean, drag?:boolean, clamp?:boolean, startPaused?:boolean, clean?:boolean, obj?:{}|[{}]):this
    animate(config:{props:{}|[{}], time?:number|zimVee, ease?:string|zimVee, call?:Function, params?:any, wait?:number|zimVee, waitedCall?:Function, waitedParams?:any, loop?:boolean, loopCount?:number|zimVee, loopWait?:number|zimVee, loopCall?:Function, loopParams?:any, loopWaitCall?:Function, loopWaitParams?:any, rewind?:boolean|zimVee, rewindWait?:number|zimVee, rewindCall?:Function, rewindParams?:any, rewindWaitCall?:Function, rewindWaitParams?:any, sequence?:number, sequenceCall?:Function, sequenceParams?:any, sequenceReverse?:boolean|zimVee, ticker?:boolean, cjsProps?:{}, css?:boolean, protect?:boolean, override?:boolean, from?:boolean|zimVee, set?:{}|zimVee, id?:string, events?:boolean, sequenceTarget?:any, dynamic?:boolean, drag?:boolean, clamp?:boolean, startPaused?:boolean, clean?:boolean, obj?:{}|[{}]}):this
    stopAnimate(ids?:string|[string]):this
    pauseAnimate(state?:boolean, ids?:string|[string]):this
    wiggle(config_or_property:string, baseAmount:number|zimVee, minAmount?:number|zimVee, maxAmount?:number|zimVee, minTime?:number|zimVee, maxTime?:number|zimVee, totalTime?:number, type?:string, ease?:string, integer?:boolean, id?:string, startType?:string):this
    wiggle(config:{property:string, baseAmount:number|zimVee, minAmount?:number|zimVee, maxAmount?:number|zimVee, minTime?:number|zimVee, maxTime?:number|zimVee, totalTime?:number, type?:string, ease?:string, integer?:boolean, id?:string, startType?:string}):this
    copyMatrix(source:DisplayObject):this
    cur(type?:string):this
    sha(color_or_shadow?:string|createjs.Shadow, offsetX?:number, offsetY?:number, blur?:number):this
    pos(x?:number, y?:number, right?:boolean, bottom?:boolean, container?:Container|Stage, index?:number, add?:boolean, reg?:boolean, regX?:boolean, regY?:boolean):this
    loc(target_or_x?:{}|DisplayObject|Point|number, y?:number, container?:Container|Stage, index?:number, add?:boolean, localToLocal?:boolean, x?:number):this
    mov(x:number, y?:number):this
    top():this
    bot():this
    ord(num:number):this
    dep(depth:number):this
    alp(alpha:number):this
    hov(value?:any, prop?:string):this
    rot(rotation:number):this
    siz(width:number, height?:number, only?:boolean):this
    ske(skewx:number, skewY?:number):this
    reg(regx:number, regY?:number, still?:boolean):this
    sca(scale:number, scaleY?:number):this
    scaleTo(boundObj?:DisplayObject, percentX?:number, percentY?:number, type?:string, boundsOnly?:boolean):this
    fit(left?:number, top?:number, width?:number, height?:number, inside?:boolean):{}
    outline(color?:string, size?:number):this
    addTo(container?:Container|Stage, index?:number, localToLocal?:boolean):this
    removeFrom(container?:Container|Stage):this
    added(call:Function, interval?:number, maxTime?:number):string
    centerReg(container?:Container|Stage, index?:number, add?:boolean):this
    center(container?:Container|Stage, index?:number, add?:boolean):this
    place(id?:string):this
    placeReg(id?:string):this
    expand(padding?:number, paddingVertical?:number):this
    setMask(mask:DisplayObject, dynamic?:boolean):this
    toggle(state?:boolean):this
    outlineToggle(state?:boolean):this
    // animate adds these:
    endTween():this
    resetTween():this
    replayTween():this
    // ZIM 4TH Properties
    readonly type:string
    width:number
    height:number
    widthOnly:number
    heightOnly:number
    depth:number
    percentSpeed:number
    percentComplete:number
    blendMode:string
    readonly paused:boolean
    readonly toggled:boolean
    readonly outlineToggled:boolean
    group:string
    dynamic:boolean
    // END ZIM Display Interface
    svg:string
}

export class Circle extends Container implements zimShape {
    constructor(radius?:number, color?:string, borderColor?:string, borderWidth?:number, dashed?, percent?:number, strokeObj?:{}, style?:boolean, group?:string, inherit?:{})
    // ZIM Shape Interface
    readonly shape:Shape
    color:string
    colorRange:number
    readonly colorCommand:createjs.Graphics.Fill
    borderColor:string
    readonly borderColorCommand:createjs.Graphics.Stroke
    borderWidth:number
    readonly borderDashedCommand:createjs.Graphics.StrokeDash
    setColorRange(color1?:string, color2?:string):this
    linearGradient(colors:[any], ratios:[any], x0:number, y0:number, x1:number, y1:number):this
    radialGradient(colors:[any], ratios:[any], x0:number, y0:number, radius0:number, x1:number, y1:number, radius1:number):this
    // END ZIM Shape Interface
    radius:number
}

export class Rectangle extends Container implements zimShape {
    constructor(config_or_width?:number, height?:number, color?:string, borderColor?:string, borderWidth?:number, corner?:number|any[], dashed?:boolean, strokeObj?:{}, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, height?:number, color?:string, borderColor?:string, borderWidth?:number, corner?:number|any[], dashed?:boolean, strokeObj?:{}, style?:boolean, group?:string, inherit?:{}})
    // ZIM Shape Interface
    readonly shape:Shape
    color:string
    colorRange:number
    readonly colorCommand:createjs.Graphics.Fill
    borderColor:string
    readonly borderColorCommand:createjs.Graphics.Stroke
    borderWidth:number
    readonly borderDashedCommand:createjs.Graphics.StrokeDash
    setColorRange(color1?:string, color2?:string):this
    linearGradient(colors:[any], ratios:[any], x0:number, y0:number, x1:number, y1:number):this
    radialGradient(colors:[any], ratios:[any], x0:number, y0:number, radius0:number, x1:number, y1:number, radius1:number):this
    // END ZIM Shape Interface
}

export class Triangle extends Container implements zimShape {
    constructor(config_or_a?:number, b?:number, c?:number, color?:string, borderColor?:string, borderWidth?:number, center?:boolean, adjust?:number, dashed?:boolean, strokeObj?:{}, style?:boolean, group?:string, inherit?:{})
    constructor(config:{a?:number, b?:number, c?:number, color?:string, borderColor?:string, borderWidth?:number, center?:boolean, adjust?:number, dashed?:boolean, strokeObj?:{}, style?:boolean, group?:string, inherit?:{}})
    // ZIM Shape Interface
    readonly shape:Shape
    color:string
    colorRange:number
    readonly colorCommand:createjs.Graphics.Fill
    borderColor:string
    readonly borderColorCommand:createjs.Graphics.Stroke
    borderWidth:number
    readonly borderDashedCommand:createjs.Graphics.StrokeDash
    setColorRange(color1?:string, color2?:string):this
    linearGradient(colors:[any], ratios:[any], x0:number, y0:number, x1:number, y1:number):this
    radialGradient(colors:[any], ratios:[any], x0:number, y0:number, radius0:number, x1:number, y1:number, radius1:number):this
    // END ZIM Shape Interface
    readonly one:{x:number, y:number}
    readonly two:{x:number, y:number}
    readonly three:{x:number, y:number}
    readonly angles:number[]
}

export class Squiggle extends Container {
    constructor(config_or_color?:string, thickness?:number, points?:number|any[], length?:number, controlLength?:number|zimVee, controlType?:string, lockControlType?:string, showControls?:boolean, lockControls?:boolean, handleSize?:number, allowToggle?:boolean, move?:boolean, ctrlclick?:boolean, dashed?:boolean, onTop?:boolean, stickColor?:string, selectColor?:string, selectPoints?:boolean, editPoints?:string|boolean, interactive?:boolean, strokeObj?:{}, style?:boolean, group?:string, inherit?:{})
    constructor(config:{color?:string, thickness?:number, points?:number|any[], length?:number, controlLength?:number|zimVee, controlType?:string, lockControlType?:string, showControls?:boolean, lockControls?:boolean, handleSize?:number, allowToggle?:boolean, move?:boolean, ctrlclick?:boolean, dashed?:boolean, onTop?:boolean, stickColor?:string, selectColor?:string, selectPoints?:boolean, editPoints?:string|boolean, interactive?:boolean, strokeObj?:{}, style?:boolean, group?:string, inherit?:{}})
    readonly shape:Shape
    color:string
    colorRange:number
    stickColor:string
    readonly colorCommand:createjs.Graphics.Fill
    thickness:number
    readonly thicknessCommand:createjs.Graphics.Stroke
    readonly dashedCommand:createjs.Graphics.StrokeDash
    addPoint(percent?:number, controlType?:string):this
    addPoints(num?:number, controlType?:string, startPoint?:number, spread?:boolean, dataOnly?:boolean, points?:any[]):this
    interpolate(num?:number, startPoint?:number, spread?:boolean):any[]
    setColorRange(color1?:string, color2?:string):this
    recordData(toJSON?:boolean):{x:number, y:number, points:any[][], color:string, borderColor:string, borderWidth:number, move:boolean, toggle:boolean, controls:boolean}
    setData(data:string|{x:number, y:number, points:any[][], color:string, borderColor:string, borderWidth:number, move:boolean, toggle:boolean, controls:boolean}, fromJSON?:boolean):this
    recordPoints(popup:boolean):any[][]
    setPoints(data:any[][]):this
    changeControl(config_or_index:number, type?:string, rect1X?:number, rect1Y?:number, rect2X?:number, rect2Y?:number, circleX?:number, circleY?:number, update?:boolean):this
    changeControl(config:{index:number, type?:string, rect1X?:number, rect1Y?:number, rect2X?:number, rect2Y?:number, circleX?:number, circleY?:number, update?:boolean}):this
    transformPoints(transformType:string, amount:number, x?:number, y?:number):this
    update(normalized?:boolean):this
    showControls():this
    hideControls():this
    traverse(obj:DisplayObject, start?:number, end?:number, time?:number):this
    readonly num:number
    points:any[]
    pointsAdjusted:any[]
    pointObjects:any[]
    readonly segmentPoints:any[]
    readonly segmentRatios:any[]
    getPointAngle(index:number):number
    getSegmentPoint(point1:any[], point2:any[]):any[]
    getCurvePoint(ratio?:number, segmentRatios?:any[], segmentPoints?:any[], getAngle?:boolean):{}
    readonly controls:Container
    controlsVisible:boolean
    readonly sticks:Container
    readonly lastSelected:Container
    readonly lastSelectedIndex:number
    types:string[]
    lockControls:boolean
    lockControlType:boolean
    allowToggle:boolean
    move:boolean
    ctrlclick:boolean
    addPointFactor:number
    addMinDistance:number
}
// ZIM Blob is only available in the module using the zim namespace

export class Label extends Container implements zimComponent {
    constructor(config_or_text?:string|zimVee, size?:number, font?:string, color?:string, rollColor?:string, shadowColor?:string, shadowBlur?:number, align?:string, valign?:string, lineWidth?:number, lineHeight?:number, fontOptions?:string, backing?:DisplayObject, outlineColor?:string, outlineWidth?:number, backgroundColor?:string, backgroundBorderColor?:string, backgroundBorderWidth?:number, corner?:number|any[], backgroundDashed?:boolean, padding?:number, paddingHorizontal?:number, paddingVertical?:number, shiftHorizontal?:number, shiftVertical?:number, rollPersist?:boolean, labelWidth?:number, labelHeight?:number, maxSize?:number, style?:boolean, group?:string, inherit?:{})
    constructor(config:{text?:string|zimVee, size?:number, font?:string, color?:string, rollColor?:string, shadowColor?:string, shadowBlur?:number, align?:string, valign?:string, lineWidth?:number, lineHeight?:number, fontOptions?:string, backing?:DisplayObject, outlineColor?:string, outlineWidth?:number, backgroundColor?:string, backgroundBorderColor?:string, backgroundBorderWidth?:number, corner?:number|any[], backgroundDashed?:boolean, padding?:number, paddingHorizontal?:number, paddingVertical?:number, shiftHorizontal?:number, shiftVertical?:number, rollPersist?:boolean, labelWidth?:number, labelHeight?:number, maxSize?:number, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    showRollColor(visible:boolean):this
    label:createjs.Text
    color:string
    backgroundColor:string
    colorRange:number
    rollColor:string
    labelWidth:number
    labelHeight:number
    text:string
    size:number
    backing:DisplayObject
    background:Rectangle
    setColorRange(color1?:string, color2?:string):this
}
export class LabelOnPath extends Container implements zimComponent {
    constructor(config_or_label?:string|Label, path?:Squiggle|zim.Blob, percentAngle?:number, percents?:number[], showPath?:boolean, allowToggle?:boolean, interactive?:boolean, onTop?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{label?:string|Label, path?:Squiggle|zim.Blob, percentAngle?:number, percents?:number[], showPath?:boolean, allowToggle?:boolean, interactive?:boolean, onTop?:boolean, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    toggle(state?:boolean):this
    hidePath():this
    showPath():this
    resize():this
    text:string
    readonly path:Squiggle|zim.Blob
    readonly letters:Container
    readonly numLetters:number
    readonly percents:number[]
    allowToggle:boolean
    interactive:boolean
}
export class Button extends Container implements zimComponent {
    constructor(config_or_width?:number, height?:number, label?:string|Label, backgroundColor?:string, rollBackgroundColor?:string, color?:string, rollColor?:string, borderColor?:string, borderRollColor?:string, borderWidth?:number, corner?:number|any[], shadowColor?:string, shadowBlur?:number, hitPadding?:number, gradient?:number, gloss?:number, dashed?:boolean, backing?:DisplayObject, rollBacking?:DisplayObject, rollPersist?:boolean, icon?:DisplayObject, rollIcon?:DisplayObject, toggle?:string, toggleBacking?:DisplayObject, rollToggleBacking?:DisplayObject, toggleIcon?:DisplayObject, rollToggleIcon?:DisplayObject, toggleEvent?:string, wait?:string, waitTime?:boolean, waitBackgroundColor?:string, rollWaitBackgroundColor?:string, waitColor?:string, rollWaitColor?:string, waitModal?:boolean, waitEnabled?:boolean, waitBacking?:DisplayObject, rollWaitBacking?:DisplayObject, waitIcon?:DisplayObject, rollWaitIcon?:DisplayObject, align?:number, valign?:number, indent?:number, indentHorizontal?:number, indentVertical?:number, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, height?:number, label?:string|Label, backgroundColor?:string, rollBackgroundColor?:string, color?:string, rollColor?:string, borderColor?:string, borderRollColor?:string, borderWidth?:number, corner?:number|any[], shadowColor?:string, shadowBlur?:number, hitPadding?:number, gradient?:number, gloss?:number, dashed?:boolean, backing?:DisplayObject, rollBacking?:DisplayObject, rollPersist?:boolean, icon?:DisplayObject, rollIcon?:DisplayObject, toggle?:string, toggleBacking?:DisplayObject, rollToggleBacking?:DisplayObject, toggleIcon?:DisplayObject, rollToggleIcon?:DisplayObject, toggleEvent?:string, wait?:string, waitTime?:boolean, waitBackgroundColor?:string, rollWaitBackgroundColor?:string, waitColor?:string, rollWaitColor?:string, waitModal?:boolean, waitEnabled?:boolean, waitBacking?:DisplayObject, rollWaitBacking?:DisplayObject, waitIcon?:DisplayObject, rollWaitIcon?:DisplayObject, align?:number, valign?:number, indent?:number, indentHorizontal?:number, indentVertical?:number, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    setBackings(newBacking:DisplayObject, newRollBacking:DisplayObject):this
    setIcons(newIcon:DisplayObject, newRollIcon:DisplayObject):this
    toggle(state?:boolean):this
    wait():this
    clearWait():this
    removeWait():this
    text:string
    label:Label
    color:string
    rollColor:string
    rollPersist:Boolean
    borderColor:string
    borderRollColor:string
    hitPadding:number
    readonly backing:DisplayObject
    readonly rollBacking:DisplayObject
    readonly icon:DisplayObject
    readonly rollIcon:DisplayObject
    readonly rolled:boolean
    readonly toggled:boolean
    readonly toggleBacking:DisplayObject
    readonly rollToggleBacking:DisplayObject
    readonly toggleIcon:DisplayObject
    readonly rollToggleIcon:DisplayObject
    readonly waiting:boolean
    readonlywaitBacking:DisplayObject
    readonly rollWaitBacking:DisplayObject
    readonly waitIcon:DisplayObject
    readonly rollWaitIcon:DisplayObject
    focus:boolean

}
export class CheckBox extends Container implements zimComponent {
    constructor(config_or_size?:number, label?:string|Label, startChecked?:boolean, color?:string, backgroundColor?:string, margin?:number, indicatorType?:string, indicatorColor?:string, tap?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{size?:number, label?:string|Label, startChecked?:boolean, color?:string, backgroundColor?:string, margin?:number, indicatorType?:string, indicatorColor?:string, tap?:boolean, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    setChecked(type:Boolean):this
    toggle(type:Boolean):this
    checked:boolean
    toggled:boolean
    label:Label
    text:string
    indicator:Shape
    indicatorColor:string
    backgroundColor:string
}
export class RadioButtons extends Container implements zimComponent {
    constructor(config_or_size?:number, buttons?:string[]|{}[], vertical?:boolean, color?:string, backgroundColor?:string, spacing?:number, margin?:number, always?:boolean, indicatorColor?:string, style?:boolean, group?:string, inherit?:{})
    constructor(config:{size?:number, buttons?:string[]|{}[], vertical?:boolean, color?:string, backgroundColor?:string, spacing?:number, margin?:number, always?:boolean, indicatorColor?:string, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    setSelected(num:number):this
    readonly selected:{index:number, selected:boolean, label:Label}
    selectedIndex:number
    label:Label
    text:string
    id:any
    buttons:Container[]
    labels:Label[]
    indicators:Shape[]
}
export class Toggle extends Container implements zimComponent {
    constructor(config_or_width?:number, height?:number, label?:string|Label, startToggled?:boolean, backgroundColor?:string, margin?:number, indicatorType?:string, indicatorColor?:string, toggleBackgroundColor?:string, color?:string, borderColor?:string, borderWidth?:number, corner?:number|number[], indicatorCorner?:number|number[], shadowColor?:string, shadowBlur?:number, time?:number, labelLeft?:string|Label, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, height?:number, label?:string|Label, startToggled?:boolean, backgroundColor?:string, margin?:number, indicatorType?:string, indicatorColor?:string, toggleBackgroundColor?:string, color?:string, borderColor?:string, borderWidth?:number, corner?:number|number[], indicatorCorner?:number|number[], shadowColor?:string, shadowBlur?:number, time?:number, labelLeft?:string|Label, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    toggle(state:boolean):this
    readonly toggled:boolean
    readonly text:string
    readonly indicator:DisplayObject
    readonly background:Rectangle
    readonly label:Label
    readonly labelLeft:Label
}
export class Tip extends Label implements zimComponent {
    constructor(config_or_text?:string, align?:string, valign?:string, margin?:number, marginH?:number, marginV?:number, outside?:boolean, target?:DisplayObject,  size?:number, font?:string, color?:string, rollColor?:string, shadowColor?:string, shadowBlur?:number, textAlign?:string, textValign?:string, lineWidth?:number, lineHeight?:number, fontOptions?:string, backing?:DisplayObject, outlineColor?:string, outlineWidth?:number, backgroundColor?:string, backgroundBorderColor?:string, backgroundBorderWidth?:number, corner?:number|any[], backgroundDashed?:boolean, padding?:number, paddingHorizontal?:number, paddingVertical?:number, shiftHorizontal?:number, shiftVertical?:number, rollPersist?:boolean, labelWidth?:number, labelHeight?:number, maxSize?:number, style?:boolean, group?:string, inherit?:{})
    constructor(config:{text?:string, align?:string, valign?:string, margin?:number, marginH?:number, marginV?:number, outside?:boolean, target?:DisplayObject,  size?:number, font?:string, color?:string, rollColor?:string, shadowColor?:string, shadowBlur?:number, textAlign?:string, textValign?:string, lineWidth?:number, lineHeight?:number, fontOptions?:string, backing?:DisplayObject, outlineColor?:string, outlineWidth?:number, backgroundColor?:string, backgroundBorderColor?:string, backgroundBorderWidth?:number, corner?:number|any[], backgroundDashed?:boolean, padding?:number, paddingHorizontal?:number, paddingVertical?:number, shiftHorizontal?:number, shiftVertical?:number, rollPersist?:boolean, labelWidth?:number, labelHeight?:number, maxSize?:number, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    show(delay?:number, time?:number):this
    hide():this
    clear():this
    align:string
    valign:string
}
export class Panel extends Container implements zimComponent {
    constructor(config_or_width?:number, height?:number, titleBar?:string|Label, titleBarColor?:string, titleBarBackroundColor?:string, titleBarHeight?:number, backgroundColor?:string, borderColor?:string, borderWidth?:number, corner?:number|any[], arrow?:boolean, align?:string, shadowColor?:string, shadowBlur?:number, draggable?:boolean, boundary?:Boundary|{}, extraButton?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, height?:number, titleBar?:string|Label, titleBarColor?:string, titleBarBackroundColor?:string, titleBarHeight?:number, backgroundColor?:string, borderColor?:string, borderWidth?:number, corner?:number|any[], arrow?:boolean, align?:string, shadowColor?:string, shadowBlur?:number, draggable?:boolean, boundary?:Boundary|{}, extraButton?:boolean, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    nextPanel(index?:number, event?:boolean):this
    readonly titleBar:Rectangle
    readonly label:Label
    readonly text:string
    readonly arrow:Shape
    readonly background:Rectangle
    readonly overlay:Rectangle
    readonly extraButton:Label
}
export class Pane extends Container implements zimComponent {
    constructor(config_or_width?:number, height?:number, label?:string|Label, backgroundColor?:string, color?:string, draggable?:boolean, resets?:boolean, modal?:boolean, corner?:number|any[], backdropColor?:string, shadowColor?:string, shadowBlur?:number, center?:boolean, displayClose?:boolean, backdropClose?:boolean, backing?:DisplayObject, fadeTime?:number, container?:Stage|Container, titleBar?:string|Label, titleBarColor?:string, titleBarBackroundColor?:string, titleBarHeight?:number, close?:boolean, closeColor?:string, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, height?:number, label?:string|Label, backgroundColor?:string, color?:string, draggable?:boolean, resets?:boolean, modal?:boolean, corner?:number|any[], backdropColor?:string, shadowColor?:string, shadowBlur?:number, center?:boolean, displayClose?:boolean, backdropClose?:boolean, backing?:DisplayObject, fadeTime?:number, container?:Stage|Container, titleBar?:string|Label, titleBarColor?:string, titleBarBackroundColor?:string, titleBarHeight?:number, close?:boolean, closeColor?:string, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    show():this
    hide():this
    readonly display:Rectangle
    text:string
    label:Label
    titleBar:Container
    titleBarLabel:Label
    titleBarBacking:Rectangle
    close:Shape
    readonly backdrop:Shape
    resetX:number
    resetY:number
}

// Window is only available in the module using the zim namespace

export class Layer extends Container implements zimComponent {
    constructor(config_or_width?:number, height?:number, titleBar?:string|number|Label, titleBarContainer?:Container, backgroundColor?:string, rollBackgroundColor?:string, selectedBackgroundColor?:string, color?:string, rollColor?:string, selectedColor?:string, borderWidth?:number, borderColor?:string, dashed?:boolean, transformObject?:{}, titleBarWidth?:number, titleBarHeight?:number, titleBarDraggable?:string, close?:boolean, closeColor?:string, closeBackgroundColor?:string, closeIndicatorColor?:string, anchor?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, height?:number, titleBar?:string|number|Label, titleBarContainer?:Container, backgroundColor?:string, rollBackgroundColor?:string, selectedBackgroundColor?:string, color?:string, rollColor?:string, selectedColor?:string, borderWidth?:number, borderColor?:string, dashed?:boolean, transformObject?:{}, titleBarWidth?:number, titleBarHeight?:number, titleBarDraggable?:string, close?:boolean, closeColor?:string, closeBackgroundColor?:string, closeIndicatorColor?:string, anchor?:boolean, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    transformControls:{}
    anchor:boolean
    readonly toggled:boolean
    readonly titleBar:Container
    titleBarDraggable:boolean
    readonly checkBox:CheckBox
    readonly button:Button
    readonly label:Label
}

export class Waiter extends Container implements zimComponent {
    constructor(config_or_container?:Stage|Container, speed?:number, foregroundColor?:string, backgroundColor?:string, circleColor?:string, corner?:number|any[], shadowColor?:string, shadowBlur?:number, fadeTime?:number, style?:boolean, group?:string, inherit?:{})
    constructor(config:{container?:Stage|Container, speed?:number, foregroundColor?:string, backgroundColor?:string, circleColor?:string, corner?:number|any[], shadowColor?:string, shadowBlur?:number, fadeTime?:number, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface

    titleBarPos(x?:number, y?:number, right?:boolean, bottom?:boolean):this
    resetTitleBar():this
    toggle(state?:boolean):this
    resize(dispatch?:boolean):this
    display:Shape
}
export class ProgressBar extends Container implements zimComponent {
    constructor(config_or_barType?:string, foregroundColor?:string, backgroundColor?:string, borderColor?:string, borderWidth?:number, padding?:number, label?:Label, color?:string, labelPosition?:string, percentage?:number, corner?:number|any[], shadowColor?:string, shadowBlur?:number, backing?:DisplayObject, delay?:number, fastClose?:boolean, container?:Stage|Container, style?:boolean, group?:string, inherit?:{})
    constructor(config:{barType?:string, foregroundColor?:string, backgroundColor?:string, borderColor?:string, borderWidth?:number, padding?:number, label?:Label, color?:string, labelPosition?:string, percentage?:number, corner?:number|any[], shadowColor?:string, shadowBlur?:number, backing?:DisplayObject, delay?:number, fastClose?:boolean, container?:Stage|Container, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    show():this
    hide():this
    percent:number
    readonly label:Label
    readonly backing:DisplayObject
    readonly bar:DisplayObject
}
export class Indicator extends Container implements zimComponent {
    constructor(config_or_width?:number, height?:number, num?:number, foregroundColor?:string, backgroundColor?:string, borderColor?:string, borderWidth?:number, backdropColor?:string, corner?:number|any[], indicatorType?:string, fill?:boolean, scale?:number, lightScale?:number, interactive?:boolean, shadowColor?:string, shadowBlur?:number, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, height?:number, num?:number, foregroundColor?:string, backgroundColor?:string, borderColor?:string, borderWidth?:number, backdropColor?:string, corner?:number|any[], indicatorType?:string, fill?:boolean, scale?:number, lightScale?:number, interactive?:boolean, shadowColor?:string, shadowBlur?:number, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    selectedIndex:number
    readonly num:number
    readonly backdrop:Rectangle
    lights:Circle[]|Rectangle[]
    lightsContainer:Container
}
export class List extends zim.Window implements zimComponent {
    constructor(config_or_width?:number, height?:number, list?:any[], viewNum?:number, vertical?:boolean, currentSelected?:boolean, align?:string, valign?:string, labelAlign?:string, labelValign?:string, labelIndent?:number, labelIndentHorizontal?:boolean, labelIndentVertical?:boolean, indent?:number, spacing?:number, backgroundColor?:string, rollBackgroundColor?:string, selectedBackgroundColor?:string, backdropColor?:string, color?:string, selectedColor?:string, rollColor?:string, borderColor?:string, borderWidth?:number, padding?:number, corner?:number|any[], swipe?:boolean, scrollBarActive?:boolean, scrollBarDrag?:boolean, scrollBarColor?:string, scrollBarAlpha?:number, scrollBarFade?:boolean, scrollBarH?:boolean, scrollBarV?:boolean, scrollBarOverlay?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:string, shadowColor?:string, shadowBlur?:number, paddingHorizontal?:number, paddingVertical?:number, scrollWheel?:boolean, damp?:number, titleBar?:string|Label, titleBarColor?:string, titleBarBackgroundColor?:string, titleBarHeight?:number, draggable?:boolean, boundary?:{}|Boundary, onTop?:boolean, close?:boolean, closeColor?:string, excludeCustomTap?:boolean, organizer?:Organizer, checkBox?:boolean, pulldown?:boolean, clone?:boolean, cancelCurrentDrag?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, height?:number, list?:any[], viewNum?:number, vertical?:boolean, currentSelected?:boolean, align?:string, valign?:string, labelAlign?:string, labelValign?:string, labelIndent?:number, labelIndentHorizontal?:boolean, labelIndentVertical?:boolean, indent?:number, spacing?:number, backgroundColor?:string, rollBackgroundColor?:string, selectedBackgroundColor?:string, backdropColor?:string, color?:string, selectedColor?:string, rollColor?:string, borderColor?:string, borderWidth?:number, padding?:number, corner?:number|any[], swipe?:boolean, scrollBarActive?:boolean, scrollBarDrag?:boolean, scrollBarColor?:string, scrollBarAlpha?:number, scrollBarFade?:boolean, scrollBarH?:boolean, scrollBarV?:boolean, scrollBarOverlay?:boolean, slide?:boolean, slideDamp?:number, slideSnap?:string, shadowColor?:string, shadowBlur?:number, paddingHorizontal?:number, paddingVertical?:number, scrollWheel?:boolean, damp?:number, titleBar?:string|Label, titleBarColor?:string, titleBarBackgroundColor?:string, titleBarHeight?:number, draggable?:boolean, boundary?:{}|Boundary, onTop?:boolean, close?:boolean, closeColor?:string, excludeCustomTap?:boolean, organizer?:Organizer, checkBox?:boolean, pulldown?:boolean, clone?:boolean, cancelCurrentDrag?:boolean, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    animateTo(index?:number, timePerItem?:number):this
    addAt(items?:any, index?:number, clone?:boolean):this
    removeAt(number?:number, index?:number):this
    clear():this
    first():this
    last():this
    static slider(label?:string|Label, min?:number, max?:number, val?:number, call?:Function, step?:number, obj?:any, property?:string, paddingLeft?:number, paddingRight?:number):Container
    static checkBox(label?:string|Label, checked?:boolean, call?:Function, step?:number, obj?:any, property?:string, paddingLeft?:number, paddingRight?:number):Container
    static colorPicker(label?:string|Label, color?:string, picker?:ColorPicker, call?:Function, step?:number, obj?:any, property?:string, paddingLeft?:number, paddingRight?:number):Container
    static checkItem(text?:string, width?:number, paddingHorizontal?:number, paddingVertical?:number, color?:string, rollColor?:string, backgroundColor?:string, rollBackgroundColor?:string, selectedColor?:string, selectedRollColor?:string, selectedBackgroundColor?:string, selectedRollBackgroundColor?:string):Container
    setCheck(index?:number, type?:boolean):this
    setChecks(type?:boolean):this
    getCheck(index?:number):boolean
    selectedIndex:number
    selectedIndexPlusPosition:number
    readonly selected:DisplayObject
    readonly text:string
    readonly label:Label
    readonly list:any[]
    readonly items:any[]
    readonly itemsText:string[]
    readonly length:number
    readonly tabs:Tabs
    readonly checkBoxes:[CheckBox]
}
export class Stepper extends Container implements zimComponent {
    constructor(config_or_list?:string[]|number[], width?:number, backgroundColor?:string, borderColor?:string, borderWidth?:number, label?:Label, color?:string, vertical?:boolean, arrows?:number, corner?:number|any[], shadowColor?:string, shadowBlur?:number, loop?:boolean, display?:boolean, press?:boolean, hold?:boolean, holdDelay?:number, holdSpeed?:number, draggable?:boolean, dragSensitivity?:number, dragRange?:number, stepperType?:string, min?:number, max?:number, step?:number, step2?:number, arrows2?:boolean, arrows2Scale?:number, keyEnabled?:boolean, keyArrows?:number, rightForward?:boolean, downForward?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{list?:string[]|number[], width?:number, backgroundColor?:string, borderColor?:string, borderWidth?:number, label?:Label, color?:string, vertical?:boolean, arrows?:number, corner?:number|any[], shadowColor?:string, shadowBlur?:number, loop?:boolean, display?:boolean, press?:boolean, hold?:boolean, holdDelay?:number, holdSpeed?:number, draggable?:boolean, dragSensitivity?:number, dragRange?:number, stepperType?:string, min?:number, max?:number, step?:number, step2?:number, arrows2?:boolean, arrows2Scale?:number, keyEnabled?:boolean, keyArrows?:number, rightForward?:boolean, downForward?:boolean, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    next():void
    prev():void
    selectedIndex:number
    currentValue:string|number
    currentValueEvent:string|number
    stepperArray:string[]|number[]
    containerPrev:Container
    containerNext:Container
    arrowPrev:Triangle
    arrowNext:Triangle
    prev2:Triangle
    next2:Triangle
    arrowPrev2:Triangle
    arrowNext2:Triangle
    min:number
    max:number
    label:Label
    textBox:Shape
    keyFocus:Boolean
}
export class Slider extends Container implements zimComponent {
    constructor(config_or_min?:number, max?:number, step?:number, button?:Button, barLength?:number, barWidth?:number, barColor?:string, vertical?:boolean, useTicks?:boolean, inside?:boolean, keyArrows?:number, keyArrowsStep?:number, keyArrowsH?:boolean, keyArrowsV?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{min?:number, max?:number, step?:number, button?:Button, barLength?:number, barWidth?:number, barColor?:string, vertical?:boolean, useTicks?:boolean, inside?:boolean, keyArrows?:number, keyArrowsStep?:number, keyArrowsH?:boolean, keyArrowsV?:boolean, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    currentValue:number
    currentValueEvent:number
    readonly min:number
    readonly max:number
    readonly step:number
    bar:Rectangle
    button:Button
    ticks:Shape
    keyArrowsH:number
    keyArrowsV:number
    keyFocus:Boolean
}
export class Dial extends Container implements zimComponent {
    constructor(config_or_min?:number, max?:number, step?:number, width?:number, backgroundColor?:string, indicatorColor?:string, indicatorScale?:number, indicatorType?:string, innerCircle?:boolean, innerScale?:number, useTicks?:boolean, innerTicks?:boolean, tickColor?:string, limit?:boolean, keyArrows?:number, keyArrowsStep?:number, keyArrowsH?:boolean, keyArrowsV?:boolean, continuous?:boolean, continuousMin?:number, continuousMax?:number, style?:boolean, group?:string, inherit?:{})
    constructor(config:{min?:number, max?:number, step?:number, width?:number, backgroundColor?:string, indicatorColor?:string, indicatorScale?:number, indicatorType?:string, innerCircle?:boolean, innerScale?:number, useTicks?:boolean, innerTicks?:boolean, tickColor?:string, limit?:boolean, keyArrows?:number, keyArrowsStep?:number, keyArrowsH?:boolean, keyArrowsV?:boolean, continuous?:boolean, continuousMin?:number, continuousMax?:number, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    currentValue:number
    currentValueEvent:number
    readonly min:number
    readonly max:number
    readonly step:number
    readonly continuous:boolean
    continuousMin:number
    continuousMax:number
    backing:Circle
    inner:Circle
    inner2:Circle
    ticks:Container
    indicator:Triangle|Circle|Rectangle
    indicatorShape:Shape
    keyArrowsH:number
    keyArrowsV:number
    keyFocus:Boolean
}
export class Tabs extends Container implements zimComponent {
    constructor(config_or_width?:number, height?:number, tabs?:string[]|{}[], backgroundColor?:string, rollBackgroundColor?:string, offBackgroundColor?:string, color?:string, rollColor?:string, offColor?:string, vertical?:boolean, spacing?:number, currentEnabled?:boolean, currentSelected?:boolean, corner?:number|any[], base?:string, keyEnabled?:boolean, gradient?:number, gloss?:number, backing?:DisplayObject, rollBacking?:DisplayObject, wait?:string, waitTime?:number, waitBackgroundColor?:string, rollWaitBackgroundColor?:string, waitColor?:string, rollWaitColor?:string, waitModal?:boolean, waitEnabled?:boolean, backdropColor?:string, align?:number, valign?:number, labelAlign?:string, labelValign?:string, labelIndent?:number, labelIndentHorizontal?:number, labelIndentVertical?:number, indent?:number, useTap?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, height?:number, tabs?:string[]|{}[], backgroundColor?:string, rollBackgroundColor?:string, offBackgroundColor?:string, color?:string, rollColor?:string, offColor?:string, vertical?:boolean, spacing?:number, currentEnabled?:boolean, currentSelected?:boolean, corner?:number|any[], base?:string, keyEnabled?:boolean, gradient?:number, gloss?:number, backing?:DisplayObject, rollBacking?:DisplayObject, wait?:string, waitTime?:number, waitBackgroundColor?:string, rollWaitBackgroundColor?:string, waitColor?:string, rollWaitColor?:string, waitModal?:boolean, waitEnabled?:boolean, backdropColor?:string, align?:number, valign?:number, labelAlign?:string, labelValign?:string, labelIndent?:number, labelIndentHorizontal?:number, labelIndentVertical?:number, indent?:number, useTap?:boolean, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    selectedIndex:number
    selected:Button
    tabs:any[]
    backgroundColor:string
    rollBackgroundColor:string
    offBackgroundColor:string
    color:string
    offColor:string
    rollColor:string
    text:string
    label:Label
    buttons:Button[]
    labels:Label[]
    backdrop:Rectangle
    keyEnabled:boolean
    keyFocus:Boolean
}
export class Pad extends Container implements zimComponent {
    constructor(config_or_width?:number, cols?:number, rows?:number, keys?:string[]|{}[], backgroundColor?:string, rollBackgroundColor?:string, offBackgroundColor?:string, color?:string, rollColor?:string, offColor?:string, spacing?:number, currentEnabled?:boolean, currentSelected?:boolean, corner?:number|any[], labelColor?:string, gradient?:number, gloss?:number, backing?:DisplayObject, rollBacking?:DisplayObject, wait?:string, waitTime?:number, waitBackgroundColor?:string, rollWaitBackgroundColor?:string, waitColor?:string, rollWaitColor?:string, waitModal?:boolean, waitEnabled?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, cols?:number, rows?:number, keys?:string[]|{}[], backgroundColor?:string, rollBackgroundColor?:string, offBackgroundColor?:string, color?:string, rollColor?:string, offColor?:string, spacing?:number, currentEnabled?:boolean, currentSelected?:boolean, corner?:number|any[], labelColor?:string, gradient?:number, gloss?:number, backing?:DisplayObject, rollBacking?:DisplayObject, wait?:string, waitTime?:number, waitBackgroundColor?:string, rollWaitBackgroundColor?:string, waitColor?:string, rollWaitColor?:string, waitModal?:boolean, waitEnabled?:boolean, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    selectedIndex:number
    selected:Button
    color:string
    rollColor:string
    offColor:string
    text:string
    label:Label
    buttons:Button[]
    labels:Label[]
    tabs:Tabs[]
    keyEnabled:boolean
}
export class ColorPicker extends Container implements zimComponent {
    constructor(config_or_width?:number, colors?:string[], cols?:number, spacing?:number, greyPicker?:boolean, alphaPicker?:boolean, startBackgroundColor?:string, draggable?:boolean, shadowColor?:string, shadowBlur?:number, buttonBar?:boolean, circles?:boolean, indicator?:boolean, backgroundColor?:string, keyArrows?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, colors?:string[], cols?:number, spacing?:number, greyPicker?:boolean, alphaPicker?:boolean, startBackgroundColor?:string, draggable?:boolean, shadowColor?:string, shadowBlur?:number, buttonBar?:boolean, circles?:boolean, indicator?:boolean, backgroundColor?:string, keyArrows?:boolean, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    show():this
    hide():this
    selectedColor:string
    currentValue:string
    currentValueEvent:string
    selectedAlpha:number
    selectedIndex:number
    swatch:Rectangle
    swatchbackground:Shape
    swatchText:Label
    grip:Shape
    background:Rectangle
    okBut:Button
    closeBut:Button
    indicator:Shape
    alpaBacking:Rectangle
    alphaBut:Button
    alphaSlider:Slider
    alphaText:Label
    keyFocus:Boolean
}
export class Keyboard extends Container implements zimComponent {
    constructor(config_or_labels?:Label[]|Label, backgroundColor?:string, color?:string, shiftBackgroundColor?:string, shiftHoldBackgroundColor?:string, placeBackgroundColor?:string, placeColor?:string, cursorColor?:string, shadeAlpha?:number, borderColor?:string, borderWidth?:number, margin?:number, corner?:number|any[], draggable?:boolean, placeClose?:boolean, shadowColor?:string, shadowBlur?:number, container?:Container, data?:[any], place?:boolean, special?:string, rtl?:boolean, hardKeyboard?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{labels?:Label[]|Label, backgroundColor?:string, color?:string, shiftBackgroundColor?:string, shiftHoldBackgroundColor?:string, placeBackgroundColor?:string, placeColor?:string, cursorColor?:string, shadeAlpha?:number, borderColor?:string, borderWidth?:number, margin?:number, corner?:number|any[], draggable?:boolean, placeClose?:boolean, shadowColor?:string, shadowBlur?:number, container?:Container, data?:[any], place?:boolean, special?:string, rtl?:boolean, hardKeyboard?:boolean, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    show(index?:number):this
    hide():this
    showPlace():this
    hidePlace():this
    addLabels(labels:Label[]|Label):this
    removeLabels(labels:Label[]|Label):this
    resize():this
    readonly data:any[]
    readonly labels:Label[]
    selectedLabel:Label
    selectedIndex:number
}
export class Organizer extends Tabs implements zimComponent {
    constructor(config_or_width?:number, list?:List, useAdd?:boolean, useRemove?:boolean, usePosition?:boolean, autoAdd?:boolean, autoRemove?:boolean, autoPosition?:boolean, addForward?:boolean, removeForward?:boolean, backgroundColor?:string, rollBackgroundColor?:string, selectedBackgroundColor?:string, color?:string,  rollColor?:string, selectedColor?:string, spacing?:number, corner?:number|any[], keyEnabled?:boolean, gradient?:number, gloss?:number, backdropColor?:string, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, list?:List, useAdd?:boolean, useRemove?:boolean, usePosition?:boolean, autoAdd?:boolean, autoRemove?:boolean, autoPosition?:boolean, addForward?:boolean, removeForward?:boolean, backgroundColor?:string, rollBackgroundColor?:string, selectedBackgroundColor?:string, color?:string,  rollColor?:string, selectedColor?:string, spacing?:number, corner?:number|any[], keyEnabled?:boolean, gradient?:number, gloss?:number, backdropColor?:string, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    add(index?:number, item?:any, clone?:boolean):this
    up(index?:number):this
    down(index?:number):this
    toTop(index?:number):this
    toBottom(index?:number):this
    remove(index?:number):this
    setButtons():this
    list:List
    readonly lastIndex:number
    readonly orgIndex:number
    readonly orgItem:string|DisplayObject
    readonly orgType:string
    readonly removedItem:DisplayObject
}
export class Marquee extends Container implements zimComponent {
    constructor(config_or_width?:number, height?:number, items?:[any], transition?:string, speed?:number, direction?:string, marginLeft?:number, marginRight?:number, marqueeType?:string, borderColor?:string, borderWidth?:number, refresh?:number, mix?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, height?:number, items?:[any], transition?:string, speed?:number, direction?:string, marginLeft?:number, marginRight?:number, marqueeType?:string, borderColor?:string, borderWidth?:number, refresh?:number, mix?:boolean, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    add(obj:any, url?:string, target?:string):this
    remove(obj:any):this
    go(obj:any):this
    pause(state?:boolean, immediate?:boolean):this
    load(data:string|[any]|{any}, path?:string):this
    readonly content:DisplayObject
    readonly pages:Pages
    readonly button:Button
    readonly indicator:Indicator
    readonly selectedIndex:number
    readonly selected:DisplayObject
    readonly lastSelected:DisplayObject
    time:number
    readonly speed:number
    readonly paused:boolean
    readonly interval:boolean
    readonly left:Container
    readonly right:Container
    readonly icon:Container
    readonly label:Label
    readonly marqueeLoader:Queue
}
export class Loader extends Button implements zimComponent {
    constructor(config_or_width?:number, height?:number, label?:string|Label, backgroundColor?:string, rollBackgroundColor?:string, color?:string, rollColor?:string, borderColor?:string, borderWidth?:number, corner?:number|any[], shadowColor?:string, shadowBlur?:number, hitPadding?:number, gradient?:number, gloss?:number, dashed?:boolean, backing?:DisplayObject, rollBacking?:DisplayObject, rollPersist?:boolean, icon?:DisplayObject, rollIcon?:DisplayObject, toggle?:string, rollToggle?:DisplayObject, toggleEvent?:string, frame?:Frame, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, height?:number, label?:string|Label, backgroundColor?:string, rollBackgroundColor?:string, color?:string, rollColor?:string, borderColor?:string, borderWidth?:number, corner?:number|any[], shadowColor?:string, shadowBlur?:number, hitPadding?:number, gradient?:number, gloss?:number, dashed?:boolean, backing?:DisplayObject, rollBacking?:DisplayObject, rollPersist?:boolean, icon?:DisplayObject, rollIcon?:DisplayObject, toggle?:string, rollToggle?:DisplayObject, toggleEvent?:string, frame?:Frame, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    resize():this
    save(content?:DisplayObject, x?:number, y?:number, width?:number, height?:number, url?:string, cached?:boolean, cachedBounds?:any, type?:string, data?:boolean):this
    tag:HTMLInputElement
}
export class TextArea extends Container implements zimComponent {
    constructor(config_or_width?:number, height?:number, size?:number, padding?:number, color?:string, backgroundColor?:string, borderColor?:string, borderWidth?:number, corner?:number|any[], shadowColor?:string, shadowBlur?:number, dashed?:boolean, id?:string, placeholder?:string, readOnly?:boolean, spellCheck?:boolean, password?:boolean, frame?:Frame, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, height?:number, size?:number, padding?:number, color?:string, backgroundColor?:string, borderColor?:string, borderWidth?:number, corner?:number|any[], shadowColor?:string, shadowBlur?:number, dashed?:boolean, id?:string, placeholder?:string, readOnly?:boolean, spellCheck?:boolean, password?:boolean, frame?:Frame, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    setFocus(type:boolean):this
    resize():this
    currentValue:string
    text:string
    focus:boolean
    readOnly:boolean
    tag:HTMLTextAreaElement
    background:Rectangle
    keyFocus:boolean
}

export class Tag extends Container implements zimComponent {
    constructor(config_or_width?:number, height?:number, id?:string, frame?:Frame, style?:boolean, group?:string, inherit?:{})
    constructor(config:{width?:number, height?:number, id?:string, frame?:Frame, style?:boolean, group?:string, inherit?:{}})
    // ZIM Component Interface
    // dispose():boolean // now added to Container, etc.
    enabled:boolean
    // END ZIM Component Interface
    add(htmlString:string):this
    resize():this
    readonly tagID:string
    tag:HTMLDivElement
    innerHTML:string
}

// ++++++++++++++++++++++++++++++++++++++
// ZIM CONTROLS
export var ANIMATE:boolean
export var OPTIMIZE:boolean
export var ACTIONEVENT:string
export var STYLE:{}
export var POSREG:boolean
export var DRAGALL:boolean
export var Ticker:{
    always:(stage?: Stage) => void,
    alwaysOff:(stage?: Stage) => void,
    add:(f:Function, stage?: Stage) => void,
    remove:(f:Function) => void,
    removeAll:(stage?: Stage) => void,
    has:(f:Function, stage?: Stage) => boolean,
    setFPS:(mobile?:Function, pc?: Stage) => void,
    setTimingMode:(mode?:string) => void,
    raw:(f:Function) => void,
    removeRaw:(id:any) => void,
    dispose:(stage?: Stage) => void,
    update:boolean,
    list:Dictionary,
    framerate:number,
}
export class Accessibility extends createjs.EventDispatcher {
    constructor (config_or_appName?:string, tabOrder?:DisplayObject[], tabIndex?:number, cycle?:boolean, decimals?:number, frame?:Frame, application?:boolean, alwaysHighlight?:boolean, AHTime?:number, AHColor?:string, AHBorderWidth?:number, AHBorderPadding?:number, AHAlpha?:number, AHObject?:DisplayObject, AHObjectScale?:number)
    constructor (config:{appName?:string, tabOrder?:DisplayObject[], tabIndex?:number, cycle?:boolean, decimals?:number, frame?:Frame, application?:boolean, alwaysHighlight?:boolean, AHTime?:number, AHColor?:string, AHBorderWidth?:number, AHBorderPadding?:number, AHAlpha?:number, AHObject?:DisplayObject, AHObjectScale?:number})
    tab(dir:1|-1):void
    changeTitle(DisplayObject:number, title?:string, activate?:boolean):void
    talk(words:string):void
    resize(target?:DisplayObject):void
    readonly type:string
    tabOrder:DisplayObject[]
    tabIndex:number
    currentObject:DisplayObject
    readonly activatedObject:DisplayObject
    readonly startAppTag:HTMLElement
    readonly endAppTag:HTMLElement
    cycle:boolean
    decimals:number
    readonly frame:Frame
    alwaysHighlight:boolean
    AHTime:number
    AHColor:string
    AHBorderWidth:number
    AHBorderPadding:number
    AHAlpha:number
    AHObject:DisplayObject
    AHObjectScale:number
    enabled:boolean
}
export class Swipe extends createjs.EventDispatcher {
    constructor (config_or_obj:DisplayObject, distance?:number, duration?:number)
    constructor (config:{obj:DisplayObject, distance?:number, duration?:number})
    enable():void
    disable():void
    readonly type:string
    distance:number
    duration:number
    direction:string
    obj:DisplayObject
    active:boolean
}
export class Pages extends Container {
    constructor (config_or_pages?:DisplayObject[]|{page:DisplayObject, swipe?:DisplayObject[]}[], transition?:string, speed?:number, transitionTable?:any[][], holder?:Stage|Container)
    constructor (config:{pages?:DisplayObject[]|{page:DisplayObject, swipe?:DisplayObject[]}[], transition?:string, speed?:number, transitionTable?:any[][], holder?:Stage|Container})
    addPage(page, swipeArray?:string[]):void
    removePage(page):void
    setSwipeArray(page, swipeArray?:string[]):void
    go(newPage:DisplayObject|number, direction:string, trans?:string, ms?:number):void
    resize():void
    pause():void
    unpause():void
    puff(time:number):void
    settle():void
    disable():void
    enable():void
    dispose():boolean
    readonly type:string
    speed:number
    transitionTable:any[][]
    readonly page:DisplayObject
    pages:DisplayObject[]|{page:DisplayObject, swipe?:DisplayObject[]}[]
    readonly lastPage:DisplayObject
    readonly direction:string
    readonly transitioning:boolean
    active:boolean
    swipe:Swipe
}
export class HotSpots extends Container {
    constructor (config_or_spots:{page:Container, rect:number[]|DisplayObject, call:Function}[], local?:boolean, mouseDowns?:boolean)
    constructor (config:{spots:{page:Container, rect:number[]|DisplayObject, call:Function}[], local?:boolean, mouseDowns?:boolean})
    show():void
    hide():void
    addHotSpot(page:DisplayObject,rect:number[]|DisplayObject,call:Function):void
    removeHotSpots(page:DisplayObject,rect:number[]|DisplayObject):void
    readonly type:string
}
export class HotSpot extends Container {
    constructor (config_or_obj:Stage|Container, x:number, y:number, width:number, height:number, call:Function, local?:boolean)
    constructor (config:{obj:Stage|Container, x:number, y:number, width:number, height:number, call:Function, local?:boolean})
    show():void
    hide():void
    readonly type:string
}
export class Manager {
    constructor ()
    add(element:DisplayObject|DisplayObject[]):void
    remove(element:DisplayObject|DisplayObject[]):void
    resize():void
    dispose():boolean
    toggle(state?:boolean):this
    readonly type:string
    items:DisplayObject[]
}
export class ResizeManager extends Manager {
    constructor ()
}
export class TransformManager extends Manager {
    constructor (objects:DisplayObject|DisplayObject[], persistID?:string)
    show(obj:DisplayObject)
    hide(obj:DisplayObject)
    hideAll():void
    persist(id:string):void
    clearPersist(id:string):void
    savePersist():void
    stopPersist():void
    readonly type:string
    currentObject:DisplayObject
    persistData:any // could be data for Blob, Squiggle, transform
}
export class Guide extends Container {
    constructor (config_or_obj?:Stage|Container, vertical?:boolean, percent?:boolean, hideKey?:string, pixelKey?:string)
    constructor (config:{obj?:Stage|Container, vertical?:boolean, percent?:boolean, hideKey?:string, pixelKey?:string})
    resize():void
    readonly type:string
    pixels:boolean
}
export class GuideManager extends Manager {
    constructor ()
}
export class Grid extends Container {
    constructor (config_or_obj?:Stage|Container, color?:string, percent?:boolean, hideKey?:string, pixelKey?:string)
    constructor (config:{obj?:Stage|Container, color?:string, percent?:boolean, hideKey?:string, pixelKey?:string})
    resize():void
    readonly type:string
    pixels:boolean
}
export class GridManager extends Manager {
    constructor ()
}
export class Layout extends createjs.EventDispatcher {
    constructor (config_or_holder:Stage|Container, regions:{}[], lastmargin?:number, backgroundColor?:string, vertical?:boolean, regionShape?:Shape, scalingObject?:Stage|Container, hideKey?:string)
    constructor (config:{holder:Stage|Container, regions:{}[], lastmargin?:number, backgroundColor?:string, vertical?:boolean, regionShape?:Shape, scalingObject?:Stage|Container, hideKey?:string})
    resize():void
    dispose():boolean
    addShape(shape:Shape):void
    removeShape():void
    disable():void
    enable():void
    toggle(state?:boolean):this
    readonly type:string
    readonly toggled:boolean
    regions:{}[]
}
export class LayoutManager extends Manager {
    constructor ()
    enable():void
    disable():void
}
export class SelectionSet {
    constructor (selections?:any[])
    readonly type:string
    items:any[]
    clear():void
    isSelected(item:any):boolean
    toggle(item:any, multiple?:boolean, match?:SelectionSet, unmatch?:SelectionSet):void
    add(item:any, multiple?:boolean, match?:SelectionSet, unmatch?:SelectionSet):void
    remove(item:any, multiple?:boolean, match?:SelectionSet, unmatch?:SelectionSet):void
    dispose():boolean
}
export class SelectionManager extends createjs.EventDispatcher {
    constructor (sets?:[SelectionSet], multipleKey?:boolean, multipleSets?:boolean)
    readonly type:string
    sets:[SelectionSet]
    multipleKey:string
    readonly multiple:boolean
    readonly ctrlKey:boolean
    readonly shiftKey:boolean
    readonly metaKey:boolean
    clear():void
    setCurrent(set:SelectionSet)
    dispose():boolean
}
export class Tile extends Container {
    constructor(config_or_obj:DisplayObject|zimVee, cols?:number, rows?:number, spacingH?:number, spacingV?:number, width?:number, height?:number, squeezeH?:boolean, squeezeV?:boolean, colSize?:number|zimVee, rowSize?:number|zimVee, align?:string|zimVee, valign?:string|zimVee, count?:number, mirrorH?:boolean, mirrorV?:boolean, snapToPixel?:boolean, clone?:boolean, style?:boolean, group?:string, inherit?:{})
    constructor(config:{obj:DisplayObject|zimVee, cols?:number, rows?:number, spacingH?:number, spacingV?:number, width?:number, height?:number, squeezeH?:boolean, squeezeV?:boolean, colSize?:number|zimVee, rowSize?:number|zimVee, align?:string|zimVee, valign?:string|zimVee, count?:number, mirrorH?:boolean, mirrorV?:boolean, snapToPixel?:boolean, clone?:boolean, style?:boolean, group?:string, inherit?:{}})
    remake(items?:any[]):this
    resize(width?:number, height?:number):this
    readonly type:string
    items:any[]
    cols:number
    rows:number
    spacingH:number
    spacingV:number
    squeezeH:boolean
    squeezeV:boolean
    align:string
    valign:string
    mirrorH:boolean
    mirrorV:boolean
    readonly group:string
}
export class Parallax {
    constructor (config_or_layers?:{obj:DisplayObject, prop:string, propChange:number, input?:string, inMin?:number, inMax?:number, factor?:number, integer?:boolean}[], damp?:number, auto?:boolean, stage?:Stage, startPaused?:boolean, mouseMoveOutside?:boolean)
    constructor (config:{layers?:{obj:DisplayObject, prop:string, propChange:number, input?:string, inMin?:number, inMax?:number, factor?:number, integer?:boolean}[], damp?:number, auto?:boolean, stage?:Stage, startPaused?:boolean, mouseMoveOutside?:boolean})
    addLayer(layer:{obj:DisplayObject, prop:string, propChange:number, input?:string, inMin?:number, inMax?:number, factor?:number, integer?:boolean}):number
    removeLayer(index:number):void
    step(input?:number):void
    immediate(array:number[]):void
    pause(state:boolean):void
    dispose():boolean
    readonly type:string
    readonly paused:boolean
    damp:number
}
export class Scroller extends createjs.EventDispatcher {
    constructor (config_or_backing:DisplayObject, speed?:number, direction?:number, horizontal?:boolean, gapFix?:number, stage?:Stage, container?:Stage|DisplayObject)
    constructor (config:{backing:DisplayObject, speed?:number, direction?:number, horizontal?:boolean, gapFix?:number, stage?:Stage, container?:Stage|DisplayObject})
    pause(state:boolean):void
    dispose():boolean
    readonly type:string
    backing1:DisplayObject
    backing2:DisplayObject
    speed:number
    baseSpeed:number
    percentSpeed:number
    direction:number
    readonly paused:boolean
}
export class Dynamo extends createjs.EventDispatcher {
    constructor (config_or_sprite:Sprite, speed?:number, label?:string, startFrame?:number, endFrame?:number, update?:boolean, reversible?:boolean, flip?:boolean, flipVertical?:boolean)
    constructor (config:{sprite:Sprite, speed?:number, label?:string, startFrame?:number, endFrame?:number, update?:boolean, reversible?:boolean, flip?:boolean, flipVertical?:boolean})
    pause(state:boolean, time:number, frame:number):void
    dispose():boolean
    readonly type:string
    frames:number[]
    frame:number
    totalFrames:number
    percentSpeed:number
    baseSpeed:number
    readonly paused:boolean
    scaleX:number
    scaleY:number
}
export class Accelerator extends createjs.EventDispatcher {
    constructor (objects:Scroller|Dynamo|[Scroller|Dynamo])
    add(objects:Scroller|Dynamo|[Scroller|Dynamo]):this
    remove(objects:Scroller|Dynamo|[Scroller|Dynamo]):this
    pause(state:boolean, time:number, frameNumber:number):void
    dispose():boolean
    readonly type:string
    percentSpeed:number
    readonly paused
    items:[Scroller|Dynamo]
}
export class Swiper extends createjs.EventDispatcher {
    constructor (config_or_swipeOn:Stage|DisplayObject, target:Object, property:string, sensitivity?:number, horizontal?:boolean, min?:number, max?:number, damp?:number, integer?:boolean, factor?:number, pauseTime?:number)
    constructor (config:{swipeOn:Stage|DisplayObject, target:Object, property:string, sensitivity?:number, horizontal?:boolean, min?:number, max?:number, damp?:number, integer?:boolean, factor?:number, pauseTime?:number})
    immediate(val:number):void
    dispose():boolean
    readonly type:string
    target:Object
    property:string
    desiredValue:number
    enabled:boolean
}
export class MotionController extends createjs.EventDispatcher {
    constructor (config_or_target?:DisplayObject, type?:string, speed?:number, axis?:string, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, map?:[number|number[]], diagonal?:boolean, damp?:number, flip?:string, moveThreshold?:number, stickThreshold?:number, container?:Stage|StageGL|Container, localBounds?:boolean, mouseMoveOutside?:boolean, mousedownIncludes?:DisplayObject[], minPercentSpeed?:number, maxPercentSpeed?:number)
    constructor (config:{target?:DisplayObject, type?:string, speed?:number, axis?:string, boundary?:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}, map?:[number|number[]], diagonal?:boolean, damp?:number, flip?:string, moveThreshold?:number, stickThreshold?:number, container?:Stage|StageGL|Container, localBounds?:boolean, mouseMoveOutside?:boolean, mousedownIncludes?:DisplayObject[], minPercentSpeed?:number, maxPercentSpeed?:number})
    immediate(x:number, y:number):void
    convert(x:number, y:number):void
    dispose():boolean
    readonly type:string
    target:Object
    x:number
    y:number
    dirX:number
    dirY:number
    boundary:Boundary|createjs.Rectangle|{x:number,y:number,width:number,height:number}
    readonly rotation:number
    readonly scaleX:number
    readonly scaleY:number
    readonly dampX:Damp
    readonly dampY:Damp
    speed:number
    turnSpeed:number
    axis:string
    readonly moving:boolean
    readonly movingX:boolean
    readonly movingY:boolean
    readonly gamepad:GamePad
    moveThreshold:number
    stickThreshold:number
    enabled:boolean
}
export class GamePad extends createjs.EventDispatcher {
    constructor ()
    dispose():boolean
    readonly type:string
    connected:boolean
    currentIndex:number
    data:{}
    buttons:boolean[]
    A:number
    B:number
    X:number
    Y:number
    LB:number
    RB:number
    LT:number
    RT:number
    BACK:number
    START:number
    LS:number
    RS:number
    DPAD_UP:number
    DPAD_DOWN:number
    DPAD_LEFT:number
    DPAD_RIGHT:number
    LSX:number
    LSY:number
    RSX:number
    RSY:number
    axes:number[]
}
export class Emitter extends Container {
    constructor (config_or_obj:DisplayObject|zimVee, width?:number, height?:number, interval?:number|zimVee, num?:number|zimVee, life?:number, fade?:boolean, shrink?:boolean, decayTime?:number, decayStart?:number, trace?:boolean, traceFadeTime?:number, traceShiftX?:number, traceShiftY?:number, angle?:number|zimVee, force?:number|zimVee, gravity?:number, wind?:number, layers?:string, animation?:{}|zimVee, random?:{}, horizontal?:boolean, vertical?:boolean, sink?:DisplayObject|{x:number,y:number}, sinkForce?:number, cache?:boolean, events?:boolean, startPaused?:boolean, pool?:boolean, poolMin?:number, particles?:Container)
    constructor (config:{obj:DisplayObject|zimVee, width?:number, height?:number, interval?:number|zimVee, num?:number|zimVee, life?:number, fade?:boolean, shrink?:boolean, decayTime?:number, decayStart?:number, trace?:boolean, traceFadeTime?:number, traceShiftX?:number, traceShiftY?:number, angle?:number|zimVee, force?:number|zimVee, gravity?:number, wind?:number, layers?:string, animation?:{}|zimVee, random?:{}, horizontal?:boolean, vertical?:boolean, sink?:DisplayObject|{x:number,y:number}, sinkForce?:number, cache?:boolean, events?:boolean, startPaused?:boolean, pool?:boolean, poolMin?:number, particles?:Container})
    spurt(num?:number|zimVee, time?:number|zimVee, restart?:boolean):void
    pauseEmitter(state?:boolean, restart?:boolean, freeze?:boolean, immediate?:boolean):void
    clearPool():void
    resize(width:number, height:number):void
    readonly type:string
    obj:DisplayObject|zimVee
    interval:number|zimVee
    num:number|zimVee
    life:number
    fade:boolean
    shrink:boolean
    decayTime:number
    decayStart:number
    trace:boolean
    traceFadeTime:number
    traceShiftX:number
    traceShiftY:number
    angle:number|zimVee
    emitterForce:number|zimVee
    gravity:number
    wind:number
    layers:string
    animation:{}|zimVee
    random:{}
    horizontal:boolean
    vertical:boolean
    sink:DisplayObject|{x:number,y:number}
    sinkForce:number
    events:boolean
    startPaused:boolean
    pool:boolean
    poolMin:number
    readonly emitterPaused:boolean
    currentParticle:DisplayObject
    particlesEmitted:number
    spurtNum:number
    spurtCount:number
    zimInterval:{pause:Function, clear:Function, time:number, count:number, total:number, paused:boolean, pauseTimeLeft:number}
    zimTicker:Function
    particles:Container
}
export class Pen extends Container {
    constructor (config_or_size?:number|zimVee, color?:string|zimVee, penType?:string, damp?:number, spread?:number|zimVee, borderColor?:number|zimVee, borderWidth?:number|zimVee, end?:string, paper?:Container, nib?:DisplayObject, cache?:boolean, ctrlKey?:boolean, cropScale?:number, undo?:number, undoKeys?:boolean, draggable?:boolean, onTop?:boolean, deleteable?:boolean, doubleClickDelete?:boolean, immediateStop?:boolean, lineAlpha?:number, lineBlendMode?:string)
    constructor (config:{size?:number|zimVee, color?:string|zimVee, penType?:string, damp?:number, spread?:number|zimVee, borderColor?:number|zimVee, borderWidth?:number|zimVee, end?:string, paper?:Container, nib?:DisplayObject, cache?:boolean, ctrlKey?:boolean, cropScale?:number, undo?:number, undoKeys?:boolean, draggable?:boolean, onTop?:boolean, deleteable?:boolean, doubleClickDelete?:boolean, immediateStop?:boolean, lineAlpha?:number, lineBlendMode?:string})
    setPen(newPen?:string):this
    saveState(obj:DisplayObject):this
    undo():this
    redo():this
    immediate(x?:number, y?:number):this
    delete(index:number):this
    deleteSegment(segmentObject:Bitmap|Shape):this
    clear():this
    dispose():boolean
    readonly type:string
    undoLevels:number
    draggable:boolean
    paper:DisplayObject
    readonly lastSegment:Shape|Bitmap
    readonly lastSelected:Shape|Bitmap
    readonly nib:DisplayObject
    write:boolean
    readonly drawing:boolean
    size:number|zimVee
    sizeFactor:number
    sizeScale:number
    spread:number|zimVee
    spreadFactor:number
    spreadScale:number
    color:string|zimVee
    borderColor:string|zimVee
    borderWidth:number|zimVee
    penType:string
    immediateStop:boolean
    infinite:boolean
}
export class SoundWave extends createjs.EventDispatcher {
    constructor (config_or_num?:number, input?:string, include?:number, smoothing?:number, min?:number, max?:number, operation?:Function, baseline?:number, magnify?:number, reduce?:number)
    constructor (config:{num?:number, input?:string, include?:number, smoothing?:number, min?:number, max?:number, operation?:Function, baseline?:number, magnify?:number, reduce?:number})
    calculate():number[]
    readonly type:string
    readonly num:number
    smoothing:number
    analyser:AnalyserNode
    baseline:number
    magnify:number
    reduce:number
}
export class Portal extends createjs.EventDispatcher {
    constructor (obj:DisplayObject, lands?:Stage|DisplayObject)
    dispose():boolean
    readonly type:string
    portal:DisplayObject
    enabled:boolean
    readonly currentLand:DisplayObject
    readonly nextLand:DisplayObject
}
export class Physics {
    constructor (config_or_gravity?:number, borders?:Boundary|{}, scroll?:boolean, frame?:Frame)
    constructor (config:{gravity?:number, borders?:Boundary|{}, scroll?:boolean, frame?:Frame})
    borders(boundary?:Boundary|{}):void
    drag(array?:[any]):void
    noDrag():void
    join(obj1:DisplayObject, obj2:DisplayObject, point1?:Point|{}, point2?:Point|{}, minAngle?:number, maxAngle?:number, type?:string):any
    break(joint:any):void
    debug():void
    updateDebug():void
    removeDebug():void
    remove(obj:DisplayObject):void
    dispose():void
    readonly world:any
    readonly scale:number
    readonly step:number
    readonly gravity:number
    readonly Ticker:any
    controlObject:DisplayObject
    followObject:DisplayObject
    readonly borderTop:any
    readonly borderBottom:any
    readonly borderLeft:any
    readonly borderRight:any
}
export class VR extends Container {
    constructor (config_or_content:Container, angle?:number, distance?:number, parallax?:number, parallaxAngle?:number, damp?:number, parallaxDamp?:number, startAngle?:number, negativeParallax?:boolean, boundaryMarkers?:boolean, swiper?:boolean, holder?:Stage|Container)
    constructor (config:{content:Container, angle?:number, distance?:number, parallax?:number, parallaxAngle?:number, damp?:number, parallaxDamp?:number, startAngle?:number, negativeParallax?:boolean, boundaryMarkers?:boolean, swiper?:boolean, holder?:Stage|Container})
    register(item:DisplayObject):DisplayObject
    remove(item:DisplayObject):DisplayObject
    position(item:DisplayObject, x:number, y:number):DisplayObject
    showAdjuster():this
    hideAdjuster():this
    resize():this
    readonly type:string
    readonly angle:number
    readonly currentAngle:number
    content:Container
    contentLeft:Container
    contentRight:Container
    left:Container
    right:Container
    adjuster:Container
    swiper:Swiper
    boundaryLeft:Container
    boundaryRight:Container
}

// ++++++++++++++++++++++++++++++++++++++
// ZIM FRAME
export class Queue extends createjs.EventDispatcher {
    constructor()
    readonly isLoading:boolean
}
export class Frame extends createjs.EventDispatcher {
    constructor(config_or_scaling?:string, width?:number, height?:number, color?:string, outerColor?:string, assets?:[string,{}]|string|{}, path?:string, progress?:Waiter|ProgressBar, rollover?:boolean, touch?:boolean, scrollTop?:boolean, align?:string, valign?:string, canvasID?:string, rollPerSecond?:number, delay?:number, canvasCheck?:boolean, gpu?:boolean, gpuObj?:boolean, nextFrame?:Frame, nextStage?:Stage, allowDefault?:boolean, loadFailObj?:DisplayObject, sensors?:boolean, retina?:boolean, mouseMoveOutside?:boolean, captureMouse?:boolean, shim?:{any})
    constructor(config:{scaling?:string, width?:number, height?:number, color?:string, outerColor?:string, assets?:[string,{}]|string|{}, path?:string, progress?:Waiter|ProgressBar, rollover?:boolean, touch?:boolean, scrollTop?:boolean, align?:string, valign?:string, canvasID?:string, rollPerSecond?:number, delay?:number, canvasCheck?:boolean, gpu?:boolean, gpuObj?:boolean, nextFrame?:Frame, nextStage?:Stage, allowDefault?:boolean, loadFailObj?:DisplayObject, sensors?:boolean, retina?:boolean, mouseMoveOutside?:boolean, captureMouse?:boolean, shim?:{any}})
    loadAssets(config_or_assets:[string,{}]|string|{}, path?:string, progress?:Waiter|ProgressBar, xhr?:boolean, time?:number, loadTimeout?:number, outputAudioSprite?:boolean, crossOrigin?:string, fileType?:string, queueOnly?:boolean, shim?:{any}):Queue
    loadAssets(config:{assets:[string,{}]|string|{}, path?:string, progress?:Waiter|ProgressBar, xhr?:boolean, time?:number, loadTimeout?:number, outputAudioSprite?:boolean, crossOrigin?:string, fileType?:string, queueOnly?:boolean, shim?:{any}}):Queue
    asset(file:string):any
    follow(config_or_obj?:DisplayObject, boundary?:Boundary|{any}, damp?:number, dampY?:number, leftOffset?:number, rightOffset?:number, upOffset?:number, downOffset?:number, offsetDamp?:number, offsetDampY?:number, horizontal?:boolean, vertical?:boolean, borderLock?:boolean, lag?:boolean):this
    follow(config:{obj?:DisplayObject, boundary?:Boundary|{any}, damp?:number, dampY?:number, leftOffset?:number, rightOffset?:number, upOffset?:number, downOffset?:number, offsetDamp?:number, offsetDampY?:number, horizontal?:boolean, vertical?:boolean, borderLock?:boolean, lag?:boolean}):this
    makeCircles(radius?:number, multiple?:false):Shape
    makeCircles(radius?:number, multiple?:true):Container
    remakeCanvas(width:number, height:number):null
    dispose():boolean
    readonly type:string
    stage:Stage|StageGL
    canvas:HTMLCanvasElement
    canvasID:string
    color:string
    outerColor:string
    tag:HTMLElement
    isLoading:boolean
    readonly width:number
    readonly height:number
    readonly scale:number
    readonly mouseX:number
    readonly mouseY:number
    readonly mouseEvent:any
    orientation:string
    visibleLeft:number
    visibleTop:number
    visibleRight:number
    visibleBottom:number
    zil:Function[]
    readonly orange:string
    readonly green:string
    readonly pink:string
    readonly blue:string
    readonly brown:string
    readonly yellow:string
    readonly red:string
    readonly purple:string
    readonly silver:string
    readonly tin:string
    readonly grey:string
    readonly lighter:string
    readonly light:string
    readonly dark:string
    readonly darker:string
    readonly white:string
    readonly black:string
    readonly clear:string
    readonly faint:string
    altKey:boolean
    ctrlKey:boolean
    metaKey:boolean
    shiftKey:boolean
    loadFailObj:DisplayObject
    readonly retina:boolean
}

// ++++++++++++++++++++++++++++++++++++++
// ZIM META
export var DISTILL:boolean
export function distill():void
export function parseAudioSprite(audioSpriteData:{resources:string[], spritemap:{}}, outputAudioSprite?:boolean):{src:string, data:{}}
export function previewAudioSprite(audioSpriteData:{}, numLetters?:number, frame?:Frame)
export function svgToBitmap(svg:string|SVGElement, callBack:Function)
export function zimify(obj:createjs.DisplayObject, list:boolean):DisplayObject
export function zimplify(exclude?:string|string[]):void
export var ZIMONON:boolean
export var ZIMON:{
    stringify:(obj:any, key?:{}) => string,
    parse:(string:string) => any
}
export class Wonder {
    constructor (wid:string, client:string, app:string, notes?:string, server?:string)
    count(keyword:string):void
    timeStart(keyword:string):void
    timePause(keyword:string):void
    timeUnpause(keyword:string):void
    timeEnd(keyword:string):void
    order(keyword:string, item):void
    countOff(keyword:string):void
    countOn(keyword:string):void
    timeOff(keyword:string):void
    timeOn(keyword:string):void
    orderOff(keyword:string):void
    orderOn(keyword:string):void
    dispose():boolean
}



    // END PARSER - end of exports added by parser from globals
}