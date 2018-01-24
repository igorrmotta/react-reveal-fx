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
    overlayContent?: {
        delay: number;
        content: JSX.Element;
    };
}
export interface RevealFxState {
    isAnimating: boolean;
}
declare class RevealFx extends React.Component<RevealFxProps, RevealFxState> {
    el: HTMLDivElement | undefined;
    content: HTMLDivElement | undefined;
    revealer: HTMLDivElement | undefined;
    overlayContent: HTMLDivElement | undefined;
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
