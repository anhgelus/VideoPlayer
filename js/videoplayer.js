(() => {
// CREATION PART
const main = document.querySelector('.videoplayer')

main.appendChild(document.createElement('div')).className = "controls"
main.lastElementChild.appendChild(document.createElement('div')).className = "duration-bar"
main.lastElementChild.appendChild(document.createElement('div')).className = "buttons"

document.querySelector('.duration-bar').appendChild(document.createElement('div')).className = "duration-level"

main.lastElementChild.querySelector('.buttons').appendChild(document.createElement('div')).id = "play-pause" 
main.lastElementChild.querySelector('.buttons').appendChild(document.createElement('div')).id = "mute" 

let input = document.createElement('input')

input.setAttribute('type', 'range')
input.setAttribute('min', '0')
input.setAttribute('max', '100')
input.setAttribute('value', '50')
input.setAttribute('step', '1')

main.lastElementChild.querySelector('.buttons').appendChild(input).id = "volumeSlider"
main.lastElementChild.querySelector('.buttons').appendChild(document.createElement('div')).id = "fullScreen" 


// VIDEO PLAYER PART
let video = document.querySelector('.video')
let durationLevel = document.querySelector('.duration-level')
let btn = document.getElementById('play-pause')
let muteBtn = document.getElementById('mute')
let volumeSlider = document.getElementById('volumeSlider')
let durationBar = document.querySelector('.duration-bar')
let fullScreen = document.querySelector('#fullScreen')

function startVideo() {
    if(video.paused){
        btn.className="pause"
        video.play()
    } else {
        btn.className = "play"
        video.pause()
    }
}

btn.onclick = () => {
    startVideo()
}

video.addEventListener('click', () => {
    startVideo()
})

video.addEventListener('timeupdate', () => {
    let barPos = video.currentTime / video.duration
    durationLevel.style.width = barPos * 100 + '%'

    if(video.ended) {
        btn.className ="play"
    }
})

// mute la video


muteBtn.addEventListener('click', () => {
    if(video.muted){
        video.muted = false
        muteBtn.className = "mute"
    } else {
        video.muted = true;
        muteBtn.className = "unmute"
    }
})

// Volume


volumeSlider.addEventListener('change', () => {
    video.volume = volumeSlider.value / 100
})


// la barre orange clikable

let rect = durationLevel.getBoundingClientRect()
let width = rect.width

durationBar.addEventListener('click', (e) => {
    if (window.innerHeight == screen.height) {
        let widthPercent = ((e.clientX*100)/window.innerWidth)
        let currentTime = (widthPercent * video.duration) / 100
        
        video.currentTime = currentTime
        
        durationLevel.style.width = widthPercent + '%'
    } else {
        let x = e.clientX - rect.left  
        let widthPercent = ((x*100)/width)
        let currentTime = (widthPercent * video.duration) / 100
        
        video.currentTime = currentTime
        
        durationLevel.style.width = widthPercent + '%'    
    }
})

fullScreen.addEventListener('click', () => {
    if (window.innerHeight == screen.height) {
        document.exitFullscreen()
    } else {
        main.requestFullscreen()
    }
    
})
})()
