<h1 align="center">
  <img src="https://images.gamebanana.com/img/ico/sprays/naruto.gif" width="64" alt="Moongetsu Toolkit"/>
  <br />
  Moongetsu Toolkit
</h1>
<p align="center">
  <b>Powerful ScriptUI panel for <span style="color:#19a974;">streamlined</span> layer manipulation and effects in After Effects.</b><br>
  <i>Speed up your workflow with one-click tools and smart automation.</i>
</p>

<hr>

## 🎬 About

**Moongetsu Toolkit** is a modern After Effects ScriptUI panel designed to accelerate your workflow by providing quick access to common layer operations, effects, and composition tasks. Built with a clean, organized interface and smart automation features.

---

## 🚀 Features

- **9-Point Alignment Grid:** Instantly align layers to any position (top-left, center, bottom-right, etc.)
- **Smart Pre-Composition:** Auto-trims composition duration and adjusts layer timing automatically
- **Separate Pre-Composition:** When multiple layers are selected, each layer is pre-composed into its own separate composition
- **Auto-Linked Nulls:** Nulls automatically parent to selected layers (one null per layer when multiple selected)
- **One-Click Effect Presets:** Pre-configured effects with optimized settings (Blur: 10, Sharpen: 15, Mirror: 90°, etc.)
- **Layer Management:** Freeze frame, flip, rotate, and move layers up/down in the stack
- **Quick Layer Creation:** Generate solids, nulls, adjustment layers, and cameras with matching timing
- **Time-Matching:** Newly created layers automatically match selected layer's in/out points
- **Undo Support:** All operations wrapped in undo groups for easy reversal

---

## ⚙️ How Does It Work?

1. **Install the Script:** Place the `.jsx` file in your After Effects Scripts folder
2. **Open the Panel:** Run the script from `File > Scripts > Run Script File...` or install as a panel
3. **Select Layers:** Choose the layer(s) you want to modify in your composition
4. **Click & Go:** Use the intuitive buttons to align, apply effects, or manipulate layers instantly

---

## 🛠️ Requirements

- **Adobe After Effects** (CC 2014 or later recommended)
- **ScriptUI Support:** Built-in to After Effects

<sub>*No additional plugins or extensions required.*</sub>

---

## 📦 Installation

### Method 1: Run Script (Temporary)
1. Open After Effects
2. Go to `File > Scripts > Run Script File...`
3. Select `Moongetsu_Toolkit.jsx`
4. The panel will open as a floating window

### Method 2: Install as Panel (Permanent)
1. Copy `Moongetsu_Toolkit.jsx` to:
   - **Windows:** `C:\Program Files\Adobe\Adobe After Effects [Version]\Support Files\Scripts\ScriptUI Panels\`
   - **macOS:** `/Applications/Adobe After Effects [Version]/Scripts/ScriptUI Panels/`
2. Restart After Effects
3. Find the panel in `Window > Moongetsu Toolkit`
4. Dock it in your workspace for easy access!

---

## 🎯 Tool Reference

### Align Section
| Button | Function |
|--------|----------|
| 9-Point Grid | Aligns selected layers to 9 positions (TL, TC, TR, ML, MC, MR, BL, BC, BR) |

### Actions Section
| Button | Function |
|--------|----------|
| **Pre-Comp** | Pre-composes selected layers with auto-trimming and smart timing. **Multiple layers:** Each layer is pre-composed separately into its own composition |
| **Center In Comp** | Centers selected layers in the composition |
| **Save Frame** | Opens the Save Frame As dialog |

### Tools Section
| Button | Effect/Action | Settings |
|--------|---------------|----------|
| **FIT** | Fit to Comp | Centers and scales layer to fit composition width |
| **TINT** | Tint | Standard tint effect |
| **SHA** | Sharpen | Sharpen Amount: **15** |
| **MIR** | Mirror | Reflection Angle: **90°** |
| **BLUR** | Fast Blur | Blurriness: **10** |
| **LUM** | Lumetri Color | Standard Lumetri Color effect |
| **FRZ** | Freeze Frame | Freezes layer at current time indicator |
| **HUE** | Hue/Saturation | Standard Hue/Saturation effect |
| **CAM** | Create Camera | Creates a new camera layer |
| **CURV** | Curves | Standard Curves effect |
| **FILL** | Fill | Black fill color |
| **SOL** | Create Solid | Creates black solid layer |
| **ADJ** | Adjustment Layer | Creates new adjustment layer |
| **NUL** | Create Null | Creates null object layer and automatically parents selected layer(s) to it. **Multiple layers:** Creates one null per layer, each parenting its corresponding layer |
| **DSH** | Venetian Blinds | Standard Venetian Blinds effect |

### Misc Section
| Control | Function |
|---------|----------|
| **Rotate Dropdown** | Select rotation angle (45°, 90°, 180°) |
| **+ / -** | Rotate selected layers by selected amount |
| **Flip X / Flip Y** | Flip layers horizontally or vertically |
| **Up / Down** | Move layers up or down in the layer stack |
| **Out** | Trim layer out point to current time |

---

## 📸 Screenshot

<p align="center">
  <img src="https://media.discordapp.net/attachments/977518313217347604/1458920132721246432/Screenshot_18.png?ex=696164c1&is=69601341&hm=db094b6096dbde442324d5f0e09ac93db12a130339f64f33ebb4ea3edac4c3d7&=&format=webp&quality=lossless" alt="Moongetsu Toolkit Interface" />
  <br />
  <sub><i>Moongetsu Toolkit in action</i></sub>
</p>

---

<p align="center">
  <img src="https://badgen.net/badge/Built%20for/After%20Effects/red?icon=adobe" alt="After Effects" />
  <img src="https://badgen.net/badge/Language/ExtendScript/orange" alt="ExtendScript" />
</p>
