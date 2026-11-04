import { memo, useEffect, useRef } from 'react';
import { type CallbackListener, Player, type PlayerRef } from '@remotion/player';
import type { Slide } from '../deck';
import { VIDEO } from '../theme';

const PLAYER_STYLE: React.CSSProperties = { width: '100%', height: '100%' };

/** Frames before a looping pause at which the loop jumps back (playback can skip a frame or two). */
const LOOP_MARGIN = 5;

type SlidePlayerProps ={ slide: Slide; target: number; animate: boolean };

// Plays the slide up to `target` and stops there; jumps straight to it when not animating (going back).
// When the slide declares a loop for that frame, it keeps playing the loop instead of stopping (until the next click).
// Memoized so a theme switch (CSS variables on the parent) doesn't re-render the Player.
export const SlidePlayer = memo(({ slide, target, animate }: SlidePlayerProps) => {
  const ref = useRef<PlayerRef>(null);

  const loopFrom = slide.loops?.[target];

  useEffect(() => {
    const player = ref.current;
    if (!player) return;
    if (loopFrom === undefined) {
      if (!animate || player.getCurrentFrame() >= target) {
        player.pause();
        player.seekTo(target);
        return;
      }
      player.play();
    } else {
      if (!animate || player.getCurrentFrame() >= target) player.seekTo(loopFrom);
      player.play();
    }
    // The scene is periodic over [loopFrom, target]: jumping back one period a few frames early is seamless, and
    // never shows the frames after the pause even when playback skips frames
    const period = target - (loopFrom ?? target);
    const onFrameUpdate: CallbackListener<'frameupdate'> = ({ detail }) => {
      if (loopFrom !== undefined && detail.frame >= target - LOOP_MARGIN) {
        player.seekTo(Math.min(detail.frame, target) - period);
      } else if (loopFrom === undefined && detail.frame >= target) {
        player.pause();
        player.seekTo(target);
      }
    };
    player.addEventListener('frameupdate', onFrameUpdate);
    return () => {
      player.removeEventListener('frameupdate', onFrameUpdate);
      player.pause();
    };
  }, [target, animate, loopFrom]);

  return (
    <Player
      ref={ref}
      component={slide.component}
      durationInFrames={slide.durationInFrames}
      compositionWidth={VIDEO.width}
      compositionHeight={VIDEO.height}
      fps={VIDEO.fps}
      initialFrame={animate ? 0 : target}
      // Stay on the last frame (the slide's resting state) instead of jumping back to the empty first frame
      moveToBeginningWhenEnded={false}
      // Clicks and Space advance the presentation, they must not toggle playback
      clickToPlay={false}
      spaceKeyToPlayOrPause={false}
      style={PLAYER_STYLE}
    />
  );
});
