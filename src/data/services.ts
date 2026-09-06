import {
  Film,
  Youtube,
  Instagram,
  Heart,
  Sparkles,
  Megaphone,
  Mic,
  type LucideIcon,
} from 'lucide-react';

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
}

export const services: ServiceCategory[] = [
  {
    id: 'corporate',
    title: 'Corporate Videos',
    description: 'Polished brand stories, internal communications, and company profiles that convey professionalism and trust.',
    icon: Film,
    image: 'https://images.pexels.com/photos/17486300/pexels-photo-17486300.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'youtube',
    title: 'YouTube Videos',
    description: 'Engaging long-form and short-form YouTube content designed to maximize retention and grow your channel.',
    icon: Youtube,
    image: 'https://images.pexels.com/photos/8770477/pexels-photo-8770477.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'reels',
    title: 'Instagram Reels / Social Media',
    description: 'Scroll-stopping reels and social content optimized for engagement, reach, and viral potential.',
    icon: Instagram,
    image: 'https://images.pexels.com/photos/16840499/pexels-photo-16840499.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'wedding',
    title: 'Wedding Reels',
    description: 'Cinematic wedding films that capture the emotion, detail, and beauty of your most precious moments.',
    icon: Heart,
    image: 'https://images.pexels.com/photos/38823745/pexels-photo-38823745.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'motion-graphics',
    title: 'Motion Graphics Videos',
    description: 'Dynamic animated graphics, title sequences, and visual effects that elevate your content to the next level.',
    icon: Sparkles,
    image: 'https://images.pexels.com/photos/9999716/pexels-photo-9999716.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'promotional',
    title: 'Promotional Videos',
    description: 'High-converting promotional and ad content that drives action and showcases your product or service.',
    icon: Megaphone,
    image: 'https://images.pexels.com/photos/5477263/pexels-photo-5477263.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'talking-head',
    title: 'Talking Head Videos',
    description: 'Clean, professional interview and talking-head content with crisp audio and engaging visual treatment.',
    icon: Mic,
    image: 'https://images.pexels.com/photos/6878199/pexels-photo-6878199.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];
