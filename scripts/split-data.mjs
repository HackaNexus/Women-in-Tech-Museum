import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const pioneers = JSON.parse(readFileSync(join(root, 'src/data/pioneers.json'), 'utf-8'));
const fields = JSON.parse(readFileSync(join(root, 'src/data/fields.json'), 'utf-8'));

// Wikimedia Commons portrait URLs (public domain / CC)
const portraitMap = {
  'ada-lovelace': 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Ada_Lovelace_portrait.jpg',
  'grace-hopper': 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Commodore_Grace_M._Hopper%2C_USN_%28covered%29.jpg',
  'betty-holberton': 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Betty_Holberton.jpg',
  'jean-jennings-bartik': 'https://upload.wikimedia.org/wikipedia/commons/5/55/Jean_Bartik_%282008%29.jpg',
  'kathleen-mcnulty': 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Kay_McNulty_Mauchly_Antonelli.jpg',
  'frances-allen': 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Allen_mg_2528-3750K-b.jpg',
  'margaret-hamilton': 'https://upload.wikimedia.org/wikipedia/commons/d/db/Margaret_Hamilton_-_restoration.jpg',
  'radia-perlman': 'https://upload.wikimedia.org/wikipedia/commons/a/af/Radia_Perlman_2009.jpg',
  'barbara-liskov': 'https://upload.wikimedia.org/wikipedia/commons/3/38/Barbara_Liskov_MIT_computer_scientist_2010.jpg',
  'shafi-goldwasser': 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Shafi_Goldwasser.jpg',
  'fei-fei-li': 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Fei-Fei_Li_at_AI_for_Good_2017.jpg',
  'mary-kenneth-keller': '',
  'adele-goldberg': 'https://upload.wikimedia.org/wikipedia/commons/3/36/Adele_Goldberg_at_PyCon_2007.jpg',
  'karen-sparck-jones': 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Prof._Karen_Sp%C3%A4rck_Jones.jpg',
  'lynn-conway': 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Lynn_Conway_July_2006.jpg',

  'hypatia': 'https://upload.wikimedia.org/wikipedia/commons/2/21/Hypatia_portrait.png',
  'sophie-germain': 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Germain.jpeg',
  'emmy-noether': 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Noether.jpg',
  'sofia-kovalevskaya': 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Sofja_Wassiljewna_Kowalewskaja_1_%28cropped%29.jpg',
  'maryam-mirzakhani': 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Maryam_Mirzakhani_%282014%29.jpg',
  'mary-cartwright': 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Mary_Cartwright.jpg',
  'maria-gaetana-agnesi': 'https://upload.wikimedia.org/wikipedia/commons/5/53/Maria_Gaetana_Agnesi.jpg',
  'florence-nightingale': 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Florence_Nightingale_%28H_Hering_NPG_x82368%29.jpg',
  'wang-zhenyi': '',
  'katherine-johnson': 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Katherine_Johnson_1983.jpg',

  'marie-curie': 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Marie_Curie_c._1920s.jpg',
  'lise-meitner': 'https://upload.wikimedia.org/wikipedia/commons/0/03/Lise_Meitner_%281878-1968%29%2C_lecturing_at_Catholic_University%2C_Washington%2C_D.C.%2C_1946.jpg',
  'chien-shiung-wu': 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Chien-Shiung_Wu_%281963%29.jpg',
  'maria-goeppert-mayer': 'https://upload.wikimedia.org/wikipedia/commons/1/17/Maria_Goeppert-Mayer.jpg',
  'emilie-du-chatelet': 'https://upload.wikimedia.org/wikipedia/commons/b/b5/%C3%89milie_du_Ch%C3%A2telet_by_Latour.jpg',
  'donna-strickland': 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Donna_Strickland_EM1B5760_%2846183560632%29_%28cropped%29.jpg',
  'jocelyn-bell-burnell': 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Jocelyn_Bell_Burnell_at_workshop_on_Innovation%2C_ESA%2C_ESTEC_2009.jpg',
  'vera-rubin': 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Vera_Rubin.jpg',
  'cecilia-payne-gaposchkin': 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Cecilia_Helena_Payne_Gaposchkin_%281900-1979%29_%283%29.jpg',
  'hertha-ayrton': 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Hertha_Ayrton._Photograph_by_Lena_Connell.jpg',
  'andrea-ghez': 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Andrea_Ghez%2C_2019_%28cropped%29.jpg',
  'mildred-dresselhaus': 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Millie_Dresselhaus_1.jpg',

  'rosalind-franklin': 'https://upload.wikimedia.org/wikipedia/en/e/e9/Rosalind_Franklin_%281920-1958%29.jpg',
  'dorothy-hodgkin': 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Dorothy_Hodgkin_Nobel.jpg',
  'alice-ball': 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Alice_Augusta_Ball.jpg',
  'irene-joliot-curie': 'https://upload.wikimedia.org/wikipedia/commons/1/12/Ir%C3%A8ne_Joliot-Curie_%281897-1956%29.jpg',
  'gertrude-elion': 'https://upload.wikimedia.org/wikipedia/commons/5/50/Gertrude_Elion.jpg',
  'jennifer-doudna': 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Professor_Jennifer_Doudna_ForMemRS.jpg',
  'emmanuelle-charpentier': 'https://upload.wikimedia.org/wikipedia/commons/8/81/Emmanuelle_Charpentier_%28cropped%29.jpg',
  'tu-youyou': 'https://upload.wikimedia.org/wikipedia/commons/3/33/Tu_Youyou_5012-1-2015.jpg',

  'elizabeth-blackwell': 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Elizabeth_Blackwell.jpg',
  'barbara-mcclintock': 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Barbara_McClintock_%281902-1992%29_shown_in_her_laboratory_in_1947.jpg',
  'rachel-carson': 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Rachel-Carson.jpg',
  'jane-goodall': 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Jane_Goodall_2015.jpg',
  'mary-anning': 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Mary_Anning_painting.jpg',
  'rita-levi-montalcini': 'https://upload.wikimedia.org/wikipedia/commons/9/99/Rita_Levi_Montalcini.jpg',
  'nettie-stevens': 'https://upload.wikimedia.org/wikipedia/commons/0/08/Nettie_Stevens.jpg',
  'francoise-barre-sinoussi': 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Fran%C3%A7oise_Barr%C3%A9-Sinoussi-press_conference_Dec_06th%2C_2008-1.jpg',
  'christiane-nusslein-volhard': 'https://upload.wikimedia.org/wikipedia/commons/8/81/Christiane_N%C3%BCsslein-Volhard_mg_4383.jpg',
  'linda-buck': 'https://upload.wikimedia.org/wikipedia/commons/9/90/Linda_Buck_2015.jpg',
  'elizabeth-garrett-anderson': 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Elizabeth_Garrett_Anderson.jpg',
  'virginia-apgar': 'https://upload.wikimedia.org/wikipedia/commons/a/af/Apgar.jpg',

  'caroline-herschel': 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Caroline_Herschel.jpg',
  'henrietta-swan-leavitt': 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Henrietta_Swan_Leavitt.jpg',
  'annie-jump-cannon': 'https://upload.wikimedia.org/wikipedia/commons/5/56/Annie_Jump_Cannon_1922.jpg',
  'williamina-fleming': 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Williamina_Paton_Stevens_Fleming.jpg',
  'valentina-tereshkova': 'https://upload.wikimedia.org/wikipedia/commons/a/a8/RIAN_archive_612748_Valentina_Tereshkova.jpg',
  'sally-ride': 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Sally_Ride%2C_America%27s_first_woman_astronaut_communitcates_with_ground_controllers_from_the_flight_deck_-_NARA_-_541940.jpg',
  'mae-jemison': 'https://upload.wikimedia.org/wikipedia/commons/5/59/Mae_C._Jemison%2C_MD.jpg',
  'liu-yang': 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Liu_Yang_official_portrait.jpg',
  'peggy-whitson': 'https://upload.wikimedia.org/wikipedia/commons/0/09/Peggy_Whitson_official_portrait_2016.jpg',
  'carolyn-shoemaker': 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Carolyn_Shoemaker.jpg',

  'hedy-lamarr': 'https://upload.wikimedia.org/wikipedia/commons/8/83/Hedy_Lamarr_Publicity_Photo_for_The_Heavenly_Body_1944.jpg',
  'stephanie-kwolek': 'https://upload.wikimedia.org/wikipedia/commons/3/37/Stephanie_Kwolek_at_ceremony.jpg',
  'edith-clarke': 'https://upload.wikimedia.org/wikipedia/commons/4/44/Edith_Clarke_1948.jpg',
  'emily-warren-roebling': 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Emily_Warren_Roebling_%281843-1903%29.jpg',
  'lillian-gilbreth': 'https://upload.wikimedia.org/wikipedia/commons/0/09/Lillian_Moller_Gilbreth.jpg',
  'mary-anderson': '',
  'beulah-louise-henry': '',
  'ellen-swallow-richards': 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Ellen_Swallow_Richards.jpg',
  'bessie-coleman': 'https://upload.wikimedia.org/wikipedia/commons/5/53/Bessie_Coleman%2C_First_African_American_Pilot_-_GPN-2004-00027.jpg',
  'beatrice-shilling': '',
  'gwynne-shotwell': '',
  'limor-fried': 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Limor_Fried_-_PopTech_2012_-_Camden_Maine_USA_%288092095792%29.jpg',

  'eunice-newton-foote': '',
  'inge-lehmann': 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Inge_Lehmann.jpg',
  'marie-tharp': 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Marie_Tharp_in_her_lab.jpg',
  'wangari-maathai': 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Wangari_Maathai_portrait_by_Martin_Rowe.jpg',
  'sylvia-earle': 'https://upload.wikimedia.org/wikipedia/commons/6/67/Sylvia_Earle.jpg',
  'katia-krafft': '',

  'mary-claire-king': 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Mary-Claire_King_-_World_Economic_Forum_Annual_Meeting_2012.jpg',
  'katalin-kariko': 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Katalin_Karik%C3%B3_on_22_May_2022.jpg',
  'flossie-wong-staal': '',
  'patricia-bath': 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Patricia_Bath.jpg',
  'esther-lederberg': 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Esther_Lederberg.jpg',

  'dorothy-vaughan': 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Dorothy_Vaughan.jpg',
  'annie-easley': 'https://upload.wikimedia.org/wikipedia/commons/1/10/Annie_Easley_in_1955.jpg',
  'mary-allen-wilkes': '',
  'evelyn-boyd-granville': '',
  'gladys-west': '',
  'cynthia-breazeal': 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Cynthia_Breazeal_2014.jpg',
  'daphne-koller': 'https://upload.wikimedia.org/wikipedia/commons/6/62/Daphne_Koller_2015.jpg',
  'joy-buolamwini': '',
  'timnit-gebru': '',
  'lisa-randall': 'https://upload.wikimedia.org/wikipedia/commons/a/af/Harvard_physicist_Lisa_Randall_2006.jpg',
};

// Add image field to each pioneer
const enriched = pioneers.map(p => ({
  ...p,
  image: portraitMap[p.slug] || '',
}));

// Group by field
const byField = {};
for (const p of enriched) {
  if (!byField[p.field]) byField[p.field] = [];
  byField[p.field].push(p);
}

// Write per-field files
const outDir = join(root, 'src/data/pioneers');
mkdirSync(outDir, { recursive: true });

for (const [fieldId, list] of Object.entries(byField)) {
  writeFileSync(
    join(outDir, `${fieldId}.json`),
    JSON.stringify(list, null, 2) + '\n'
  );
  console.log(`Wrote ${fieldId}.json (${list.length} pioneers)`);
}

// Also write combined enriched file
writeFileSync(
  join(root, 'src/data/pioneers.json'),
  JSON.stringify(enriched, null, 2) + '\n'
);
console.log(`Updated pioneers.json with image URLs (${enriched.length} total)`);
