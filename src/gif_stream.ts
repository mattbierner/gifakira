import { scenes } from "./scene_data";

const preloadSize = 2;

const populateVideoCache = (data: any, cachedContainer: HTMLElement) => {
    const existing = cachedContainer.querySelectorAll('video');
    for (let i = existing.length; i <= preloadSize; ++i) {
        const newSrc = data[Math.floor(Math.random() * data.length)]
        const newVideo = document.createElement('video')
        newVideo.dataset['id'] = newSrc.id
        newVideo.setAttribute('playsinline', '1')
        newVideo.muted = true
        newVideo.loop = true
        newVideo.preload = 'auto'
        newVideo.src = `https://media.gifakira.com/scenes/${newSrc.id}-640.mp4`
        cachedContainer.appendChild(newVideo)
    }
}

const getNextVideo = (data: any, cachedContainer: HTMLElement): HTMLVideoElement => {
    cachedContainer.removeChild(cachedContainer.querySelector('video'))
    populateVideoCache(data, cachedContainer)
    const newVideo = cachedContainer.querySelector('video') as HTMLVideoElement
    newVideo.autoplay = true
    return newVideo
}

const loop = (target: HTMLVideoElement, onBegin: (id: any, video: HTMLVideoElement) => void, cachedContainer: HTMLElement) => {
    let currentTime = 0
    const ontimeupdate = function (e: Event) {
        if (this.currentTime < currentTime) {
            doUpdate()
        }
        currentTime = this.currentTime
    };
    const doUpdate = () => {
        try {
            target.removeEventListener('timeupdate', ontimeupdate)
            target = undefined
            const newTarget = getNextVideo(scenes, cachedContainer)
            onBegin(newTarget.dataset['id'], newTarget)
            let done = false
            newTarget.play().catch(e => {
                console.error(e)
                if (!done) {
                    done = true
                    doUpdate();
                }
            });
            if (!done) {
                done = true
                loop(newTarget, onBegin, cachedContainer)
            }
        } catch (e) {
            console.error(e)
            doUpdate();
        }
    }

    if (target) {
        target.addEventListener('timeupdate', ontimeupdate)
    } else {
        doUpdate();
    }
}


export const createStream = (container: HTMLElement, onBegin: (id: any, video: HTMLVideoElement) => void = () => { }) => {
    const wasEmpty = !container.querySelector('*')
    populateVideoCache(scenes, container)
    if (wasEmpty) {
        const video = container.querySelector('video');
        video.play();
        onBegin(video.dataset.id, video);
    }
    loop(container.querySelector('*') as HTMLVideoElement, onBegin, container);
}