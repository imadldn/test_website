import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useState, useEffect } from 'react';
import axios from "axios";
import SocialGradesComp, {SocialGradeProps} from '../../components/nomisData/SocialGrade';
import EmploymentComponent, {EmploymentProps} from '../../components/nomisData/EmploymentData';
import Grid from "@mui/material/Grid";
type PostCode = {postcode: string};

async function getNomisLocalAreaCode(postcode: string){
    const nomisURI="https://www.nomisweb.co.uk/api/v01/dataset/NM_144_1/geography/POSTCODE|"+postcode+";299.def.sdmx.json";
    try{
        console.log("Inside getNomisLocalAreaCode");
        const response = await axios.get(nomisURI);
        const localAreaCode : string = await response.data['structure']['codelists']['codelist'][0]['code'][0]['description']['value'];
        console.log("Local area code: "+localAreaCode);
        return localAreaCode;
    }
    catch (e){
        console.log("Error message: "+e);
        throw e;
    }
};

const readSocialGrade = (data : any) => {
    let gradeData: SocialGradeProps = {NSSeCs: [], values: []};
    const dict = data.dimension.cell.category.label;
    const keyDict = data.dimension.cell.category.index;
    for (var key in dict) {
        if(!dict[key].includes('All categories'))
        {
            gradeData.NSSeCs.push(dict[key]);
            gradeData.values.push(data.value[keyDict[key]]);
            
        }
    }
    return gradeData;
}


const SearchResult = ()=>{
    const {postcode}: PostCode = useParams() as PostCode;
    let inner = postcode?.substr(postcode?.length-3,3);
    let outer = postcode?.substr(0,postcode?.length-3);
    const formattedPC=outer+inner;
    
    const [socialGradeData, setSocialGradeData] = useState<SocialGradeProps>({} as SocialGradeProps);

    const { data, status } = useQuery(
        postcode,
        () => getNomisLocalAreaCode(formattedPC),
        {
            refetchOnWindowFocus: false,
            enabled:(postcode?.trim().length >= 5 || postcode?.trim().length<=8)
        }
      );
    console.log("Search Result");
    console.log(postcode);
    console.log("STATUS is: " + status);
    useEffect(()=>{
        if(status==="success"){
            axios.get<SocialGradeProps>("https://www.nomisweb.co.uk/api/v01/dataset/NM_1521_1.jsonstat.json?date=latest&geography="+(JSON.stringify(data))+"&cell=0,1,4...10,13&measures=20100")
                .then(res1 => readSocialGrade((res1.data)))
                .then(res2 => setSocialGradeData(res2))
                .catch(error => {
                    console.log(error);
                });
        }
    }, [data, status]);
    if  (postcode?.trim().length >= 5 && postcode?.trim().length<=8)
    {
        if (status === "success")
        {
            return( 
            <div>
                <p>
                searchResults for {outer} {inner} {JSON.stringify(data)}
                </p>
                <Grid container spacing = {3}>
                    <Grid item key ='social grades' xs={6}>
                    { socialGradeData ? 
                    <SocialGradesComp
                    NSSeCs={socialGradeData?.NSSeCs}
                    values={socialGradeData?.values}/>
                    :
                    ("loading...")
                    }
                    </Grid>
                    <Grid item key ='employment' xs={6}>
                        <EmploymentComponent localArea={JSON.stringify(data)}/>
                    </Grid>
                </Grid>
            </div>
            )
        }
        else{
        return (
            <div>
            {status === "error" && <div><p>Error fetching data.</p> <p>Postcode is either wrong or not found in the ONS database.</p></div>}
            {status === "loading" && <p>Fetching data...</p>}
            
            </div>
        
        )
        }
    }
    else {
        return (
            <div>
                Wrong format for postcode.
            </div>
        )
    }
    
}

export default SearchResult;