import * as anime from 'animejs';

export interface UncoverOpt {
    slicesTotal: number;
    slicesColor: string;
    orientation: string;
    slicesOrigin: { show: string; hide: string; };
}

export interface SliceAnimation {
    delay?: (element: HTMLElement, index: number, length: number) => number;
    duration?: number;
    easing?: anime.EasingOptions;
}

export interface ImageAnimation {
    duration?: number;
    easing?: anime.EasingOptions;
    delay?: number;
    scale?: number[];
}

export interface UncoverAnimationItem {
    slices?: SliceAnimation;
    image?: ImageAnimation;
}

export interface UncoverAnimation {
    show: UncoverAnimationItem;
    hide: UncoverAnimationItem;
}

export interface SliceRevealerConfig {
    uncoverOpts: UncoverOpt[];
    uncoverAnimation: UncoverAnimation[];
}

export const config1: SliceRevealerConfig = {
    uncoverOpts: [
        {
            // total number of slices.
            slicesTotal: 4,
            // slices color.
            slicesColor: '#111',
            // 'vertical' || 'horizontal'.
            orientation: 'vertical',
            // 'bottom' || 'top' for vertical orientation and 'right' || 'left' for horizontal orientation.
            slicesOrigin: { show: 'top', hide: 'bottom' }
        },
        {
            slicesTotal: 7,
            slicesColor: '#111',
            orientation: 'horizontal',
            slicesOrigin: { show: 'right', hide: 'right' }
        },
        {
            slicesTotal: 9,
            slicesColor: '#111',
            orientation: 'vertical',
            slicesOrigin: { show: 'bottom', hide: 'bottom' }
        },
        {
            slicesTotal: 5,
            slicesColor: '#111',
            orientation: 'horizontal',
            slicesOrigin: { show: 'left', hide: 'left' }
        },
        {
            slicesTotal: 6,
            slicesColor: '#111',
            orientation: 'vertical',
            slicesOrigin: { show: 'bottom', hide: 'bottom' }
        }
    ],
    uncoverAnimation: []
};

export const config2: SliceRevealerConfig = {
    uncoverOpts: [
        {
            // total number of slices.
            slicesTotal: 11,
            // slices color.
            slicesColor: '#fff',
            // 'vertical' || 'horizontal'.
            orientation: 'horizontal',
            // 'bottom' || 'top' for vertical orientation and 'right' || 'left' for horizontal orientation.
            slicesOrigin: { show: 'left', hide: 'right' }
        },
        {
            slicesTotal: 8,
            slicesColor: '#fff',
            orientation: 'horizontal',
            slicesOrigin: { show: 'left', hide: 'right' }
        },
        {
            slicesTotal: 11,
            slicesColor: '#fff',
            orientation: 'horizontal',
            slicesOrigin: { show: 'left', hide: 'right' }
        },
        {
            slicesTotal: 8,
            slicesColor: '#fff',
            orientation: 'horizontal',
            slicesOrigin: { show: 'left', hide: 'right' }
        },
        {
            slicesTotal: 8,
            slicesColor: '#fff',
            orientation: 'horizontal',
            slicesOrigin: { show: 'left', hide: 'right' }
        }
    ],
    uncoverAnimation: [{
        show: {
            slices: { duration: 600, easing: 'easeInOutCirc', delay: (_, i) => i * 50 }
        },
        hide: {
            slices: { duration: 600, easing: 'easeInOutCirc', delay: (_, i) => i * 50 }
        }
    }]
};

