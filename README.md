This library uses [animejs](http://animejs.com).

[original source code](https://github.com/codrops/BlockRevealers/)

# Usage

```
import RevealFx from 'react-reveal-fx';

...

class ExerciseFrame extends React.PureComponent<Props> {
    revealFx: RevealFx;
    render() {
        return (
            <RevealFx
                ref={(r) => (!!r) ? this.revealFx = r : {}}
                isContentHidden={false}
                revealSettings={{
                    bgcolor: '#7f40f1',
                    delay: 250,
                    onCover: (contentEl, revealerEl) => {
                        contentEl.style.opacity = '1';
                        return true;
                    }
                }}
            >
                <h1>Hello There </h1>
            </RevealFx>
        );
    }

    componentDidUpdate() {
        this.revealFx.reveal();
    }
}
```

===

Typescript Definitinos included

==============

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).