System.register("chunks:///_virtual/AVGGame.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BranchMap.ts', './CharacterPresentation.ts', './GameState.ts', './StoryHistory.ts', './StoryEngine.ts', './StoryContent.ts'], function (exports) {
  var _inheritsLoose, _createForOfIteratorHelperLoose, cclegacy, _decorator, view, ResolutionPolicy, input, Input, Sprite, resources, SpriteFrame, Color, UIOpacity, Node, Label, sys, Tween, tween, Mask, Graphics, KeyCode, UITransform, Button, Component, findCurrentCheckpointId, createBranchTreeLayout, shouldShowCharacterPortrait, decodeSave, createGameState, encodeSave, mergeUnlockedProgress, getStoryUnlockPercentage, getUnlockedStoryHistory, getHistoryWindowStart, HISTORY_VISIBLE_ENTRY_COUNT, StoryEngine, STORY_NODES, CLUE_DETAILS, STORY_CHECKPOINTS, LOCKED_STORY_CHECKPOINT_LABEL;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      view = module.view;
      ResolutionPolicy = module.ResolutionPolicy;
      input = module.input;
      Input = module.Input;
      Sprite = module.Sprite;
      resources = module.resources;
      SpriteFrame = module.SpriteFrame;
      Color = module.Color;
      UIOpacity = module.UIOpacity;
      Node = module.Node;
      Label = module.Label;
      sys = module.sys;
      Tween = module.Tween;
      tween = module.tween;
      Mask = module.Mask;
      Graphics = module.Graphics;
      KeyCode = module.KeyCode;
      UITransform = module.UITransform;
      Button = module.Button;
      Component = module.Component;
    }, function (module) {
      findCurrentCheckpointId = module.findCurrentCheckpointId;
      createBranchTreeLayout = module.createBranchTreeLayout;
    }, function (module) {
      shouldShowCharacterPortrait = module.shouldShowCharacterPortrait;
    }, function (module) {
      decodeSave = module.decodeSave;
      createGameState = module.createGameState;
      encodeSave = module.encodeSave;
      mergeUnlockedProgress = module.mergeUnlockedProgress;
    }, function (module) {
      getStoryUnlockPercentage = module.getStoryUnlockPercentage;
      getUnlockedStoryHistory = module.getUnlockedStoryHistory;
      getHistoryWindowStart = module.getHistoryWindowStart;
      HISTORY_VISIBLE_ENTRY_COUNT = module.HISTORY_VISIBLE_ENTRY_COUNT;
    }, function (module) {
      StoryEngine = module.StoryEngine;
    }, function (module) {
      STORY_NODES = module.STORY_NODES;
      CLUE_DETAILS = module.CLUE_DETAILS;
      STORY_CHECKPOINTS = module.STORY_CHECKPOINTS;
      LOCKED_STORY_CHECKPOINT_LABEL = module.LOCKED_STORY_CHECKPOINT_LABEL;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "1f349UYQcZLk59Co7HLRi4B", "AVGGame", undefined);
      var ccclass = _decorator.ccclass;
      var AUTO_SAVE_KEY = 'spider-mountain:auto-save:v1';
      var LEGACY_MANUAL_SAVE_KEY = 'spider-mountain:manual-save:v1';
      var MANUAL_SAVE_KEYS = ['spider-mountain:manual-save:1:v1', 'spider-mountain:manual-save:2:v1', 'spider-mountain:manual-save:3:v1', 'spider-mountain:manual-save:4:v1', 'spider-mountain:manual-save:5:v1', 'spider-mountain:manual-save:6:v1'];
      var DESIGN_WIDTH = 1920;
      var DESIGN_HEIGHT = 1080;
      var AVGGame = exports('AVGGame', (_dec = ccclass('AVGGame'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AVGGame, _Component);
        function AVGGame() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.engine = new StoryEngine(STORY_NODES);
          _this.gameRoot = void 0;
          _this.titleRoot = void 0;
          _this.choicesRoot = void 0;
          _this.characterPortrait = void 0;
          _this.characterPortraitOpacity = void 0;
          _this.modalRoot = void 0;
          _this.endRoot = void 0;
          _this.speakerLabel = void 0;
          _this.dialogueLabel = void 0;
          _this.dialoguePanelBackground = void 0;
          _this.readIndicatorLabel = void 0;
          _this.chapterLabel = void 0;
          _this.deathLabel = void 0;
          _this.continueButton = void 0;
          _this.toastLabel = void 0;
          _this.currentFullText = '';
          _this.revealIndex = 0;
          _this.revealing = false;
          _this.isCharacterPortraitVisible = false;
          _this.revealStep = function () {
            return _this.revealNextCharacter();
          };
          _this.hideToast = function () {
            _this.toastLabel.node.active = false;
          };
          return _this;
        }
        var _proto = AVGGame.prototype;
        _proto.onLoad = function onLoad() {
          view.setDesignResolutionSize(DESIGN_WIDTH, DESIGN_HEIGHT, ResolutionPolicy.SHOW_ALL);
          this.migrateLegacyManualSave();
          this.buildInterface();
          this.showTitle();
          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        };
        _proto.onDestroy = function onDestroy() {
          input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          this.unschedule(this.revealStep);
        };
        _proto.buildInterface = function buildInterface() {
          this.createBackground();
          this.gameRoot = this.createNode('GameRoot', this.node, 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
          this.titleRoot = this.createNode('TitleRoot', this.node, 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
          this.modalRoot = this.createNode('ModalRoot', this.node, 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
          this.endRoot = this.createNode('EndRoot', this.node, 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
          this.buildGameScreen();
          this.buildTitleScreen();
          this.modalRoot.active = false;
          this.endRoot.active = false;
        };
        _proto.createBackground = function createBackground() {
          var _this2 = this;
          var background = this.createNode('ForestBackground', this.node, 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
          var sprite = background.addComponent(Sprite);
          sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          resources.load('images/camp-background/spriteFrame', SpriteFrame, function (error, frame) {
            if (error) {
              _this2.drawRect(background, new Color(20, 29, 27, 255));
              return;
            }
            sprite.spriteFrame = frame;
          });
          var veil = this.createNode('BackgroundVeil', this.node, 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
          this.drawRect(veil, new Color(7, 12, 14, 62));
        };
        _proto.buildTitleScreen = function buildTitleScreen() {
          var _this3 = this;
          var shade = this.createNode('TitleShade', this.titleRoot, 0, 0, 1080, DESIGN_HEIGHT);
          this.drawRect(shade, new Color(8, 13, 15, 205));
          this.createLabel('蜘蛛山之谜', this.titleRoot, 0, 225, 720, 120, 76, new Color(239, 237, 227), true);
          this.createLabel('SPIDER MOUNTAIN MYSTERY', this.titleRoot, 0, 140, 720, 40, 21, new Color(173, 192, 181));
          var rule = this.createNode('TitleRule', this.titleRoot, 0, 85, 520, 2);
          this.drawRect(rule, new Color(177, 49, 52));
          this.createButton('新游戏', this.titleRoot, 0, -35, 420, 70, function () {
            return _this3.startNewGame();
          });
          this.continueButton = this.createButton('继续游戏', this.titleRoot, 0, -125, 420, 70, function () {
            return _this3.continueGame();
          });
          this.createButton('读取存档', this.titleRoot, 0, -215, 420, 70, function () {
            return _this3.openLoadSlots();
          });
          this.createLabel('版本 0.1.0  ·  Cocos Creator 3.8.3', this.titleRoot, 0, -455, 720, 36, 18, new Color(160, 169, 164));
        };
        _proto.buildGameScreen = function buildGameScreen() {
          var _this4 = this;
          this.characterPortrait = this.createNode('XiaoyuePortrait', this.gameRoot, 0, -15, 320, 900);
          var portraitSprite = this.characterPortrait.addComponent(Sprite);
          portraitSprite.sizeMode = Sprite.SizeMode.CUSTOM;
          this.characterPortraitOpacity = this.characterPortrait.addComponent(UIOpacity);
          this.characterPortraitOpacity.opacity = 0;
          this.characterPortrait.active = false;
          resources.load('images/characters/xiaoyue/spriteFrame', SpriteFrame, function (error, frame) {
            if (!error) {
              portraitSprite.spriteFrame = frame;
            }
          });
          var topBar = this.createNode('TopBar', this.gameRoot, 0, 495, DESIGN_WIDTH, 90);
          this.drawRect(topBar, new Color(9, 15, 17, 220));
          this.createLabel('蜘蛛山之谜', topBar, -780, 0, 260, 54, 28, new Color(239, 237, 227), true);
          this.chapterLabel = this.createLabel('', topBar, -410, 0, 430, 54, 22, new Color(180, 198, 188));
          this.deathLabel = this.createLabel('', topBar, 80, 0, 190, 54, 21, new Color(216, 186, 167));
          this.createButton('历史', topBar, 250, 0, 130, 52, function () {
            return _this4.openHistory();
          }, true);
          this.createButton('分支图', topBar, 390, 0, 140, 52, function () {
            return _this4.openBranchMap();
          }, true);
          this.createButton('线索', topBar, 525, 0, 110, 52, function () {
            return _this4.openClues();
          }, true);
          this.createButton('保存', topBar, 645, 0, 110, 52, function () {
            return _this4.openSaveSlots();
          }, true);
          this.createButton('读取', topBar, 765, 0, 110, 52, function () {
            return _this4.openLoadSlots();
          }, true);
          this.createButton('主菜单', topBar, 890, 0, 120, 52, function () {
            return _this4.showTitle();
          }, true);
          this.choicesRoot = this.createNode('Choices', this.gameRoot, 0, 95, 1500, 520);
          var dialoguePanel = this.createNode('DialoguePanel', this.gameRoot, 0, -355, 1660, 330);
          this.dialoguePanelBackground = this.drawRoundedRect(dialoguePanel, new Color(9, 14, 17, 232), 8, new Color(107, 124, 116, 210));
          dialoguePanel.on(Node.EventType.TOUCH_END, function () {
            return _this4.advanceDialogue();
          });
          this.speakerLabel = this.createLabel('', dialoguePanel, -690, 112, 230, 58, 29, new Color(230, 199, 169), true);
          this.dialogueLabel = this.createLabel('', dialoguePanel, 0, -15, 1480, 205, 34, new Color(241, 240, 234));
          this.dialogueLabel.horizontalAlign = Label.HorizontalAlign.LEFT;
          this.dialogueLabel.verticalAlign = Label.VerticalAlign.TOP;
          this.dialogueLabel.lineHeight = 52;
          this.dialogueLabel.overflow = Label.Overflow.SHRINK;
          this.readIndicatorLabel = this.createLabel('★', dialoguePanel, 770, -128, 52, 52, 34, new Color(255, 255, 255), true);
          this.toastLabel = this.createLabel('', this.gameRoot, 0, 400, 720, 58, 22, new Color(250, 247, 235), true);
          this.toastLabel.node.active = false;
        };
        _proto.showTitle = function showTitle() {
          var _sys$localStorage$get;
          this.stopReveal();
          this.gameRoot.active = false;
          this.modalRoot.active = false;
          this.endRoot.active = false;
          this.titleRoot.active = true;
          this.setButtonEnabled(this.continueButton, decodeSave((_sys$localStorage$get = sys.localStorage.getItem(AUTO_SAVE_KEY)) != null ? _sys$localStorage$get : '') !== null);
        };
        _proto.startNewGame = function startNewGame() {
          var freshState = createGameState();
          sys.localStorage.setItem(AUTO_SAVE_KEY, encodeSave(freshState));
          this.engine = new StoryEngine(STORY_NODES, freshState);
          this.enterGame();
        };
        _proto.continueGame = function continueGame() {
          var _sys$localStorage$get2;
          var state = decodeSave((_sys$localStorage$get2 = sys.localStorage.getItem(AUTO_SAVE_KEY)) != null ? _sys$localStorage$get2 : '');
          if (!state || !STORY_NODES[state.nodeId]) {
            this.showToast('自动存档不可用');
            return;
          }
          this.engine = new StoryEngine(STORY_NODES, state);
          this.enterGame();
        };
        _proto.enterGame = function enterGame() {
          this.titleRoot.active = false;
          this.endRoot.active = false;
          this.modalRoot.active = false;
          this.gameRoot.active = true;
          this.saveAuto();
          this.renderCurrentNode();
        };
        _proto.renderCurrentNode = function renderCurrentNode() {
          var _node$speaker;
          var node = this.engine.getCurrentNode();
          var state = this.engine.getState();
          this.chapterLabel.string = node.chapter;
          this.deathLabel.string = "\u6B7B\u4EA1\u56DE\u6EAF  " + state.deathRewinds;
          this.clearChildren(this.choicesRoot);
          this.choicesRoot.active = node.type === 'choice';
          if (node.type === 'end') {
            this.showEnd(node);
            return;
          }
          this.styleDialoguePanel(node.speaker === '提示');
          this.updateCharacterPortrait(node);
          this.readIndicatorLabel.node.active = this.engine.hasRead(node.id);
          this.speakerLabel.string = (_node$speaker = node.speaker) != null ? _node$speaker : node.type === 'choice' ? '抉择' : '旁白';
          if (node.type === 'choice') {
            this.setDialogueImmediately(node.text);
            this.renderChoices();
          } else {
            this.startReveal(node.text);
          }
        };
        _proto.renderChoices = function renderChoices() {
          var _this5 = this;
          var choices = this.engine.getVisibleChoices();
          var compact = choices.length > 4;
          var buttonHeight = compact ? 62 : 82;
          var gap = compact ? 12 : 18;
          var totalHeight = choices.length * buttonHeight + Math.max(0, choices.length - 1) * gap;
          choices.forEach(function (choice, index) {
            var y = totalHeight / 2 - buttonHeight / 2 - index * (buttonHeight + gap);
            _this5.createButton(choice.text, _this5.choicesRoot, 0, y, 1220, buttonHeight, function () {
              _this5.engine.choose(choice.id);
              _this5.saveAuto();
              _this5.renderCurrentNode();
            }, compact);
          });
        };
        _proto.advanceDialogue = function advanceDialogue() {
          if (!this.gameRoot.active || this.modalRoot.active || this.endRoot.active) {
            return;
          }
          var node = this.engine.getCurrentNode();
          if (node.type !== 'line') {
            return;
          }
          if (this.revealing) {
            this.setDialogueImmediately(this.currentFullText);
            return;
          }
          this.engine.advance();
          this.saveAuto();
          this.renderCurrentNode();
        };
        _proto.startReveal = function startReveal(text) {
          this.stopReveal();
          this.currentFullText = text;
          this.revealIndex = 0;
          this.dialogueLabel.string = '';
          this.revealing = true;
          this.schedule(this.revealStep, 0.018);
        };
        _proto.revealNextCharacter = function revealNextCharacter() {
          this.revealIndex = Math.min(this.currentFullText.length, this.revealIndex + 1);
          this.dialogueLabel.string = this.currentFullText.slice(0, this.revealIndex);
          if (this.revealIndex >= this.currentFullText.length) {
            this.stopReveal();
          }
        };
        _proto.setDialogueImmediately = function setDialogueImmediately(text) {
          this.stopReveal();
          this.currentFullText = text;
          this.dialogueLabel.string = text;
        };
        _proto.stopReveal = function stopReveal() {
          this.unschedule(this.revealStep);
          this.revealing = false;
        };
        _proto.updateCharacterPortrait = function updateCharacterPortrait(node) {
          var _this6 = this;
          var shouldShow = shouldShowCharacterPortrait();
          if (shouldShow === this.isCharacterPortraitVisible) {
            return;
          }
          this.isCharacterPortraitVisible = shouldShow;
          Tween.stopAllByTarget(this.characterPortraitOpacity);
          tween(this.characterPortraitOpacity).to(0.16, {
            opacity: 0
          }).call(function () {
            if (!_this6.isCharacterPortraitVisible) {
              _this6.characterPortrait.active = false;
            }
          }).start();
        };
        _proto.saveAuto = function saveAuto() {
          var state = mergeUnlockedProgress(this.engine.getState(), this.getSaveState(AUTO_SAVE_KEY));
          this.engine = new StoryEngine(STORY_NODES, state);
          sys.localStorage.setItem(AUTO_SAVE_KEY, encodeSave(state));
        };
        _proto.migrateLegacyManualSave = function migrateLegacyManualSave() {
          var _sys$localStorage$get3;
          if (sys.localStorage.getItem(MANUAL_SAVE_KEYS[0])) {
            return;
          }
          var legacySave = (_sys$localStorage$get3 = sys.localStorage.getItem(LEGACY_MANUAL_SAVE_KEY)) != null ? _sys$localStorage$get3 : '';
          if (decodeSave(legacySave)) {
            sys.localStorage.setItem(MANUAL_SAVE_KEYS[0], legacySave);
          }
        };
        _proto.saveManualSlot = function saveManualSlot(slotIndex) {
          var state = this.engine.getState();
          state.updatedAt = Date.now();
          sys.localStorage.setItem(MANUAL_SAVE_KEYS[slotIndex], encodeSave(state));
          this.closeModal();
          this.showToast("\u5DF2\u4FDD\u5B58\u5230\u624B\u52A8\u5B58\u6863 " + (slotIndex + 1));
        };
        _proto.loadSaveSlot = function loadSaveSlot(key) {
          var state = this.getSaveState(key);
          if (!state || !STORY_NODES[state.nodeId]) {
            return;
          }
          var mergedState = mergeUnlockedProgress(state, this.getSaveState(AUTO_SAVE_KEY));
          mergedState.updatedAt = Date.now();
          this.engine = new StoryEngine(STORY_NODES, mergedState);
          this.closeModal();
          this.titleRoot.active = false;
          this.endRoot.active = false;
          this.gameRoot.active = true;
          this.saveAuto();
          this.renderCurrentNode();
          this.showToast('已读取');
        };
        _proto.getSaveState = function getSaveState(key) {
          var _sys$localStorage$get4;
          return decodeSave((_sys$localStorage$get4 = sys.localStorage.getItem(key)) != null ? _sys$localStorage$get4 : '');
        };
        _proto.openSaveSlots = function openSaveSlots() {
          var _this7 = this;
          var panel = this.buildSaveSlotModal('保存游戏');
          var autoPosition = this.getSaveSlotPosition(0);
          this.createSaveSlotCard(panel, '自动存档', AUTO_SAVE_KEY, autoPosition.x, autoPosition.y, false);
          MANUAL_SAVE_KEYS.forEach(function (key, index) {
            var position = _this7.getSaveSlotPosition(index + 1);
            _this7.createSaveSlotCard(panel, "\u624B\u52A8\u5B58\u6863 " + (index + 1), key, position.x, position.y, true, function () {
              _this7.saveManualSlot(index);
            }, true);
          });
        };
        _proto.openLoadSlots = function openLoadSlots() {
          var _this8 = this;
          var panel = this.buildSaveSlotModal('读取存档');
          var autoPosition = this.getSaveSlotPosition(0);
          this.createSaveSlotCard(panel, '自动存档', AUTO_SAVE_KEY, autoPosition.x, autoPosition.y, true, function () {
            return _this8.loadSaveSlot(AUTO_SAVE_KEY);
          });
          MANUAL_SAVE_KEYS.forEach(function (key, index) {
            var position = _this8.getSaveSlotPosition(index + 1);
            _this8.createSaveSlotCard(panel, "\u624B\u52A8\u5B58\u6863 " + (index + 1), key, position.x, position.y, true, function () {
              _this8.loadSaveSlot(key);
            });
          });
        };
        _proto.buildSaveSlotModal = function buildSaveSlotModal(title) {
          var _this9 = this;
          this.clearChildren(this.modalRoot);
          this.modalRoot.active = true;
          var blocker = this.createNode('ModalBlocker', this.modalRoot, 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
          this.drawRect(blocker, new Color(3, 7, 8, 215));
          var panel = this.createNode('SaveSlotPanel', this.modalRoot, 0, 0, 1500, 900);
          this.drawRoundedRect(panel, new Color(17, 24, 25, 250), 8, new Color(127, 145, 134));
          this.createLabel(title, panel, 0, 380, 760, 64, 40, new Color(238, 232, 218), true);
          this.createButton('返回', panel, 0, -385, 240, 64, function () {
            return _this9.closeModal();
          });
          return panel;
        };
        _proto.getSaveSlotPosition = function getSaveSlotPosition(slotIndex) {
          if (slotIndex === 6) {
            return {
              x: 0,
              y: -225
            };
          }
          return {
            x: slotIndex % 2 === 0 ? -350 : 350,
            y: 225 - Math.floor(slotIndex / 2) * 150
          };
        };
        _proto.createSaveSlotCard = function createSaveSlotCard(parent, label, key, x, y, interactive, action, allowEmptyAction) {
          var _this10 = this;
          if (allowEmptyAction === void 0) {
            allowEmptyAction = false;
          }
          var state = this.getSaveState(key);
          var summary = state && STORY_NODES[state.nodeId] ? STORY_NODES[state.nodeId].chapter + "\n\u5DF2\u89E3\u9501 " + getStoryUnlockPercentage(STORY_NODES, state.visitedNodes) + "%  \xB7  " + this.formatSaveTime(state.updatedAt) : '空存档';
          var text = label + "\n" + summary;
          if (interactive && (state || allowEmptyAction)) {
            this.createButton(text, parent, x, y, 650, 112, action != null ? action : function () {
              return _this10.loadSaveSlot(key);
            }, true);
            return;
          }
          var card = this.createNode("SaveSlot-" + label, parent, x, y, 650, 112);
          this.drawRoundedRect(card, new Color(24, 32, 32, 240), 6, new Color(69, 83, 77));
          this.createLabel(text, card, 0, 0, 610, 94, 21, new Color(135, 146, 140), true);
        };
        _proto.formatSaveTime = function formatSaveTime(timestamp) {
          var date = new Date(timestamp);
          var pad = function pad(value) {
            return value.toString().padStart(2, '0');
          };
          return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate()) + " " + pad(date.getHours()) + ":" + pad(date.getMinutes());
        };
        _proto.openHistory = function openHistory() {
          var _this11 = this;
          this.clearChildren(this.modalRoot);
          this.modalRoot.active = true;
          var blocker = this.createNode('ModalBlocker', this.modalRoot, 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
          this.drawRect(blocker, new Color(3, 7, 8, 215));
          var panel = this.createNode('HistoryPanel', this.modalRoot, 0, 0, 1500, 840);
          this.drawRoundedRect(panel, new Color(17, 24, 25, 250), 8, new Color(127, 145, 134));
          this.createLabel('历史', panel, 0, 350, 820, 64, 40, new Color(238, 232, 218), true);
          var state = this.engine.getState();
          var entries = getUnlockedStoryHistory(STORY_NODES, state.visitedNodes);
          var currentIndex = entries.findIndex(function (entry) {
            return entry.id === state.nodeId;
          });
          var focusIndex = currentIndex >= 0 ? currentIndex : Math.max(0, entries.length - 1);
          var firstVisibleIndex = getHistoryWindowStart(entries.length, focusIndex);
          var maximumStart = Math.max(0, entries.length - HISTORY_VISIBLE_ENTRY_COUNT);
          var listRoot = this.createNode('HistoryList', panel, 0, 5, 1320, 590);
          var rangeLabel = this.createLabel('', panel, 0, -350, 300, 64, 22, new Color(181, 194, 186), true);
          this.createButton('返回', panel, 620, -350, 180, 64, function () {
            return _this11.closeModal();
          });
          var renderEntries = function renderEntries() {
            _this11.clearChildren(listRoot);
            if (entries.length === 0) {
              _this11.createLabel('尚未解锁文本', listRoot, 0, 0, 900, 80, 30, new Color(164, 174, 168));
              rangeLabel.string = '0 / 0';
              return;
            }
            var visibleEntries = entries.slice(firstVisibleIndex, firstVisibleIndex + HISTORY_VISIBLE_ENTRY_COUNT);
            visibleEntries.forEach(function (entry, index) {
              var isCurrent = entry.id === state.nodeId;
              var card = _this11.createNode("History-" + entry.id, listRoot, 0, 236 - index * 118, 1280, 102);
              _this11.drawRoundedRect(card, isCurrent ? new Color(75, 39, 40, 245) : new Color(9, 15, 17, 225), 6, isCurrent ? new Color(218, 172, 151) : new Color(81, 101, 92));
              _this11.createLabel(entry.speaker, card, -500, 27, 190, 34, 21, new Color(230, 199, 169), true);
              var chapter = _this11.createLabel(entry.chapter, card, -205, 27, 360, 34, 18, new Color(181, 194, 186), true);
              chapter.horizontalAlign = Label.HorizontalAlign.LEFT;
              if (isCurrent) {
                _this11.createLabel('当前', card, 535, 27, 110, 34, 18, new Color(255, 235, 221), true);
              }
              var body = _this11.createLabel(entry.text, card, 0, -21, 1160, 50, 21, new Color(235, 234, 227));
              body.horizontalAlign = Label.HorizontalAlign.LEFT;
              body.verticalAlign = Label.VerticalAlign.TOP;
              body.lineHeight = 29;
            });
            var lastVisibleIndex = Math.min(entries.length, firstVisibleIndex + HISTORY_VISIBLE_ENTRY_COUNT);
            rangeLabel.string = firstVisibleIndex + 1 + "-" + lastVisibleIndex + " / " + entries.length;
          };
          panel.on(Node.EventType.MOUSE_WHEEL, function (event) {
            var direction = event.getScrollY() > 0 ? -1 : 1;
            var nextIndex = Math.min(maximumStart, Math.max(0, firstVisibleIndex + direction));
            if (nextIndex !== firstVisibleIndex) {
              firstVisibleIndex = nextIndex;
              renderEntries();
            }
          });
          renderEntries();
        };
        _proto.openClues = function openClues() {
          var _this12 = this;
          this.clearChildren(this.modalRoot);
          this.modalRoot.active = true;
          var blocker = this.createNode('ModalBlocker', this.modalRoot, 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
          this.drawRect(blocker, new Color(3, 7, 8, 205));
          var panel = this.createNode('CluePanel', this.modalRoot, 0, 0, 1500, 840);
          this.drawRoundedRect(panel, new Color(17, 24, 25, 250), 8, new Color(127, 145, 134));
          this.createLabel('线索', panel, 0, 350, 820, 64, 40, new Color(238, 232, 218), true);
          var state = this.engine.getState();
          var clueKeys = Object.keys(CLUE_DETAILS).filter(function (key) {
            return state.clues[key];
          });
          var listRoot = this.createNode('ClueList', panel, -520, -10, 360, 620);
          var detailRoot = this.createNode('ClueDetail', panel, 225, -10, 980, 620);
          this.drawRoundedRect(detailRoot, new Color(9, 15, 17, 220), 6, new Color(81, 101, 92));
          if (clueKeys.length === 0) {
            this.createLabel('尚未获得线索', listRoot, 0, 220, 330, 70, 25, new Color(164, 174, 168));
            this.createLabel('尚未获得线索', detailRoot, 0, 0, 780, 90, 30, new Color(164, 174, 168));
          } else {
            clueKeys.forEach(function (key, index) {
              var detail = CLUE_DETAILS[key];
              _this12.createButton(index + 1 + ". " + detail.label, listRoot, 0, 250 - index * 72, 340, 58, function () {
                _this12.renderClueDetail(detailRoot, key);
              }, true);
            });
            this.renderClueDetail(detailRoot, clueKeys[0]);
          }
          this.createButton('返回', panel, 0, -365, 240, 64, function () {
            return _this12.closeModal();
          });
        };
        _proto.renderClueDetail = function renderClueDetail(parent, clueKey) {
          this.clearChildren(parent);
          var detail = CLUE_DETAILS[clueKey];
          if (!detail) {
            return;
          }
          var context = STORY_NODES[detail.contextNodeId];
          var clue = STORY_NODES[detail.clueNodeId];
          this.createLabel(detail.label, parent, 0, 245, 820, 64, 34, new Color(230, 199, 169), true);
          var detailText = context.text + "\n\n" + clue.text;
          var body = this.createLabel(detailText, parent, 0, -25, 850, 430, 27, new Color(222, 224, 216));
          body.horizontalAlign = Label.HorizontalAlign.LEFT;
          body.verticalAlign = Label.VerticalAlign.TOP;
          body.lineHeight = 43;
        };
        _proto.openBranchMap = function openBranchMap() {
          var _STORY_CHECKPOINTS$fi,
            _currentCheckpoint$la,
            _this13 = this;
          this.clearChildren(this.modalRoot);
          this.modalRoot.active = true;
          var blocker = this.createNode('ModalBlocker', this.modalRoot, 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
          this.drawRect(blocker, new Color(3, 7, 8, 220));
          var panel = this.createNode('BranchPanel', this.modalRoot, 0, 0, 1680, 920);
          this.drawRoundedRect(panel, new Color(14, 21, 22, 252), 8, new Color(127, 145, 134));
          this.createLabel('分支图', panel, -650, 400, 300, 64, 40, new Color(238, 232, 218), true);
          var state = this.engine.getState();
          var currentCheckpointId = findCurrentCheckpointId(STORY_CHECKPOINTS, STORY_NODES, state.nodeId, state.visitedNodes);
          var currentCheckpoint = (_STORY_CHECKPOINTS$fi = STORY_CHECKPOINTS.find(function (checkpoint) {
            return checkpoint.id === currentCheckpointId;
          })) != null ? _STORY_CHECKPOINTS$fi : STORY_CHECKPOINTS[0];
          this.createLabel("\u5F53\u524D\u8282\u70B9 \xB7 " + ((_currentCheckpoint$la = currentCheckpoint == null ? void 0 : currentCheckpoint.label) != null ? _currentCheckpoint$la : '未知'), panel, 160, 400, 1180, 54, 24, new Color(230, 199, 169), true);
          var viewportWidth = 1600;
          var viewportHeight = 700;
          var nodeWidth = 310;
          var nodeHeight = 52;
          var viewport = this.createNode('BranchViewport', panel, 0, 5, viewportWidth, viewportHeight);
          var mask = viewport.addComponent(Mask);
          mask.type = Mask.Type.GRAPHICS_RECT;
          var layout = createBranchTreeLayout(STORY_CHECKPOINTS, {
            nodeWidth: nodeWidth,
            siblingGap: 64,
            rootGap: 120,
            levelGap: 112
          });
          var horizontalPadding = 120;
          var verticalPadding = 80;
          var contentWidth = layout.maximumX - layout.minimumX + nodeWidth + horizontalPadding * 2;
          var contentHeight = layout.maximumY - layout.minimumY + nodeHeight + verticalPadding * 2;
          var content = this.createNode('BranchContent', viewport, 0, 0, contentWidth, contentHeight);
          var lines = this.createNode('BranchLines', content, 0, 0, contentWidth, contentHeight).addComponent(Graphics);
          lines.lineWidth = 3;
          for (var _iterator = _createForOfIteratorHelperLoose(STORY_CHECKPOINTS), _step; !(_step = _iterator()).done;) {
            var _checkpoint$parents;
            var checkpoint = _step.value;
            var child = layout.positions[checkpoint.id];
            var primaryParentId = (_checkpoint$parents = checkpoint.parents) == null ? void 0 : _checkpoint$parents.find(function (parentId) {
              return Boolean(layout.positions[parentId]);
            });
            var parent = primaryParentId ? layout.positions[primaryParentId] : undefined;
            if (!parent) {
              continue;
            }
            lines.strokeColor = this.getVisitedCheckpointTarget(checkpoint) ? new Color(151, 73, 71, 220) : new Color(65, 78, 73, 190);
            var startY = parent.y - nodeHeight / 2;
            var endY = child.y + nodeHeight / 2;
            var middleY = (startY + endY) / 2;
            lines.moveTo(parent.x, startY);
            lines.lineTo(parent.x, middleY);
            lines.lineTo(child.x, middleY);
            lines.lineTo(child.x, endY);
            lines.stroke();
          }
          var _loop = function _loop() {
            var checkpoint = _step2.value;
            var position = layout.positions[checkpoint.id];
            var target = _this13.getVisitedCheckpointTarget(checkpoint);
            var isCurrent = checkpoint.id === currentCheckpointId;
            if (isCurrent) {
              var marker = _this13.createNode("Current-" + checkpoint.id, content, position.x, position.y, 336, 72);
              _this13.drawRoundedRect(marker, new Color(109, 58, 54, 120), 7, new Color(238, 201, 144, 255));
              _this13.createLabel('当前', marker, 126, 38, 80, 26, 17, new Color(255, 226, 171), true);
            }
            if (target) {
              _this13.createButton(checkpoint.label, content, position.x, position.y, nodeWidth, nodeHeight, function () {
                _this13.engine.returnToVisited(target);
                _this13.closeModal();
                _this13.renderCurrentNode();
                _this13.saveAuto();
              }, true);
            } else {
              var locked = _this13.createNode("Locked-" + checkpoint.id, content, position.x, position.y, nodeWidth, nodeHeight);
              _this13.drawRoundedRect(locked, new Color(24, 31, 31, 235), 6, new Color(62, 75, 69));
              _this13.createLabel(LOCKED_STORY_CHECKPOINT_LABEL, locked, 0, 0, 285, 36, 20, new Color(104, 114, 109), true);
            }
          };
          for (var _iterator2 = _createForOfIteratorHelperLoose(STORY_CHECKPOINTS), _step2; !(_step2 = _iterator2()).done;) {
            _loop();
          }
          var minimumZoom = 0.5;
          var maximumZoom = 1.3;
          var zoom = 0.78;
          var horizontalOffset = 0;
          var verticalOffset = 0;
          var zoomLabel = this.createLabel('', panel, 600, -405, 96, 48, 20, new Color(202, 211, 204), true);
          var clampOffset = function clampOffset(offset, minimum, maximum, viewportSize) {
            var scaledMinimum = minimum * zoom;
            var scaledMaximum = maximum * zoom;
            if (scaledMaximum - scaledMinimum <= viewportSize) {
              return -(scaledMinimum + scaledMaximum) / 2;
            }
            var minimumOffset = viewportSize / 2 - scaledMaximum;
            var maximumOffset = -viewportSize / 2 - scaledMinimum;
            return Math.min(maximumOffset, Math.max(minimumOffset, offset));
          };
          var updateContentTransform = function updateContentTransform() {
            var minimumX = layout.minimumX - nodeWidth / 2 - horizontalPadding;
            var maximumX = layout.maximumX + nodeWidth / 2 + horizontalPadding;
            var minimumY = layout.minimumY - nodeHeight / 2 - verticalPadding;
            var maximumY = layout.maximumY + nodeHeight / 2 + verticalPadding;
            horizontalOffset = clampOffset(horizontalOffset, minimumX, maximumX, viewportWidth);
            verticalOffset = clampOffset(verticalOffset, minimumY, maximumY, viewportHeight);
            content.setScale(zoom, zoom, 1);
            content.setPosition(horizontalOffset, verticalOffset);
            zoomLabel.string = Math.round(zoom * 100) + "%";
          };
          var moveHorizontal = function moveHorizontal(amount) {
            horizontalOffset += amount;
            updateContentTransform();
          };
          var moveVertical = function moveVertical(amount) {
            verticalOffset += amount;
            updateContentTransform();
          };
          var setZoom = function setZoom(nextZoom) {
            var clampedZoom = Math.min(maximumZoom, Math.max(minimumZoom, nextZoom));
            var ratio = clampedZoom / zoom;
            horizontalOffset *= ratio;
            verticalOffset *= ratio;
            zoom = clampedZoom;
            updateContentTransform();
          };
          var focusCurrentCheckpoint = function focusCurrentCheckpoint() {
            var _layout$positions$cur;
            var position = (_layout$positions$cur = layout.positions[currentCheckpointId]) != null ? _layout$positions$cur : layout.positions[STORY_CHECKPOINTS[0].id];
            horizontalOffset = -position.x * zoom;
            verticalOffset = -position.y * zoom;
            updateContentTransform();
          };
          viewport.on(Node.EventType.MOUSE_WHEEL, function (event) {
            var scrollX = event.getScrollX();
            var scrollY = event.getScrollY();
            if (Math.abs(scrollX) > Math.abs(scrollY)) {
              moveHorizontal(scrollX > 0 ? -110 : 110);
              return;
            }
            moveVertical(scrollY > 0 ? -110 : 110);
          });
          var mouseDragging = false;
          viewport.on(Node.EventType.MOUSE_DOWN, function () {
            mouseDragging = true;
          });
          viewport.on(Node.EventType.MOUSE_MOVE, function (event) {
            if (!mouseDragging) {
              return;
            }
            var delta = event.getUIDelta();
            horizontalOffset += delta.x;
            verticalOffset += delta.y;
            updateContentTransform();
          });
          var stopMouseDrag = function stopMouseDrag() {
            mouseDragging = false;
          };
          viewport.on(Node.EventType.MOUSE_UP, stopMouseDrag);
          viewport.on(Node.EventType.MOUSE_LEAVE, stopMouseDrag);
          viewport.on(Node.EventType.TOUCH_MOVE, function (event) {
            var delta = event.getUIDelta();
            horizontalOffset += delta.x;
            verticalOffset += delta.y;
            updateContentTransform();
          });
          this.createButton('←', panel, -740, -405, 72, 58, function () {
            return moveHorizontal(140);
          }, true);
          this.createButton('→', panel, -655, -405, 72, 58, function () {
            return moveHorizontal(-140);
          }, true);
          this.createButton('↑', panel, -570, -405, 72, 58, function () {
            return moveVertical(-128);
          }, true);
          this.createButton('↓', panel, -485, -405, 72, 58, function () {
            return moveVertical(128);
          }, true);
          this.createButton('返回', panel, -235, -405, 200, 64, function () {
            return _this13.closeModal();
          });
          this.createButton('定位当前', panel, 20, -405, 190, 58, focusCurrentCheckpoint, true);
          this.createButton('−', panel, 510, -405, 72, 58, function () {
            return setZoom(zoom - 0.1);
          }, true);
          this.createButton('+', panel, 690, -405, 72, 58, function () {
            return setZoom(zoom + 0.1);
          }, true);
          focusCurrentCheckpoint();
        };
        _proto.getVisitedCheckpointTarget = function getVisitedCheckpointTarget(checkpoint) {
          var _checkpoint$nodeIds$f,
            _this14 = this;
          return (_checkpoint$nodeIds$f = checkpoint.nodeIds.find(function (nodeId) {
            return _this14.engine.hasVisited(nodeId);
          })) != null ? _checkpoint$nodeIds$f : null;
        };
        _proto.closeModal = function closeModal() {
          this.modalRoot.active = false;
        };
        _proto.showEnd = function showEnd(node) {
          var _this15 = this;
          this.stopReveal();
          this.gameRoot.active = false;
          this.endRoot.active = true;
          this.clearChildren(this.endRoot);
          var shade = this.createNode('EndShade', this.endRoot, 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
          this.drawRect(shade, new Color(4, 8, 10, 205));
          this.createLabel('未完待续', this.endRoot, 0, 150, 900, 110, 58, new Color(239, 234, 220), true);
          var body = this.createLabel(node.text, this.endRoot, 0, 25, 1040, 150, 29, new Color(204, 215, 207));
          body.lineHeight = 46;
          this.createButton('返回主菜单', this.endRoot, -180, -180, 300, 72, function () {
            return _this15.showTitle();
          });
          this.createButton('重新开始', this.endRoot, 180, -180, 300, 72, function () {
            return _this15.startNewGame();
          });
        };
        _proto.showToast = function showToast(message) {
          this.toastLabel.string = message;
          this.toastLabel.node.active = true;
          this.unschedule(this.hideToast);
          this.scheduleOnce(this.hideToast, 1.4);
        };
        _proto.onKeyDown = function onKeyDown(event) {
          if (event.keyCode === KeyCode.ESCAPE && this.modalRoot.active) {
            this.modalRoot.active = false;
            return;
          }
          if (event.keyCode === KeyCode.SPACE || event.keyCode === KeyCode.ENTER) {
            this.advanceDialogue();
          }
        };
        _proto.createNode = function createNode(name, parent, x, y, width, height) {
          var node = new Node(name);
          node.layer = parent.layer;
          parent.addChild(node);
          node.setPosition(x, y);
          node.addComponent(UITransform).setContentSize(width, height);
          return node;
        };
        _proto.createLabel = function createLabel(text, parent, x, y, width, height, fontSize, color, bold) {
          if (bold === void 0) {
            bold = false;
          }
          var node = this.createNode('Label', parent, x, y, width, height);
          var label = node.addComponent(Label);
          label.string = text;
          label.fontFamily = 'Microsoft YaHei';
          label.fontSize = fontSize;
          label.lineHeight = Math.round(fontSize * 1.4);
          label.color = color;
          label.isBold = bold;
          label.horizontalAlign = Label.HorizontalAlign.CENTER;
          label.verticalAlign = Label.VerticalAlign.CENTER;
          label.overflow = Label.Overflow.SHRINK;
          label.enableWrapText = true;
          return label;
        };
        _proto.createButton = function createButton(text, parent, x, y, width, height, action, compact) {
          if (compact === void 0) {
            compact = false;
          }
          var node = this.createNode("Button-" + text, parent, x, y, width, height);
          var background = node.addComponent(Graphics);
          var button = node.addComponent(Button);
          button.transition = Button.Transition.NONE;
          var redraw = function redraw(hovered) {
            background.clear();
            var highlighted = hovered && button.interactable;
            background.fillColor = !button.interactable ? new Color(24, 31, 31, 220) : highlighted ? new Color(143, 50, 52, 245) : new Color(29, 42, 42, 242);
            background.roundRect(-width / 2, -height / 2, width, height, 6);
            background.fill();
            background.strokeColor = !button.interactable ? new Color(62, 75, 69) : highlighted ? new Color(221, 191, 174) : new Color(111, 132, 121);
            background.lineWidth = 2;
            background.roundRect(-width / 2, -height / 2, width, height, 6);
            background.stroke();
          };
          redraw(false);
          node.on(Button.EventType.CLICK, action);
          node.on(Node.EventType.MOUSE_ENTER, function () {
            return redraw(true);
          });
          node.on(Node.EventType.MOUSE_LEAVE, function () {
            return redraw(false);
          });
          var label = this.createLabel(text, node, 0, 0, width - 30, height - 16, compact ? 21 : 28, new Color(242, 239, 229), true);
          return {
            node: node,
            button: button,
            label: label,
            background: background,
            redraw: redraw
          };
        };
        _proto.setButtonEnabled = function setButtonEnabled(control, enabled) {
          control.button.interactable = enabled;
          control.label.color = enabled ? new Color(242, 239, 229) : new Color(105, 116, 111);
          control.redraw(false);
        };
        _proto.drawRect = function drawRect(node, color) {
          var _node$getComponent;
          var size = node.getComponent(UITransform).contentSize;
          var graphics = (_node$getComponent = node.getComponent(Graphics)) != null ? _node$getComponent : node.addComponent(Graphics);
          graphics.clear();
          graphics.fillColor = color;
          graphics.rect(-size.width / 2, -size.height / 2, size.width, size.height);
          graphics.fill();
          return graphics;
        };
        _proto.styleDialoguePanel = function styleDialoguePanel(isHint) {
          var graphics = this.dialoguePanelBackground;
          var size = graphics.node.getComponent(UITransform).contentSize;
          graphics.clear();
          graphics.fillColor = isHint ? new Color(35, 43, 39, 244) : new Color(9, 14, 17, 232);
          graphics.roundRect(-size.width / 2, -size.height / 2, size.width, size.height, 8);
          graphics.fill();
          graphics.strokeColor = isHint ? new Color(184, 157, 120, 235) : new Color(107, 124, 116, 210);
          graphics.lineWidth = 2;
          graphics.roundRect(-size.width / 2, -size.height / 2, size.width, size.height, 8);
          graphics.stroke();
        };
        _proto.drawRoundedRect = function drawRoundedRect(node, fill, radius, stroke) {
          var size = node.getComponent(UITransform).contentSize;
          var graphics = node.addComponent(Graphics);
          graphics.fillColor = fill;
          graphics.roundRect(-size.width / 2, -size.height / 2, size.width, size.height, radius);
          graphics.fill();
          if (stroke) {
            graphics.strokeColor = stroke;
            graphics.lineWidth = 2;
            graphics.roundRect(-size.width / 2, -size.height / 2, size.width, size.height, radius);
            graphics.stroke();
          }
          return graphics;
        };
        _proto.clearChildren = function clearChildren(parent) {
          for (var _i = 0, _arr = [].concat(parent.children); _i < _arr.length; _i++) {
            var child = _arr[_i];
            child.destroy();
          }
        };
        return AVGGame;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BranchMap.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        createBranchTreeLayout: createBranchTreeLayout,
        findCurrentCheckpointId: findCurrentCheckpointId
      });
      cclegacy._RF.push({}, "898d4jpgplLrYoHxpAN3x++", "BranchMap", undefined);
      function createBranchTreeLayout(checkpoints, options) {
        if (checkpoints.length === 0) {
          return {
            positions: {},
            minimumX: 0,
            maximumX: 0,
            minimumY: 0,
            maximumY: 0
          };
        }
        var checkpointsById = new Map(checkpoints.map(function (checkpoint) {
          return [checkpoint.id, checkpoint];
        }));
        var childrenByParent = new Map();
        var primaryParentByChild = new Map();
        for (var _iterator = _createForOfIteratorHelperLoose(checkpoints), _step; !(_step = _iterator()).done;) {
          var _checkpoint$parents, _childrenByParent$get3;
          var checkpoint = _step.value;
          var primaryParent = (_checkpoint$parents = checkpoint.parents) == null ? void 0 : _checkpoint$parents.find(function (parentId) {
            return checkpointsById.has(parentId);
          });
          if (!primaryParent) {
            continue;
          }
          primaryParentByChild.set(checkpoint.id, primaryParent);
          var children = (_childrenByParent$get3 = childrenByParent.get(primaryParent)) != null ? _childrenByParent$get3 : [];
          children.push(checkpoint);
          childrenByParent.set(primaryParent, children);
        }
        var roots = checkpoints.filter(function (checkpoint) {
          return !primaryParentByChild.has(checkpoint.id);
        });
        var subtreeWidths = new Map();
        var measuring = new Set();
        var measureSubtree = function measureSubtree(checkpoint) {
          var _childrenByParent$get;
          var cached = subtreeWidths.get(checkpoint.id);
          if (cached !== undefined) {
            return cached;
          }
          if (measuring.has(checkpoint.id)) {
            return options.nodeWidth;
          }
          measuring.add(checkpoint.id);
          var children = (_childrenByParent$get = childrenByParent.get(checkpoint.id)) != null ? _childrenByParent$get : [];
          var childrenWidth = children.reduce(function (total, child, index) {
            return total + measureSubtree(child) + (index > 0 ? options.siblingGap : 0);
          }, 0);
          measuring["delete"](checkpoint.id);
          var width = Math.max(options.nodeWidth, childrenWidth);
          subtreeWidths.set(checkpoint.id, width);
          return width;
        };
        var rawPositions = {};
        var placed = new Set();
        var placeSubtree = function placeSubtree(checkpoint, left, width) {
          var _childrenByParent$get2;
          if (placed.has(checkpoint.id)) {
            return;
          }
          placed.add(checkpoint.id);
          var children = (_childrenByParent$get2 = childrenByParent.get(checkpoint.id)) != null ? _childrenByParent$get2 : [];
          if (children.length === 0) {
            rawPositions[checkpoint.id] = {
              x: left + width / 2,
              y: -checkpoint.depth * options.levelGap
            };
            return;
          }
          var childrenWidth = children.reduce(function (total, child, index) {
            return total + measureSubtree(child) + (index > 0 ? options.siblingGap : 0);
          }, 0);
          var childLeft = left + (width - childrenWidth) / 2;
          var childCenters = [];
          for (var _iterator2 = _createForOfIteratorHelperLoose(children), _step2; !(_step2 = _iterator2()).done;) {
            var child = _step2.value;
            var childWidth = measureSubtree(child);
            placeSubtree(child, childLeft, childWidth);
            childCenters.push(rawPositions[child.id].x);
            childLeft += childWidth + options.siblingGap;
          }
          rawPositions[checkpoint.id] = {
            x: (childCenters[0] + childCenters[childCenters.length - 1]) / 2,
            y: -checkpoint.depth * options.levelGap
          };
        };
        var rootLeft = 0;
        for (var _iterator3 = _createForOfIteratorHelperLoose(roots), _step3; !(_step3 = _iterator3()).done;) {
          var root = _step3.value;
          var rootWidth = measureSubtree(root);
          placeSubtree(root, rootLeft, rootWidth);
          rootLeft += rootWidth + options.rootGap;
        }
        for (var _iterator4 = _createForOfIteratorHelperLoose(checkpoints), _step4; !(_step4 = _iterator4()).done;) {
          var _checkpoint = _step4.value;
          if (placed.has(_checkpoint.id)) {
            continue;
          }
          var width = measureSubtree(_checkpoint);
          placeSubtree(_checkpoint, rootLeft, width);
          rootLeft += width + options.rootGap;
        }
        var rawXValues = Object.values(rawPositions).map(function (position) {
          return position.x;
        });
        var centerX = (Math.min.apply(Math, rawXValues) + Math.max.apply(Math, rawXValues)) / 2;
        var positions = {};
        for (var _i = 0, _Object$entries = Object.entries(rawPositions); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _Object$entries[_i],
            checkpointId = _Object$entries$_i[0],
            position = _Object$entries$_i[1];
          positions[checkpointId] = {
            x: position.x - centerX,
            y: position.y
          };
        }
        var xValues = Object.values(positions).map(function (position) {
          return position.x;
        });
        var yValues = Object.values(positions).map(function (position) {
          return position.y;
        });
        return {
          positions: positions,
          minimumX: Math.min.apply(Math, xValues),
          maximumX: Math.max.apply(Math, xValues),
          minimumY: Math.min.apply(Math, yValues),
          maximumY: Math.max.apply(Math, yValues)
        };
      }
      function findCurrentCheckpointId(checkpoints, storyNodes, currentNodeId, visitedNodes) {
        var _ref, _checkpoints$filter$s, _checkpoints$filter$s2, _checkpoints$;
        var checkpointByNodeId = new Map();
        for (var _iterator5 = _createForOfIteratorHelperLoose(checkpoints), _step5; !(_step5 = _iterator5()).done;) {
          var checkpoint = _step5.value;
          for (var _iterator9 = _createForOfIteratorHelperLoose(checkpoint.nodeIds), _step9; !(_step9 = _iterator9()).done;) {
            var _checkpointByNodeId$g2;
            var _nodeId = _step9.value;
            var mapped = (_checkpointByNodeId$g2 = checkpointByNodeId.get(_nodeId)) != null ? _checkpointByNodeId$g2 : [];
            mapped.push(checkpoint);
            checkpointByNodeId.set(_nodeId, mapped);
          }
        }
        var exact = checkpointByNodeId.get(currentNodeId);
        if (exact != null && exact.length) {
          return exact[0].id;
        }
        var predecessors = new Map();
        var addPredecessor = function addPredecessor(targetId, sourceId) {
          var _predecessors$get;
          if (!targetId || !storyNodes[targetId]) {
            return;
          }
          var sources = (_predecessors$get = predecessors.get(targetId)) != null ? _predecessors$get : [];
          sources.push(sourceId);
          predecessors.set(targetId, sources);
        };
        for (var _i2 = 0, _Object$values = Object.values(storyNodes); _i2 < _Object$values.length; _i2++) {
          var node = _Object$values[_i2];
          addPredecessor(node.next, node.id);
          for (var _iterator6 = _createForOfIteratorHelperLoose((_node$choices = node.choices) != null ? _node$choices : []), _step6; !(_step6 = _iterator6()).done;) {
            var _node$choices;
            var choice = _step6.value;
            addPredecessor(choice.target, node.id);
          }
        }
        var seen = new Set([currentNodeId]);
        var frontier = [currentNodeId];
        while (frontier.length > 0) {
          var nextFrontier = [];
          var candidates = [];
          for (var _iterator7 = _createForOfIteratorHelperLoose(frontier), _step7; !(_step7 = _iterator7()).done;) {
            var nodeId = _step7.value;
            for (var _iterator8 = _createForOfIteratorHelperLoose((_predecessors$get2 = predecessors.get(nodeId)) != null ? _predecessors$get2 : []), _step8; !(_step8 = _iterator8()).done;) {
              var _predecessors$get2, _checkpointByNodeId$g;
              var predecessorId = _step8.value;
              if (seen.has(predecessorId)) {
                continue;
              }
              seen.add(predecessorId);
              nextFrontier.push(predecessorId);
              candidates.push.apply(candidates, (_checkpointByNodeId$g = checkpointByNodeId.get(predecessorId)) != null ? _checkpointByNodeId$g : []);
            }
          }
          if (candidates.length > 0) {
            return candidates.sort(function (left, right) {
              return right.depth - left.depth;
            })[0].id;
          }
          frontier = nextFrontier;
        }
        return (_ref = (_checkpoints$filter$s = (_checkpoints$filter$s2 = checkpoints.filter(function (checkpoint) {
          return checkpoint.nodeIds.some(function (nodeId) {
            return visitedNodes[nodeId];
          });
        }).sort(function (left, right) {
          return right.depth - left.depth;
        })[0]) == null ? void 0 : _checkpoints$filter$s2.id) != null ? _checkpoints$filter$s : (_checkpoints$ = checkpoints[0]) == null ? void 0 : _checkpoints$.id) != null ? _ref : '';
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CharacterPresentation.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        isCharacterPortraitScene: isCharacterPortraitScene,
        shouldShowCharacterPortrait: shouldShowCharacterPortrait
      });
      cclegacy._RF.push({}, "fa54c3L+Z1JH6A3Z0XUcd+j", "CharacterPresentation", undefined);
      var CHARACTER_PORTRAITS_ENABLED = exports('CHARACTER_PORTRAITS_ENABLED', false);
      function isCharacterPortraitScene(node, characterName, nodeIdToken) {
        return node.speaker === characterName || node.text.includes(characterName) || node.id.toLowerCase().includes(nodeIdToken.toLowerCase());
      }
      function shouldShowCharacterPortrait(node, characterName, nodeIdToken) {
        return CHARACTER_PORTRAITS_ENABLED;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Color, Canvas, UITransform, instantiate, Label, RichText, Toggle, Button, director, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Color = module.Color;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      RichText = module.RichText;
      Toggle = module.Toggle;
      Button = module.Button;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "b2bd1+njXxJxaFY3ymm06WU", "debug-view-runtime-control", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var DebugViewRuntimeControl = exports('DebugViewRuntimeControl', (_dec = ccclass('internal.DebugViewRuntimeControl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DebugViewRuntimeControl, _Component);
        function DebugViewRuntimeControl() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "compositeModeToggle", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "singleModeToggle", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "EnableAllCompositeModeButton", _descriptor3, _assertThisInitialized(_this));
          _this._single = 0;
          _this.strSingle = ['No Single Debug', 'Vertex Color', 'Vertex Normal', 'Vertex Tangent', 'World Position', 'Vertex Mirror', 'Face Side', 'UV0', 'UV1', 'UV Lightmap', 'Project Depth', 'Linear Depth', 'Fragment Normal', 'Fragment Tangent', 'Fragment Binormal', 'Base Color', 'Diffuse Color', 'Specular Color', 'Transparency', 'Metallic', 'Roughness', 'Specular Intensity', 'IOR', 'Direct Diffuse', 'Direct Specular', 'Direct All', 'Env Diffuse', 'Env Specular', 'Env All', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Fresnel', 'Direct Transmit Diffuse', 'Direct Transmit Specular', 'Env Transmit Diffuse', 'Env Transmit Specular', 'Transmit All', 'Direct Internal Specular', 'Env Internal Specular', 'Internal All', 'Fog'];
          _this.strComposite = ['Direct Diffuse', 'Direct Specular', 'Env Diffuse', 'Env Specular', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Normal Map', 'Fog', 'Tone Mapping', 'Gamma Correction', 'Fresnel', 'Transmit Diffuse', 'Transmit Specular', 'Internal Specular', 'TT'];
          _this.strMisc = ['CSM Layer Coloration', 'Lighting With Albedo'];
          _this.compositeModeToggleList = [];
          _this.singleModeToggleList = [];
          _this.miscModeToggleList = [];
          _this.textComponentList = [];
          _this.labelComponentList = [];
          _this.textContentList = [];
          _this.hideButtonLabel = void 0;
          _this._currentColorIndex = 0;
          _this.strColor = ['<color=#ffffff>', '<color=#000000>', '<color=#ff0000>', '<color=#00ff00>', '<color=#0000ff>'];
          _this.color = [Color.WHITE, Color.BLACK, Color.RED, Color.GREEN, Color.BLUE];
          return _this;
        }
        var _proto = DebugViewRuntimeControl.prototype;
        _proto.start = function start() {
          // get canvas resolution
          var canvas = this.node.parent.getComponent(Canvas);
          if (!canvas) {
            console.error('debug-view-runtime-control should be child of Canvas');
            return;
          }
          var uiTransform = this.node.parent.getComponent(UITransform);
          var halfScreenWidth = uiTransform.width * 0.5;
          var halfScreenHeight = uiTransform.height * 0.5;
          var x = -halfScreenWidth + halfScreenWidth * 0.1,
            y = halfScreenHeight - halfScreenHeight * 0.1;
          var width = 200,
            height = 20;

          // new nodes
          var miscNode = this.node.getChildByName('MiscMode');
          var buttonNode = instantiate(miscNode);
          buttonNode.parent = this.node;
          buttonNode.name = 'Buttons';
          var titleNode = instantiate(miscNode);
          titleNode.parent = this.node;
          titleNode.name = 'Titles';

          // title
          for (var i = 0; i < 2; i++) {
            var newLabel = instantiate(this.EnableAllCompositeModeButton.getChildByName('Label'));
            newLabel.setPosition(x + (i > 0 ? 50 + width * 2 : 150), y, 0.0);
            newLabel.setScale(0.75, 0.75, 0.75);
            newLabel.parent = titleNode;
            var _labelComponent = newLabel.getComponent(Label);
            _labelComponent.string = i ? '----------Composite Mode----------' : '----------Single Mode----------';
            _labelComponent.color = Color.WHITE;
            _labelComponent.overflow = 0;
            this.labelComponentList[this.labelComponentList.length] = _labelComponent;
          }
          y -= height;
          // single
          var currentRow = 0;
          for (var _i = 0; _i < this.strSingle.length; _i++, currentRow++) {
            if (_i === this.strSingle.length >> 1) {
              x += width;
              currentRow = 0;
            }
            var newNode = _i ? instantiate(this.singleModeToggle) : this.singleModeToggle;
            newNode.setPosition(x, y - height * currentRow, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.singleModeToggle.parent;
            var textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strSingle[_i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleSingleMode, this);
            this.singleModeToggleList[_i] = newNode;
          }
          x += width;
          // buttons
          this.EnableAllCompositeModeButton.setPosition(x + 15, y, 0.0);
          this.EnableAllCompositeModeButton.setScale(0.5, 0.5, 0.5);
          this.EnableAllCompositeModeButton.on(Button.EventType.CLICK, this.enableAllCompositeMode, this);
          this.EnableAllCompositeModeButton.parent = buttonNode;
          var labelComponent = this.EnableAllCompositeModeButton.getComponentInChildren(Label);
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var changeColorButton = instantiate(this.EnableAllCompositeModeButton);
          changeColorButton.setPosition(x + 90, y, 0.0);
          changeColorButton.setScale(0.5, 0.5, 0.5);
          changeColorButton.on(Button.EventType.CLICK, this.changeTextColor, this);
          changeColorButton.parent = buttonNode;
          labelComponent = changeColorButton.getComponentInChildren(Label);
          labelComponent.string = 'TextColor';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var HideButton = instantiate(this.EnableAllCompositeModeButton);
          HideButton.setPosition(x + 200, y, 0.0);
          HideButton.setScale(0.5, 0.5, 0.5);
          HideButton.on(Button.EventType.CLICK, this.hideUI, this);
          HideButton.parent = this.node.parent;
          labelComponent = HideButton.getComponentInChildren(Label);
          labelComponent.string = 'Hide UI';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          this.hideButtonLabel = labelComponent;

          // misc
          y -= 40;
          for (var _i2 = 0; _i2 < this.strMisc.length; _i2++) {
            var _newNode = instantiate(this.compositeModeToggle);
            _newNode.setPosition(x, y - height * _i2, 0.0);
            _newNode.setScale(0.5, 0.5, 0.5);
            _newNode.parent = miscNode;
            var _textComponent = _newNode.getComponentInChildren(RichText);
            _textComponent.string = this.strMisc[_i2];
            this.textComponentList[this.textComponentList.length] = _textComponent;
            this.textContentList[this.textContentList.length] = _textComponent.string;
            var toggleComponent = _newNode.getComponent(Toggle);
            toggleComponent.isChecked = _i2 ? true : false;
            _newNode.on(Toggle.EventType.TOGGLE, _i2 ? this.toggleLightingWithAlbedo : this.toggleCSMColoration, this);
            this.miscModeToggleList[_i2] = _newNode;
          }

          // composite
          y -= 150;
          for (var _i3 = 0; _i3 < this.strComposite.length; _i3++) {
            var _newNode2 = _i3 ? instantiate(this.compositeModeToggle) : this.compositeModeToggle;
            _newNode2.setPosition(x, y - height * _i3, 0.0);
            _newNode2.setScale(0.5, 0.5, 0.5);
            _newNode2.parent = this.compositeModeToggle.parent;
            var _textComponent2 = _newNode2.getComponentInChildren(RichText);
            _textComponent2.string = this.strComposite[_i3];
            this.textComponentList[this.textComponentList.length] = _textComponent2;
            this.textContentList[this.textContentList.length] = _textComponent2.string;
            _newNode2.on(Toggle.EventType.TOGGLE, this.toggleCompositeMode, this);
            this.compositeModeToggleList[_i3] = _newNode2;
          }
        };
        _proto.isTextMatched = function isTextMatched(textUI, textDescription) {
          var tempText = new String(textUI);
          var findIndex = tempText.search('>');
          if (findIndex === -1) {
            return textUI === textDescription;
          } else {
            tempText = tempText.substr(findIndex + 1);
            tempText = tempText.substr(0, tempText.search('<'));
            return tempText === textDescription;
          }
        };
        _proto.toggleSingleMode = function toggleSingleMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);
          for (var i = 0; i < this.strSingle.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strSingle[i])) {
              debugView.singleMode = i;
            }
          }
        };
        _proto.toggleCompositeMode = function toggleCompositeMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);
          for (var i = 0; i < this.strComposite.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strComposite[i])) {
              debugView.enableCompositeMode(i, toggle.isChecked);
            }
          }
        };
        _proto.toggleLightingWithAlbedo = function toggleLightingWithAlbedo(toggle) {
          var debugView = director.root.debugView;
          debugView.lightingWithAlbedo = toggle.isChecked;
        };
        _proto.toggleCSMColoration = function toggleCSMColoration(toggle) {
          var debugView = director.root.debugView;
          debugView.csmLayerColoration = toggle.isChecked;
        };
        _proto.enableAllCompositeMode = function enableAllCompositeMode(button) {
          var debugView = director.root.debugView;
          debugView.enableAllCompositeMode(true);
          for (var i = 0; i < this.compositeModeToggleList.length; i++) {
            var _toggleComponent = this.compositeModeToggleList[i].getComponent(Toggle);
            _toggleComponent.isChecked = true;
          }
          var toggleComponent = this.miscModeToggleList[0].getComponent(Toggle);
          toggleComponent.isChecked = false;
          debugView.csmLayerColoration = false;
          toggleComponent = this.miscModeToggleList[1].getComponent(Toggle);
          toggleComponent.isChecked = true;
          debugView.lightingWithAlbedo = true;
        };
        _proto.hideUI = function hideUI(button) {
          var titleNode = this.node.getChildByName('Titles');
          var activeValue = !titleNode.active;
          this.singleModeToggleList[0].parent.active = activeValue;
          this.miscModeToggleList[0].parent.active = activeValue;
          this.compositeModeToggleList[0].parent.active = activeValue;
          this.EnableAllCompositeModeButton.parent.active = activeValue;
          titleNode.active = activeValue;
          this.hideButtonLabel.string = activeValue ? 'Hide UI' : 'Show UI';
        };
        _proto.changeTextColor = function changeTextColor(button) {
          this._currentColorIndex++;
          if (this._currentColorIndex >= this.strColor.length) {
            this._currentColorIndex = 0;
          }
          for (var i = 0; i < this.textComponentList.length; i++) {
            this.textComponentList[i].string = this.strColor[this._currentColorIndex] + this.textContentList[i] + '</color>';
          }
          for (var _i4 = 0; _i4 < this.labelComponentList.length; _i4++) {
            this.labelComponentList[_i4].color = this.color[this._currentColorIndex];
          }
        };
        _proto.onLoad = function onLoad() {};
        _proto.update = function update(deltaTime) {};
        return DebugViewRuntimeControl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "compositeModeToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "singleModeToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EnableAllCompositeModeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameState.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createForOfIteratorHelperLoose, _extends, cclegacy;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        applyEffect: applyEffect,
        cloneGameState: cloneGameState,
        createGameState: createGameState,
        decodeSave: decodeSave,
        encodeSave: encodeSave,
        mergeUnlockedProgress: mergeUnlockedProgress,
        requirementMet: requirementMet
      });
      cclegacy._RF.push({}, "c88c9n7dKpLRLvZIocUMfWP", "GameState", undefined);
      var SAVE_VERSION = exports('SAVE_VERSION', 1);
      var START_NODE_ID = exports('START_NODE_ID', 'chapter_01_opening_01');
      var PERSISTENT_UNLOCK_FLAGS = ['choice01TellSeen', 'choice01SilenceSeen'];
      var DEATH_ENDING_POINTS = {
        choice01Knife: 'choice_01_tell',
        choice01Silence: 'choice_01_silence',
        choice02Xiaoyue: 'choice_02_xiaoyue',
        choice03Fog: 'choice_03_left',
        choice03Return: 'choice_03_return',
        madness: 'choice_04_distrust',
        choice05Self: 'choice_05_self',
        choice06Sleep: 'choice_06_sleep',
        choice06Steal: 'choice_06_steal',
        choice07Alone: 'choice_07_alone',
        minghaoKnife: 'choice_08_check',
        chenjieFork: 'choice_08_help_chenjie',
        zhengyuInevitable: 'choice_08_help_zhengyu',
        deltaXiaoyue: 'choice_07_delta_zhengyu',
        alphaXiaoyue: 'choice_07_alpha_zhengyu',
        epsilonZhengyu: 'choice_10_tell',
        epsilonSleep: 'choice_10_silence',
        luckyCrash: 'choice_11_chenjie',
        midnightAttack: 'choice_13_attack',
        doubleGhosts: 'choice_13_wait'
      };
      function createGameState() {
        var _visitedNodes;
        return {
          saveVersion: SAVE_VERSION,
          nodeId: START_NODE_ID,
          deathRewinds: 0,
          flags: {},
          clues: {},
          endings: {},
          visitedNodes: (_visitedNodes = {}, _visitedNodes[START_NODE_ID] = true, _visitedNodes),
          readNodes: {},
          deathPoints: {},
          history: [],
          updatedAt: Date.now()
        };
      }
      function cloneGameState(state) {
        return JSON.parse(JSON.stringify(state));
      }
      function mergeUnlockedProgress(current, stored) {
        var merged = cloneGameState(current);
        if (!stored) {
          return merged;
        }
        mergeBooleanUnlocks(merged.clues, stored.clues);
        mergeBooleanUnlocks(merged.endings, stored.endings);
        mergeBooleanUnlocks(merged.visitedNodes, stored.visitedNodes);
        mergeBooleanUnlocks(merged.readNodes, stored.readNodes);
        mergeBooleanUnlocks(merged.deathPoints, stored.deathPoints);
        for (var _iterator = _createForOfIteratorHelperLoose(PERSISTENT_UNLOCK_FLAGS), _step; !(_step = _iterator()).done;) {
          var key = _step.value;
          if (stored.flags[key]) {
            merged.flags[key] = true;
          }
        }
        if (!merged.flags.deathCounterReset) {
          merged.deathRewinds = Math.max(merged.deathRewinds, stored.deathRewinds);
        }
        return merged;
      }
      function requirementMet(state, requirement) {
        var _requirement$value;
        var expected = (_requirement$value = requirement.value) != null ? _requirement$value : true;
        if (requirement.kind === 'flag') {
          return Boolean(state.flags[requirement.key]) === expected;
        }
        if (requirement.kind === 'clue') {
          return Boolean(state.clues[requirement.key]) === expected;
        }
        return Boolean(state.endings[requirement.key]) === expected;
      }
      function applyEffect(state, effect, occurrenceKey) {
        if (effect.kind === 'flag') {
          var _effect$value;
          state.flags[effect.key] = (_effect$value = effect.value) != null ? _effect$value : true;
        } else if (effect.kind === 'clue') {
          state.clues[effect.key] = true;
        } else if (effect.kind === 'ending') {
          state.endings[effect.key] = true;
        } else if (effect.kind === 'reset-deaths') {
          state.deathRewinds = 0;
          state.flags.deathCounterReset = true;
        } else if (!occurrenceKey || !state.deathPoints[occurrenceKey]) {
          var _effect$amount;
          if (occurrenceKey) {
            state.deathPoints[occurrenceKey] = true;
          }
          state.deathRewinds += (_effect$amount = effect.amount) != null ? _effect$amount : 1;
        }
      }
      function encodeSave(state) {
        var envelope = {
          format: 'SpiderMountainMysterySave',
          state: cloneGameState(state)
        };
        return JSON.stringify(envelope);
      }
      function decodeSave(raw) {
        try {
          var value = JSON.parse(raw);
          if (value.format !== 'SpiderMountainMysterySave' || !value.state) {
            return null;
          }
          var state = value.state;
          if (state.saveVersion !== SAVE_VERSION || typeof state.nodeId !== 'string') {
            return null;
          }
          var clues = isBooleanMap(state.clues) ? state.clues : {};
          var endings = isBooleanMap(state.endings) ? state.endings : {};
          var visitedNodes = isBooleanMap(state.visitedNodes) ? _extends({}, state.visitedNodes) : {};
          visitedNodes[START_NODE_ID] = true;
          visitedNodes[state.nodeId] = true;
          migrateVisitedNodes(state.nodeId, clues, visitedNodes);
          var readNodes = isBooleanMap(state.readNodes) ? _extends({}, state.readNodes) : migrateReadNodes(state.nodeId, visitedNodes);
          var deathPoints = isBooleanMap(state.deathPoints) ? _extends({}, state.deathPoints) : {};
          migrateDeathPoints(endings, deathPoints);
          return {
            saveVersion: SAVE_VERSION,
            nodeId: state.nodeId,
            deathRewinds: Number.isFinite(state.deathRewinds) ? Math.max(0, Number(state.deathRewinds)) : 0,
            flags: isBooleanMap(state.flags) ? state.flags : {},
            clues: clues,
            endings: endings,
            visitedNodes: visitedNodes,
            readNodes: readNodes,
            deathPoints: deathPoints,
            history: Array.isArray(state.history) ? state.history.filter(function (entry) {
              return typeof entry === 'string';
            }).slice(-120) : [],
            updatedAt: typeof state.updatedAt === 'number' ? state.updatedAt : Date.now()
          };
        } catch (_unused) {
          return null;
        }
      }
      function migrateReadNodes(currentNodeId, visitedNodes) {
        var readNodes = {};
        for (var _i = 0, _Object$entries = Object.entries(visitedNodes); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _Object$entries[_i],
            nodeId = _Object$entries$_i[0],
            visited = _Object$entries$_i[1];
          if (visited && nodeId !== currentNodeId) {
            readNodes[nodeId] = true;
          }
        }
        return readNodes;
      }
      function migrateDeathPoints(endings, deathPoints) {
        for (var _i2 = 0, _Object$entries2 = Object.entries(DEATH_ENDING_POINTS); _i2 < _Object$entries2.length; _i2++) {
          var _Object$entries2$_i = _Object$entries2[_i2],
            endingKey = _Object$entries2$_i[0],
            pointId = _Object$entries2$_i[1];
          if (endings[endingKey]) {
            deathPoints[pointId] = true;
          }
        }
      }
      function migrateVisitedNodes(nodeId, clues, visitedNodes) {
        var reachedChapterTwo = nodeId.startsWith('chapter_02') || nodeId.startsWith('chapter_03') || nodeId.startsWith('chapter_04') || nodeId.startsWith('chapter_05') || nodeId === 'choice_02_team' || Boolean(clues.fruitKnife);
        if (reachedChapterTwo) {
          visitedNodes.choice_01_xiaoyue = true;
          visitedNodes.chapter_02_camp_01 = true;
          visitedNodes.choice_02_team = true;
        }
        var reachedChapterThree = nodeId.startsWith('chapter_03') || nodeId.startsWith('chapter_04') || nodeId.startsWith('chapter_05') || Boolean(clues.morningIncident) || Boolean(clues.tireShine) || Boolean(clues.minghaoSleep) || Boolean(clues.minghao) || Boolean(clues.chenJie) || Boolean(clues.zhengYu);
        if (reachedChapterThree) {
          visitedNodes.choice_03_road = true;
        }
        var reachedGamma = nodeId.startsWith('chapter_04') || nodeId.startsWith('chapter_05');
        if (reachedGamma) {
          visitedNodes.chapter_03_alpha_camp_01 = true;
          visitedNodes.choice_05_watch_alpha = true;
          visitedNodes.choice_07_chase_alpha = true;
          visitedNodes.choice_09_together_alpha = true;
          visitedNodes.choice_11_chat_alpha = true;
          visitedNodes.chapter_03_alpha_crash_02 = true;
          visitedNodes.choice_04_trust_minghao = true;
          visitedNodes.choice_12_trust_minghao = true;
          visitedNodes.chapter_04_gamma_collapse_01 = true;
        }
        if (nodeId.startsWith('chapter_05')) {
          visitedNodes.choice_13_midnight_visit = true;
          visitedNodes.chapter_04_gamma_be6 = true;
          visitedNodes.chapter_05_second_loop_01 = true;
        }
      }
      function isBooleanMap(value) {
        if (!value || typeof value !== 'object' || Array.isArray(value)) {
          return false;
        }
        return Object.values(value).every(function (entry) {
          return typeof entry === 'boolean';
        });
      }
      function mergeBooleanUnlocks(target, source) {
        for (var _i3 = 0, _Object$entries3 = Object.entries(source); _i3 < _Object$entries3.length; _i3++) {
          var _Object$entries3$_i = _Object$entries3[_i3],
            key = _Object$entries3$_i[0],
            unlocked = _Object$entries3$_i[1];
          if (unlocked) {
            target[key] = true;
          }
        }
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './AVGGame.ts', './BranchMap.ts', './CharacterPresentation.ts', './GameState.ts', './StoryEngine.ts', './StoryHistory.ts', './StoryTypes.ts', './StoryContent.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/StoryContent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a593bdMQsBGmrgZeja0lej+", "StoryContent", undefined);
      function line(id, chapter, text, next, speaker, effects) {
        var resolvedSpeaker = /^提示\d*[：:]/.test(text) ? '提示' : speaker;
        return {
          id: id,
          type: 'line',
          chapter: chapter,
          text: text,
          next: next,
          speaker: resolvedSpeaker,
          effects: effects
        };
      }
      function interviewChoice(round, id, text, target, flag) {
        var suffix = round === 1 ? '' : "_round" + round;
        var requirements = [{
          kind: 'flag',
          key: flag,
          value: false
        }].concat(round === 1 ? [{
          kind: 'flag',
          key: 'chatRound2',
          value: false
        }] : round === 2 ? [{
          kind: 'flag',
          key: 'chatRound2'
        }, {
          kind: 'flag',
          key: 'chatRound3',
          value: false
        }] : [{
          kind: 'flag',
          key: 'chatRound3'
        }, {
          kind: 'flag',
          key: 'chatComplete',
          value: false
        }]);
        var effects = [{
          kind: 'flag',
          key: flag
        }];
        if (round === 1) {
          effects.push({
            kind: 'flag',
            key: 'chatRound2'
          });
        } else if (round === 2) {
          effects.push({
            kind: 'flag',
            key: 'chatRound3'
          });
        } else {
          effects.push({
            kind: 'flag',
            key: 'chatComplete'
          });
        }
        return {
          id: "" + id + suffix,
          text: text,
          target: target,
          requires: requirements,
          effects: effects
        };
      }
      var chapter01 = '第一章 · 雾中石碑';
      var chapter02 = '第二章 · 营地疑云';
      var chapter03Beta = '第三章 · 正宇死亡线';
      var chapter03Alpha = '第三章 · 全员存活线';
      var chapter03Delta = '第三章 · 绿巨人灭世线';
      var chapter03Epsilon = '第三章 · 苏糯死亡线';
      var chapter04Gamma = '第四章 · 解密篇 γ';
      var chapter05SecondLoop = '第五章 · 二周目';
      var nodes = [line('chapter_01_opening_01', chapter01, '周末，你和社团里的七名朋友自驾进山野营。白日的山林清爽热闹，可等到尽兴收拾装备准备返程时，天色彻底沉了下来，晚风卷着树叶的沙沙声，透着莫名的阴冷。', 'chapter_01_opening_02'), line('chapter_01_opening_02', chapter01, '最让人慌乱的是，车钥匙不见了。', 'chapter_01_opening_03'), line('chapter_01_opening_03', chapter01, '甚至还没来得及收拾野营桌上的刀叉零食餐盘，八人就分头搜寻，大家分头扎进树林去寻找车钥匙。', 'chapter_01_opening_04'), line('chapter_01_opening_04', chapter01, '越往深处走，周遭越静，舍友的说话声、脚步声尽数消失，只剩你自己的呼吸，沉重又刺耳。', 'chapter_01_opening_04_fog'), line('chapter_01_opening_04_fog', chapter01, '不知不觉间，整座山都被浓雾覆盖了。', 'chapter_01_opening_05'), line('chapter_01_opening_05', chapter01, '拨开一片湿漉漉的灌木丛，一块半埋在泥土里的青黑色石碑突兀出现在眼前。碑面潮湿腥冷，几道暗红血字歪歪扭扭，前几个字还算是规整，越到后面越歪七扭八。', 'chapter_01_opening_06'), line('chapter_01_opening_06', chapter01, '后面的字血迹鲜明，像是刚刻不久，字迹狰狞扭曲，你只能尝试着大致解读。', 'chapter_01_opening_07'), line('chapter_01_opening_07', chapter01, '“惊扰山神者，山神附其体；山神失其信，便可出山；否，皆葬于此。”', 'chapter_01_opening_08'), line('chapter_01_opening_08', chapter01, '血字新鲜黏腻，隐隐散发着铁锈混着腐叶的恶臭。你后背瞬间爬满寒意，就在这时，林间传来细碎的动静，你十分惊恐。', 'chapter_01_opening_09'), line('chapter_01_opening_09', chapter01, '你用手机把石碑拍下来，想去发到你们几个人的小群里，发现山里忽然没有网络了。', 'chapter_01_opening_10'), line('chapter_01_opening_10', chapter01, '你渐渐意识到事情不太对劲，白天的时候你们玩得太开心没顾得上玩手机，但是你记得就在你们打算开车回去之前顾书还在用手机看直播呢。', 'chapter_01_opening_11'), line('chapter_01_opening_11', chapter01, '你得赶快回去，不管石碑上写的这个内容是真的还是假的，你不能自己一个人待在这里，这太不对劲了。', 'chapter_01_opening_12'), line('chapter_01_opening_12', chapter01, '顺着来路折返时，感觉路上多了很多的蜘蛛网，周遭草丛不断传来窸窸窣窣的响动，细碎湿润的咀嚼声响在寂静林子里格外刺耳。', 'chapter_01_opening_13'), line('chapter_01_opening_13', chapter01, '我慌忙掏出手机开启手电对准草丛，一道黑影骤然冲破草木猛扑过来，惊得手机脱手砸落在泥土里。', 'chapter_01_opening_14'), line('chapter_01_opening_14', chapter01, '下坠的手机仰躺在地，冷白的灯光自下而上朝上打亮来人，乌黑浓密的长发全部披散垂在脸前，一身惨白连衣裙衬在漆黑林木间，模样阴森骇人，和电影里的贞子别无二致。', 'chapter_01_opening_15'), line('chapter_01_opening_15', chapter01, '惊魂未定的你大口喘着粗气，借着地面微光看清衣着，紧绷的神经稍稍松懈，是平日里总爱恶作剧整蛊的小月。', 'chapter_01_player_01'), line('chapter_01_player_01', chapter01, '“是你啊小月，差点把我魂都吓飞了。本来困在山里就人心惶惶，你怎么还有心思闹这种恶作剧。”', 'chapter_01_xiaoyue_intro_01', '你'), line('chapter_01_xiaoyue_intro_01', chapter01, '小月，留着一头乌黑柔顺的长发，发质乌黑发亮，衬得整张脸格外清秀亮眼，样貌十分出众。她生着一双格外大的圆眼睛，眼瞳乌黑饱满，平日里眼神清澈柔和，看着单纯又温顺。她在某音甚至有十几万的粉丝，已经是小网红的级别了。', 'chapter_01_xiaoyue_01'), line('chapter_01_xiaoyue_01', chapter01, '小月抬手将挡脸的长发撩至脑后，俏皮吐了吐舌尖，发出一阵狡黠的轻笑：', 'chapter_01_xiaoyue_02'), line('chapter_01_xiaoyue_02', chapter01, '“嘿嘿，还是被你认出来啦。”', 'choice_01_xiaoyue', '小月'), {
        id: 'choice_01_xiaoyue',
        type: 'choice',
        chapter: chapter01,
        text: '抉择1 - 热情的小月\n虽然没有办法证明石碑是真的，但是你现在必须开始警惕身边的所有人。你现在要不要把石碑的事情告诉小月，如果小月是被山神替代的人，你是否会死在这里？',
        choices: [{
          id: 'choice_01_tell',
          text: 'A. 拿起手机给小月看照片，把你的想法告诉小月',
          target: 'chapter_01_death_tell_01',
          effects: [{
            kind: 'flag',
            key: 'choice01TellSeen'
          }, {
            kind: 'ending',
            key: 'choice01Knife'
          }, {
            kind: 'death'
          }]
        }, {
          id: 'choice_01_silence',
          text: 'B. 什么都不说，假装什么也不知道。',
          target: 'chapter_01_death_silence_01',
          effects: [{
            kind: 'flag',
            key: 'choice01SilenceSeen'
          }, {
            kind: 'ending',
            key: 'choice01Silence'
          }, {
            kind: 'death'
          }]
        }, {
          id: 'choice_01_return',
          text: 'C. 你意识到小月跟平常不太一样，告诉小月附近有个石碑，带她去现场看石碑。',
          target: 'chapter_01_clear_01',
          requires: [{
            kind: 'flag',
            key: 'choice01TellSeen'
          }, {
            kind: 'flag',
            key: 'choice01SilenceSeen'
          }],
          effects: [{
            kind: 'clue',
            key: 'fruitKnife'
          }]
        }]
      }, line('chapter_01_death_tell_01', chapter01, '你看到小月见到手机照片之后表情有了一点变化，但很快不正常的表情瞬间消失。', 'chapter_01_death_tell_02'), line('chapter_01_death_tell_02', chapter01, '你觉得她只是被吓到了，并没有太在意。于是你们结伴走回营地。', 'chapter_01_death_tell_03'), line('chapter_01_death_tell_03', chapter01, '但是回到营地的只有小月一个人，你的尸体时被发现时身上充满了类似水果刀造成的刀伤。', 'chapter_01_hint_tell'), line('chapter_01_hint_tell', chapter01, '提示1：好恐怖一女的。', 'chapter_01_rewind_tell'), line('chapter_01_rewind_tell', chapter01, '死亡回溯。你再次回到了抉择发生之前。', 'choice_01_xiaoyue'), line('chapter_01_death_silence_01', chapter01, '你跟小月寒暄几句后，结伴走回营地。', 'chapter_01_death_silence_02'), line('chapter_01_death_silence_02', chapter01, '但是回到营地的只有小月一个人，你的尸体时被发现时身上充满了类似水果刀造成的刀伤。', 'chapter_01_hint_silence'), line('chapter_01_hint_silence', chapter01, '提示2：为什么不说话，是看见美女害羞了吗？', 'chapter_01_rewind_silence'), line('chapter_01_rewind_silence', chapter01, '死亡回溯。你再次回到了抉择发生之前。', 'choice_01_xiaoyue'), line('chapter_01_clear_01', chapter01, '小月看着石碑听着你的解释，似懂非懂地点头。', 'chapter_01_clear_02'), line('chapter_01_clear_02', chapter01, '看完之后你们两个一同回到营地，小月在路上一言不发。', 'chapter_01_clue_01'), line('chapter_01_clue_01', chapter01, '获得线索1--“水果刀战神”：看到这个女人我就害怕了...', 'chapter_02_camp_01'), line('chapter_02_camp_01', chapter02, '营地中社团成员在车边搭了一个灯，围坐成一圈。', 'chapter_02_camp_02'), line('chapter_02_camp_02', chapter02, '按照几人落座的位置，由离我最近到最远依次是：陈杰、苏糯、明浩、阿泰和正宇。', 'chapter_02_profile_chenjie_01'), line('chapter_02_profile_chenjie_01', chapter02, '陈杰戴着细框眼镜，平日里神情严肃，不爱说笑。自打入学以来，他年年都能拿到校级奖学金，是社团里实打实的学霸，也是团队里负责出谋划策的主心骨。', 'chapter_02_profile_chenjie_02'), line('chapter_02_profile_chenjie_02', chapter02, '不管是日常常识、专业知识，还是突发状况的临场判断，他的见识都远超旁人，遇事只会冷静权衡利弊，理智永远压过感性。', 'chapter_02_profile_chenjie_03'), line('chapter_02_profile_chenjie_03', chapter02, '可常年冷淡孤僻的性子，让他没什么人缘，接二连三的怪事发生后，他淡漠疏离的模样，在人群里显得格外扎眼。', 'chapter_02_profile_sunuo_01'), line('chapter_02_profile_sunuo_01', chapter02, '苏糯是个混血儿，有着一头蓬松耀眼的金发，脸颊上分布着淡淡的浅褐色小雀斑，不仅没有违和感，反倒衬得她稚气十足，娇俏灵动。', 'chapter_02_profile_sunuo_02'), line('chapter_02_profile_sunuo_02', chapter02, '她胆子天生很小，社团集体看恐怖片时，她总会死死捂住双眼，把头靠在别人肩膀上，自始至终不敢看向荧幕。但凡受到惊吓，就会慌张发抖，心思敏感，性格怯懦。', 'chapter_02_profile_minghao_01'), line('chapter_02_profile_minghao_01', chapter02, '明浩是一个平日里格外热爱马拉松长跑的医学生，经常参加各种比赛，皮肤晒成了均匀健康的黝黑小麦色。常年的耐力运动练出紧实利落的身形，性格踏实靠谱，既有医学生细致冷静的观察力，又有着运动带来的强健体魄。', 'chapter_02_profile_atai_01'), line('chapter_02_profile_atai_01', chapter02, '阿泰是你们社团的社长，他作为整个社团的领导核心，有着很强的话语权，也是我们整个社团凝聚力的象征。', 'chapter_02_profile_atai_02'), line('chapter_02_profile_atai_02', chapter02, '他不仅有很强的领导能力，而且本人在学校里也是小有名气的帅哥，性格也是面面俱到温柔体贴，团队中的他总是在照顾每个人的情绪，他跟顾书是发小。', 'chapter_02_profile_zhengyu_01'), line('chapter_02_profile_zhengyu_01', chapter02, '正宇身形魁梧壮硕，光是站在那儿就自带压迫感，生人几乎不敢主动上前搭话。他常年练习铅球，长期的高强度负重训练把双臂练得格外粗壮结实。', 'chapter_02_profile_zhengyu_02'), line('chapter_02_profile_zhengyu_02', chapter02, '臂膀线条紧实硬朗，胳膊粗壮得如同扎实的原木，整个人极具力量感。平日里沉默寡言。偷偷地说，我们都知道他暗恋小月。', 'chapter_02_greeting_minghao_01'), line('chapter_02_greeting_minghao_01', chapter02, '率先跟你打招呼的是坐的最远的你大学最好的兄弟明浩。', 'chapter_02_greeting_group_01'), line('chapter_02_greeting_group_01', chapter02, '其他几个人也望向你和小月，阿泰非常热心地过来询问你们有没有受伤，怎么回来的这么晚一类的话。', 'chapter_02_stone_report_01'), line('chapter_02_stone_report_01', chapter02, '你和小月把发现石碑的事情告诉大家，听完你的陈述后，大家的表情都变了。', 'chapter_02_chenjie_01'), line('chapter_02_chenjie_01', chapter02, '“你们说的石碑和红字到底是真的，还是你们俩串通好编谎话吓唬人？拿点证据出来。”', 'chapter_02_chenjie_01_narration', '陈杰'), line('chapter_02_chenjie_01_narration', chapter02, '陈杰向来沉着冷静，冷冰冰地打量着我和小月，面无表情，语气平淡生硬，毫无起伏。', 'chapter_02_chenjie_02'), line('chapter_02_chenjie_02', chapter02, '不等我们辩解，他直接开口，语气十分肯定，像是早就把一切摸得清清楚楚：', 'chapter_02_chenjie_02_dialogue'), line('chapter_02_chenjie_02_dialogue', chapter02, '“咱们爬的这座山原先叫蜘蛛山，传言山上所谓的山神就是蜘蛛假装的，压根不存在真的山神。”', 'chapter_02_sunuo_01', '陈杰'), line('chapter_02_sunuo_01', chapter02, '“哪是什么山神啊，就是蜘蛛装出来骗人的，说白了是蜘蛛妖怪吧。石碑上那些血淋淋的警告就能看出来，就是想报复我们，是个害人的凶神恶鬼！”', 'chapter_02_sunuo_01_narration', '苏糯'), line('chapter_02_sunuo_01_narration', chapter02, '苏糯声音有点发抖，看出来她有点害怕。', 'chapter_02_sunuo_02'), line('chapter_02_sunuo_02', chapter02, '“一开始要是知道露营会碰上这么诡异的事情我就不来了...而且现在，想求救都做不到……”', 'chapter_02_minghao_01', '苏糯'), line('chapter_02_minghao_01', chapter02, '“糯糯姐，不要讲这种话嘛，咱们今天白天明明也玩得挺开心的，”', 'chapter_02_minghao_01_narration', '明浩'), line('chapter_02_minghao_01_narration', chapter02, '明浩一直是你们之中最乐观的一个，即使是被困山里他好像也带着希望，', 'chapter_02_minghao_01_reply'), line('chapter_02_minghao_01_reply', chapter02, '“收手机这个事情是我们早上一起制定的嘛，只有早上游戏玩赢的人才能玩手机，是吧部长。”', 'chapter_02_atai_01', '明浩'), line('chapter_02_atai_01', chapter02, '“手机这个事情确实是大家八个人一起指定的，现在我们几个的手机一起被锁在车上了，”', 'chapter_02_atai_01_narration', '阿泰'), line('chapter_02_atai_01_narration', chapter02, '部长阿泰也有些着急，平常在学校里很难看到他这么焦急的样子，', 'chapter_02_atai_01_reply'), line('chapter_02_atai_01_reply', chapter02, '“咱们的首要任务还是先把车钥匙拿到。”', 'chapter_02_zhengyu_context_01', '阿泰'), line('chapter_02_zhengyu_context_01', chapter02, '“部长。”', 'chapter_02_zhengyu_context_02', '正宇'), line('chapter_02_zhengyu_context_02', chapter02, '正宇坐在角落里，他平常就很沉默，总是一声不吭，他是你们之中最强壮的，假如这个山神还是什么邪神凶神附身到他的身上，你们恐怕三个人都打不过他一个。', 'chapter_02_zhengyu_01'), line('chapter_02_zhengyu_01', chapter02, '顾书还没回来。', 'chapter_02_phone_01'), line('chapter_02_phone_01', chapter02, '今天白天的游戏有两个获胜者，就是你跟顾书，其他人的手机都被锁在车里。你刚想掏出手机联系顾书，却发现手机不见了。', 'choice_02_team'), {
        id: 'choice_02_team',
        type: 'choice',
        chapter: chapter02,
        text: '抉择2 - 组队建议\n阿泰提议我们组队去寻找顾书，请选择你的队友。',
        choices: [{
          id: 'choice_02_xiaoyue',
          text: 'A. 小月',
          target: 'chapter_02_death_xiaoyue',
          effects: [{
            kind: 'ending',
            key: 'choice02Xiaoyue'
          }, {
            kind: 'death'
          }]
        }, {
          id: 'choice_02_sunuo',
          text: 'B. 苏糯',
          target: 'chapter_02_team_sunuo',
          effects: [{
            kind: 'flag',
            key: 'betaTeamSunuo'
          }]
        }, {
          id: 'choice_02_atai',
          text: 'C. 阿泰',
          target: 'chapter_02_team_atai',
          effects: [{
            kind: 'flag',
            key: 'betaTeamSunuo',
            value: false
          }]
        }, {
          id: 'choice_02_minghao',
          text: 'D. 明浩',
          target: 'chapter_02_team_minghao',
          effects: [{
            kind: 'flag',
            key: 'betaTeamSunuo',
            value: false
          }]
        }, {
          id: 'choice_02_chenjie',
          text: 'E. 陈杰',
          target: 'chapter_02_team_chenjie',
          requires: [{
            kind: 'clue',
            key: 'chenJie'
          }]
        }]
      }, line('chapter_02_death_xiaoyue', chapter02, '你和小月走进森林，回到营地时只有小月自己。', 'chapter_02_hint_xiaoyue'), line('chapter_02_hint_xiaoyue', chapter02, '提示3：我知道你是故意选这个的对不对，你只是想看看这个选项会发生什么。', 'chapter_02_rewind_xiaoyue'), line('chapter_02_rewind_xiaoyue', chapter02, '死亡回溯。你再次回到了组队抉择之前。', 'choice_02_team'), line('chapter_02_team_sunuo', chapter02, '你跟苏糯一队，正宇跟陈杰一队。其他人留在营地。', 'chapter_03_beta_search_sunuo'), line('chapter_02_team_atai', chapter02, '你跟阿泰一队，正宇跟陈杰一队。其他人留在营地。', 'chapter_03_beta_search_atai'), line('chapter_02_team_minghao', chapter02, '你跟明浩一队，正宇跟陈杰一队。其他人留在营地。', 'chapter_03_beta_search_minghao'), line('chapter_02_beta_end', chapter02, '分支β（正宇死亡线）', 'chapter_03_beta_search_atai'), line('chapter_02_team_chenjie', chapter02, '你跟陈杰一队，阿泰和苏糯一队。正宇、明浩、小月留在营地。', 'chapter_02_alpha_end'), line('chapter_02_alpha_end', chapter02, '分支α 全员存活线', 'chapter_03_alpha_camp_01'), line('chapter_03_beta_search_sunuo', chapter03Beta, '你跟苏糯在森林里找了半个小时，什么都没有找到。但是你们配合默契，克服了大自然的凶险。', 'chapter_03_beta_affection_hint'), line('chapter_03_beta_search_atai', chapter03Beta, '你跟阿泰在森林里找了半个小时，什么都没有找到。但是你们配合默契，克服了大自然的凶险。', 'chapter_03_beta_affection_hint'), line('chapter_03_beta_search_minghao', chapter03Beta, '你跟明浩在森林里找了半个小时，什么都没有找到。但是你们配合默契，克服了大自然的凶险。', 'chapter_03_beta_affection_hint'), line('chapter_03_beta_affection_hint', chapter03Beta, '提示5：苏糯\\阿泰\\明浩好感度+10，不过我们不是恋爱模拟游戏，+100对后续的剧情也没有用哦。', 'chapter_03_beta_call_01'), line('chapter_03_beta_call_01', chapter03Beta, '这时候你们听到了有人在远处大喊阿泰和正宇还有你们的名字，似乎事情非常严重。', 'choice_03_road'), {
        id: 'choice_03_road',
        type: 'choice',
        chapter: chapter03Beta,
        text: '抉择3 - 路在何方\n前方出现两条小路，左边雾色浓重，全程寂静无声；右边隐约传来的呼喊声，声音微弱飘忽。你选择：',
        choices: [{
          id: 'choice_03_left',
          text: 'A. 走左边雾路',
          target: 'chapter_03_beta_death_fog_01',
          effects: [{
            kind: 'ending',
            key: 'choice03Fog'
          }, {
            kind: 'death'
          }]
        }, {
          id: 'choice_03_right',
          text: 'B. 走右边闻声处',
          target: 'chapter_03_beta_gushu_01'
        }, {
          id: 'choice_03_return',
          text: 'C. 回头返回营地',
          target: 'chapter_03_beta_death_return_01',
          effects: [{
            kind: 'ending',
            key: 'choice03Return'
          }, {
            kind: 'death'
          }]
        }]
      }, line('chapter_03_beta_death_fog_01', chapter03Beta, '前面雾气越来越大，仿佛要把人吞噬掉，你和同伴迷失在了雾中，没能再走出浓雾。', 'chapter_03_beta_hint_fog'), line('chapter_03_beta_hint_fog', chapter03Beta, '提示6：勒是雾都，一般不会有人选这个选项吧，一看就很危险，其实本身也是凑数选项啦。', 'chapter_03_beta_rewind_fog'), line('chapter_03_beta_rewind_fog', chapter03Beta, '死亡回溯。你再次回到了路口。', 'choice_03_road'), line('chapter_03_beta_death_return_01', chapter03Beta, '回头的路越走越长，慢慢你和同伴被身后的迷雾追上，最后谁也没有走回营地。', 'chapter_03_beta_hint_return'), line('chapter_03_beta_hint_return', chapter03Beta, '提示7：浓雾往往预示着一些不好的征兆呢，难道你们真的被山神盯上了嘛，别管了，还是赶快推进主线吧！', 'chapter_03_beta_rewind_return'), line('chapter_03_beta_rewind_return', chapter03Beta, '死亡回溯。你再次回到了路口。', 'choice_03_road'), line('chapter_03_beta_gushu_01', chapter03Beta, '除了正宇你跟同伴都赶到了这里，映入眼帘的是倒在一片血泊之中的顾书，掀开衣服之后是胸前是很深的两处刀伤。', 'chapter_03_beta_gushu_02'), line('chapter_03_beta_gushu_02', chapter03Beta, '身边就是摔碎的手机，已经完全用不了了。手机上好像已经织上了一层薄薄的蜘蛛网。', 'chapter_03_beta_minghao_exam_01'), line('chapter_03_beta_minghao_exam_01', chapter03Beta, '学医的明浩检查了尸体，郑重地说道：', 'chapter_03_beta_minghao_exam_dialogue_01'), line('chapter_03_beta_minghao_exam_dialogue_01', chapter03Beta, '“结合尸体身上的尸况综合判断，他遇害时间应该是傍晚天色刚暗、我们分头进林子找车钥匙那会儿，凶手就是在这个时间段持刀行凶。', 'chapter_03_beta_minghao_exam_02', '明浩'), line('chapter_03_beta_minghao_exam_02', chapter03Beta, '不过眼下我们没法直接断定是山神附身作祟，也不能排除山林里还藏着外来的陌生人。”', 'chapter_03_beta_atai_confession_01', '明浩'), line('chapter_03_beta_atai_confession_01', chapter03Beta, '“其实...今天咱们是偷着开车上山的，今天原本说是可能山里会有雾，今天是禁止游客的，但是我早上看工作人员也没有上班，所以跟正宇偷着把大家拉上来了。”', 'chapter_03_beta_atai_confession_02', '阿泰'), line('chapter_03_beta_atai_confession_02', chapter03Beta, '阿泰蹲在地上，像是接受不了顾书被杀掉的事实，但你能看出他明显在硬撑。', 'chapter_03_beta_sunuo_fear_01'), line('chapter_03_beta_sunuo_fear_01', chapter03Beta, '“你的意思就是说，真的有凶神冒充了我们的成员，然后杀掉了顾书吗？”', 'chapter_03_beta_sunuo_fear_02', '苏糯'), line('chapter_03_beta_sunuo_fear_02', chapter03Beta, '苏糯的声音颤抖得厉害，明显精神面临崩溃了。', 'chapter_03_beta_xiaoyue_suspicion_01'), line('chapter_03_beta_xiaoyue_suspicion_01', chapter03Beta, '“这座山也太可怕了。如果真的有山神附体的话，”', 'chapter_03_beta_xiaoyue_suspicion_02', '小月'), line('chapter_03_beta_xiaoyue_suspicion_02', chapter03Beta, '小月忽然看向我，', 'chapter_03_beta_xiaoyue_suspicion_03'), line('chapter_03_beta_xiaoyue_suspicion_03', chapter03Beta, '“那我们剩下的几个人最好先待在一起，正宇呢，他如果被山神替代的话，那他就是最危险的了。”', 'chapter_03_beta_chenjie_return_01', '小月'), line('chapter_03_beta_chenjie_return_01', chapter03Beta, '“先回营地吧，他应该在营地等我们。”', 'chapter_03_beta_unease_01', '陈杰'), line('chapter_03_beta_unease_01', chapter03Beta, '你忽然感觉到一种非常不安的感觉，感觉马上要发生不好的事情了。大家决定先回营地，再讨论后面应该怎么办。', 'chapter_03_beta_knife_01'), line('chapter_03_beta_knife_01', chapter03Beta, '在离开时你发现明浩从顾书的尸体衣服里抽出一把白色的匕首，小心谨慎地塞到了自己的袖子中。', 'chapter_03_beta_choice04_setup_01'), line('chapter_03_beta_choice04_setup_01', chapter03Beta, '你大脑一时有点宕机，你不明白明浩为什么要把匕首偷偷藏起来，难道是他杀了顾书欺骗了大家吗？你做了最坏的打算——明浩很有可能被山神取代了。', 'chapter_03_beta_choice04_setup_02'), line('chapter_03_beta_choice04_setup_02', chapter03Beta, '但你还是抱有一丝期望，趁大家没注意，你拉着明浩走在队伍的最后面，没有人注意到你们，虽然很危险，但你还是决定跟明浩聊聊这回事。', 'choice_04_trust_minghao'), {
        id: 'choice_04_trust_minghao',
        type: 'choice',
        chapter: chapter03Beta,
        text: '抉择4 - 是否信任明浩',
        choices: [{
          id: 'choice_04_gamma_hand_over',
          text: 'A. 跟明浩好好聊一下，让他把匕首交出来',
          target: 'chapter_04_gamma_collapse_01',
          requires: [{
            kind: 'ending',
            key: 'luckyCrash'
          }]
        }, {
          id: 'choice_04_hand_over',
          text: 'A. 跟明浩好好聊一下，让他把匕首交出来',
          target: 'chapter_03_beta_trust_a_01',
          requires: [{
            kind: 'ending',
            key: 'luckyCrash',
            value: false
          }]
        }, {
          id: 'choice_04_open_up',
          text: 'B. 跟明浩好好聊一下，让他敞开心扉',
          target: 'chapter_03_beta_trust_b_01',
          requires: [{
            kind: 'ending',
            key: 'luckyCrash',
            value: false
          }]
        }, {
          id: 'choice_04_distrust',
          text: 'C. 跟明浩好好聊一下，但是没法信任他',
          target: 'chapter_03_beta_madness_01',
          requires: [{
            kind: 'ending',
            key: 'luckyCrash',
            value: false
          }],
          effects: [{
            kind: 'ending',
            key: 'madness'
          }, {
            kind: 'death'
          }]
        }]
      }, line('chapter_03_beta_trust_a_01', chapter03Beta, '明浩告诉你，这个匕首是他从顾书身上发现的，刀上没有沾染血迹，所以有可能是顾书准备拿这把刀杀掉别人时还没掏出刀就被先一步反杀了。', 'chapter_03_beta_trust_a_02'), line('chapter_03_beta_trust_a_02', chapter03Beta, '他自己偷偷带走这把刀是为了保护自己，但是他不愿意把刀给你。', 'chapter_03_beta_return_camp_01'), line('chapter_03_beta_trust_b_01', chapter03Beta, '明浩告诉你，这个匕首是他从顾书身上发现的，刀上没有沾染血迹，所以有可能是顾书准备拿这把刀杀掉别人时还没掏出刀就被先一步反杀了。明浩自己偷偷带走这把刀是为了保护自己。', 'chapter_03_beta_return_camp_01'), line('chapter_03_beta_madness_01', chapter03Beta, '恐惧是一颗种子。你想起明浩藏在身上的利刃，想起他随口搪塞的防身说辞，此刻再听，只觉得句句都是刻意的伪装。你再也无法相信他半分，心底的猜忌肆意疯长。', 'chapter_03_beta_madness_02'), line('chapter_03_beta_madness_02', chapter03Beta, '在这座被邪神盘踞的深山里，任何一点隐秘都可能招来杀身之祸，你无比惧怕，明浩暗藏的秘密，终将拖垮所有人，让你葬身于此。', 'chapter_03_beta_madness_03'), line('chapter_03_beta_madness_03', chapter03Beta, '折返营地后，压在心底的不安彻底压垮了理智，你趁着夜色，偷偷将明浩私藏刀具的事全盘告诉了陈杰几人。昏暗的营灯下，所有人的脸色都沉得吓人，无边的猜忌与恐慌笼罩了众人。', 'chapter_03_beta_madness_04'), line('chapter_03_beta_madness_04', chapter03Beta, '一番低声商议，大家一致决定将明浩绑在树上，隔绝这个潜藏的隐患。时间在山林的死寂与阴寒里缓缓流逝。', 'chapter_03_beta_madness_05'), line('chapter_03_beta_madness_05', chapter03Beta, '被禁锢的明浩成了所有人的心病，山间的诡异怪事不断发酵，积压的恐惧日夜啃噬着众人的心神。不知是谁最先压低声音，抛出了那个疯狂的提议——处死明浩，永绝后患。', 'chapter_03_beta_madness_06'), line('chapter_03_beta_madness_06', chapter03Beta, '起初，所有人都在抗拒、在摇头，残存的理智死死拽住众人，没人愿意亲手沾染血腥。可这座邪山像一张密不透风的蛛网，不断压榨着众人的底线。', 'chapter_03_beta_madness_07'), line('chapter_03_beta_madness_07', chapter03Beta, '未知的恐惧、紧绷的神经、无处可逃的绝望层层叠加，一点点吞噬掉所有人的良知与悲悯。抗拒的声音越来越弱，最后彻底消散在阴冷的山风里。', 'chapter_03_beta_madness_08'), line('chapter_03_beta_madness_08', chapter03Beta, '恐惧彻底支配了所有人，疯狂彻底取代了理智。明浩最终还是烧死在了众人的猜忌里。', 'chapter_03_beta_madness_09'), line('chapter_03_beta_madness_09', chapter03Beta, '看着尘埃落定的结局，你心底没有半分悲悯，反而滋生出一丝扭曲的窃喜，仿佛除掉隐患，自己就能彻底安稳，逃出生天。', 'chapter_03_beta_madness_10'), line('chapter_03_beta_madness_10', chapter03Beta, '可你根本不懂，人性的疯狂一旦开启，就再也没有停下的可能。杀戮是无解的恶性循环，一旦沾染，便会层层反噬，无人能够独善其身。', 'chapter_03_beta_madness_11'), line('chapter_03_beta_madness_11', chapter03Beta, '终于，轮回降临到了你身上，火焰慢慢将你吞噬。弥留之际，你清清楚楚看见，昔日朋友的脸上，没有半分犹豫与不忍，只剩如出一辙的、冰冷畅快的笑容。', 'chapter_03_beta_madness_12'), line('chapter_03_beta_madness_12', chapter03Beta, '原来在这场深山的疯狂里，从来没有谁是无辜的幸存者。BAD END 1 - 《疯狂》', 'chapter_03_beta_hint_madness'), line('chapter_03_beta_hint_madness', chapter03Beta, '提示8：野火烧不尽，春风吹又生说的就是你吧！绝境之下的疯狂是真的很可怕呢！', 'chapter_03_beta_rewind_madness'), line('chapter_03_beta_rewind_madness', chapter03Beta, '死亡回溯。你再次回到了与明浩谈话的时候。', 'choice_04_trust_minghao'), line('chapter_03_beta_return_camp_01', chapter03Beta, '一行人满心不安赶回营地，刚靠近越野车，所有人脚步猛地顿住。方才留在营地检修车胎的正宇横躺在车身旁的泥地上，鲜血浸透身下泥土，早已没了气息。', 'chapter_03_beta_sunuo_accuse_01'), line('chapter_03_beta_sunuo_accuse_01', chapter03Beta, '“正宇不是一直跟你一起行动的吗，陈杰。”', 'chapter_03_beta_sunuo_accuse_02', '苏糯'), line('chapter_03_beta_sunuo_accuse_02', chapter03Beta, '苏糯的声音微微颤抖，', 'chapter_03_beta_sunuo_accuse_03'), line('chapter_03_beta_sunuo_accuse_03', chapter03Beta, '“是你杀了正宇的吧。”', 'chapter_03_beta_chenjie_defend_01', '苏糯'), line('chapter_03_beta_chenjie_defend_01', chapter03Beta, '“不是我。”', 'chapter_03_beta_chenjie_defend_02', '陈杰'), line('chapter_03_beta_chenjie_defend_02', chapter03Beta, '陈杰依旧是那副冷静的表情，', 'chapter_03_beta_chenjie_defend_03'), line('chapter_03_beta_chenjie_defend_03', chapter03Beta, '“正宇跟我在一起的时候突然想到了什么事情，一定要回营地去检查。当时听到有人在叫我们过去，我就跟他分开了。”', 'chapter_03_beta_minghao_body_01', '陈杰'), line('chapter_03_beta_minghao_body_01', chapter03Beta, '明浩快步上前蹲下身仔细查验尸体，指尖避开地上血迹，翻看伤口后脸色凝重地开口，他对比着先前顾书的伤势，确认杀害正宇的手法和杀死顾书的相似，胸前同样是两道深深的刀伤。', 'chapter_03_beta_minghao_impossible_01'), line('chapter_03_beta_minghao_impossible_01', chapter03Beta, '“这不可能，”', 'chapter_03_beta_minghao_impossible_02', '明浩'), line('chapter_03_beta_minghao_impossible_02', chapter03Beta, '明浩皱起眉头，', 'chapter_03_beta_minghao_impossible_03'), line('chapter_03_beta_minghao_impossible_03', chapter03Beta, '“伤口是在胸前形成的，陈杰正面怎么可能打的过正宇，不光是陈杰，咱们社团里的人谁都不是正宇的对手。”', 'chapter_03_beta_morning_argument_01', '明浩'), line('chapter_03_beta_morning_argument_01', chapter03Beta, '“难道真的是山神干得吗？”', 'chapter_03_beta_morning_argument_01_narration', '苏糯'), line('chapter_03_beta_morning_argument_01_narration', chapter03Beta, '苏糯声音也有点害怕了，', 'chapter_03_beta_morning_argument_01_reply'), line('chapter_03_beta_morning_argument_01_reply', chapter03Beta, '“难道是今天早上的事情惹怒了山神，山神用这种方式来惩罚我们。。。”', 'chapter_03_beta_morning_argument_02', '苏糯'), line('chapter_03_beta_morning_argument_02', chapter03Beta, '“我就说今天早上一定死了什么东西吧，你们真的太残忍了。。。”', 'chapter_03_beta_morning_argument_02_narration', '小月'), line('chapter_03_beta_morning_argument_02_narration', chapter03Beta, '小月撇嘴。', 'chapter_03_beta_morning_argument_03'), line('chapter_03_beta_morning_argument_03', chapter03Beta, '“今天早上的事情就不提了吧，”', 'chapter_03_beta_morning_argument_03_narration', '阿泰'), line('chapter_03_beta_morning_argument_03_narration', chapter03Beta, '阿泰有点不开心，', 'chapter_03_beta_morning_argument_03_reply'), line('chapter_03_beta_morning_argument_03_reply', chapter03Beta, '“我不相信什么山神邪神的，邪神山神的怎么会用刀来致人性命。”', 'chapter_03_beta_morning_argument_04', '阿泰'), line('chapter_03_beta_morning_argument_04', chapter03Beta, '“有什么不能说的，切。”', 'chapter_03_beta_morning_argument_04_narration', '陈杰'), line('chapter_03_beta_morning_argument_04_narration', chapter03Beta, '陈杰满不在乎但还是被明浩堵住了嘴。', 'chapter_03_beta_morning_argument_05'), line('chapter_03_beta_morning_argument_05', chapter03Beta, '“队里的女生都很害怕了，这时候就不要说了。”', 'chapter_03_beta_morning_argument_05_narration', '明浩'), line('chapter_03_beta_morning_argument_05_narration', chapter03Beta, '明浩拍拍陈杰的肩膀。阿泰对着他们两个点点头。', 'chapter_03_beta_clue_morning'), line('chapter_03_beta_clue_morning', chapter03Beta, '获得线索2“今天早上的事情”：大家似乎都不愿意提及今天早上的事情，除了他。', 'chapter_03_beta_tire_01', undefined, [{
        kind: 'clue',
        key: 'morningIncident'
      }]), line('chapter_03_beta_tire_01', chapter03Beta, '大家的争论喋喋不休。你注意到车胎下面有亮闪闪的东西，像是有人塞到车胎下的。但大家就正宇的死亡吵个不停，你也不敢贸然发言害怕引火上身。', 'chapter_03_beta_clue_tire'), line('chapter_03_beta_clue_tire', chapter03Beta, '获得线索3“车胎下的闪光”：难道是...？', 'chapter_03_beta_watch_setup_01', undefined, [{
        kind: 'clue',
        key: 'tireShine'
      }]), line('chapter_03_beta_watch_setup_01', chapter03Beta, '也不知道争吵了多久，吵到大家都累了。最后商量决定，所有人挤到一个大帐篷里面休息避险，同时必须单独推选一个人负责守夜，处理杀人犯还是什么凶神的报复。', 'choice_05_watch_beta'), {
        id: 'choice_05_watch_beta',
        type: 'choice',
        chapter: chapter03Beta,
        text: '抉择5 - 守夜人的选择？β',
        choices: [{
          id: 'choice_05_self',
          text: 'A. 你自己',
          target: 'chapter_03_beta_death_watch_self',
          effects: [{
            kind: 'ending',
            key: 'choice05Self'
          }, {
            kind: 'death'
          }]
        }, {
          id: 'choice_05_minghao',
          text: 'B. 明浩',
          target: 'chapter_03_beta_night_01'
        }, {
          id: 'choice_05_atai',
          text: 'C. 阿泰',
          target: 'choice_06_night_action'
        }, {
          id: 'choice_05_xiaoyue',
          text: 'D. 小月',
          target: 'choice_06_night_action'
        }, {
          id: 'choice_05_sunuo',
          text: 'E. 苏糯',
          target: 'choice_06_night_action'
        }, {
          id: 'choice_05_chenjie',
          text: 'F. 陈杰',
          target: 'choice_06_night_action'
        }]
      }, line('chapter_03_beta_death_watch_self', chapter03Beta, '你的大脑连轴转了一天，却还是要当守夜人，没有得到一点休息的你不小心在守夜的过程中睡着了，结果再也没有醒来。', 'chapter_03_beta_rewind_watch_self'), line('chapter_03_beta_rewind_watch_self', chapter03Beta, '死亡回溯。你再次回到了守夜人的选择。', 'choice_05_watch_beta'), {
        id: 'choice_06_night_action',
        type: 'choice',
        chapter: chapter03Beta,
        text: '抉择6 - 夜晚的行动？β',
        choices: [{
          id: 'choice_06_sleep',
          text: 'A. 睡觉',
          target: 'chapter_03_beta_death_sleep',
          effects: [{
            kind: 'ending',
            key: 'choice06Sleep'
          }, {
            kind: 'death'
          }]
        }, {
          id: 'choice_06_steal',
          text: 'B. 去偷明浩的匕首',
          target: 'chapter_03_beta_death_steal',
          effects: [{
            kind: 'ending',
            key: 'choice06Steal'
          }, {
            kind: 'death'
          }]
        }]
      }, line('chapter_03_beta_death_sleep', chapter03Beta, '今天的信息量实在太大了，就算是片刻的睡眠也是值得的，你陷入了深深的睡眠，再也没有醒来。', 'chapter_03_beta_rewind_sleep'), line('chapter_03_beta_rewind_sleep', chapter03Beta, '死亡回溯。你再次回到了夜晚的行动选择。', 'choice_06_night_action'), line('chapter_03_beta_death_steal', chapter03Beta, '你选择了在他睡着时偷他的匕首，但你还没摸到他的口袋时，他的刀就已经插入你的胸前了，他睁开眼睛时比你还感到不可思议。', 'chapter_03_beta_clue_minghao_sleep'), line('chapter_03_beta_clue_minghao_sleep', chapter03Beta, '获得线索4“明浩的睡眠问题”：原来他今晚本就都不打算睡，一直在等待盯上他的凶手上钩。', 'chapter_03_beta_hint_watch', undefined, [{
        kind: 'clue',
        key: 'minghaoSleep'
      }]), line('chapter_03_beta_hint_watch', chapter03Beta, '提示9：武力最强的应该适合当守夜人吧。', 'chapter_03_beta_rewind_watch'), line('chapter_03_beta_rewind_watch', chapter03Beta, '死亡回溯。你再次回到了守夜人的选择。', 'choice_05_watch_beta'), line('chapter_03_beta_night_01', chapter03Beta, '你从昏沉的睡意里猛地惊醒，耳边骤然炸开苏糯撕心裂肺的尖叫。只见她疯了似的甩开所有人，径直往漆黑幽深的树林深处狂奔。', 'chapter_03_beta_night_02'), line('chapter_03_beta_night_02', chapter03Beta, '小月见状连忙快步追上前，想要拉住她安抚情绪。车里其余人连同守夜的同伴全都愣在原地，手足无措，一时间根本不知道该上前阻拦还是原地待命。', 'chapter_03_beta_night_03'), line('chapter_03_beta_night_03', chapter03Beta, '看着苏糯孤身冲进危机四伏的密林，你心底瞬间涌上强烈的不安，笃定她此刻随时会遭遇不测。', 'choice_07_chase_beta'), {
        id: 'choice_07_chase_beta',
        type: 'choice',
        chapter: chapter03Beta,
        text: '抉择7 - 追击选择β\n你打算追上去帮助苏糯，你此时的举动：',
        choices: [{
          id: 'choice_07_alone',
          text: 'A. 自己追上去',
          target: 'chapter_03_beta_death_chase_alone',
          effects: [{
            kind: 'ending',
            key: 'choice07Alone'
          }, {
            kind: 'death'
          }]
        }, {
          id: 'choice_07_with_minghao',
          text: 'B. 喊明浩一起追上去',
          target: 'chapter_03_beta_chase_minghao_01'
        }]
      }, line('chapter_03_beta_death_chase_alone', chapter03Beta, '你独自一人追入森林，没有从森林中回来。', 'chapter_03_beta_rewind_chase_alone'), line('chapter_03_beta_rewind_chase_alone', chapter03Beta, '死亡回溯。你再次回到了追击选择。', 'choice_07_chase_beta'), line('chapter_03_beta_chase_minghao_01', chapter03Beta, '明浩应声立刻拔腿冲了出去，速度远快于你，你拼尽全力也没法追上他。你只能循着几人留在泥土里的脚印一路追赶。', 'chapter_03_beta_chase_minghao_02'), line('chapter_03_beta_chase_minghao_02', chapter03Beta, '等你找到那片区域时，已经过去一小段时间了，周遭死寂一片，安静得反常，透着一股说不出的诡异。', 'choice_08_crisis_beta'), {
        id: 'choice_08_crisis_beta',
        type: 'choice',
        chapter: chapter03Beta,
        text: '抉择8 - 危机时刻β\n你此时的举动：',
        choices: [{
          id: 'choice_08_check',
          text: 'A. 立马上前查看',
          target: 'chapter_03_beta_death_minghao_01',
          effects: [{
            kind: 'ending',
            key: 'minghaoKnife'
          }, {
            kind: 'death'
          }]
        }, {
          id: 'choice_08_help_chenjie',
          text: 'B. 感到危险，回去搬救兵',
          target: 'chapter_03_beta_death_chenjie_01',
          requires: [{
            kind: 'flag',
            key: 'betaTeamSunuo',
            value: false
          }],
          effects: [{
            kind: 'ending',
            key: 'chenjieFork'
          }, {
            kind: 'death'
          }]
        }, {
          id: 'choice_08_help_zhengyu',
          text: 'B. 感到危险，回去搬救兵',
          target: 'chapter_03_beta_death_zhengyu_01',
          requires: [{
            kind: 'flag',
            key: 'betaTeamSunuo'
          }],
          effects: [{
            kind: 'ending',
            key: 'zhengyuInevitable'
          }, {
            kind: 'death'
          }]
        }]
      }, line('chapter_03_beta_death_minghao_01', chapter03Beta, '你上前查看钻入丛林，向前望去，血泊之中静静躺着苏糯的尸体，尸体上插着一把水果刀，早已没了生机。', 'chapter_03_beta_death_minghao_02'), line('chapter_03_beta_death_minghao_02', chapter03Beta, '你看向一旁，发现明浩把匕首从小月的胸前拔出来，死死地盯着你，你转身就跑但还是死在了明浩的匕首之下。BE2《你跑不过我，你信吗》', 'chapter_03_beta_clue_minghao'), line('chapter_03_beta_clue_minghao', chapter03Beta, '获得线索5“明浩”', 'chapter_03_beta_rewind_crisis', undefined, [{
        kind: 'clue',
        key: 'minghao'
      }]), line('chapter_03_beta_rewind_crisis', chapter03Beta, '死亡回溯。你再次回到了危机时刻。', 'choice_08_crisis_beta'), line('chapter_03_beta_death_chenjie_01', chapter03Beta, '你慌忙转身往营地狂奔，想回去喊其他人过来帮忙。等冲回停在营地的车中时，阿泰倒在车中没了气息。', 'chapter_03_beta_death_chenjie_02'), line('chapter_03_beta_death_chenjie_02', chapter03Beta, '你下意识回头，陈杰突然从侧面冲出来将你狠狠绊倒，紧接着握着叉子往你脖子插下去一刀致命。BE3《杰哥不要啊》', 'chapter_03_beta_clue_chenjie'), line('chapter_03_beta_clue_chenjie', chapter03Beta, '获得线索6“陈杰”', 'chapter_03_beta_hint_dead_end', undefined, [{
        kind: 'clue',
        key: 'chenJie'
      }]), line('chapter_03_beta_death_zhengyu_01', chapter03Beta, '你慌忙折返营地打算找人相助，却看见留守的所有人全都倒在血泊之中，下手的正是平常老实巴交的正宇。', 'chapter_03_beta_death_zhengyu_02'), line('chapter_03_beta_death_zhengyu_02', chapter03Beta, '他站在遍地尸体之间，一双眼睛死死锁定你，眼神怪异又阴冷。BE4《I am inevitable（我既是天命）》', 'chapter_03_beta_clue_zhengyu'), line('chapter_03_beta_clue_zhengyu', chapter03Beta, '获得线索7“正宇”', 'chapter_03_beta_hint_dead_end', undefined, [{
        kind: 'clue',
        key: 'zhengYu'
      }]), line('chapter_03_beta_hint_dead_end', chapter03Beta, '提示10：这条支线到这里似乎已经走不通了，但是你获得了几个宝贵的线索，是从哪里开始走错的呢？正宇又是为什么会死呢？早上的情况又是怎样的呢？', 'chapter_03_beta_return_choice02_01'), line('chapter_03_beta_return_choice02_01', chapter03Beta, '你已经拿到了线索，现在回到抉择2那里问问他早上发生了什么吧，会获得新的路线哦。', 'choice_02_team'), line('chapter_03_alpha_camp_01', chapter03Alpha, '正宇似乎在营地等了大家很久了。你一下子就注意到了“车胎下的闪光”（线索3），你把你的发现立即告诉正宇。', 'chapter_03_alpha_zhengyu_01'), line('chapter_03_alpha_zhengyu_01', chapter03Alpha, '“我就说我总感觉在车边见过钥匙，在这边找了半天也没有找到。居然被塞在车胎下啊。”', 'chapter_03_alpha_zhengyu_02', '正宇'), line('chapter_03_alpha_zhengyu_02', chapter03Alpha, '只见正宇抬车的双手一使劲，车子一角被微微抬起。', 'chapter_03_alpha_zhengyu_03'), line('chapter_03_alpha_zhengyu_03', chapter03Alpha, '“快，把钥匙从车胎下抽出来。”', 'chapter_03_alpha_keys_01', '正宇'), line('chapter_03_alpha_keys_01', chapter03Alpha, '我们获得了车钥匙。车子能够正常进入休息躲避了。我们打开了车子里的手机，发现早已损坏了。', 'chapter_03_alpha_keys_02'), line('chapter_03_alpha_keys_02', chapter03Alpha, '不过山中太黑暗，来时的林道也已经被浓雾弥漫，完全看不清楚道路。为了安全起见，大家决定明天一早再下山。大家慢慢没有了精神，开始了短暂的沉默。', 'chapter_03_alpha_chenjie_01'), line('chapter_03_alpha_chenjie_01', chapter03Alpha, '陈杰冷不丁说了一句。', 'chapter_03_alpha_chenjie_02'), line('chapter_03_alpha_chenjie_02', chapter03Alpha, '“正宇，都这样了。还藏钥匙合适吗？真不知道你是没有危机意识还是迟钝。”', 'chapter_03_alpha_argument_01', '陈杰'), line('chapter_03_alpha_argument_01', chapter03Alpha, '正宇慌了神，本就不善言辞的他不知道该如何辩解。明浩和阿泰一直力挺正宇，最后以陈杰不再讲话结束。', 'chapter_03_alpha_watch_setup_01'), line('chapter_03_alpha_watch_setup_01', chapter03Alpha, '众人短暂商量后做出决定，所有人挤到一个大帐篷内休息避险，同时必须单独推选一个人负责守夜，处理意外风险。', 'choice_05_watch_alpha'), {
        id: 'choice_05_watch_alpha',
        type: 'choice',
        chapter: chapter03Alpha,
        text: '抉择5 - 守夜人的选择？α',
        choices: [{
          id: 'choice_05_alpha_minghao',
          text: 'A. 明浩',
          target: 'chapter_03_delta_night_01'
        }, {
          id: 'choice_05_alpha_zhengyu',
          text: 'B. 正宇',
          target: 'chapter_03_alpha_night_01'
        }]
      }, line('chapter_03_delta_night_01', chapter03Delta, '你从昏沉的睡意里猛地惊醒，耳边骤然炸开苏糯撕心裂肺的尖叫。只见她疯了似的甩开所有人，径直往漆黑幽深的树林深处狂奔。小月见状连忙快步追上前，想要拉住她安抚情绪。', 'chapter_03_delta_night_02'), line('chapter_03_delta_night_02', chapter03Delta, '车里其余人连同守夜的同伴全都愣在原地，手足无措，一时间根本不知道该上前阻拦还是原地待命。看着苏糯孤身冲进危机四伏的密林，你心底瞬间涌上强烈的不安，笃定她此刻随时会遭遇不测。', 'choice_07_chase_delta'), {
        id: 'choice_07_chase_delta',
        type: 'choice',
        chapter: chapter03Delta,
        text: '抉择7 - 追击选择δ\n你打算追上去帮助苏糯，你此时的举动：',
        choices: [{
          id: 'choice_07_delta_minghao',
          text: 'A. 喊明浩一起追上去',
          target: 'choice_08_crisis_beta'
        }, {
          id: 'choice_07_delta_zhengyu',
          text: 'B. 喊正宇一起追上去',
          target: 'chapter_03_delta_death_01',
          effects: [{
            kind: 'ending',
            key: 'deltaXiaoyue'
          }, {
            kind: 'death'
          }]
        }]
      }, line('chapter_03_delta_death_01', chapter03Delta, '正宇跑得慢，没有赶上你。你先一步钻入丛林，向前望去，血泊之中静静躺着苏糯的尸体，一动不动。', 'chapter_03_delta_death_02'), line('chapter_03_delta_death_02', chapter03Delta, '你正愣在原地满心惊骇，毫无防备之际，小月猛地持匕首狠狠捅进你的胸口。她抬眼看向你，脸上扯出一抹从未见过的阴森诡异的笑容。', 'chapter_03_delta_hint_11'), line('chapter_03_delta_hint_11', chapter03Delta, '提示11：这条线好像是死路一条呢，但是好像藏了一点线索。', 'choice_05_watch_alpha'), line('chapter_03_alpha_night_01', chapter03Alpha, '你从昏沉的睡意里猛地惊醒，耳边骤然炸开苏糯撕心裂肺的尖叫。只见她疯了似的甩开所有人，径直往漆黑幽深的树林深处狂奔。小月见状连忙快步追上前，想要拉住她安抚情绪。', 'chapter_03_alpha_night_02'), line('chapter_03_alpha_night_02', chapter03Alpha, '车里其余人连同守夜的同伴全都愣在原地，手足无措，一时间根本不知道该上前阻拦还是原地待命。看着苏糯孤身冲进危机四伏的密林，你心底瞬间涌上强烈的不安，笃定她此刻随时会遭遇不测。', 'choice_07_chase_alpha'), {
        id: 'choice_07_chase_alpha',
        type: 'choice',
        chapter: chapter03Alpha,
        text: '抉择7 - 追击选择α\n你打算追上去帮助苏糯，你此时的举动：',
        choices: [{
          id: 'choice_07_alpha_minghao',
          text: 'A. 喊明浩一起追上去',
          target: 'chapter_03_alpha_run_minghao_01'
        }, {
          id: 'choice_07_alpha_zhengyu',
          text: 'B. 喊正宇一起追上去',
          target: 'chapter_03_alpha_death_xiaoyue_01',
          effects: [{
            kind: 'ending',
            key: 'alphaXiaoyue'
          }, {
            kind: 'death'
          }]
        }]
      }, line('chapter_03_alpha_death_xiaoyue_01', chapter03Alpha, '正宇跑得慢，没有赶上你。你先一步钻入丛林，向前望去，血泊之中静静躺着苏糯的尸体，一动不动。', 'chapter_03_alpha_death_xiaoyue_02'), line('chapter_03_alpha_death_xiaoyue_02', chapter03Alpha, '你正愣在原地满心惊骇，毫无防备之际，小月猛地持匕首狠狠捅进你的胸口。她抬眼看向你，脸上扯出一抹从未见过的阴森诡异的笑容。', 'choice_07_chase_alpha'), line('chapter_03_alpha_run_minghao_01', chapter03Alpha, '明浩应声冲了出去。你忽然想起了什么线索，喊住明浩，让他拉着你一起跑过去。', 'choice_09_together_alpha'), {
        id: 'choice_09_together_alpha',
        type: 'choice',
        chapter: chapter03Alpha,
        text: '抉择9 - 共同行动\n明浩拉着你依然不减多少速度，你拼尽全力跟上明浩，到达脚印处时还能听到苏糯的尖叫声。此时要不要跟明浩一起进去查看情况？',
        choices: [{
          id: 'choice_09_enter_together',
          text: 'A. 一起进去',
          target: 'chapter_03_alpha_rescue_01'
        }, {
          id: 'choice_09_return_together',
          text: 'B. 一起回来搬救兵',
          target: 'chapter_03_epsilon_return_01'
        }, {
          id: 'choice_09_return_alone',
          text: 'C. 自己回来搬救兵',
          target: 'chapter_03_alpha_choice09_warning'
        }]
      }, line('chapter_03_alpha_choice09_warning', chapter03Alpha, '你感觉到好像今天晚上自己一个人做什么事情都有点不顺利。你确定还要只身前往吗？再想想吧。', 'choice_09_together_alpha'), line('chapter_03_epsilon_return_01', chapter03Epsilon, '你和明浩意识到单凭你们两人根本处理不了眼下的状况，连忙折返营地，把其余所有人都喊过来。等一行人赶回原地，只看见苏糯倒在地上没了气息。所幸你们很快就在附近逮住了试图逃窜的小月。', 'chapter_03_epsilon_camp_01'), line('chapter_03_epsilon_camp_01', chapter03Epsilon, '一行人押着小月回到营地，众人找来绳索捆住她的手脚，将她单独反锁在越野车内。随后大家围坐一团，复盘这一整天接连发生的诡异惨案。', 'chapter_03_epsilon_camp_02'), line('chapter_03_epsilon_camp_02', chapter03Epsilon, '路上小月嘴里一直神神叨叨，反复念叨死亡、力量这类瘆人的话语，听得所有人心底发毛。恐惧之下，大家已然默认小月是被邪神附了身。眼下小月已经被控制，众人打算暂且休整，等到天亮便带着她下山交给警方。', 'chapter_03_epsilon_camp_03'), line('chapter_03_epsilon_camp_03', chapter03Epsilon, '可只有你已经注意到陈杰举止反常、处处透着不对劲。你心里反复纠结，拿不定主意该不该此刻就把自己的怀疑说出来告知所有人。', 'choice_10_expose_chenjie'), {
        id: 'choice_10_expose_chenjie',
        type: 'choice',
        chapter: chapter03Epsilon,
        text: '抉择10 - 是否揭发陈杰\n是否把自己的怀疑告诉大家？',
        choices: [{
          id: 'choice_10_tell',
          text: 'A. 告诉大家',
          target: 'chapter_03_epsilon_tell_01',
          effects: [{
            kind: 'ending',
            key: 'epsilonZhengyu'
          }, {
            kind: 'death'
          }]
        }, {
          id: 'choice_10_silence',
          text: 'B. 不告诉大家',
          target: 'chapter_03_epsilon_silence_01',
          effects: [{
            kind: 'ending',
            key: 'epsilonSleep'
          }, {
            kind: 'death'
          }]
        }]
      }, line('chapter_03_epsilon_tell_01', chapter03Epsilon, '陈杰本就性子冷淡、向来不讨众人喜欢，再加上阿泰极力附和你的说法，大家商议后干脆把陈杰也捆起来关进车里，让他和小月相互隔开，谁也没法伤害旁人。', 'chapter_03_epsilon_tell_02'), line('chapter_03_epsilon_tell_02', chapter03Epsilon, '虽说眼下两个疑似被邪神附身的人都被控制住，可你心底的疑虑丝毫没有消散，总觉得事情绝不会就此草草收场。等身边所有人都沉沉睡去，你紧绷的神经才稍稍放松，昏昏沉沉闭眼休息。', 'chapter_03_epsilon_tell_03'), line('chapter_03_epsilon_tell_03', chapter03Epsilon, '等你再次惊醒，正宇站在遍地尸体之间，一双眼睛死死锁定你，眼神怪异又阴冷。BE4《I am inevitable（我既是天命）》', 'chapter_03_epsilon_clue_zhengyu'), line('chapter_03_epsilon_clue_zhengyu', chapter03Epsilon, '获得线索6“正宇”', 'chapter_03_epsilon_hint_12', undefined, [{
        kind: 'clue',
        key: 'zhengYu'
      }]), line('chapter_03_epsilon_silence_01', chapter03Epsilon, '你心里根本无法确定陈杰究竟是不是被邪神附体，又暗自后怕，万一猜错走漏风声，反倒会引来暗处的恶徒报复、招来杀身之祸。', 'chapter_03_epsilon_silence_02'), line('chapter_03_epsilon_silence_02', chapter03Epsilon, '众人围坐讨论至深夜，翻来覆去也没捋出半点头绪。高度紧绷的肾上腺素渐渐褪去，疲惫像猛兽一样彻底席卷全身，大家只好暂且停下争辩，准备休息片刻。可这一睡，你再也没能睁开双眼。', 'chapter_03_epsilon_hint_12'), line('chapter_03_epsilon_hint_12', chapter03Epsilon, '提示12：那个女生的生存情况已经迫在眉睫了，试着救救她吧。', 'choice_09_together_alpha'), line('chapter_03_alpha_rescue_01', chapter03Alpha, '你跟明浩一同冲上前，只见小月手里攥着一把水果刀，苏糯吓得蹲在一边不敢动弹。你二人立刻合力上前压制，死死抓住小月，把她控制住。', 'chapter_03_alpha_aftermath_01'), line('chapter_03_alpha_aftermath_01', chapter03Alpha, '夜幕沉沉压在营地之上，篝火只剩下一点将熄的暗红余烬，风钻过帐篷缝隙，发出细碎呜咽般的声响。一行人押着小月回到营地，众人找来绳索捆住她的手脚，将她单独反锁在越野车内。', 'chapter_03_alpha_aftermath_02'), line('chapter_03_alpha_aftermath_02', chapter03Alpha, '随后大家围坐一团，复盘这一整天接连发生的诡异惨案。路上小月嘴里一直神神叨叨，反复念叨死亡、力量这类瘆人的话语，听得所有人心底发毛。恐惧之下，大家已然默认小月是被邪神附了身。', 'chapter_03_alpha_sunuo_01'), line('chapter_03_alpha_sunuo_01', chapter03Alpha, '苏糯自打回到营地，哭声就没有断过。一会儿是爆发的哭喊，一会儿是压抑、断断续续的抽噎。整夜那细碎的啜泣声反反复复钻入耳膜，营地里没有人能够安睡。', 'chapter_03_alpha_sunuo_02'), line('chapter_03_alpha_sunuo_02', chapter03Alpha, '所有人都被这哭声搅得心神惶惶不安，心底悬着一团解不开的迷雾。无数疑问在你心底盘旋。你决定避开众人，私下找营中的人暗中问话。', 'choice_11_chat_alpha'), {
        id: 'choice_11_chat_alpha',
        type: 'choice',
        chapter: chapter03Alpha,
        text: '抉择11 - 选谁聊天（可选3个）\n提示13：最好先选明浩。',
        choices: [interviewChoice(1, 'choice_11_minghao', 'A. 明浩', 'chapter_03_alpha_chat_minghao_01', 'chatMinghao'), interviewChoice(1, 'choice_11_xiaoyue', 'B. 小月', 'chapter_03_alpha_chat_xiaoyue_01', 'chatXiaoyue'), interviewChoice(1, 'choice_11_atai', 'C. 阿泰', 'chapter_03_alpha_chat_atai_01', 'chatAtai'), interviewChoice(1, 'choice_11_zhengyu', 'D. 正宇', 'chapter_03_alpha_chat_zhengyu_01', 'chatZhengyu'), interviewChoice(1, 'choice_11_sunuo', 'E. 苏糯', 'chapter_03_alpha_chat_sunuo_01', 'chatSunuo'), interviewChoice(2, 'choice_11_minghao', 'A. 明浩', 'chapter_03_alpha_chat_minghao_01', 'chatMinghao'), interviewChoice(2, 'choice_11_xiaoyue', 'B. 小月', 'chapter_03_alpha_chat_xiaoyue_01', 'chatXiaoyue'), interviewChoice(2, 'choice_11_atai', 'C. 阿泰', 'chapter_03_alpha_chat_atai_01', 'chatAtai'), interviewChoice(2, 'choice_11_zhengyu', 'D. 正宇', 'chapter_03_alpha_chat_zhengyu_01', 'chatZhengyu'), interviewChoice(2, 'choice_11_sunuo', 'E. 苏糯', 'chapter_03_alpha_chat_sunuo_01', 'chatSunuo'), interviewChoice(3, 'choice_11_minghao', 'A. 明浩', 'chapter_03_alpha_chat_minghao_01', 'chatMinghao'), interviewChoice(3, 'choice_11_xiaoyue', 'B. 小月', 'chapter_03_alpha_chat_xiaoyue_01', 'chatXiaoyue'), interviewChoice(3, 'choice_11_atai', 'C. 阿泰', 'chapter_03_alpha_chat_atai_01', 'chatAtai'), interviewChoice(3, 'choice_11_zhengyu', 'D. 正宇', 'chapter_03_alpha_chat_zhengyu_01', 'chatZhengyu'), interviewChoice(3, 'choice_11_sunuo', 'E. 苏糯', 'chapter_03_alpha_chat_sunuo_01', 'chatSunuo'), {
          id: 'choice_11_retry',
          text: '重新选择3名聊天对象',
          target: 'choice_11_chat_alpha',
          requires: [{
            kind: 'flag',
            key: 'chatComplete'
          }, {
            kind: 'clue',
            key: 'scissors',
            value: false
          }],
          effects: [{
            kind: 'flag',
            key: 'chatMinghao',
            value: false
          }, {
            kind: 'flag',
            key: 'chatXiaoyue',
            value: false
          }, {
            kind: 'flag',
            key: 'chatAtai',
            value: false
          }, {
            kind: 'flag',
            key: 'chatZhengyu',
            value: false
          }, {
            kind: 'flag',
            key: 'chatSunuo',
            value: false
          }, {
            kind: 'flag',
            key: 'chatRound2',
            value: false
          }, {
            kind: 'flag',
            key: 'chatRound3',
            value: false
          }, {
            kind: 'flag',
            key: 'chatComplete',
            value: false
          }]
        }, {
          id: 'choice_11_chenjie',
          text: '获得丝线剪刀线索后，与陈杰对话',
          target: 'chapter_03_alpha_chat_chenjie_01',
          requires: [{
            kind: 'clue',
            key: 'scissors'
          }, {
            kind: 'flag',
            key: 'chatComplete'
          }],
          effects: [{
            kind: 'ending',
            key: 'luckyCrash'
          }, {
            kind: 'death'
          }]
        }]
      }, line('chapter_03_alpha_chat_minghao_01', chapter03Alpha, '你悄悄找到浩子。你跟他聊起匕首，他偷偷把白色匕首拿出来。营地火光微弱，映照在他手里那物件上。凑近细看才猛然惊觉，那根本就不是匕首。', 'chapter_03_alpha_chat_minghao_02'), line('chapter_03_alpha_chat_minghao_02', chapter03Alpha, '那是层层泛着冷光的银白丝线密密缠绕而成的单瓣剪刀。这似乎不是寻常的物品。', 'chapter_03_alpha_chat_minghao_03'), line('chapter_03_alpha_chat_minghao_03', chapter03Alpha, '“我打算过一会儿去找小月问问这个剪刀是什么。如果她身上真有邪神，那她说不定知道。”', 'chapter_03_alpha_clue_scissors', '明浩'), line('chapter_03_alpha_clue_scissors', chapter03Alpha, '获得线索7：丝线剪刀', 'choice_11_chat_alpha', undefined, [{
        kind: 'clue',
        key: 'scissors'
      }]), line('chapter_03_alpha_chat_xiaoyue_01', chapter03Alpha, '你去车里找到小月。小月垂着头，长发遮住大半张脸，声音轻飘飘的，仿佛不属于她自己。你跟她聊了今天晚上所有发生的事情，她好像不以为意，总说一些驴唇不对马嘴的话。看来从她这里是得到不了什么信息了。', 'chapter_03_alpha_chat_xiaoyue_02'), line('chapter_03_alpha_chat_xiaoyue_02', chapter03Alpha, '“原来你是特殊体质啊。”', 'chapter_03_alpha_chat_xiaoyue_03', '小月'), line('chapter_03_alpha_chat_xiaoyue_03', chapter03Alpha, '你隐约听见看不见的丝线，在黑暗里发出极轻的沙沙摩擦声。', 'chapter_03_alpha_clue_special'), line('chapter_03_alpha_clue_special', chapter03Alpha, '获得线索：特殊体质', 'choice_11_chat_alpha', undefined, [{
        kind: 'clue',
        key: 'specialPhysique'
      }]), line('chapter_03_alpha_chat_atai_01', chapter03Alpha, '你撞见神色恍惚的阿泰。你跟他讨论今晚发生的不合理之处，他突然瞳孔变大。他说苏糯跑走之后，陈杰就在下车寻找餐具，正宇觉得陈杰的举动让他不太舒服，跟他发生了争吵，把他推回去了。', 'chapter_03_alpha_clue_chenjie_anomaly'), line('chapter_03_alpha_clue_chenjie_anomaly', chapter03Alpha, '获得线索8：陈杰的异常', 'choice_11_chat_alpha', undefined, [{
        kind: 'clue',
        key: 'chenJieAnomaly'
      }]), line('chapter_03_alpha_chat_zhengyu_01', chapter03Alpha, '你转而去找正宇谈话。谈到今天早上开车撞到东西的事情，正宇说晚上修车时他仔细查验过轮胎，橡胶纹路之间干干净净，没有半分撞击生物留下的血迹。重重疑点全部汇聚到小月身上，正宇神色凝重，已经准备前去当面质询她。', 'chapter_03_alpha_clue_car_morning'), line('chapter_03_alpha_clue_car_morning', chapter03Alpha, '获得线索9：车子早上的情况', 'choice_11_chat_alpha', undefined, [{
        kind: 'clue',
        key: 'carMorning'
      }]), line('chapter_03_alpha_chat_sunuo_01', chapter03Alpha, '你去找到哭哭啼啼的苏糯，问她为什么今天晚上要自己跑离营地。', 'chapter_03_alpha_chat_sunuo_02'), line('chapter_03_alpha_chat_sunuo_02', chapter03Alpha, '“因为阿泰在梦游，太吓人了，我以为他要杀了我……”', 'chapter_03_alpha_clue_atai_anomaly', '苏糯'), line('chapter_03_alpha_clue_atai_anomaly', chapter03Alpha, '获得线索10：阿泰的异常', 'choice_11_chat_alpha', undefined, [{
        kind: 'clue',
        key: 'ataiAnomaly'
      }]), line('chapter_03_alpha_chat_chenjie_01', chapter03Alpha, '“缠满丝线的剪刀？”', 'chapter_03_alpha_chat_chenjie_02', '陈杰'), line('chapter_03_alpha_chat_chenjie_02', chapter03Alpha, '陈杰眼也不抬地看着面前的火堆。远处，正宇从小面包车走下来，看样子刚和小月谈完话。他前脚刚下车，明浩立刻就钻进车里，准备单独盘问小月。陈杰面无表情打了个哈欠。', 'chapter_03_alpha_chat_chenjie_03'), line('chapter_03_alpha_chat_chenjie_03', chapter03Alpha, '“这座蜘蛛山，又是丝线，怕不是被蜘蛛诅咒的剪刀吧。”', 'chapter_03_alpha_engine_01', '陈杰'), line('chapter_03_alpha_engine_01', chapter03Alpha, '远处传来引擎的轰鸣声。', 'chapter_03_alpha_chat_chenjie_04'), line('chapter_03_alpha_chat_chenjie_04', chapter03Alpha, '“带着这把剪刀的人，说不定更容易被山神附体哦。”', 'chapter_03_alpha_crash_01', '陈杰'), line('chapter_03_alpha_crash_01', chapter03Alpha, '车灯刺破浓稠的夜色，车子没有丝毫减速，径直朝着你的方向猛冲过来。尖锐的风声剥夺了你所有躲闪的余地。', 'chapter_03_alpha_crash_02'), line('chapter_03_alpha_crash_02', chapter03Alpha, '即将撞上你的刹那，你清晰地看到车子后车座上蜷缩着浑身浸透鲜血的小月，和紧握着方向盘的明浩。明浩笑容诡异而狰狞。BE5《撞大运咯》', 'chapter_03_alpha_clue_cursed_scissors'), line('chapter_03_alpha_clue_cursed_scissors', chapter03Alpha, '更新线索7：被山神诅咒的剪刀', 'chapter_03_alpha_questions_01', undefined, [{
        kind: 'clue',
        key: 'scissors'
      }]), line('chapter_03_alpha_questions_01', chapter03Alpha, '故事进展到这里，有几个问题需要思考一下：最初被凶神附体的是谁？一共有几个凶神？凶神附体的条件是什么？', 'chapter_03_alpha_hint_14'), line('chapter_03_alpha_hint_14', chapter03Alpha, '提示14：明浩的剪刀，上次你没要到，这次必须去试一试了。', 'choice_04_trust_minghao'), line('chapter_04_gamma_collapse_01', chapter04Gamma, '你大脑一时有点宕机，你不明白明浩为什么要把匕首偷偷藏起来。顾书一定是被山神取代了，奇怪，你为什么这么笃定呢。不对，明浩不是山神，他明明那么相信你。相信？你的大脑越来越混乱，甚至快要晕过去，突然一个踉跄没有站稳，你倒在了原地。', 'chapter_04_gamma_dark_01'), line('chapter_04_gamma_dark_01', chapter04Gamma, '天昏地暗。', 'chapter_04_gamma_sound_01'), line('chapter_04_gamma_sound_01', chapter04Gamma, '“j池zhu，k都l……”', 'chapter_04_gamma_dark_02', '声音'), line('chapter_04_gamma_dark_02', chapter04Gamma, '声音像在被泡在了水里一样，你只能听到大概。天昏地暗。', 'chapter_04_gamma_wake_01'), line('chapter_04_gamma_wake_01', chapter04Gamma, '“醒 醒！！醒 醒！！”', 'chapter_04_gamma_hint_15', '明浩'), line('chapter_04_gamma_hint_15', chapter04Gamma, '提示15：你的死亡回溯的能力快用光了，你只剩下一次死亡回溯的机会了。', 'chapter_04_gamma_wake_02'), line('chapter_04_gamma_wake_02', chapter04Gamma, '你睁开眼睛见到的是明浩，他蹲在地上用肩膀搀扶着你。', 'chapter_04_gamma_minghao_01'), line('chapter_04_gamma_minghao_01', chapter04Gamma, '“大家在回营地的路上你突然倒下了，我让大家先走，我自己跑来照顾你。但是你倒下的时间有点久了。过会儿大家该担心了。”', 'choice_12_trust_minghao', '明浩'), {
        id: 'choice_12_trust_minghao',
        type: 'choice',
        chapter: chapter04Gamma,
        text: '抉择12 - 明浩可以信任吗？',
        choices: [{
          id: 'choice_12_trust',
          text: 'A. 可以',
          target: 'chapter_04_gamma_scissors_01'
        }, {
          id: 'choice_12_distrust',
          text: 'B. 不可以',
          target: 'chapter_04_gamma_scissors_01'
        }]
      }, line('chapter_04_gamma_scissors_01', chapter04Gamma, '不管明浩可不可以信任，这都是你最后的机会了。你知道，明浩手中的那把匕首，不对，不是匕首，是剪刀。这把剪刀对你来说至关重要。', 'chapter_04_gamma_scissors_02'), line('chapter_04_gamma_scissors_02', chapter04Gamma, '你告诉明浩这是一把“被山神诅咒的剪刀”（线索7），虽然你不确定你讲的这些话他是否会相信，也不确定下一秒明浩是否会直接拿起剪刀捅进你的身体。', 'chapter_04_gamma_scissors_03'), line('chapter_04_gamma_scissors_03', chapter04Gamma, '但你知道，你必须拿到这半把剪刀。', 'chapter_04_gamma_minghao_02'), line('chapter_04_gamma_minghao_02', chapter04Gamma, '明浩苦笑着说。', 'chapter_04_gamma_minghao_02_dialogue'), line('chapter_04_gamma_minghao_02_dialogue', chapter04Gamma, '“咱两都四年兄弟了，你就算骗我也不要用这么蹩脚的理由吧。”', 'chapter_04_gamma_minghao_03', '明浩'), line('chapter_04_gamma_minghao_03', chapter04Gamma, '还是失败了吗……', 'chapter_04_gamma_minghao_04'), line('chapter_04_gamma_minghao_04', chapter04Gamma, '“不过我也只是想拿着这个匕首来防身而已，你知道的，我本来晚上失眠就很严重了，今晚这种情形我肯定是睡不着了。我想着是干脆一直守着不睡等待凶手出现，拿这个剪刀直接了解他。”', 'chapter_04_gamma_minghao_04_narration', '明浩'), line('chapter_04_gamma_minghao_04_narration', chapter04Gamma, '明浩挠了挠头。', 'chapter_04_gamma_minghao_04_dialogue'), line('chapter_04_gamma_minghao_04_dialogue', chapter04Gamma, '“真是的，拐弯抹角地说这么多，你拿去吧。”', 'chapter_04_gamma_minghao_05', '明浩'), line('chapter_04_gamma_minghao_05', chapter04Gamma, '“保护我的任务就交给兄弟你了。”', 'chapter_04_gamma_scissors_04', '明浩'), line('chapter_04_gamma_scissors_04', chapter04Gamma, '丝线缠绕的半掰剪刀放在了你的胸口。你看到明浩的身上有一层薄薄的丝线逐渐断开，他的手还没来得及收回就没有了意识，扶着你的胳膊也没了力气，你和他一起重重摔在地上。', 'chapter_04_gamma_scissors_05'), line('chapter_04_gamma_scissors_05', chapter04Gamma, '你感到脑袋很痛，太多的记忆缠绕编织进入你的大脑，今晚的种种遭遇在你记忆里变得清晰。你感到大脑有一点过载，也晕倒在原地。', 'chapter_04_gamma_item_01'), line('chapter_04_gamma_item_01', chapter04Gamma, '获得道具：山神诅咒的剪刀', 'chapter_04_gamma_hint_17'), line('chapter_04_gamma_hint_17', chapter04Gamma, '提示17：恭喜你拿到了关键道具，你的死亡回溯次数重置了。', 'chapter_04_gamma_camp_01', undefined, [{
        kind: 'reset-deaths'
      }]), line('chapter_04_gamma_camp_01', chapter04Gamma, '醒来后看到大家在营地里围坐在一起。汽车的前灯映在地上充当照明，他们似乎在讨论杀害顾书的凶手。', 'chapter_04_gamma_atai_01'), line('chapter_04_gamma_atai_01', chapter04Gamma, '“你和明浩刚才在林子里晕了过去，是正宇把你们俩背回来的。我们刚在商量夜间守夜的人选，你跟明浩体力透支晕倒，定下来今晚就由我和正宇值守就好，你们两个今晚好好休息呀，明天早上我们就开车下山。到时候还得靠明浩和你开车呢。”', 'chapter_04_gamma_memory_01', '阿泰'), line('chapter_04_gamma_memory_01', chapter04Gamma, '你的大脑慢慢开始想起今晚发生的所有事情，每一个BE，每一个线索都清晰地印入你的脑海。你很想抱怨，为什么被卷入到这种事情，你会想起每次被杀掉时的痛苦和恐惧就有干呕的冲动，但是事到如今你只能想办法解决现在的状况，毕竟你只有？次死亡回溯了。', 'chapter_04_gamma_plan_01'), line('chapter_04_gamma_plan_01', chapter04Gamma, '趁着大家准备休息，你偷偷和明浩说好，一旦有状况发生，两人就一起出去。明浩既然信任你甚至直接把防身用的剪刀送给了你，那你也会用你的行动来回应他的信任。', 'chapter_04_gamma_sleep_01'), line('chapter_04_gamma_sleep_01', chapter04Gamma, '你在帐篷里躺下以后就假装睡觉，你故意靠着明浩和小月，来防止小月晚上再搞什么幺蛾子。', 'chapter_04_gamma_thought_01'), line('chapter_04_gamma_thought_01', chapter04Gamma, '你开始理清思维。（思考题需要与主持人交流得到正确答案。）', 'chapter_04_gamma_thought_hint'), line('chapter_04_gamma_thought_hint', chapter04Gamma, '提示：思考错误不计入死亡回溯。', 'choice_04_gamma_thought_01'), {
        id: 'choice_04_gamma_thought_01',
        type: 'choice',
        chapter: chapter04Gamma,
        text: '思考一：凶神的附身手段（假设凶神只有一个）\n问题1：你最初遇到的被凶神附体的人是谁？',
        choices: [{
          id: 'thought_01_xiaoyue',
          text: 'A. 小月',
          target: 'choice_04_gamma_thought_02'
        }, {
          id: 'thought_01_other',
          text: 'B. 其他人',
          target: 'choice_04_gamma_thought_01'
        }]
      }, {
        id: 'choice_04_gamma_thought_02',
        type: 'choice',
        chapter: chapter04Gamma,
        text: '问题2：在之前的时间线里，苏糯从营地逃跑之前，她是否还处于被凶神附体的状态？',
        choices: [{
          id: 'thought_02_yes',
          text: 'A. 是',
          target: 'choice_04_gamma_thought_03'
        }, {
          id: 'thought_02_no',
          text: 'B. 否',
          target: 'choice_04_gamma_thought_02'
        }]
      }, {
        id: 'choice_04_gamma_thought_03',
        type: 'choice',
        chapter: chapter04Gamma,
        text: '问题3：因此可以得出，在这段时间内，凶神是否换过附身人物？',
        choices: [{
          id: 'thought_03_yes',
          text: 'A. 是',
          target: 'choice_04_gamma_thought_03'
        }, {
          id: 'thought_03_no',
          text: 'B. 否',
          target: 'choice_04_gamma_thought_04'
        }]
      }, {
        id: 'choice_04_gamma_thought_04',
        type: 'choice',
        chapter: chapter04Gamma,
        text: '问题4：在你和明浩共同行动的时间线中，你俩一起到达树林时，苏糯是否死亡？',
        choices: [{
          id: 'thought_04_yes',
          text: 'A. 是',
          target: 'choice_04_gamma_thought_04'
        }, {
          id: 'thought_04_no',
          text: 'B. 否',
          target: 'choice_04_gamma_thought_05'
        }]
      }, {
        id: 'choice_04_gamma_thought_05',
        type: 'choice',
        chapter: chapter04Gamma,
        text: '问题5：在明浩独自行动的时间线（BE2）中，明浩进入丛林之后，谁杀死了苏糯？谁杀死了小月？',
        choices: [{
          id: 'thought_05_a',
          text: 'A. 小月、明浩',
          target: 'choice_04_gamma_thought_06'
        }, {
          id: 'thought_05_b',
          text: 'B. 明浩、明浩',
          target: 'choice_04_gamma_thought_05'
        }]
      }, {
        id: 'choice_04_gamma_thought_06',
        type: 'choice',
        chapter: chapter04Gamma,
        text: '问题6：在BE5中，明浩开车时是否被凶神附体？',
        choices: [{
          id: 'thought_06_yes',
          text: 'A. 是',
          target: 'choice_04_gamma_thought_07'
        }, {
          id: 'thought_06_no',
          text: 'B. 否',
          target: 'choice_04_gamma_thought_06'
        }]
      }, {
        id: 'choice_04_gamma_thought_07',
        type: 'choice',
        chapter: chapter04Gamma,
        text: '问题7：结合BE5的情景，为什么凶神要先杀掉苏糯再附身明浩？',
        choices: [{
          id: 'thought_07_safe',
          text: 'A. 为了自身安全',
          target: 'choice_04_gamma_thought_07'
        }, {
          id: 'thought_07_anger',
          text: 'B. 为了泄愤',
          target: 'choice_04_gamma_thought_07'
        }, {
          id: 'thought_07_condition',
          text: 'C. 为了制造相似的人数条件',
          target: 'choice_04_gamma_thought_08'
        }]
      }, {
        id: 'choice_04_gamma_thought_08',
        type: 'choice',
        chapter: chapter04Gamma,
        text: '问题8：BE5中的车中附身与BE2中苏糯死后的丛林附身的环境下共同点是什么？',
        choices: [{
          id: 'thought_08_two',
          text: 'A. 都仅有两个人',
          target: 'choice_04_gamma_thought_09'
        }, {
          id: 'thought_08_blood',
          text: 'B. 都有血',
          target: 'choice_04_gamma_thought_08'
        }, {
          id: 'thought_08_touch',
          text: 'C. 都存在肢体接触',
          target: 'choice_04_gamma_thought_08'
        }]
      }, {
        id: 'choice_04_gamma_thought_09',
        type: 'choice',
        chapter: chapter04Gamma,
        text: '问题9：在正宇死亡的时间线里，正宇被杀死说明了什么？',
        choices: [{
          id: 'thought_09_weak',
          text: 'A. 正宇太弱，没有附身价值',
          target: 'choice_04_gamma_thought_09'
        }, {
          id: 'thought_09_threat',
          text: 'B. 正宇威胁太大，且当时附身条件不足',
          target: 'chapter_04_gamma_conclusion_01'
        }]
      }, line('chapter_04_gamma_conclusion_01', chapter04Gamma, '1.小月 2.是 3.否 4.否 5.A 6.是 7.C 8.A 9.B', 'chapter_04_gamma_conclusion_02'), line('chapter_04_gamma_conclusion_02', chapter04Gamma, '凶神只能附体到活人身上，附身的条件是在独立空间内只有被附身者和附身目标。凶神有反制对付正宇的手段，但是附身正宇可能需要满足一些其他条件。', 'chapter_04_gamma_conclusion_03'), line('chapter_04_gamma_conclusion_03', chapter04Gamma, '这是你经历多次死亡回溯得出来的结论，尽管今晚的事情还有诸多疑点，但小月身上的凶神能力应该跟这个差不多。这个夜晚很长很长，但是事情没有像你反复经历的那样发生。', 'chapter_04_gamma_midnight_01'), line('chapter_04_gamma_midnight_01', chapter04Gamma, '帐篷外有脚步声。', 'chapter_04_gamma_midnight_02'), line('chapter_04_gamma_midnight_02', chapter04Gamma, '“哗啦”一声，帐篷布被小心翼翼撩开一道缝隙，正宇猫着腰钻了进来。你屏住呼吸闭眼装睡，只敢微微掀开一条眼缝偷看。他一只手牢牢背在身后，似乎拿着什么东西，脚步落地几乎没有半点声响，缓慢又诡异地朝着你的位置靠近。', 'chapter_04_gamma_midnight_03'), line('chapter_04_gamma_midnight_03', chapter04Gamma, '帐篷内一片漆黑，他的脸融在阴影里，五官模糊不清，根本分辨不出神情。你的后背冷汗直流，恐惧死死攥住你的心脏。你掌心冒汗，用力握紧手边的剪刀，做好了拼死防备的准备。', 'choice_13_midnight_visit'), {
        id: 'choice_13_midnight_visit',
        type: 'choice',
        chapter: chapter04Gamma,
        text: '抉择13 - 午夜的拜访\n面对正宇预想之外地到来，你打算如何应对？',
        choices: [{
          id: 'choice_13_attack',
          text: 'A. 先下手为强，后下手遭殃',
          target: 'chapter_04_gamma_hint_18',
          effects: [{
            kind: 'ending',
            key: 'midnightAttack'
          }, {
            kind: 'death'
          }]
        }, {
          id: 'choice_13_wait',
          text: 'B. 以不变应万变',
          target: 'chapter_04_gamma_visit_01',
          effects: [{
            kind: 'ending',
            key: 'doubleGhosts'
          }, {
            kind: 'death'
          }]
        }]
      }, line('chapter_04_gamma_hint_18', chapter04Gamma, '你立即起身拿剪刀向正宇刺去，谁知正宇一拳把你打得眼冒金星，再也没醒来。提示18：螳臂当车。', 'choice_13_midnight_visit'), line('chapter_04_gamma_visit_01', chapter04Gamma, '正宇径直略过了你。他用一只手轻轻地摇了摇小月，另一只手始终背在身后，正宇似乎在暗示小月出去聊。小月像刚刚睡醒一样，夸张地瞪大了眼睛，满是意外。', 'chapter_04_gamma_visit_02'), line('chapter_04_gamma_visit_02', chapter04Gamma, '你突然想起，最开始的时候小月假装贞子吓你，那也只是凶神模仿小月的性格扮演小月从而做出的行为。想到这儿你突然感觉小月今天晚上有些可怜，从来没有按照自己的行为来行事。', 'chapter_04_gamma_visit_03'), line('chapter_04_gamma_visit_03', chapter04Gamma, '而且凶神似乎还会读取一些被附身目标的记忆，所以之前每次附身明浩杀我的时候表情都很扭曲。真是奇怪的恶趣味。', 'chapter_04_gamma_visit_04'), line('chapter_04_gamma_visit_04', chapter04Gamma, '小月悄悄地从你身边爬起来，没有穿鞋就悄咪咪地往门外走去。正宇等她走出去才跟出去，或许是不想让小月看到他手里握着的东西，一束稍微有点蔫蔫的玫瑰花。', 'chapter_04_gamma_visit_05'), line('chapter_04_gamma_visit_05', chapter04Gamma, '小月从前就是学校里的校花，她长得那么漂亮自然追求者无数。在我们社团里也没有听说有人追求过小月，或许对真实的小月来说被异性朋友告白也是一件很头疼的事情吧。不过更应该头疼的是正宇吧，准备要跟冒牌货表白了。', 'chapter_04_gamma_follow_01'), line('chapter_04_gamma_follow_01', chapter04Gamma, '我抬手轻碰了一下明浩的肩膀，用动作示意他准备行动。我俩刚走出帐篷，就撞见了正在守夜的阿泰。我和明浩随口谎称想去看看正宇表白的场面，阿泰十分热心，抬手给我们指明了帐篷后方的树林方向，接着摆了摆手，说自己得留下来值守，就不跟着一起去看热闹了。', 'chapter_04_gamma_follow_02'), line('chapter_04_gamma_follow_02', chapter04Gamma, '我和明浩压低脚步，远远跟在正宇身后一路尾随。正宇和小月一路上小声地说笑，两人走到一处被树林包围的开阔空地，我和明浩停在树林外围，借着树木之间的缝隙，悄悄窥探空地上的动静。空地中央围了一圈玫瑰，想来是正宇趁着夜里众人熟睡、拜托阿泰帮忙守岗时，偷偷布置好的。', 'chapter_04_gamma_follow_03'), line('chapter_04_gamma_follow_03', chapter04Gamma, '正宇刚准备开口表白，只飘出几句含糊不清、分辨不出含义的字音，下一秒整个人如同被按下暂停键一般僵在原地。嘴巴维持着张开的姿态，再也发不出半点声响，四肢僵硬紧绷，全身彻底动弹不得。', 'chapter_04_gamma_follow_04'), line('chapter_04_gamma_follow_04', chapter04Gamma, '“别看了。”', 'chapter_04_gamma_follow_05', '小月'), line('chapter_04_gamma_follow_05', chapter04Gamma, '像是在对你说一样。', 'chapter_04_gamma_follow_06'), line('chapter_04_gamma_follow_06', chapter04Gamma, '“哥哥。”', 'chapter_04_gamma_follow_07', '小月'), line('chapter_04_gamma_follow_07', chapter04Gamma, '“绑上来这个偷窥狂吧。”', 'chapter_04_gamma_bind_01', '小月'), line('chapter_04_gamma_bind_01', chapter04Gamma, '一刹那之间，明浩整个人扑过来将你死死按在地上。他就像早早计划好一样摸出一卷露营帐篷绳索，根本不给你分毫反应和挣扎的余地，飞快捆住你的双手，反绑在后背。', 'chapter_04_gamma_bind_02'), line('chapter_04_gamma_bind_02', chapter04Gamma, '这一切发生得如此突然，你甚至对现在的状况没有一点头绪。这完全不对劲。', 'chapter_04_gamma_reveal_01'), line('chapter_04_gamma_reveal_01', chapter04Gamma, '“弟弟，你进入不了到那个大块头的身体里吗。”', 'chapter_04_gamma_reveal_02', '明浩'), line('chapter_04_gamma_reveal_02', chapter04Gamma, '“不能呢，以我的能力水平，还控制不了这么强壮的身体水平。我理想中的身体是你现在用的这一副身体呢。”', 'chapter_04_gamma_reveal_03', '小月'), line('chapter_04_gamma_reveal_03', chapter04Gamma, '小月的表情逐渐扭曲疯狂，让你想起了之前很多次被杀时见到的这种表情。', 'chapter_04_gamma_reveal_04'), line('chapter_04_gamma_reveal_04', chapter04Gamma, '“哥哥，以你的能力，应该是可以轻松附体呢。”', 'chapter_04_gamma_plan_02', '小月'), line('chapter_04_gamma_plan_02', chapter04Gamma, '“已经没有这个必要了。”', 'chapter_04_gamma_plan_02_narration', '明浩'), line('chapter_04_gamma_plan_02_narration', chapter04Gamma, '明浩的声音仍然非常平静。', 'chapter_04_gamma_plan_02_dialogue'), line('chapter_04_gamma_plan_02_dialogue', chapter04Gamma, '“把他们两个杀掉就好了，营地里只剩下三个人了，那个女生甚至完全没有威胁。二打二的情况我们不可能输的。”', 'chapter_04_gamma_plan_03', '明浩'), line('chapter_04_gamma_plan_03', chapter04Gamma, '“说的也是哦，看来很快就可以完成任务收工了。”', 'chapter_04_gamma_plan_03_narration', '小月'), line('chapter_04_gamma_plan_03_narration', chapter04Gamma, '小月说着，从身上掏出一把水果刀。', 'chapter_04_gamma_plan_03_dialogue'), line('chapter_04_gamma_plan_03_dialogue', chapter04Gamma, '“这个大块头是真够麻烦的，我用了我所有的力量也转移不到他的身上，最多就是让他的身体暂时动不了。还好你提前知道他暗恋这个女生，我才有跟他独处杀掉他的机会。”', 'chapter_04_gamma_zhengyu_death_01', '小月'), line('chapter_04_gamma_zhengyu_death_01', chapter04Gamma, '正宇被维持着张嘴停滞的姿态。小月的刀刃反复刺入腹部，温热的鲜血顺着刀口不断涌出，顺着僵直的身体缓缓滑落，砸落在娇艳的玫瑰花瓣上。', 'chapter_04_gamma_zhengyu_death_02'), line('chapter_04_gamma_zhengyu_death_02', chapter04Gamma, '数次穿刺过后，正宇脸上的血色以肉眼可见的速度褪尽，整张面皮惨白如纸，唇瓣蒙上一层死寂的青灰色。他周身的细微震颤渐渐减弱、消失。终于，他眼底的光泽一点点褪去，眸光变得浑浊黯淡。', 'chapter_04_gamma_zhengyu_death_03'), line('chapter_04_gamma_zhengyu_death_03', chapter04Gamma, '尸体脱离了小月的控制重重倒在了地上。', 'chapter_04_gamma_zhengyu_death_04'), line('chapter_04_gamma_zhengyu_death_04', chapter04Gamma, '“真难杀。”', 'chapter_04_gamma_zhengyu_death_04_narration', '小月'), line('chapter_04_gamma_zhengyu_death_04_narration', chapter04Gamma, '小月擦了一下溅到脸上的血，顺着尸体倒下的位置蹲下，用刀割下来一缕正宇的头发放在尸体的旁边。', 'chapter_04_gamma_zhengyu_death_04_dialogue'), line('chapter_04_gamma_zhengyu_death_04_dialogue', chapter04Gamma, '“愿你的灵魂安息。”', 'chapter_04_gamma_reveal_05', '小月'), line('chapter_04_gamma_reveal_05', chapter04Gamma, '这一切有点超出了你的理解范畴，不仅有两个凶神，甚至还是兄弟。', 'chapter_04_gamma_reveal_06'), line('chapter_04_gamma_reveal_06', chapter04Gamma, '“哥哥，你身下压着的那个也不太寻常。我的能力水平也进入不了他的身体。”', 'chapter_04_gamma_reveal_07', '小月'), line('chapter_04_gamma_reveal_07', chapter04Gamma, '“我也发现了。以我的力量去控制他也有点困难。”', 'chapter_04_gamma_reveal_07_narration', '明浩'), line('chapter_04_gamma_reveal_07_narration', chapter04Gamma, '明浩的声音仍然没有一点感情，甚至打了个哈欠，已经感觉有点无聊了。', 'chapter_04_gamma_reveal_07_dialogue'), line('chapter_04_gamma_reveal_07_dialogue', chapter04Gamma, '“也许是因为他拿到了那把剪子的原因。”', 'chapter_04_gamma_reveal_08', '明浩'), line('chapter_04_gamma_reveal_08', chapter04Gamma, '小月缓步走向被绳子缚住的你，屈膝俯身蹲在你的正前方。她清丽精致的五官分毫未变，可身体、手臂、指尖遍布淋漓鲜血，暗红血迹浸染衣物，衬得娇美的面容愈发阴森可怖，阴郁的氛围感远超她最初假扮贞子吓人之时，宛若怨灵现世。', 'chapter_04_gamma_reveal_09'), line('chapter_04_gamma_reveal_09', chapter04Gamma, '“一半的剪子能有什么用，另一半剪子还没有找到呢。哥哥你不喜欢杀人，你把他按住，由我来结束他吧～～”', 'chapter_04_gamma_be6', '小月'), line('chapter_04_gamma_be6', chapter04Gamma, '这张染血的绝美脸庞、扭曲怪异的笑容，成为了你失去意识前，烙印在脑海里最后的画面。BE6《双鬼拍门》', 'chapter_04_gamma_hint_continue'), line('chapter_04_gamma_hint_continue', chapter04Gamma, '提示：这恐怕是最绝望的结局了吧，但是不要灰心，希望总会在绝望之上萌芽。总之，胜败乃兵家常事，大侠请重新来过吧。', 'chapter_05_second_loop_01'), line('chapter_05_second_loop_01', chapter05SecondLoop, '你在石碑前惊醒，面前的是一个写着血字的石碑。石碑的内容跟你第一次看时别无二致，只是你感觉石碑的内容似乎有点奇怪和不通顺，而且感觉石碑上的血迹已经干透了。明明上一次见到时，后面几个字的血迹还算新鲜。', 'chapter_05_second_loop_02'), line('chapter_05_second_loop_02', chapter05SecondLoop, '你摸摸自己的衣服兜，里面揣着手机和丝线缠绕的半把剪刀。', 'chapter_05_second_loop_03'), line('chapter_05_second_loop_03', chapter05SecondLoop, '“惊扰山神者山神附其体1山神失其信便可出山2否皆葬于此”', 'chapter_05_second_loop_04'), line('chapter_05_second_loop_04', chapter05SecondLoop, '你在回去的路上揣摩着这句话。', 'chapter_05_second_loop_05'), line('chapter_05_second_loop_05', chapter05SecondLoop, '“嘿！”', 'chapter_05_second_loop_06', '小月'), line('chapter_05_second_loop_06', chapter05SecondLoop, '身后传来了熟悉的声音。你把头慢慢别过去，看到的是小月阴森恐怖的笑容。回想到你回溯前的死亡画面，你吓得腿一软倒在地上。', 'chapter_05_second_loop_07'), line('chapter_05_second_loop_07', chapter05SecondLoop, '“哈哈哈哈，真的吓到你了。”', 'chapter_05_second_loop_07_narration', '小月'), line('chapter_05_second_loop_07_narration', chapter05SecondLoop, '小月脸上的阴森恐怖全部消失，变成开心可爱的笑脸。', 'chapter_05_second_loop_07_dialogue'), line('chapter_05_second_loop_07_dialogue', chapter05SecondLoop, '“我看你刚刚路上一直不知道在嘟囔什么，挺认真的，就想捉弄你一下。你没受伤吧，我拉你起来。”', 'chapter_05_second_loop_08', '小月'), line('chapter_05_second_loop_08', chapter05SecondLoop, '小月半蹲下，把手伸给你，示意你抓住她的手从地上站起来。', 'choice_14_help_xiaoyue'), {
        id: 'choice_14_help_xiaoyue',
        type: 'choice',
        chapter: chapter05SecondLoop,
        text: '抉择14 - 热心的小月1\n面对小月伸出的手，你如何行动？',
        choices: [{
          id: 'choice_14_accept',
          text: 'A. 接受帮助，让她帮忙拉起你来',
          target: 'chapter_05_second_loop_help_a'
        }, {
          id: 'choice_14_refuse',
          text: 'B. 不管她，自己想办法站起来',
          target: 'chapter_05_second_loop_help_b'
        }]
      }, line('chapter_05_second_loop_help_a', chapter05SecondLoop, '你半信半疑地接受小月的帮助，重新站了起来。', 'chapter_05_second_loop_question'), line('chapter_05_second_loop_help_b', chapter05SecondLoop, '你非常害怕，决定自己爬起来，谁知她过来还是帮了你一把，吓得你后背都湿了。', 'chapter_05_second_loop_question'), line('chapter_05_second_loop_question', chapter05SecondLoop, '“哇哦！没想到你还挺沉的。”', 'chapter_05_second_loop_question_narration', '小月'), line('chapter_05_second_loop_question_narration', chapter05SecondLoop, '小月微微抱怨了一句，你选择没有听到。', 'chapter_05_second_loop_question_dialogue'), line('chapter_05_second_loop_question_dialogue', chapter05SecondLoop, '“你刚刚在嘟囔什么呀？”', 'choice_15_show_stone', '小月'), {
        id: 'choice_15_show_stone',
        type: 'choice',
        chapter: chapter05SecondLoop,
        text: '抉择15 - 热心的小月2\n你打算如何回应？',
        choices: [{
          id: 'choice_15_photo',
          text: 'A. 拿起手机给小月看照片，把你的想法告诉小月',
          target: 'chapter_05_second_loop_show_a'
        }, {
          id: 'choice_15_silence',
          text: 'B. 什么都不说，假装什么也不知道',
          target: 'chapter_05_second_loop_show_b'
        }, {
          id: 'choice_15_stone',
          text: 'C. 告诉小月附近有个石碑，带她去现场看石碑',
          target: 'chapter_05_second_loop_show_c'
        }]
      }, line('chapter_05_second_loop_show_a', chapter05SecondLoop, '啊，刚刚忘记拍照片了。不然直接带她去看石碑吧。', 'chapter_05_second_loop_stone_01'), line('chapter_05_second_loop_show_b', chapter05SecondLoop, '还是不要犯跟上次一样的错误了。不然直接带她去看石碑吧。', 'chapter_05_second_loop_stone_01'), line('chapter_05_second_loop_show_c', chapter05SecondLoop, '有了之前的记忆，我可不会犯同样的错误，直接带她去看石碑。', 'chapter_05_second_loop_stone_01'), line('chapter_05_second_loop_stone_01', chapter05SecondLoop, '我把小月带到了那个石碑跟前，把我的解读告诉了小月，小月似懂非懂地点头。', 'chapter_05_second_loop_stone_02'), line('chapter_05_second_loop_stone_02', chapter05SecondLoop, '“写这个石碑的人，字真够差的，这后面越写越潦草了。都不像一个人写的。”', 'chapter_05_second_loop_stone_02_narration', '小月'), line('chapter_05_second_loop_stone_02_narration', chapter05SecondLoop, '小月皱起眉头。', 'chapter_05_second_loop_stone_02_dialogue'), line('chapter_05_second_loop_stone_02_dialogue', chapter05SecondLoop, '“给人一种好像没读多少书但是硬要凹出一点自己的学识的感觉，实际上就是个大笨蛋嘛！”', 'chapter_05_second_loop_stone_03', '小月'), line('chapter_05_second_loop_stone_03', chapter05SecondLoop, '之前没跟小月聊过几句就被杀掉了，原来她其实这么毒舌的嘛……', 'chapter_05_second_loop_stone_04'), line('chapter_05_second_loop_stone_04', chapter05SecondLoop, '“语句也不通顺，字也写得这么差，这个山字写得也不像山字，我高考阅卷的话一定给他卷面分打0分……”', 'chapter_05_second_loop_stone_04_narration', '小月'), line('chapter_05_second_loop_stone_04_narration', chapter05SecondLoop, '小月好像想到了什么，苦笑道。', 'chapter_05_second_loop_stone_04_dialogue'), line('chapter_05_second_loop_stone_04_dialogue', chapter05SecondLoop, '“我好像知道这个是谁写的了……”', 'chapter_05_second_loop_stone_05', '小月'), line('chapter_05_second_loop_stone_05', chapter05SecondLoop, '“惊扰山神者，山神附其体，1山神失其信便可出山，2否皆葬于此。断句都断不明白，还加上一些阿拉伯数字……无语……”', 'chapter_05_second_loop_stone_06', '小月'), line('chapter_05_second_loop_stone_06', chapter05SecondLoop, '“但是你不觉得这几个阿拉伯数字的位置有一点奇怪嘛，这个‘1’写的有一点斜，有没有可能原本是跟‘山’写在一起的，如果在‘山’字的基础上加上这个斜向的‘1’，写的再长一点的话，组合起来有没有更像‘凶’字啊。”', 'chapter_05_second_loop_stone_07', '小月'), line('chapter_05_second_loop_stone_07', chapter05SecondLoop, '“如果这个‘2’上面加上一点的话，就变成了‘之’字。”', 'chapter_05_second_loop_stone_08', '小月'), line('chapter_05_second_loop_stone_08', chapter05SecondLoop, '“所以可以这样读。”', 'chapter_05_second_loop_stone_08_narration', '小月'), line('chapter_05_second_loop_stone_08_narration', chapter05SecondLoop, '此时在你的眼中，小月大大的眼睛中的智慧光芒无比闪耀。', 'chapter_05_second_loop_stone_09'), line('chapter_05_second_loop_stone_09', chapter05SecondLoop, '“惊扰山神者，山神附其体。凶神失其信，便可出山之，否皆葬于此。”', 'chapter_05_second_loop_clue', '小月'), line('chapter_05_second_loop_clue', chapter05SecondLoop, '获得线索-“真正的碑文”：字迹好差……', 'chapter_05_second_loop_admire', undefined, [{
        kind: 'clue',
        key: 'trueInscription'
      }]), line('chapter_05_second_loop_admire', chapter05SecondLoop, '你看待小月的目光充满了崇拜。小月和之前时间线里表现得太不一样了，你还没有适应这种变化。', 'chapter_05_second_loop_gushu_01'), line('chapter_05_second_loop_gushu_01', chapter05SecondLoop, '不过更让你的吃惊的是，你和小月一同回到营地时见到的第一个人。', 'chapter_05_second_loop_gushu_02'), line('chapter_05_second_loop_gushu_02', chapter05SecondLoop, '“哎呀，这不正是小月佳人！久候君至，令在下捶胸顿足，险些肝肠寸断呐！”', 'chapter_05_second_loop_gushu_03', '顾书'), line('chapter_05_second_loop_gushu_03', chapter05SecondLoop, '顾书。你现在好像也知道这个碑文是谁写的了……', 'chapter_05_second_loop_end'), {
        id: 'chapter_05_second_loop_end',
        type: 'end',
        chapter: chapter05SecondLoop,
        text: '此时我们八个人都坐在营地中。结合现在的信息可以得出一个结论，两个凶神在浓雾漫山时第一次附体，且附体目标是随机的。'
      }];
      function buildNodeMap(values) {
        var result = {};
        for (var _iterator = _createForOfIteratorHelperLoose(values), _step; !(_step = _iterator()).done;) {
          var node = _step.value;
          if (result[node.id]) {
            throw new Error("Duplicate story node ID: " + node.id);
          }
          result[node.id] = Object.freeze(node);
        }
        return Object.freeze(result);
      }
      var STORY_NODES = exports('STORY_NODES', buildNodeMap(nodes));
      var CLUE_LABELS = exports('CLUE_LABELS', Object.freeze({
        fruitKnife: '水果刀战神',
        mountainGodLegend: '山神的传说',
        morningIncident: '今天早上的事情',
        tireShine: '车胎下的闪光',
        scissors: '被山神诅咒的剪刀',
        specialPhysique: '特殊体质',
        chenJieAnomaly: '陈杰的异常',
        carMorning: '车子早上的情况',
        ataiAnomaly: '阿泰的异常',
        trueInscription: '真正的碑文',
        minghaoSleep: '明浩的睡眠问题',
        minghao: '明浩',
        chenJie: '陈杰',
        zhengYu: '正宇'
      }));
      var CLUE_DETAILS = exports('CLUE_DETAILS', Object.freeze({
        fruitKnife: {
          label: '水果刀战神',
          contextNodeId: 'chapter_01_clear_02',
          clueNodeId: 'chapter_01_clue_01'
        },
        morningIncident: {
          label: '今天早上的事情',
          contextNodeId: 'chapter_03_beta_morning_argument_05_narration',
          clueNodeId: 'chapter_03_beta_clue_morning'
        },
        tireShine: {
          label: '车胎下的闪光',
          contextNodeId: 'chapter_03_beta_tire_01',
          clueNodeId: 'chapter_03_beta_clue_tire'
        },
        scissors: {
          label: '被山神诅咒的剪刀',
          contextNodeId: 'chapter_03_alpha_chat_minghao_02',
          clueNodeId: 'chapter_03_alpha_clue_cursed_scissors'
        },
        specialPhysique: {
          label: '特殊体质',
          contextNodeId: 'chapter_03_alpha_chat_xiaoyue_02',
          clueNodeId: 'chapter_03_alpha_clue_special'
        },
        chenJieAnomaly: {
          label: '陈杰的异常',
          contextNodeId: 'chapter_03_alpha_chat_atai_01',
          clueNodeId: 'chapter_03_alpha_clue_chenjie_anomaly'
        },
        carMorning: {
          label: '车子早上的情况',
          contextNodeId: 'chapter_03_alpha_chat_zhengyu_01',
          clueNodeId: 'chapter_03_alpha_clue_car_morning'
        },
        ataiAnomaly: {
          label: '阿泰的异常',
          contextNodeId: 'chapter_03_alpha_chat_sunuo_01',
          clueNodeId: 'chapter_03_alpha_clue_atai_anomaly'
        },
        minghaoSleep: {
          label: '明浩的睡眠问题',
          contextNodeId: 'chapter_03_beta_death_steal',
          clueNodeId: 'chapter_03_beta_clue_minghao_sleep'
        },
        minghao: {
          label: '明浩',
          contextNodeId: 'chapter_03_beta_death_minghao_02',
          clueNodeId: 'chapter_03_beta_clue_minghao'
        },
        chenJie: {
          label: '陈杰',
          contextNodeId: 'chapter_03_beta_death_chenjie_02',
          clueNodeId: 'chapter_03_beta_clue_chenjie'
        },
        zhengYu: {
          label: '正宇',
          contextNodeId: 'chapter_03_beta_death_zhengyu_02',
          clueNodeId: 'chapter_03_beta_clue_zhengyu'
        },
        trueInscription: {
          label: '真正的碑文',
          contextNodeId: 'chapter_05_second_loop_stone_08',
          clueNodeId: 'chapter_05_second_loop_clue'
        }
      }));
      var LOCKED_STORY_CHECKPOINT_LABEL = exports('LOCKED_STORY_CHECKPOINT_LABEL', '？？？');
      var STORY_CHECKPOINTS = exports('STORY_CHECKPOINTS', Object.freeze([{
        id: 'chapter01',
        label: '第一章 · 雾中石碑',
        nodeIds: ['chapter_01_opening_01'],
        x: -260,
        depth: 0
      }, {
        id: 'choice01',
        label: '抉择1 · 热情的小月',
        nodeIds: ['choice_01_xiaoyue'],
        x: -260,
        depth: 1,
        parents: ['chapter01']
      }, {
        id: 'chapter02',
        label: '第二章 · 营地疑云',
        nodeIds: ['chapter_02_camp_01'],
        x: -260,
        depth: 2,
        parents: ['choice01']
      }, {
        id: 'endingChoice01Tell',
        label: '普通 BE · 告诉小月',
        nodeIds: ['chapter_01_death_tell_01'],
        x: 220,
        depth: 2,
        parents: ['choice01']
      }, {
        id: 'endingChoice01Silence',
        label: '普通 BE · 沉默不语',
        nodeIds: ['chapter_01_death_silence_01'],
        x: 600,
        depth: 2,
        parents: ['choice01']
      }, {
        id: 'choice02',
        label: '抉择2 · 组队建议',
        nodeIds: ['choice_02_team'],
        x: -260,
        depth: 3,
        parents: ['chapter02']
      }, {
        id: 'chapter03Beta',
        label: '第三章 · 正宇死亡线',
        nodeIds: ['chapter_03_beta_search_sunuo', 'chapter_03_beta_search_atai', 'chapter_03_beta_search_minghao'],
        x: -260,
        depth: 4,
        parents: ['choice02']
      }, {
        id: 'chapter03Alpha',
        label: '第三章 · 全员存活线',
        nodeIds: ['chapter_03_alpha_camp_01'],
        x: 1000,
        depth: 4,
        parents: ['choice02']
      }, {
        id: 'endingChoice02Xiaoyue',
        label: '普通 BE · 与小月组队',
        nodeIds: ['chapter_02_death_xiaoyue'],
        x: 300,
        depth: 4,
        parents: ['choice02']
      }, {
        id: 'choice03',
        label: '抉择3 · 路在何方',
        nodeIds: ['choice_03_road'],
        x: -260,
        depth: 5,
        parents: ['chapter03Beta']
      }, {
        id: 'choice04',
        label: '抉择4 · 是否信任明浩',
        nodeIds: ['choice_04_trust_minghao'],
        x: -260,
        depth: 6,
        parents: ['choice03']
      }, {
        id: 'endingChoice03Fog',
        label: '普通 BE · 迷雾之路',
        nodeIds: ['chapter_03_beta_death_fog_01'],
        x: 220,
        depth: 6,
        parents: ['choice03']
      }, {
        id: 'endingChoice03Return',
        label: '普通 BE · 返回营地',
        nodeIds: ['chapter_03_beta_death_return_01'],
        x: 600,
        depth: 6,
        parents: ['choice03']
      }, {
        id: 'choice05',
        label: '抉择5 · 守夜人的选择？β',
        nodeIds: ['choice_05_watch_beta'],
        x: -260,
        depth: 7,
        parents: ['choice04']
      }, {
        id: 'endingMadness',
        label: 'BAD END · 疯狂',
        nodeIds: ['chapter_03_beta_madness_01'],
        x: 450,
        depth: 7,
        parents: ['choice04']
      }, {
        id: 'choice06',
        label: '抉择6 · 夜晚的行动？β',
        nodeIds: ['choice_06_night_action'],
        x: -490,
        depth: 8,
        parents: ['choice05']
      }, {
        id: 'choice07',
        label: '抉择7 · 追击选择β',
        nodeIds: ['choice_07_chase_beta'],
        x: 160,
        depth: 8,
        parents: ['choice05']
      }, {
        id: 'endingChoice05Self',
        label: '普通 BE · 独自守夜',
        nodeIds: ['chapter_03_beta_death_watch_self'],
        x: 650,
        depth: 8,
        parents: ['choice05']
      }, {
        id: 'endingChoice06Sleep',
        label: '普通 BE · 沉睡',
        nodeIds: ['chapter_03_beta_death_sleep'],
        x: -650,
        depth: 9,
        parents: ['choice06']
      }, {
        id: 'endingChoice06Steal',
        label: '普通 BE · 偷取匕首',
        nodeIds: ['chapter_03_beta_death_steal'],
        x: -330,
        depth: 9,
        parents: ['choice06']
      }, {
        id: 'endingChoice07Alone',
        label: '普通 BE · 独自追击',
        nodeIds: ['chapter_03_beta_death_chase_alone'],
        x: 0,
        depth: 9,
        parents: ['choice07']
      }, {
        id: 'choice08',
        label: '抉择8 · 危机时刻β',
        nodeIds: ['choice_08_crisis_beta'],
        x: 320,
        depth: 9,
        parents: ['choice07']
      }, {
        id: 'endingMinghao',
        label: 'BE2 · 你跑不过我',
        nodeIds: ['chapter_03_beta_death_minghao_01'],
        x: -20,
        depth: 10,
        parents: ['choice08']
      }, {
        id: 'endingChenjie',
        label: 'BE3 · 杰哥不要啊',
        nodeIds: ['chapter_03_beta_death_chenjie_01'],
        x: 320,
        depth: 10,
        parents: ['choice08']
      }, {
        id: 'endingZhengyu',
        label: 'BE4 · I am inevitable',
        nodeIds: ['chapter_03_beta_death_zhengyu_01'],
        x: 660,
        depth: 10,
        parents: ['choice08']
      }, {
        id: 'choice05Alpha',
        label: '抉择5 · 守夜人的选择？α',
        nodeIds: ['choice_05_watch_alpha'],
        x: 1000,
        depth: 5,
        parents: ['chapter03Alpha']
      }, {
        id: 'choice07Delta',
        label: '抉择7 · 追击选择δ',
        nodeIds: ['choice_07_chase_delta'],
        x: 800,
        depth: 6,
        parents: ['choice05Alpha']
      }, {
        id: 'choice07Alpha',
        label: '抉择7 · 追击选择α',
        nodeIds: ['choice_07_chase_alpha'],
        x: 1200,
        depth: 6,
        parents: ['choice05Alpha']
      }, {
        id: 'endingChoice07Delta',
        label: '普通 BE · 小月复仇',
        nodeIds: ['chapter_03_delta_death_01'],
        x: 800,
        depth: 7,
        parents: ['choice07Delta']
      }, {
        id: 'endingChoice07Alpha',
        label: '普通 BE · 小月复仇',
        nodeIds: ['chapter_03_alpha_death_xiaoyue_01'],
        x: 1600,
        depth: 7,
        parents: ['choice07Alpha']
      }, {
        id: 'choice09',
        label: '抉择9 · 共同行动',
        nodeIds: ['choice_09_together_alpha'],
        x: 1200,
        depth: 7,
        parents: ['choice07Alpha']
      }, {
        id: 'chapter03Epsilon',
        label: '第三章 · 苏糯死亡线',
        nodeIds: ['chapter_03_epsilon_return_01'],
        x: 1000,
        depth: 8,
        parents: ['choice09']
      }, {
        id: 'choice10',
        label: '抉择10 · 是否揭发陈杰',
        nodeIds: ['choice_10_expose_chenjie'],
        x: 1000,
        depth: 9,
        parents: ['chapter03Epsilon']
      }, {
        id: 'endingChoice10Zhengyu',
        label: '普通 BE · 正宇死亡',
        nodeIds: ['chapter_03_epsilon_tell_03'],
        x: 1000,
        depth: 10,
        parents: ['choice10']
      }, {
        id: 'endingChoice10Sleep',
        label: '普通 BE · 沉睡',
        nodeIds: ['chapter_03_epsilon_silence_01'],
        x: 1400,
        depth: 10,
        parents: ['choice10']
      }, {
        id: 'choice11',
        label: '抉择11 · 选谁聊天',
        nodeIds: ['choice_11_chat_alpha'],
        x: 1400,
        depth: 8,
        parents: ['choice09']
      }, {
        id: 'endingLuckyCrash',
        label: 'BE5 · 撞大运咯',
        nodeIds: ['chapter_03_alpha_crash_02'],
        x: 1800,
        depth: 9,
        parents: ['choice11']
      }, {
        id: 'choice12',
        label: '抉择12 · 明浩可以信任吗？',
        nodeIds: ['choice_12_trust_minghao'],
        x: 1800,
        depth: 10,
        parents: ['endingLuckyCrash']
      }, {
        id: 'chapter04Gamma',
        label: '第四章 · 解密篇 γ',
        nodeIds: ['chapter_04_gamma_collapse_01'],
        x: 1800,
        depth: 11,
        parents: ['choice12']
      }, {
        id: 'choice13',
        label: '抉择13 · 午夜的拜访',
        nodeIds: ['choice_13_midnight_visit'],
        x: 1800,
        depth: 12,
        parents: ['chapter04Gamma']
      }, {
        id: 'endingChoice13Attack',
        label: '普通 BE · 螳臂当车',
        nodeIds: ['chapter_04_gamma_hint_18'],
        x: 1600,
        depth: 13,
        parents: ['choice13']
      }, {
        id: 'endingDoubleGhosts',
        label: 'BE6 · 双鬼拍门',
        nodeIds: ['chapter_04_gamma_be6'],
        x: 2000,
        depth: 13,
        parents: ['choice13']
      }, {
        id: 'chapter05SecondLoop',
        label: '第五章 · 二周目',
        nodeIds: ['chapter_05_second_loop_01'],
        x: 2000,
        depth: 14,
        parents: ['endingDoubleGhosts']
      }, {
        id: 'choice14',
        label: '抉择14 · 热心的小月1',
        nodeIds: ['choice_14_help_xiaoyue'],
        x: 2000,
        depth: 15,
        parents: ['chapter05SecondLoop']
      }, {
        id: 'choice15',
        label: '抉择15 · 热心的小月2',
        nodeIds: ['choice_15_show_stone'],
        x: 2000,
        depth: 16,
        parents: ['choice14']
      }]));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StoryEngine.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameState.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, cloneGameState, requirementMet, applyEffect, createGameState;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      cloneGameState = module.cloneGameState;
      requirementMet = module.requirementMet;
      applyEffect = module.applyEffect;
      createGameState = module.createGameState;
    }],
    execute: function () {
      cclegacy._RF.push({}, "279e0Vvm2RHLolvVni7XDr2", "StoryEngine", undefined);
      var StoryEngine = exports('StoryEngine', /*#__PURE__*/function () {
        function StoryEngine(nodes, initialState) {
          var _this$state, _this$state$visitedNo, _this$state2, _this$state2$readNode, _this$state3, _this$state3$deathPoi;
          if (initialState === void 0) {
            initialState = createGameState();
          }
          this.state = void 0;
          this.nodes = nodes;
          this.assertNodeExists(initialState.nodeId);
          this.state = cloneGameState(initialState);
          (_this$state$visitedNo = (_this$state = this.state).visitedNodes) != null ? _this$state$visitedNo : _this$state.visitedNodes = {};
          (_this$state2$readNode = (_this$state2 = this.state).readNodes) != null ? _this$state2$readNode : _this$state2.readNodes = {};
          (_this$state3$deathPoi = (_this$state3 = this.state).deathPoints) != null ? _this$state3$deathPoi : _this$state3.deathPoints = {};
          this.state.visitedNodes[this.state.nodeId] = true;
        }
        var _proto = StoryEngine.prototype;
        _proto.getState = function getState() {
          return cloneGameState(this.state);
        };
        _proto.getCurrentNode = function getCurrentNode() {
          return this.nodes[this.state.nodeId];
        };
        _proto.getVisibleChoices = function getVisibleChoices() {
          var _node$choices,
            _this = this;
          var node = this.getCurrentNode();
          if (node.type !== 'choice') {
            return [];
          }
          return ((_node$choices = node.choices) != null ? _node$choices : []).filter(function (choice) {
            var _choice$requires;
            return ((_choice$requires = choice.requires) != null ? _choice$requires : []).every(function (requirement) {
              return requirementMet(_this.state, requirement);
            });
          });
        };
        _proto.advance = function advance() {
          var current = this.getCurrentNode();
          if (current.type !== 'line' || !current.next) {
            return current;
          }
          this.state.readNodes[current.id] = true;
          this.recordHistory(current);
          this.moveTo(current.next);
          return this.getCurrentNode();
        };
        _proto.choose = function choose(choiceId) {
          var current = this.getCurrentNode();
          var choice = this.getVisibleChoices().find(function (candidate) {
            return candidate.id === choiceId;
          });
          if (current.type !== 'choice' || !choice) {
            throw new Error("Choice is not available: " + choiceId);
          }
          this.state.readNodes[current.id] = true;
          this.recordHistory(current, choice.text);
          for (var _iterator = _createForOfIteratorHelperLoose((_choice$effects = choice.effects) != null ? _choice$effects : []), _step; !(_step = _iterator()).done;) {
            var _choice$effects;
            var effect = _step.value;
            applyEffect(this.state, effect, choice.id);
          }
          this.moveTo(choice.target);
          return this.getCurrentNode();
        };
        _proto.hasVisited = function hasVisited(nodeId) {
          return Boolean(this.state.visitedNodes[nodeId]);
        };
        _proto.hasRead = function hasRead(nodeId) {
          return Boolean(this.state.readNodes[nodeId]);
        };
        _proto.returnToVisited = function returnToVisited(nodeId) {
          this.assertNodeExists(nodeId);
          if (!this.hasVisited(nodeId)) {
            throw new Error("Story node is locked: " + nodeId);
          }
          this.moveTo(nodeId, false);
          return this.getCurrentNode();
        };
        _proto.moveTo = function moveTo(nodeId, applyNodeEffects) {
          if (applyNodeEffects === void 0) {
            applyNodeEffects = true;
          }
          this.assertNodeExists(nodeId);
          this.state.nodeId = nodeId;
          this.state.visitedNodes[nodeId] = true;
          if (applyNodeEffects) {
            for (var _iterator2 = _createForOfIteratorHelperLoose((_this$nodes$nodeId$ef = this.nodes[nodeId].effects) != null ? _this$nodes$nodeId$ef : []), _step2; !(_step2 = _iterator2()).done;) {
              var _this$nodes$nodeId$ef;
              var effect = _step2.value;
              applyEffect(this.state, effect);
            }
          }
          this.state.updatedAt = Date.now();
        };
        _proto.recordHistory = function recordHistory(node, choiceText) {
          var speaker = node.speaker ? node.speaker + "\uFF1A" : '';
          var suffix = choiceText ? " [" + choiceText + "]" : '';
          this.state.history.push("" + speaker + node.text + suffix);
          if (this.state.history.length > 120) {
            this.state.history.splice(0, this.state.history.length - 120);
          }
        };
        _proto.assertNodeExists = function assertNodeExists(nodeId) {
          if (!this.nodes[nodeId]) {
            throw new Error("Unknown story node: " + nodeId);
          }
        };
        return StoryEngine;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StoryHistory.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        getHistoryWindowStart: getHistoryWindowStart,
        getStoryUnlockPercentage: getStoryUnlockPercentage,
        getUnlockedStoryHistory: getUnlockedStoryHistory
      });
      cclegacy._RF.push({}, "0a323P6qUtB5qW0RGrDeDJs", "StoryHistory", undefined);
      var HISTORY_VISIBLE_ENTRY_COUNT = exports('HISTORY_VISIBLE_ENTRY_COUNT', 5);
      function getUnlockedStoryHistory(nodes, visitedNodes) {
        return Object.values(nodes).filter(function (node) {
          return Boolean(visitedNodes[node.id]);
        }).map(function (node) {
          var _node$speaker;
          return {
            id: node.id,
            chapter: node.chapter,
            speaker: (_node$speaker = node.speaker) != null ? _node$speaker : node.type === 'choice' ? '抉择' : node.type === 'end' ? '结局' : '旁白',
            text: node.text,
            type: node.type
          };
        });
      }
      function getHistoryWindowStart(entryCount, focusIndex, visibleCount) {
        if (visibleCount === void 0) {
          visibleCount = HISTORY_VISIBLE_ENTRY_COUNT;
        }
        var maximumStart = Math.max(0, entryCount - visibleCount);
        return Math.min(maximumStart, Math.max(0, focusIndex - Math.floor(visibleCount / 2)));
      }
      function getStoryUnlockPercentage(nodes, visitedNodes) {
        var nodeIds = Object.keys(nodes);
        if (nodeIds.length === 0) {
          return 0;
        }
        var unlockedCount = nodeIds.filter(function (nodeId) {
          return Boolean(visitedNodes[nodeId]);
        }).length;
        if (unlockedCount === 0) {
          return 0;
        }
        if (unlockedCount >= nodeIds.length) {
          return 100;
        }
        return Math.max(1, Math.round(unlockedCount / nodeIds.length * 100));
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StoryTypes.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1d09fF4V45BT5jLXvhhrTAA", "StoryTypes", undefined);
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});