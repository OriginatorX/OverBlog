import React from "react";
import ReactDom from "react-dom";

class ModalEditor extends React.Component {

    constructor(props) {
        super(props);

        this.bodyDom = document.body;
        this.element = document.createElement('div');
    }

    componentDidMount() {
        this.bodyDom.appendChild(this.element);
    }

    componentWillUnmount() {
        this.bodyDom.removeChild(this.element);
    }

    
    render() {
        return (
            ReactDom.createPortal(
                this.props.children,
                this.element
            )
        );
    }
}

export default ModalEditor;
