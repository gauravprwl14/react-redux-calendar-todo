import React, { Component } from "react";
import { Col } from "reactstrap";
import dsTrain from "./../../assets/images/train.png";
import ScrollArea from "react-scrollbar";



class RightsideBar extends Component {
	render() {
		return (
			<ScrollArea
            speed={0.8}
            className="rightSideBar"
            contentClassName="content"
            horizontal={false}

            renderThumbHorizontal={this.renderThumbHorizontal}
            >
				<img src={dsTrain} alt="train" />
          </ScrollArea>
		);
		}
}

export default RightsideBar;
