import { createStream } from "./gif_stream";
import { BackgroundVideo } from "./background_video";


function init() {
    let fullScreen = false
    let bgVideo: BackgroundVideo

    createStream(
        document.getElementsByClassName('foreground-video')[0] as HTMLElement,
        (id, video) => {
            if (!bgVideo) {
                bgVideo = new BackgroundVideo(
                    video,
                    document.getElementsByClassName('background-video')[0] as HTMLCanvasElement)
            } else {
                bgVideo.video = video
            }
            document.getElementById('scene-link').setAttribute('href', `/scenes/${id}.html`)
        })

    document.getElementById('toggle-aspect-button').addEventListener('click', () => {
        fullScreen = !fullScreen
        if (fullScreen) {
            document.body.classList.add('fullscreen')
        } else {
            document.body.classList.remove('fullscreen')
        }
        document.getElementById('toggle-aspect-button').title = fullScreen ? 'change to fullscreen' : 'change to fit'
        document.getElementById('toggle-aspect-button').textContent = fullScreen ? 'FIT' : 'FULLSCREEN'

    })
}

init();
