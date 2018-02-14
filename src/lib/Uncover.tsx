import * as React from 'react';
import * as anime from 'animejs';
import { UncoverAnimationItem } from './sliceRevealerConfig';

export interface Props {
    slicesTotal: number;
    slicesColor: string;
    orientation: 'vertical' | 'horizontal';
    slicesOrigin: {
        show: string;
        hide: string;
    };
}

export interface State {
    isCovered: boolean;
}

class Uncover extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isCovered: true
        };
        this.show = this.show.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    render() {
        let slices: any[] = [];
        for (let i; i < this.props.slicesTotal; i++) {
            slices.push(<div className="uncover__slice" style={{ color: this.props.slicesColor }} />);
        }

        return (
            <div className="uncover">
                <div className="uncover__img" />
                <div className={`uncover__slices uncover__slices--${this.props.orientation}`} >
                    {slices}
                </div>
            </div>
        );
    }

    componentDidMount() {
        if (!this.state.isCovered) {
            this.show();
        }
    }

    show(animation: boolean = false) {
        if (!this.state.isCovered) {
            return;
        }

        return this.toggle(animation);
    }

    toggle(animation: boolean) {
        this.setState({ isCovered: !this.state.isCovered });

        if (!animation) {
            const slices = Array.from(document.querySelectorAll('.uncover__slice'));
            slices.forEach((slice) => {
                const style = !this.state.isCovered
                    ? this.props.orientation === 'vertical' ? 'translateY(100%)' : 'translateX(100%)'
                    : 'none';
                slice.setAttribute('style', style);
            });
        } else {
            const slices = Array.from(document.querySelectorAll('.uncover__slice'));
            const img = document.querySelector('.uncover__img');
            
            let settings = {
                slices: {
                    targets: slices,
                    duration: 800,
                    delay: (_, i) => i * 80,
                    easing: 'easeInOutQuart',
                    translateX: this.props.orientation === 'vertical'
                        ? '0%'
                        : !this.state.isCovered
                            ? this.props.slicesOrigin.show === 'right' ? '100%' : '-100%'
                            : this.props.slicesOrigin.hide === 'right' ? ['100%', '0%'] : ['-100%', '0%'],

                    translateY: this.props.orientation === 'vertical'
                        ? !this.state.isCovered
                            ? this.props.slicesOrigin.show === 'bottom' ? '100%' : '-100%'
                            : this.props.slicesOrigin.hide === 'bottom' ? ['100%', '0%'] : ['-100%', '0%']
                        : '0%'
                },
                image: {
                    targets: img,
                    duration: 200
                },
            };

            anime.remove(slices);
            anime.remove(img);

            let promises = [anime(settings.slices).finished];
            if (settings.image.duration) {
                promises.push(anime(settings.image).finished);
            }
            return Promise.all(promises);
        }
    }
}

export default Uncover;