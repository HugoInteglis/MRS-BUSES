import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogData';
import { BlogPost } from '../types';
import { WHATSAPP_RAW } from '../data/transportData';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  CheckCircle2,
  MessageCircle,
  Code2,
  ChevronDown,
  ChevronUp,
  Tag,
  Bus,
  Sparkles,
  Search,
  ThumbsUp,
  Send,
} from 'lucide-react';

interface BlogSubpageProps {
  initialSlug?: string | null;
  onNavigateHome: () => void;
  onNavigateQuote: (busName?: string) => void;
}

export const BlogSubpage: React.FC<BlogSubpageProps> = ({
  initialSlug,
  onNavigateHome,
  onNavigateQuote,
}) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(() => {
    if (initialSlug) {
      return BLOG_POSTS.find((p) => p.slug === initialSlug) || BLOG_POSTS[0];
    }
    return BLOG_POSTS[0]; // Default to first post if viewed as blog main
  });

  const [showSeoConfig, setShowSeoConfig] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [votedTopicId, setVotedTopicId] = useState<string | null>(null);
  const [votedTopicTitle, setVotedTopicTitle] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  const filteredPosts = BLOG_POSTS.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVote = (topicId: string, topicTitle: string) => {
    setVotedTopicId(topicId);
    setVotedTopicTitle(topicTitle);
  };

  const handleSendVoteWhatsApp = () => {
    if (!votedTopicTitle) return;
    const text = `Hola MRS BUSES, acabo de leer su blog sobre transporte de personal y me gustaría votar para que redacten el tema: "${votedTopicTitle}"`;
    window.open(
      `https://api.whatsapp.com/send?phone=${WHATSAPP_RAW}&text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Breadcrumb Navigation & Top Action */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <button
              onClick={onNavigateHome}
              className="hover:text-amber-400 font-bold transition-colors"
            >
              Inicio
            </button>
            <span>/</span>
            <span className="text-amber-400 font-extrabold">Blog & Noticias</span>
            {selectedPost && (
              <>
                <span>/</span>
                <span className="text-neutral-300 font-medium truncate max-w-[200px] sm:max-w-xs">
                  {selectedPost.title}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-amber-400 hover:text-white px-4 py-2 rounded-xl text-xs font-black border border-neutral-800 transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Inicio</span>
            </button>
          </div>
        </div>

        {/* If viewing a single post */}
        {selectedPost ? (
          <article className="space-y-8 animate-fade-in">
            
            {/* ARTICLE HEADER & HERO */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="bg-amber-400 text-slate-950 font-black px-3 py-1 rounded-full text-xs uppercase tracking-wider shadow-md">
                  {selectedPost.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-neutral-400 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{selectedPost.readTime}</span>
                </span>
                <span className="flex items-center gap-1 text-xs text-neutral-400 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{selectedPost.date}</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                {selectedPost.title}
              </h1>

              <div className="flex items-center justify-between border-y border-neutral-800 py-3 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-400" />
                  <span>Por <strong className="text-white">{selectedPost.author}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 px-3 py-1.5 rounded-lg border border-neutral-800 transition-all text-xs font-bold cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>{copiedLink ? '¡Enlace Copiado!' : 'Compartir'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* COLLAPSIBLE SEO CONFIGURATION BOX (FOR WEB MASTERS / SEO CONFIG) */}
            <div className="bg-neutral-900/90 border-2 border-amber-400/40 rounded-2xl overflow-hidden shadow-2xl">
              <button
                onClick={() => setShowSeoConfig(!showSeoConfig)}
                className="w-full p-4 flex items-center justify-between bg-neutral-900 hover:bg-neutral-850 transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <Code2 className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <h3 className="text-sm font-black text-amber-400 uppercase tracking-wide">
                      Datos SEO para configurar en tu web
                    </h3>
                    <p className="text-[11px] text-neutral-400 font-medium">
                      Configuración técnica de metadatos (Title, Description, Slug, Keywords).
                    </p>
                  </div>
                </div>
                {showSeoConfig ? (
                  <ChevronUp className="w-5 h-5 text-amber-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-amber-400" />
                )}
              </button>

              {showSeoConfig && (
                <div className="p-4 sm:p-6 border-t border-neutral-800 space-y-3 bg-neutral-950/80 text-xs text-neutral-300 font-mono leading-relaxed">
                  <div>
                    <strong className="text-amber-400 block font-sans text-xs">URL (Slug):</strong>
                    <code className="text-emerald-400 bg-neutral-900 px-2 py-1 rounded block mt-1 break-all">
                      mrsbus.com/{selectedPost.slug}
                    </code>
                  </div>

                  <div>
                    <strong className="text-amber-400 block font-sans text-xs">Meta Título (Title Tag):</strong>
                    <div className="text-white bg-neutral-900 px-2.5 py-1.5 rounded mt-1 font-sans font-bold border border-neutral-800">
                      {selectedPost.metaTitle}
                    </div>
                  </div>

                  <div>
                    <strong className="text-amber-400 block font-sans text-xs">Meta Descripción:</strong>
                    <div className="text-neutral-300 bg-neutral-900 px-2.5 py-1.5 rounded mt-1 font-sans border border-neutral-800">
                      {selectedPost.metaDescription}
                    </div>
                  </div>

                  <div>
                    <strong className="text-amber-400 block font-sans text-xs">Palabras Clave Principales Atacadas:</strong>
                    <div className="flex flex-wrap gap-1.5 mt-1 font-sans">
                      {selectedPost.keywords.map((kw, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 bg-amber-400/10 text-amber-400 border border-amber-400/30 px-2.5 py-0.5 rounded-md text-[11px] font-semibold"
                        >
                          <Tag className="w-3 h-3" />
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* FEATURED IMAGE */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-neutral-800 shadow-2xl bg-neutral-900 max-h-[480px]">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200';
                }}
                className="w-full h-full object-cover max-h-[480px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
            </div>

            {/* ARTICLE CONTENT */}
            <div className="prose prose-invert max-w-none space-y-8 text-neutral-200 text-sm sm:text-base leading-relaxed">
              {/* INTRO */}
              <div className="bg-neutral-900/60 p-6 sm:p-8 rounded-3xl border border-neutral-800 space-y-4">
                <p className="text-neutral-200 font-medium text-base sm:text-lg leading-relaxed whitespace-pre-line">
                  {selectedPost.content.intro}
                </p>
              </div>

              {/* SECTIONS */}
              {selectedPost.content.sections.map((section, idx) => (
                <div key={idx} className="space-y-5 pt-4">
                  <h2 className="text-xl sm:text-3xl font-black text-amber-400 tracking-tight flex items-center gap-2 border-b border-neutral-800 pb-3">
                    <Sparkles className="w-6 h-6 text-amber-400 shrink-0" />
                    <span>{section.h2}</span>
                  </h2>

                  {section.paragraphs &&
                    section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-neutral-300 font-normal leading-relaxed">
                        {p}
                      </p>
                    ))}

                  {/* Bullet Points */}
                  {section.bulletPoints && (
                    <div className="space-y-4 pl-1 sm:pl-2">
                      {section.bulletPoints.map((bp, bpIdx) => (
                        <div
                          key={bpIdx}
                          className="flex items-start gap-3 bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800 hover:border-amber-400/40 transition-colors"
                        >
                          <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-white font-extrabold text-base block mb-1">
                              {bp.bold}
                            </strong>
                            <p className="text-neutral-300 text-sm leading-relaxed">{bp.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Table Comparison */}
                  {section.table && (
                    <div className="my-6 overflow-x-auto rounded-2xl border-2 border-amber-400/30 shadow-2xl bg-neutral-900">
                      <table className="w-full text-left text-xs sm:text-sm border-collapse">
                        <thead>
                          <tr className="bg-amber-400 text-slate-950 font-black border-b border-amber-500 uppercase tracking-wider text-xs">
                            {section.table.headers.map((head, hIdx) => (
                              <th key={hIdx} className="p-3.5 sm:p-4">
                                {head}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800 text-neutral-200">
                          {section.table.rows.map((row, rIdx) => (
                            <tr
                              key={rIdx}
                              className="hover:bg-neutral-800/60 transition-colors font-medium"
                            >
                              <td className="p-3.5 sm:p-4 font-bold text-amber-400 whitespace-nowrap">
                                {row[0]}
                              </td>
                              <td className="p-3.5 sm:p-4 text-white font-semibold whitespace-nowrap">
                                {row[1]}
                              </td>
                              <td className="p-3.5 sm:p-4 text-neutral-300 min-w-[220px]">
                                {row[2]}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}

              {/* CONCLUSION & DIRECT CTA CARD */}
              <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-amber-950/40 border-2 border-amber-400 rounded-3xl p-6 sm:p-10 space-y-6 text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-bl-full pointer-events-none" />

                <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 font-black px-4 py-1.5 rounded-full text-xs uppercase tracking-wider shadow-lg">
                  <Bus className="w-4 h-4" />
                  <span>MRS Buses - Tu Aliado de Confianza</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {selectedPost.content.conclusionHeading}
                </h3>

                {selectedPost.content.conclusionParagraphs?.map((cp, cpIdx) => (
                  <p key={cpIdx} className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                    {cp}
                  </p>
                ))}

                <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href={`https://api.whatsapp.com/send?phone=${WHATSAPP_RAW}&text=${encodeURIComponent(
                      'Hola MRS BUSES, leí el artículo sobre "5 Beneficios del transporte de personal en Guatemala" y me gustaría cotizar una ruta para mi empresa.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3.5 rounded-2xl text-sm transition-all shadow-xl hover:scale-105 cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                    <span>Cotizar Ruta Corporativa por WhatsApp</span>
                  </a>

                  <button
                    onClick={() => onNavigateQuote('Buses tipo Coaster / County 24 a 28')}
                    className="inline-flex items-center gap-2 bg-amber-400 hover:bg-yellow-300 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-sm transition-all shadow-xl hover:scale-105 cursor-pointer"
                  >
                    <span>Llenar Formulario Web</span>
                  </button>
                </div>
              </div>

              {/* INTERACTIVE POLL FOR ARTICLE #2 */}
              {selectedPost.content.pollOptions && (
                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-amber-400/10 text-amber-400 rounded-2xl border border-amber-400/30">
                      <ThumbsUp className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-white">
                        ¿Qué tema te gustaría leer en nuestro próximo artículo?
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Vota por tu preferencia y ayúdanos a elegir la siguiente publicación:
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {selectedPost.content.pollOptions.map((option) => {
                      const isVoted = votedTopicId === option.id;
                      return (
                        <div
                          key={option.id}
                          onClick={() => handleVote(option.id, option.title)}
                          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                            isVoted
                              ? 'bg-amber-400/10 border-amber-400 text-white'
                              : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700 text-neutral-300'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="bg-amber-400 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded-md uppercase">
                                {option.badge}
                              </span>
                            </div>
                            <p className="font-bold text-sm sm:text-base text-white">
                              {option.title}
                            </p>
                            {option.description && (
                              <p className="text-xs text-neutral-400">{option.description}</p>
                            )}
                          </div>

                          <div className="shrink-0">
                            {isVoted ? (
                              <span className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-black px-3 py-1.5 rounded-xl text-xs">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>¡Votado!</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 bg-neutral-900 hover:bg-amber-400 hover:text-slate-950 text-neutral-300 font-bold px-3 py-1.5 rounded-xl text-xs border border-neutral-800 transition-colors">
                                Votar por este
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {votedTopicId && (
                    <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl text-center space-y-3 animate-fade-in">
                      <p className="text-xs sm:text-sm text-emerald-400 font-bold">
                        ¡Gracias por tu voto! Has seleccionado: "{votedTopicTitle}"
                      </p>
                      <button
                        onClick={handleSendVoteWhatsApp}
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Enviar voto directo por WhatsApp</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </article>
        ) : (
          /* BLOG LIST VIEW */
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <span className="bg-amber-400 text-slate-950 font-black px-4 py-1.5 rounded-full text-xs uppercase tracking-wider shadow-md">
                Publicaciones & Guías
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white">
                Blog MRS BUSES
              </h1>
              <p className="text-neutral-400 text-sm max-w-xl mx-auto">
                Consejos, guías y análisis sobre movilidad, transporte corporativo y soluciones de logística terrestre en Guatemala.
              </p>
            </div>

            {/* SEARCH FILTER */}
            <div className="max-w-md mx-auto relative">
              <Search className="w-5 h-5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* POSTS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="bg-neutral-900 border border-neutral-800 hover:border-amber-400 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    <div className="relative h-48 sm:h-56 overflow-hidden bg-neutral-950">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-amber-400 text-slate-950 font-extrabold px-3 py-1 rounded-full text-[11px] uppercase tracking-wider">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-xs text-neutral-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          {post.readTime}
                        </span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>

                      <h2 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-neutral-800/60 flex items-center justify-between text-xs font-bold text-amber-400">
                    <span>Leer Artículo Completo</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
