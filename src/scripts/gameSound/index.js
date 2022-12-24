import Utils from "../utils";

const VOLUME = 0.1;
const removeMP3ExtRegExp = /(\.\/)|(\.mp3)/g;

export default class GameSound {
  constructor() {
    this.tracks = Utils.getImportAssets(
      require.context('../../sounds/', false, /\.mp3$/),
      removeMP3ExtRegExp
    );
    this.sounds = {};
    this.init();
  }

  createSounds() {
    Object.keys(this.tracks).forEach((key) => {
      this.sounds[key] = new Audio(this.tracks[key]);
    });
  }

  setVolume(value) {
    Object.keys(this.sounds).forEach((name) => {
      this.sounds[name].volume = value;
    });
  }

  play(name = 'open') {
    this.sounds[name].play();
  }

  init() {
    this.createSounds();
    this.setVolume(VOLUME);
  }
}
