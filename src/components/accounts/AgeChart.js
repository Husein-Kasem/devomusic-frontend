import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import PropTypes from "prop-types";
import Preloader from "../common/Preloader";
import { getRandomColor } from "../../utils";
import ChartTitle from "../common/ChartTitle";

export default class AgeChart extends Component {
  state = {};

  componentDidMount() {
    let obj = {};
    obj = this.props.chartData;

    let labels = [];
    let pieData = [];
    let color = [];

    Object.keys(obj).forEach(function(key) {
      color.push(getRandomColor(color));
      labels.push(
        key.replace("<", "Younger than ").replace(">", "Older than ")
      );
      pieData.push(obj[key]);
      console.log(key, obj[key]);
    });

    this.setState({
      data: {
        labels: labels,
        datasets: [
          {
            label: "Taboun",
            fill: false,
            lineTension: 0.1,
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
            pointRadius: 1,
            pointHitRadius: 10,
            data: pieData,
            backgroundColor: color
          }
        ]
      }
    });
  }

  render() {
    if (!this.props.chartData || this.props.chartData.length < 1) {
      return <Preloader />;
    } else {
      return (
        <div>
          <ChartTitle text={"Target age"} />
          <Pie ref="chart" data={this.state.data} />
        </div>
      );
    }
  }
}

AgeChart.propTypes = {
  chartData: PropTypes.object.isRequired
};
