export class BackgroundVideo {
    private readonly ctx: CanvasRenderingContext2D;

    constructor(
        public video: HTMLVideoElement,
        private readonly canvas: HTMLCanvasElement
    ) {
        this.ctx = canvas.getContext('2d')

        const onUpdateVideo = () => {
            this.ctx.drawImage(this.video, 0, 0);
            window.requestAnimationFrame(onUpdateVideo)
        }

        const initBackgroundVideo = () => {
            this.canvas.width = this.video.videoWidth
            this.canvas.height = this.video.videoHeight
            onUpdateVideo()
        }

        if (!video.videoWidth) {
            video.addEventListener('loadedmetadata', initBackgroundVideo)
        } else {
            initBackgroundVideo();
        }
    }
}
