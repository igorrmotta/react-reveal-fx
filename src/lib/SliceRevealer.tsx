import * as React from 'react';
import { SliceRevealerConfig } from './sliceRevealerConfig';

export type Props = {
    config: SliceRevealerConfig;
};

export interface State {
    isAnimating: boolean;
}

class SliceRevealer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isAnimating: false,
        };
    }

    render() {
        return (
            <div className="slides">
                <div className="slide">
                    <div className="slide__img" style={{ backgroundColor: 'black' }} />
                </div>
            </div>
        );
    }
}

export default SliceRevealer;