// Select
const state = document.querySelector('.state');
const getData = async function () {
    const response = await fetch("./data.json");
    const data = await response.json();
    return data;
}
const reset = async function (timeFrame = 'weekly') {
    const arr = await getData();
    // console.log(arr);
    arr.forEach(cat => {
        const catClass = ['category', cat.title.toLowerCase().split(' ').join('-')].join('-');

        const timeMarkup = document.querySelector(`.${catClass} .time`);
        const { current, previous } = cat.timeframes[timeFrame]
        timeMarkup.querySelector('.cur').textContent = `${current}hrs`;
        const lastTime = timeFrame === "weekly" ? "Week" : timeFrame === "daily" ? "Day" : "Month";
        timeMarkup.querySelector('.prev').textContent = `Last ${lastTime} - ${previous}hrs`;
    })
}
reset();
state.addEventListener('click', function (e) {
    const ele = e.target.closest('button');
    if (!ele) return;

    ["daily", "weekly", "monthly"].forEach(timeFrame => {
        if (ele.classList.contains(`${timeFrame}`))
            reset(timeFrame);
    })
})