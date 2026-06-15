import { Project, Experience, SkillCategory, TimelineEvent } from './types';

export const personalInfo = {
  name: '陆机阳',
  pinyin: 'Lu Jiyang',
  title: 'AI运营创作者 & 金融数据分析师',
  subtitle: 'Financial Engineering Student | AI Content Creator & Developer',
  email: '1346514923@qq.com',
  phone: '15813688227',
  university: '暨南大学 (Jinan University)',
  major: '金融工程本科（珠海校区）',
  period: '2025.09 - 至今 (211工程 / 双一流高校)',
  location: '中国 · 珠海',
  avatarDescription: 'Available for work',
  bio: '我于暨南大学攻读金融工程专业。热衷于探索AI和商业运营的深度结合，擅长使用 Cursor，Codex，CodeBuddy和 Coze 等 AI 编程辅助与工作流工具，能够将新媒体流量思维形态、数据科学模型（如 SPSSPRO、Excel 数据挖掘）与产品原型开发（Figma、墨刀）相融合。具备小红书百万级内容曝光创作和运营经验、多场大型活动协助统筹与企业运营优化落地经验，致力于通过高效敏捷的运营、商业化运作与精细化数据驱动，实现价值突围。',
  socials: [
    { name: 'Github', url: 'https://github.com', icon: 'Github' },
    { name: 'Email', url: 'mailto:1346514923@qq.com', icon: 'Mail' },
    { name: 'WeChat', url: '#', icon: 'MessageCircle', detail: '15813688227' }
  ],
  advantages: [
    '媒体技能：用户画像，问卷法，用户分群；熟练掌握剪映、秀米、醒图，PS、LR等媒体编辑软件',
    '语言技能：英语口语表达较流畅标准；普通话、粤语发音标准清晰，逻辑思维强',
    '专业软件：熟练掌握Xmind、Figma、墨刀、MasterGo、Excel（数据透视表、VLOOKUP函数等）等软件，熟练使用SPSSPRO进行数据分析，擅长PPT展示，能够快速输出PRD、SOP等文档',
    'AI编程：熟练掌握Cursor、Trae、Coze等AI编程软件，并结合产品原型软件快速输出产品demo。',
    '兴趣爱好：摄影（视觉中国签约摄影师）、旅行、健身、羽毛球、篮球、音乐。'
  ]
};

export const experiences: Experience[] = [
  {
    id: 'exp-qy',
    company: '千易文化传媒有限公司',
    role: '新媒体运营',
    period: '2025.10 - 2026.02',
    bullets: [
      {
        title: '用户增长与公私域获客',
        description: '负责小红书公域流量深度挖掘，制定标准主客观私信建联阻截机制，精准定位目标人群。日均发起有效深入沟通10+次，实现高粘度私域社群沉淀，累计精细化服务及促成高客单价意向客户20+人。'
      },
      {
        title: '销售转化与团队沟通',
        description: '全权负责客户多维度痛点诊断、定制化方案报价与协议谈判。作为联结客户与设计团队之间的核心沟通枢纽，将业务语言转化为精准设计需求（SOP/需求单），实习期间内累计转化并完成100+宗商业订单，沉淀10+长期复购客户，间接推动公司整体营收增长10万+人民币。'
      },
      {
        title: '电商店铺运营',
        description: '完全独立操盘小红书店铺后台，负责数字化电子资源、设计模板与创意资产的上架、SEO关键词优化及精细化维护。新拓展了独立虚拟数字产品变现渠道，实现累计订单成交2000+笔，斩获GMV 1万+人民币。'
      },
      {
        title: 'AI工具降本增效',
        description: '面对繁杂的视觉设计素材瓶颈，主动探索AI智能生图工作流。使用 ChatGPT、Gemini 和即梦等主流大模型作为协作智囊，协助设计团队快速出初稿、批量延展高品质背景素材。该流程革新直接缩短团队交付周期20%，显著实现项目组的降本增效。'
      }
    ],
    impact: '成功验证"新媒体+AI辅助设计+精细化客服"的高效转化闭环，个人推动营收10W+'
  },
  {
    id: 'exp-jnu',
    company: '暨南大学国际商学院融媒体中心',
    role: '新媒体运营',
    period: '2025.09 - 至今',
    bullets: [
      {
        title: '大型校园活动策划与运营',
        description: '协助负责策划、宣传与统筹执行 6场 大型校园活动。每场活动平均吸引100+位高参与度同学，统筹跨部门调配，协助接管方案定制、预算精密管控、实务物料采购及多方案容灾安全预案，确保所有大型活动全程零事故顺利落地。'
      },
      {
        title: '影像拍摄与后期剪辑包装',
        description: '负责融媒体团队的视频，照片拍摄与后期。深度参与 20+ 场论坛或典礼的现场多机位拍摄、摄像调度、灯光配置，全流程执行后期剪辑、音频降噪、调色与精美动态特效包装，累计输出 20+ 条高传播度的活动纪实短片和宣传片。'
      }
    ],
    impact: '统筹6场100+级活动全部圆满交付，累计创作的高宣发视频成为对外招生宣传的名片'
  }
];