export const config3: SliceRevealerConfig = {
    uncoverOpts: [
        {
            // total number of slices.
            slicesTotal: 5,
            // slices color.
            slicesColor: '#fff',
            // 'vertical' || 'horizontal'.
            orientation: 'vertical',
            // 'bottom' || 'top' for vertical orientation and 'right' || 'left' for horizontal orientation.
            slicesOrigin: { show: 'top', hide: 'top' }
        },
        {
            slicesTotal: 8,
            slicesColor: '#fff',
            orientation: 'horizontal',
            slicesOrigin: { show: 'left', hide: 'left' }
        },
        {
            slicesTotal: 11,
            slicesColor: '#fff',
            orientation: 'horizontal',
            slicesOrigin: { show: 'right', hide: 'right' }
        },
        {
            slicesTotal: 3,
            slicesColor: '#fff',
            orientation: 'vertical',
            slicesOrigin: { show: 'bottom', hide: 'bottom' }
        },
        {
            slicesTotal: 16,
            slicesColor: '#fff',
            orientation: 'vertical',
            slicesOrigin: { show: 'bottom', hide: 'bottom' }
        },
        {
            slicesTotal: 4,
            slicesColor: '#fff',
            orientation: 'horizontal',
            slicesOrigin: { show: 'left', hide: 'left' }
        },
        {
            slicesTotal: 10,
            slicesColor: '#fff',
            orientation: 'vertical',
            slicesOrigin: { show: 'top', hide: 'top' }
        },
        {
            slicesTotal: 8,
            slicesColor: '#d60b3f',
            orientation: 'horizontal',
            slicesOrigin: { show: 'right', hide: 'right' }
        },
        {
            slicesTotal: 6,
            slicesColor: '#250bd6',
            orientation: 'vertical',
            slicesOrigin: { show: 'top', hide: 'top' }
        }
    ],
    uncoverAnimation: [
        {
            show: {
                slices: { duration: 600, delay: (_, i, t) => (t - i - 1) * 100, easing: 'easeInOutCirc' }
            },
            hide: {
                slices: { duration: 600, delay: (_, i, t) => (t - i - 1) * 100, easing: 'easeInOutCirc' }
            }
        },
        {
            show: {
                slices: { duration: 600, delay: (_, i, t) => Math.abs(t / 2 - i) * 80, easing: 'easeInOutCirc' }
            },
            hide: {
                slices: { duration: 300, delay: (_, i, t) => Math.abs(t / 2 - i) * 40, easing: 'easeInOutCirc' }
            }
        },
        {
            show: {
                slices: { delay: (_, i, t) => anime.random(0, t) * 50 }
            },
            hide: {
                slices: { duration: 300, delay: (_, i, t) => anime.random(0, t) * 50 }
            }
        },
        {
            show: {
                slices: { duration: 1200, delay: (_, i) => i * 150, easing: 'easeOutExpo' }
            },
            hide: {
                slices: { duration: 500, delay: (_, i) => i * 150, easing: 'easeInOutExpo' }
            }
        },
        {
            show: {
                slices: { duration: 600, delay: (_, i, t) => Math.abs(t / 2 - i) * 80, easing: 'easeInOutCirc' }
            },
            hide: {
                slices: { duration: 600, delay: (_, i, t) => Math.abs(t / 2 - i) * 80, easing: 'easeInOutCirc' }
            }
        },
        {
            show: {
                slices: { duration: 400, delay: (_, i, t) => (t - i - 1) * 150, easing: 'easeInOutQuad' }
            },
            hide: {
                slices: { duration: 400, delay: (_, i, t) => (t - i - 1) * 30, easing: 'easeInOutQuad' }
            }
        },
        {
            show: {
                slices: { duration: 400, delay: (_, i, t) => Math.abs(t / 4 - i) * 40, easing: 'easeInOutSine' },
                image: {
                    duration: 900,
                    easing: 'easeOutCubic',
                    scale: [1.8, 1]
                }
            },
            hide: {
                slices: { duration: 400, delay: (_, i, t) => Math.abs(t / 4 - i) * 40, easing: 'easeInOutSine' }
            }
        },
        {
            show: {
                slices: { duration: 600, easing: 'easeInOutCirc', delay: (_, i) => i * 50 },
                image: {
                    duration: 1200,
                    delay: 350,
                    easing: 'easeOutCubic',
                    scale: [1.3, 1]
                }
            },
            hide: {
                slices: { duration: 300, easing: 'easeInOutCirc', delay: (_, i) => i * 30 }
            }
        },
        {
            show: {
                slices: { duration: 600, easing: 'easeInOutCirc', delay: (_, i) => i * 100 },
                image: {
                    duration: 1200,
                    delay: 350,
                    easing: 'easeOutCubic',
                    scale: [1.3, 1]
                }
            },
            hide: {
                slices: { duration: 300, easing: 'easeInOutCirc', delay: (_, i) => i * 40 }
            }
        }
    ]
};