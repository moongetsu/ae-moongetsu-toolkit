{
    function MoonToolKit(thisObj) {
        var scriptName = "Moongetsu Toolkit";
        
        var Utils = {
            getComp: function() {
                var comp = app.project.activeItem;
                if (!(comp instanceof CompItem)) {
                    return null;
                }
                return comp;
            },
            
            getLayers: function(comp) {
                if (!comp) return [];
                var layers = comp.selectedLayers;
                return layers;
            },

            addEffect: function(matchName) {
                var comp = this.getComp();
                if (!comp) return;
                var layers = this.getLayers(comp);
                
                app.beginUndoGroup("Add Effect " + matchName);
                for (var i = 0; i < layers.length; i++) {
                    var layer = layers[i];
                    if (layer.property("Effects")) {
                        layer.property("Effects").addProperty(matchName);
                    }
                }
                app.endUndoGroup();
            },

            addFillEffect: function() {
                var comp = this.getComp();
                if (!comp) return;
                var layers = this.getLayers(comp);
                
                app.beginUndoGroup("Add Fill Effect");
                for (var i = 0; i < layers.length; i++) {
                    var layer = layers[i];
                    if (layer.property("Effects")) {
                        var fillEffect = layer.property("Effects").addProperty("ADBE Fill");
                        if (fillEffect && fillEffect.property("Color")) {
                            fillEffect.property("Color").setValue([0, 0, 0]);
                        }
                    }
                }
                app.endUndoGroup();
            },

            addBlurEffect: function() {
                var comp = this.getComp();
                if (!comp) return;
                var layers = this.getLayers(comp);
                
                app.beginUndoGroup("Add Blur Effect");
                for (var i = 0; i < layers.length; i++) {
                    var layer = layers[i];
                    if (layer.property("Effects")) {
                        var blurEffect = layer.property("Effects").addProperty("ADBE Fast Blur");
                        if (blurEffect && blurEffect.property("Blurriness")) {
                            blurEffect.property("Blurriness").setValue(10);
                        }
                    }
                }
                app.endUndoGroup();
            },

            addMirrorEffect: function() {
                var comp = this.getComp();
                if (!comp) return;
                var layers = this.getLayers(comp);
                
                app.beginUndoGroup("Add Mirror Effect");
                for (var i = 0; i < layers.length; i++) {
                    var layer = layers[i];
                    if (layer.property("Effects")) {
                        var mirrorEffect = layer.property("Effects").addProperty("ADBE Mirror");
                        if (mirrorEffect && mirrorEffect.property("Reflection Angle")) {
                            mirrorEffect.property("Reflection Angle").setValue(90);
                        }
                    }
                }
                app.endUndoGroup();
            },

            addSharpenEffect: function() {
                var comp = this.getComp();
                if (!comp) return;
                var layers = this.getLayers(comp);
                
                app.beginUndoGroup("Add Sharpen Effect");
                for (var i = 0; i < layers.length; i++) {
                    var layer = layers[i];
                    if (layer.property("Effects")) {
                        var sharpenEffect = layer.property("Effects").addProperty("ADBE Sharpen");
                        if (sharpenEffect && sharpenEffect.property("Sharpen Amount")) {
                            sharpenEffect.property("Sharpen Amount").setValue(15);
                        }
                    }
                }
                app.endUndoGroup();
            },

            freezeFrame: function() {
                var comp = this.getComp();
                if (!comp) return;
                var layers = this.getLayers(comp);
                var currentTime = comp.time;
                
                app.beginUndoGroup("Freeze Frame");
                for (var i = 0; i < layers.length; i++) {
                    var layer = layers[i];
                    try {
                        if (layer.canSetTimeRemapEnabled) {
                            layer.timeRemapEnabled = true;
                        }
                        var timeRemap = layer.property("ADBE Time Remapping");
                        if (!timeRemap) {
                            timeRemap = layer.property("Time Remap");
                        }
                        if (timeRemap && timeRemap.numKeys === 0) {
                            timeRemap.setValueAtTime(currentTime, currentTime);
                        } else if (timeRemap) {
                            timeRemap.setValueAtTime(currentTime, currentTime);
                            if (layer.outPoint > currentTime) {
                                timeRemap.setValueAtTime(layer.outPoint, currentTime);
                            }
                        }
                    } catch (e) {
                    }
                }
                app.endUndoGroup();
            },

            alignLayers: function(posIndex) {
                var comp = this.getComp();
                if (!comp) return;
                var layers = this.getLayers(comp);
                
                app.beginUndoGroup("Align Layers");
                for (var i = 0; i < layers.length; i++) {
                    var layer = layers[i];
                    var rect = layer.sourceRectAtTime(comp.time, false);
                    var x = layer.transform.position.value[0];
                    var y = layer.transform.position.value[1];
                    
                    var left = 0; 
                    var center = comp.width / 2; 
                    var right = comp.width;
                    var top = 0; 
                    var middle = comp.height / 2; 
                    var bottom = comp.height;

                    if (posIndex % 3 == 0) x = 0;
                    if (posIndex % 3 == 1) x = comp.width / 2;
                    if (posIndex % 3 == 2) x = comp.width;
                    
                    if (posIndex < 3) y = 0;
                    if (posIndex >= 3 && posIndex < 6) y = comp.height / 2;
                    if (posIndex >= 6) y = comp.height;

                    layer.transform.position.setValue([x, y]);
                }
                app.endUndoGroup();
            },

            matchTime: function(newLayer, comp) {
                if (comp.selectedLayers.length > 0) {
                    var target = comp.selectedLayers[0];
                    newLayer.inPoint = target.inPoint;
                    newLayer.outPoint = target.outPoint;
                }
            },

            createSolid: function(name, r, g, b) {
                var comp = this.getComp();
                if (!comp) return;
                var hasSelection = comp.selectedLayers.length > 0;
                var target = hasSelection ? comp.selectedLayers[0] : null;
                
                app.beginUndoGroup("Create Solid");
                var layer = comp.layers.addSolid([r,g,b], name, comp.width, comp.height, comp.pixelAspect, comp.duration);
                if (target) {
                    layer.inPoint = target.inPoint;
                    layer.outPoint = target.outPoint;
                    layer.moveBefore(target);
                }
                app.endUndoGroup();
            },

            createNull: function() {
                var comp = this.getComp();
                if (!comp) return;
                var layers = this.getLayers(comp);
                if (layers.length === 0) {
                    app.beginUndoGroup("Create Null");
                    comp.layers.addNull();
                    app.endUndoGroup();
                    return;
                }

                app.beginUndoGroup("Create Null");
                
                for (var i = 0; i < layers.length; i++) {
                    var targetLayer = layers[i];
                    var nullLayer = comp.layers.addNull();
                    
                    nullLayer.inPoint = targetLayer.inPoint;
                    nullLayer.outPoint = targetLayer.outPoint;
                    
                    nullLayer.moveBefore(targetLayer);
                    
                    targetLayer.parent = nullLayer;
                }
                
                app.endUndoGroup();
            },

            createAdj: function() {
                var comp = this.getComp();
                if (!comp) return;
                var hasSelection = comp.selectedLayers.length > 0;
                var target = hasSelection ? comp.selectedLayers[0] : null;

                app.beginUndoGroup("Create Adj Layer");
                var layer = comp.layers.addSolid([1,1,1], "Adjustment Layer", comp.width, comp.height, comp.pixelAspect, comp.duration);
                layer.adjustmentLayer = true;
                if (target) {
                    layer.inPoint = target.inPoint;
                    layer.outPoint = target.outPoint;
                    layer.moveBefore(target);
                }
                app.endUndoGroup();
            },
            
            fitToComp: function() {
                var comp = this.getComp();
                if (!comp) return;
                var layers = this.getLayers(comp);
                app.beginUndoGroup("Fit to Comp");
                for (var i = 0; i < layers.length; i++) {
                    var layer = layers[i];
                    layer.transform.position.setValue([comp.width/2, comp.height/2]);
                    if (layer.source) {
                        var s = (comp.width / layer.width) * 100;
                        layer.transform.scale.setValue([s, s]);
                    }
                }
                app.endUndoGroup();
            },

            rotate: function(angle) {
                var comp = this.getComp();
                if (!comp) return;
                var layers = this.getLayers(comp);
                app.beginUndoGroup("Rotate");
                for (var i=0; i<layers.length; i++) {
                    var r = layers[i].transform.rotation.value;
                    layers[i].transform.rotation.setValue(r + angle);
                }
                app.endUndoGroup();
            },

            flip: function(axis) {
                var comp = this.getComp();
                if (!comp) return;
                var layers = this.getLayers(comp);
                app.beginUndoGroup("Flip");
                for (var i=0; i<layers.length; i++) {
                    var s = layers[i].transform.scale.value;
                    if (axis === 'x') layers[i].transform.scale.setValue([-s[0], s[1], s[2]]);
                    if (axis === 'y') layers[i].transform.scale.setValue([s[0], -s[1], s[2]]);
                }
                app.endUndoGroup();
            },

            moveLayers: function(direction) {
                var comp = this.getComp();
                if (!comp) return;
                var layers = this.getLayers(comp);
                
                var layerArr = [];
                for (var i = 0; i < layers.length; i++) layerArr.push(layers[i]);
                layerArr.sort(function(a, b) { return a.index - b.index; });
                
                app.beginUndoGroup("Move Layers");
                if (direction === -1) {
                    for (var i = 0; i < layerArr.length; i++) {
                        var l = layerArr[i];
                        if (l.index > 1) {
                            l.moveBefore(comp.layer(l.index - 1));
                        }
                    }
                } else {
                    for (var i = layerArr.length - 1; i >= 0; i--) {
                        var l = layerArr[i];
                        if (l.index < comp.numLayers) {
                            l.moveAfter(comp.layer(l.index + 1));
                        }
                    }
                }
                app.endUndoGroup();
            },

            precomposeSelected: function() {
                var comp = this.getComp();
                if (!comp) return;
                var layers = this.getLayers(comp);
                if (layers.length === 0) return;
                
                app.beginUndoGroup("Pre-Compose");
                
                if (layers.length > 1) {
                    var layerData = [];
                    for (var i = 0; i < layers.length; i++) {
                        layerData.push({
                            layer: layers[i],
                            originalIndex: layers[i].index,
                            minIn: layers[i].inPoint,
                            maxOut: layers[i].outPoint,
                            name: layers[i].name
                        });
                    }
                    layerData.sort(function(a, b) { return b.originalIndex - a.originalIndex; });
                    
                    for (var i = 0; i < layerData.length; i++) {
                        var data = layerData[i];
                        var layer = data.layer;
                        var currentIndex = layer.index;
                        
                        var newComp = comp.layers.precompose([currentIndex], data.name, true);
                        
                        for (var j = 1; j <= newComp.numLayers; j++) {
                            var l = newComp.layer(j);
                            l.startTime -= data.minIn;
                        }
                        
                        newComp.duration = data.maxOut - data.minIn;
                        
                        var preCompLayer = comp.layer(currentIndex);
                        if (preCompLayer && preCompLayer.source === newComp) {
                            preCompLayer.startTime = data.minIn;
                        }
                    }
                } else {
                    var layer = layers[0];
                    var minIn = layer.inPoint;
                    var maxOut = layer.outPoint;
                    var preCompName = layer.name;
                    
                    var newComp = comp.layers.precompose([layer.index], preCompName, true);
                    
                    for (var i = 1; i <= newComp.numLayers; i++) {
                        var l = newComp.layer(i);
                        l.startTime -= minIn;
                    }
                    
                    newComp.duration = maxOut - minIn;
                    
                    var preCompLayer = comp.selectedLayers[0];
                    if (preCompLayer && preCompLayer.source === newComp) {
                        preCompLayer.startTime = minIn;
                    }
                }
                
                app.endUndoGroup();
            }
        };

        function buildUI(thisObj) {
            var win = (thisObj instanceof Panel) ? thisObj : new Window("palette", scriptName, undefined, {resizeable: true});
            win.spacing = 10;
            win.margins = 10;
            win.orientation = "column";
            win.alignChildren = ["fill", "top"];

            var topGroup = win.add("group");
            topGroup.orientation = "row";
            topGroup.alignChildren = ["fill", "top"];
            topGroup.spacing = 10;

            var alignPanel = topGroup.add("panel", undefined, "Align");
            alignPanel.orientation = "column";
            alignPanel.alignChildren = ["center", "center"];
            
            var alignGrid = alignPanel.add("group");
            alignGrid.orientation = "column";
            alignGrid.spacing = 2;
            
            var btnSize = [30, 30];
            var icons = ["\u2196", "\u2191", "\u2197", "\u2190", "\u25C9", "\u2192", "\u2199", "\u2193", "\u2198"];
            
            for (var r = 0; r < 3; r++) {
                var row = alignGrid.add("group");
                row.spacing = 2;
                for (var c = 0; c < 3; c++) {
                    (function(idx) {
                        var btn = row.add("button", [0,0,btnSize[0],btnSize[1]], icons[idx]);
                        btn.onClick = function() { Utils.alignLayers(idx); };
                    })(r * 3 + c);
                }
            }

            var actionsPanel = topGroup.add("panel", undefined, "Actions");
            actionsPanel.orientation = "column";
            actionsPanel.alignChildren = ["fill", "top"];
            actionsPanel.spacing = 5;

            var bPreComp = actionsPanel.add("button", undefined, "Pre-Comp");
            bPreComp.onClick = function() { Utils.precomposeSelected(); };

            var bCenter = actionsPanel.add("button", undefined, "Center In Comp");
            bCenter.onClick = function() { Utils.alignLayers(4); };

            var bSaveFrame = actionsPanel.add("button", undefined, "Save Frame");
            bSaveFrame.onClick = function() { app.executeCommand(app.findMenuCommandId("Save Frame As...")); };

            var toolsPanel = win.add("panel", undefined, "Tools");
            toolsPanel.orientation = "column";
            toolsPanel.alignChildren = ["fill", "top"];
            
            var toolsGrid = toolsPanel.add("group");
            toolsGrid.orientation = "column";
            toolsGrid.spacing = 5;

            var toolDefs = [
                [{l:"FIT", f:function(){ Utils.fitToComp(); }}, {l:"TINT", e:"ADBE Tint"}, {l:"SHA", f:function(){ Utils.addSharpenEffect(); }}, {l:"MIR", f:function(){ Utils.addMirrorEffect(); }}, {l:"BLUR", f:function(){ Utils.addBlurEffect(); }}],
                [{l:"LUM", e:"ADBE Lumetri Color"}, {l:"FRZ", f:function(){ Utils.freezeFrame(); }}, {l:"HUE", e:"ADBE HUE SATURATION"}, {l:"CAM", f:function(){ Utils.getComp().layers.addCamera("Camera", [Utils.getComp().width/2, Utils.getComp().height/2]); }}, {l:"CURV", e:"ADBE Curves"}],
                [{l:"FILL", f:function(){ Utils.addFillEffect(); }}, {l:"SOL", f:function(){ Utils.createSolid("Solid", 0,0,0); }}, {l:"ADJ", f:function(){ Utils.createAdj(); }}, {l:"NUL", f:function(){ Utils.createNull(); }}, {l:"DSH", e:"ADBE Venetian Blinds"}]
            ];

            for (var r = 0; r < toolDefs.length; r++) {
                var tRow = toolsGrid.add("group");
                tRow.orientation = "row";
                tRow.spacing = 5;
                tRow.alignChildren = ["fill", "center"];
                
                for (var c = 0; c < toolDefs[r].length; c++) {
                    (function(def) {
                        var tBtn = tRow.add("button", undefined, def.l);
                        tBtn.preferredSize.width = 40;
                        tBtn.onClick = function() {
                            if (def.f) def.f();
                            else if (def.e) Utils.addEffect(def.e);
                        };
                    })(toolDefs[r][c]);
                }
            }

            var miscPanel = win.add("panel", undefined, "Misc");
            miscPanel.orientation = "column";
            miscPanel.alignChildren = ["left", "center"];

            var miscRow1 = miscPanel.add("group");
            miscRow1.add("statictext", undefined, "Rotate:");
            var rotAmount = miscRow1.add("dropdownlist", undefined, ["45", "90", "180"]);
            rotAmount.selection = 0;
            rotAmount.preferredSize.width = 60;
            
            var miscRow2 = miscPanel.add("group");
            
            var btnP45 = miscRow2.add("button", undefined, "+");
            btnP45.size = [30,25];
            btnP45.onClick = function() { Utils.rotate(parseFloat(rotAmount.selection.text)); };

            var btnM45 = miscRow2.add("button", undefined, "-");
            btnM45.size = [30,25];
            btnM45.onClick = function() { Utils.rotate(-parseFloat(rotAmount.selection.text)); };

            var btnFlipX = miscRow2.add("button", undefined, "Flip X");
            btnFlipX.onClick = function() { Utils.flip('x'); };

            var btnFlipY = miscRow2.add("button", undefined, "Flip Y");
            btnFlipY.onClick = function() { Utils.flip('y'); };

            var btnUp = miscRow2.add("button", undefined, "Up");
            btnUp.size = [40,25];
            btnUp.onClick = function() { Utils.moveLayers(-1); };
            
            var btnDown = miscRow2.add("button", undefined, "Down");
            btnDown.size = [40,25];
            btnDown.onClick = function() { Utils.moveLayers(1); };

            var btnOut = miscRow2.add("button", undefined, "Out");
            btnOut.size = [40,25];
             btnOut.onClick = function() { 
                var c = Utils.getComp(); if(!c) return;
                var l = Utils.getLayers(c);
                app.beginUndoGroup("Trim Out");
                for(var i=0; i<l.length; i++) l[i].outPoint = c.time;
                app.endUndoGroup();
            };

            win.layout.layout(true);
            return win;
        }

        var myWindow = buildUI(thisObj);
        if (myWindow instanceof Window) {
            myWindow.center();
            myWindow.show();
        } else {
            myWindow.layout.layout(true);
        }
    }

    MoonToolKit(this);
}