export const projects: Project[] = [
  {
    id: 'proj-shopee',
    title: '独立跨境电商运营项目 (Shopee)',
    role: '创始人 / 主理人',
    period: '2026.03 - 至今',
    category: '创业',
    actionLabel: '咨询细节',
    description: [
      '市场深度剖析与爆款选品：定量抓取TikTok Shop 与 Shopee 平台的大数据热销榜和趋势上升流。跨站点比较供给端劣势，挖掘出尚未饱和且转化率亮眼的宠物用品分类。',
      '全链路多店搭建与基础合规：全权制定运营细则与物流链路，零起步完成公司资质获取、跨境全站店铺冷启。利用高效采集脚本在2个月内上架并优化高潜 SKU 100+ 种。',
      '精细化变现与数据看板监控：高频跟踪后台核心流量转化漏洞链。通过主图差异化设计与短视频投流，针对每日的跳出率、收藏量与转化率进行快速A/B测试。'
    ],
    tags: ['跨境电商', 'TikTok Shop', '选品逻辑', '数据看板', '运营分析'],
    impact: '2个月内在严冬竞争中沉淀 100+ SKU 原始货盘积累，验证从分析至盈利的0-1商业闭环'
  },
  {
    id: 'proj-yaoshan',
    title: '药膳智环-AI驱动下药食同源闭环平台',
    role: '项目核心成员',
    period: '2026.03 - 2026.05',
    category: 'AI智能',
    award: '挑战杯校级银奖',
    actionLabel: '咨询细节',
    description: [
      '基于Coze平台协助搭建工作流，接入AI大模型，实现AI舌诊图像识别与智能辨证功能，并生成个性化的药膳食疗报告。',
      '独立负责项目全周期的10+个宣传视频拍摄、剪辑与发布，并主导高质量答辩PPT制作，有效提升了项目的正面形象与影响力。'
    ],
    tags: ['Coze 智能体', '舌诊图像识别', '挑战杯银奖', '视频剪辑', '工作流设计'],
    impact: '将中医药传统诊断融合AI端侧化，斩获由权威学术评审颁发的挑战杯校赛银奖'
  },
  {
    id: 'proj-zhengda',
    title: '广州新能源汽车用户全生命周期价值调研',
    role: '核心数据建模与统计分析员',
    period: '2025.10 - 2026.03',
    category: '竞技',
    award: '"正大杯"第16届全国市场调查大赛校赛三等奖',
    actionLabel: '咨询细节',
    description: [
      '高质量问卷设计与多渠道执行：针对广州市新能源汽车的核心车主（涵盖混动/纯电），打通线上社区加线下车展车友会渠道，自主发放并回收到 531份 问卷数据。人工核减剔除无效与胡乱填写样本后，保留 353份 高度有效且全生命周期刻画完整的问卷。针对典型重度用户主持 4场 线下深度结构化访谈。',
      '高级数理统计建模：操作 SPSSPRO 运用 Cronback\'s Alpha、探索性因子等方法，极其严谨地完成问卷整体与各因子的信效度实证检验。通过协方差检验等手段，助力团队建立具有前瞻性、契合广州车主特点的 EV 客户全生命周期价值挖掘模型。',
      '学术标准白皮书输出与规范化排版：深挖国内外 20+ 篇顶尖行业研究及期刊文献，构筑扎实的理论基础框架。负责全部市场分析白皮书的最终文字锤炼、逻辑流整理、插表以及学术排版渲染，产出了近3万字的商业与学术两用高质量报告。'
    ],
    tags: ['SPSSPRO', '信效度分析', '正大杯', '用户调研', '数据建模', '问卷设计'],
    impact: '严谨的调研设计受到大赛评委极佳评价，成功斩获校赛三等奖，学术分析获得高度认可'
  },
  {
    id: 'proj-red',
    title: '小红书视觉系个人自媒体 (风景/人文自媒体)',
    role: '独立自媒体主理人与主创摄影师',
    period: '2024.07 - 至今',
    category: '新媒体',
    link: 'https://xhslink.com/m/9cqjTBXcsZ',
    actionLabel: '看看主页',
    description: [
      '垂直影像内容孵化与运营复盘：结合个人摄影，在小红书平台持续深耕风景、人文视觉方向。向大众无保留交付调色、打灯等干货教程与实用攻略，高关注度拆解核心运营策略。',
      '运营突破与平台成就：全平台累计精心撰写并发布图文笔记 40+ 篇。实现小红书整号流量全面爆发，斩获 150w+ 全平台总曝光量、25w+ 主动浏览量，单篇最高获千赞，累计获赞与收藏 8000+。',
      '商业化签约：凭借顶尖的图片艺术美感和庞大的高质量原创数据库，个人成功获邀签约并注册成为【视觉中国 (Visual China Group)】官方合作签约摄影师。'
    ],
    tags: ['小红书运营', '摄影创作', '视觉中国签约', 'LR色彩美学'],
    impact: '以极低成本撬动 150W+ 真实曝光，验证了"知识分享 + IP 标签 + 圈层渗透"的新媒体打法'
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'AI工具与创新编程',
    icon: 'Sparkles',
    description: '前沿的大模型工具实践经验，快速将构想落地为智能产品或运营工具',
    items: [
      { name: 'Cursor / Trae / Codex', level: 85, details: '掌握AI编程，快速交付前端/产品demo' },
      { name: 'Coze工作流搭建', level: 90, details: '掌握API接入、多支复杂控制流、AI智能体接入' },
      { name: 'AI 生图与素材辅助协作 (ChatGPT/Gemini/即梦)', level: 88, details: '熟练协助内容和设计人员20%降本增效' }
    ]
  },
  {
    title: '数据分析与专业软件',
    icon: 'BarChart3',
    description: '逻辑与数理支撑，结合金融工程专业背景，严谨的数据建模和清洗能力',
    items: [
      { name: 'SPSSPRO 数据统计分析', level: 85, details: '用于调研问卷的信度、效度、因子分析等多变量研究' },
      { name: 'EXCEL（数据透视表，VLOOKUP函数）', level: 92, details: '灵活进行销售、GMV多维度核查及商业数据治理' },
      { name: 'Figma / MasterGo / 墨刀', level: 80, details: '高保真低保真原型极其迅速的草绘、设计与协作' },
      { name: 'Xmind 逻辑框架与PRD编写', level: 88, details: 'SOP与PRD需求文档的高效撰写' }
    ]
  },
  {
    title: '媒体与视觉生产',
    icon: 'Video',
    description: '全套的拍摄与剪底子。新媒体核心运营、文字包装与多渠道整合爆发能力',
    items: [
      { name: '专业摄影与后期修图 (Lightroom / Photoshop)', level: 95, details: '视觉中国签约，主攻人文/城市等摄影分享' },
      { name: '剪映 / Premiere 后期剪辑与动效包装', level: 90, details: '产出20+场大型活动高级纪实片，熟练宣发' },
      { name: '新媒体增长运营与精细化私域转化', level: 88, details: '小红书、微信等，日均10+高客单深入建联' },
      { name: '大型活动全生命周期策划与统筹', level: 85, details: '主导6场百人活动策划、零容忍应急，零事故落地' }
    ]
  }
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: 't-red-up',
    date: '2024.07',
    title: '开启小红书摄影自媒体探索',
    subtitle: '小红书摄影IP创建',
    description: '高中时期对摄影摄像十分感兴趣，于是在小红书上结合个人的摄影和剪辑作品进行调色和作品的分享，至今总共获得150w+的小红书平台曝光，25w+的浏览量，点赞和收藏量8000+，并且将图片上传至视觉中国平台，签约成为视觉中国签约摄影师，为其供稿卖图。',
    type: 'club',
    iconName: 'Camera'
  },
  {
    id: 't-school',
    date: '2025.09',
    title: '暨南大学录取 & 商学院融媒体中心起跑',
    subtitle: '核心成员',
    description: '入读暨南大学金融工程专业，未来是想要成为一名互联网产品经理，于是打算从运营做起，便加入国际商学院融媒体中心担任新媒体运营，期间统筹各项学院级和学校级大型活动，负责活动策划，人员调动，摄影摄像，后期制作。',
    type: 'education',
    iconName: 'GraduationCap'
  },
  {
    id: 't-zhengda',
    date: '2025.10',
    title: '新能源EV全链价值调研暨"正大杯"开赛',
    subtitle: '核心数据建模师',
    description: '联合多名伙伴启动EV汽车长周期课题调研，主导问卷模型与531份深层样本。此项目在数月后成功攻破技术性评估，最终斩获十六届赛事的优秀三等奖。',
    type: 'project',
    iconName: 'Trophy'
  },
  {
    id: 't-qy-media',
    date: '2025.10',
    title: '入职千易传媒担任运营实习生',
    subtitle: '新媒体运营',
    description: '管理小红书电子资产店铺从 0 冲到累计成交 2000+，全流跟进100+意向单促进10W+业绩。此间主动探索Gemini/ChatGPT绘图辅助，为团队降本增效。',
    type: 'experience',
    iconName: 'Briefcase'
  },
  {
    id: 't-shopee-cold',
    date: '2026.03',
    title: '冷启动个体项目 (Shopee跨境店铺)',
    subtitle: '创始人',
    description: '独立注册公司营业执照，打通从TikTok Shop选品检索到搭建Shopee店铺。从1688寻求货源并且一件代发，在短短2个月冷启期内上架100+ SKU。',
    type: 'project',
    iconName: 'ShoppingBag'
  },
  {
    id: 't-yaoshan-chal',
    date: '2026.03',
    title: '智能系统"药膳智环"起炉暨打响"挑战杯"',
    subtitle: '核心成员',
    description: '项目实现"线上AI舌诊检测体质-获取体质报告-药食同源建议-线下售卖"的闭环，在项目期间联合珠海中医诊所，为大学生群体售卖药食同源的养生茶等产品盈利达到1w+，项目获得"挑战杯"校级银奖。',
    type: 'project',
    iconName: 'Award'
  }
];
