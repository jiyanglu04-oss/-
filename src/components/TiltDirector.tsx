import { useEffect } from 'react';

const SELECTOR = '[data-tilt]';
const MAX_DEG = 6.5;
const LIFT = 3;
const PARALLAX = 12;

/**
 * 卡片 3D 倾斜 + 图片视差。
 *
 * 用事件委托挂在 document 上，只维护一张「当前激活卡片」，
 * 所以无论页面上有多少张卡都不会多出监听器，也不会引发 React 重渲染。
 *
 * 性能约定（别删）：
 *  - pointermove 合并到每帧一次，避免 120Hz 鼠标把主线程刷爆
 *  - 卡片矩形只在「切换到这张卡」时读一次并缓存；卡片自己的 transform 会影响
 *    getBoundingClientRect，每帧都读等于每帧强制重排
 *  - 滚动/离开时清空缓存，下次悬停重新测量
 *
 * 写的是内联 transform —— 内联样式优先级高于 CSS 里的 :hover 位移规则，
 * 因此卡片悬停时的「抬起」被合并进同一个 transform，不会互相打架。
 */
export default function TiltDirector() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (reduced || !finePointer) return;

    let active: HTMLElement | null = null;
    let activeRect: DOMRect | null = null;
    let pending: PointerEvent | null = null;
    let raf = 0;

    const reset = (card: HTMLElement) => {
      card.classList.remove('is-tilting');
      card.style.transform = '';
      card.style.removeProperty('--tilt-px');
      card.style.removeProperty('--tilt-py');
    };

    const apply = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const card = target?.closest?.(SELECTOR) as HTMLElement | null;

      if (!card) {
        if (active) {
          reset(active);
          active = null;
          activeRect = null;
        }
        return;
      }

      if (card !== active) {
        if (active) reset(active);
        active = card;
        // 只在换卡时读一次布局
        activeRect = card.getBoundingClientRect();
        card.classList.add('is-tilting');
      }

      const rect = activeRect;
      if (!rect || !rect.width || !rect.height) return;

      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      const rx = (-ny * MAX_DEG).toFixed(2);
      const ry = (nx * MAX_DEG).toFixed(2);
      const dx = (nx * -LIFT).toFixed(2);
      const dy = (ny * -LIFT).toFixed(2);

      card.style.setProperty('--tilt-px', (nx * -PARALLAX).toFixed(2));
      card.style.setProperty('--tilt-py', (ny * -PARALLAX).toFixed(2));
      card.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translate3d(${dx}px, ${dy}px, 0)`;
    };

    const onMove = (event: PointerEvent) => {
      pending = event;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const queued = pending;
        pending = null;
        if (queued) apply(queued);
      });
    };

    const clear = () => {
      pending = null;
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      if (active) {
        reset(active);
        active = null;
        activeRect = null;
      }
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', clear);
    window.addEventListener('scroll', clear, { passive: true });
    window.addEventListener('resize', clear, { passive: true });

    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', clear);
      window.removeEventListener('scroll', clear);
      window.removeEventListener('resize', clear);
      clear();
    };
  }, []);

  return null;
}
