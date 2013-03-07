var soundEffects = new Howl({
  urls: ['/audio/gauntlet.mp3', '/audio/gauntlet.ogg', '/audio/gauntlet.wav'],
  sprite: {
    // for some reason this doesn't work
    // key: [364900, 365100],
    // door: [363598, 363984]
  }
});

soundEffects.play('key');