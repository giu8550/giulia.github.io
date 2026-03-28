"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    EyeIcon, LockClosedIcon, AcademicCapIcon, PencilSquareIcon, UserGroupIcon as CollabIcon, HandRaisedIcon, 
    CameraIcon, ArrowPathIcon, CodeBracketIcon, LinkIcon, CheckIcon, PencilIcon
} from "@heroicons/react/24/outline";

// --- DADOS MOCKADOS E ISOLADOS ---
const DEFAULT_SKILLS = [
    { id: "frontend", name: "Front-end Dev", icon: PencilSquareIcon, rank: "S", current: 95, next: 100, metricName: "XP" },
    { id: "backend", name: "Back-end Logic", icon: EyeIcon, rank: "A", current: 80, next: 100, metricName: "XP" },
    { id: "design", name: "UI/UX Design", icon: CollabIcon, rank: "S", current: 90, next: 100, metricName: "XP" },
    { id: "learning", name: "Continuous Learning", icon: HandRaisedIcon, rank: "S+", current: 100, next: 100, metricName: "XP" }
];

const THEME = {
    pageBg: "bg-pink-50 dark:bg-[#1a0a13]", 
    capsuleBorder: "border-pink-300 dark:border-pink-500/30",
    capsuleIconFill: "text-rose-500 dark:text-pink-400", 
    cardBg: "bg-white/40 dark:bg-pink-900/10", 
    cardBorder: "border-white/60 dark:border-pink-300/30",
    panelWrapper: "bg-white/30 dark:bg-pink-950/20 backdrop-blur-3xl border border-white/50 dark:border-pink-400/20 shadow-[0_8px_32px_rgba(236,72,153,0.15)]", 
    textStrong: "text-pink-950 dark:text-pink-50", 
    textMuted: "text-pink-700/70 dark:text-pink-200/50", 
    textHighlight: "text-rose-600 dark:text-white drop-shadow-[0_0_10px_rgba(255,182,193,0.8)]",
    skillIconFill: "text-rose-500 dark:text-pink-300", 
    skillTitle: "text-rose-600 dark:text-pink-400",
    skillFill: "bg-gradient-to-r from-rose-400 to-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.6)]", 
    accentMuted: "bg-pink-300/50 dark:bg-pink-500/30", 
    dnaColor1: "bg-rose-400 shadow-[0_0_15px_#f43f5e]",
    dnaColor2: "bg-pink-400 shadow-[0_0_15px_#ec4899]", 
    dnaGradient: "from-rose-400 to-pink-400",
};

