import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import Preloader from "../common/Preloader";
import ChartTitle from "../common/ChartTitle";

export default class MonthInscriptionChart extends Component {
  state = {};

  componentDidMount() {
    this.setState({
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "Oktober",
          "November",
          "December"
        ],
        datasets: [
          {
            label: "My First dataset",
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

  /*
    shouldComponentUpdate(nextProps, nextState){
      
      console.log('should ran')
      return (this.props.chartData !== nextProps.chartData || this.state !== nextState)
    }
    */

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.chartData !== this.state.data.datasets[0].data) {
      let newData = {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "Oktober",
          "November",
          "December"
        ],
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
            data: nextProps.chartData
          }
        ]
      };

      this.setState({
        data: newData
      });
    }
  }

  render() {
    if (!this.props.chartData || this.props.chartData.length < 12) {
      return <Preloader />;
    } else {
      return (
        <div>
          <ChartTitle text={"Inscriptions in" + this.props.year}/>
          <Line ref="chart" data={this.state.data} />
        </div>
      );
    }
  }
}

MonthInscriptionChart.propTypes = {
  chartData: PropTypes.array.isRequired,
  year: PropTypes.number.isRequired
};
