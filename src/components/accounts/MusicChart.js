import React, { Component } from "react";
import { HorizontalBar } from "react-chartjs-2";
import PropTypes from "prop-types";
import Preloader from "../common/Preloader";
import ChartTitle from "../common/ChartTitle";

export default class MusicChart extends Component {
  state = {};

  componentDidMount() {
    let obj = {};
    obj = this.props.chartData;

    let labels = [];
    let pieData = [];
    Object.keys(obj).forEach(function(key) {
      labels.push(key);
      pieData.push(obj[key]);
      console.log(key, obj[key]);
    });

    this.setState({
      data: {
        labels: labels,
        datasets: [
          {
            label: "listened",
            fill: false,
            lineTension: 1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 0,
            pointHitRadius: 10,
            data: pieData,
            fixedStepSize: 1
          }
        ]
      }
    });
    console.log(this.props.chartData);
  }

  render() {
    if (!this.props.chartData || this.props.chartData.length < 1) {
      return <Preloader />;
    } else {
      return (
        <div>
          <ChartTitle text={this.props.title}/>
          <HorizontalBar ref="chart" data={this.state.data} />
        </div>
      );
    }
  }
}

MusicChart.propTypes = {
  chartData: PropTypes.object.isRequired,
  title: PropTypes.object.isRequired
};
