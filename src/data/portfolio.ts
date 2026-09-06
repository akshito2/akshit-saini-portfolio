export interface PortfolioItem {
  id: string;
  title: string;
  videoUrl: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "p01",
    title: "Corporate Videos",
    videoUrl: "/assets/videos/video-01.mp4",
  },
  {
    id: "p02",
    title: "YouTube Videos",
    videoUrl: "/assets/videos/video-03.mp4",
  },
  {
    id: "p03",
    title: "Motion Graphic Videos",
    videoUrl: "/assets/videos/video-02.mp4",
  },
  {
    id: "p04",
    title: "Wedding Reels",
    videoUrl: "/assets/videos/video-05.mp4",
  },
  {
    id: "p05",
    title: "Instagram Reels",
    videoUrl: "/assets/videos/video-04.mp4",
  },
];
