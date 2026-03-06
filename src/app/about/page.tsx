import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-museum-ivory min-h-screen pt-24">
      <section className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10 pb-24">
        <nav className="text-xs text-museum-stone tracking-wide mb-10">
          <Link href="/" className="hover:text-museum-gold transition-colors">Home</Link>
          <span className="mx-2 text-museum-line">/</span>
          <span className="text-museum-ink">About</span>
        </nav>

        <p className="text-xs tracking-[0.3em] uppercase text-museum-gold mb-3">
          About
        </p>
        <h1 className="font-display text-4xl sm:text-5xl text-museum-ink mb-2">
          About This Museum
        </h1>
        <p className="text-museum-slate mb-14">关于本博物馆</p>

        <div className="space-y-16 text-museum-ink">
          <div>
            <h2 className="font-display text-2xl mb-4">Our Mission</h2>
            <p className="leading-relaxed text-lg">
              The Women in Tech Museum is a digital exhibition dedicated to
              illuminating the extraordinary contributions of women in science,
              technology, engineering, and mathematics throughout history. From
              Hypatia of ancient Alexandria to the AI researchers of today, we
              celebrate 111 pioneers across 10 fields whose brilliance has
              shaped our world.
            </p>
            <p className="leading-relaxed text-museum-slate mt-4">
              女性理工先驱博物馆是一个致力于展现女性在科学、技术、工程和数学领域非凡贡献的数字展览。从古代亚历山大的希帕提娅到今天的AI研究者，我们颂扬横跨10个领域的111位先驱&mdash;&mdash;她们的才华塑造了我们的世界。
            </p>
          </div>

          <div className="divider" />

          <div>
            <h2 className="font-display text-2xl mb-4">Why This Matters</h2>
            <p className="leading-relaxed text-lg">
              Throughout history, women&apos;s contributions to science and
              technology have been systematically overlooked, minimized, or
              credited to male colleagues. The Matilda Effect&mdash;the
              systematic under-recognition of women scientists, first described
              by Margaret Rossiter in 1993&mdash;has erased countless
              achievements from our collective memory. This museum exists to
              restore these stories to their rightful place in history.
            </p>
            <p className="leading-relaxed text-museum-slate mt-4">
              纵观历史，女性对科学和技术的贡献一直被系统性地忽视、弱化或归功于男性同事。玛蒂尔达效应&mdash;&mdash;由Margaret Rossiter于1993年首次描述的对女性科学家的系统性低估&mdash;&mdash;已经从我们的集体记忆中抹去了无数成就。这座博物馆的存在，就是为了将这些故事恢复到历史中应有的位置。
            </p>
          </div>

          <div className="divider" />

          <div>
            <h2 className="font-display text-2xl mb-4">Content &amp; Images</h2>
            <p className="leading-relaxed">
              All biographical content in this museum is original, written based
              on historical research and publicly available academic sources. Each
              pioneer&apos;s page includes a References &amp; Citations section
              with specific sources used. We strive for accuracy and welcome
              corrections.
            </p>
            <p className="leading-relaxed text-museum-slate mt-4">
              本博物馆所有传记内容均为原创，基于历史研究和公开学术资料撰写。每位先驱的页面均包含参考文献与引用来源。我们力求准确，欢迎指正。
            </p>
            <p className="leading-relaxed mt-4">
              Portrait images are sourced from the public domain or used under
              Creative Commons licenses, primarily from Wikimedia Commons. Image
              credits are provided on each individual page.
            </p>
          </div>

          <div className="divider" />

          <div>
            <h2 className="font-display text-2xl mb-4">Key References</h2>
            <ul className="space-y-3 text-sm text-museum-slate">
              {[
                "Wikipedia and Wikimedia Commons — primary open-source encyclopedia and media",
                "Nobel Prize Organization — nobelprize.org — biographical data for laureates",
                "NASA History Archives — biographical data for astronauts and space scientists",
                "ACM Turing Award — amturing.acm.org — computing award biographies",
                "Shetterly, Margot Lee. Hidden Figures. William Morrow, 2016.",
                "Kleiman, Kathy. Proving Ground: The Untold Story of the Six Women Who Programmed the World's First Modern Computer. Grand Central, 2022.",
                "Sobel, Dava. The Glass Universe. Viking, 2016.",
                "Keller, Evelyn Fox. A Feeling for the Organism: The Life and Work of Barbara McClintock. W.H. Freeman, 1983.",
                "Maddox, Brenda. Rosalind Franklin: The Dark Lady of DNA. HarperCollins, 2002.",
                "Toole, Betty A. Ada, the Enchantress of Numbers. Strawberry Press, 1998.",
                "Beyer, Kurt W. Grace Hopper and the Invention of the Information Age. MIT Press, 2009.",
                "Centre for Computing History, Cambridge, UK — computinghistory.org.uk",
                "IEEE Annals of the History of Computing",
                "University of Alabama — '4000 Years of Women in Science'",
                "Rossiter, Margaret. 'The Matthew Matilda Effect in Science.' Social Studies of Science, 1993.",
              ].map((ref, i) => (
                <li key={i} className="pl-4 border-l border-museum-line">
                  {ref}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-museum-cream rounded-sm p-10 text-center">
            <blockquote className="font-display text-xl text-museum-ink italic leading-relaxed">
              &ldquo;Computing is too important to be left to men.&rdquo;
            </blockquote>
            <p className="text-sm text-museum-stone mt-3">
              &mdash; Karen Sp&auml;rck Jones, 2002
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
