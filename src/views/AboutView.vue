<template>
  <div>
    <Artplayer @get-instance="getInstance" :option="option" :style="style" />
    <h1>Test</h1>
    <h1>Test</h1>
    <h1>Test</h1>
    <h1>Test</h1>
    <h1>Test</h1>
    <h1>Test</h1>
    <h1>Test</h1>
    <h1>Test</h1>
    <h1>Test</h1>
    <h1>Test</h1>
  </div>
</template>

<script>
import Artplayer from '../components/player/ArtPlayer';

export default {
  data() {
    return {
      option: {
        url: "https://nohesitate-1312201606.cos.ap-beijing.myqcloud.com/Video/1605246838000",
        title: "Your name",
        volume: 0.5,
        pip: true,
        autoMini: true,
        setting: true,
        loop: true,
        flip: true,
        playbackRate: true,
        aspectRatio: true,
        fullscreen: true,
        fullscreenWeb: true,
        subtitleOffset: true,
        mutex: true,
        backdrop: true,
        playsInline: true,
        autoPlayback: true,
        hotkey: true
      },
      style: {
        width: '600px',
        height: '400px',
        margin: '60px auto 0',
      },
    };
  },
  components: {
    Artplayer,
  },
  methods: {
    getInstance(art) {
      console.log(art);
    },
  },
};
</script>
