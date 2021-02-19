import React, { Fragment } from 'react';
import { Line } from 'react-chartjs-2';
import { colorSelector } from 'utils/HelperFunctions';

const genData = (props: Props) => {
  const {
    workordersData,
    workordersPmData,
    title1,
    title2,
    fill,
    color1,
    color2,
    borderBlack,
  } = props;
  return {
    labels: [...Array(53).keys()].slice(1),
    datasets: [
      {
        label: title2,
        data: workordersPmData,
        fill,
        backgroundColor: color2,
        borderColor: borderBlack ? 'black' : color2,
        borderWidth: 1,
      },
      {
        label: title1,
        data: workordersData,
        fill,
        backgroundColor: color1,
        borderColor: borderBlack ? 'black' : color1,
        borderWidth: 1,
      },
    ],
  };
};

interface Props {
  workordersData: number[];
  workordersPmData: number[];
  title1: string;
  title2: string;
  stacked?: boolean;
  fill?: boolean;
  color1?: string;
  color2?: string;
  borderBlack?: boolean;
}

const LineChart: React.FC<Props> = ({
  workordersData,
  workordersPmData,
  title1,
  title2,
  stacked = false,
  fill = true,
  color1 = colorSelector(4),
  color2 = colorSelector(3),
  borderBlack = false,
}) => {
  const options = {
    legend: {
      reverse: true,
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          stacked,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <Fragment>
      <div style={{ height: '35vh' }}>
        <Line
          data={genData({
            workordersData,
            workordersPmData,
            title1,
            title2,
            fill,
            color1,
            color2,
            borderBlack,
          })}
          options={options}
        />
      </div>
    </Fragment>
  );
};

export default LineChart;
