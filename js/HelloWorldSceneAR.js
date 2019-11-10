"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroGeometry,
  ViroMaterials,
  ViroPortal,
  ViroPortalScene,
  ViroImage,
  Viro3DObject,
  Viro360Image,
  ViroAmbientLight
} from "react-viro";

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "2DO PARCIAL",
      name_one: "",
      name_two: ""
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroText
          text={this.state.name_two}
          scale={[1, 1, 1]}
          position={[1, 2, -1]}
          style={styles.firstNameStyle}
        />
        <ViroImage
          height={0.3}
          width={0.3}
          position={[0, 1, -2]}
          placeholderSource={require("./res/moon.png")}
          source={require("./res/moon.png")}
        />
        <ViroText
          text={this.state.name_one}
          scale={[1, 1, 1]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
        <ViroAmbientLight color="#ffffff" intensity={200} />

        <ViroPortalScene
          passable={true}
          dragType="FixedDistance"
          onDrag={() => {}}
        >
          <ViroPortal position={[0, 0, -1]} scale={[0.1, 0.1, 0.1]}>
            <Viro3DObject
              source={require("./res/portal_ship/portal_ship.vrx")}
              resources={[
                require("./res/portal_ship/portal_ship_diffuse.png"),
                require("./res/portal_ship/portal_ship_normal.png"),
                require("./res/portal_ship/portal_ship_specular.png")
              ]}
              type="VRX"
            />
          </ViroPortal>
          <Viro360Image source={require("./res/360_space.jpg")} />
        </ViroPortalScene>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        name_one: "<DevHood/>",
        name_two: "Alex Bores"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

ViroMaterials.createMaterials({
  moon: {
    shininess: 2.0,
    lightingModel: "Constant",
    diffuseTexture: require("./res/moon.png")
  }
});

var styles = StyleSheet.create({
  firstNameStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#000",
    textAlignVertical: "center",
    textAlign: "center"
  },
  secondNameStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#FF0000",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

module.exports = HelloWorldSceneAR;
