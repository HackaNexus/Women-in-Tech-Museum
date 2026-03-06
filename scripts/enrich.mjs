import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const pioneers = JSON.parse(readFileSync(join(root, 'src/data/pioneers.json'), 'utf-8'));
const fields = JSON.parse(readFileSync(join(root, 'src/data/fields.json'), 'utf-8'));

// ====================================================================
// 1. FACT CORRECTIONS
// ====================================================================
const corrections = {
  'hypatia': { born: 360 }, // Was -360 (BCE), but Hypatia was born c. 360 CE
};

// ====================================================================
// 2. NEW COMPUTER SCIENCE PIONEERS (10)
// ====================================================================
const newCSPioneers = [
  {
    id: 101,
    name: "Sophie Wilson",
    nameCn: "苏菲·威尔逊",
    slug: "sophie-wilson",
    field: "computer-science",
    born: 1957,
    died: null,
    nationality: "British",
    nationalityCn: "英国",
    tagline: "Architect of the ARM Instruction Set",
    taglineCn: "ARM指令集架构师",
    bio: "Sophie Wilson designed the instruction set for the ARM processor while working at Acorn Computers in the 1980s. The ARM architecture she created went on to become the most widely used processor design in the world, powering billions of smartphones, tablets, and embedded devices. She also designed the BBC Micro computer, which introduced a generation of British children to computing. Wilson was elected a Fellow of the Royal Society in 2019 and appointed CBE.",
    bioCn: "苏菲·威尔逊在1980年代于Acorn计算机公司工作期间设计了ARM处理器的指令集。她创造的ARM架构后来成为世界上使用最广泛的处理器设计，驱动着数十亿部智能手机、平板电脑和嵌入式设备。她还设计了BBC Micro计算机，将一代英国儿童引入了计算机世界。威尔逊于2019年当选皇家学会院士，并被授予CBE勋章。",
    achievements: [
      "Designed the ARM instruction set, used in billions of devices",
      "Created the BBC Micro computer",
      "Elected Fellow of the Royal Society (2019)"
    ],
    achievementsCn: [
      "设计了ARM指令集，用于数十亿设备",
      "创造了BBC Micro计算机",
      "当选皇家学会院士（2019年）"
    ],
    era: "20th Century",
    imageCredit: "Wikimedia Commons, CC BY-SA",
    featured: false,
    image: "",
    quote: "",
    quoteCn: "",
    quoteSource: "",
    references: [
      "Wikipedia: Sophie Wilson — https://en.wikipedia.org/wiki/Sophie_Wilson",
      "Royal Society Fellow profile — https://royalsociety.org/people/sophie-wilson-13316/",
      "Acorn Computers archive, Centre for Computing History"
    ]
  },
  {
    id: 102,
    name: "Dame Stephanie Shirley",
    nameCn: "斯蒂芬妮·雪莉女爵士",
    slug: "stephanie-shirley",
    field: "computer-science",
    born: 1933,
    died: null,
    nationality: "British",
    nationalityCn: "英国",
    tagline: "Software Industry Pioneer Who Signed Letters as 'Steve'",
    taglineCn: "以'Steve'署名的软件产业先驱",
    bio: "Born Vera Buchthal in Dortmund, Germany, Stephanie Shirley arrived in Britain as a Kindertransport child refugee in 1939. In 1962, she founded Freelance Programmers — a software company staffed almost entirely by women working from home, decades before remote work became mainstream. She adopted the name 'Steve' to combat the sexism that prevented her business letters from receiving replies. Her company, later renamed FI Group, grew to employ over 8,500 people and was valued at $3 billion. She has since donated over £67 million to charity, particularly for autism research.",
    bioCn: "斯蒂芬妮·雪莉原名维拉·布赫塔尔，出生于德国多特蒙德，1939年作为儿童运输计划的难民抵达英国。1962年，她创办了自由程序员公司——一家几乎全由女性在家办公的软件公司，比远程办公成为主流早了几十年。她采用'Steve'这个名字来对抗性别歧视，因为她以女性名字寄出的商业信函总是得不到回复。她的公司后来更名为FI Group，员工超过8,500人，市值达30亿美元。此后她已捐赠超过6,700万英镑用于慈善事业，特别是自闭症研究。",
    achievements: [
      "Founded Freelance Programmers (1962), pioneering remote work",
      "Built FI Group into a $3 billion company",
      "Donated over £67 million to charity"
    ],
    achievementsCn: [
      "创办自由程序员公司（1962年），开创远程工作模式",
      "将FI Group发展为价值30亿美元的公司",
      "捐赠超过6,700万英镑用于慈善"
    ],
    era: "20th Century",
    imageCredit: "Wikimedia Commons, CC BY-SA",
    featured: false,
    image: "",
    quote: "In those days, I had to use the name Steve to get past the door.",
    quoteCn: "在那个年代，我不得不用Steve这个名字才能敲开商业的大门。",
    quoteSource: "TED Talk, 2015",
    references: [
      "Wikipedia: Steve Shirley — https://en.wikipedia.org/wiki/Steve_Shirley",
      "Shirley, Stephanie. Let It Go: My Extraordinary Story. Penguin, 2012.",
      "TED Talk: Why do ambitious women have flat heads? 2015"
    ]
  },
  {
    id: 103,
    name: "Anita Borg",
    nameCn: "安妮塔·博格",
    slug: "anita-borg",
    field: "computer-science",
    born: 1949,
    died: 2003,
    nationality: "American",
    nationalityCn: "美国",
    tagline: "Founded the Grace Hopper Celebration of Women in Computing",
    taglineCn: "创办女性计算机大会Grace Hopper Celebration",
    bio: "Anita Borg was a computer scientist whose passion for increasing the representation of women in technology led her to create lasting institutions. In 1987, she founded Systers, the first electronic mailing list for women in computing, which grew to become a global network. In 1994, she co-founded the Grace Hopper Celebration of Women in Computing, now the world's largest gathering of women technologists. In 1997, she established the Institute for Women and Technology (now AnitaB.org). She received the Augusta Ada Lovelace Award and the EFF Pioneer Award before her death from brain cancer at 54.",
    bioCn: "安妮塔·博格是一位计算机科学家，她对增加女性在技术领域代表性的热情促使她创建了持久的机构。1987年，她创办了Systers——第一个面向计算机领域女性的电子邮件列表，发展成为一个全球网络。1994年，她联合创办了Grace Hopper女性计算机大会，现已成为全球最大的女性技术人员聚会。1997年，她创立了女性与技术研究所（现AnitaB.org）。她在54岁因脑癌去世前，获得了阿达·洛芙莱斯奖和EFF先驱奖。",
    achievements: [
      "Created Systers mailing list for women in computing (1987)",
      "Co-founded the Grace Hopper Celebration (1994)",
      "Founded the Institute for Women and Technology"
    ],
    achievementsCn: [
      "创建了女性计算机领域的Systers邮件列表（1987年）",
      "联合创办Grace Hopper Celebration（1994年）",
      "创立女性与技术研究所"
    ],
    era: "20th Century",
    imageCredit: "Wikimedia Commons, Public Domain",
    featured: false,
    image: "",
    quote: "",
    quoteCn: "",
    quoteSource: "",
    references: [
      "Wikipedia: Anita Borg — https://en.wikipedia.org/wiki/Anita_Borg",
      "AnitaB.org — https://anitab.org/about-us/",
      "Computing Research Association obituary, 2003"
    ]
  },
  {
    id: 104,
    name: "Joan Clarke",
    nameCn: "琼·克拉克",
    slug: "joan-clarke",
    field: "computer-science",
    born: 1917,
    died: 1996,
    nationality: "British",
    nationalityCn: "英国",
    tagline: "Bletchley Park Codebreaker Who Cracked Enigma",
    taglineCn: "布莱切利园密码破译者",
    bio: "Joan Clarke was a cryptanalyst at Bletchley Park during World War II, where she worked in Hut 8 on breaking German Naval Enigma codes alongside Alan Turing. She was the only woman in Hut 8 to be promoted to the senior role of linguist — a deliberately misleading title, as the civil service had no protocols for women in such positions. She used the Banburismus statistical technique to crack Enigma settings. After the war, she worked at GCHQ. Her story gained wider recognition through the 2014 film The Imitation Game, where she was portrayed by Keira Knightley.",
    bioCn: "琼·克拉克是二战期间布莱切利园的密码分析员，她在第8小屋与艾伦·图灵一起破解德国海军恩尼格玛密码。她是第8小屋中唯一被提升为高级'语言学家'的女性——这是一个故意误导的头衔，因为公务员系统没有女性担任此类职位的先例。她使用班布里斯姆斯统计技术破解恩尼格玛设置。战后，她在政府通信总部(GCHQ)工作。她的故事通过2014年电影《模仿游戏》获得了更广泛的认知。",
    achievements: [
      "Broke German Naval Enigma codes at Bletchley Park",
      "Only woman promoted to senior role in Hut 8",
      "Worked alongside Alan Turing on cryptanalysis"
    ],
    achievementsCn: [
      "在布莱切利园破解德国海军恩尼格玛密码",
      "第8小屋中唯一晋升高级职位的女性",
      "与艾伦·图灵一起从事密码分析工作"
    ],
    era: "20th Century",
    imageCredit: "Bletchley Park Trust, Historical",
    featured: false,
    image: "",
    quote: "",
    quoteCn: "",
    quoteSource: "",
    references: [
      "Wikipedia: Joan Clarke — https://en.wikipedia.org/wiki/Joan_Clarke",
      "Smith, Michael. The Debs of Bletchley Park. Aurum Press, 2015.",
      "Bletchley Park Trust archives"
    ]
  },
  {
    id: 105,
    name: "Susan Kare",
    nameCn: "苏珊·卡尔",
    slug: "susan-kare",
    field: "computer-science",
    born: 1954,
    died: null,
    nationality: "American",
    nationalityCn: "美国",
    tagline: "The Woman Who Gave the Macintosh a Smile",
    taglineCn: "赋予Macintosh微笑的女人",
    bio: "Susan Kare is the graphic designer who created the original icons, fonts, and interface elements for the Apple Macintosh in 1983. Working on a pixel grid, she crafted the Happy Mac startup icon, the command key symbol, the bomb error icon, and bitmap fonts like Chicago and Geneva that became integral to the Mac identity. Her work established the visual language of personal computing and influenced user interface design worldwide. She went on to design icons for Windows 3.0, IBM, and Facebook, and was inducted into the AIGA Medal hall of fame.",
    bioCn: "苏珊·卡尔是图形设计师，1983年为Apple Macintosh创造了原始图标、字体和界面元素。她在像素网格上精心设计了Happy Mac启动图标、command键符号、炸弹错误图标，以及Chicago和Geneva等位图字体，这些都成为Mac身份的核心组成部分。她的工作确立了个人计算的视觉语言，影响了全球的用户界面设计。她后来为Windows 3.0、IBM和Facebook设计了图标，并入选AIGA奖章名人堂。",
    achievements: [
      "Created the original Macintosh icons and fonts",
      "Designed the Happy Mac, command key symbol, and bomb error icon",
      "Established the visual language of personal computing"
    ],
    achievementsCn: [
      "创造了原始Macintosh图标和字体",
      "设计了Happy Mac、command键符号和炸弹错误图标",
      "确立了个人计算的视觉语言"
    ],
    era: "20th Century",
    imageCredit: "Wikimedia Commons, CC BY-SA",
    featured: false,
    image: "",
    quote: "",
    quoteCn: "",
    quoteSource: "",
    references: [
      "Wikipedia: Susan Kare — https://en.wikipedia.org/wiki/Susan_Kare",
      "kare.com — Susan Kare's portfolio",
      "Hertzfeld, Andy. Revolution in the Valley. O'Reilly, 2004."
    ]
  },
  {
    id: 106,
    name: "Carol Shaw",
    nameCn: "卡罗尔·肖",
    slug: "carol-shaw",
    field: "computer-science",
    born: 1955,
    died: null,
    nationality: "American",
    nationalityCn: "美国",
    tagline: "One of the First Female Video Game Designers",
    taglineCn: "最早的女性电子游戏设计师之一",
    bio: "Carol Shaw is recognized as one of the first female video game designers in the industry. After studying computer science and electrical engineering at UC Berkeley, she joined Atari in 1978, where she programmed games for the Atari 2600 including 3-D Tic-Tac-Toe. She later moved to Activision, where she created River Raid (1982), a critically acclaimed and commercially successful scrolling shooter that became one of the best-selling games of its era. River Raid was notable for its procedural level generation algorithm, a sophisticated technique for its time.",
    bioCn: "卡罗尔·肖被认为是电子游戏行业最早的女性游戏设计师之一。在加州大学伯克利分校学习计算机科学和电气工程后，她于1978年加入Atari，为Atari 2600编程游戏。她后来转到Activision，创作了《River Raid》（1982年），这款广受好评且商业成功的卷轴射击游戏成为那个时代最畅销的游戏之一。《River Raid》以其程序化关卡生成算法而著称，这在当时是一种先进的技术。",
    achievements: [
      "Created River Raid, a landmark video game (1982)",
      "One of the first women in the video game industry",
      "Pioneered procedural level generation"
    ],
    achievementsCn: [
      "创作了里程碑式电子游戏《River Raid》（1982年）",
      "电子游戏行业最早的女性之一",
      "开创了程序化关卡生成技术"
    ],
    era: "20th Century",
    imageCredit: "Historical",
    featured: false,
    image: "",
    quote: "",
    quoteCn: "",
    quoteSource: "",
    references: [
      "Wikipedia: Carol Shaw — https://en.wikipedia.org/wiki/Carol_Shaw",
      "Donovan, Tristan. Replay: The History of Video Games. Yellow Ant, 2010."
    ]
  },
  {
    id: 107,
    name: "Evelyn Berezin",
    nameCn: "伊芙琳·贝雷津",
    slug: "evelyn-berezin",
    field: "computer-science",
    born: 1925,
    died: 2018,
    nationality: "American",
    nationalityCn: "美国",
    tagline: "Creator of the First Computerized Word Processor",
    taglineCn: "第一台电脑化文字处理器的创造者",
    bio: "Evelyn Berezin was a computer engineer who built the first true computerized word processor. In 1969, she founded Redactron Corporation and designed the Data Secretary, a desk-sized machine that allowed users to edit, delete, and reformat text — capabilities taken for granted today but revolutionary at the time. Earlier in her career at Underwood Corporation and Teleregister, she helped design one of the first computer-based airline reservation systems for United Airlines. The New York Times called her 'the most important person in history that you've never heard of.'",
    bioCn: "伊芙琳·贝雷津是一位计算机工程师，创造了第一台真正的电脑化文字处理器。1969年，她创办了Redactron公司，设计了Data Secretary——一台桌子大小的机器，允许用户编辑、删除和重新格式化文本。这些功能在今天被视为理所当然，但在当时是革命性的。在她职业生涯早期，她在Teleregister公司帮助设计了联合航空公司最早的计算机订票系统之一。《纽约时报》称她为'你从未听说过的历史上最重要的人'。",
    achievements: [
      "Created the first computerized word processor (1969)",
      "Founded Redactron Corporation",
      "Helped design early airline reservation systems"
    ],
    achievementsCn: [
      "创造了第一台电脑化文字处理器（1969年）",
      "创办Redactron公司",
      "帮助设计了早期航空订票系统"
    ],
    era: "20th Century",
    imageCredit: "Historical",
    featured: false,
    image: "",
    quote: "",
    quoteCn: "",
    quoteSource: "",
    references: [
      "Wikipedia: Evelyn Berezin — https://en.wikipedia.org/wiki/Evelyn_Berezin",
      "The New York Times obituary, December 2018",
      "Computer History Museum: Evelyn Berezin"
    ]
  },
  {
    id: 108,
    name: "Dame Wendy Hall",
    nameCn: "温迪·霍尔女爵士",
    slug: "wendy-hall",
    field: "computer-science",
    born: 1952,
    died: null,
    nationality: "British",
    nationalityCn: "英国",
    tagline: "Pioneer of Web Science",
    taglineCn: "网络科学先驱",
    bio: "Dame Wendy Hall is a British computer scientist who pioneered work in multimedia and hypermedia. In the late 1980s, her Microcosm system at the University of Southampton explored open hypermedia linking — ideas that predated and paralleled the development of the World Wide Web. She co-founded the Web Science Research Initiative with Tim Berners-Lee, establishing Web Science as an interdisciplinary academic field. She has served as President of the ACM, the first person outside North America to hold the position, and was appointed Dame Commander of the Order of the British Empire.",
    bioCn: "温迪·霍尔女爵士是英国计算机科学家，在多媒体和超媒体领域做出了开创性工作。1980年代末，她在南安普顿大学的Microcosm系统探索了开放超媒体链接——这些理念早于并平行于万维网的发展。她与蒂姆·伯纳斯-李共同创办了网络科学研究倡议，将网络科学确立为一个跨学科学术领域。她曾担任ACM（美国计算机协会）主席——北美以外第一位担任此职务的人，并被授予大英帝国司令勋章。",
    achievements: [
      "Pioneered open hypermedia and the Microcosm system",
      "Co-founded Web Science with Tim Berners-Lee",
      "First non-North American ACM President"
    ],
    achievementsCn: [
      "开创开放超媒体和Microcosm系统",
      "与蒂姆·伯纳斯-李共同创立网络科学",
      "首位非北美ACM主席"
    ],
    era: "20th Century",
    imageCredit: "University of Southampton, CC BY-SA",
    featured: false,
    image: "",
    quote: "",
    quoteCn: "",
    quoteSource: "",
    references: [
      "Wikipedia: Wendy Hall — https://en.wikipedia.org/wiki/Wendy_Hall",
      "University of Southampton profile",
      "Web Science Trust — https://www.webscience.org/"
    ]
  },
  {
    id: 109,
    name: "Katie Bouman",
    nameCn: "凯蒂·鲍曼",
    slug: "katie-bouman",
    field: "computer-science",
    born: 1989,
    died: null,
    nationality: "American",
    nationalityCn: "美国",
    tagline: "Led the Algorithm That Captured the First Black Hole Image",
    taglineCn: "领导算法捕捉首张黑洞图像",
    bio: "Katherine Louise Bouman is a computer scientist and electrical engineer who led the development of a computational imaging algorithm that made it possible to capture the first-ever image of a black hole. As part of the Event Horizon Telescope project, she developed the CHIRP algorithm (Continuous High-resolution Image Reconstruction using Patch priors) to combine data from radio telescopes around the world. The resulting image of the black hole at the center of galaxy M87, released on April 10, 2019, was hailed as a landmark achievement. She is currently an assistant professor at Caltech.",
    bioCn: "凯瑟琳·路易斯·鲍曼是一位计算机科学家和电气工程师，她领导开发了使捕捉首张黑洞图像成为可能的计算成像算法。作为事件视界望远镜项目的一部分，她开发了CHIRP算法，将来自世界各地射电望远镜的数据组合在一起。2019年4月10日发布的M87星系中心黑洞图像被誉为里程碑式的成就。她目前是加州理工学院的助理教授。",
    achievements: [
      "Led development of black hole imaging algorithm",
      "Key contributor to Event Horizon Telescope project",
      "Assistant Professor at Caltech"
    ],
    achievementsCn: [
      "领导开发黑洞成像算法",
      "事件视界望远镜项目关键贡献者",
      "加州理工学院助理教授"
    ],
    era: "21st Century",
    imageCredit: "Event Horizon Telescope, CC BY",
    featured: false,
    image: "",
    quote: "",
    quoteCn: "",
    quoteSource: "",
    references: [
      "Wikipedia: Katie Bouman — https://en.wikipedia.org/wiki/Katie_Bouman",
      "Event Horizon Telescope — https://eventhorizontelescope.org/",
      "Bouman et al. Computational Imaging for VLBI Image Reconstruction. IEEE, 2016."
    ]
  },
  {
    id: 110,
    name: "Chieko Asakawa",
    nameCn: "浅川智惠子",
    slug: "chieko-asakawa",
    field: "computer-science",
    born: 1958,
    died: null,
    nationality: "Japanese",
    nationalityCn: "日本",
    tagline: "Pioneer of Digital Accessibility for the Visually Impaired",
    taglineCn: "视障人士数字无障碍先驱",
    bio: "Chieko Asakawa is a computer scientist and IBM Fellow who has devoted her career to making technology accessible to the visually impaired — a mission born from personal experience, as she lost her sight at age 14 due to a swimming accident. At IBM Research in Tokyo, she developed the Home Page Reader, one of the first practical voice browsers for navigating the web. She also created the aDesigner accessibility simulation tool and leads research in AI-powered navigation for blind users. In 2019, she was inducted into the National Inventors Hall of Fame.",
    bioCn: "浅川智惠子是计算机科学家和IBM院士，她将职业生涯投入到使技术对视障人士无障碍的事业中——这一使命源于个人经历，她14岁时因游泳事故失明。在IBM东京研究院，她开发了Home Page Reader——最早的实用型网页语音浏览器之一。她还创建了aDesigner无障碍模拟工具，并领导AI辅助导航研究。2019年，她入选美国发明家名人堂。",
    achievements: [
      "Developed IBM Home Page Reader voice browser",
      "IBM Fellow and accessibility technology pioneer",
      "Inducted into National Inventors Hall of Fame (2019)"
    ],
    achievementsCn: [
      "开发IBM Home Page Reader语音浏览器",
      "IBM院士和无障碍技术先驱",
      "入选美国发明家名人堂（2019年）"
    ],
    era: "20th Century",
    imageCredit: "IBM Research",
    featured: false,
    image: "",
    quote: "",
    quoteCn: "",
    quoteSource: "",
    references: [
      "Wikipedia: Chieko Asakawa — https://en.wikipedia.org/wiki/Chieko_Asakawa",
      "IBM Research profile",
      "TED Talk: How new technology helps blind people explore the world, 2015"
    ]
  }
];

