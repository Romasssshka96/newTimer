const url1 = 'http://localhost:3000/request'

let dataForCaunter = (finishData) =>{                   //создаём объект с высчитаными велечинами для отсчёта времени 
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


    const section = document.querySelector('section')   //берем родительский елемент дома 
    const form = document.querySelector('form')        //берем форму 
     

    let bottonClear = document.createElement('button')  //создаём кнопку которая убирает таймер и возвращает форму на страницу 
    bottonClear.classList ='clear'
    bottonClear.innerText = 'сбросить таймер '

    bottonClear.addEventListener('click',()=>{          //правила этой кнопки 
        let timer = document.querySelector('.case')
        timer.remove()
        bottonClear.remove()
        form.style.display = 'flex'
        section.append(form)
        form.reset()
    })

const postData = async (url, data)=>{                   //запрос на постинг данных
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body:JSON.stringify(data)
    })
    return await res.json()
}


const getData = async (url)=>{                          //запрос на получение данных 
    const res = await fetch(url)
    if(!res.ok){
        console.log(err)
    }else{
        return await res.json()
    }
}
let test = getData(url1)
console.log(test)


const vivibility = (data ,descr)=>{                            //функция с отрисовкой таймера на странице

        form.style.display = 'none'

        let dataValue = dataForCaunter(data);

        function writer (title, days, hours, minuts, seconds){      //хтмл структура таймера 
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

        function refreshTimer(){                            //принимает данніе с формы и обновляется с помощью интервала 

        let dataValue = dataForCaunter(data) 
        let title = descr;
        let days = dataValue.days;
        let hours = dataValue.hours;
        let minuts = dataValue.minuts;
        let seconds = dataValue.seconds;
        
        writer(title,days,hours,minuts,seconds)
        }

        let interval = setInterval(refreshTimer, 1000);             // интервал
        console.log(dataValue.total)
        console.log(dataValue.hours)

        if(dataValue.total <=0){                                    //условия сброса интервала и конца отсчёта 
            clearInterval(interval);
            writer(`${descr} - отсчет закончен`,0,0,0,0)

            section.append(bottonClear)
        
        } 
}


//----на этом моменте и начинается прикол, без гет пост запросов, просто с отрисовкой код работает нормально, когда добавлен гет или пост запрос, то страница при отправке формы перезагружается 


form.addEventListener('submit', (e)=>{                      //событие которое берет данные с формы отправляет их на сервер и берет их для отрисовки объектов 
    e.preventDefault()
    console.log('hi')
    let formData = Object.fromEntries(new FormData(form)) ; //переводим с форм даты в объект 
    if (!formData.data){
        alert('некоректно введена дата')
         
    }else{
       postData(url1, formData)   //вызов вункции отправки 

       getData(url1)                //вызов функции получения данных
            .then(res =>{
               let arr = res.reverse();           //     разворачиваем приходящий массив задом наперед        
               console.log(arr)
               let {data, descr} = arr[0]       //берем первое значение развернутого массива (последнюю запись пост запроса) и достаём из нее деструктуризацией нужные нам значения что б передать в функцию отрисовщик 
               vivibility(data, descr) 
       })

    }    
    
})



        





























