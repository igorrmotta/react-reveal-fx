var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from 'react';
import * as anime from 'animejs';
var RevealFx = (function (_super) {
    __extends(RevealFx, _super);
    function RevealFx(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isAnimating: false
        };
        _this.getTransformSettings = _this.getTransformSettings.bind(_this);
        _this.reveal = _this.reveal.bind(_this);
        return _this;
    }
    RevealFx.prototype.componentDidMount = function () {
        this.reveal();
    };
    RevealFx.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { style: { position: 'relative' }, className: "block-revealer", ref: function (ref) {
                if (!!ref) {
                    _this.el = ref;
                }
            } },
            React.createElement("div", { style: {
                    opacity: (!!this.props.isContentHidden) ? 0 : 1
                }, className: "block-revealer__content", ref: function (ref) {
                    if (!!ref) {
                        _this.content = ref;
                    }
                } }, this.props.children),
            React.createElement("div", { className: "block-revealer__element", style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: '#000',
                    pointerEvents: 'none',
                    opacity: 0
                }, ref: function (ref) {
                    if (!!ref) {
                        _this.revealer = ref;
                    }
                } })));
    };
    RevealFx.prototype.getTransformSettings = function (direction) {
        var val, origin, origin2;
        switch (direction) {
            case 'lr':
                val = 'scale3d(0,1,1)';
                origin = '0 50%';
                origin2 = '100% 50%';
                break;
            case 'rl':
                val = 'scale3d(0,1,1)';
                origin = '100% 50%';
                origin2 = '0 50%';
                break;
            case 'tb':
                val = 'scale3d(1,0,1)';
                origin = '50% 0';
                origin2 = '50% 100%';
                break;
            case 'bt':
                val = 'scale3d(1,0,1)';
                origin = '50% 100%';
                origin2 = '50% 0';
                break;
            default:
                val = 'scale3d(0,1,1)';
                origin = '0 50%';
                origin2 = '100% 50%';
                break;
        }
        return {
            val: val,
            origin: { initial: origin, halfway: origin2 },
        };
    };
    RevealFx.prototype.reveal = function () {
        if (this.state.isAnimating) {
            return false;
        }
        this.setState({ isAnimating: true });
        var defaults = {
            duration: 500,
            easing: 'easeInOutQuint',
            delay: 0,
            bgcolor: '#f0f0f0',
            direction: 'lr',
            coverArea: 0
        };
        var revealSettings = this.props.revealSettings;
        var direction = revealSettings.direction || defaults.direction;
        var transformSettings = this.getTransformSettings(direction);
        this.revealer.style.webkitTransform =
            this.revealer.style.transform = transformSettings.val;
        this.revealer.style.webkitTransformOrigin =
            this.revealer.style.transformOrigin = transformSettings.origin.initial;
        this.revealer.style.backgroundColor = revealSettings.bgcolor || defaults.bgcolor;
        this.revealer.style.opacity = '1';
        var self = this;
        var animationSettings2 = {
            targets: self.revealer,
            duration: revealSettings.duration || defaults.duration,
            easing: revealSettings.easing || defaults.easing,
            complete: function () {
                self.setState({ isAnimating: false });
                if (typeof revealSettings.onComplete === 'function') {
                    revealSettings.onComplete(self.content, self.revealer);
                }
            }
        };
        var animationSettings = {
            targets: self.revealer,
            delay: revealSettings.delay || defaults.delay,
            duration: revealSettings.duration || defaults.duration,
            easing: revealSettings.easing || defaults.easing,
            complete: function () {
                self.revealer.style.webkitTransformOrigin =
                    self.revealer.style.transformOrigin = transformSettings.origin.halfway;
                if (typeof revealSettings.onCover === 'function') {
                    revealSettings.onCover(self.content, self.revealer);
                }
                anime(__assign({}, animationSettings2));
            },
        };
        var coverArea = revealSettings.coverArea || defaults.coverArea;
        if (direction === 'lr' || direction === 'rl') {
            animationSettings.scaleX = [0, 1];
            animationSettings2.scaleX = [1, coverArea / 100];
        }
        else {
            animationSettings.scaleY = [0, 1];
            animationSettings2.scaleY = [1, coverArea / 100];
        }
        if (typeof revealSettings.onStart === 'function') {
            revealSettings.onStart(self.content, self.revealer);
        }
        anime(animationSettings);
        return true;
    };
    return RevealFx;
}(React.Component));
export default RevealFx;
