import React from 'react';
import Particles from "react-tsparticles";
import { Engine } from "tsparticles";
import { loadFireworksPreset } from "tsparticles-preset-fireworks";

 class ParticlesContainer extends React.PureComponent <IProps> {
  
  // this customizes the component tsParticles installation
  async customInit(engine: Engine): Promise<void> {
    // this adds the preset to tsParticles, you can safely use the
    await loadFireworksPreset(engine);
  }

  render() {
    const options = {
      preset: "fireworks",
    };

    return <Particles options={options} init={this.customInit} />;
  }
}

export default ParticlesContainer;