// ====================================================================
// 3. NEW GENETICS-BIOTECH PIONEER (fix count: 5 → 6)
// ====================================================================
const newGenPioneer = {
  id: 111,
  name: "Elizabeth Blackburn",
  nameCn: "伊丽莎白·布莱克本",
  slug: "elizabeth-blackburn",
  field: "genetics-biotech",
  born: 1948,
  died: null,
  nationality: "Australian-American",
  nationalityCn: "澳大利亚裔美国人",
  tagline: "Nobel Laureate Who Discovered Telomerase",
  taglineCn: "发现端粒酶的诺贝尔奖得主",
  bio: "Elizabeth Blackburn is a molecular biologist who discovered the molecular nature of telomeres — the protective caps at the ends of chromosomes — and co-discovered telomerase, the enzyme that replenishes them. This work revealed fundamental mechanisms of aging and cancer. She shared the 2009 Nobel Prize in Physiology or Medicine with Carol Greider and Jack Szostak. Her research has opened vast new fields in aging biology, cancer research, and stress physiology. She served as President of the Salk Institute for Biological Studies.",
  bioCn: "伊丽莎白·布莱克本是一位分子生物学家，她发现了端粒——染色体末端保护帽——的分子本质，并共同发现了补充端粒的端粒酶。这项工作揭示了衰老和癌症的基本机制。她与卡罗尔·格雷德和杰克·绍斯塔克共同获得了2009年诺贝尔生理学或医学奖。她的研究开辟了衰老生物学、癌症研究和应激生理学的广阔新领域。她曾担任索尔克生物研究所所长。",
  achievements: [
    "Nobel Prize in Physiology or Medicine (2009)",
    "Discovered the molecular nature of telomeres",
    "Co-discovered telomerase enzyme"
  ],
  achievementsCn: [
    "诺贝尔生理学或医学奖（2009年）",
    "发现端粒的分子本质",
    "共同发现端粒酶"
  ],
  era: "20th Century",
  imageCredit: "Wikimedia Commons, CC BY-SA",
  featured: false,
  image: "https://upload.wikimedia.org/wikipedia/commons/6/61/Elizabeth_Blackburn_CHF_Heritage_Day_2012_crop.jpg",
  quote: "",
  quoteCn: "",
  quoteSource: "",
  references: [
    "Wikipedia: Elizabeth Blackburn — https://en.wikipedia.org/wiki/Elizabeth_Blackburn",
    "Nobel Prize: Elizabeth H. Blackburn — https://www.nobelprize.org/prizes/medicine/2009/blackburn/",
    "Blackburn, E. & Epel, E. The Telomere Effect. Grand Central Publishing, 2017."
  ]
};

