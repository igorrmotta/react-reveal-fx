/// <reference types="react" />
import * as React from 'react';
export interface RevealFxProps {
    isContentHidden: boolean;
    revealSettings: {
        direction?: 'lr' | 'rl' | 'tb' | 'bt';
        bgcolor?: string;
        delay: number;
        duration?: number;
        easing?: string;
        coverArea?: number;
        onCover?: (contentEl: HTMLDivElement, revealerEl: HTMLDivElement) => boolean;
        onStart?: (contentEl: HTMLDivElement, revealerEl: HTMLDivElement) => boolean;
        onComplete?: (contentEl: HTMLDivElement, revealerEl: HTMLDivElement) => boolean;
    };
}
export interface RevealFxState {
    isAnimating: boolean;
}
declare class RevealFx extends React.Component<RevealFxProps, RevealFxState> {
    el: HTMLDivElement;
    content: HTMLDivElement;
    revealer: HTMLDivElement;
    constructor(props: RevealFxProps);
    componentDidMount(): void;
    render(): JSX.Element;
    getTransformSettings(direction: RevealFxProps['revealSettings']['direction']): {
        val: any;
        origin: {
            initial: any;
            halfway: any;
        };
    };
    reveal(): boolean;
}
export default RevealFx;