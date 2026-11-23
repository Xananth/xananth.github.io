# GEARS — Game Design Document

> **High Concept:** *GEARS* is a 3D physics-driven spinning-mech motorsport brawler built in Rust + Bevy (targeting Native & WASM). Pilots strap into **large-car-sized spinning battle mechs** (`~4.4 m` across) roaring at **Beyblade X–inspired 8,000–13,000 RPM** inside an **AFL-scale oval stadium** packed with thousands of cheering spectators. You never "drive" directly—you shift the mech's tilt from inside a gyro-stabilized cockpit, letting the physical slip-velocity interaction between the spinning tip and the `140 m` arena bowl propel, carve, and hurl your GEAR across 2–8 GEAR clashes.

---

## 1. Vision & Design Pillars

### Scale & Fantasy
Think **Formula-1 / rally-car-scale war machines** inside a packed **MCG-sized AFL stadium** at night:
- Each **GEAR** is roughly the size of a large car/SUV (`~4.4 m` diameter, `~2.9 m` tall), with a human pilot seated inside a gyro-stabilized central cockpit pod while a bladed outer weapon ring screams beneath them at `10,000+ RPM`.
- A sweeping **`140 m` diameter battle bowl** sits in the center of the AFL oval, ringed by a recessed Knockout Trench, mowed nocturnal turf apron, **3-tier grandstands packed with thousands of reactive spectators**, a cantilevered roof canopy, and 6 towering floodlight pylons.

### Visual Identity (`master.css` Theme)
Both the 3D arena and UI follow a unified **Retro-Industrial OS** aesthetic:
- **Palette:** Deep Void Purple (`#06040b`, `#0d0917`, `#140e24`) · Purple structural borders (`#23183b`, `#37255c`) · **Brand Lime** (`#8de500`, `#a7ff1f`) for player highlights, telemetry, and primary CTAs · **Horizon Emerald/Jade** (`#19543e`, `#2ea872`) for turf, lighting bounce, and section accents · **Warm Bulkhead LEDs** (`#ff4f2b`, `#ff7733`) for hazard beacons, window indicator dots, and clash sparks.
- **UI Chrome:** Retro OS windows (`.os-window`) with 2px Brand Lime top specular highlights, `#110b1f` titlebars with warm `#ff4f2b` bulkhead LED dots and right-aligned lime telemetry codes (`SYS.01`, `120HZ`, `RADAR://360`), dark left-accented info drawers, and a subtle CRT scanline/vignette overlay in the WASM browser shell.

### Core Pillars
1. **Pure Tip-Velocity Physics:** Ground speed is bounded by the physical tip surface speed $v_{\text{tip}} = \omega \cdot r_{\text{contact}}(\theta)$ via a Coulomb slip-velocity traction solver. No arcade translation cheats.
2. **Modular Triad Assembly:** Every GEAR combines a **Tip**, **Central Core**, and **Outer Ring**—each directly controlling physical parameters and rendered as distinct 3D geometry.
3. **Beyblade X Spectacle & Cinematics:** `8,000–13,000 RPM` dashes, predictive ramping slow-mo zoom-ins right into heavy impacts, 3D shockwave flash rings, dense spark fountains, and persistent Burst debris obstacles.
4. **Cross-Platform Rust & WASM:** Deterministic `120 Hz` fixed-timestep simulation (`gears_sim`) paired with Bevy 0.15 (`gears_app`) + full `bevy_gilrs` controller support on both Native desktop and browser WASM.

---

## 2. Core Gameplay Loop & Controls

### Match Flow
1. **Mech Hangar (`AppState::Garage`):**
   - Assemble your **Tip**, **Central Core**, and **Outer Ring** with a live 3D spinning preview in the center of the stadium.
   - Select battle roster size (**2–8 GEARS**), optional **Spin Direction Override** (`AUTO` / `CW` / `CCW`), and **Infinite Spin** testing toggle (`INF SPIN: ON/OFF`).
2. **Holding Clamp Spin-Up & Ramp Launch (`AppState::Launch`):**
   - All GEARS start locked inside articulated **Launch Holding Clamps** perched above angled steel **Launch Ramps** around the stadium rim.
   - **3.0-second Button-Mash Spin-Up:** Mash the launch button to crank RPM from `7,200` up to `13,200+ RPM` (throwing sparks and vibrating inside the clamp).
   - **Landing Control:** Hold left/right (`A`/`D` or Left Stick X) to steer your ramp launch angle and forward/back (`W`/`S` or Left Stick Y) to bias aggressive dive vs. high stable landing tilt.
   - At `0.0s`, the clamp jaws snap open and all GEARS rocket down their angled Launch Ramps (`0.48 s`) before launching airborne into the `140 m` battle bowl.
