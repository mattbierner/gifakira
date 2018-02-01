import { createStream } from "./gif_stream";
import { scenes } from "./scene_data";


document.getElementById('random-button').addEventListener('click', (e) => {
    const scene = scenes[Math.floor(Math.random() * scenes.length)]
    window.location.assign(`/scenes/${scene.id}.html`);
});

createStream(
    document.getElementsByClassName('background-video')[0] as HTMLElement)
