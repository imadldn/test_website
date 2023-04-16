import { useState, useEffect } from 'react';
import { Wrapper } from './SocialGrade.styles';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend);

export type SocialGradeProps = {
    NSSeCs: string[];
    values: number[]
};
const SocialGradeDict: Record<string, string> = {
  "1. Higher managerial, administrative and professional occupations":"Higher managerial occupation",
  "2. Lower managerial, administrative and professional occupations":"Lower managerial occupation",
  "3. Intermediate occupations":"Intermediat occupation",
  "4. Small employers and own account workers":"Small employer and own account",
  "5. Lower supervisory and technical occupations":"Lower supervisory & technical occupation",
  "6. Semi-routine occupations":"Semi-routine occupation",
  "7. Routine occupations":"Routine occupation",
  "8. Never worked and long-term unemployed":"Long term unemployed",
  "L15 Full-time students":"Full time student",
}
const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Social Grade & occupations',
      },
    },
  };
  

  
const SocialGradesComp : React.FC<SocialGradeProps> = ({NSSeCs, values}) => {
    let labels: string[] = [];
    console.log(NSSeCs);
    for(let val in NSSeCs)
    {
      console.log(val);
      console.log(SocialGradeDict[NSSeCs[val]]);
      labels.push(SocialGradeDict[NSSeCs[val]]);
    }
    
    const data = {
        labels,
        datasets: [
        {
            label: 'Dataset 1',
            data:values,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        /* {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }, */
        ],
    };
    return (
      <Wrapper>
        <Bar options={options} data={data} />
        </Wrapper>
    );
}

export default SocialGradesComp;