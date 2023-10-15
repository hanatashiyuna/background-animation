//set time
function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time_set').innerHTML =  h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}

startTime()

// mouse move
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let spots = [];
let hue = 0;

const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 3; i++){
        spots.push(new Particle());
    }
})

class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 2 + 0.1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.1) this.size -= 0.03;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticle() {
    for (let i = 0; i < spots.length; i++){
        spots[i].update();
        spots[i].draw();
        for (let j = 0; j < spots.length; j++){
            const dx = spots[i].x - spots[j].x;
            const dy = spots[i].y - spots[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 90){
                ctx.beginPath();
                ctx.strokeStyle = spots[i].color;
                ctx.lineWidth = spots[i].size / 10;
                ctx.moveTo(spots[i].x, spots[i].y);
                ctx.lineTo(spots[j].x, spots[j].y);
                ctx.stroke();
            }
        }
        if (spots[i].size <= 0.3){
            spots.splice(i, 1); i--;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticle();
    hue++;
    requestAnimationFrame(animate)
}

window.addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
})
window.addEventListener('mouseout', function() {
    mouse.x = undefined;
    mouse.y = undefined;
})

animate()

//calendar

var h2 = document.querySelector('.calendar-picture h2');
var h3 = document.querySelector('.calendar-picture h3');

var monthArr = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

var dayArr = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thrusday',
    'Friday',
    'Saturday'
];

var day31MonthArr = [
    'January',
    'March',
    'May',
    'July',
    'August',
    'October',
    'December'
]

var d = new Date();

var obj = getDate();
generateCalendar();

function getDate(){
    var month = d.getMonth();
    month = monthArr[month];

    var day = d.getDay();
    day = dayArr[day];

    var date = d.getDate();

    h3.innerHTML = month + " " + d.getFullYear();

    return {m:month, dy:day, dt:date, yr:d.getFullYear()}
}

function generateCalendar(){
    var days;

    if (obj.m === 'February' && obj.yr % 4 !== 0){
        days = 28;
    } else if (obj.m === 'February' && obj.yr % 4 === 0){
        days = 29;
    }else if (day31MonthArr.includes(obj.m)){
        days = 31;
    }else {
        days = 30;
    }

    var LocalDayArr = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thrusday',
        'Friday',
        'Saturday'
    ];

    var startOfMonth = moment().clone().startOf("month").format('dddd');

    var dayIndex = LocalDayArr.indexOf(startOfMonth);

    for (var j = 0;j<dayIndex;j++){
        var element = document.createElement('div');
        element.className = 'calenar_number-empty';
        document.getElementById('lc').appendChild(element);
    }

    for (var k = 1; k<=days;k++){
        var element = document.createElement('div');
        obj.dt === k 
        ? (element.className = 'calendar_number calendar_number--current')
        : (element.className = 'calendar_number');

        element.appendChild(document.createTextNode(k));
        document.getElementById('lc').appendChild(element)
    }
}