3. **Battle Phase (`AppState::Battle`):**
   - Tilt to carve down the sweeping dish, ride the banked Tornado Ridge, brace against heavy hits, dodge or punt fallen Burst debris, and eliminate rivals via **Spin-Out**, **Ring-Out**, or **Burst**.
4. **Match Debrief (`AppState::Results`):**
   - Slow-mo finish, champion banner, player knockouts, peak clash G-force, match duration, and instant **Rematch** or **Back to Hangar**.

### Controls (Keyboard/Mouse + Full Controller via `bevy_gilrs`)

| Context | Action | Keyboard + Mouse | Gamepad |
| :--- | :--- | :--- | :--- |
| **Hangar** | Swap Parts / Options | Mouse Click | `LB`/`RB` (Tip/Core), `D-Pad L/R` (Ring), `D-Pad U/D` (2–8 GEARS), `X` (Spin), `Y` (Inf Spin) |
| **Hangar** | Launch Match | Click `LAUNCH >>` | `A` (South) / `Start` |
| **Launch** | Spin-Up Mash | Mash `Space` / `Enter` / `Left-Click` | Mash `A` / `X` / `B` / `RT` |
| **Launch** | Steer Landing & Dive | `W A S D` / Arrow Keys | `Left Stick` |
| **Battle** | Tilt Direction | `W A S D` (camera-relative) | `Left Stick` (analog) |
| **Battle** | Camera Orbit | Mouse Drag / `Q` `E` / Arrow Keys | `Right Stick` |
| **Battle** | Brace (Center Tilt / Dampen) | Hold `Space` | Hold `A` / `LT` |
| **Battle** | Soft Target Lock-On | `Tab` / `F` / Middle-Click | `R3` / `RT` |
| **Results** | Rematch / Hangar | Mouse Click | `A`/`Start` (Rematch) · `B` (Hangar) |

---

## 3. Physics Model (`gears_sim`, 120 Hz Deterministic)

*GEARS* runs a custom deterministic `120 Hz` fixed-timestep solver in `gears_sim` over an analytic stadium surface—zero jitter, identical on Native and WASM.

### Per-GEAR State
- **Kinematics:** World position $\vec{p}$, linear velocity $\vec{v}$
- **Spin:** Angular speed $\omega$ (`RPM`, launch `7,200–13,200 RPM`, wobble `< 2,600 RPM`, Spin-Out `< 850 RPM`), active spin direction `CW`/`CCW`
- **Orientation:** World XZ tilt vector $\vec{\theta}$ slewed by the Core's tilt actuator torque + low-RPM/impact wobble
- **Integrity:** Core Burst Lock meter $B \in [0, B_{\max}]$

### True Tip-Contact Slip-Velocity Traction
When grounded on the bowl surface (with upward normal $\vec{n}$ and angular speed $\omega = \frac{2\pi \cdot \text{RPM}}{60}$):
1. **Effective Rolling Contact Radius:** Each Tip defines `contact_radius_meters(tilt_frac)` $r_{\text{contact}}(\theta)$.
2. **Tip Surface Velocity:** The spinning contact patch moves at physical linear speed:
   $$v_{\text{tip}} = \omega \cdot r_{\text{contact}}(\theta)$$
   directed along the tilt tangent vector with a subtle spin-handedness precession curl ($\pm 12.6^\circ$ for CW/CCW).
3. **Coulomb Slip-Velocity Traction:** Friction strictly cancels slip $\vec{v}_{\text{slip}} = \vec{v}_{\text{surface}} - \vec{v}_{\text{tan}}$, clamped to the floor's Coulomb ceiling:
   $$\|\vec{a}_{\text{traction}}\| \le \frac{\mu_{\text{tip}} \cdot g_{\text{normal}}}{m}$$
   - On flat ground, a GEAR can **never** accelerate past $v_{\text{tip}}$.
   - Gravity dives down the bowl or clash impulses can temporarily exceed $v_{\text{tip}}$, where tip friction naturally carves/brakes the excess velocity.
   - When airborne ($g_{\text{normal}} = 0$), tip traction is **zero** (pure ballistic flight).
   - Leaning past $\theta_{\max}$ causes **Floor Scrape** (sparks, braking, and rapid RPM burn).
4. **Infinite Spin Testing Mode:** `SimConfig::infinite_spin` disables all RPM drain (passive, tilt, scrape, wall, and clash) so players can test tip handling, CW/CCW curl, and clashes indefinitely.

