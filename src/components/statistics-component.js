import AbstractSmartComponent from './abstract-smart-component.js';
import {HIDDEN_CLASS, StatisticsGraph} from '../data.js';

import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default class Statistics extends AbstractSmartComponent {
  constructor(data) {
    super();
    this._data = data;
    this._drawCharts = this._drawCharts.bind(this);
  }

  getTemplate() {
    return (
      `<section class="statistics">
        <h2 class="visually-hidden">Trip statistics</h2>

        <div class="statistics__item statistics__item--money">
          <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
        </div>

        <div class="statistics__item statistics__item--transport">
          <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
        </div>

        <div class="statistics__item statistics__item--time-spend">
          <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
        </div>
      </section>`
    );
  }

  show() {
    this.getElement().classList.remove(HIDDEN_CLASS);
  }

  hide() {
    this.getElement().classList.add(HIDDEN_CLASS);
  }

  recoveryListeners() {}

  rerender(data) {
    this._data = data;

    super.rerender();
    this._drawCharts();
  }

  _drawCharts() {
    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const transportCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeCtx = this.getElement().querySelector(`.statistics__chart--time`);

    drawChart(moneyCtx, this._data, StatisticsGraph.MONEY);
    drawChart(transportCtx, this._data, StatisticsGraph.TRANSPORT);
    drawChart(timeCtx, this._data, StatisticsGraph.TIME_SPENT);
  }
}

const drawChart = (ctx, data, title) => {
  let types = [];
  let values = [];
  switch (title) {
    case StatisticsGraph.MONEY:
      types = data.sort((a, b) => (b.totalPrice - a.totalPrice)).map((el) => el.type.toUpperCase());
      values = data.sort((a, b) => (b.totalPrice - a.totalPrice)).map((el) => el.totalPrice);
      break;
    case StatisticsGraph.TRANSPORT:
      data = data.filter((el) => el.transport);
      types = data.sort((a, b) => (b.count - a.count)).map((el) => el.type.toUpperCase());
      values = data.sort((a, b) => (b.count - a.count)).map((el) => el.count);
      break;
    case StatisticsGraph.TIME_SPENT:
      types = data.sort((a, b) => (b.totalTime - a.totalTime)).map((el) => el.type.toUpperCase());
      values = data.sort((a, b) => (b.totalTime - a.totalTime)).map((el) => el.totalTime);
      break;
  }

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: types,
      datasets: [
        {
          data: values,
          backgroundColor: `#ffffff`,
          barPercentage: 0.9,
          minBarLength: 5
        }
      ],
    },
    options: {
      hover: false,
      layout: {
        padding: {
          left: 20,
          right: 50,
          top: 20,
          bottom: 20
        }
      },
      tooltips: {
        enabled: false
      },
      plugins: {
        datalabels: {
          anchor: `end`,
          align: `left`,
          font: {
            size: 12
          },
          color: `#000000`,
          formatter: (value) => {
            let formattedValue = ``;
            switch (title) {
              case `money`:
                formattedValue = value ? `€ ${value}` : ``;
                break;
              case `transport`:
                formattedValue = value ? `${value}x` : ``;
                break;
              case `time spent`:
                formattedValue = value ? `${value}H` : ``;
                break;
            }
            return formattedValue;
          }
        }
      },
      legend: {
        display: false
      },
      title: {
        display: true,
        text: title.toUpperCase(),
        position: `left`,
        fontSize: 20,
        fontStyle: `bold`,
      },
      scales: {
        xAxes: [{
          ticks: {
            min: 0,
            padding: 0,
          },
          display: false,
        }],
        yAxes: [{
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            fontSize: 14
          }
        }]
      }
    }
  });
};