// --- COMPONENTES VISUAIS ISOLADOS ---
const RealisticDNA = () => (
    <motion.div animate={{ opacity: [0.8, 1, 0.8], scale: [0.98, 1.02, 0.98] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 flex flex-col items-center justify-around py-4 z-10" style={{ perspective: "1000px" }}>
        {[...Array(30)].map((_, i) => (
            <motion.div key={i} className="relative w-16 h-[3px] flex items-center justify-between" animate={{ rotateY: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: i * 0.15 }}>
                <div className={`w-3 h-3 rounded-full ${THEME.dnaColor1}`} />
                <div className={`flex-1 h-[2px] bg-gradient-to-r ${THEME.dnaGradient}`} />
                <div className={`w-3 h-3 rounded-full ${THEME.dnaColor2}`} />
            </motion.div>
        ))}
    </motion.div>
);

const SkillDrawer = ({ skill, isOpen, onToggle }: any) => {
    const progressPercent = Math.min((skill.current / skill.next) * 100, 100);
    return (
        <div className="relative z-40 group/drawer flex items-center">
            <div className={`w-6 h-[2px] ${THEME.accentMuted}`} />
            <motion.button onClick={onToggle} className={`relative w-9 h-9 flex items-center justify-center border rounded-full transition-all z-50 shadow-md backdrop-blur-md hover:scale-110 ${THEME.cardBorder} ${THEME.cardBg}`}>
                <skill.icon className={`w-4 h-4 ${THEME.skillIconFill}`} />
            </motion.button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ x: -20, opacity: 0, scale: 0.8 }} animate={{ x: 10, opacity: 1, scale: 1 }} exit={{ x: -10, opacity: 0, scale: 0.8 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className={`absolute left-full ml-2 w-56 border p-4 rounded-2xl shadow-xl backdrop-blur-2xl z-50 ${THEME.cardBg} ${THEME.cardBorder}`}>
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex flex-col">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${THEME.skillTitle}`}>{skill.name}</span>
                                <span className={`text-xs font-black mt-1 ${THEME.textStrong}`}>Rank {skill.rank}</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-end mb-1.5">
                            <span className="text-[9px] uppercase font-bold text-pink-400 dark:text-pink-200/40 tracking-widest">Progresso</span>
                            <span className={`text-[10px] font-mono font-bold ${THEME.textStrong}`}>{progressPercent}%</span>
                        </div>
                        <div className="w-full h-2 bg-pink-200 dark:bg-pink-900/30 rounded-full overflow-hidden shadow-inner">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} className={`h-full ${THEME.skillFill} shadow-[0_0_10px_rgba(236,72,153,0.6)]`} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const TechStackMarquee = () => {
    const techs = ["JavaScript", "Next.js", "Node.js", "PHP", "CSS", "HTML5", "TypeScript"];
    
    return (
        <div className="w-full overflow-hidden flex items-center py-6 relative mt-12 backdrop-blur-md bg-white/5 border-y border-pink-200/30">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-pink-50 dark:from-[#1a0a13] to-transparent z-10" />
            <motion.div 
                className="flex gap-8 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 25, ease: "linear", repeat: Infinity }}
            >
                {[...techs, ...techs, ...techs].map((tech, i) => (
                    <div key={i} className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 dark:bg-pink-900/20 border border-white/40 dark:border-pink-500/30 shadow-lg backdrop-blur-xl">
                        <CodeBracketIcon className="w-4 h-4 text-pink-500 dark:text-pink-300" />
                        <span className="text-sm font-black tracking-widest uppercase text-pink-600 dark:text-pink-200">{tech}</span>
                    </div>
                ))}
            </motion.div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-pink-50 dark:from-[#1a0a13] to-transparent z-10" />
        </div>
    );
};

// --- PÁGINA PRINCIPAL ---
export default function PortfolioFeminino() {
    const [mounted, setMounted] = useState(false);
    const [activeSkill, setActiveSkill] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [userImage, setUserImage] = useState("/assets/default-avatar.png"); // Coloque o caminho de uma foto padrão dela aqui se quiser

    // Estado dos Projetos Editáveis Localmente
    const [projects, setProjects] = useState([
        { id: 1, title: "E-Commerce de Beleza", link: "https://github.com/usuario/ecommerce" },
        { id: 2, title: "Dashboard Analítico", link: "https://github.com/usuario/dashboard" },
        { id: 3, title: "App de Saúde Feminina", link: "https://github.com/usuario/app-saude" }
    ]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState({ title: "", link: "" });

    useEffect(() => { setMounted(true); }, []);

    const handleEditStart = (proj: any) => {
        setEditingId(proj.id);
        setEditForm({ title: proj.title, link: proj.link });
    };

    const handleEditSave = (id: number) => {
        setProjects(projects.map(p => p.id === id ? { ...p, title: editForm.title, link: editForm.link } : p));
        setEditingId(null);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsUploading(true);
        
        // Simula o carregamento e atualiza a imagem localmente (sem backend)
        setTimeout(() => {
            const tempUrl = URL.createObjectURL(file);
            setUserImage(tempUrl);
            setIsUploading(false);
        }, 800);
    };

    if (!mounted) return null;

    return (
        <div className={`w-full min-h-screen overflow-x-hidden overflow-y-auto custom-scrollbar relative transition-colors duration-1000 font-mono pb-20 ${THEME.pageBg}`}>
            
            {/* Background com gradiente suave para substituir a matrix e não depender de arquivos externos */}
            <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-200/20 via-transparent to-transparent pointer-events-none" />

            <div className="w-full flex flex-col items-center justify-start relative z-20 pt-16 px-4 sm:px-8">

                <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">

                    {/* --- LADO ESQUERDO: HUD DO PERSONAGEM (DNA) --- */}
                    <div className="lg:col-span-5 relative flex flex-col items-start pl-4 lg:pl-10 lg:mt-12">

                        <div className="relative flex items-start">
                            {/* A CÁPSULA DE DNA */}
                            <div className={`relative w-[150px] sm:w-[180px] h-[450px] sm:h-[500px] rounded-[100px] border-[3px] backdrop-blur-3xl flex flex-col items-center justify-center z-20 py-10 shadow-[0_0_50px_rgba(244,114,182,0.15)] ${THEME.capsuleBorder} bg-white/10 dark:bg-pink-900/10`}>
                                <RealisticDNA />

                                <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="relative z-30">
                                    <label className={`relative block w-28 h-28 sm:w-32 sm:h-32 rounded-full border-[5px] p-1 shadow-2xl cursor-pointer group/avatar bg-white dark:bg-black border-pink-400/50 ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                                        {/* Fallback caso a imagem dê erro ao não ter o path correto no projeto */}
                                        <div className="absolute inset-1 rounded-full overflow-hidden bg-pink-100 flex items-center justify-center">
                                            {userImage.startsWith('blob:') || userImage === "/assets/default-avatar.png" ? (
                                                 <Image src={userImage} alt="Avatar" fill className="object-cover" />
                                            ) : (
                                                 <CameraIcon className="w-10 h-10 text-pink-300" />
                                            )}
                                        </div>
                                        <div className="absolute inset-0 bg-pink-900/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity backdrop-blur-sm z-10">
                                            {isUploading ? <ArrowPathIcon className="w-6 h-6 text-white animate-spin mb-1" /> : <CameraIcon className="w-8 h-8 text-white mb-1" />}
                                            <span className="text-[7px] uppercase font-bold text-white tracking-widest text-center px-2">{isUploading ? 'Processando...' : 'Mudar Foto'}</span>
                                        </div>
                                    </label>
                                </motion.div>
                            </div>

                            <div className="absolute left-[90%] sm:left-[100%] top-8 flex flex-col gap-6 z-10 w-[250px] sm:w-full min-w-[280px]">
                                {/* NOME */}
                                <div className="flex flex-col mb-2 pl-6">
                                    <span className={`text-3xl sm:text-4xl font-black tracking-tighter drop-shadow-md ${THEME.textStrong}`}>
                                        Giulia Fernanda Nascimento de Araújo
                                    </span>
                                </div>

                                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="relative flex items-center">
                                    <div className={`w-6 h-[2px] ${THEME.accentMuted}`} />
                                    <div className={`border px-6 py-4 rounded-3xl backdrop-blur-xl shadow-xl flex items-center gap-4 ${THEME.cardBg} ${THEME.cardBorder}`}>
                                        <AcademicCapIcon className={`w-7 h-7 ${THEME.capsuleIconFill}`} />
                                        <div>
                                            <div className={`text-[9px] uppercase font-black tracking-widest ${THEME.textMuted}`}>Graduação</div>
                                            <div className={`text-xs sm:text-sm font-bold uppercase ${THEME.textStrong}`}>Engenharia de Software</div>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="relative flex flex-col items-start mt-4">
                                    <div className={`flex flex-col gap-4 mt-2 ml-12 sm:ml-16 relative z-10 border-l-[2px] pl-6 py-4 border-pink-300/50 dark:border-pink-500/30`}>
                                        {DEFAULT_SKILLS.map((skill) => (
                                            <SkillDrawer key={skill.id} skill={skill} isOpen={activeSkill === skill.id} onToggle={() => setActiveSkill(activeSkill === skill.id ? null : skill.id)} />
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* --- LADO DIREITO: PROJETOS (APPLE LIQUID GLASS) --- */}
                    <div className="lg:col-span-7 flex flex-col justify-center items-center z-30 w-full h-full lg:mt-12">
                        <div className={`w-full p-6 sm:p-8 rounded-[40px] flex flex-col gap-6 ${THEME.panelWrapper}`}>
                            <div className="flex items-center gap-3 mb-2 px-2">
                                <CodeBracketIcon className={`w-8 h-8 ${THEME.textHighlight}`} />
                                <h2 className={`text-xl sm:text-2xl font-black uppercase tracking-widest ${THEME.textHighlight}`}>Meus Projetos</h2>
                            </div>

                            {projects.map((proj) => (
                                <div key={proj.id} className={`relative overflow-hidden transition-all duration-300 border p-5 rounded-3xl backdrop-blur-2xl bg-white/40 dark:bg-pink-900/20 hover:bg-white/60 dark:hover:bg-pink-800/30 hover:shadow-xl group ${THEME.cardBorder}`}>
                                    {editingId === proj.id ? (
                                        <div className="flex flex-col gap-3">
                                            <input 
                                                type="text" 
                                                value={editForm.title} 
                                                onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                                                className="w-full bg-white/50 dark:bg-black/20 border border-pink-300 dark:border-pink-500/50 rounded-xl px-3 py-2 text-sm text-pink-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                                                placeholder="Título do Projeto"
                                            />
                                            <input 
                                                type="text" 
                                                value={editForm.link} 
                                                onChange={(e) => setEditForm({...editForm, link: e.target.value})}
                                                className="w-full bg-white/50 dark:bg-black/20 border border-pink-300 dark:border-pink-500/50 rounded-xl px-3 py-2 text-xs text-pink-700 dark:text-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                                                placeholder="Link do GitHub"
                                            />
                                            <button onClick={() => handleEditSave(proj.id)} className="self-end bg-rose-500 hover:bg-rose-400 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1 shadow-md transition-all">
                                                <CheckIcon className="w-4 h-4" /> Salvar
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col gap-1">
                                                <h3 className={`text-base sm:text-lg font-bold ${THEME.textStrong}`}>{proj.title}</h3>
                                                <a href={proj.link} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-rose-500 dark:text-pink-400 hover:underline break-all pr-4">
                                                    <LinkIcon className="w-3 h-3 shrink-0" />
                                                    {proj.link.replace('https://', '')}
                                                </a>
                                            </div>
                                            <button onClick={() => handleEditStart(proj)} className="p-2 shrink-0 rounded-full bg-white/50 dark:bg-pink-900/40 text-pink-500 hover:bg-pink-100 dark:hover:bg-pink-800 transition-colors opacity-100 sm:opacity-0 group-hover:opacity-100 shadow-sm">
                                                <PencilIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- RODAPÉ: CARROSSEL DE TECNOLOGIAS --- */}
                <TechStackMarquee />
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(244, 114, 182, 0.4); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(244, 114, 182, 0.7); }
            `}</style>
        </div>
    );
}