(function(cjs, an) {

    var p; // shortcut to reference prototypes
    var lib = {};
    var ss = {};
    var img = {};
    lib.ssMetadata = [{
        name: "DJR_an_test_atlas_1",
        frames: [
            [830, 0, 450, 490],
            [830, 984, 450, 200],
            [830, 492, 450, 490],
            [0, 1160, 450, 194],
            [452, 1160, 187, 202],
            [130, 1356, 36, 85],
            [0, 1356, 128, 128],
            [0, 0, 828, 578],
            [0, 580, 828, 578]
        ]
    }];


    (lib.AnMovieClip = function() {
        this.actionFrames = [];
        this.ignorePause = false;
        this.gotoAndPlay = function(positionOrLabel) {
            cjs.MovieClip.prototype.gotoAndPlay.call(this, positionOrLabel);
        }
        this.play = function() {
            cjs.MovieClip.prototype.play.call(this);
        }
        this.gotoAndStop = function(positionOrLabel) {
            cjs.MovieClip.prototype.gotoAndStop.call(this, positionOrLabel);
        }
        this.stop = function() {
            cjs.MovieClip.prototype.stop.call(this);
        }
    }).prototype = p = new cjs.MovieClip();
    // symbols:



    (lib.PP01 = function() {
        this.initialize(ss["DJR_an_test_atlas_1"]);
        this.gotoAndStop(0);
    }).prototype = p = new cjs.Sprite();



    (lib.PP01_2 = function() {
        this.initialize(ss["DJR_an_test_atlas_1"]);
        this.gotoAndStop(1);
    }).prototype = p = new cjs.Sprite();



    (lib.PP02 = function() {
        this.initialize(ss["DJR_an_test_atlas_1"]);
        this.gotoAndStop(2);
    }).prototype = p = new cjs.Sprite();



    (lib.PP03 = function() {
        this.initialize(ss["DJR_an_test_atlas_1"]);
        this.gotoAndStop(3);
    }).prototype = p = new cjs.Sprite();



    (lib.PP04 = function() {
        this.initialize(ss["DJR_an_test_atlas_1"]);
        this.gotoAndStop(4);
    }).prototype = p = new cjs.Sprite();



    (lib.PP05 = function() {
        this.initialize(ss["DJR_an_test_atlas_1"]);
        this.gotoAndStop(5);
    }).prototype = p = new cjs.Sprite();



    (lib.run_moon_0101 = function() {
        this.initialize(ss["DJR_an_test_atlas_1"]);
        this.gotoAndStop(6);
    }).prototype = p = new cjs.Sprite();



    (lib.Speed_light = function() {
        this.initialize(ss["DJR_an_test_atlas_1"]);
        this.gotoAndStop(7);
    }).prototype = p = new cjs.Sprite();



    (lib.Speed_light_02 = function() {
        this.initialize(ss["DJR_an_test_atlas_1"]);
        this.gotoAndStop(8);
    }).prototype = p = new cjs.Sprite();
    // helper functions:

    function mc_symbol_clone() {
        var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
        clone.gotoAndStop(this.currentFrame);
        clone.paused = this.paused;
        clone.framerate = this.framerate;
        return clone;
    }

    function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
        var prototype = cjs.extend(symbol, cjs.MovieClip);
        prototype.clone = mc_symbol_clone;
        prototype.nominalBounds = nominalBounds;
        prototype.frameBounds = frameBounds;
        return prototype;
    }


    (lib.SPEED_02 = function(mode, startPosition, loop, reversed) {
        if (loop == null) {
            loop = true;
        }
        if (reversed == null) {
            reversed = false;
        }
        var props = new Object();
        props.mode = mode;
        props.startPosition = startPosition;
        props.labels = {};
        props.loop = loop;
        props.reversed = reversed;
        cjs.MovieClip.apply(this, [props]);

        // 圖層_1
        this.instance = new lib.Speed_light_02();

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.SPEED_02, new cjs.Rectangle(0, 0, 828, 578), null);


    (lib.SPEED_01 = function(mode, startPosition, loop, reversed) {
        if (loop == null) {
            loop = true;
        }
        if (reversed == null) {
            reversed = false;
        }
        var props = new Object();
        props.mode = mode;
        props.startPosition = startPosition;
        props.labels = {};
        props.loop = loop;
        props.reversed = reversed;
        cjs.MovieClip.apply(this, [props]);

        // 圖層_1
        this.instance = new lib.Speed_light();

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.SPEED_01, new cjs.Rectangle(0, 0, 828, 578), null);


    (lib.moon = function(mode, startPosition, loop, reversed) {
        if (loop == null) {
            loop = true;
        }
        if (reversed == null) {
            reversed = false;
        }
        var props = new Object();
        props.mode = mode;
        props.startPosition = startPosition;
        props.labels = {};
        props.loop = loop;
        props.reversed = reversed;
        cjs.MovieClip.apply(this, [props]);

        // 圖層_1
        this.instance = new lib.run_moon_0101();

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.moon, new cjs.Rectangle(0, 0, 128, 128), null);


    (lib.LTS = function(mode, startPosition, loop, reversed) {
        if (loop == null) {
            loop = true;
        }
        if (reversed == null) {
            reversed = false;
        }
        var props = new Object();
        props.mode = mode;
        props.startPosition = startPosition;
        props.labels = {};
        props.loop = loop;
        props.reversed = reversed;
        cjs.MovieClip.apply(this, [props]);

        // 圖層_1
        this.instance = new lib.PP03();

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.LTS, new cjs.Rectangle(0, 0, 450, 194), null);


    (lib.L1 = function(mode, startPosition, loop, reversed) {
        if (loop == null) {
            loop = true;
        }
        if (reversed == null) {
            reversed = false;
        }
        var props = new Object();
        props.mode = mode;
        props.startPosition = startPosition;
        props.labels = {};
        props.loop = loop;
        props.reversed = reversed;
        cjs.MovieClip.apply(this, [props]);

        // 圖層_1
        this.instance = new lib.PP05();

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.L1, new cjs.Rectangle(0, 0, 36, 85), null);


    (lib.BOX = function(mode, startPosition, loop, reversed) {
        if (loop == null) {
            loop = true;
        }
        if (reversed == null) {
            reversed = false;
        }
        var props = new Object();
        props.mode = mode;
        props.startPosition = startPosition;
        props.labels = {};
        props.loop = loop;
        props.reversed = reversed;
        cjs.MovieClip.apply(this, [props]);

        // 圖層_1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#000000").s().p("EgjJAmSMAAAhMjMBGTAAAMAAABMjgEgihAlqMBFDAAAMAAAhLTMhFDAAAg");
        this.shape.setTransform(225, 244.975);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.BOX, new cjs.Rectangle(0, 0, 450, 490), null);


    (lib.bg02 = function(mode, startPosition, loop, reversed) {
        if (loop == null) {
            loop = true;
        }
        if (reversed == null) {
            reversed = false;
        }
        var props = new Object();
        props.mode = mode;
        props.startPosition = startPosition;
        props.labels = {};
        props.loop = loop;
        props.reversed = reversed;
        cjs.MovieClip.apply(this, [props]);

        // 圖層_1
        this.instance = new lib.PP02();

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.bg02, new cjs.Rectangle(0, 0, 450, 490), null);


    (lib.BG2 = function(mode, startPosition, loop, reversed) {
        if (loop == null) {
            loop = true;
        }
        if (reversed == null) {
            reversed = false;
        }
        var props = new Object();
        props.mode = mode;
        props.startPosition = startPosition;
        props.labels = {};
        props.loop = loop;
        props.reversed = reversed;
        cjs.MovieClip.apply(this, [props]);

        // 圖層_1
        this.instance = new lib.PP01_2();

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.BG2, new cjs.Rectangle(0, 0, 450, 200), null);


    (lib.bg01 = function(mode, startPosition, loop, reversed) {
        if (loop == null) {
            loop = true;
        }
        if (reversed == null) {
            reversed = false;
        }
        var props = new Object();
        props.mode = mode;
        props.startPosition = startPosition;
        props.labels = {};
        props.loop = loop;
        props.reversed = reversed;
        cjs.MovieClip.apply(this, [props]);

        // 圖層_1
        this.instance = new lib.PP01();

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.bg01, new cjs.Rectangle(0, 0, 450, 490), null);


    (lib.BDX = function(mode, startPosition, loop, reversed) {
        if (loop == null) {
            loop = true;
        }
        if (reversed == null) {
            reversed = false;
        }
        var props = new Object();
        props.mode = mode;
        props.startPosition = startPosition;
        props.labels = {};
        props.loop = loop;
        props.reversed = reversed;
        cjs.MovieClip.apply(this, [props]);

        // 圖層_1
        this.instance = new lib.PP04();
        this.instance.setTransform(648, 0, 1, 1, 0, 0, 180);

        this.instance_1 = new lib.PP04();

        this.timeline.addTween(cjs.Tween.get({}).to({
            state: [{
                t: this.instance_1
            }, {
                t: this.instance
            }]
        }).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.BDX, new cjs.Rectangle(0, 0, 648, 202), null);


    (lib.stop = function(mode, startPosition, loop, reversed) {
        if (loop == null) {
            loop = true;
        }
        if (reversed == null) {
            reversed = false;
        }
        var props = new Object();
        props.mode = mode;
        props.startPosition = startPosition;
        props.labels = {};
        props.loop = loop;
        props.reversed = reversed;
        cjs.MovieClip.apply(this, [props]);

        // 圖層_1
        this.instance = new lib.L1();
        this.instance.setTransform(225, 196.45, 0.2623, 0.1803, 0, 0, 0, 17.9, 0);
        this.instance.alpha = 0.25;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        // line_03
        this.instance_1 = new lib.L1();
        this.instance_1.setTransform(225, 224.95, 0.4631, 0.4189, 0, 0, 0, 17.9, 0);
        this.instance_1.alpha = 0.5586;

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

        // line_02
        this.instance_2 = new lib.L1();
        this.instance_2.setTransform(225, 313.2, 0.7222, 0.7222, 0, 0, 0, 18, 42.5);
        this.instance_2.alpha = 0.8516;

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

        // line_01
        this.instance_3 = new lib.L1();
        this.instance_3.setTransform(225.1, 439.35, 1.1941, 1.1941, 0, 0, 0, 18.1, 42.6);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

        // light_03
        this.instance_4 = new lib.LTS();
        this.instance_4.setTransform(224.8, 251.2, 1.0013, 0.8865, 0, 0, 0, 225.1, 97.4);

        this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

        // light_03
        this.instance_5 = new lib.LTS();
        this.instance_5.setTransform(224.9, 209.5, 0.5963, 0.5279, 0, 0, 0, 225.2, 97.4);

        this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

        // light_03
        this.instance_6 = new lib.LTS();
        this.instance_6.setTransform(225.95, 177.2, 0.2883, 0.2385, 0, 0, 0, 225.1, 97);

        this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

        // BD
        this.instance_7 = new lib.BDX();
        this.instance_7.setTransform(225.85, 214.25, 1.2575, 1.3161, 0, 0, 0, 323.7, 101.2);

        this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

        // BD
        this.instance_8 = new lib.BDX();
        this.instance_8.setTransform(225.9, 185.55, 0.7808, 0.7808, 0, 0, 0, 323.9, 101);

        this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

        // BD
        this.instance_9 = new lib.BDX();
        this.instance_9.setTransform(225.9, 173.65, 0.5247, 0.4753, 0, 0, 0, 323.9, 101.1);

        this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

        // moon
        this.instance_10 = new lib.moon();
        this.instance_10.setTransform(225, 83.05, 0.75, 0.75, 0, 0, 0, 64, 64);

        this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1));

        // 圖層_1
        this.instance_11 = new lib.bg02();
        this.instance_11.setTransform(225, 245, 1, 1, 0, 0, 0, 225, 245);

        this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1));

        // 圖層_2
        this.instance_12 = new lib.bg01();
        this.instance_12.setTransform(225, 245, 1, 1, 0, 0, 0, 225, 245);

        this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.stop, new cjs.Rectangle(-181.2, 0, 814.9000000000001, 490), null);


    (lib.BGF = function(mode, startPosition, loop, reversed) {
        if (loop == null) {
            loop = true;
        }
        if (reversed == null) {
            reversed = false;
        }
        var props = new Object();
        props.mode = mode;
        props.startPosition = startPosition;
        props.labels = {};
        props.loop = loop;
        props.reversed = reversed;
        cjs.MovieClip.apply(this, [props]);

        // 圖層_1
        this.instance = new lib.bg01();
        this.instance.setTransform(225, 245, 1, 1, 0, 0, 0, 225, 245);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

        this._renderFirstFrame();

    }).prototype = getMCSymbolPrototype(lib.BGF, new cjs.Rectangle(0, 0, 450, 490), null);


    (lib.go = function(mode, startPosition, loop, reversed) {
        if (loop == null) {
            loop = true;
        }
        if (reversed == null) {
            reversed = false;
        }
        var props = new Object();
        props.mode = mode;
        props.startPosition = startPosition;
        props.labels = {};
        props.loop = loop;
        props.reversed = reversed;
        cjs.MovieClip.apply(this, [props]);

        // timeline functions:
        this.frame_4 = function() {
            this.gotoAndPlay(0);
        }

        // actions tween:
        this.timeline.addTween(cjs.Tween.get(this).wait(4).call(this.frame_4).wait(1));

        // 圖層_4
        this.instance = new lib.SPEED_01();
        this.instance.setTransform(225.55, 245, 0.6293, 0.9837, 0, 0, 0, 414, 288.9);
        this.instance._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({
            _off: false
        }, 0).wait(3));

        // 圖層_3
        this.instance_1 = new lib.SPEED_02();
        this.instance_1.setTransform(225.65, 245.05, 0.5865, 0.917, 0, 0, 0, 414.1, 289);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).to({
            _off: true
        }, 2).wait(3));

        // 圖層_1
        this.instance_2 = new lib.L1();
        this.instance_2.setTransform(225, 196.45, 0.2623, 0.0423, 0, 0, 0, 17.9, 0);
        this.instance_2.alpha = 0;

        this.timeline.addTween(cjs.Tween.get(this.instance_2).to({
            scaleY: 0.1803,
            alpha: 0.25
        }, 4).wait(1));

        // 圖層_1
        this.instance_3 = new lib.L1();
        this.instance_3.setTransform(225, 196.45, 0.2623, 0.1803, 0, 0, 0, 17.9, 0);
        this.instance_3.alpha = 0.25;

        this.timeline.addTween(cjs.Tween.get(this.instance_3).to({
            regX: 18.1,
            regY: 0.1,
            scaleX: 0.4753,
            scaleY: 0.4193,
            x: 225.05,
            y: 224.75,
            alpha: 0.5586
        }, 4).wait(1));

        // line_03
        this.instance_4 = new lib.L1();
        this.instance_4.setTransform(225, 224.95, 0.4631, 0.4189, 0, 0, 0, 17.9, 0);
        this.instance_4.alpha = 0.5586;

        this.timeline.addTween(cjs.Tween.get(this.instance_4).to({
            regX: 18,
            regY: 0.1,
            scaleX: 0.7093,
            scaleY: 0.7221,
            x: 225.25,
            y: 282.55,
            alpha: 1
        }, 4).wait(1));

        // line_02
        this.instance_5 = new lib.L1();
        this.instance_5.setTransform(225, 313.2, 0.7222, 0.7222, 0, 0, 0, 18, 42.5);
        this.instance_5.alpha = 0.8516;

        this.timeline.addTween(cjs.Tween.get(this.instance_5).to({
            regX: 18.1,
            regY: 42.6,
            scaleX: 1.1941,
            scaleY: 1.1941,
            x: 225.1,
            y: 439.35,
            alpha: 1
        }, 4).wait(1));

        // line_01
        this.instance_6 = new lib.L1();
        this.instance_6.setTransform(225.1, 439.35, 1.1941, 1.1941, 0, 0, 0, 18.1, 42.6);

        this.timeline.addTween(cjs.Tween.get(this.instance_6).to({
            scaleX: 1.9705,
            scaleY: 1.9705,
            x: 225.15,
            y: 618.9,
            alpha: 0
        }, 4).wait(1));

        // light_03
        this.instance_7 = new lib.LTS();
        this.instance_7.setTransform(224.8, 251.2, 1.0013, 0.8865, 0, 0, 0, 225.1, 97.4);

        this.timeline.addTween(cjs.Tween.get(this.instance_7).to({
            regY: 97.5,
            scaleX: 1.8195,
            scaleY: 1.6109,
            y: 321,
            alpha: 0
        }, 4).wait(1));

        // light_03
        this.instance_8 = new lib.LTS();
        this.instance_8.setTransform(224.9, 209.5, 0.5963, 0.5279, 0, 0, 0, 225.2, 97.4);

        this.timeline.addTween(cjs.Tween.get(this.instance_8).to({
            regX: 225.3,
            regY: 97.5,
            scaleX: 0.9925,
            scaleY: 0.8787,
            x: 225,
            y: 249.6
        }, 4).wait(1));

        // light_03
        this.instance_9 = new lib.LTS();
        this.instance_9.setTransform(225.95, 177.2, 0.2883, 0.2385, 0, 0, 0, 225.1, 97);

        this.timeline.addTween(cjs.Tween.get(this.instance_9).to({
            regX: 225.2,
            regY: 97.2,
            scaleX: 0.5914,
            scaleY: 0.4892,
            x: 225,
            y: 206.15
        }, 4).wait(1));

        // 圖層_6
        this.instance_10 = new lib.LTS();
        this.instance_10.setTransform(225.7, 181.7, 0.2416, 0.1998, 0, 0, 0, 225.2, 97.1);
        this.instance_10.alpha = 0;

        this.timeline.addTween(cjs.Tween.get(this.instance_10).to({
            regX: 225.1,
            regY: 97,
            scaleX: 0.2883,
            scaleY: 0.2385,
            x: 225.95,
            y: 177.2,
            alpha: 1
        }, 4).wait(1));

        // BD
        this.instance_11 = new lib.BDX();
        this.instance_11.setTransform(225.85, 214.25, 1.2575, 1.3161, 0, 0, 0, 323.7, 101.2);

        this.timeline.addTween(cjs.Tween.get(this.instance_11).to({
            regX: 323.6,
            scaleX: 1.8122,
            scaleY: 1.8967,
            x: 225.8,
            y: 228.2
        }, 4).wait(1));

        // BD
        this.instance_12 = new lib.BDX();
        this.instance_12.setTransform(225.9, 185.55, 0.7808, 0.7808, 0, 0, 0, 323.9, 101);

        this.timeline.addTween(cjs.Tween.get(this.instance_12).to({
            regX: 323.8,
            regY: 101.2,
            scaleX: 1.259,
            scaleY: 1.2995,
            y: 212.9
        }, 4).wait(1));

        // BD
        this.instance_13 = new lib.BDX();
        this.instance_13.setTransform(225.9, 173.65, 0.5247, 0.4753, 0, 0, 0, 323.9, 101.1);

        this.timeline.addTween(cjs.Tween.get(this.instance_13).to({
            regY: 101.2,
            scaleX: 0.7808,
            scaleY: 0.7072,
            y: 178.7
        }, 4).wait(1));

        // BD
        this.instance_14 = new lib.BDX();
        this.instance_14.setTransform(226, 173.7, 0.3796, 0.3438, 0, 0, 0, 324.2, 101.2);
        this.instance_14.alpha = 0;

        this.timeline.addTween(cjs.Tween.get(this.instance_14).to({
            regX: 323.9,
            regY: 101.1,
            scaleX: 0.5247,
            scaleY: 0.4753,
            x: 225.9,
            y: 173.65,
            alpha: 1
        }, 4).wait(1));

        // moon
        this.instance_15 = new lib.moon();
        this.instance_15.setTransform(225, 83.05, 0.75, 0.75, 0, 0, 0, 64, 64);

        this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(5));

        // 圖層_1
        this.instance_16 = new lib.bg02();
        this.instance_16.setTransform(225, 245, 1, 1, 0, 0, 0, 225, 245);

        this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(5));

        // 圖層_5
        this.instance_17 = new lib.BG2();
        this.instance_17.setTransform(225, 100, 1, 1, 0, 0, 0, 225, 100);
        this.instance_17.alpha = 0;

        this.timeline.addTween(cjs.Tween.get(this.instance_17).to({
            alpha: 1
        }, 2).to({
            alpha: 0
        }, 2).wait(1));

        // 圖層_2
        this.instance_18 = new lib.BGF();
        this.instance_18.setTransform(225, 245, 1, 1, 0, 0, 0, 225, 245);

        this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(5));

        this._renderFirstFrame();

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-360.6, -39.2, 1174.3000000000002, 741.7);


    (lib.BK = function(mode, startPosition, loop, reversed) {
        if (loop == null) {
            loop = true;
        }
        if (reversed == null) {
            reversed = false;
        }
        var props = new Object();
        props.mode = mode;
        props.startPosition = startPosition;
        props.labels = {
            stop: 0,
            go: 1
        };
        props.loop = loop;
        props.reversed = reversed;
        cjs.MovieClip.apply(this, [props]);

        // timeline functions:
        this.frame_0 = function() {
            this.stop();
        }
        this.frame_1 = function() {
            this.stop();
        }

        // actions tween:
        this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1));

        // 圖層_3
        this.instance = new lib.BOX();
        this.instance.setTransform(225, 245, 1, 1, 0, 0, 0, 225, 245);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(2));

        // bg_go
        this.BG_GO = new lib.go();
        this.BG_GO.name = "BG_GO";
        this.BG_GO.setTransform(225, 245, 1, 1, 0, 0, 0, 225, 245);
        this.BG_GO._off = true;

        this.timeline.addTween(cjs.Tween.get(this.BG_GO).wait(1).to({
            _off: false
        }, 0).wait(1));

        // bg_go
        this.BG_STOP = new lib.stop();
        this.BG_STOP.name = "BG_STOP";
        this.BG_STOP.setTransform(225, 245, 1, 1, 0, 0, 0, 225, 245);

        this.timeline.addTween(cjs.Tween.get(this.BG_STOP).to({
            _off: true
        }, 1).wait(1));

        // bg_stop
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#000000").s().p("EgjJAmSMAAAhMjMBGTAAAMAAABMjg");
        this.shape.setTransform(225, 245);

        this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

        this._renderFirstFrame();

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-181.2, -19.9, 814.9000000000001, 530);


    // stage content:
    (lib.XXX = function(mode, startPosition, loop, reversed) {
        if (loop == null) {
            loop = true;
        }
        if (reversed == null) {
            reversed = false;
        }
        var props = new Object();
        props.mode = mode;
        props.startPosition = startPosition;
        props.labels = {};
        props.loop = loop;
        props.reversed = reversed;
        cjs.MovieClip.apply(this, [props]);

        // 圖層_1
        this.BG = new lib.BK();
        this.BG.name = "BG";
        this.BG.setTransform(225, 245, 1, 1, 0, 0, 0, 225, 245);

        this.timeline.addTween(cjs.Tween.get(this.BG).wait(1));

        this._renderFirstFrame();

    }).prototype = p = new lib.AnMovieClip();
    p.nominalBounds = new cjs.Rectangle(43.8, 245, 589.9000000000001, 245);
    // library properties:
    lib.properties = {
        id: 'ABC29BBF88EE334FA30B4F630D91C367',
        width: 450,
        height: 490,
        fps: 30,
        color: "#FFFFFF",
        opacity: 1.00,
        manifest: [{
            src: "https://storage.googleapis.com/games-cdn-staging/midnightrobbery/game_image/DJR_an_test_atlas_1.png",
            id: "DJR_an_test_atlas_1"
        }],
        preloads: []
    };



    // bootstrap callback support:

    (lib.Stage = function(canvas) {
        createjs.Stage.call(this, canvas);
    }).prototype = p = new createjs.Stage();

    p.setAutoPlay = function(autoPlay) {
        this.tickEnabled = autoPlay;
    }
    p.play = function() {
        this.tickEnabled = true;
        this.getChildAt(0).gotoAndPlay(this.getTimelinePosition())
    }
    p.stop = function(ms) {
        if (ms) this.seek(ms);
        this.tickEnabled = false;
    }
    p.seek = function(ms) {
        this.tickEnabled = true;
        this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000);
    }
    p.getDuration = function() {
        return this.getChildAt(0).totalFrames / lib.properties.fps * 1000;
    }

    p.getTimelinePosition = function() {
        return this.getChildAt(0).currentFrame / lib.properties.fps * 1000;
    }

    an.bootcompsLoaded = an.bootcompsLoaded || [];
    if (!an.bootstrapListeners) {
        an.bootstrapListeners = [];
    }

    an.bootstrapCallback = function(fnCallback) {
        an.bootstrapListeners.push(fnCallback);
        if (an.bootcompsLoaded.length > 0) {
            for (var i = 0; i < an.bootcompsLoaded.length; ++i) {
                fnCallback(an.bootcompsLoaded[i]);
            }
        }
    };

    an.compositions = an.compositions || {};
    an.compositions['ABC29BBF88EE334FA30B4F630D91C367'] = {
        getStage: function() {
            return exportRoot.stage;
        },
        getLibrary: function() {
            return lib;
        },
        getSpriteSheet: function() {
            return ss;
        },
        getImages: function() {
            return img;
        }
    };

    an.compositionLoaded = function(id) {
        an.bootcompsLoaded.push(id);
        for (var j = 0; j < an.bootstrapListeners.length; j++) {
            an.bootstrapListeners[j](id);
        }
    }

    an.getComposition = function(id) {
        return an.compositions[id];
    }


    an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {
        var lastW, lastH, lastS = 1;
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function resizeCanvas() {
            var w = lib.properties.width,
                h = lib.properties.height;
            var iw = window.innerWidth,
                ih = window.innerHeight;
            var pRatio = window.devicePixelRatio || 1,
                xRatio = iw / w,
                yRatio = ih / h,
                sRatio = 1;
            if (isResp) {
                if ((respDim == 'width' && lastW == iw) || (respDim == 'height' && lastH == ih)) {
                    sRatio = lastS;
                } else if (!isScale) {
                    if (iw < w || ih < h)
                        sRatio = Math.min(xRatio, yRatio);
                } else if (scaleType == 1) {
                    sRatio = Math.min(xRatio, yRatio);
                } else if (scaleType == 2) {
                    sRatio = Math.max(xRatio, yRatio);
                }
            }
            domContainers[0].width = w * pRatio * sRatio;
            domContainers[0].height = h * pRatio * sRatio;
            domContainers.forEach(function(container) {
                container.style.width = w * sRatio + 'px';
                container.style.height = h * sRatio + 'px';
            });
            stage.scaleX = pRatio * sRatio;
            stage.scaleY = pRatio * sRatio;
            lastW = iw;
            lastH = ih;
            lastS = sRatio;
            stage.tickOnUpdate = false;
            stage.update();
            stage.tickOnUpdate = true;
        }
    }
    an.handleSoundStreamOnTick = function(event) {
        if (!event.paused) {
            var stageChild = stage.getChildAt(0);
            if (!stageChild.paused || stageChild.ignorePause) {
                stageChild.syncStreamSounds();
            }
        }
    }
    an.handleFilterCache = function(event) {
        if (!event.paused) {
            var target = event.target;
            if (target) {
                if (target.filterCacheList) {
                    for (var index = 0; index < target.filterCacheList.length; index++) {
                        var cacheInst = target.filterCacheList[index];
                        if ((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)) {
                            cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
                        }
                    }
                }
            }
        }
    }


})(createjs = createjs || {}, AdobeAn = AdobeAn || {});
var createjs, AdobeAn;