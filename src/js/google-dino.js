//google dino

(() => {
  'use strict';

  const ROOT_ID = 'google-dino-root';
  const SPRITE_1X =
    'https://wayou.github.io/t-rex-runner/assets/default_100_percent/100-offline-sprite.png';
  const SPRITE_2X =
    'https://wayou.github.io/t-rex-runner/assets/default_200_percent/200-offline-sprite.png';

  const FPS = 60;
  const DEFAULT_WIDTH = 700;
  const IS_HIDPI = window.devicePixelRatio > 1;
  const IS_IOS =
    window.navigator.userAgent.indexOf('CriOS') > -1 ||
    window.navigator.userAgent === 'UIWebViewForStaticFileContent';
  const IS_MOBILE = window.navigator.userAgent.indexOf('Mobi') > -1 || IS_IOS;
  const IS_TOUCH_ENABLED = 'ontouchstart' in window;

  function getTimeStamp() {
    return performance.now();
  }

  function createCanvas(container, width, height, className) {
    const canvas = document.createElement('canvas');
    canvas.className = className;
    canvas.width = width;
    canvas.height = height;
    container.appendChild(canvas);
    return canvas;
  }

  function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function vibrate(duration) {
    if (IS_MOBILE && window.navigator.vibrate)
      window.navigator.vibrate(duration);
  }

  // ---------- Collision (axis-aligned boxes) ----------
  function CollisionBox(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }

  function createAdjustedCollisionBox(box, adjustment) {
    return new CollisionBox(
      box.x + adjustment.x,
      box.y + adjustment.y,
      box.width,
      box.height
    );
  }

  function getBoxCompare(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  function checkForCollision(obstacle, tRex, opt_canvasCtx) {
    const obBox = obstacle.collisionBoxes;
    const tRexBox = tRex.collisionBoxes;

    // Collision boxes are defined relative to each sprite; adjust to world coords here.
    const tRexX = tRex.xPos;
    const tRexY = tRex.yPos;
    const obstacleX = obstacle.xPos;
    const obstacleY = obstacle.yPos;

    for (let i = 0; i < tRexBox.length; i++) {
      for (let j = 0; j < obBox.length; j++) {
        const adjTrexBox = createAdjustedCollisionBox(tRexBox[i], {
          x: tRexX,
          y: tRexY,
        });
        const adjObsBox = createAdjustedCollisionBox(obBox[j], {
          x: obstacleX,
          y: obstacleY,
        });

        if (getBoxCompare(adjTrexBox, adjObsBox)) {
          if (opt_canvasCtx) {
            // Debug draw
            opt_canvasCtx.save();
            opt_canvasCtx.strokeStyle = 'rgba(255,0,0,.35)';
            opt_canvasCtx.strokeRect(
              adjTrexBox.x,
              adjTrexBox.y,
              adjTrexBox.width,
              adjTrexBox.height
            );
            opt_canvasCtx.strokeRect(
              adjObsBox.x,
              adjObsBox.y,
              adjObsBox.width,
              adjObsBox.height
            );
            opt_canvasCtx.restore();
          }
          return [adjTrexBox, adjObsBox];
        }
      }
    }
    return false;
  }

  // ---------- Runner (game loop + input) ----------
  function Runner(outerContainerSelector, opt_config) {
    if (Runner.instance_) return Runner.instance_;
    Runner.instance_ = this;

    this.outerContainerEl = document.querySelector(outerContainerSelector);
    this.config = opt_config || Runner.config;
    this.dimensions = Runner.defaultDimensions;
    this.canvas = null;
    this.canvasCtx = null;
    this.tRex = null;
    this.distanceMeter = null;
    this.distanceRan = 0;
    this.time = 0;
    this.runningTime = 0;
    this.currentSpeed = this.config.SPEED;
    // Obstacles are managed by `Horizon`; keep runner state minimal.
    this.started = false;
    this.activated = false;
    this.crashed = false;
    this.finished = false;
    this.finishing = false;
    this.finishRollStart = 0;
    this.finishCrossed = false;
    this.paused = false;
    this.resizeTimerId_ = null;
    this.playCount = 0;

    this.spriteDef = null;

    this.loadImages();
  }

  Runner.config = {
    ACCELERATION: 0.001,
    BG_CLOUD_SPEED: 0.2,
    BOTTOM_PAD: 10,
    CLEAR_TIME: 3000,
    CLOUD_FREQUENCY: 0.5,
    GAMEOVER_CLEAR_TIME: 750,
    GAP_COEFFICIENT: 0.6,
    GRAVITY: 0.6,
    INITIAL_JUMP_VELOCITY: 12,
    // Night mode is disabled in this project (we keep the day palette).
    INVERT_FADE_DURATION: 0,
    INVERT_DISTANCE: Infinity,
    MAX_CLOUDS: 6,
    MAX_OBSTACLE_LENGTH: 4,
    MAX_OBSTACLE_DUPLICATION: 2,
    MAX_SPEED: 13,
    MIN_JUMP_HEIGHT: 35,
    MOBILE_SPEED_COEFFICIENT: 1.2,
    SPEED: 6,
    SPEED_DROP_COEFFICIENT: 3,
  };

  Runner.defaultDimensions = { WIDTH: DEFAULT_WIDTH, HEIGHT: 150 };

  Runner.spriteDefinition = {
    LDPI: {
      CACTUS_LARGE: { x: 332, y: 2 },
      CACTUS_SMALL: { x: 228, y: 2 },
      CLOUD: { x: 86, y: 2 },
      HORIZON: { x: 2, y: 54 },
      MOON: { x: 484, y: 2 },
      PTERODACTYL: { x: 134, y: 2 },
      RESTART: { x: 2, y: 2 },
      TEXT_SPRITE: { x: 655, y: 2 },
      TREX: { x: 848, y: 2 },
      STAR: { x: 645, y: 2 },
    },
    HDPI: {
      CACTUS_LARGE: { x: 652, y: 2 },
      CACTUS_SMALL: { x: 446, y: 2 },
      CLOUD: { x: 166, y: 2 },
      HORIZON: { x: 2, y: 104 },
      MOON: { x: 954, y: 2 },
      PTERODACTYL: { x: 260, y: 2 },
      RESTART: { x: 2, y: 2 },
      TEXT_SPRITE: { x: 1294, y: 2 },
      TREX: { x: 1678, y: 2 },
      STAR: { x: 1276, y: 2 },
    },
  };

  Runner.keycodes = {
    JUMP: { 38: 1, 32: 1 }, // Up, Space
    DUCK: { 40: 1 }, // Down
    RESTART: { 13: 1 }, // Enter
  };

  Runner.events = {
    KEYDOWN: 'keydown',
    KEYUP: 'keyup',
    MOUSEDOWN: 'mousedown',
    MOUSEUP: 'mouseup',
    TOUCHEND: 'touchend',
    TOUCHSTART: 'touchstart',
    RESIZE: 'resize',
    VISIBILITY: 'visibilitychange',
    BLUR: 'blur',
    FOCUS: 'focus',
    LOAD: 'load',
  };

  Runner.updateCanvasScaling = function (canvas, opt_width, opt_height) {
    const context = canvas.getContext('2d');
    const devicePixelRatio = window.devicePixelRatio || 1;
    const backingStoreRatio =
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio ||
      1;
    const ratio = devicePixelRatio / backingStoreRatio;

    if (devicePixelRatio !== backingStoreRatio) {
      const oldWidth = opt_width || canvas.width;
      const oldHeight = opt_height || canvas.height;

      canvas.width = oldWidth * ratio;
      canvas.height = oldHeight * ratio;
      canvas.style.width = oldWidth + 'px';
      canvas.style.height = oldHeight + 'px';
      context.scale(ratio, ratio);
    } else if (opt_width && opt_height) {
      canvas.style.width = opt_width + 'px';
      canvas.style.height = opt_height + 'px';
    }
  };

  Runner.prototype = {
    loadImages: function () {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.id = IS_HIDPI ? 'offline-resources-2x' : 'offline-resources-1x';
      img.src = IS_HIDPI ? SPRITE_2X : SPRITE_1X;
      Runner.imageSprite = img;
      this.spriteDef = IS_HIDPI
        ? Runner.spriteDefinition.HDPI
        : Runner.spriteDefinition.LDPI;

      img.addEventListener(Runner.events.LOAD, () => this.init());
      // Append hidden so browser keeps it alive.
      img.style.display = 'none';
      this.outerContainerEl.appendChild(img);
    },

    init: function () {
      this.injectStyles_();
      this.adjustDimensions();
      this.setSpeed();

      this.containerEl = document.createElement('div');
      this.containerEl.className = 'runner-container';
      this.outerContainerEl.replaceChildren(this.containerEl);

      const title = document.createElement('h2');
      title.className = 'dino-title';
      title.textContent = 'Google динозавр';
      this.containerEl.appendChild(title);

      this.canvas = createCanvas(
        this.containerEl,
        this.dimensions.WIDTH,
        this.dimensions.HEIGHT,
        'runner-canvas'
      );
      this.canvasCtx = this.canvas.getContext('2d');
      this.canvasCtx.clearRect(
        0,
        0,
        this.dimensions.WIDTH,
        this.dimensions.HEIGHT
      );
      Runner.updateCanvasScaling(this.canvas);

      this.horizon = new Horizon(
        this.canvas,
        this.spriteDef,
        this.dimensions,
        this.config.GAP_COEFFICIENT
      );
      this.distanceMeter = new DistanceMeter(
        this.canvas,
        this.spriteDef.TEXT_SPRITE,
        this.dimensions.WIDTH
      );
      this.tRex = new Trex(this.canvas, this.spriteDef.TREX);
      this.gameOverPanel = new GameOverPanel(
        this.canvas,
        this.spriteDef.TEXT_SPRITE,
        this.spriteDef.RESTART,
        this.dimensions
      );

      // Status label (replaces meter on Game Over / Finish).
      this.statusEl = document.createElement('div');
      this.statusEl.className = 'dino-status';
      this.statusEl.hidden = true;
      this.statusEl.textContent = '';
      this.containerEl.appendChild(this.statusEl);

      const divider = document.createElement('div');
      divider.className = 'dino-divider';
      this.containerEl.appendChild(divider);

      this.startListening();
      this.update();
    },

    injectStyles_: function () {
      const styleId = 'google-dino-style';
      if (document.getElementById(styleId)) return;
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@400&display=swap');
        #${ROOT_ID}{ display:block; }
        #${ROOT_ID} .runner-container{
          width:min(760px,100%);
          margin: 0 auto;
          padding: 0;
          background: transparent;
          position: relative;
        }
        #${ROOT_ID} .dino-title{
          margin: 36px 0 36px;
          color: #000;
          font-family: "Montserrat Alternates", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          text-align: center;
        }
        #${ROOT_ID} .runner-canvas{
          display:block;
          width:100%;
          max-width:${DEFAULT_WIDTH}px;
          margin: 0 auto;
          background:transparent;
          image-rendering: pixelated;
          image-rendering: crisp-edges;
          border-radius: 0;
        }
        #${ROOT_ID} .dino-divider{
          width: 536px;
          height: 0;
          border-top: 1px solid #000;
          margin: 36px auto 0;
        }
        #${ROOT_ID} .dino-status{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -78%);
          z-index: 2;
          padding: 10px 14px;
          border-radius: 12px;
          background: rgba(247,247,247,.96);
          color: #535353;
          font: 900 14px/1.05 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          letter-spacing: .08em;
          text-transform: uppercase;
          user-select: none;
          pointer-events: none;
        }
      `.trim();
      document.head.appendChild(style);
    },

    adjustDimensions: function () {
      const width = Math.min(
        DEFAULT_WIDTH,
        this.outerContainerEl.clientWidth || DEFAULT_WIDTH
      );
      this.dimensions.WIDTH = width;
      this.dimensions.HEIGHT = Runner.defaultDimensions.HEIGHT;
    },

    setSpeed: function (opt_speed) {
      const speed = opt_speed || this.currentSpeed;
      if (this.dimensions.WIDTH < DEFAULT_WIDTH) {
        const mobileSpeed =
          ((speed * this.dimensions.WIDTH) / DEFAULT_WIDTH) *
          this.config.MOBILE_SPEED_COEFFICIENT;
        this.currentSpeed = mobileSpeed > speed ? speed : mobileSpeed;
      } else if (opt_speed) {
        this.currentSpeed = opt_speed;
      }
    },

    startGame: function () {
      if (this.activated) return;
      this.activated = true;
      this.tRex.startJump(this.currentSpeed);
    },

    clearCanvas: function () {
      this.canvasCtx.clearRect(
        0,
        0,
        this.dimensions.WIDTH,
        this.dimensions.HEIGHT
      );
    },

    isRunning: function () {
      return !!this.activated && !this.crashed;
    },

    update: function () {
      if (this.paused) {
        requestAnimationFrame(this.update.bind(this));
        return;
      }

      const now = getTimeStamp();
      const deltaTime = now - (this.time || now);
      this.time = now;

      this.clearCanvas();

      // WAITING: render a static scene until the user clicks inside this section.
      // Trex is visible and can blink, but the world must not scroll or spawn obstacles.
      if (!this.started && !this.activated && !this.crashed) {
        this.horizon.horizonLine.draw();
        this.distanceMeter.draw(0, 0);
        // Ensure Trex is visible immediately (not only on blink frames).
        this.tRex.draw(0, 0);
        this.tRex.update(deltaTime, Trex.status.WAITING);
        if (this.statusEl) this.statusEl.hidden = true;
        requestAnimationFrame(this.update.bind(this));
        return;
      }

      const distanceMeters = Math.floor(this.distanceRan / 100);
      // FINISH LOGIC
      // - Stop spawning obstacles near the end.
      // - Cap the meter at the finish value.
      // - If finish is crossed mid-jump, allow the T-Rex to land first.
      const FINISH_AT = 10000;
      const STOP_SPAWN_AT = 9900;
      const approachingFinish = distanceMeters >= STOP_SPAWN_AT;
      const canSpawnObstacles =
        !approachingFinish && !this.finishing && !this.finished;

      // Mark the finish as crossed as soon as the meter reaches the target.
      if (!this.finishCrossed && distanceMeters >= FINISH_AT) {
        this.finishCrossed = true;
      }

      const cappedDistanceRan = Math.min(this.distanceRan, FINISH_AT * 100);
      const cappedDistanceMeters = Math.floor(cappedDistanceRan / 100);

      // Start the final “roll” only after the T-Rex is on the ground.
      const trexOnGround =
        !this.tRex.jumping && this.tRex.yPos === this.tRex.groundYPos;
      if (
        this.finishCrossed &&
        !this.finishing &&
        !this.finished &&
        trexOnGround
      ) {
        this.finishing = true;
        this.finishTarget = FINISH_AT;
        this.finishRollStart = now;
        this.horizon.obstacles = [];
      }

      if (this.finishing) {
        // After reaching the finish, continue moving slowly for ~1 second for a “natural” stop.
        const rollMs = 1000;
        const elapsed = now - this.finishRollStart;
        const slowSpeed = 1.2;

        this.horizon.update(deltaTime, slowSpeed, cappedDistanceMeters, false, {
          finishAt: FINISH_AT,
          stopSpawnAt: STOP_SPAWN_AT,
        });
        this.tRex.update(
          deltaTime,
          this.tRex.ducking ? Trex.status.DUCKING : Trex.status.RUNNING
        );
        this.distanceRan += slowSpeed * deltaTime;
        this.distanceMeter.update(
          deltaTime,
          Math.min(this.distanceRan, FINISH_AT * 100),
          true
        );

        if (elapsed >= rollMs) {
          this.finishing = false;
          this.finished = true;
          this.activated = false;
          this.tRex.ducking = false;
          this.tRex.snapToStartLine();
          this.tRex.update(0, Trex.status.WAITING);
        }

        if (this.statusEl) this.statusEl.hidden = true;
        requestAnimationFrame(this.update.bind(this));
        return;
      }

      if (this.finished) {
        this.horizon.horizonLine.draw();
        for (const c of this.horizon.clouds) c.draw();
        this.tRex.draw(Trex.animFrames[Trex.status.WAITING].frames[0], 0);
        if (this.statusEl) {
          this.statusEl.textContent = 'FINISH — YOU WIN';
          this.statusEl.hidden = false;
        }
        requestAnimationFrame(this.update.bind(this));
        return;
      }

      // Freeze everything on crash until restart.
      if (this.crashed) {
        // CRASHED: draw a stable frame (no movement/spawns) and show restart icon.
        this.horizon.horizonLine.draw();
        for (const c of this.horizon.clouds) c.draw();
        for (const o of this.horizon.obstacles) o.draw();
        // Keep the top meter visible on Game Over.
        this.distanceMeter.update(deltaTime, this.distanceRan, true);
        this.tRex.draw(Trex.animFrames[Trex.status.CRASHED].frames[0], 0);
        // Show only restart icon (no GAME OVER text).
        this.gameOverPanel.draw();
        if (this.statusEl) this.statusEl.hidden = true;
        requestAnimationFrame(this.update.bind(this));
        return;
      }
      if (this.statusEl) this.statusEl.hidden = true;

      if (this.isRunning()) {
        this.runningTime += deltaTime;
        // Accelerate a bit more noticeably after the run starts.
        this.currentSpeed += this.config.ACCELERATION * 1.6;
        if (this.currentSpeed > this.config.MAX_SPEED)
          this.currentSpeed = this.config.MAX_SPEED;

        const hasCollision = this.horizon.update(
          deltaTime,
          this.currentSpeed,
          cappedDistanceMeters,
          canSpawnObstacles,
          {
            finishAt: FINISH_AT,
            stopSpawnAt: STOP_SPAWN_AT,
          }
        );
        this.distanceRan += this.currentSpeed * deltaTime;
        this.distanceMeter.update(
          deltaTime,
          Math.min(this.distanceRan, FINISH_AT * 100),
          this.activated
        );

        if (hasCollision) {
          const collision = checkForCollision(hasCollision, this.tRex);
          if (collision) this.gameOver();
        }

        // IMPORTANT: while jumping, Trex should NOT run-run animation frames.
        if (this.tRex.jumping)
          this.tRex.updateJump(deltaTime, this.currentSpeed);
        else
          this.tRex.update(
            deltaTime,
            this.tRex.ducking ? Trex.status.DUCKING : Trex.status.RUNNING
          );
      } else {
        // Waiting/blink when not activated.
        this.tRex.update(
          deltaTime,
          this.activated ? Trex.status.RUNNING : Trex.status.WAITING
        );
        this.horizon.update(
          deltaTime,
          this.currentSpeed,
          cappedDistanceMeters,
          canSpawnObstacles,
          {
            finishAt: FINISH_AT,
            stopSpawnAt: STOP_SPAWN_AT,
          }
        );
        this.distanceMeter.update(
          deltaTime,
          Math.min(this.distanceRan, FINISH_AT * 100),
          this.activated
        );
      }

      if (this.crashed) this.gameOverPanel.draw();

      requestAnimationFrame(this.update.bind(this));
    },

    gameOver: function () {
      if (this.crashed) return;
      this.crashed = true;
      this.activated = false;
      this.currentSpeed = this.config.SPEED;
      vibrate(200);
      this.tRex.ducking = false;
      this.tRex.snapToStartLine();
      this.tRex.update(0, Trex.status.CRASHED);
    },

    restart: function () {
      this.distanceRan = 0;
      this.time = 0;
      this.runningTime = 0;
      this.crashed = false;
      this.finished = false;
      this.finishing = false;
      this.finishTarget = 0;
      this.finishRollStart = 0;
      this.finishCrossed = false;
      this.inverted = false;
      this.invertTimer = 0;
      this.currentSpeed = this.config.SPEED;
      this.horizon.reset();
      this.tRex.reset();
      this.distanceMeter.reset();
      if (this.statusEl) this.statusEl.hidden = true;
      this.playCount++;
    },

    startListening: function () {
      this.onKeyDown = this.handleEvent.bind(this);
      this.onKeyUp = this.handleEvent.bind(this);
      this.onTouchStart = this.handleEvent.bind(this);
      this.onTouchEnd = this.handleEvent.bind(this);
      this.onMouseDown = this.handleEvent.bind(this);
      this.onMouseUp = this.handleEvent.bind(this);
      this.onResize = this.handleEvent.bind(this);
      this.onVisibilityChange = this.handleEvent.bind(this);
      this.onBlur = this.handleEvent.bind(this);
      this.onFocus = this.handleEvent.bind(this);

      // Keyboard: only works after the game was started by clicking this section.
      window.addEventListener(Runner.events.KEYDOWN, this.onKeyDown);
      window.addEventListener(Runner.events.KEYUP, this.onKeyUp);
      if (IS_TOUCH_ENABLED) {
        this.outerContainerEl.addEventListener(
          Runner.events.TOUCHSTART,
          this.onTouchStart,
          { passive: false }
        );
        this.outerContainerEl.addEventListener(
          Runner.events.TOUCHEND,
          this.onTouchEnd
        );
      } else {
        this.outerContainerEl.addEventListener(
          Runner.events.MOUSEDOWN,
          this.onMouseDown
        );
        this.outerContainerEl.addEventListener(
          Runner.events.MOUSEUP,
          this.onMouseUp
        );
      }
      window.addEventListener(Runner.events.RESIZE, this.onResize);
      document.addEventListener(
        Runner.events.VISIBILITY,
        this.onVisibilityChange
      );
      window.addEventListener(Runner.events.BLUR, this.onBlur);
      window.addEventListener(Runner.events.FOCUS, this.onFocus);
    },

    handleEvent: function (e) {
      switch (e.type) {
        case Runner.events.KEYDOWN:
          this.onKeyDown_(e);
          break;
        case Runner.events.KEYUP:
          this.onKeyUp_(e);
          break;
        case Runner.events.TOUCHSTART:
        case Runner.events.MOUSEDOWN:
          this.onPointerDown_(e);
          break;
        case Runner.events.TOUCHEND:
        case Runner.events.MOUSEUP:
          this.onPointerUp_(e);
          break;
        case Runner.events.RESIZE:
          this.onResize_();
          break;
        case Runner.events.VISIBILITY:
          if (document.hidden) this.paused = true;
          else this.paused = false;
          break;
        case Runner.events.BLUR:
          this.paused = true;
          break;
        case Runner.events.FOCUS:
          this.paused = false;
          break;
      }
    },

    onKeyDown_: function (e) {
      // Don't start the game from keyboard globally — only after click/tap in this section.
      if (!this.started) return;

      // After crash or finish: same keys as the original restart (space / up / down) + Enter.
      if (this.crashed || this.finished) {
        if (
          Runner.keycodes.RESTART[e.keyCode] ||
          Runner.keycodes.JUMP[e.keyCode] ||
          Runner.keycodes.DUCK[e.keyCode]
        ) {
          e.preventDefault();
          this.restart();
        }
        return;
      }

      if (Runner.keycodes.JUMP[e.keyCode]) {
        e.preventDefault();
        if (this.isRunning()) this.tRex.startJump(this.currentSpeed);
      } else if (Runner.keycodes.DUCK[e.keyCode]) {
        e.preventDefault();
        if (this.tRex.jumping) this.tRex.setSpeedDrop();
        else this.tRex.setDuck(true);
      }
    },

    onKeyUp_: function (e) {
      if (this.crashed || this.finished) return;
      if (Runner.keycodes.DUCK[e.keyCode]) {
        e.preventDefault();
        this.tRex.setDuck(false);
      }
    },

    onPointerDown_: function (e) {
      if (e.cancelable) e.preventDefault();
      this.started = true;
      if (this.crashed) this.restart();
      else if (this.finished) this.restart();
      else if (!this.isRunning()) this.startGame();
      else this.tRex.startJump(this.currentSpeed);
    },

    onPointerUp_: function () {},

    onResize_: function () {
      clearTimeout(this.resizeTimerId_);
      this.resizeTimerId_ = setTimeout(() => {
        const oldW = this.dimensions.WIDTH;
        this.adjustDimensions();
        if (this.dimensions.WIDTH !== oldW) {
          this.canvas.width = this.dimensions.WIDTH;
          this.canvas.height = this.dimensions.HEIGHT;
          Runner.updateCanvasScaling(
            this.canvas,
            this.dimensions.WIDTH,
            this.dimensions.HEIGHT
          );
          this.horizon.resize(this.dimensions.WIDTH, this.dimensions.HEIGHT);
          this.distanceMeter.resize(this.dimensions.WIDTH);
        }
      }, 250);
    },
  };

  // ---------- Trex ----------
  function Trex(canvas, spritePos) {
    this.canvas = canvas;
    this.canvasCtx = canvas.getContext('2d');
    this.spritePos = spritePos;
    this.xPos = 0;
    this.yPos = 0;
    this.groundYPos = 0;
    this.currentFrame = 0;
    this.currentAnimFrames = [];
    this.blinkDelay = 0;
    this.blinkCount = 0;
    this.animStartTime = 0;
    this.timer = 0;
    this.msPerFrame = 1000 / FPS;
    this.config = Trex.config;
    this.status = Trex.status.WAITING;
    this.jumping = false;
    this.ducking = false;
    this.jumpVelocity = 0;
    this.reachedMinHeight = false;
    this.speedDrop = false;
    this.jumpCount = 0;
    this.jumpspotX = 0;
    this.playingIntro = false;
    this.init();
  }

  Trex.config = {
    // Slightly snappier jump/fall than upstream (per project requirement).
    // Faster jump + fall, but keep ORIGINAL jump height:
    // Use v*=k and g*=k^2 so height stays ~same while time shrinks (k≈2).
    // Make jump time another 1.5x slower (keep height ~same).
    // k=2/3 again: v*=2/3, g*=4/9.
    DROP_VELOCITY: -4.47,
    GRAVITY: 0.48,
    HEIGHT: 47,
    HEIGHT_DUCK: 25,
    INIITAL_JUMP_VELOCITY: -8.87,
    INTRO_DURATION: 1500,
    MAX_JUMP_HEIGHT: 30,
    MIN_JUMP_HEIGHT: 30,
    SPEED_DROP_COEFFICIENT: 4,
    SPRITE_WIDTH: 262,
    START_X_POS: 50,
    WIDTH: 44,
    WIDTH_DUCK: 59,
  };

  Trex.collisionBoxes = {
    DUCKING: [new CollisionBox(1, 18, 55, 25)],
    RUNNING: [
      new CollisionBox(22, 0, 17, 16),
      new CollisionBox(1, 18, 30, 9),
      new CollisionBox(10, 35, 14, 8),
      new CollisionBox(1, 24, 29, 5),
      new CollisionBox(5, 30, 21, 4),
      new CollisionBox(9, 34, 15, 4),
    ],
  };

  Trex.status = {
    CRASHED: 'CRASHED',
    DUCKING: 'DUCKING',
    JUMPING: 'JUMPING',
    RUNNING: 'RUNNING',
    WAITING: 'WAITING',
  };

  Trex.BLINK_TIMING = 7000;

  Trex.animFrames = {
    WAITING: { frames: [44, 0], msPerFrame: 1000 / 3 },
    // 2-frame run cycle: switch 6 times/sec => each leg lifts ~3 times/sec.
    RUNNING: { frames: [88, 132], msPerFrame: 1000 / 6 },
    CRASHED: { frames: [220], msPerFrame: 1000 / 60 },
    JUMPING: { frames: [0], msPerFrame: 1000 / 60 },
    DUCKING: { frames: [262, 321], msPerFrame: 1000 / 8 },
  };

  Trex.prototype = {
    init: function () {
      this.blinkDelay = this.setBlinkDelay();
      this.groundYPos =
        Runner.defaultDimensions.HEIGHT -
        this.config.HEIGHT -
        Runner.config.BOTTOM_PAD;
      this.yPos = this.groundYPos;
      // Fix: ensure Trex is visible immediately (same as original).
      this.xPos = this.config.START_X_POS;
      this.minJumpHeight = this.groundYPos - this.config.MIN_JUMP_HEIGHT;
      this.draw(0, 0);
      this.update(0, Trex.status.WAITING);
    },

    setBlinkDelay: function () {
      this.blinkDelay = Math.ceil(Math.random() * Trex.BLINK_TIMING);
      return this.blinkDelay;
    },

    update: function (deltaTime, opt_status) {
      this.timer += deltaTime;

      if (opt_status) {
        this.status = opt_status;
        this.currentFrame = 0;
        this.msPerFrame = Trex.animFrames[opt_status].msPerFrame;
        this.currentAnimFrames = Trex.animFrames[opt_status].frames;

        if (opt_status === Trex.status.WAITING) {
          this.animStartTime = getTimeStamp();
          this.setBlinkDelay();
        }
      }

      if (this.status === Trex.status.WAITING) {
        this.blink(getTimeStamp());
      } else {
        this.draw(this.currentAnimFrames[this.currentFrame], 0);
      }

      if (this.timer >= this.msPerFrame) {
        this.currentFrame =
          this.currentFrame === this.currentAnimFrames.length - 1
            ? 0
            : this.currentFrame + 1;
        this.timer = 0;
      }

      if (this.speedDrop && this.yPos === this.groundYPos) {
        this.speedDrop = false;
        this.setDuck(true);
      }
    },

    draw: function (x, y) {
      let sourceX = x;
      let sourceY = y;
      let sourceWidth =
        this.ducking && this.status !== Trex.status.CRASHED
          ? this.config.WIDTH_DUCK
          : this.config.WIDTH;
      let sourceHeight = this.config.HEIGHT;

      if (IS_HIDPI) {
        sourceX *= 2;
        sourceY *= 2;
        sourceWidth *= 2;
        sourceHeight *= 2;
      }

      sourceX += this.spritePos.x;
      sourceY += this.spritePos.y;

      if (this.ducking && this.status !== Trex.status.CRASHED) {
        this.canvasCtx.drawImage(
          Runner.imageSprite,
          sourceX,
          sourceY,
          sourceWidth,
          sourceHeight,
          this.xPos,
          this.yPos,
          this.config.WIDTH_DUCK,
          this.config.HEIGHT
        );
      } else {
        this.canvasCtx.drawImage(
          Runner.imageSprite,
          sourceX,
          sourceY,
          sourceWidth,
          sourceHeight,
          this.xPos,
          this.yPos,
          this.config.WIDTH,
          this.config.HEIGHT
        );
      }
    },

    blink: function (time) {
      const deltaTime = time - this.animStartTime;
      if (deltaTime >= this.blinkDelay) {
        this.draw(this.currentAnimFrames[this.currentFrame], 0);
        if (this.currentFrame === 1) {
          this.setBlinkDelay();
          this.animStartTime = time;
        }
      }
    },

    startJump: function (speed) {
      if (!this.jumping) {
        this.update(0, Trex.status.JUMPING);
        this.jumpVelocity = this.config.INIITAL_JUMP_VELOCITY - speed / 10;
        this.jumping = true;
        this.reachedMinHeight = false;
        this.speedDrop = false;
      }
    },

    endJump: function () {
      if (
        this.reachedMinHeight &&
        this.jumpVelocity < this.config.DROP_VELOCITY
      ) {
        this.jumpVelocity = this.config.DROP_VELOCITY;
      }
    },

    updateJump: function (deltaTime) {
      const msPerFrame = Trex.animFrames[this.status].msPerFrame;
      const framesElapsed = deltaTime / msPerFrame;

      if (this.speedDrop) {
        this.yPos += Math.round(
          this.jumpVelocity * this.config.SPEED_DROP_COEFFICIENT * framesElapsed
        );
      } else {
        this.yPos += Math.round(this.jumpVelocity * framesElapsed);
      }

      this.jumpVelocity += this.config.GRAVITY * framesElapsed;

      if (this.yPos < this.minJumpHeight || this.speedDrop)
        this.reachedMinHeight = true;
      if (this.yPos < this.config.MAX_JUMP_HEIGHT || this.speedDrop)
        this.endJump();

      if (this.yPos > this.groundYPos) {
        this.landOnGround_();
        this.jumpCount++;
      }

      this.update(deltaTime);
    },

    setSpeedDrop: function () {
      this.speedDrop = true;
      this.jumpVelocity = 1;
    },

    setDuck: function (isDucking) {
      if (isDucking && this.status !== Trex.status.DUCKING) {
        this.update(0, Trex.status.DUCKING);
        this.ducking = true;
      } else if (!isDucking && this.status === Trex.status.DUCKING) {
        this.update(0, Trex.status.RUNNING);
        this.ducking = false;
      }
    },

    snapToStartLine: function () {
      this.xPos = this.config.START_X_POS;
      this.yPos = this.groundYPos;
      this.jumping = false;
      this.jumpVelocity = 0;
      this.speedDrop = false;
    },

    landOnGround_: function () {
      this.yPos = this.groundYPos;
      this.jumpVelocity = 0;
      this.jumping = false;
      this.ducking = false;
      this.update(0, Trex.status.RUNNING);
      this.speedDrop = false;
      this.jumpCount = 0;
    },

    reset: function () {
      this.snapToStartLine();
      this.ducking = false;
      this.update(0, Trex.status.RUNNING);
      this.jumpCount = 0;
    },
  };

  Object.defineProperty(Trex.prototype, 'collisionBoxes', {
    get: function () {
      return this.ducking
        ? Trex.collisionBoxes.DUCKING
        : Trex.collisionBoxes.RUNNING;
    },
  });

  // ---------- Horizon / Obstacles / Clouds ----------
  function Cloud(canvas, spritePos, containerWidth) {
    this.canvas = canvas;
    this.canvasCtx = canvas.getContext('2d');
    this.spritePos = spritePos;
    this.containerWidth = containerWidth;
    this.xPos = containerWidth;
    this.yPos = 0;
    this.cloudGap = 0;
    this.init();
  }

  Cloud.config = {
    HEIGHT: 14,
    MAX_CLOUD_GAP: 400,
    MAX_SKY_LEVEL: 30,
    MIN_CLOUD_GAP: 100,
    MIN_SKY_LEVEL: 71,
    WIDTH: 46,
  };

  Cloud.prototype = {
    init: function () {
      this.yPos = getRandomNum(
        Cloud.config.MAX_SKY_LEVEL,
        Cloud.config.MIN_SKY_LEVEL
      );
      this.cloudGap = getRandomNum(
        Cloud.config.MIN_CLOUD_GAP,
        Cloud.config.MAX_CLOUD_GAP
      );
      this.draw();
    },
    draw: function () {
      this.canvasCtx.drawImage(
        Runner.imageSprite,
        this.spritePos.x,
        this.spritePos.y,
        Cloud.config.WIDTH * (IS_HIDPI ? 2 : 1),
        Cloud.config.HEIGHT * (IS_HIDPI ? 2 : 1),
        this.xPos,
        this.yPos,
        Cloud.config.WIDTH,
        Cloud.config.HEIGHT
      );
    },
    update: function (speed) {
      this.xPos -= Math.ceil(speed);
      this.draw();
    },
    isVisible: function () {
      return this.xPos + Cloud.config.WIDTH > 0;
    },
  };

  function Obstacle(
    canvasCtx,
    type,
    spriteImgPos,
    dimensions,
    gapCoefficient,
    speed,
    distanceMeters,
    opt
  ) {
    this.canvasCtx = canvasCtx;
    this.typeConfig = type;
    this.spritePos = spriteImgPos;
    this.dimensions = dimensions;
    this.gapCoefficient = gapCoefficient;
    this.distanceMeters = distanceMeters || 0;
    this.xPos =
      opt && typeof opt.xPos === 'number' ? opt.xPos : dimensions.WIDTH;
    this.yPos = 0;
    this.width = 0;
    this.height = 0;
    this.gap = 0;
    this.gapOverride =
      opt && typeof opt.gapOverride === 'number' ? opt.gapOverride : null;
    this.collisionBoxes = [];
    this.currentFrame = 0;
    this.timer = 0;
    this.init(speed);
  }

  Obstacle.MAX_GAP_COEFFICIENT = 1.85;
  Obstacle.MAX_OBSTACLE_LENGTH = 4;

  Obstacle.types = [
    {
      type: 'CACTUS_SMALL',
      width: 17,
      height: 35,
      yPos: 105,
      multipleSpeed: 4,
      // Cacti less frequent.
      minGap: 165,
      minSpeed: 0,
      collisionBoxes: [
        new CollisionBox(0, 7, 5, 27),
        new CollisionBox(4, 0, 6, 34),
        new CollisionBox(10, 4, 7, 14),
      ],
    },
    {
      type: 'CACTUS_LARGE',
      width: 25,
      height: 50,
      yPos: 90,
      multipleSpeed: 7,
      // Cacti less frequent.
      minGap: 175,
      minSpeed: 0,
      collisionBoxes: [
        new CollisionBox(0, 12, 7, 38),
        new CollisionBox(8, 0, 7, 49),
        new CollisionBox(16, 10, 9, 38),
      ],
    },
    {
      type: 'PTERODACTYL',
      width: 46,
      height: 40,
      yPos: [100, 75, 50],
      multipleSpeed: 999,
      minGap: 220,
      // Birds should appear later.
      minSpeed: 11.5,
      numFrames: 2,
      frameRate: 1000 / 6,
      speedOffset: 0.8,
      collisionBoxes: [
        new CollisionBox(15, 15, 16, 5),
        new CollisionBox(18, 21, 24, 6),
        new CollisionBox(2, 14, 4, 3),
        new CollisionBox(6, 10, 4, 7),
        new CollisionBox(10, 8, 6, 9),
      ],
    },
  ];

  Obstacle.prototype = {
    init: function (speed) {
      this.cloneCollisionBoxes();
      // Each Obstacle instance is a single sprite (grouping is handled in Horizon).
      this.width = this.typeConfig.width;
      this.height = this.typeConfig.height;

      if (Array.isArray(this.typeConfig.yPos)) {
        this.yPos =
          this.typeConfig.yPos[
            getRandomNum(0, this.typeConfig.yPos.length - 1)
          ];
      } else {
        this.yPos = this.typeConfig.yPos;
      }

      this.gap =
        this.gapOverride != null
          ? this.gapOverride
          : this.getGap(this.gapCoefficient, speed);
    },

    cloneCollisionBoxes: function () {
      const boxes = this.typeConfig.collisionBoxes;
      this.collisionBoxes = boxes.map(
        b => new CollisionBox(b.x, b.y, b.width, b.height)
      );
    },

    getGap: function (gapCoefficient, speed) {
      // Keep game passable at higher speeds: increase gaps as speed rises.
      const speedGapBoost = 1 + Math.max(0, (speed - 6) / 10);
      // After 500m, make cacti as rare as possible.
      const lateBoost = (this.distanceMeters || 0) >= 500 ? 2.2 : 1;
      const minGap = Math.round(
        (this.width * speed + this.typeConfig.minGap * gapCoefficient) *
          speedGapBoost *
          lateBoost
      );
      const maxGap = Math.round(minGap * Obstacle.MAX_GAP_COEFFICIENT);
      return getRandomNum(minGap, maxGap);
    },

    update: function (deltaTime, speed) {
      if (this.typeConfig.speedOffset) {
        speed += this.typeConfig.speedOffset;
      }
      this.xPos -= Math.floor(((speed * FPS) / 1000) * deltaTime);

      if (this.typeConfig.numFrames) {
        this.timer += deltaTime;
        if (this.timer >= this.typeConfig.frameRate) {
          this.currentFrame =
            this.currentFrame === this.typeConfig.numFrames - 1
              ? 0
              : this.currentFrame + 1;
          this.timer = 0;
        }
      }

      this.draw();
    },

    draw: function () {
      let sourceX = this.spritePos.x;
      const sourceY = this.spritePos.y;

      if (IS_HIDPI) sourceX *= 1; // spritePos already for chosen sheet

      const spriteWidth = this.typeConfig.width;
      if (this.currentFrame > 0)
        sourceX += spriteWidth * this.currentFrame * (IS_HIDPI ? 2 : 1);

      this.canvasCtx.drawImage(
        Runner.imageSprite,
        sourceX,
        sourceY,
        spriteWidth * (IS_HIDPI ? 2 : 1),
        this.typeConfig.height * (IS_HIDPI ? 2 : 1),
        this.xPos,
        this.yPos,
        spriteWidth,
        this.typeConfig.height
      );
    },

    isVisible: function () {
      return this.xPos + this.width > 0;
    },
  };

  function HorizonLine(canvas, spritePos) {
    this.canvas = canvas;
    this.canvasCtx = canvas.getContext('2d');
    this.spritePos = spritePos;
    this.dimensions = Runner.defaultDimensions;
    this.sourceDimensions = { WIDTH: 600, HEIGHT: 12, YPOS: 127 };
    this.xPos = [0, this.sourceDimensions.WIDTH];
    this.yPos = this.sourceDimensions.YPOS;
    this.bumpThreshold = 0.5;
    this.draw();
  }

  HorizonLine.prototype = {
    update: function (deltaTime, speed) {
      const increment = Math.floor(((speed * FPS) / 1000) * deltaTime);
      this.xPos[0] -= increment;
      this.xPos[1] -= increment;

      if (this.xPos[0] <= -this.sourceDimensions.WIDTH)
        this.xPos[0] = this.xPos[1] + this.sourceDimensions.WIDTH;
      if (this.xPos[1] <= -this.sourceDimensions.WIDTH)
        this.xPos[1] = this.xPos[0] + this.sourceDimensions.WIDTH;

      this.draw();
    },
    draw: function () {
      const sd = this.sourceDimensions;
      for (let i = 0; i < this.xPos.length; i++) {
        this.canvasCtx.drawImage(
          Runner.imageSprite,
          this.spritePos.x,
          this.spritePos.y,
          sd.WIDTH * (IS_HIDPI ? 2 : 1),
          sd.HEIGHT * (IS_HIDPI ? 2 : 1),
          this.xPos[i],
          this.yPos,
          sd.WIDTH,
          sd.HEIGHT
        );
      }
    },
  };

  function Horizon(canvas, spriteDef, dimensions, gapCoefficient) {
    this.canvas = canvas;
    this.canvasCtx = canvas.getContext('2d');
    this.spriteDef = spriteDef;
    this.dimensions = dimensions;
    this.gapCoefficient = gapCoefficient;
    this.clouds = [];
    this.obstacles = [];
    this.horizonLine = new HorizonLine(canvas, spriteDef.HORIZON);
    this.cloudFrequency = Runner.config.CLOUD_FREQUENCY;
  }

  Horizon.prototype = {
    update: function (
      deltaTime,
      speed,
      distanceMeters,
      canSpawnObstacles,
      opt_finish
    ) {
      this.horizonLine.update(deltaTime, speed);
      this.drawFinishFlag_(distanceMeters, opt_finish);
      this.updateClouds(deltaTime, speed);
      return this.updateObstacles(
        deltaTime,
        speed,
        distanceMeters,
        canSpawnObstacles
      );
    },

    updateClouds: function (deltaTime, speed) {
      const cloudSpeed = (Runner.config.BG_CLOUD_SPEED * speed) / 2;
      if (
        this.clouds.length < Runner.config.MAX_CLOUDS &&
        Math.random() < this.cloudFrequency
      ) {
        this.clouds.push(
          new Cloud(this.canvas, this.spriteDef.CLOUD, this.dimensions.WIDTH)
        );
      }
      for (let i = this.clouds.length - 1; i >= 0; i--) {
        this.clouds[i].update(cloudSpeed);
        if (!this.clouds[i].isVisible()) this.clouds.splice(i, 1);
      }
    },

    updateObstacles: function (
      deltaTime,
      speed,
      distanceMeters,
      canSpawnObstacles
    ) {
      if (this.obstacles.length > 0) {
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
          this.obstacles[i].update(deltaTime, speed);
          if (!this.obstacles[i].isVisible()) this.obstacles.splice(i, 1);
        }
      }

      if (
        canSpawnObstacles !== false &&
        (this.obstacles.length === 0 ||
          this.obstacles[this.obstacles.length - 1].xPos <
            this.dimensions.WIDTH -
              this.obstacles[this.obstacles.length - 1].gap)
      ) {
        this.addNewObstacle(speed, distanceMeters);
      }

      return this.obstacles.length ? this.obstacles[0] : false;
    },

    addNewObstacle: function (speed, distanceMeters) {
      const dm = distanceMeters || 0;

      // Helper: compute the gap for a whole cactus group so the game stays passable at high speeds.
      const calcGroupGap = (groupWidth, minGapBase) => {
        // Proportional to speed, but don't make early-game gaps too huge.
        const speedGapBoost = 0.85 + Math.max(0, (speed - 6) / 11); // grows with speed
        const lateBoost = dm >= 5000 ? 1.9 : dm >= 1000 ? 1.35 : 1;
        // Slightly larger gaps at the very beginning.
        // Beginning: 1.5x larger cactus group spacing.
        const base = dm < 1000 ? 203 : dm < 5000 ? 150 : 210;
        const minGap = Math.round(
          (groupWidth * speed + (minGapBase || base) * this.gapCoefficient) *
            speedGapBoost *
            lateBoost
        );
        const maxGap = Math.round(minGap * Obstacle.MAX_GAP_COEFFICIENT);
        return getRandomNum(minGap, maxGap);
      };

      // Weighted pick: cacti common, birds more frequent after 1000m.
      const small = Obstacle.types[0];
      const large = Obstacle.types[1];
      const bird = Obstacle.types[2];
      const r = Math.random();
      const birdChance = dm >= 1000 ? (dm >= 3000 ? 0.28 : 0.2) : 0;
      const allowBird = dm >= 1000 && speed >= bird.minSpeed;

      if (allowBird && r < birdChance) {
        const spritePos = this.spriteDef[bird.type];
        this.obstacles.push(
          new Obstacle(
            this.canvasCtx,
            bird,
            spritePos,
            this.dimensions,
            this.gapCoefficient,
            speed,
            dm
          )
        );
        return;
      }

      // Spawn cactus group with mixed sizes (small/large mixed in the same group).
      let groupCount = 1;
      if (dm < 150) {
        groupCount = 1;
      } else if (dm < 500) {
        const p = Math.random();
        groupCount = p < 0.55 ? 1 : p < 0.83 ? 2 : 3;
      } else if (dm < 1000) {
        const p = Math.random();
        groupCount = p < 0.45 ? 1 : p < 0.72 ? 2 : p < 0.9 ? 3 : 4;
      } else {
        // After 1000m: mostly 3-4 cacti; 1-2 are very rare.
        const p = Math.random();
        groupCount = p < 0.02 ? 1 : p < 0.12 ? 2 : p < 0.6 ? 3 : 4;
      }

      // Cacti inside a group should be a bit closer.
      const internalGap = dm >= 1000 ? getRandomNum(2, 4) : getRandomNum(3, 6);
      let offsetX = 0;
      let groupWidth = 0;
      let minGapBase = 0;

      for (let i = 0; i < groupCount; i++) {
        const chooseLarge = Math.random() < 0.35;
        const cactusType = chooseLarge ? large : small;
        const spritePos = this.spriteDef[cactusType.type];
        const xPos = this.dimensions.WIDTH + offsetX;

        // Small internal spacing inside the group.
        const isLast = i === groupCount - 1;
        const gapOverride = isLast ? null : internalGap;

        this.obstacles.push(
          new Obstacle(
            this.canvasCtx,
            cactusType,
            spritePos,
            this.dimensions,
            this.gapCoefficient,
            speed,
            dm,
            {
              xPos,
              gapOverride,
            }
          )
        );

        groupWidth += cactusType.width;
        minGapBase = Math.max(minGapBase, cactusType.minGap || 0);
        offsetX += cactusType.width + internalGap;
      }

      // Apply the real "between groups" gap to the last cactus in the group.
      const last = this.obstacles[this.obstacles.length - 1];
      if (last) last.gap = calcGroupGap(groupWidth, minGapBase || 160);
    },

    reset: function () {
      this.obstacles = [];
      this.clouds = [];
      this.horizonLine.xPos = [0, this.horizonLine.sourceDimensions.WIDTH];
    },

    resize: function (width, height) {
      this.dimensions.WIDTH = width;
      this.dimensions.HEIGHT = height;
    },
  };

  Horizon.prototype.drawFinishFlag_ = function (distanceMeters, opt_finish) {
    if (!opt_finish || !opt_finish.finishAt) return;
    const finishAt = opt_finish.finishAt;
    const stopSpawnAt = opt_finish.stopSpawnAt || finishAt - 100;
    if (distanceMeters < stopSpawnAt) return;

    const ctx = this.canvasCtx;
    const w = this.dimensions.WIDTH;
    const flagW = Math.max(18, Math.round(w / 12));
    const poleH = 46;
    const poleW = 3;

    // Place flag near the right side of the horizon.
    const x = w - flagW - 18;
    const yBase = this.horizonLine.yPos + 4;
    const yTop = yBase - poleH;

    ctx.save();
    ctx.fillStyle = '#535353';

    // Pole
    ctx.fillRect(x, yTop, poleW, poleH);

    // Flag cloth (triangle)
    ctx.beginPath();
    ctx.moveTo(x + poleW, yTop + 6);
    ctx.lineTo(x + poleW + flagW, yTop + 16);
    ctx.lineTo(x + poleW, yTop + 26);
    ctx.closePath();
    ctx.fill();

    // Big "drop"/shadow under the flag.
    ctx.globalAlpha = 0.28;
    ctx.fillRect(x - 2, yBase + 2, poleW + flagW + 6, 6);
    ctx.globalAlpha = 1;
    ctx.restore();
  };

  // ---------- Distance meter ----------
  function DistanceMeter(canvas, spritePos, canvasWidth) {
    this.canvas = canvas;
    this.canvasCtx = canvas.getContext('2d');
    this.image = Runner.imageSprite;
    this.spritePos = spritePos;
    this.x = 0;
    this.y = 0;
    this.currentDistance = 0;
    this.maxScoreUnits = 5;
    this.digits = [];
    this.highScore = '0';
    this.init(canvasWidth);
  }

  DistanceMeter.config = { WIDTH: 10, HEIGHT: 13, DEST_WIDTH: 11 };

  DistanceMeter.prototype = {
    init: function (width) {
      this.x = width - this.maxScoreUnits * DistanceMeter.config.DEST_WIDTH - 2;
      this.y = 5;
      this.draw(0, 0);
    },

    draw: function (distance, highScore) {
      let sourceX = this.spritePos.x;
      let sourceY = this.spritePos.y;
      const width = DistanceMeter.config.WIDTH;
      const height = DistanceMeter.config.HEIGHT;

      if (IS_HIDPI) {
        sourceX *= 2;
        sourceY *= 2;
      }

      const scoreStr = String(distance).padStart(this.maxScoreUnits, '0');
      for (let i = 0; i < scoreStr.length; i++) {
        const n = Number(scoreStr[i]);
        this.canvasCtx.drawImage(
          this.image,
          sourceX + n * width * (IS_HIDPI ? 2 : 1),
          sourceY,
          width * (IS_HIDPI ? 2 : 1),
          height * (IS_HIDPI ? 2 : 1),
          this.x + i * DistanceMeter.config.DEST_WIDTH,
          this.y,
          width,
          height
        );
      }
    },

    update: function (deltaTime, distanceRan, isRunning) {
      if (!isRunning) {
        this.draw(0, 0);
        return;
      }
      this.currentDistance = Math.floor(distanceRan / 100);
      this.draw(this.currentDistance, 0);
    },

    reset: function () {
      this.currentDistance = 0;
    },

    resize: function (width) {
      this.x = width - this.maxScoreUnits * DistanceMeter.config.DEST_WIDTH - 2;
    },
  };

  // ---------- Game over ----------
  function GameOverPanel(canvas, textSpritePos, restartSpritePos, dimensions) {
    this.canvas = canvas;
    this.canvasCtx = canvas.getContext('2d');
    this.textSpritePos = textSpritePos;
    this.restartSpritePos = restartSpritePos;
    this.dimensions = dimensions;
    this.draw();
  }

  GameOverPanel.config = {
    TEXT_X: 0,
    TEXT_Y: 13,
    TEXT_WIDTH: 191,
    TEXT_HEIGHT: 11,
    RESTART_WIDTH: 36,
    RESTART_HEIGHT: 32,
  };

  GameOverPanel.prototype = {
    draw: function () {
      const ctx = this.canvasCtx;
      const cfg = GameOverPanel.config;
      const centerX = this.dimensions.WIDTH / 2;
      const restartX = (this.dimensions.WIDTH - cfg.RESTART_WIDTH) / 2;
      const restartY = this.dimensions.HEIGHT / 2;

      let textSourceX = this.textSpritePos.x;
      let textSourceY = this.textSpritePos.y;
      let restartSourceX = this.restartSpritePos.x;
      let restartSourceY = this.restartSpritePos.y;

      if (IS_HIDPI) {
        textSourceX *= 2;
        textSourceY *= 2;
        restartSourceX *= 2;
        restartSourceY *= 2;
      }

      ctx.drawImage(
        Runner.imageSprite,
        restartSourceX,
        restartSourceY,
        cfg.RESTART_WIDTH * (IS_HIDPI ? 2 : 1),
        cfg.RESTART_HEIGHT * (IS_HIDPI ? 2 : 1),
        restartX,
        restartY,
        cfg.RESTART_WIDTH,
        cfg.RESTART_HEIGHT
      );
    },
  };

  function mount() {
    const root = document.getElementById(ROOT_ID);
    if (!root) return;
    if (root.dataset.dinoMounted === '1') return;
    root.dataset.dinoMounted = '1';
    new Runner('#' + ROOT_ID);
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
})();
