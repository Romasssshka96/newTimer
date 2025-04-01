let dataForCaunter = (finishData) =>{
    const nowDate = Date.parse(new Date())
    const deadLine = Date.parse(new Date(finishData))
    let difference = deadLine - nowDate;
    let days = Math.floor(difference/(1000*60*60*24))
    let hours = Math.floor((difference/(1000*60*60)%24))
    let minutes = Math.floor((difference/1000/60)%60)
    let seconds = Math.floor((difference/1000)%60)

    let obj = {
        'total': difference,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds,
    }
    
    return obj
}



form.addEventListener('submit', (e)=>{
    e.preventDefault()

    const section = document.querySelector('section')
    const form = document.querySelector('#form')
    const timer = document.querySelector('.case')

    form.style.display ='none'
    timer.style.display = 'block'

    let formData = Object.fromEntries(new FormData(form)) 
    console.log(formData)


    let interval = setInterval(refreshTimer, 1000)

    function refreshTimer(){
        let dataValue = dataForCaunter(formData.data)
        let title = document.querySelector('.title')
        let days = document.querySelector('.days')
        let hours = document.querySelector('.hours')
        let minuts = document.querySelector('.minuts')
        let seconds = document.querySelector('.seconds')


        title.innerHTML = formData.descr
        days.innerHTML = dataValue.days
        hours.innerHTML = dataValue.hours
        minuts.innerHTML = dataValue.minutes
        seconds.innerHTML = dataValue.seconds

        if(dataValue.total <=0){
            title.innerHTML = `${formData.descr} - отсчет закончен`
            days.innerHTML = 0
            hours.innerHTML = 0
            minuts.innerHTML = 0
            seconds.innerHTML = 0
            clearInterval(interval)
            let bottonClear = document.querySelector('.clear')
            bottonClear.style.display = 'block'
            bottonClear.addEventListener('click',()=>{
                form.style.display ='flex'
                timer.style.display = 'none'
                bottonClear.style.display = 'none'
                form.reset()
            })

        }
    }




})












//    section.innerHTML =`
//    <div class="case">
//        <div class="title">${formData.descr}</div>
//        <div class="wrap">
//
//            <div class="value">
//                дней
//                <div class="days time">${dataValue.days}</div>
//            </div>
//            <div class="value">
//                часов
//                <div class="hours time">${dataValue.hours}</div>
//            </div>
//            <div class="value">
//                минут
//                <div class="minuts time">${dataValue.minutes}</div>
//            </div>        
//            <div class="value">
//                секунд
//                <div class="seconds time">${dataValue.seconds}</div>
//            </div>
//        </div>
//    </div>`

















