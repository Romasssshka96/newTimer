let dataForCaunter = (finishData) =>{
    const nowDate = Date.parse(new Date())
    const deadLine = Date.parse(new Date(finishData))
    let difference = deadLine - nowDate;
    let days = Math.floor(difference/(1000*60*60*24))
    let hours = Math.floor((difference/(1000*60*60)%24))
    let minuts = Math.floor((difference/1000/60)%60)
    let seconds = Math.floor((difference/1000)%60)

    let obj = {
        'total': difference,
        'days': days,
        'hours': hours,
        'minuts': minuts,
        'seconds': seconds,
    }
    
    return obj
}


    const section = document.querySelector('section')
    const form = document.querySelector('#form')
     

    let bottonClear = document.createElement('button')
    bottonClear.classList ='clear'
    bottonClear.innerText = 'сбросить таймер '
    

    bottonClear.addEventListener('click',()=>{
        let timer = document.querySelector('.case')
        timer.remove()
        bottonClear.remove()
        form.style.display = 'flex'
        section.append(form)
        form.reset()
    })



form.addEventListener('submit', (e)=>{
    e.preventDefault()
    let formData = Object.fromEntries(new FormData(form)) 

    if(formData.data == ''){
        alert('некоректно введена дата')
    }else{

        form.style.display = 'none'

        console.log(formData)

        let dataValue = dataForCaunter(formData.data);

        function writer (title, days, hours, minuts, seconds){
            section.innerHTML =`
    <div class="case">
        <div class="title">${title}</div>
        <div class="wrap">

            <div class="value">
                дней
                <div class="days time">${days}</div>
            </div>
            <div class="value">
                часов
                <div class="hours time">${hours}</div>
            </div>
            <div class="value">
                минут
                <div class="minuts time">${minuts}</div>
            </div>        
            <div class="value">
                секунд
                <div class="seconds time">${seconds}</div>
            </div>
        </div>
    </div>
    `;
        }

        function refreshTimer(){

        let dataValue = dataForCaunter(formData.data);
        let title = formData.descr;
        let days = dataValue.days;
        let hours = dataValue.hours;
        let minuts = dataValue.minuts;
        let seconds = dataValue.seconds;
        
        writer(title,days,hours,minuts,seconds)
        }

        let interval = setInterval(refreshTimer, 1000);
        console.log(dataValue.total)

        if(dataValue.total <=0){
            clearInterval(interval);
            writer(`${formData.descr} - отсчет закончен`,0,0,0,0)

            section.append(bottonClear)
        
        } 
    }
})

































