import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import Preloader from "../common/Preloader";
import ChartTitle from "../common/ChartTitle"

export default class YearInscriptionChart extends Component {
  state = {};

  componentDidMount() {
    let years = [];
    let yearCounter = this.props.yearStart;

    while (yearCounter <= this.props.yearEnd) {
      years.push(yearCounter);
      yearCounter++;
    }

    this.setState({
      data: {
        labels: years,
        datasets: [
          {
            label: "Inscriptions",
            fill: false,
            lineTension: 0.1,
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
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.props.chartData
          }
        ]
      }
    });
    console.log(this.props.chartData);
  }

  render() {
    const { yearStart, yearEnd } = this.props;

    if (!this.props.chartData || this.props.chartData.length < 5) {
      return <Preloader />;
    } else {
      return (
        <div>
          <ChartTitle text={"Inscriptions between " +yearStart +" and " + yearEnd} />
          <Bar ref="chart" data={this.state.data} />
        </div>
      );
    }
  }
}

YearInscriptionChart.propTypes = {
  chartData: PropTypes.array.isRequired,
  yearStart: PropTypes.number.isRequired,
  yearEnd: PropTypes.number.isRequired
};
