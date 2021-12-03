import React from "react";

class ArticlesPreView extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            previewList: ''
        };

        this.handleAnimation = this.handleAnimation.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleAnimation);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleAnimation);
    }

    handleAnimation() {
        if (window.scrollY >= 900 ) {
            this.setState({previewList: 'Active'});
        } 
        else if (window.scrollY <= 700 && this.state.previewList === 'Active'){
            this.setState({previewList: ''});
        }
    }

    
    
    render() {
        return (
            <section className="Preview">
                <div className="Preview__Container">
                    <div className="Preview__Description">
                        <h2>Самые популярные потоки</h2>
                    </div>
                    <div className={`Preview__List ${this.state.previewList}`}>
                        <div className="Preview__Item Preview__Item--img1">Искусственный интеллект</div>
                        <div className="Preview__Item Preview__Item--img2">Астрофизика</div>
                        <div className="Preview__Item Preview__Item--img3">Разработка</div>
                        <div className="Preview__Item Preview__Item--img4">Программирование игр</div>
                        <div className="Preview__Item Preview__Item--img5">Мобильная разработка</div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ArticlesPreView;
