import { BackgroundVideo } from "./background_video";
import { scenes } from "./scene_data";

class SharePanel {
    private content: any;
    private container: HTMLElement;

    constructor() {
        this.container = document.getElementById('share')
        this.content = document.querySelector('#share .content')

        this.container.addEventListener('click', (e) => {
            if (e.target === this.content) {
                this.close()
            }
        })
    }

    close() {
        this.container.style.display = 'none';
    }

    show() {
        this.container.style.display = 'initial';
    }
}

function init(data: any) {
    let fullScreen = false

    const bgVideo = new BackgroundVideo(
        document.querySelector('.foreground-video video') as HTMLVideoElement,
        document.getElementsByClassName('background-video')[0] as HTMLCanvasElement)

    document.getElementById('toggle-aspect-button').addEventListener('click', () => {
        fullScreen = !fullScreen
        if (fullScreen) {
            document.body.classList.add('fullscreen')
        } else {
            document.body.classList.remove('fullscreen')
        }
        document.getElementById('toggle-aspect-button').title = fullScreen ? 'Change to fit' : 'change to fullscreen'
    })

    document.getElementById('shuffle-button').addEventListener('click', () => {
        const scene = data[Math.floor(Math.random() * data.length)]
        window.location.assign(`/scenes/${scene.id}.html`);
    })

    const panel = new SharePanel()

    document.getElementById('share-button').addEventListener('click', () => {
        panel.show()
    })
}

init(scenes);