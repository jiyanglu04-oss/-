import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Bookmark, Camera, ChartNoAxesCombined, Clapperboard, ExternalLink, Eye, Heart, ImagePlus, Plus, Sparkles } from 'lucide-react';

type EditingWork = { title: string; platform: string; url: string };
type ImageWork = { src: string; title: string; source: string };
type OperationWork = { title: string; type: string; url: string; cover: string; views: string; likes: string; saves: string };
const EMPTY_WORK_COUNT = 4;
const editingTypes = ['口播', '混剪', '宣传'];

const speakingWorks: EditingWork[] = [
  { title: '口播作品 01', platform: '本地视频 · 微信视频号', url: 'talk-01.mp4' },
  { title: '口播作品 02', platform: '本地视频 · 小红书', url: 'talk-02.mp4' },
  { title: '口播作品 03', platform: '本地视频 · 小红书', url: 'talk-03.mp4' },
];

const mixedWorks: EditingWork[] = [
  { title: '混剪作品 01', platform: '本地视频 · 小红书', url: 'mixed-01.mp4' },
  { title: '混剪作品 02', platform: '本地视频 · 小红书', url: 'mixed-02.mp4' },
  { title: '混剪作品 03', platform: '本地视频 · 小红书', url: 'mixed-03.mp4' },
  { title: '混剪作品 04', platform: '本地视频 · 小红书', url: 'mixed-04.mp4' },
];

const promotionWorks: EditingWork[] = [
  { title: '宣传剪辑作品 01', platform: '本地视频 · 微信视频号', url: 'promotion-link-01.mp4' },
  { title: '宣传剪辑作品 02', platform: '本地视频 · 微信视频号', url: 'promotion-link-02.mp4' },
  { title: '宣传剪辑作品 03', platform: '本地视频 · 微信视频号', url: 'promotion-link-03.mp4' },
  { title: '宣传剪辑作品 04', platform: '本地视频 · 微信视频号', url: 'promotion-link-04.mp4' },
  { title: '药膳智环项目宣传视频', platform: '本地视频 · 作品 01', url: 'promotion-video-01.mp4' },
  { title: '药膳智环项目宣传视频', platform: '本地视频 · 作品 02', url: 'promotion-video-02.mp4' },
];

const photoWorks: ImageWork[] = [
  { src: 'photography-01.jpg', title: '城市影像组照 01', source: 'IMG_3766.JPG' },
  { src: 'photography-02.jpg', title: '城市影像组照 02', source: 'IMG_3750.JPG' },
  { src: 'photography-03.jpg', title: '城市影像组照 03', source: 'IMG_0492 - 副本.JPG' },
  { src: 'photography-04.jpg', title: '城市影像组照 04', source: 'IMG_0494.JPG' },
  { src: 'photography-05.jpg', title: '城市影像组照 05', source: 'IMG_0495 - 副本.JPG' },
  { src: 'photography-06.jpg', title: '城市影像组照 06', source: 'IMG_0493.JPG' },
  { src: 'photography-07.jpg', title: '城市影像组照 07', source: 'IMG_0429 - 副本.JPG' },
  { src: 'photography-08.jpg', title: '城市影像组照 08', source: 'IMG_3784.JPG' },
  { src: 'photography-09.jpg', title: '城市影像组照 09', source: 'IMG_2242.JPG' },
];

const aiImageWorks: ImageWork[] = [
  { src: 'ai-work-01.png', title: 'AI 空间视觉作品 01', source: '高端复式住宅场景' },
  { src: 'ai-work-02.png', title: 'AI 家居场景作品 02', source: '家庭生活与智能家电' },
  { src: 'ai-work-03.png', title: 'AI 空间视觉作品 03', source: '现代复式住宅场景' },
  { src: 'ai-work-04.png', title: 'AI 家居场景作品 04', source: '自然光居家生活场景' },
  { src: 'ai-work-05.png', title: 'AI 家居场景作品 05', source: '亲子家庭清洁场景' },
  { src: 'ai-work-06.jpg', title: 'AI 家居场景作品 06', source: '家庭陪伴与智能家居场景' },
];

