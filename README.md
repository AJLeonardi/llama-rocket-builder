# 🦙🚀 Llama Rocket Builder

A family rocket game designed by a 7-year-old.

Start in your house and find the **Rocket Bay door** in the kitchen, next to the stove. In the bay you mine rocks, make rocket parts, and **build a rocket any way you want**. Build it really wrong and it goes **KA-BOOM** on the launch pad (don't worry, your parts are safe).

Watch the takeoff, then steer through the asteroids. A shield on the sides keeps you on course. Asteroids knock your wings off, so bring spare wings and put them back on. At each planet you choose **YES** to land or **NO** to keep going:

**Mercury → Mars → Planet Choco → Planet Video Games → Planet Evil** (the end!)

## How to play

| | Touch (iPhone / iPad) | Keyboard (Mac) |
|---|---|---|
| Walk / fly | joystick, bottom-left | W A S D or arrows |
| Use things | ✋ button, or tap the thing | SPACE, or click |
| Put a wing back on | 🔧 button | R |
| Pause | ⏸ | ESC |
| Sound on/off | | M |

- **Mine Rocks** ⛏️ gives stone, metal, gold, and sometimes a diamond 💎.
- **Workbench** 🔧 turns materials into parts.
- **Build & Launch** 🚀: drag parts onto the grid. Tap a part to take it back off.
- Rockets need an **engine at the bottom**, a **cockpit** for your llama, and every part touching. Nose cones go on top. Wings in pairs make the rocket steady.
- Stronger engines go farther: Basic gets you to Mars, Turbo to Video Games, Mega to Planet Evil.
- Land on planets to collect better materials. You can start your next flight from any planet you've landed on.
- 🎟️ Tokens are your score.

The game saves by itself.

## Play together (two devices)

1. Both devices join the **same Wi-Fi** and open the game.
2. Both tap **🦙🦙 Play Together**. Each screen shows its own QR code and its front camera.
3. Hold the two screens **facing each other**. They scan each other and connect by themselves.

Once connected you play together:

- **Same house:** you see each other's llama walking around. Each of you has your own Rocket Bay, stuff and rocket.
- **Take off together:** the first to press LAUNCH waits ("Waiting for Llama 2…") until the other presses LAUNCH too. Then you get one countdown and lift off side by side. There's also a "Go without them" button.
- **Fly together:** you both fly at the slower rocket's speed through the same asteroids, so you stay side by side. Rockets can't crash into each other.
- **Planets:** you each pick YES or NO. The first answer waits for the second. If you agree you go together, and if you pick differently you each go your own way. "Fly to the next planet" also waits for both of you.

There's no game server: the devices talk directly to each other over WebRTC, so no internet is needed once the game is loaded. If a device has no camera, open "copy and paste codes" on the pairing screen.

## Running it

It's plain HTML + JavaScript, with no build step.

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. The camera only works over **https** (or localhost), so put it on GitHub Pages to play on iPhone/iPad. After opening it once, use Share → **Add to Home Screen** and it works offline.

## Versions

Every push to `main` deploys through `.github/workflows/pages.yml`, which stamps the build number (the number of commits) into `js/version.js` and `version.json`. The build number shows in the bottom-right corner. When a newer build is live, the game shows a **"✨ New version! Tap to get it"** button. Locally the build shows as `dev`.

## Code map

- `js/core.js`: canvas, keyboard/touch input, buttons, sounds, saving
- `js/data.js`: materials, parts, planets
- `js/art.js`: all drawings (llamas, rocket parts, planets, asteroids)
- `js/house.js`, `js/bay.js`: house, Rocket Bay, workbench
- `js/builder.js`: rocket builder and the "does it explode?" check (`analyzeRocket`)
- `js/flight.js`: takeoff, space flight, planet prompts
- `js/planet.js`: planet surfaces and Planet Evil
- `js/net.js`: two-device pairing and multiplayer messages
- `js/vendor/`: QR code maker ([qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator), MIT) and reader ([jsQR](https://github.com/cozmo/jsQR), Apache-2.0)
- `tests/pairing-test.html`: runs two copies of the game in one page and connects them (needs a browser with WebRTC)
