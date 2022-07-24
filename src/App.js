import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      weight: 0,
      height: 0,
      result: 0,
      incm: 'in',
      unitW: 'Kgs',
      left: 1,
      right: 1,
      feet: 1.1,
      choose: true
    };
    this.handleInputWeight = this.handleInputWeight.bind(this);
    this.handleInputHeight = this.handleInputHeight.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
    this.handleChangeIncm = this.handleChangeIncm.bind(this);
    this.handleChangeWeightUnit = this.handleChangeWeightUnit.bind(this);
    this.handleChangeright = this.handleChangeright.bind(this);
    this.handleChangeleft = this.handleChangeleft.bind(this);
  }
  handleChangeright(e){
    const left = this.state.left;
    const right = parseInt(e.target.value);
    this.setState({feet: (left + right * 0.1),
    right: right,
    choose: true
    })
  
  }
  handleChangeleft(e){
    const right = this.state.right;
    const left = parseInt(e.target.value);
    this.setState({feet: (left + right * 0.1),
    left: left,
    choose: true
    })
  }
  handleChangeWeightUnit(e) {
    this.setState({unitW: e.target.value});
  }
  handleChangeIncm(e){
    this.setState({incm: e.target.value, choose: false});
    
  }
  handleCalculate(e) {
    axios({
      url:'bmicalc',
      method: 'post',
      data: {
          weight: this.state.weight,
          height: this.state.choose ? this.state.feet : this.state.height,
          unitH: this.state.choose ? 'ft': this.state.incm,
          unitW: this.state.unitW
      }
  }).then(response => {
      this.setState({result: response.data.result});
  }).catch(error=> {
      console.log('Error: ', JSON.parse(error));
    });
  }
  handleInputWeight(e) {
    this.setState({
      weight: parseInt(e.target.value)
    })
  }
  handleInputHeight(e){
    this.setState({
      height: parseInt(e.target.value),
      choose: false
    })
  }
  render (){
  return (
    <div className="container2">
        <div className="container">
            <h3 className="header">BMI INDEX CALCULATOR</h3>
            <div className="wg">

            <label htmlFor="weight" className="wgd">Weight</label>
            <input
            className="input"
            id="weight"
            onChange={this.handleInputWeight}
          />
          <select id="wg"  
            value={this.state.unitW} 
            onChange={this.handleChangeWeightUnit} 
            >
            <option value="kgs">Kg</option>
            <option value="Ibs">Ibs</option>
          </select>

          </div>
          <div className="ft">
            <label htmlFor="fgtt" className="wgd">Height</label>
            <div className="fgtt">
                <label htmlFor="fgandfg" className="wgd wgdd">ft</label>
            <select id="fg" className ="fgt"
                value={this.state.left} 
                onChange={this.handleChangeleft} 
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
              </select>
              <select id="fg" className="fgt secon"
                value={this.state.right} 
                onChange={this.handleChangeright} 
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>
          </div>
          <span className="wgd">or</span>
          <div className="incm">
            <div className="incmm">
            {'\u00A0'}{'\u00A0'}
                <input
                className="input2"
                id=""
                onChange={this.handleInputHeight}
              />
              <select id="fg" className="incmmm secon" 
               value={this.state.incm} 
               onChange={this.handleChangeIncm} 
              >
                <option value="in">in</option>
                <option value="cm">cm</option>
              </select>
            </div>
          </div>
          <button className="but wgd" onClick={this.handleCalculate}>CALCULATE BMI</button>
          </div>
          <div className="result">
            BMI: {this.state.result}
          </div>
        </div>
  );
  }
}

export default App;
