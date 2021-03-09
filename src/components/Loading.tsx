import * as React from 'react';
import './sass/Loading.scss';

export const Loading = () => {
	return (<div className="loading-screen">
		<div className="loading-text">{"Loading..."}</div>
		<div className="loading-box">
			<img src={'./assets/loading3.png'} className="loading-image"/>
		</div>
	</div>);
}
