import React from "react";

import ModalEditor from './ModalEditor';

// Image import
import closeCross from '../../images/close-cross.jpg';

// Component for managing the creation of modal window
class ModalWindow extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isShow: false,
            articleText: '',

            darkMode: '',
        };

        this.handleShowModal    = this.handleShowModal.bind(this);
        this.handleHideModal    = this.handleHideModal.bind(this);
        this.handleTextInput    = this.handleTextInput.bind(this);
        this.handleThemeUpdate  = this.handleThemeUpdate.bind(this);
    }

    handleShowModal() {
        this.setState({ isShow: true });
        this.props.videoActive(false);
        this.props.hideOverFlow(true);
    }

    handleHideModal() {
        this.setState({ isShow: false });
        this.props.videoActive(true);
        this.props.hideOverFlow(false);
    }

    handleTextInput(e) {
        this.setState({
            articleText: e.target.value
        });
    }

    handleThemeUpdate() {
        if (this.state.darkMode === '') {
            this.setState({darkMode: 'DarkMode'});
        } else {
            this.setState({darkMode: ''});
        }
    }

    
    
    render() {
        const editor = this.state.isShow ? (
            <ModalEditor>
               <section className={`Modal ${this.state.darkMode}`}>
                   <div className="Modal__Control">
                        
                        <div className="Switch">
                            <input 
                                className="Switch__Theme" 
                                type="checkBox" 
                                onClick={this.handleThemeUpdate}
                            />
                        </div>              
                       
                        <button className="Close" onClick={this.handleHideModal}> 
                            <img src={closeCross} className="Close__Cross" alt="close" />
                        </button>
                   </div>
                   <div className="Modal__Editor">
                        <div className="Modal__Menu">
                            <button className="Btn" onClick={this.handleHideModal}>
                                Push article
                            </button>  
                        </div>
                        <div className="Modal__TextEditor">
                            <textarea 
                                className={`Modal__TextArea ${this.state.darkMode}`} 
                                value={this.state.articleText} 
                                onChange={this.handleTextInput} 
                                placeholder="Write here"
                            >
                            </textarea>
                        </div>              
                    </div>    
                </section>
            </ModalEditor>
        ): null;

        return (
            <>  
                <button 
                    className={this.props.className} 
                    onClick={this.handleShowModal}
                >
                    Enjoy
                </button>
                {editor}
            </>
        );
    }
}

export default ModalWindow;