// ====================================================================
// 4. QUOTES MAP (slug → { quote, quoteCn, quoteSource })
// ====================================================================
const quotesMap = {
  // — Computer Science —
  'ada-lovelace': {
    quote: "That brain of mine is something more than merely mortal, as time will show.",
    quoteCn: "我的大脑不仅仅是凡人的大脑，时间会证明这一点。",
    quoteSource: "Letter to her mother, 1843"
  },
  'grace-hopper': {
    quote: "The most dangerous phrase in the language is, 'We've always done it this way.'",
    quoteCn: "语言中最危险的一句话是：'我们一直都是这样做的。'",
    quoteSource: "From various lectures and speeches"
  },
  'margaret-hamilton': {
    quote: "There was no choice but to be pioneers.",
    quoteCn: "我们别无选择，只能成为先驱。",
    quoteSource: "On the Apollo program, from interviews"
  },
  'fei-fei-li': {
    quote: "If we want machines to think, we need to teach them to see.",
    quoteCn: "如果我们想让机器思考，就需要教它们看见。",
    quoteSource: "TED Talk, 2015"
  },
  'karen-sparck-jones': {
    quote: "Computing is too important to be left to men.",
    quoteCn: "计算太重要了，不能只留给男人。",
    quoteSource: "Cambridge Computer Laboratory report, 2002"
  },
  // — Mathematics —
  'sofia-kovalevskaya': {
    quote: "Say what you know, do what you must, come what may.",
    quoteCn: "说你所知，做你所必须，任凭后果。",
    quoteSource: "Motto inscribed on her papers"
  },
  'maryam-mirzakhani': {
    quote: "The beauty of mathematics only shows itself to more patient followers.",
    quoteCn: "数学之美只向更有耐心的追随者展现。",
    quoteSource: "Stanford memorial tribute"
  },
  'florence-nightingale': {
    quote: "I think one's feelings waste themselves in words; they ought all to be distilled into actions which bring results.",
    quoteCn: "我认为人的感情浪费在言语中；它们应该全部提炼为带来成果的行动。",
    quoteSource: "From personal letters"
  },
  'katherine-johnson': {
    quote: "I counted everything. I counted the steps to the road, the steps up to church, the number of dishes and silverware I washed.",
    quoteCn: "我数一切东西。数走到路上的步数、上教堂的台阶、洗了多少碗碟和银器。",
    quoteSource: "From interviews, documented in NASA oral histories"
  },
  // — Physics —
  'marie-curie': {
    quote: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
    quoteCn: "生活中没有什么是值得恐惧的，只有需要理解的。现在是更多理解的时候，以便我们可以少些恐惧。",
    quoteSource: "Widely attributed, from various biographies"
  },
  'lise-meitner': {
    quote: "Science makes people reach selflessly for truth and objectivity; it teaches people to accept reality, with wonder and admiration.",
    quoteCn: "科学使人无私地追求真理和客观性；它教人以惊奇和赞叹接受现实。",
    quoteSource: "From her writings and lectures"
  },
  'chien-shiung-wu': {
    quote: "There is only one thing worse than coming home from the lab to a sink full of dirty dishes. And that is not going to the lab at all!",
    quoteCn: "唯一比从实验室回家面对一水池脏碗碟更糟的事，就是根本没去实验室！",
    quoteSource: "Widely attributed, from interviews"
  },
  'vera-rubin': {
    quote: "Science progresses best when observations force us to alter our preconceptions.",
    quoteCn: "当观测迫使我们改变先入之见时，科学进步最大。",
    quoteSource: "From publications and talks"
  },
  'jocelyn-bell-burnell': {
    quote: "I feel I've done very well out of not getting a Nobel Prize.",
    quoteCn: "我觉得没获得诺贝尔奖让我的人生过得很好。",
    quoteSource: "From public lectures and interviews"
  },
  'donna-strickland': {
    quote: "We need to celebrate women physicists because they're out there.",
    quoteCn: "我们需要赞美女性物理学家，因为她们就在那里。",
    quoteSource: "Nobel Prize press conference, 2018"
  },
  'cecilia-payne-gaposchkin': {
    quote: "The reward of the young scientist is the emotional thrill of being the first person in the history of the world to see something or to understand something.",
    quoteCn: "年轻科学家的回报，是成为世界历史上第一个看到或理解某事的人所带来的情感激动。",
    quoteSource: "From her autobiography"
  },
  // — Chemistry —
  'rosalind-franklin': {
    quote: "Science and everyday life cannot and should not be separated.",
    quoteCn: "科学与日常生活不能也不应该分离。",
    quoteSource: "From her personal papers"
  },
  'dorothy-hodgkin': {
    quote: "I was captured for life by chemistry and by crystals.",
    quoteCn: "化学和晶体俘获了我的一生。",
    quoteSource: "Nobel autobiography, 1964"
  },
  'jennifer-doudna': {
    quote: "The power to control our species' genetic future is awesome and terrifying.",
    quoteCn: "控制我们物种基因未来的力量既令人敬畏又令人恐惧。",
    quoteSource: "A Crack in Creation, 2017"
  },
  'tu-youyou': {
    quote: "Every scientist dreams of doing something that can help the world.",
    quoteCn: "每个科学家都梦想做一些能帮助世界的事情。",
    quoteSource: "Nobel lecture, 2015"
  },
  // — Biology & Medicine —
  'elizabeth-blackwell': {
    quote: "It is not easy to be a pioneer — but oh, it is fascinating!",
    quoteCn: "成为先驱并不容易——但天哪，这太迷人了！",
    quoteSource: "From her diary and letters"
  },
  'barbara-mcclintock': {
    quote: "If you know you are on the right track, if you have this inner knowledge, then nobody can turn you off.",
    quoteCn: "如果你知道自己走在正确的道路上，如果你有这种内在的认知，那么没有人能阻止你。",
    quoteSource: "Documented in Keller, Evelyn Fox. A Feeling for the Organism, 1983."
  },
  'rachel-carson': {
    quote: "The more clearly we can focus our attention on the wonders and realities of the universe about us, the less taste we shall have for destruction.",
    quoteCn: "我们越清楚地将注意力集中在周围宇宙的奇迹和现实上，就越不会有毁灭的欲望。",
    quoteSource: "Silent Spring, 1962"
  },
  'jane-goodall': {
    quote: "What you do makes a difference, and you have to decide what kind of difference you want to make.",
    quoteCn: "你所做的事会产生影响，你必须决定你想产生什么样的影响。",
    quoteSource: "From talks and published works"
  },
  'rita-levi-montalcini': {
    quote: "Above all, don't fear difficult moments. The best comes from them.",
    quoteCn: "最重要的是，不要害怕困难时刻。最好的东西正是从中而来。",
    quoteSource: "From interviews"
  },
  'virginia-apgar': {
    quote: "Nobody, but nobody, is going to stop breathing on me.",
    quoteCn: "没有人，任何人都不能在我面前停止呼吸。",
    quoteSource: "Widely attributed, from clinical practice"
  },
  // — Astronomy & Space —
  'valentina-tereshkova': {
    quote: "Once you've been in space, you appreciate how small and fragile the Earth is.",
    quoteCn: "一旦你去过太空，就会体会到地球是多么渺小和脆弱。",
    quoteSource: "From interviews"
  },
  'sally-ride': {
    quote: "All adventures, especially into new territory, are scary.",
    quoteCn: "所有的冒险，尤其是进入新领域的冒险，都是令人恐惧的。",
    quoteSource: "From her writings"
  },
  'mae-jemison': {
    quote: "Never limit yourself because of others' limited imagination; never limit others because of your own limited imagination.",
    quoteCn: "永远不要因为他人有限的想象力而限制自己；也永远不要因为自己有限的想象力而限制他人。",
    quoteSource: "From talks and published works"
  },
  // — Engineering —
  'hedy-lamarr': {
    quote: "All creative people want to do the unexpected.",
    quoteCn: "所有有创造力的人都想做出人意料的事。",
    quoteSource: "From interviews"
  },
  'bessie-coleman': {
    quote: "I refused to take no for an answer.",
    quoteCn: "我拒绝接受否定的回答。",
    quoteSource: "Attributed, from biographical accounts"
  },
  // — Earth & Environment —
  'wangari-maathai': {
    quote: "It's the little things citizens do. That's what will make the difference. My little thing is planting trees.",
    quoteCn: "正是公民做的小事会带来改变。我的小事就是种树。",
    quoteSource: "Nobel lecture, 2004"
  },
  'sylvia-earle': {
    quote: "No water, no life. No blue, no green.",
    quoteCn: "没有水就没有生命。没有蓝色就没有绿色。",
    quoteSource: "From TED Prize speech, 2009"
  },
  // — Genetics & Biotech —
  'katalin-kariko': {
    quote: "I thought of leaving science many times, but I always went back to the bench.",
    quoteCn: "我多次想过离开科学，但总是回到了实验台前。",
    quoteSource: "From interviews, The Guardian, 2021"
  },
};

