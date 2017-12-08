import * as React from 'react';
import * as anime from 'animejs';
import './revealer.css';
import './normalize.css';

interface Props {
    // If true, then the content will be hidden until it´s "revealed".
    isContentHidden: boolean;

    // The animation/reveal settings. This can be set initially or passed when calling the reveal method.
    revealSettings: {
        // Animation direction: left right (lr) || right left (rl) || top bottom (tb) || bottom top (bt).
        direction?: 'lr' | 'rl' | 'tb' | 'bt';

        // Revealer´s background color.
        bgcolor?: string;

        delay: number;

        // Animation speed. This is the speed to "cover" and also "uncover" the element 
        // (seperately, not the total time).
        duration?: number;

        // Animation easing. This is the easing to "cover" and also "uncover" the element.
        easing?: string;

        // percentage-based value representing how much of the area should be left covered.
        coverArea?: number;

        // Callback for when the revealer is covering the element (halfway through of the whole animation).
        onCover?: (contentEl: HTMLElement, revealerEl: HTMLElement) => boolean;

        // Callback for when the animation starts (animation start).
        onStart?: (contentEl: HTMLElement, revealerEl: HTMLElement) => boolean;

        // Callback for when the revealer has completed uncovering (animation end).
        onComplete?: (contentEl: HTMLElement, revealerEl: HTMLElement) => boolean;
    };
}

interface State {
    isAnimating: boolean;
}

class RevealFx extends React.Component<Props, State> {
    el: HTMLDivElement;
    content: HTMLDivElement;
    revealer: HTMLDivElement;

    constructor(props: Props) {
        super(props);
        this.state = {
            isAnimating: false
        };
        this.getTransformSettings = this.getTransformSettings.bind(this);
        this.reveal = this.reveal.bind(this);
    }

    componentDidMount() {
        this.reveal();
    }

    render() {
        return (
            <div
                style={{ position: 'relative' }}
                className="block-revealer"
                ref={(ref) => {
                    if (!!ref) {
                        this.el = ref;
                    }
                }}
            >

                {/* Content Element */}
                <div
                    style={{
                        opacity: (!!this.props.isContentHidden) ? 0 : 1
                    }}
                    className="block-revealer__content"
                    ref={(ref) => {
                        if (!!ref) {
                            this.content = ref;
                        }
                    }}
                >
                    {this.props.children}
                </div>

                {/* Revealer element (the one that animates) */}
                <div
                    className="block-revealer__element"
                    ref={(ref) => {
                        if (!!ref) {
                            this.revealer = ref;
                        }
                    }}
                />

            </div>
        );
    }

    /**
     * Gets the revealer element´s transform and transform origin.
     */
    getTransformSettings(direction: Props['revealSettings']['direction']) {
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
            // transform value.
            val: val,
            // initial and halfway/final transform origin.
            origin: { initial: origin, halfway: origin2 },
        };
    }

    reveal() {
        // Do nothing if currently animating.
        if (this.state.isAnimating) {
            return false;
        }

        this.setState({ isAnimating: true });

        // Set the revealer element´s transform and transform origin.
        const defaults = { // In case revealSettings is incomplete, its properties deafault to:
            duration: 500,
            easing: 'easeInOutQuint',
            delay: 0,
            bgcolor: '#f0f0f0',
            direction: 'lr' as Props['revealSettings']['direction'],
            coverArea: 0
        };
        const revealSettings = this.props.revealSettings;
        const direction = revealSettings.direction || defaults.direction;
        const transformSettings = this.getTransformSettings(direction);

        this.revealer.style.webkitTransform =
            this.revealer.style.transform = transformSettings.val;

        this.revealer.style.webkitTransformOrigin =
            this.revealer.style.transformOrigin = transformSettings.origin.initial;

        // Set the Revealer´s background color.
        this.revealer.style.backgroundColor = revealSettings.bgcolor || defaults.bgcolor;

        // Show it. By default the revealer element has opacity = 0 (CSS).
        this.revealer.style.opacity = '1';

        // Animate it.
        var self = this;

        // Second animation step.
        const animationSettings2: anime.AnimeParams = {
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

        // First animation step.
        const animationSettings: anime.AnimeParams = {
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
                anime({
                    ...animationSettings2
                });
            },
        };

        var coverArea = revealSettings.coverArea || defaults.coverArea;
        if (direction === 'lr' || direction === 'rl') {
            animationSettings.scaleX = [0, 1];
            animationSettings2.scaleX = [1, coverArea / 100];
        } else {
            animationSettings.scaleY = [0, 1];
            animationSettings2.scaleY = [1, coverArea / 100];
        }

        if (typeof revealSettings.onStart === 'function') {
            revealSettings.onStart(self.content, self.revealer);
        }

        anime(animationSettings);
        return true;
    }
}

export default RevealFx;