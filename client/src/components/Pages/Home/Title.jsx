import React from 'react';

import typeWriter from '../../../videos/typewriter-lite.webm';

import ModalWindow from '../../ModalWindow';

class Title extends React.Component {

    constructor(props) {
        super(props);

        this.videoActive    = this.videoActive.bind(this);
        this.hideOverFlow   = this.hideOverFlow.bind(this);
    }

    videoActive(isActive) {
        let backgroundVideo = 
            document.querySelector('#ShowCase__BackgroundVideo');

        if(!backgroundVideo.paused && !isActive) {
            backgroundVideo.pause();
        } else {
            backgroundVideo.play();
        }
    }

    hideOverFlow(isHidden) {
        if (isHidden) {
            document.body.classList.add('hideOverflow');
        } else {
            document.body.classList.remove('hideOverflow');
        }
    }


    
    render() {
        return (
            <section className="ShowCase">
                <div className="ShowCase__VideoContainer">
                    <video 
                        id="ShowCase__BackgroundVideo" 
                        src={typeWriter} 
                        autoPlay muted loop 
                    />
                </div>
                <div className="ShowCase__Title">
                    <h1 >Welcome to OverBlog</h1>
                    <h3>Create your perfect article right now</h3>
                    <ModalWindow 
                        className="Btn" 
                        videoActive={this.videoActive} 
                        hideOverFlow={this.hideOverFlow} 
                    />
                </div>
              
            </section>
        );
    }
}

export default Title;
