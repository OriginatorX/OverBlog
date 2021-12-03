import React from "react";
import SocialNetIcon from "./SocialNet";

import {request} from '../../../middleware/http.js';

class LinkToUs extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {
                name: '',
                surname: '',
                feed: ''
            }
        };

        this.handleChangeFeed   = this.handleChangeFeed.bind(this);
        this.handleCleanUpFeed  = this.handleCleanUpFeed.bind(this);
        this.handleSubmitFeed   = this.handleSubmitFeed.bind(this);
    }


    handleChangeFeed(e) {
        this.setState({
            form: {...this.state.form, [e.target.name]: e.target.value}
        });
    }

    handleCleanUpFeed() {
        this.setState(prevState => ({
            form: {
                ...prevState.form, 
                name: '', 
                surname: '', 
                feed: ''
            }
        }));
    }

    handleSubmitFeed(event) {
        event.preventDefault();

        request('/api/feed', 'POST', {...this.state.form})
            .then()
            .catch(error => console.log(error.message))
            
        this.handleCleanUpFeed();  
    }


    
    render() {
        return (
            <footer className="Footer">
                <div className="Footer__Container">
                    <div className="Footer__AboutUs">
                        <div className="Footer__Faq">
                            <h2>FAQ</h2>
                            
                            <a href="/">What's new</a>
                            <a href="/">More about articles</a>
                            <a href="/">Contacts</a>
                            <a href="/">Support us</a>
                        </div>
                        <div className="SocialNet">
                            <SocialNetIcon />
                        </div>
                    </div>
                
                    <div className="Footer__SubmitFeed">
                        <form 
                            onSubmit={this.handleSubmitFeed} 
                            className="Footer__SendFeed"
                        >
                            <div className="Footer__SenderInfo">

                                <div className="Footer__Name">
                                    <label htmlFor="name">First name</label>
                                    <input 
                                        name="name"
                                        required 
                                        placeholder="Nik"
                                        value={this.state.form.name}
                                        onChange={this.handleChangeFeed}
                                    />
                                </div>
                                
                                <div className="Footer__Surname">
                                    <label htmlFor="surname">Second name</label>
                                    <input 
                                        name="surname" 
                                        required
                                        placeholder="Fetisoff" 
                                        value={this.state.form.surname}
                                        onChange={this.handleChangeFeed}
                                    />
                                </div>

                            </div>

                            <label htmlFor="feed"></label>
                            <textarea 
                                className="Footer__FeedBack" 
                                name="feed"
                                required 
                                placeholder="Write here"
                                value={this.state.form.feed}
                                onChange={this.handleChangeFeed}
                            />
                            
                            <div className="Footer__Submit">
                                <button 
                                    className="Btn" 
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>                
                        </form>
                    </div>
                </div>
            
                <div className="Footer__CopyRight"> 
                    <b>
                        Created with &#10084; by <a href="https://github.com/Originatorx/" >Nik Fetisoff</a>
                    </b>
                </div>
            </footer>
        );
    }
};

export default LinkToUs;
