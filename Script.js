// Empty array for Interview and rejected value store. 
let interViewArr = [];
let rejectedArr = [];
let currentState = 'All';
// All Btn Selection area
let AllBtn = document.getElementById('All');
let InterviewBtn = document.getElementById('Interview');
let RejectedBtn = document.getElementById('Rejected');

// All section area
let AllTabSection = document.getElementById('AllTab');
let RenderSection = document.getElementById('renderSection');

// Heading Counter selection
let totalHeadCouneter = document.getElementById('totalHeadCouneter');
let interviewHeadCouneter = document.getElementById('interviewHeadCouneter');
let rejectedHeadCouneter = document.getElementById('rejectedHeadCouneter');

// Job Counter section
let SectionCounter = document.getElementById('SectionCounter');

// Heading counter update. 
let body = document.querySelector('body');
// Toggoleing btn
function buttonToggoling(Button, Section) {
    AllBtn.classList.remove('active');
    InterviewBtn.classList.remove('active');
    RejectedBtn.classList.remove('active');
    document.getElementById(Button).classList.add('active');

    AllTabSection.classList.add('hidden');
    RenderSection.classList.add('hidden');
    document.getElementById(Section).classList.remove('hidden');

    currentState = Button;

    if (Button == 'All') {
        SectionCounter.innerText = AllTabSection.children.length;
        counter();
    } else if (Button == 'Interview') {
        document.getElementById('SectionCounter').innerText = `${interViewArr.length} of ${AllTabSection.children.length}`;
        renderData(interViewArr);
        counter();

    } else if (Button == 'Rejected') {
        SectionCounter.innerText = `${rejectedArr.length} of ${AllTabSection.children.length}`;
        renderData(rejectedArr);
        counter();
    }
};
// counting function
function counter() {
    totalHeadCouneter.innerText = AllTabSection.children.length;
    interviewHeadCouneter.innerHTML = interViewArr.length;
    rejectedHeadCouneter.innerHTML = rejectedArr.length;
    SectionCounter.innerText = AllTabSection.children.length;
}
// counter function call for initial countdown update
counter();


// all tab event listener 
AllTabSection.addEventListener('click', (e) => {
    let element = e.target.parentNode.parentNode.parentNode;
    let heading = element.querySelector('.heading').innerText;
    let status = element.querySelector('.statuss')
    let headingParagroph = element.querySelector('.headingparagroph').innerText;
    let salary = element.querySelector('.salary').innerText;
    let skill = element.querySelector('.skill').innerText;

    if (e.target.matches('.interview')) {
        let InterViewData = { heading, headingParagroph, salary, skill, status: 'INTERVIEW' };
        status.classList.remove('btn-error')
        status.classList.add('btn-success')
        status.innerText = 'INTERVIEW';
        let exist = interViewArr.find(item => item.heading == heading);

        if (!exist) {
            interViewArr.push(InterViewData);
            rejectedArr = rejectedArr.filter(item => item.heading !== heading);

            if (currentState == 'Interview') renderData(interViewArr);
            if (currentState == 'Rejected') renderData(rejectedArr);
            counter()

        }
    } else if (e.target.matches('.rejected')) {
        let RejectData = { heading, headingParagroph, salary, skill, status: 'REJECTED' };
        status.innerText = 'REJECTED';
        status.classList.add('btn-error')
        status.classList.remove('btn-success') 
        exist = rejectedArr.find(item => item.heading == heading)
        if (!exist) {
            rejectedArr.push(RejectData);
            interViewArr = interViewArr.filter(item => item.heading !== heading); 

            if (currentState == 'Interview') renderData(interViewArr);
            if (currentState == 'Rejected') renderData(rejectedArr);
            counter()
        }
    } else if (e.target.matches('.fa-trash-can')) {
        interViewArr = interViewArr.filter(item => item.heading !== heading)
        rejectedArr = rejectedArr.filter(item => item.heading !== heading)
        element.parentNode.remove();
        if (currentState == 'Interview') renderData(interViewArr);
        if (currentState == 'Rejected') renderData(rejectedArr);
        counter();

    }

})

// render section addEventListener 
RenderSection.addEventListener('click', (e) => {
    let data = e.target.parentNode.parentNode.parentNode;
    if (!data) return;
    let heading = data.querySelector('.heading').innerText;
    let headingParagroph = data.querySelector('.headingparagroph').innerText;
    let salary = data.querySelector('.salary').innerText;
    let skill = data.querySelector('.skill').innerText;

    if (e.target.classList.contains('interview')) {
        let createObj = { heading, headingParagroph, salary, skill, status: 'INTERVIEW' }
        let isDataAvailable = interViewArr.find(item => item.heading === heading)
        if (!isDataAvailable) interViewArr.push(createObj);
        rejectedArr = rejectedArr.filter(item => item.heading !== heading)
        if (currentState === "Interview") renderData(interViewArr);
        if (currentState === "Rejected") renderData(rejectedArr);
        counter();
    } else if (e.target.classList.contains('rejected')) {
        let createObj = { heading, headingParagroph, salary, skill, status: 'REJECTED' }
        let exist = rejectedArr.find(item => item.heading === heading)
        if (!exist) rejectedArr.push(createObj);
        interViewArr = interViewArr.filter(item => item.heading !== heading)
        if (currentState === "Interview") renderData(interViewArr);
        if (currentState === "Rejected") renderData(rejectedArr);
        counter();
    } else if (e.target.classList.contains('fa-trash-can')) {
        interViewArr = interViewArr.filter(item => item.heading !== heading);
        rejectedArr = rejectedArr.filter(item => item.heading !== heading);
        data.remove();
        if (currentState == 'Interview') renderData(interViewArr);
        if (currentState == 'Rejected') renderData(rejectedArr);
        counter();

    }
})

// render function for data render 
function renderData(value) {
    RenderSection.innerHTML = ' ';

    if (value.length == 0) {
        let section = document.createElement('section');
        section.className = 'sectionTab flex flex-col justify-center items-center py-[111px]';
        section.innerHTML = `<img class=" h-[100px] w-[100px] self-center" src="./image/jobs.png" alt="">
                            <h2 class="text-2xl font-semibold leading-8">No jobs available</h2>
                            <p class="text-gray-500 text-[16px] font-normal">Check back soon for new job opportunities</p>`
        RenderSection.appendChild(section);
        return;
    }

    for (const elements of value) {
        let div = document.createElement('div');
        div.className = "card";
        div.innerHTML = `<div class="p-6 bg-white rounded-lg">
                    <div class="flex justify-between">
                    <div class="pb-5">
                    <h3 class="heading text-[18px] font-semibold leading-6 pb-1.5">${elements.heading}</h3>
                    <p class="headingparagroph font-normal leading-4g text-[16px]">${elements.headingParagroph}</p>
                    </div> 
                    <button class="deleteBtn"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                    <p class="salary font-normal text-[14px] leading-3.5 pb-5">${elements.salary}</p>
                    <button class="appliedBtn btn mb-2 ${elements.status === 'INTERVIEW' ? 'btn-success' : 'btn-error'}">${elements.status}</button>
                    <p class="skill font-medium text-[14px] leading-3.5 pb-5">${elements.skill}</p>
                    <div class="flex gap-3">
                    <button class="interview btn btn-outline btn-accent">INTERVIEW</button>
                    <button class="rejected rejected btn btn-outline btn-secondary">REJECTED</button>
                    </div>
                    </div>`;

        RenderSection.appendChild(div);

    }
}








