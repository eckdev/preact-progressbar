import { h, Component } from 'preact';
export default class ProgressBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progressValue: 0,
            isFull:false
        }
    }
    continiouslyProgress = () => {
        const { percent } = this.props;     
        if (percent > 0) {
            this.setState({progressValue: percent});
        }
        else{
            const random = this.RandomInt(20, 30);
            this.setState({progressValue: random});
        }
        setInterval(() => {
            if (this.state.progressValue < 100) {
                const random = this.RandomInt(10, 50);
                this.setState({ progressValue: this.state.progressValue + random });
            }
            else if(this.state.progressValue >= 100){
                this.setState({isFull:true});
            } 
            else {
                clearInterval(0);
            }
        }, 1000);
    }

    RandomInt = (low, high) => {
        return Math.floor(Math.random() * (high - low) + low);
    }
    componentDidMount() {
        const { continuousStart } = this.props;
        if (continuousStart) {
            this.continiouslyProgress();
        }
    }
    static defaultProps = {
        className: '',
        color: 'rainbow',
        height: 3,
        hideDelay: .4,
        percent: 0,
        speed: .4,
        style: {}
    };
    render() {
        const {
            ...props
        } = this.props;

        let containerStyle = {
            opacity:  this.state.isFull ? 0 : 1,
            WebkitTransition: `${props.speed}s opacity`,
            transition: `${props.speed}s opacity`,
            WebkitTransitionDelay: `${this.state.progressValue < 100 ? 0 : props.hideDelay}s`,
            transitionDelay: `${this.state.progressValue < 100 ? 0 : props.hideDelay}s`
        };

        let barStyle = {
            display: 'inline-block',
            position: 'fixed',
            top: 0,
            left: 0,
            width: `${this.state.progressValue}%`,
            maxWidth: '100% !important',
            height: `${props.height}px`,
            borderRadius: '0 1px 1px 0',
            WebkitTransition: `${props.speed}s width, ${props.speed}s background-color`,
            transition: `${props.speed}s width, ${props.speed}s background-color`,            
            zIndex: '99999',
            ...props.style
        };

        if (props.color === 'rainbow') {
            barStyle.backgroundImage = props.style.backgroundImage || 'linear-gradient(to right,#27c4f5,#a307ba,#fd8d32,#70c050,#27c4f5)';
            barStyle.backgroundSize = props.style.backgroundSize || `100vw ${props.height}px`;
        } else {
            barStyle.backgroundColor = props.style.backgroundColor || props.color;
        }

        return (
            <div className={props.className} style={containerStyle}>
                <div className={props.className.length ? `${props.className}__bar` : ''} style={barStyle}></div>
            </div>
        );
    }

};
