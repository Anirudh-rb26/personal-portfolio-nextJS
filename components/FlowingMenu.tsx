import React from 'react';
import { gsap } from 'gsap';
import { LucideIcon } from 'lucide-react';

export interface MenuItemProps {
  link: string;
  text: string;
  icon: LucideIcon;
  brand?: 'gmail' | 'instagram' | 'linkedin' | 'github';
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
}

const brandStyles: Record<
  NonNullable<MenuItemProps['brand']>,
  { bg: string }
> = {
  gmail: {
    // Google blue
    bg: 'bg-[linear-gradient(90deg,#4285F4,#EA4335)]',
  },
  instagram: {
    // Instagram gradient
    bg: 'bg-[linear-gradient(45deg,#F58529,#FEDA77,#DD2A7B,#8134AF,#515BD4)]',
  },
  linkedin: {
    // LinkedIn blue
    bg: 'bg-[#0a66c2]',
  },
  github: {
    // GitHub dark
    bg: 'bg-[#0d1117]',
  },
};

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {
  return (
    <div className="w-full h-full overflow-hidden">
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ link, text, icon: Icon, brand }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);

  const animationDefaults = { duration: 0.6, ease: 'expo.inOut' };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' });
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, '<');
  };

  const repeatedMarqueeContent = React.useMemo(() => {
    const bgClass = brand ? brandStyles[brand]?.bg : 'bg-white';
    return Array.from({ length: 5 }).map((_, idx) => (
      <React.Fragment key={idx}>
        <span className="text-[#0a0a0a] uppercase font-bold text-[clamp(2rem,5vw,6rem)] leading-[1.1] tracking-tight px-[2vw]">
          {text}
        </span>
        <div
          className={`my-0 mx-[2vw] flex items-center justify-center rounded-[999px] px-[3vw] h-[clamp(60px,8vh,120px)] flex-shrink-0 ${bgClass}`}
        >
          <span className="text-white uppercase font-melodrama italic text-[clamp(1.5rem,4vw,3rem)] leading-none tracking-tight">
            {text}
          </span>
        </div>
      </React.Fragment>
    ));
  }, [text, brand]);

  return (
    <div
      className="flex-1 relative overflow-hidden border-t border-white/10 hover:border-white/20 transition-colors"
      ref={itemRef}
    >
      <a
        className="flex justify-start items-center h-full w-full relative cursor-pointer uppercase no-underline font-bold text-white text-[clamp(2.5rem,6vw,8rem)] tracking-tighter leading-none transition-all duration-300 hover:scale-[1.02] hover:tracking-wide focus:text-white focus-visible:text-[#0a0a0a] py-[clamp(1rem,3vh,2rem)] px-[clamp(2rem,5vw,8rem)] gap-[clamp(1rem,3vw,4rem)]"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Icon
          className="w-[clamp(2.5rem,5vw,6rem)] h-[clamp(2.5rem,5vw,6rem)] transition-all duration-300"
          strokeWidth={1.5}
        />
        {text}
      </a>
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-gradient-to-br from-white via-gray-50 to-gray-100 translate-y-[101%]"
        ref={marqueeRef}
      >
        <div className="h-full w-[200%] flex" ref={marqueeInnerRef}>
          <div className="flex items-center relative h-full w-[200%] will-change-transform animate-marquee">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowingMenu;