### GEAR-to-GEAR Clashes & Persistent Burst Debris
- **Same-Spin Clash (CW vs CW / CCW vs CCW):** Opposing rim velocities create high tangential recoil, warm-amber spark showers, heavy knockback, and high Burst Lock shock.
- **Opposite-Spin Clash (CW vs CCW):** Aligned rim velocities reduce recoil, emit electric Brand Lime sparks, and trigger **spin equalization (spin steal)**.
- **Vertical Blade Profiles:** `Valkyrie-3` scoops rivals upward toward Ring-Out walls; `Cleaver-2` spikes them downward.
- **Persistent Burst Debris (`SimWorld::debris`):** When $B \le 0$, the GEAR **Bursts** and spawns 3 live physical [`DebrisPiece`](file:///home/admin/Projects/antigrav/beybladetest/crates/gears_sim/src/physics.rs#L84-L96) obstacles (**Outer Ring**, **Central Core**, **Tip**). Parts that land inside the bowl bounce, slide with concrete friction, and remain as real colliding hazards that deflect alive GEARS or get punted flying across the arena.

---

## 4. GEAR Anatomy (Modular 3-Part System)

### 1. Tips (Drivers)
| Tip | Contact Profile ($r_{\text{contact}}$ at 10k RPM) | Character |
| :--- | :--- | :--- |
| **Needle (Sharp)** | Pinpoint `0–0.006 m` center → `0.044 m` collar (`~46 m/s`) | Center-holding stamina specialist; minimal drift unless leaned hard |
| **Tread-Flat (Rubber)** | Immediate wide flat up to `0.086 m` (`~90 m/s`) | Explosive Beyblade-X attack dashes & ridge carving; high RPM burn |
| **Dome (Wide Ball)** | Smooth spherical curve up to `0.058 m` (`~61 m/s`) | Balanced handling, forgiving traction, high knockback stability |
| **Step-Cone (Dual)** | Calm center (`0–0.015 m`) → flat bevel `0.076 m` (`~80 m/s`) | Conserves stamina at low tilt; surges into flat-tip dashes past 55% tilt |

### 2. Central Cores (Chassis & Pilot Pod)
- **Bastion Core:** Heavy armor (`1.32x` mass), highest Burst Lock (`135`), slower tilt actuators (CW).
- **Turbine Core:** Lightweight (`0.90x` mass), highest tilt-actuator torque (`9.2`) for snappy carving (CW).
- **Flywheel Core:** Perimeter-weighted rotor (`1.42x` inertia) for peak RPM retention (CW).
- **Contra Core (CCW):** Counter-clockwise rotor enabling spin-steal matchups against CW rivals.

### 3. Outer Rings (Bladed Weapons)
- **Cleaver-2 (Smash):** Twin massive asymmetric blades; huge knockback & Burst power, downward spike, high recoil.
- **Sawtooth-6 (Barrage):** Six serrated fins; steady grinding attack & RPM drain.
- **Aegis-0 (Defense):** Smooth circular shroud; minimal self-recoil and aero drag.
- **Valkyrie-3 (Upper):** Three swept upward vanes; lofts rivals toward Ring-Out pockets and walls.

---

## 5. Stadium, Camera & Cinematic Feel

### AFL Stadium & Center Battle Bowl
- **Center Battle Bowl:** `140 m` diameter (`outer_radius = 70 m`, scaled `0.90x` for 1v1 up to `1.14x` for 5–8 GEARS) with a sweeping parabolic dish (`17.6 m` rim height), 10m concentric telemetry rings, 16 radial sector lines, `4.2 m` retaining walls, and 3–4 recessed **Knockout Pockets** flanked by glowing `#ff4f2b` warning beacons.
- **AFL Oval & Packed Crowds:** Mowed nocturnal emerald turf apron (`~180 m × 168 m`), glowing Brand Lime boundary LED ribbon, **3-tier sloped grandstands** with LED tier fascias, cantilevered roof canopy, 6 MCG-style floodlight towers, and **~4,000+ human-scale spectators** rendered in a single batched vertex-colored mesh (1 draw call for 60 FPS WASM) that visibly bounce and cheer on clashes.

### Chase Camera & Impact Cinematics
- **Low Car-Scale Chase Camera:** Positioned `8.6–12 m` behind and `2.8–5 m` above your GEAR, decoupled from blade spin, with speed-reactive FOV (`58° → 78°`), subtle horizon roll matching tilt, and optional soft target lock-on.
- **Ramping Slow-Mo Zoom-In:** [`SimWorld::imminent_player_clash`](file:///home/admin/Projects/antigrav/beybladetest/crates/gears_sim/src/physics.rs#L246-L282) predicts high-speed player collisions (`< 0.14 s` to impact) and smoothly ramps time scale (`1.0 → 0.16x`) while zooming the camera into the impact apex.
- **Flashes & Sparks:** Heavy clashes and Bursts trigger expanding 3D **Impact Flash Spheres & Shockwave Rings**, directional spark fountains, camera shake, and a brief full-screen impact flash overlay.

---

## 6. Technical Architecture (Rust + Bevy 0.15 + Native & WASM)

```text
beybladetest/
├── Cargo.toml                      # Workspace manifest
├── .cargo/config.toml              # wasm32 getrandom_backend="wasm_js"
├── index.html                      # WASM entry + master.css CRT scanline/vignette shell
├── Trunk.toml                      # Trunk build config
├── master.css                      # Visual style reference
└── crates/
    ├── gears_sim/                  # Pure deterministic 120Hz simulation + unit tests
    │   └── src/
    │       ├── lib.rs              # Public API & 7 physics unit tests
    │       ├── parts.rs            # Tip, Core, Ring specs & contact_radius_meters()
    │       ├── stadium.rs          # Analytic 140m AFL bowl, pockets & LaunchRamp geometry
    │       ├── physics.rs          # Slip-velocity traction, clashes, DebrisPiece obstacles, imminent clash prediction
    │       └── ai.rs               # Fair archetype-driven AI bots (Aggressor, Endurance, Defender, Opportunist)
    └── gears_app/                  # Bevy 0.15 3D client (Native + WASM + bevy_gilrs)
        └── src/
            ├── main.rs             # App wiring, states, 120Hz FixedUpdate, void-purple lighting & fog
            ├── state.rs            # AppState, LaunchStage, MatchConfig, ActiveSim cinema state
            ├── theme.rs            # master.css design tokens & Retro OS Window UI helpers
            ├── stadium_mesh.rs     # Procedural 140m bowl, AFL oval, 3-tier stands, batched crowd, Launch Clamps & Ramps
            ├── gear_visuals.rs     # Car-scale 3-part mech meshes, DebrisVisual, sparks, ImpactFlashEffect
            ├── camera.rs           # Low car-scale chase camera, ramping slow-mo zoom-in, ramp launch view
            ├── input.rs            # Keyboard, Mouse & Gamepad camera-relative tilt + lock-on
            ├── sim_bridge.rs       # Button-mash spin-up, ramp slide, 120Hz sim bridge, VFX & debris sync
            └── ui.rs               # Retro OS Hangar, Launch Spin-Up, Battle HUD + 360° Radar + Flash Overlay, Results
```

---

## 7. Roadmap & Current Status

- [x] **Milestone 0 — Foundation & Toolchain:** Rust workspace (`gears_sim` + `gears_app`), Bevy 0.15, verified Native & `wasm32-unknown-unknown` builds with `bevy_gilrs` controller support.
- [x] **Milestone 1 — Pure Tip-Velocity Physics & AFL Scale:** `140 m` sweeping battle bowl inside a crowd-packed AFL stadium, car-scale GEARS, Beyblade X `8,000–13,000 RPM` slip-velocity Coulomb traction, CW/CCW & Infinite Spin test options.
- [x] **Milestone 2 — Combat, Cinematics & Persistent Debris:** Spin-Out, Ring-Out, Burst with persistent colliding 3-part bowl debris obstacles, predictive ramping slow-mo zoom-in, 3D shockwave flash rings, and sparks.
- [x] **Milestone 3 — Modular Hangar, Launch Ramps & 2–8 GEAR Brawls:** 4 Tips / 4 Cores / 4 Rings, physical Launch Holding Clamps & angled Launch Ramps with button-mash spin-up & landing steer, archetype AI bots, 360° threat radar, and full gamepad navigation.
- [x] **Milestone 4a — Visual Style Pass (`master.css`):** Deep Void Purple + Brand Lime + Horizon Emerald + Warm Bulkhead LEDs across 3D lighting, stadium, mechs, Retro OS Window UI, and WASM CRT shell.
- [ ] **Milestone 4b — Audio & Final Polish:** Procedural/layered RPM-pitched turbine & blade-whir audio, metallic clash SFX, crowd roar swell on knockouts/Bursts, tire/tip ground-scrape skid trails, and production WASM deployment bundle (`trunk build --release`).
