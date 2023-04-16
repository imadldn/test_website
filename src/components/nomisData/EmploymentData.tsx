import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Wrapper } from "./EmploymentData.styles";
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


const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Economic activity and Employment',
      },
    },
  };

const EmploymentDict: Record<string, string> = {
  "Economically active (excluding full-time students):In employment":	"Economically active: Employed",
  "Economically active (excluding full-time students): Unemployed":	"Economically active: Unemployed",
  "Economically active and a full-time student:In employment":	"Full-time student: Employed",
  "Economically active and a full-time student: Unemployed":	"Full-time student: Unemployed",
  "Economically inactive: Retired":	"Retired",
  "Economically inactive: Student":	"Student",
  "Economically inactive: Looking after home or family":	"Looking after home or family",
  "Economically inactive: Long-term sick or disabled":	"Disabled",
  "Economically inactive: Other":	"Economically inative: Other"

}
export type EmploymentProps = {
    economicActivity: string[];
    values: number[]
};

type areaName ={
    localArea: string;
};

const readResult  = (data : any) => {
    let readData: EmploymentProps = {economicActivity: [], values: []};
    const dict = data.data.dimension.c2021_eastat_20.category.label;
    const keyDict = data.data.dimension.c2021_eastat_20.category.index;
    //var i = 0;
    for (var key in dict) {
        if(!dict[key].includes('All categories'))
        {
            readData.economicActivity.push(EmploymentDict[dict[key]]);
            readData.values.push(data.data.value[keyDict[key]]);
        }
        //i++;
    }
    return readData;
}

const EmploymentComponent : React.FC<areaName> = ({localArea}) => {
    let uri : string = "https://www.nomisweb.co.uk/api/v01/dataset/NM_2083_1.jsonstat.json?date=latest&geography="+localArea+"&c2021_eastat_20=1002,7,1007,14...19&measures=20301";
    const [employment, setEmployment] = useState<EmploymentProps>({} as EmploymentProps);
    useEffect(
        ()=> {axios.get(uri)
                    .then(res => readResult(res))
                    .then(res1 => setEmployment(res1))
                    .catch(e=> console.log(e))
        }, [uri]);
    let labels = employment?.economicActivity;

    const data = {
        labels,
        datasets: [
        {
            label: 'Dataset 1',
            data: employment?.values,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        ],
    };
    return (
    <Wrapper>
      <div>
        { employment? 
        <Bar options={options} data={data} /> 
        : 
        "Fetching employment Data ..."}
    </div>
    </Wrapper>
    );
    }



export default EmploymentComponent;