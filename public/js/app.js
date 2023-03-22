const $submission = document.querySelector('#submission');
const $dis = document.querySelector('#dis');
const $analysis = document.querySelector('#analysis');
const $semAnalysis = document.querySelector('#semAnalysis');
const $grade = document.querySelector('#grade');
const $subjectAnalyis = document.querySelector('#subjectAnalysis');
const $bar = document.querySelector("#bar");

const messageTemplate = document.querySelector("#message_template").innerHTML;
const semTemplate = document.querySelector("#sem_template").innerHTML;
const subject_template = document.querySelector('#subject_template').innerHTML;

$submission.addEventListener('submit',async (e)=>{
    e.preventDefault();
    $dis.classList.remove('red');
    $dis.innerHTML = '...Loading';
    const htno = document.querySelector('#htvalue').value;
    fetch('/results/' + htno,{
        method: 'GET',
    }).then((response)=>response.json()).then((data)=>{
        if(data.error){
            $dis.innerHTML = 'Hall ticket is invalid';
            $dis.classList.add('red');
        }else{
            addData(data);
            renderEverything(); 
        }
    })
})


const renderEverything = ()=>{
    $dis.innerHTML = overallData.details.NAME;
    $grade.innerHTML = getTotal() === undefined ? 'NA' : getTotal(); 
    const html = Mustache.render(messageTemplate,{
        results:[...getCGPAs()]
    })
    $analysis.innerHTML=html;

    const bar = $analysis.children[0].children[1];
    renderSem(bar);
    const sub = $semAnalysis.children[0].children[2];
    renderSub(sub);
}

const renderSub = (sem)=>{
    const res = getSubjectDetails(sem.innerHTML);
    const html = Mustache.render(subject_template,{
        results:[...res]
    });
    $subjectAnalyis.innerHTML = html;
}

const dissub = (e)=>{
    const sem = e.target.children[2];
    renderSub(sem);
}

const renderSem = (child)=>{
    const res = getSemResult(child.innerHTML);
    const html = Mustache.render(semTemplate,{
        results:[...res]
    });
    $semAnalysis.innerHTML = html;
}

const dissem = (e)=>{
    const child = e.target.children[1];
    renderSem(child);
}