const operationWorks: OperationWork[] = [
  { title: '在珠海，这些景点真的好好逛～（附旅行路线）', type: '旅行攻略', url: 'http://xhslink.com/o/7NLHo20Tbuw', cover: 'xhs-work-01.jpg', views: '47,855', likes: '670', saves: '378' },
  { title: '苹果手机这样调色，30秒调出风光大片', type: '摄影教程', url: 'http://xhslink.com/o/AwjWhwxNrbf', cover: 'xhs-work-02.jpg', views: '27,128', likes: '326', saves: '288' },
  { title: '十多年前的单反真的与时代脱节了吗？', type: '器材分享', url: 'http://xhslink.com/o/8AehS15KjFu', cover: 'xhs-work-03.jpg', views: '40,415', likes: '529', saves: '119' },
  { title: '不要去李子坝人挤人啦！这里人少又好拍！', type: '机位分享', url: 'http://xhslink.com/o/4MbMW4KKw2Z', cover: 'xhs-work-04.jpg', views: '37,814', likes: '1,068', saves: '1,401' },
  { title: '广州9个机位大公开！摄影党速速码住！', type: '机位分享', url: 'http://xhslink.com/o/6FhRXMZSeXq', cover: 'xhs-work-05.jpg', views: '18,506', likes: '480', saves: '414' },
  { title: '一个县城女孩的十年｜一切都来得及', type: '成长故事', url: 'http://xhslink.com/o/A6G7QLSO1MP', cover: 'xhs-work-06.png', views: '24,971', likes: '512', saves: '202' },
];

const portfolioSections = [
  { id: 'editing', label: '剪辑作品', english: 'EDITING WORKS', title: '影像剪辑与动态叙事', description: '口播、混剪、宣传片及其他剪辑作品。', icon: Clapperboard, formats: '本地视频 · 站内播放 · 项目说明' },
  { id: 'photography', label: '摄影作品', english: 'PHOTOGRAPHY', title: '摄影创作与视觉观察', description: '风景、人文、城市与个人摄影系列。', icon: Camera, formats: '9 组作品 · 点击查看原图' },
  { id: 'ai-images', label: 'AI生图作品', english: 'AI IMAGE WORKS', title: '生成式视觉与创意实验', description: 'AI 视觉创作、风格探索、商业素材及创意图像实验。', icon: Sparkles, formats: '6 组作品 · 点击查看原图' },
  { id: 'operations', label: '运营经历', english: 'XIAOHONGSHU CASES', title: '小红书爆款内容作品', description: '用真实作品和播放、点赞、收藏数据，呈现选题、内容制作与爆款运营能力。', icon: ChartNoAxesCombined, formats: '6 篇作品 · 播放 / 点赞 / 收藏' },
];