// ====================================================================
// 5. REFERENCES MAP (slug → string[])
// ====================================================================
const referencesMap = {
  // — Computer Science —
  'ada-lovelace': [
    "Toole, Betty A. Ada, the Enchantress of Numbers: Poetical Science. Strawberry Press, 1998.",
    "Wikipedia: Ada Lovelace — https://en.wikipedia.org/wiki/Ada_Lovelace",
    "Lovelace, A. 'Notes on L. Menabrea's Sketch of the Analytical Engine,' 1843."
  ],
  'grace-hopper': [
    "Wikipedia: Grace Hopper — https://en.wikipedia.org/wiki/Grace_Hopper",
    "Beyer, Kurt W. Grace Hopper and the Invention of the Information Age. MIT Press, 2009.",
    "Yale University: Grace Murray Hopper Collection"
  ],
  'betty-holberton': [
    "Wikipedia: Betty Holberton — https://en.wikipedia.org/wiki/Betty_Holberton",
    "Kleiman, Kathy. Proving Ground: The Untold Story of the Six Women Who Programmed the World's First Modern Computer. Grand Central, 2022.",
    "ENIAC Programmers Project — http://eniacprogrammers.org/"
  ],
  'jean-jennings-bartik': [
    "Wikipedia: Jean Bartik — https://en.wikipedia.org/wiki/Jean_Bartik",
    "Bartik, Jean. Pioneer Programmer: Jean Jennings Bartik and the Computer That Changed the World. Truman State Univ Press, 2013.",
    "ENIAC Programmers Project — http://eniacprogrammers.org/"
  ],
  'kathleen-mcnulty': [
    "Wikipedia: Kathleen Antonelli — https://en.wikipedia.org/wiki/Kathleen_Antonelli",
    "Kleiman, Kathy. Proving Ground. Grand Central, 2022."
  ],
  'frances-allen': [
    "Wikipedia: Frances Allen — https://en.wikipedia.org/wiki/Frances_Allen",
    "ACM Turing Award: Frances E. Allen — https://amturing.acm.org/award_winners/allen_1012327.cfm",
    "Allen, F.E. 'Program Optimization,' Annual Review in Automatic Programming, 1969."
  ],
  'margaret-hamilton': [
    "Wikipedia: Margaret Hamilton (software engineer) — https://en.wikipedia.org/wiki/Margaret_Hamilton_(software_engineer)",
    "NASA History: Margaret Hamilton — https://www.nasa.gov/",
    "Hamilton, M. 'Universal Systems Language,' 1986."
  ],
  'radia-perlman': [
    "Wikipedia: Radia Perlman — https://en.wikipedia.org/wiki/Radia_Perlman",
    "Perlman, Radia. Interconnections: Bridges, Routers, Switches. Addison-Wesley, 1999."
  ],
  'barbara-liskov': [
    "Wikipedia: Barbara Liskov — https://en.wikipedia.org/wiki/Barbara_Liskov",
    "ACM Turing Award: Barbara Liskov — https://amturing.acm.org/award_winners/liskov_1108679.cfm"
  ],
  'shafi-goldwasser': [
    "Wikipedia: Shafi Goldwasser — https://en.wikipedia.org/wiki/Shafi_Goldwasser",
    "ACM Turing Award: Shafi Goldwasser — https://amturing.acm.org/award_winners/goldwasser_8627889.cfm"
  ],
  'fei-fei-li': [
    "Wikipedia: Fei-Fei Li — https://en.wikipedia.org/wiki/Fei-Fei_Li",
    "Stanford HAI — https://hai.stanford.edu/",
    "Deng et al. ImageNet: A Large-Scale Hierarchical Image Database. CVPR, 2009."
  ],
  'mary-kenneth-keller': [
    "Wikipedia: Mary Kenneth Keller — https://en.wikipedia.org/wiki/Mary_Kenneth_Keller",
    "Clarke University archives"
  ],
  'adele-goldberg': [
    "Wikipedia: Adele Goldberg (computer scientist) — https://en.wikipedia.org/wiki/Adele_Goldberg_(computer_scientist)",
    "Goldberg, A. & Robson, D. Smalltalk-80: The Language. Addison-Wesley, 1989."
  ],
  'karen-sparck-jones': [
    "Wikipedia: Karen Spärck Jones — https://en.wikipedia.org/wiki/Karen_Sp%C3%A4rck_Jones",
    "Spärck Jones, K. 'A statistical interpretation of term specificity,' Journal of Documentation, 1972.",
    "Cambridge Computer Laboratory memorial"
  ],
  'lynn-conway': [
    "Wikipedia: Lynn Conway — https://en.wikipedia.org/wiki/Lynn_Conway",
    "Mead, C. & Conway, L. Introduction to VLSI Systems. Addison-Wesley, 1980.",
    "Lynn Conway's personal archive — https://ai.eecs.umich.edu/people/conway/"
  ],
  // — Mathematics —
  'hypatia': [
    "Wikipedia: Hypatia — https://en.wikipedia.org/wiki/Hypatia",
    "Watts, Edward J. Hypatia: The Life and Legend of an Ancient Philosopher. Oxford Univ Press, 2017.",
    "Dzielska, Maria. Hypatia of Alexandria. Harvard Univ Press, 1995."
  ],
  'sophie-germain': [
    "Wikipedia: Sophie Germain — https://en.wikipedia.org/wiki/Sophie_Germain",
    "Laubenbacher, R. & Pengelley, D. 'Voici ce que j'ai trouvé: Sophie Germain's grand plan,' Historia Mathematica, 2010."
  ],
  'emmy-noether': [
    "Wikipedia: Emmy Noether — https://en.wikipedia.org/wiki/Emmy_Noether",
    "Angier, Natalie. 'The Mighty Mathematician You've Never Heard Of.' The New York Times, 2012.",
    "Dick, Auguste. Emmy Noether 1882–1935. Birkhäuser, 1981."
  ],
  'sofia-kovalevskaya': [
    "Wikipedia: Sofia Kovalevskaya — https://en.wikipedia.org/wiki/Sofia_Kovalevskaya",
    "Koblitz, Ann Hibner. A Convergence of Lives: Sofia Kovalevskaia. Birkhäuser, 1983."
  ],
  'maryam-mirzakhani': [
    "Wikipedia: Maryam Mirzakhani — https://en.wikipedia.org/wiki/Maryam_Mirzakhani",
    "Stanford News: Memorial — https://news.stanford.edu/",
    "Fields Medal citation, International Mathematical Union, 2014."
  ],
  'mary-cartwright': [
    "Wikipedia: Mary Cartwright — https://en.wikipedia.org/wiki/Mary_Cartwright",
    "Royal Society biography"
  ],
  'maria-gaetana-agnesi': [
    "Wikipedia: Maria Gaetana Agnesi — https://en.wikipedia.org/wiki/Maria_Gaetana_Agnesi",
    "Mazzotti, Massimo. The World of Maria Gaetana Agnesi. Johns Hopkins Univ Press, 2007."
  ],
  'florence-nightingale': [
    "Wikipedia: Florence Nightingale — https://en.wikipedia.org/wiki/Florence_Nightingale",
    "McDonald, Lynn (ed). The Collected Works of Florence Nightingale. Wilfrid Laurier Univ Press, 2001–2012.",
    "Bostridge, Mark. Florence Nightingale: The Making of an Icon. Farrar, Straus and Giroux, 2008."
  ],
  'wang-zhenyi': [
    "Wikipedia: Wang Zhenyi (astronomer) — https://en.wikipedia.org/wiki/Wang_Zhenyi_(astronomer)",
    "Peterson, Andrea. '4000 Years of Women in Science.'"
  ],
  'katherine-johnson': [
    "Wikipedia: Katherine Johnson — https://en.wikipedia.org/wiki/Katherine_Johnson",
    "Shetterly, Margot Lee. Hidden Figures. William Morrow, 2016.",
    "NASA: Katherine Johnson biography — https://www.nasa.gov/"
  ],
  // — Physics —
  'marie-curie': [
    "Wikipedia: Marie Curie — https://en.wikipedia.org/wiki/Marie_Curie",
    "Nobel Prize: Marie Curie — https://www.nobelprize.org/prizes/physics/1903/marie-curie/",
    "Quinn, Susan. Marie Curie: A Life. Simon & Schuster, 1995."
  ],
  'lise-meitner': [
    "Wikipedia: Lise Meitner — https://en.wikipedia.org/wiki/Lise_Meitner",
    "Sime, Ruth Lewin. Lise Meitner: A Life in Physics. Univ of California Press, 1996."
  ],
  'chien-shiung-wu': [
    "Wikipedia: Chien-Shiung Wu — https://en.wikipedia.org/wiki/Chien-Shiung_Wu",
    "Chiang, Tsai-Chien. Madame Wu Chien-Shiung: The First Lady of Physics Research. World Scientific, 2014."
  ],
  'maria-goeppert-mayer': [
    "Wikipedia: Maria Goeppert Mayer — https://en.wikipedia.org/wiki/Maria_Goeppert_Mayer",
    "Nobel Prize: Maria Goeppert Mayer — https://www.nobelprize.org/prizes/physics/1963/mayer/"
  ],
  'emilie-du-chatelet': [
    "Wikipedia: Émilie du Châtelet — https://en.wikipedia.org/wiki/%C3%89milie_du_Ch%C3%A2telet",
    "Zinsser, Judith. Emilie Du Chatelet: Daring Genius of the Enlightenment. Penguin, 2007."
  ],
  'donna-strickland': [
    "Wikipedia: Donna Strickland — https://en.wikipedia.org/wiki/Donna_Strickland",
    "Nobel Prize: Donna Strickland — https://www.nobelprize.org/prizes/physics/2018/strickland/"
  ],
  'jocelyn-bell-burnell': [
    "Wikipedia: Jocelyn Bell Burnell — https://en.wikipedia.org/wiki/Jocelyn_Bell_Burnell",
    "Burnell, J.B. 'Little Green Men, White Dwarfs, or Pulsars?' Cosmic Search, 1977."
  ],
  'vera-rubin': [
    "Wikipedia: Vera Rubin — https://en.wikipedia.org/wiki/Vera_Rubin",
    "Rubin, Vera. Bright Galaxies, Dark Matters. AIP Press, 1997."
  ],
  'cecilia-payne-gaposchkin': [
    "Wikipedia: Cecilia Payne-Gaposchkin — https://en.wikipedia.org/wiki/Cecilia_Payne-Gaposchkin",
    "Payne-Gaposchkin, C. An Autobiography and Other Recollections. Cambridge Univ Press, 1984."
  ],
  'hertha-ayrton': [
    "Wikipedia: Hertha Ayrton — https://en.wikipedia.org/wiki/Hertha_Ayrton",
    "Sharp, Evelyn. Hertha Ayrton: A Memoir. Edward Arnold, 1926."
  ],
  'andrea-ghez': [
    "Wikipedia: Andrea Ghez — https://en.wikipedia.org/wiki/Andrea_Ghez",
    "Nobel Prize: Andrea Ghez — https://www.nobelprize.org/prizes/physics/2020/ghez/"
  ],
  'mildred-dresselhaus': [
    "Wikipedia: Mildred Dresselhaus — https://en.wikipedia.org/wiki/Mildred_Dresselhaus",
    "MIT memorial — https://news.mit.edu/"
  ],
  // — Chemistry —
  'rosalind-franklin': [
    "Wikipedia: Rosalind Franklin — https://en.wikipedia.org/wiki/Rosalind_Franklin",
    "Maddox, Brenda. Rosalind Franklin: The Dark Lady of DNA. HarperCollins, 2002."
  ],
  'dorothy-hodgkin': [
    "Wikipedia: Dorothy Hodgkin — https://en.wikipedia.org/wiki/Dorothy_Hodgkin",
    "Nobel Prize: Dorothy Crowfoot Hodgkin — https://www.nobelprize.org/prizes/chemistry/1964/hodgkin/",
    "Ferry, Georgina. Dorothy Hodgkin: A Life. Granta Books, 1998."
  ],
  'alice-ball': [
    "Wikipedia: Alice Ball — https://en.wikipedia.org/wiki/Alice_Ball",
    "Swaby, Rachel. Headstrong: 52 Women Who Changed Science. Crown/Broadway, 2015."
  ],
  'irene-joliot-curie': [
    "Wikipedia: Irène Joliot-Curie — https://en.wikipedia.org/wiki/Ir%C3%A8ne_Joliot-Curie",
    "Nobel Prize: Irène Joliot-Curie — https://www.nobelprize.org/prizes/chemistry/1935/joliot-curie/"
  ],
  'gertrude-elion': [
    "Wikipedia: Gertrude Elion — https://en.wikipedia.org/wiki/Gertrude_B._Elion",
    "Nobel Prize: Gertrude B. Elion — https://www.nobelprize.org/prizes/medicine/1988/elion/"
  ],
  'jennifer-doudna': [
    "Wikipedia: Jennifer Doudna — https://en.wikipedia.org/wiki/Jennifer_Doudna",
    "Nobel Prize: Jennifer A. Doudna — https://www.nobelprize.org/prizes/chemistry/2020/doudna/",
    "Doudna, J. & Sternberg, S. A Crack in Creation. Houghton Mifflin, 2017."
  ],
  'emmanuelle-charpentier': [
    "Wikipedia: Emmanuelle Charpentier — https://en.wikipedia.org/wiki/Emmanuelle_Charpentier",
    "Nobel Prize: Emmanuelle Charpentier — https://www.nobelprize.org/prizes/chemistry/2020/charpentier/"
  ],
  'tu-youyou': [
    "Wikipedia: Tu Youyou — https://en.wikipedia.org/wiki/Tu_Youyou",
    "Nobel Prize: Tu Youyou — https://www.nobelprize.org/prizes/medicine/2015/tu/"
  ],
  // — Biology & Medicine —
  'elizabeth-blackwell': [
    "Wikipedia: Elizabeth Blackwell — https://en.wikipedia.org/wiki/Elizabeth_Blackwell",
    "Nimura, Janice. The Doctors Blackwell. W.W. Norton, 2021."
  ],
  'barbara-mcclintock': [
    "Wikipedia: Barbara McClintock — https://en.wikipedia.org/wiki/Barbara_McClintock",
    "Nobel Prize: Barbara McClintock — https://www.nobelprize.org/prizes/medicine/1983/mcclintock/",
    "Keller, Evelyn Fox. A Feeling for the Organism. W.H. Freeman, 1983."
  ],
  'rachel-carson': [
    "Wikipedia: Rachel Carson — https://en.wikipedia.org/wiki/Rachel_Carson",
    "Carson, Rachel. Silent Spring. Houghton Mifflin, 1962.",
    "Lear, Linda. Rachel Carson: Witness for Nature. Henry Holt, 1997."
  ],
  'jane-goodall': [
    "Wikipedia: Jane Goodall — https://en.wikipedia.org/wiki/Jane_Goodall",
    "Goodall, Jane. In the Shadow of Man. Houghton Mifflin, 1971.",
    "Jane Goodall Institute — https://www.janegoodall.org/"
  ],
  'mary-anning': [
    "Wikipedia: Mary Anning — https://en.wikipedia.org/wiki/Mary_Anning",
    "Emling, Shelley. The Fossil Hunter. Palgrave Macmillan, 2009."
  ],
  'rita-levi-montalcini': [
    "Wikipedia: Rita Levi-Montalcini — https://en.wikipedia.org/wiki/Rita_Levi-Montalcini",
    "Nobel Prize: Rita Levi-Montalcini — https://www.nobelprize.org/prizes/medicine/1986/levi-montalcini/"
  ],
  'nettie-stevens': [
    "Wikipedia: Nettie Stevens — https://en.wikipedia.org/wiki/Nettie_Stevens",
    "Brush, Stephen G. 'Nettie M. Stevens and the Discovery of Sex Determination by Chromosomes,' Isis, 1978."
  ],
  'francoise-barre-sinoussi': [
    "Wikipedia: Françoise Barré-Sinoussi — https://en.wikipedia.org/wiki/Fran%C3%A7oise_Barr%C3%A9-Sinoussi",
    "Nobel Prize: Françoise Barré-Sinoussi — https://www.nobelprize.org/prizes/medicine/2008/barre-sinoussi/"
  ],
  'christiane-nusslein-volhard': [
    "Wikipedia: Christiane Nüsslein-Volhard — https://en.wikipedia.org/wiki/Christiane_N%C3%BCsslein-Volhard",
    "Nobel Prize: Christiane Nüsslein-Volhard — https://www.nobelprize.org/prizes/medicine/1995/nusslein-volhard/"
  ],
  'linda-buck': [
    "Wikipedia: Linda B. Buck — https://en.wikipedia.org/wiki/Linda_B._Buck",
    "Nobel Prize: Linda B. Buck — https://www.nobelprize.org/prizes/medicine/2004/buck/"
  ],
  'elizabeth-garrett-anderson': [
    "Wikipedia: Elizabeth Garrett Anderson — https://en.wikipedia.org/wiki/Elizabeth_Garrett_Anderson",
    "Manton, Jo. Elizabeth Garrett Anderson. Methuen, 1965."
  ],
  'virginia-apgar': [
    "Wikipedia: Virginia Apgar — https://en.wikipedia.org/wiki/Virginia_Apgar",
    "Apgar, V. 'A Proposal for a New Method of Evaluation of the Newborn Infant,' Anesthesia & Analgesia, 1953."
  ],
  // — Astronomy & Space —
  'caroline-herschel': [
    "Wikipedia: Caroline Herschel — https://en.wikipedia.org/wiki/Caroline_Herschel",
    "Hoskin, Michael. The Herschel Partnership. Science History Publications, 2003."
  ],
  'henrietta-swan-leavitt': [
    "Wikipedia: Henrietta Swan Leavitt — https://en.wikipedia.org/wiki/Henrietta_Swan_Leavitt",
    "Johnson, George. Miss Leavitt's Stars. W.W. Norton, 2005."
  ],
  'annie-jump-cannon': [
    "Wikipedia: Annie Jump Cannon — https://en.wikipedia.org/wiki/Annie_Jump_Cannon",
    "Sobel, Dava. The Glass Universe. Viking, 2016."
  ],
  'williamina-fleming': [
    "Wikipedia: Williamina Fleming — https://en.wikipedia.org/wiki/Williamina_Fleming",
    "Sobel, Dava. The Glass Universe. Viking, 2016."
  ],
  'valentina-tereshkova': [
    "Wikipedia: Valentina Tereshkova — https://en.wikipedia.org/wiki/Valentina_Tereshkova",
    "ESA: Valentina Tereshkova biography"
  ],
  'sally-ride': [
    "Wikipedia: Sally Ride — https://en.wikipedia.org/wiki/Sally_Ride",
    "Sherr, Lynn. Sally Ride: America's First Woman in Space. Simon & Schuster, 2014."
  ],
  'mae-jemison': [
    "Wikipedia: Mae Jemison — https://en.wikipedia.org/wiki/Mae_Jemison",
    "Jemison, Mae. Find Where the Wind Goes. Scholastic, 2001."
  ],
  'liu-yang': [
    "Wikipedia: Liu Yang (astronaut) — https://en.wikipedia.org/wiki/Liu_Yang_(astronaut)",
    "China Manned Space Agency archives"
  ],
  'peggy-whitson': [
    "Wikipedia: Peggy Whitson — https://en.wikipedia.org/wiki/Peggy_Whitson",
    "NASA astronaut biography — https://www.nasa.gov/"
  ],
  'carolyn-shoemaker': [
    "Wikipedia: Carolyn Shoemaker — https://en.wikipedia.org/wiki/Carolyn_S._Shoemaker"
  ],
  // — Engineering —
  'hedy-lamarr': [
    "Wikipedia: Hedy Lamarr — https://en.wikipedia.org/wiki/Hedy_Lamarr",
    "Rhodes, Richard. Hedy's Folly. Doubleday, 2011.",
    "Lamarr, H. & Antheil, G. US Patent 2,292,387: Secret Communication System, 1942."
  ],
  'stephanie-kwolek': [
    "Wikipedia: Stephanie Kwolek — https://en.wikipedia.org/wiki/Stephanie_Kwolek",
    "Chemical Heritage Foundation oral history"
  ],
  'edith-clarke': [
    "Wikipedia: Edith Clarke — https://en.wikipedia.org/wiki/Edith_Clarke",
    "IEEE History Center"
  ],
  'emily-warren-roebling': [
    "Wikipedia: Emily Warren Roebling — https://en.wikipedia.org/wiki/Emily_Warren_Roebling",
    "McCullough, David. The Great Bridge. Simon & Schuster, 1972."
  ],
  'lillian-gilbreth': [
    "Wikipedia: Lillian Moller Gilbreth — https://en.wikipedia.org/wiki/Lillian_Moller_Gilbreth",
    "Lancaster, Jane. Making Time: Lillian Moller Gilbreth. Northeastern Univ Press, 2004."
  ],
  'mary-anderson': [
    "Wikipedia: Mary Anderson (inventor) — https://en.wikipedia.org/wiki/Mary_Anderson_(inventor)"
  ],
  'beulah-louise-henry': [
    "Wikipedia: Beulah Louise Henry — https://en.wikipedia.org/wiki/Beulah_Louise_Henry"
  ],
  'ellen-swallow-richards': [
    "Wikipedia: Ellen Swallow Richards — https://en.wikipedia.org/wiki/Ellen_Swallow_Richards",
    "Clarke, Robert. Ellen Swallow: The Woman Who Founded Ecology. Follett, 1973."
  ],
  'bessie-coleman': [
    "Wikipedia: Bessie Coleman — https://en.wikipedia.org/wiki/Bessie_Coleman",
    "Rich, Doris L. Queen Bess: Daredevil Aviator. Smithsonian, 1993."
  ],
  'beatrice-shilling': [
    "Wikipedia: Beatrice Shilling — https://en.wikipedia.org/wiki/Beatrice_Shilling"
  ],
  'gwynne-shotwell': [
    "Wikipedia: Gwynne Shotwell — https://en.wikipedia.org/wiki/Gwynne_Shotwell",
    "SpaceX company profile"
  ],
  'limor-fried': [
    "Wikipedia: Limor Fried — https://en.wikipedia.org/wiki/Limor_Fried",
    "Adafruit Industries — https://www.adafruit.com/"
  ],
  // — Earth & Environment —
  'eunice-newton-foote': [
    "Wikipedia: Eunice Newton Foote — https://en.wikipedia.org/wiki/Eunice_Newton_Foote",
    "Foote, E.N. 'Circumstances Affecting the Heat of the Sun's Rays,' American Journal of Science, 1856."
  ],
  'inge-lehmann': [
    "Wikipedia: Inge Lehmann — https://en.wikipedia.org/wiki/Inge_Lehmann",
    "Lehmann, I. 'P',' Publications du Bureau Central Séismologique International, 1936."
  ],
  'marie-tharp': [
    "Wikipedia: Marie Tharp — https://en.wikipedia.org/wiki/Marie_Tharp",
    "Felt, Hali. Soundings: The Story of the Remarkable Woman Who Mapped the Ocean Floor. Henry Holt, 2012."
  ],
  'wangari-maathai': [
    "Wikipedia: Wangari Maathai — https://en.wikipedia.org/wiki/Wangari_Maathai",
    "Nobel Prize: Wangari Maathai — https://www.nobelprize.org/prizes/peace/2004/maathai/",
    "Maathai, W. Unbowed: A Memoir. Knopf, 2006."
  ],
  'sylvia-earle': [
    "Wikipedia: Sylvia Earle — https://en.wikipedia.org/wiki/Sylvia_Earle",
    "Earle, Sylvia. The World Is Blue. National Geographic, 2009."
  ],
  'katia-krafft': [
    "Wikipedia: Katia Krafft — https://en.wikipedia.org/wiki/Katia_Krafft"
  ],
  // — Genetics & Biotech —
  'mary-claire-king': [
    "Wikipedia: Mary-Claire King — https://en.wikipedia.org/wiki/Mary-Claire_King",
    "King, M.C. et al. 'Breast and Ovarian Cancer Risks Due to Inherited Mutations in BRCA1 and BRCA2,' Science, 2003."
  ],
  'katalin-kariko': [
    "Wikipedia: Katalin Karikó — https://en.wikipedia.org/wiki/Katalin_Karik%C3%B3",
    "Nobel Prize: Katalin Karikó — https://www.nobelprize.org/prizes/medicine/2023/kariko/"
  ],
  'flossie-wong-staal': [
    "Wikipedia: Flossie Wong-Staal — https://en.wikipedia.org/wiki/Flossie_Wong-Staal"
  ],
  'patricia-bath': [
    "Wikipedia: Patricia Bath — https://en.wikipedia.org/wiki/Patricia_Bath",
    "Bath, P. US Patent 4,744,360: Apparatus for ablating and removing cataract lenses, 1988."
  ],
  'esther-lederberg': [
    "Wikipedia: Esther Lederberg — https://en.wikipedia.org/wiki/Esther_Lederberg",
    "Stanford University archives"
  ],
  // — Data Science & AI —
  'dorothy-vaughan': [
    "Wikipedia: Dorothy Vaughan — https://en.wikipedia.org/wiki/Dorothy_Vaughan",
    "Shetterly, Margot Lee. Hidden Figures. William Morrow, 2016."
  ],
  'annie-easley': [
    "Wikipedia: Annie Easley — https://en.wikipedia.org/wiki/Annie_Easley",
    "NASA Glenn Research Center oral history, 2001"
  ],
  'mary-allen-wilkes': [
    "Wikipedia: Mary Allen Wilkes — https://en.wikipedia.org/wiki/Mary_Allen_Wilkes"
  ],
  'evelyn-boyd-granville': [
    "Wikipedia: Evelyn Boyd Granville — https://en.wikipedia.org/wiki/Evelyn_Boyd_Granville"
  ],
  'gladys-west': [
    "Wikipedia: Gladys West — https://en.wikipedia.org/wiki/Gladys_West",
    "USAF Hall of Fame induction, 2018"
  ],
  'cynthia-breazeal': [
    "Wikipedia: Cynthia Breazeal — https://en.wikipedia.org/wiki/Cynthia_Breazeal",
    "Breazeal, C. Designing Sociable Robots. MIT Press, 2002."
  ],
  'daphne-koller': [
    "Wikipedia: Daphne Koller — https://en.wikipedia.org/wiki/Daphne_Koller",
    "Coursera co-founder — https://www.coursera.org/"
  ],
  'joy-buolamwini': [
    "Wikipedia: Joy Buolamwini — https://en.wikipedia.org/wiki/Joy_Buolamwini",
    "Buolamwini, J. & Gebru, T. 'Gender Shades,' Proceedings of Machine Learning Research, 2018."
  ],
  'timnit-gebru': [
    "Wikipedia: Timnit Gebru — https://en.wikipedia.org/wiki/Timnit_Gebru",
    "Distributed AI Research Institute (DAIR) — https://www.dair-institute.org/"
  ],
  'lisa-randall': [
    "Wikipedia: Lisa Randall — https://en.wikipedia.org/wiki/Lisa_Randall",
    "Randall, L. Warped Passages. Ecco Press, 2005."
  ],
};

