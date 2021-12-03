import React from "react";

function SocialNetIcon() {
    return (
        <div className="Section">
            <div className="Section__Block Section__SocialShare Fb">
                <span className="Fb__Inner"></span>
                <a className="Section__Cta Fb" href="https://www.facebook.com/groups/ssdrus/">Like</a>
            </div>
            <div className="Section__Block Section__SocialShare Tw">
                <span className="Tw__Inner"></span>
                <a className="Section__Cta Tw" href="http://twitter.com/ssdru">Tweet</a>
            </div>
           
        </div>
    );
}

export default SocialNetIcon;
