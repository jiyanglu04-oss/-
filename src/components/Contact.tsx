import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Loader2, Sparkles, Star } from 'lucide-react';
import { personalInfo } from '../data';

// ====== 替换为你的 Formspree 表单 ID ======
const FORMSPREE_ID = 'YOUR_FORM_ID';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMsg('发送失败，请稍后重试或直接通过邮箱联系我');
      }
    } catch {
      setErrorMsg('网络错误，请检查网络后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="py-24 bg-slate-50 relative overflow-hidden"
    >
      {/* Background Orbs */}
      <div className="absolute right-[-10%] bottom-[-10%] w-[450px] h-[450px] bg-brand-200/25 blur-[130px] pointer-events-none" />
      <div className="absolute left-[-5%] top-10 w-[300px] h-[300px] bg-brand-200/20 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="px-3.5 py-1 rounded-full bg-white border border-slate-900/20 text-slate-700 text-xs font-semibold tracking-wider mb-3 uppercase">
            Let's work together / 开启深入合作
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 relative">
            期待我的加入？
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full" />
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Contact cards (Email, phone, location) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm flex-1 flex flex-col justify-between">
              
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">联系人基本信息</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-8">
                  可以通过以下途径直接联系我，我通常会在24小时内给予回复。期待进行深入的业务或学习探讨。
                </p>

                {/* Info row elements */}
                <div className="space-y-6">
                  {/* Item 1: Email */}
                  <div className="flex items-center gap-4 group">
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-brand-600 group-hover:bg-slate-100 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">联系邮箱</span>
                      <a href={`mailto:${personalInfo.email}`} className="text-sm text-slate-900 hover:text-brand-700 font-semibold transition-colors">
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  {/* Item 2: Phone */}
                  <div className="flex items-center gap-4 group">
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-brand-600 group-hover:bg-slate-100 transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">移动电话 / 微信</span>
                      <a href={`tel:${personalInfo.phone}`} className="text-sm text-slate-900 hover:text-brand-700 font-semibold transition-colors">
                        {personalInfo.phone}
                      </a>
                    </div>
                  </div>

                  {/* Item 3: Major Location */}
                  <div className="flex items-center gap-4 group">
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-brand-600 group-hover:bg-slate-100 transition-colors">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">居住地 / 通讯地</span>
                      <span className="text-sm text-slate-900 font-semibold">
                        {personalInfo.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status banner in bottom */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <span className="text-[10px] text-slate-500 font-mono tracking-wider font-semibold block mb-3 uppercase">
                  当前个人状态 Status
                </span>
                <div className="flex items-center gap-2.5 p-4 bg-brand-50 border border-brand-200 rounded-2xl">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75 animate-[ping_1.5s_infinite]"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500"></span>
                  </span>
                  <p className="text-xs text-brand-700 leading-relaxed font-semibold">
                    开放多平台实习、商业合作，随时在线沟通讨论
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Send Message Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm flex-1 flex flex-col relative overflow-hidden">
              
              <h3 className="text-lg font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-brand-600" />
                <span>在线发送留言</span>
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                您可以填写下表给我留言，点击后信息将触达我的控制系统，我会尽快邮件答复。
              </p>

              {/* Form details */}
              <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="form-name" className="text-[10px] text-slate-600 font-bold block mb-1 uppercase">您的姓名 *</label>
                      <input 
                        id="form-name"
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="陆工 / 合作方" 
                        className="w-full text-xs text-slate-900 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-brand-500/50 focus:outline-none transition-colors"
                      />
                    </div>
                    {/* Email */}
                    <div>
                      <label htmlFor="form-email" className="text-[10px] text-slate-600 font-bold block mb-1 uppercase">您的邮箱 *</label>
                      <input 
                        id="form-email"
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com" 
                        className="w-full text-xs text-slate-900 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-brand-500/50 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="form-subject" className="text-[10px] text-slate-600 font-bold block mb-1 uppercase">主题</label>
                    <input 
                      id="form-subject"
                      type="text" 
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="探讨新媒体投放 / 实习职位邀约" 
                      className="w-full text-xs text-slate-900 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-brand-500/50 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="form-message" className="text-[10px] text-slate-600 font-bold block mb-1 uppercase">留言内容 *</label>
                    <textarea 
                      id="form-message"
                      rows={4} 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="请写下合作需求、联络细节等，祝您拥有美好的一天！" 
                      className="w-full text-xs text-slate-900 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-brand-500/50 focus:outline-none transition-colors resize-none"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  {/* Submit button with glow and dynamic status */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-semibold text-xs py-4 rounded-xl shadow-sm hover:bg-slate-800 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>正在发送信息...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>发送留言</span>
                      </>
                    )}
                  </button>

                  {errorMsg && (
                    <p className="text-xs text-red-500 mt-3 text-center">{errorMsg}</p>
                  )}
                </div>

              </form>

              {/* SUCCESS TOAST FLYOUT OVERLAY */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-4 rounded-2xl bg-white/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 border border-slate-200 z-20"
                  >
                    <div className="p-4 bg-brand-500/10 rounded-full border border-brand-500/20 mb-4 text-brand-400">
                      <CheckCircle2 className="w-10 h-10 animate-bounce" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">感谢您的信任与留言！</h4>
                    <p className="text-xs text-slate-600 max-w-sm leading-relaxed mb-6">
                      我的自动信息接收机已捕获您的留言，已将一封加密存证件分发至我的邮箱。我将在一小时内直接在邮件与您回复探讨！
                    </p>
                    
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-5 py-2 bg-slate-900 border border-slate-900 rounded-full text-xs font-semibold text-white hover:bg-slate-800 cursor-pointer"
                    >
                      再次填写留言
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
