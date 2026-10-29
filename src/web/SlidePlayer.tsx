import { memo, useEffect, useRef } from 'react';
import { type CallbackListener, Player, type PlayerRef } from '@remotion/player';
import type { Slide } from '../deck';
import { VIDEO } from '../theme';

const PLAYER_STYLE: React.CSSProperties = { width: '100%', height: '100%' };

type SlidePlayerProps = { slide: Slide; target: number; animate: boolean };

// Plays the slide up to `target` and stops there; jumps straight to it when not animating (going back).
// Memoized so a theme switch (CSS variables on the parent) doesn't re-render the Player.
export const SlidePlayer = memo(({ slide, target, animate }: SlidePlayerProps) => {
  const ref = useRef<PlayerRef>(null);

  useEffect(() => {
    const player = ref.current;
    if (!player) return;
    if (!animate || player.getCurrentFrame() >= target) {
      player.pause();
      player.seekTo(target);
      return;
    }
    const onFrameUpdate: CallbackListener<'frameupdate'> = ({ detail }) => {
      if (detail.frame >= target) {
        player.pause();
        player.seekTo(target);
      }
    };
    player.addEventListener('frameupdate', onFrameUpdate);
    player.play();
    return () => player.removeEventListener('frameupdate', onFrameUpdate);
  }, [target, animate]);

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
