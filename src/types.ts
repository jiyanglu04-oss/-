export interface Project {
  id: string;
  title: string;
  role: string;
  period: string;
  description: string[];
  tags: string[];
  category: '创业'|'竞技'|'AI智能'|'新媒体';
  award?: string;
  impact?: string;
  demoUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  bullets: {
    title: string;
    description: string;
  }[];
  impact?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  description: string;
  items: {
    name: string;
    level: number; // 0 to 100
    details?: string;
  }[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'education' | 'experience' | 'project' | 'club';
  iconName: string;
}

export interface FuturePlanItem {
  id: string;
  title: string;
  timeframe: string;
  description: string;
  iconName: string;
  category: '学习' | '职业' | '创业' | '个人';
}