// ====================================================================
// MERGE LOGIC
// ====================================================================

// Apply corrections
for (const p of pioneers) {
  if (corrections[p.slug]) {
    Object.assign(p, corrections[p.slug]);
  }
}

// Add new fields to all existing pioneers
for (const p of pioneers) {
  // Add quote fields
  const q = quotesMap[p.slug];
  p.quote = q?.quote || '';
  p.quoteCn = q?.quoteCn || '';
  p.quoteSource = q?.quoteSource || '';
  // Add references
  p.references = referencesMap[p.slug] || [
    `Wikipedia: ${p.name} — https://en.wikipedia.org/wiki/${p.name.replace(/ /g, '_')}`
  ];
}

// Add new CS pioneers
pioneers.push(...newCSPioneers);

// Add Elizabeth Blackburn
pioneers.push(newGenPioneer);

// Write enriched pioneers.json
writeFileSync(
  join(root, 'src/data/pioneers.json'),
  JSON.stringify(pioneers, null, 2) + '\n'
);
console.log(`Wrote enriched pioneers.json (${pioneers.length} total)`);

// Re-split by field
const byField = {};
for (const p of pioneers) {
  if (!byField[p.field]) byField[p.field] = [];
  byField[p.field].push(p);
}

const outDir = join(root, 'src/data/pioneers');
mkdirSync(outDir, { recursive: true });
for (const [fieldId, list] of Object.entries(byField)) {
  writeFileSync(join(outDir, `${fieldId}.json`), JSON.stringify(list, null, 2) + '\n');
  console.log(`  ${fieldId}.json → ${list.length} pioneers`);
}

// Update fields.json counts
for (const f of fields) {
  const actual = byField[f.id]?.length || 0;
  if (f.count !== actual) {
    console.log(`  Updated ${f.id} count: ${f.count} → ${actual}`);
    f.count = actual;
  }
}
writeFileSync(join(root, 'src/data/fields.json'), JSON.stringify(fields, null, 2) + '\n');
console.log('Updated fields.json');

console.log('\nDone! Summary:');
console.log(`  Total pioneers: ${pioneers.length}`);
console.log(`  Fields: ${fields.length}`);
for (const f of fields) {
  console.log(`    ${f.nameCn} (${f.id}): ${f.count}`);
}
