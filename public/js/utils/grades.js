const overallData = {};
const subjectCodes = {};

const addData = async (data)=>{
    overallData.details = data.Details;
    overallData.results = data.Results;
    addSubjectCodes();
}

const addSubjectCodes = ()=>{
    for(key in overallData.results){
        if(key === 'Total')continue
        for(code in overallData.results[key]){
            const bait = overallData.results[key][code];
            if(code !== 'CGPA' && code !== 'credits' && code !== 'total')subjectCodes[code] = bait;
        }
    }
}

const getSubjectDetails = (code)=>{
    const subDetails = subjectCodes[code];
    const res = [];
    for(key in subDetails){
        res.push({key,value:subDetails[key]});
    }
    return res;
}

const getDetails = ()=>{
    const res = {...overallData.details};
    return res;
}

const getCGPAs = ()=>{
    const res = [];
    const results = overallData.results;
    for(key in results){
        res.push({semNo : key,cgpa : results[key].CGPA || 'NA',height: (results[key].CGPA/10 )*300,red:results[key].CGPA ? '': 'red'});
    }
    if(res[res.length-1].semNo === 'Total')res.pop();
    return res;
}

const getSemResult = (sem) =>{
    const semno = [];
    for(key in overallData.results[sem]){
        const bait = overallData.results[sem][key];
        semno.push({
            subject_name:bait.subject_name,
            subject_grade:bait["subject_grade"],
            subject_code:bait.subject_code,
            red: bait["subject_grade"] === 'F' ? 'red' : ''
        })
    }
    return semno.filter((data)=> data.subject_name);
}
const getTotal = ()=>{
    return overallData.results.Total
}