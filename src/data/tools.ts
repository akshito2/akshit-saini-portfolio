export interface Tool {
  id: string;
  name: string;
  logo: string;
  color: string;
}

export const tools: Tool[] = [
  {
    id: 'tool-01',
    name: 'Premiere Pro',
    logo: '/assets/tools/premiere-pro.svg',
    color: '#e8965a',
  },
  {
    id: 'tool-02',
    name: 'Photoshop',
    logo: '/assets/tools/photoshop.svg',
    color: '#5b8def',
  },
  {
    id: 'tool-03',
    name: 'CapCut',
    logo: '/assets/tools/capcut.svg',
    color: '#FF9457',
  },
  {
    id: 'tool-04',
    name: 'Canva',
    logo: '/assets/tools/canva.svg',
    color: '#3ddc97',
  },
  {
    id: 'tool-05',
    name: 'Gemini',
    logo: '/assets/tools/gemini.svg',
    color: '#5b8def',
  },
  {
    id: 'tool-06',
    name: 'ChatGPT',
    logo: '/assets/tools/chatgpt.png',
    color: '#CC57FF',
  },
];