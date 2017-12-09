import * as React from 'react';
import RevealFx, { RevealFxProps } from '../../lib/RevealFx';
import './Example.css';

interface Props {
    description: string;
    revealProps: RevealFxProps;
}

class Example extends React.PureComponent<Props> {
    ref: RevealFx | null;
    render() {
        return (
            <div className="example">
                <div className="example-controller">
                    <span>
                        {this.props.description}
                    </span>
                    <button
                        onClick={() => {
                            if (this.ref) {
                                this.ref.reveal();
                            }
                        }}
                        children="Invoke"
                    />
                </div>
                <div className="example-content">
                    <RevealFx
                        ref={(r) => this.ref = r}
                        {...this.props.revealProps}
                    >
                        {this.props.children}
                    </RevealFx>
                </div>
            </div>
        );
    }
}

export default Example;