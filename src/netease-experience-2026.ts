import { experiences, timelineEvents } from './data';

const neteaseExperience = experiences.find((experience) => experience.id === 'exp-netease-camp');

if (neteaseExperience) {
  neteaseExperience.role = '内容运营（线上实践）';
  neteaseExperience.period = '2026.6 - 2026.7';
} else {
  const qianyiExperienceIndex = experiences.findIndex((experience) => experience.id === 'exp-qy');

  experiences.splice(qianyiExperienceIndex >= 0 ? qianyiExperienceIndex + 1 : 0, 0, {
    id: 'exp-netease-camp',
    company: '网易传媒校园创作夏令营',
    role: '内容运营（线上实践）',
    period: '2026.6 - 2026.7',
    bullets: [
      {
        title: '内容产出',
        description: '独立负责内容宣发，结合平台热点与目标受众画像，完成84条内容的选题策划、文案撰写及发布，累计曝光量达1万。'
      },
      {
        title: '渠道引流',
        description: '精准运用小红书、抖音等平台的流量分发机制，持续优化内容关键词、封面与标题，成功将公域流量引导至网易小蜜蜂，验证从内容种草到用户转化的完整闭环。'
      },
      {
        title: '数据复盘',
        description: '持续监测各平台内容互动率与转化率，总结高表现内容规律，并据此调整后续选题与内容方向，使账号平均互动率提升15%。'
      }
    ],
    impact: '独立完成84条内容，累计曝光1万，推动账号平均互动率提升15%'
  });
}

const neteaseTimeline = timelineEvents.find((event) => event.id === 't-netease-camp');

if (neteaseTimeline) {
  neteaseTimeline.date = '2026.06';
  neteaseTimeline.subtitle = '内容运营（线上实践）';
} else {
  timelineEvents.push({
    id: 't-netease-camp',
    date: '2026.06',
    title: '加入网易传媒校园创作夏令营',
    subtitle: '内容运营（线上实践）',
    description: '围绕平台热点与用户画像独立完成84条内容策划、撰写和发布，并通过关键词、封面与标题优化实现公域引流；基于数据复盘持续迭代，使账号平均互动率提升15%。',
    type: 'experience',
    iconName: 'Briefcase'
  });
}
