import React from 'react';
import {Link} from "react-router-dom";

const emptyUserIcon = 'https://img.icons8.com/ios-filled/50/000000/user.png';

class Nav extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            bgColor: '',
            textColor: ''
        };

        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        if (window.scrollY > 0) {
            this.setState({
                bgColor: 'Light',
                textColor: 'DarkText'
            });
        } else {
            this.setState({
                bgColor: '',
                textColor: ''
            });
        }
    }


    
    render() {
        return (
            <header className={`Nav ${this.state.bgColor}`}>
                <div className="Nav__Container">
                    <div className={`Nav__Flexible ${this.state.textColor}`}>
                        <div className="Logo"> 
                            <Link className="Nav__Home" to="/">OverBlog</Link> 
                        </div>
                        <nav className="Nav__ReferenceBar">
                            <Link className="Nav__Link" to="/">Home</Link>
                            <Link className="Nav__Link" to="/articles">Articles</Link>
                            
                            <div className="Account">
                                <img 
                                    src={emptyUserIcon} 
                                    className="Account__Icon" 
                                    onClick={() => this.props.open(true)} 
                                />
                                <div className="Account__OptionsBlock">
                                    <div 
                                        className="Account__Options"
                                        onClick={() => this.props.auth.signOut()}    
                                    >
                                        <span className="Account__Btn">Sign out</span>
                                    </div>
                                </div>  
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        );
    }
}

export default Nav;
