import Link from "next/link";
import { stats } from "@/lib/data";

export default function AboutPage() {
  return (
    <div className="bg-museum-bg min-h-screen pt-24">
      <section className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10 pb-24">
        <nav className="text-xs text-white/30 tracking-wide mb-10">
          <Link href="/" className="hover:text-museum-gold transition-colors">Home</Link>
          <span className="mx-2 text-white/10">/</span>
          <span className="text-white/60">About</span>
        </nav>

        <p className="text-[0.65rem] tracking-[0.4em] uppercase text-museum-gold/60 mb-4">
          About
        </p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white font-light mb-2">
          About This Museum
        </h1>
        <p className="text-white/30 mb-14">关于本博物馆</p>

        <div className="space-y-16 text-white/70">
          {/* Our Mission */}
          <div>
            <h2 className="font-display text-2xl text-white/90 mb-4">Our Mission</h2>
            <p className="leading-relaxed text-lg">
              The Women in Tech Museum is a digital exhibition dedicated to
              illuminating the extraordinary contributions of women in science,
              technology, engineering, and mathematics throughout history.
            </p>
            <p className="leading-relaxed text-lg mt-4">
              From Hypatia of ancient Alexandria to the AI researchers of today,
              the museum presents a curated collection of {stats.pioneerCount} pioneers across {stats.fieldCount}
              {" "}fields whose ideas, discoveries, and inventions have shaped the
              technological world we inhabit.
            </p>
            <p className="leading-relaxed text-lg mt-4">
              This project is conceived as a living archive&mdash;a growing record
              of women whose work has advanced knowledge, transformed industries,
              and expanded the boundaries of possibility.
            </p>
            <p className="leading-relaxed text-white/35 mt-6">
              女性理工先驱博物馆是一个数字展览，致力于展现女性在科学、技术、工程与数学领域中的非凡贡献。
            </p>
            <p className="leading-relaxed text-white/35 mt-4">
              从古代亚历山大的希帕提娅（Hypatia）到当代 AI 研究者，本馆收录了
              {stats.fieldCount} 个领域中的 {stats.pioneerCount} 位科技先驱。她们的思想、发现与发明共同塑造了今天的技术世界。
            </p>
            <p className="leading-relaxed text-white/35 mt-4">
              本项目被构想为一个不断生长的数字档案（Living Archive），持续记录那些推动知识进步、改变产业格局并拓展人类可能性的女性。
            </p>
          </div>

          <div className="divider opacity-30" />

          {/* Why This Matters */}
          <div>
            <h2 className="font-display text-2xl text-white/90 mb-4">Why This Matters</h2>
            <p className="leading-relaxed text-lg">
              Throughout history, the contributions of women in science and
              technology have often been overlooked, minimized, or attributed to
              male colleagues.
            </p>
            <p className="leading-relaxed text-lg mt-4">
              This phenomenon&mdash;known as the Matilda Effect, first described
              by historian of science Margaret Rossiter (1993)&mdash;has resulted
              in the systematic under-recognition of women scientists and
              innovators.
            </p>
            <p className="leading-relaxed text-lg mt-4">
              The Women in Tech Museum exists to help restore these stories to the
              historical record, offering visibility to voices and achievements
              that have too often remained unseen.
            </p>
            <p className="leading-relaxed text-white/35 mt-6">
              纵观历史，女性在科技领域的贡献常常被忽视、弱化，甚至被归功于男性同事。
            </p>
            <p className="leading-relaxed text-white/35 mt-4">
              这种现象被称为玛蒂尔达效应（Matilda Effect）&mdash;&mdash;由科学史学家
              Margaret Rossiter 于 1993 年提出&mdash;&mdash;指的是女性科学家系统性地被低估与忽视。
            </p>
            <p className="leading-relaxed text-white/35 mt-4">
              女性理工先驱博物馆希望通过整理与呈现这些历史，让那些长期被忽略的贡献重新被看见。
            </p>
          </div>

          <div className="divider opacity-30" />

          {/* Content & Sources */}
          <div>
            <h2 className="font-display text-2xl text-white/90 mb-4">Content &amp; Sources</h2>
            <p className="leading-relaxed text-lg">
              All biographical texts in this museum are originally written based on
              historical research and publicly available academic sources.
            </p>
            <p className="leading-relaxed text-lg mt-4">
              Each pioneer page includes a References &amp; Citations section
              listing key sources consulted during the writing process.
            </p>
            <p className="leading-relaxed text-lg mt-4">
              We strive for historical accuracy and welcome corrections or
              additional information from researchers and readers.
            </p>
            <p className="leading-relaxed text-white/35 mt-6">
              人物传记内容均为原创撰写，基于历史研究及公开学术资料整理而成。
            </p>
            <p className="leading-relaxed text-white/35 mt-4">
              每位先驱页面均附有参考文献与引用来源。
            </p>
            <p className="leading-relaxed text-white/35 mt-4">
              我们力求历史准确性，也欢迎研究者与读者提出补充与勘误。
            </p>
          </div>

          <div className="divider opacity-30" />

          {/* Images & Credits */}
          <div>
            <h2 className="font-display text-2xl text-white/90 mb-4">Images &amp; Credits</h2>
            <p className="leading-relaxed text-lg">
              Portrait images are primarily sourced from the public domain or used
              under Creative Commons licenses, with most images obtained through
              Wikimedia Commons.
            </p>
            <p className="leading-relaxed text-lg mt-4">
              Image credits and licensing information are provided on each
              individual page.
            </p>
            <p className="leading-relaxed text-white/35 mt-6">
              人物肖像主要来自公共领域或 Creative Commons 授权资源，主要来源为
              Wikimedia Commons。
            </p>
            <p className="leading-relaxed text-white/35 mt-4">
              所有图片均在对应页面标注来源与授权信息。
            </p>
          </div>

          <div className="divider opacity-30" />

          {/* Curatorial Note */}
          <div>
            <h2 className="font-display text-2xl text-white/90 mb-4">Curatorial Note</h2>
            <p className="leading-relaxed text-lg">
              This museum was initiated by Z-Heronix, a community dedicated to
              advancing women&apos;s participation and leadership in technology.
            </p>
            <p className="leading-relaxed text-lg mt-4">
              The collection will continue to expand as new figures, stories, and
              research are added. We envision this project as an open, evolving
              archive documenting the history&mdash;and future&mdash;of women in
              technology.
            </p>
            <p className="leading-relaxed text-white/35 mt-6">
              本博物馆由 Z-Heronix 发起创建。
            </p>
            <p className="leading-relaxed text-white/35 mt-4">
              Z-Heronix 是一个致力于推动女性参与科技创造与技术领导力的社区。
            </p>
            <p className="leading-relaxed text-white/35 mt-4">
              博物馆将持续更新与扩展，逐步收录更多人物与历史。我们希望将其建设为一个持续演化的开放档案，记录女性在科技历史与未来中的角色。
            </p>
          </div>

          <div className="divider opacity-30" />

          {/* Contribute / Contact */}
          <div>
            <h2 className="font-display text-2xl text-white/90 mb-4">Contribute / Contact</h2>
            <p className="leading-relaxed text-lg">
              We welcome submissions, research collaboration, partnerships, and
              corrections.
            </p>
            <p className="leading-relaxed text-lg mt-4">
              If you would like to suggest pioneers, contribute research materials,
              collaborate on the project, or report inaccuracies, please contact:
            </p>
            <p className="mt-6">
              <span className="text-sm tracking-[0.15em] uppercase text-white/40">Email</span>
              <br />
              <a
                href="mailto:Amarisher@outlook.com"
                className="font-display text-lg text-museum-gold/80 hover:text-museum-gold transition-colors"
              >
                Amarisher@outlook.com
              </a>
            </p>
            <p className="leading-relaxed text-white/35 mt-8">
              我们欢迎人物投稿、研究合作、机构合作与错误指正。
            </p>
            <p className="leading-relaxed text-white/35 mt-4">
              如果您希望推荐人物、提供研究资料、参与合作或指出内容问题，请联系：
            </p>
            <p className="text-white/35 mt-4">
              <span className="text-sm tracking-[0.15em] uppercase text-white/25">邮箱</span>
              <br />
              <a
                href="mailto:Amarisher@outlook.com"
                className="text-museum-gold/60 hover:text-museum-gold transition-colors"
              >
                Amarisher@outlook.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
