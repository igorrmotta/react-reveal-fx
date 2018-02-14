import * as React from 'react';
import SliceRevealer from '../../lib/SliceRevealer';
import './Example.css';

interface Props {
    description: string;
}

class Example extends React.PureComponent<Props> {
    ref: SliceRevealer | null;
    render() {
        return (
            <div className="example">
                <div className="example-controller">
                    <span>
                        {this.props.description}
                    </span>
                    <button
                        onClick={() => {
                            // TODO
                        }}
                        children="Invoke"
                    />
                </div>
                <div className="example-content">
                    <SliceRevealer ref={(r) => this.ref = r}>
                        {this.props.children}
                    </SliceRevealer>
                </div>
            </div>
        );
    }
}

export default Example;