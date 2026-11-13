import React, { useState } from 'react';
import { 
  Instagram, 
  Youtube, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Heart, 
  MessageCircle, 
  Share2, 
  Check, 
  Sparkles, 
  ExternalLink,
  Flame,
  Award
} from 'lucide-react';

interface SocialPost {
  id: string;
  handle: string;
  avatar: string;
  location: string;
  imagePlaceholder: string;
  caption: string;
  tags: string[];
  likes: number;
  comments: number;
  flavourTag: string;
  verified?: boolean;
}

const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'post-1',
    handle: '@canteen_chronicles',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    location: 'North Campus Hub, Delhi',
    imagePlaceholder: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80',
    caption: 'Tuck shop just restocked Gujarat Khatta Meetha! The balance of sweet jaggery and savoury chaat spices is unreal. Clean fingers grabber saved my class notes. 💛🥔',
    tags: ['#ChipasCrunch', '#HostelLife', '#GujaratKhattaMeetha', '#ZeroPalmOil'],
    likes: 842,
    comments: 54,
    flavourTag: 'Gujarat Khatta Meetha',
    verified: true
  },
  {
    id: 'post-2',
    handle: '@gamingsamurai_in',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    location: 'Streamer Den, Bengaluru',
    imagePlaceholder: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    caption: 'No more oily thumbsticks during ranked matches. Pulled the corner grabber, pinched the chip, won the clutch. Tangy Tomato Masala on repeat! 🔥🎮',
    tags: ['#GamerSnack', '#CleanGrabber', '#ChipasGaming', '#HighProtein'],
    likes: 1290,
    comments: 89,
    flavourTag: 'Tangy Tomato Masala',
    verified: true
  },
  {
    id: 'post-3',
    handle: '@taste_of_bengal',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    location: 'Park Street, Kolkata',
    imagePlaceholder: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80',
    caption: 'Finally a chips brand that respects authentic Kasundi mustard punch! That sharp nasal kick is 10/10 true to Kolkata street food culture.',
    tags: ['#KasundiMustard', '#DesiFlavours', '#ChipasFam', '#CrunchClub'],
    likes: 967,
    comments: 63,
    flavourTag: 'Bengal Kasundi Mustard'
  },
  {
    id: 'post-4',
    handle: '@fitness_snacker',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
    location: 'Gym Cafe, Mumbai',
    imagePlaceholder: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    caption: 'Zero palm oil, honest grams right on the front, and 2g protein per serving without tasting like cardboard. Classic Salted hits the post-workout spot.',
    tags: ['#SnackClean', '#GramsUpFront', '#NoPalmOil', '#RealPotatoes'],
    likes: 1104,
    comments: 42,
    flavourTag: 'Classic Salted',
    verified: true
  }
];

export const SocialCommunityFeed: React.FC = () => {
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [copiedLink, setCopiedLink] = useState(false);

  const handleLike = (id: string, initialLikes: number) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] ?? initialLikes) + 1
    }));
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header and Social Links Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E8DEC8] pb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#8B1E29] mb-1">
            <Instagram className="w-4 h-4 text-[#8B1E29]" />
            <span>Community & Socials</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-700">#ChipasCrunch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
            Loved on campus. Snapped everywhere.
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-xl">
            Join thousands of snackers sharing their clean-grab moments, study sessions, and spicy challenges. Tag <span className="font-bold text-[#8B1E29]">@chipas.in</span> to get featured!
          </p>
        </div>

        {/* Official Social Media Channels */}
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-bold text-xs shadow-sm hover:opacity-90 transition-opacity"
            title="Follow on Instagram"
          >
            <Instagram className="w-4 h-4" />
            <span>@chipas.in</span>
          </a>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-600 text-white font-bold text-xs shadow-sm hover:bg-red-700 transition-colors"
            title="Subscribe on YouTube"
          >
            <Youtube className="w-4 h-4" />
            <span>Chipas TV</span>
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
            title="Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl bg-black text-white hover:bg-slate-800 transition-colors shadow-sm"
            title="X / Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl bg-sky-700 text-white hover:bg-sky-800 transition-colors shadow-sm"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#E0D4BD] text-xs font-bold text-slate-800 hover:bg-[#FBBF24] hover:text-slate-950 transition-colors cursor-pointer"
            title="Share page"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Social Grid (Instagram/UGC Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SOCIAL_POSTS.map((post) => {
          const currentLikes = likes[post.id] ?? post.likes;
          const isLiked = likes[post.id] !== undefined;

          return (
            <div
              key={post.id}
              className="bg-white rounded-2xl border-2 border-[#EADFCB] hover:border-[#8B1E29] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Post Header */}
              <div className="p-3.5 flex items-center justify-between border-b border-slate-100 bg-[#FAF8F5]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={post.avatar}
                    alt={post.handle}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-[#FBBF24]"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-900 truncate">
                      <span>{post.handle}</span>
                      {post.verified && (
                        <span className="w-3.5 h-3.5 bg-[#8B1E29] text-white rounded-full flex items-center justify-center text-[9px] font-black">
                          ✓
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 truncate block">
                      {post.location}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-black bg-[#FBBF24] text-slate-950 px-2 py-0.5 rounded-full uppercase shrink-0">
                  {post.flavourTag.split(' ')[0]}
                </span>
              </div>

              {/* Photo Showcase */}
              <div className="relative aspect-square overflow-hidden bg-slate-900">
                <img
                  src={post.imagePlaceholder}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 text-white">
                  <span className="text-xs font-bold text-amber-200">
                    Tagged @chipas.in
                  </span>
                </div>
              </div>

              {/* Engagement Bar */}
              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleLike(post.id, post.likes)}
                        className={`flex items-center gap-1 font-bold cursor-pointer transition-colors ${
                          isLiked ? 'text-rose-600' : 'text-slate-700 hover:text-rose-600'
                        }`}
                        aria-label="Like post"
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-600' : ''}`} />
                        <span>{currentLikes.toLocaleString()}</span>
                      </button>

                      <span className="flex items-center gap-1 text-slate-600 font-semibold">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </span>
                    </div>

                    <span className="text-[10px] text-slate-400 font-bold uppercase">
                      Verified Snacker
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 line-clamp-3 leading-relaxed">
                    <strong className="text-slate-900 mr-1.5">{post.handle}</strong>
                    {post.caption}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {post.tags.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="text-[10px] font-bold text-[#8B1E29]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                  <span>Snack: {post.flavourTag}</span>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#8B1E29] hover:underline flex items-center gap-0.5"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* UGC Call to Action Banner */}
      <div className="bg-[#FAF7F0] p-6 rounded-2xl border-2 border-[#E7DECB] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h4 className="text-base font-bold text-slate-900 font-display">
              Want a free carton of Chippas for your dorm or office?
            </h4>
          </div>
          <p className="text-xs text-slate-600">
            Post an Instagram Reel showing how you use the patented corner grabber. Tag <strong className="text-[#8B1E29]">#ChipasCleanGrab</strong> to enter our weekly ₹5,000 snack stash giveaway!
          </p>
        </div>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-2.5 rounded-xl bg-[#8B1E29] hover:bg-[#A51C28] text-[#FBBF24] font-black text-xs uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer flex items-center gap-2"
        >
          <Instagram className="w-4 h-4" />
          <span>Tag Us on Instagram</span>
        </a>
      </div>
    </section>
  );
};
