import React, {PureComponent} from "react";
import { Button } from "reactstrap";
import Papa from "papaparse"


export class Form extends PureComponent {
  constructor(props) {
    super(props)
    this.state= {
      csv1: null,
      csv2: null,
      csv1data: null,
      csv2data: null,
      output: [],
      form_complete: false,
      selected_option: "1",
      shouldUpdate: true,
    }
  }

  handleSubmit = () => {
    Papa.parse(this.state.csv1, {
      complete: this.getCsv1Data
    })
    Papa.parse(this.state.csv2, {
      complete: this.getCsv2Data
    })
  }

  getCsv1Data = (value) => {
    this.setState({
      csv1data: value
    })
  }
  getCsv2Data = (value) => {
    this.setState({
      csv2data: value
    })
  }

  uploadCSV1 = (e) => {
    this.setState({
      csv1: e.target.files[0]
    })

  }
  uploadCSV2 = (e) => {
    this.setState({
      csv2: e.target.files[0]
    })
  }

  selectConcern = (e) => {
    this.setState({
      selected_option: e.target.value
    })
  }

  compareChannelIDs = (string1, string2) => {
    string1 = string1.slice(-22);
    string2 = string2.slice(-22);

    return string1 === string2;
  }

  compareLists = (list1, list2) => {
    const output = [];
    for (let i = 0; i < list1.data.length - 1; i++) {
      //  no concern selected
      if (this.state.selected_option === "1") {
        if (!this.compareChannelIDs(list1.data[i][1], list2.data[i][1]) || list1.data[i][2] !== list2.data[i][2]) {
          output.push(list1.data[i][0])
        }
        // channel id concern
      } else if (this.state.selected_option === "2") {
        if (!this.compareChannelIDs(list1.data[i][1], list2.data[i][1])) {
          output.push(list1.data[i][0])
        }
        //  subscriber count concern
      } else {
        if (list1.data[i][2] !== list2.data[i][2]) {
          output.push(list1.data[i][0])
        }
      }
    }
    this.setState({
      output: output
    }, () => {this.props.renderOutput(output)})

  }
  resetFiles = () => {
    const forms = document.getElementsByClassName("file_form");
    for (const form of forms) {
      form.reset()
    }
    this.props.clearOutput()
    this.setState({
      csv1: null,
      csv2: null,
      csv1data: null,
      csv2data: null,
      output: [],
      form_complete: false,
      selected_option: "1",
      shouldUpdate: true,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(!prevState.form_complete && this.state.csv1 !== null && this.state.csv2 !== null) {
      this.setState({
        form_complete: true
      })
    } else if (this.state.csv1data && this.state.csv2data && this.state.shouldUpdate) {
      this.compareLists(this.state.csv1data, this.state.csv2data)
      this.setState({
        shouldUpdate:false
      })
    }
  }

  render() {
    return(
      <React.Fragment>
        <div className="form_container">
        <div className="radio_container">
        <form className="form">
          <label>Concern: </label>
          <br></br>
            <div className="radio_div">
            <label>None: </label>
            <input type="radio" name="no_selection" className="radio_btn" id="no_selection" checked={this.state.selected_option === "1"} value="1" onChange={this.selectConcern}/>
            </div>

            <div className="radio_div">
            <label>Channel Ownership: </label>
            <input type="radio" id="channel" name="channel_id" value="2" checked={this.state.selected_option === "2"} className="radio_btn" onChange={this.selectConcern}/>
            </div>

            <div className="radio_div">
            <label>Subscriber Count: </label>
            <input type="radio" id="subscribers" name="subscribers" checked={this.state.selected_option === "3"} className="radio_btn" value="3" onChange={this.selectConcern}/>
            </div>
        </form>
        </div>
        <div className="file_wrapper">
        <div className="file_container">
        <form className="file_form">
          <label>CSV 1: </label>
          <input type="file" accept=".csv" className="file_import" onChange={this.uploadCSV1}/>

          <label>CSV 2: </label>
          <input type="file" accept=".csv" className="file_import" onChange={this.uploadCSV2}/>
        </form>
        </div>
        </div>
        <div className="form_btns">
        {
          this.state.form_complete && this.state.shouldUpdate ? <Button className="submit_btn" onClick={this.handleSubmit}>Submit</Button> : <Button className="submit_btn" disabled>Submit</Button>
        }
        {
          this.state.form_complete && !this.state.shouldUpdate ? <Button className="reset_btn" onClick={this.resetFiles}>Reset</Button> : <Button className="reset_btn" disabled>Reset</Button>
        }
        </div>
        </div>
      </React.Fragment>
    )
  }


}
export default Form;
