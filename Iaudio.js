const Iaudio = class {
    constructor(src) {
        this.audio = new Audio(src)
        this.audio.preload = "auto"
        this.audio.load()
    }

    async play(playbackRate = 1) {
        this.audio.currentTime = 0

        if (playbackRate < 0) this.audio.currentTime = this.audio.duration

        this.audio.playbackRate = playbackRate
        return this.audio.play()
    }

    setVolume(volume) {
        this.audio.volume = volume
        return this
    }
}