export default function Portfolio() {
  const [active, setActive] = useState(portfolioSections[0].id);
  const [editingType, setEditingType] = useState(editingTypes[0]);
  const current = portfolioSections.find((section) => section.id === active) || portfolioSections[0];
  const Icon = current.icon;
  const isEditing = active === 'editing';
  const imageWorks = active === 'photography' ? photoWorks : active === 'ai-images' ? aiImageWorks : null;
  const editingWorks = !isEditing ? null : editingType === '口播' ? speakingWorks : editingType === '混剪' ? mixedWorks : promotionWorks;
  const operationCards = active === 'operations' ? operationWorks : null;
  const editingLabel = editingType === '口播' ? 'TALKING VIDEO' : editingType === '混剪' ? 'MIXED EDIT' : 'PROMOTION VIDEO';

  return <section id="portfolio" className="portfolio-section portfolio-grid-section"><div className="portfolio-shell">
    <div className="portfolio-heading"><div><div className="section-kicker">/ SELECTED ARCHIVE</div><h2>作品集</h2></div><p>按类别直接浏览我的创作、摄影与运营成果，视频可直接在站内播放。</p></div>
    <div className="portfolio-tabs portfolio-grid-tabs" role="tablist" aria-label="作品集分类">{portfolioSections.map((section, index) => { const TabIcon = section.icon; return <button key={section.id} role="tab" aria-selected={active === section.id} onClick={() => setActive(section.id)} className={active === section.id ? 'active' : ''}><span className="portfolio-tab-index">0{index + 1}</span><TabIcon /><span>{section.label}</span></button>; })}</div>
    <div className="portfolio-board portfolio-grid-board"><div className="portfolio-board-intro"><div className="portfolio-board-icon"><Icon /></div><div><small>{current.english}</small><h3>{current.title}</h3><p>{current.description}</p></div><span className="portfolio-formats">{current.formats}</span></div>
      {isEditing && <div className="editing-subcategories" role="tablist" aria-label="剪辑作品分类"><span>EDITING CATEGORY</span><div>{editingTypes.map((type) => <button key={type} role="tab" aria-selected={editingType === type} className={editingType === type ? 'active' : ''} onClick={() => setEditingType(type)}>{type}</button>)}</div></div>}
      <motion.div key={`${active}-${editingType}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .3 }} className={imageWorks ? 'portfolio-photo-grid' : editingWorks ? 'editing-link-grid' : operationCards ? 'operation-work-grid' : 'portfolio-slots'}>
        {imageWorks ? imageWorks.map((work, index) => <a className="portfolio-photo-card" href={`${import.meta.env.BASE_URL}${work.src}`} target="_blank" rel="noopener noreferrer" key={work.src} aria-label={`查看${work.title}原图`}><div className="portfolio-photo-image"><img src={`${import.meta.env.BASE_URL}${work.src}`} alt={work.title} loading="lazy" /></div><div className="portfolio-photo-meta"><span>{String(index + 1).padStart(2, '0')}</span><div><h4>{work.title}</h4><p>{work.source}</p></div><ExternalLink /></div></a>) : editingWorks ? editingWorks.map((work, index) => <article className="editing-video-card" key={work.url}><div className="editing-video-number">{String(index + 1).padStart(2, '0')}</div><video controls preload="metadata" playsInline aria-label={work.title}><source src={`${import.meta.env.BASE_URL}${work.url}`} type="video/mp4" />您的浏览器不支持视频播放。</video><div className="editing-video-copy"><small>{editingLabel}</small><h4>{work.title}</h4><p>{work.platform} · 站内播放</p></div></article>) : operationCards ? operationCards.map((work, index) => <a className="operation-work-card" href={work.url} target="_blank" rel="noopener noreferrer" key={work.url} aria-label={`打开小红书作品：${work.title}`}><div className="operation-work-cover"><img src={`${import.meta.env.BASE_URL}${work.cover}`} alt={work.title} loading="lazy" /><div className="operation-work-shade" /><span className="operation-work-index">{String(index + 1).padStart(2, '0')}</span><span className="operation-work-badge">小红书 · {work.type}</span><span className="operation-work-open">查看原作品 <ArrowUpRight /></span></div><div className="operation-work-copy"><small>CONTENT OPERATION CASE</small><h4>{work.title}</h4><div className="operation-metrics"><div><Eye /><span>播放量</span><strong>{work.views}</strong></div><div><Heart /><span>点赞量</span><strong>{work.likes}</strong></div><div><Bookmark /><span>收藏量</span><strong>{work.saves}</strong></div></div></div></a>) : Array.from({ length: EMPTY_WORK_COUNT }, (_, index) => <article className="portfolio-slot" key={index}><div className="portfolio-slot-top"><span>WORK {String(index + 1).padStart(2, '0')}</span><ImagePlus /></div><div className="portfolio-slot-center"><ImagePlus /><strong>待添加作品</strong><span>封面、简介与成果链接</span></div><div className="portfolio-slot-bottom"><Plus /> 添加作品内容</div></article>)}
      </motion.div>
    </div>
  </div></section>;
}

