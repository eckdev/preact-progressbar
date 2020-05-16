import { h, Component } from 'preact';
import ProgressBar from './progressbar'

export default class App extends Component {
	
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<ProgressBar continuousStart={true}></ProgressBar>
			</div>
		);
	}
}
