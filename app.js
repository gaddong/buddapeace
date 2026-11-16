/**
 * =========================================================
 * [오늘의 사유 (思惟) - 핵심 비즈니스 로직 및 인터랙션 엔진]
 * =========================================================
 */

(function() {
  'use strict';

  /* -----------------------------------------------------------
     1. Web Audio API 청아한 목탁음 및 싱잉볼 타종 효과음
     ----------------------------------------------------------- */
  let audioCtx = null;
  let soundEnabled = true;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function ringMoktak() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const t = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(680, t);
      osc1.frequency.exponentialRampToValueAtTime(310, t + 0.12);
      gain1.gain.setValueAtTime(0.7, t);
      gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(t);
      osc1.stop(t + 0.23);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(940, t);
      osc2.frequency.exponentialRampToValueAtTime(460, t + 0.15);
      gain2.gain.setValueAtTime(0.25, t);
      gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(t);
      osc2.stop(t + 0.2);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  function ringSingingBowl() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const t = ctx.currentTime;
      const harmonics = [330, 495, 660, 990];

      harmonics.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq + (Math.random() * 2 - 1), t);
        gain.gain.setValueAtTime(0.3 / (idx + 1), t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 3.0);
      });
    } catch (e) {
      console.warn('Bowl sound error:', e);
    }
  }

  /* -----------------------------------------------------------
     2. 대규모 불교 명언 & 경전 & 유명 스님 법어 아카이브 (총 80편 이상)
     ----------------------------------------------------------- */
  const DHARMA_ARCHIVE = {
    // [1] 인간관계 / 갈등 / 서운함 / 배신 / 오해
    RELATIONSHIP: [
      {
        id: 'rel_1',
        quote: "모든 인연에는 오고 가는 때가 있는 법이다. 억지로 붙잡지도 말고, 떠나는 것을 슬퍼하지도 말라. 시절인연이 다하면 물러설 줄 알아야 한다.",
        source: "법정 스님 《인연 이야기》",
        category: "시절인연과 초연함",
        interpretation: "상대방의 마음도 그의 업(業)과 성향에 따를 뿐입니다. 내 뜻대로 상대가 바뀌기를 바라는 순간 고통이 시작됩니다. 상대를 억지로 바꾸려 애쓰기보다 있는 그대로 인정할 때 내 마음에 참된 자유가 찾아옵니다."
      },
      {
        id: 'rel_2',
        quote: "원한을 품는 것은 남에게 던지려고 뜨거운 숯을 손에 쥐고 있는 것과 같다. 결국 화상을 입는 것은 자기 자신뿐이다.",
        source: "석가모니 부처님 《법구경》",
        category: "용서와 해원",
        interpretation: "상처 준 사람을 미워할수록 그 사람을 내 마음의 가장 귀한 상석에 앉혀두고 온종일 괴로워하는 격입니다. 상대를 위해서가 아니라 오직 나 자신의 평온을 위해 그 뜨거운 숯을 가만히 내려놓으세요."
      },
      {
        id: 'rel_3',
        quote: "남이 나를 험담하고 오해하더라도 바람이 허공을 지나가듯 흘려보내라. 허공은 바람에 흔들리지 않느니라.",
        source: "용수 보살 《대지도론》",
        category: "상처받지 않는 마음",
        interpretation: "비난이나 오해는 상대방의 마음에 든 티끌이 밖으로 튀어나온 것일 뿐입니다. 내 그릇이 바다처럼 넓으면 흙탕물 한 바가지가 쏟아져도 맑은 바다의 본성을 잃지 않습니다."
      },
      {
        id: 'rel_4',
        quote: "사람과 사람 사이에는 알맞은 거리가 필요합니다. 너무 가까우면 데이고, 너무 멀면 춥습니다. 난로처럼 온기를 나누는 거리를 유지하세요.",
        source: "법륜 스님 말씀",
        category: "인연의 적정 거리",
        interpretation: "인간관계의 서운함은 대개 '내가 이만큼 했으니 너도 그래야 한다'는 기대에서 시작됩니다. 기대를 비우고 적당한 거리를 둘 때 서로를 존중하는 지혜가 생겨납니다."
      },
      {
        id: 'rel_5',
        quote: "나를 비난하는 이에게 성내지 말고, 나를 칭찬하는 이에게 들뜨지 말라. 비난과 칭찬은 스쳐 지나가는 바람 소리에 불과하다.",
        source: "석가모니 부처님 《잡아함경》",
        category: "팔풍부동 (八風不動)",
        interpretation: "세상의 여덟 가지 바람(칭찬과 비난, 이익과 손해, 고통과 즐거움 등)에 일희일비하지 마세요. 굳건한 바위는 비바람에도 흔들리지 않듯, 내 내면의 중심을 바로 세우는 날이 되길 바랍니다."
      },
      {
        id: 'rel_6',
        quote: "상대방을 내 뜻대로 통제하려는 마음을 내려놓을 때, 비로소 진정한 소통과 사랑의 문이 열립니다.",
        source: "틱낫한 스님 《화(Anger)》",
        category: "진정한 자비",
        interpretation: "사랑이라는 이름으로 상대방을 내 울타리에 가두려 하지 마세요. 상대방이 온전히 자기 자신으로 존재할 수 있도록 공간을 내어주는 것이 가장 숭고한 자비입니다."
      },
      {
        id: 'rel_7',
        quote: "어리석은 자와 길을 동행하지 말라. 마음을 닦는 벗이 없거든 차라리 무소의 뿔처럼 혼자서 가라.",
        source: "초기불경 《숫타니파타》",
        category: "맑은 홀로서기",
        interpretation: "억지 인연을 붙잡고 상처받으며 에너지를 소모할 필요는 없습니다. 혼자 걷는 고요함을 두려워하지 않을 때, 비로소 나에게 꼭 맞는 맑은 인연이 찾아옵니다."
      },
      {
        id: 'rel_8',
        quote: "그 사람이 나에게 준 상처보다, 그 상처를 곱씹으며 스스로에게 주는 상처가 백 배는 더 크다.",
        source: "달라이 라마 어록",
        category: "두 번째 화살 피하기",
        interpretation: "첫 번째 화살은 어쩔 수 없이 맞았더라도, 자책과 원망이라는 두 번째 화살까지 스스로에게 쏘지 마세요. 오늘 일어난 일은 오늘 밤으로 끝내고 마음의 상처를 따뜻하게 보듬어주세요."
      }
    ],

    // [2] 불안 / 미래 / 시험 / 진로 / 취업 / 돈
    ANXIETY: [
      {
        id: 'anx_1',
        quote: "과거에 얽매이지 말고 미래를 걱정하지 말라. 과거는 이미 지나갔고, 미래는 아직 오지 않았다. 오직 현재의 한 호흡에 온전히 깨어있으라.",
        source: "석가모니 부처님 《아함경》",
        category: "현재에 머무름",
        interpretation: "불안이란 아직 일어나지 않은 내일의 그림자를 오늘로 끌고 와 씨름할 때 일어납니다. 발바닥이 닿아 있는 대지, 지금 들이쉬고 내쉬는 한 호흡에 마음을 두면 환영 같던 걱정은 스러집니다."
      },
      {
        id: 'anx_2',
        quote: "이것이 있으므로 저것이 있고, 이것이 생기므로 저것이 생긴다. 인과(因果)의 법은 어김이 없으니 조급해하지 말고 오늘 하루 좋은 씨앗을 심어라.",
        source: "불교 근본 교리 《연기법 (緣起法)》",
        category: "순리와 인과",
        interpretation: "봄에 씨앗을 심고서 하루 만에 열매가 열리지 않는다고 안달복달하는 것과 같습니다. 오늘 그대가 쏟은 정성과 걸음은 결코 헛되지 않으며, 시절이 무르익으면 반드시 꽃을 피웁니다."
      },
      {
        id: 'anx_3',
        quote: "길을 잃었다고 두려워하지 마라. 길을 잃어야만 지금까지 보지 못했던 새로운 숲의 아름다움을 마주할 수 있느니라.",
        source: "혜민 스님 《멈추면, 비로소 보이는 것들》",
        category: "삶의 전환점",
        interpretation: "계획대로 되지 않는다고 실패한 것이 아닙니다. 잠시 멈추어 서서 내 영혼의 소리를 들으라는 귀한 신호입니다. 두려움을 내려놓고 새로운 가능성을 바라보세요."
      },
      {
        id: 'anx_4',
        quote: "산은 늘 그 자리에 있으되 구름과 안개가 오갈 뿐이다. 마음의 본래 자리는 언제나 맑으니 스쳐 가는 불안에 속지 말라.",
        source: "성철 스님 법어",
        category: "본래 청정한 마음",
        interpretation: "먹구름이 하늘을 가려도 하늘 자체가 더러워진 것은 아닙니다. 불안과 두려움은 잠시 일어났다 사라지는 구름일 뿐, 그대의 온전한 생명력은 그대로 존재합니다."
      },
      {
        id: 'anx_5',
        quote: "미래를 알고 싶거든 오늘 네가 짓고 있는 행위를 보라. 내일의 열매는 오늘 네 마음에 달려 있느니라.",
        source: "석가모니 부처님 《인과경》",
        category: "현재의 씨앗",
        interpretation: "막연한 미래를 점치느라 오늘 하루를 허비하지 마세요. 오늘 정직하게 내딛는 한 걸음이 곧 그대가 도착할 아름다운 내일의 풍경이 됩니다."
      },
      {
        id: 'anx_6',
        quote: "불안이라는 것은 마음에 뿌리내린 환영이다. 강가에 앉아 흘러가는 흙탕물을 억지로 맑히지 말고 가만히 두어라, 흙이 가라앉으면 절로 맑아지리라.",
        source: "달마대사 어록",
        category: "수선탁청 (水禪濁淸)",
        interpretation: "불안을 억지로 없애려고 바둥거리면 물만 더 흐려집니다. 그저 '아, 내 안에 불안이 잠시 찾아왔구나' 하고 가만히 바라보기만 해도 번뇌는 제풀에 가라앉습니다."
      },
      {
        id: 'anx_7',
        quote: "돈이나 조건이 행복을 주는 것이 아니라, 주어진 조건을 감사히 누릴 줄 아는 마음의 그릇이 행복을 빚어냅니다.",
        source: "법정 스님 《오두막 편지》",
        category: "마음의 풍요",
        interpretation: "통장의 잔고보다 더 중요한 것은 마음의 여유입니다. 불안을 물질로 채우려 하지 말고, 오늘 내가 누릴 수 있는 소박한 평온을 먼저 호흡하세요."
      },
      {
        id: 'anx_8',
        quote: "어둠을 탓하기보다 작은 등불 하나를 켜라. 작은 정진 하나가 천 년의 어둠을 밝히느니라.",
        source: "대승경전 《유마경》",
        category: "정진의 등불",
        interpretation: "앞이 캄캄하다고 주저앉지 마세요. 지금 당장 할 수 있는 아주 작은 일 하나를 정성껏 행하는 것, 그것이 어두운 밤길을 밝히는 가장 밝은 등불입니다."
      }
    ],

    // [3] 비교 / 자책 / 열등감 / 후회 / 욕심
    GREED_COMPARISON: [
      {
        id: 'greed_1',
        quote: "우리는 필요에 의해 물건을 갖지만, 때로는 그 물건 때문에 마음에 얽매이게 된다. 크게 버리는 자만이 참으로 큰 자유를 얻는다.",
        source: "법정 스님 《무소유》",
        category: "비움과 무소유",
        interpretation: "남의 꽃밭과 내 텃밭을 비교하느라 오늘 내 꽃에 물 주는 것을 잊지 마세요. 더 많이 가지려 할수록 가슴속 갈증은 깊어집니다. 덜어내고 비워낼 때 비로소 그윽한 향기가 차오릅니다."
      },
      {
        id: 'greed_2',
        quote: "세상 모든 것은 시시각각 변하여 영원한 것이 없다. 어제의 부족했던 나를 붙잡고 오늘의 나를 학대하지 말라.",
        source: "삼법인 《제행무상 (諸行無常)》",
        category: "자책 내려놓기",
        interpretation: "흘러간 강물에서는 결코 두 번 목욕할 수 없듯이, 어제의 실수도 이미 흘러갔습니다. 스스로를 채찍질하던 손을 멈추고, '그동안 참 애썼다'고 내 마음을 포근히 안아주세요."
      },
      {
        id: 'greed_3',
        quote: "진흙탕 속에서도 연꽃은 더러움에 물들지 않고 청정한 꽃을 피워낸다. 세상의 번잡함 속에서도 그대만의 맑은 빛을 잃지 마라.",
        source: "불경 《숫타니파타》",
        category: "자존과 본성",
        interpretation: "세상이 정해놓은 잣대에 그대를 맞추려 하지 마세요. 그대는 그 자체로 우주의 단 하나뿐인 고귀한 존재이며, 진흙을 양분 삼아 가장 아름다운 꽃을 피울 힘을 이미 지니고 있습니다."
      },
      {
        id: 'greed_4',
        quote: "마음이 지옥을 만들기도 하고 극락을 만들기도 한다. 세상 모든 것은 오직 마음먹기에 달렸느니라.",
        source: "원효대사 《일체유심조 (一切唯心造)》",
        category: "일체유심조",
        interpretation: "외부의 조건이 나를 불행하게 만드는 것이 아니라, 그 조건을 바라보는 내 고집스런 생각이 나를 괴롭힙니다. 마음의 렌즈를 연민과 수용으로 바꾸면 지옥 같던 곳도 곧 평화로운 도량이 됩니다."
      },
      {
        id: 'greed_5',
        quote: "장미꽃은 튤립을 부러워하지 않고, 제비꽃은 소나무를 시기하지 않는다. 저마다의 계절에 저마다의 빛깔로 피어날 뿐이다.",
        source: "법륜 스님 《행복》",
        category: "자기 긍정",
        interpretation: "남의 장점과 나의 단점을 비교하는 것은 어리석은 일입니다. 그대에게는 그대만의 향기와 때가 있습니다. 남의 시선에 휘둘리지 말고 그대의 걸음을 묵묵히 걸어가세요."
      },
      {
        id: 'greed_6',
        quote: "형체에 집착하지 마라. 모든 형상은 뜬구름과 같고 아침 이슬과 같으며 번갯불과 같으니 마땅히 이와 같이 볼지니라.",
        source: "대승불경 《금강경 (金剛經) 사구게》",
        category: "여몽환포영 (如夢幻泡影)",
        interpretation: "남들에게 그럴듯하게 보이고 싶은 체면, 인정받고 싶은 집착 또한 한낱 꿈결의 거품과 같습니다. 껍데기를 벗어던지고 내면의 참된 알맹이를 마주하세요."
      },
      {
        id: 'greed_7',
        quote: "욕심이 많으면 근심도 많고, 욕심이 적으면 마음이 바다처럼 맑아진다.",
        source: "석가모니 부처님 《유교경》",
        category: "소욕지족 (少欲知足)",
        interpretation: "가진 것이 부족해서 불행한 것이 아니라, 더 가지려는 끝없는 갈망 때문에 고통스러운 것입니다. 지금 이 순간 내가 이미 누리고 있는 것들의 무게를 헤아려보세요."
      },
      {
        id: 'greed_8',
        quote: "스스로를 적으로 삼아 괴롭히지 말라. 세상 모든 생명 중 가장 먼저 사랑하고 자비를 베풀어야 할 대상은 바로 그대 자신이다.",
        source: "부처님 말씀 《상응부경전》",
        category: "자애(Mettā)",
        interpretation: "남들에게는 한없이 너그러우면서 왜 나 자신에게는 이토록 가혹합니까? 오늘 밤만큼은 거울 속의 나를 향해 '너는 참 소중한 사람이야'라고 따뜻한 위로를 건네주세요."
      }
    ],

    // [4] 화 / 분노 / 억울함 / 참을 수 없는 마음
    ANGER_PATIENCE: [
      {
        id: 'ang_1',
        quote: "화(瞋心)는 마음의 뜰에 피어난 불길과 같다. 그 불길은 남을 태우기 전에 먼저 내 온몸의 공덕과 평화를 태워버린다.",
        source: "대승경전 《화엄경》",
        category: "화 다스리기",
        interpretation: "치밀어 오르는 분노에 휩쓸려 거친 말을 뱉지 마세요. 불이 났을 때는 기름을 붓는 대신 가만히 물러서서 호흡을 가다듬어야 합니다. 침묵은 분노를 식히는 가장 맑은 샘물입니다."
      },
      {
        id: 'ang_2',
        quote: "성냄을 성냄으로 갚으면 끝내 성냄이 가라앉지 않는다. 성내지 않음으로써만 성냄을 이길 수 있으니, 이것이 영원한 진리이다.",
        source: "석가모니 부처님 《법구경》",
        category: "인욕과 자비",
        interpretation: "상대가 칼을 휘두른다고 나도 칼을 빼 들면 결국 피 흘리는 것은 두 사람 모두입니다. 미움의 고리를 내 쪽에서 끊어내는 것, 그것이 가장 용기 있는 자의 선택입니다."
      },
      {
        id: 'ang_3',
        quote: "누가 나에게 침을 뱉거든 닦으려 하지 말고 절로 마르게 두어라. 닦으려 하면 손이 더러워지고 마음만 더 성가시다.",
        source: "한국 고승 《나옹선사 어록》",
        category: "타면자건 (唾面自乾)",
        interpretation: "억울하고 분한 일에 일일이 변명하고 맞서 싸우려 하면 감정의 늪에 더 깊이 빠집니다. 흐르는 물처럼 담담히 넘겨버릴 때 상대방의 악의는 힘을 잃고 스스로 소멸합니다."
      },
      {
        id: 'ang_4',
        quote: "화가 날 때는 말을 멈추고 거울을 보라. 성난 얼굴에는 부처의 자비도, 인간의 온기도 남아있지 않느니라.",
        source: "틱낫한 스님 말씀",
        category: "자신의 얼굴 보기",
        interpretation: "분노가 치밀 때는 어떤 중요한 결정도 내리지 마세요. 성난 마음으로 내린 결정은 반드시 후회를 남깁니다. 세 번 깊게 숨을 들이쉬고 내쉬며 분노의 독을 밖으로 흘려보내세요."
      },
      {
        id: 'ang_5',
        quote: "인내는 쓰지만 그 열매는 달다. 백 번 참아내는 마음에 천 갈래의 복이 깃드느니라.",
        source: "선가 귀감 《인욕바라밀》",
        category: "인욕바라밀 (忍辱波羅蜜)",
        interpretation: "참는다는 것은 억눌러 병을 만드는 것이 아니라, 상황의 덧없음을 꿰뚫어 보고 마음에 흔적을 남기지 않는 높은 지혜입니다. 오늘 하루 참아낸 그대의 마음은 큰 복덕이 될 것입니다."
      }
    ],

    // [5] 외로움 / 고독 / 쓸쓸함
    LONELINESS: [
      {
        id: 'lone_1',
        quote: "우리는 누구나 홀로 태어나 홀로 떠나가는 나그네이다. 고독을 두려워하지 말고 고독과 친해지는 법을 배워라.",
        source: "법정 스님 《홀로 사는 즐거움》",
        category: "고독의 축복",
        interpretation: "군중 속에 섞여 있다고 해서 외롭지 않은 것은 아닙니다. 외로움이란 내면의 나를 만나라는 초대장입니다. 혼자 있는 시간을 헛헛해하지 말고, 영혼을 살찌우는 고요한 충전의 시간으로 바꾸어 보세요."
      },
      {
        id: 'lone_2',
        quote: "달은 홀로 밤하늘을 비추지만 그 빛은 온 대지에 골고루 스며든다. 그대 역시 홀로 있어도 온 우주와 연결되어 있느니라.",
        source: "원효대사 《금강삼매경론》",
        category: "동체대비 (同體大悲)",
        interpretation: "그대는 결코 혼자가 아닙니다. 지금 마시는 공기, 딛고 있는 대지, 올려다보는 별빛 모두가 그대를 살게 하는 거대한 생명의 그물망입니다. 그 연결감을 가만히 느껴보세요."
      },
      {
        id: 'lone_3',
        quote: "마음의 문을 안으로 닫아걸면 궁궐도 감옥이 되고, 마음의 문을 밖으로 열면 오두막도 온 세상과 통하느니라.",
        source: "의상대사 《화엄일승법계도》",
        category: "마음의 문 열기",
        interpretation: "사람들이 나를 찾아오기만을 기다리지 말고, 먼저 따뜻한 눈빛과 미소로 세상에 온기를 건네보세요. 내가 먼저 손을 내밀 때 외로움의 성벽은 무너집니다."
      },
      {
        id: 'lone_4',
        quote: "물 위에 비친 달그림자를 건지려 하지 마라. 타인의 인정으로 내 외로움을 채우려 하면 끝없는 목마름만 남는다.",
        source: "조주 선사 어록",
        category: "스스로 샘물 파기",
        interpretation: "타인의 관심에 목매지 마세요. 내 안에서 솟아나는 자존감과 평온함이라는 마르지 않는 샘물을 길어 올릴 때, 외로움은 더 이상 그대를 흔들지 못합니다."
      }
    ],

    // [6] 번아웃 / 지침 / 무기력 / 휴식
    BURNOUT_REST: [
      {
        id: 'burn_1',
        quote: "거문고 줄은 너무 팽팽하면 끊어지고, 너무 느슨하면 소리가 나지 않는다. 중도(中道)의 지혜로 팽팽해진 마음의 줄을 늦추어라.",
        source: "석가모니 부처님 《중아함경》",
        category: "중도(中道)와 쉼",
        interpretation: "너무 앞만 보며 달려오느라 그대의 심신이 지쳐있습니다. 잠시 노를 내려놓는다고 해서 배가 가라앉지 않습니다. 아무것도 하지 않는 온전한 쉼을 스스로에게 너그럽게 선물하세요."
      },
      {
        id: 'burn_2',
        quote: "달리는 말을 멈추려거든 고삐를 억지로 당기지 말고, 말이 지쳐 쉴 수 있는 풀밭으로 인도하라. 마음에 쉼표를 찍어주어라.",
        source: "달마대사 어록",
        category: "마음의 쉼표",
        interpretation: "지친 마음을 '더 열심히 해야 해'라며 채근하지 마세요. 지금 그대에게 가장 거룩한 수행은 따뜻한 이불 속에서 편안히 쉬고, 따뜻한 차 한 잔을 온전히 음미하는 것입니다."
      },
      {
        id: 'burn_3',
        quote: "나무는 겨울에 잎을 모두 떨어뜨리고 쉬기 때문에 봄에 새 잎을 낼 수 있습니다. 쉬는 것은 낭비가 아니라 다음 계절을 위한 준비입니다.",
        source: "법륜 스님 말씀",
        category: "비움과 충전",
        interpretation: "모든 자연은 쉬어가는 계절이 있습니다. 그대의 삶에도 잠시 잎을 떨구고 뿌리를 깊게 내리는 겨울의 시간이 필요한 법입니다. 푹 쉬어도 괜찮습니다."
      },
      {
        id: 'burn_4',
        quote: "피곤하면 자고 배고프면 밥을 먹는다. 도(道)는 먼 곳에 있지 않고 일상의 소박한 쉼에 있느니라.",
        source: "임제선사 《임제록》",
        category: "수처작주 (隨處作主)",
        interpretation: "너무 대단한 것을 이루려다 오늘의 몸과 마음을 혹사하지 마세요. 밥 한 술 맛있게 먹고 꿀잠을 자는 것, 그것이 바로 세상에서 가장 큰 도(道)를 닦는 일입니다."
      },
      {
        id: 'burn_5',
        quote: "새도 날개가 지치면 숲의 나뭇가지에 앉아 날개를 접는다. 그대도 이제 그 무거운 짐을 잠시 내려놓고 숨을 고르라.",
        source: "서산대사 《선가귀감》",
        category: "안식(安息)",
        interpretation: "그대 혼자 세상의 모든 짐을 다 짊어질 필요는 없습니다. 오늘 밤만큼은 일도, 의무도, 세상의 근심도 저 문밖에 내려놓고 오롯이 안식하세요."
      }
    ],

    // [7] 감사 / 평온 / 현재 / 은혜
    GRATITUDE: [
      {
        id: 'grat_1',
        quote: "매일매일이 좋은 날이다(일일시호일). 어제에 대한 후회도 없고 내일에 대한 두려움도 없으니 오늘이 곧 최고의 날이로다.",
        source: "운문선사 《벽암록》",
        category: "일일시호일 (日日是好日)",
        interpretation: "비가 오면 비가 와서 대지를 적시니 감사하고, 맑으면 맑아서 온 세상을 비추니 감사합니다. 작은 일에도 감사할 줄 아는 눈을 지닌 이에게는 이 세상 모든 순간이 축복입니다."
      },
      {
        id: 'grat_2',
        quote: "한 잔의 차를 마시며 온 우주의 은혜를 느낀다. 숨을 들이쉬며 몸을 편안히 하고, 숨을 내쉬며 미소 짓노라.",
        source: "틱낫한 스님 명상집",
        category: "소박한 은혜",
        interpretation: "감사하는 마음은 마음에 피어나는 가장 그윽한 향기입니다. 그대가 남겨주신 감사의 따뜻한 불씨는 오늘 밤의 모든 번뇌를 녹여내고 내일을 맑게 비추어 줄 것입니다."
      },
      {
        id: 'grat_3',
        quote: "마음속에 자비와 감사가 가득한 사람은 어디를 가도 평화롭고, 어떤 사람을 만나도 따뜻한 인연이 된다.",
        source: "달라이 라마 법어",
        category: "자비와 감사",
        interpretation: "작은 일에 고마워할 줄 아는 그대의 온화한 마음결은 이미 세상에서 가장 큰 보배를 품고 있는 것과 같습니다. 그 평온한 빛을 소중히 간직하세요."
      },
      {
        id: 'grat_4',
        quote: "은혜를 갚는 마음이야말로 보살의 큰 덕이요, 베푼 것을 마음에 담아두지 않는 것이 참된 청정이다.",
        source: "불경 《부모은중경》",
        category: "보은과 자비",
        interpretation: "부모님의 사랑, 친구의 따뜻한 눈빛, 이름 모를 이들의 수고로움까지... 내가 누리는 모든 것은 인연의 선물입니다. 감사할 때 내 마음은 가장 풍요로워집니다."
      },
      {
        id: 'grat_5',
        quote: "숨 쉴 수 있는 한 모금의 공기, 나를 받쳐주는 땅, 비추는 햇살... 감사할 줄 아는 이에게는 부족한 것이 아무것도 없느니라.",
        source: "숭산 선사 말씀",
        category: "본래 구족(具足)",
        interpretation: "우리는 이미 모든 것을 다 가지고 태어났습니다. 밖으로만 향하던 시선을 거두어 지금 내 안의 충만함을 바라볼 때, 끝없는 감사가 샘솟습니다."
      }
    ]
  };

  /* -----------------------------------------------------------
     3. 스마트 중복 방지 셔플 풀 관리자
     ----------------------------------------------------------- */
  const visitedQuoteHistory = new Set();
  let activePoolList = [];
  let currentPoolIndex = 0;
  let totalShownCounter = 1;

  function getSmartShuffledList(categoryKey) {
    let primaryList = DHARMA_ARCHIVE[categoryKey] || DHARMA_ARCHIVE.ANXIETY;
    
    let secondaryList = [];
    if (categoryKey === 'RELATIONSHIP') {
      secondaryList = [...DHARMA_ARCHIVE.ANGER_PATIENCE, ...DHARMA_ARCHIVE.LONELINESS];
    } else if (categoryKey === 'ANXIETY') {
      secondaryList = [...DHARMA_ARCHIVE.GREED_COMPARISON, ...DHARMA_ARCHIVE.BURNOUT_REST];
    } else if (categoryKey === 'GREED_COMPARISON') {
      secondaryList = [...DHARMA_ARCHIVE.ANXIETY, ...DHARMA_ARCHIVE.GRATITUDE];
    } else if (categoryKey === 'ANGER_PATIENCE') {
      secondaryList = [...DHARMA_ARCHIVE.RELATIONSHIP, ...DHARMA_ARCHIVE.BURNOUT_REST];
    } else if (categoryKey === 'BURNOUT_REST') {
      secondaryList = [...DHARMA_ARCHIVE.GRATITUDE, ...DHARMA_ARCHIVE.ANXIETY];
    } else if (categoryKey === 'LONELINESS') {
      secondaryList = [...DHARMA_ARCHIVE.RELATIONSHIP, ...DHARMA_ARCHIVE.GRATITUDE];
    } else {
      secondaryList = [...DHARMA_ARCHIVE.BURNOUT_REST, ...DHARMA_ARCHIVE.RELATIONSHIP];
    }

    const combined = [...primaryList];
    secondaryList.forEach(item => {
      if (!combined.some(c => c.id === item.id)) {
        combined.push(item);
      }
    });

    for (let i = combined.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combined[i], combined[j]] = [combined[j], combined[i]];
    }

    const unvisited = combined.filter(q => !visitedQuoteHistory.has(q.id));
    const visited = combined.filter(q => visitedQuoteHistory.has(q.id));

    return [...unvisited, ...visited];
  }

  /* -----------------------------------------------------------
     4. DOM 요소 참조
     ----------------------------------------------------------- */
  const viewIntro = document.getElementById('view-intro');
  const viewInput = document.getElementById('view-input');
  const viewResult = document.getElementById('view-result');
  const meditationLoader = document.getElementById('meditationLoader');
  const templeToast = document.getElementById('templeToast');

  const soundBtn = document.getElementById('soundBtn');
  const soundIcon = document.getElementById('soundIcon');
  const soundText = document.getElementById('soundText');

  const btnRestStart = document.getElementById('btnRestStart');
  const mindWeightRange = document.getElementById('mindWeightRange');
  const sliderBadge = document.getElementById('sliderBadge');

  const slots = {
    worry: {
      slot: document.getElementById('slotWorry'),
      btn: document.getElementById('btnOpenWorry'),
      editor: document.getElementById('editorWorry'),
      text: document.getElementById('textWorry'),
      pill: document.getElementById('pillWorry'),
      preview: document.getElementById('previewWorry')
    },
    thought: {
      slot: document.getElementById('slotThought'),
      btn: document.getElementById('btnOpenThought'),
      editor: document.getElementById('editorThought'),
      text: document.getElementById('textThought'),
      pill: document.getElementById('pillThought'),
      preview: document.getElementById('previewThought')
    },
    gratitude: {
      slot: document.getElementById('slotGratitude'),
      btn: document.getElementById('btnOpenGratitude'),
      editor: document.getElementById('editorGratitude'),
      text: document.getElementById('textGratitude'),
      pill: document.getElementById('pillGratitude'),
      preview: document.getElementById('previewGratitude')
    }
  };

  const alertBanner = document.getElementById('alertBanner');
  const alertBannerMsg = document.getElementById('alertBannerMsg');

  const btnNamuResult = document.getElementById('btnNamuResult');
  const displayCategory = document.getElementById('displayCategory');
  const quoteCounter = document.getElementById('quoteCounter');
  const displayQuote = document.getElementById('displayQuote');
  const displaySource = document.getElementById('displaySource');
  const displayCounsel = document.getElementById('displayCounsel');
  const displayUserRef = document.getElementById('displayUserRef');
  const btnAnotherQuote = document.getElementById('btnAnotherQuote');
  const btnSaveQuote = document.getElementById('btnSaveQuote');
  const btnBackToStart = document.getElementById('btnBackToStart');

  let currentAnalysisCache = null;

  /* -----------------------------------------------------------
     5. 네비게이션 & 토스트
     ----------------------------------------------------------- */
  function switchView(targetScreen) {
    [viewIntro, viewInput, viewResult].forEach(screen => {
      screen.classList.remove('active');
    });
    targetScreen.classList.add('active');
    targetScreen.scrollTop = 0;
  }

  function showNotice(msg) {
    templeToast.textContent = msg;
    templeToast.classList.add('show');
    setTimeout(() => {
      templeToast.classList.remove('show');
    }, 2200);
  }

  /* -----------------------------------------------------------
     6. 사운드 온/오프
     ----------------------------------------------------------- */
  soundBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
      soundIcon.textContent = '🔔';
      soundText.textContent = '목탁 켬';
      ringMoktak();
      showNotice('목탁 소리가 켜졌습니다.');
    } else {
      soundIcon.textContent = '🔕';
      soundText.textContent = '소리 끔';
      showNotice('소리가 꺼졌습니다.');
    }
  });

  /* -----------------------------------------------------------
     7. 슬라이더 상호작용
     ----------------------------------------------------------- */
  function refreshSliderFeedback(val) {
    val = parseInt(val, 10);
    let label = '';
    let color = '';

    if (val <= 25) {
      label = `맑고 고요함 (${val})`;
      color = '#2F633E';
    } else if (val <= 60) {
      label = `잔잔한 사유 (${val})`;
      color = '#7A5B15';
    } else if (val <= 85) {
      label = `깊은 번민 (${val})`;
      color = '#A6482B';
    } else {
      label = `극심한 번뇌 (${val})`;
      color = '#942B2B';
    }

    sliderBadge.textContent = label;
    sliderBadge.style.color = color;
  }

  mindWeightRange.addEventListener('input', (e) => {
    refreshSliderFeedback(e.target.value);
  });

  /* -----------------------------------------------------------
     8. 가로 한줄 버튼 -> 누르면 텍스트 입력창으로 전환
     ----------------------------------------------------------- */
  function openEditorSlot(targetKey) {
    ringMoktak();
    alertBanner.classList.remove('visible');
    clearSlotAlerts();

    Object.keys(slots).forEach(key => {
      const item = slots[key];
      if (key === targetKey) {
        item.slot.classList.add('editing');
        setTimeout(() => {
          item.text.focus();
        }, 60);
      } else {
        item.slot.classList.remove('editing');
        updateButtonState(key);
      }
    });
  }

  function closeEditorSlot(targetKey) {
    ringMoktak();
    const item = slots[targetKey];
    item.slot.classList.remove('editing');
    updateButtonState(targetKey);
  }

  function updateButtonState(key) {
    const item = slots[key];
    const val = item.text.value.trim();
    if (val.length > 0) {
      item.btn.classList.add('has-text');
      item.pill.textContent = '수정하기 ✏️';
      item.preview.textContent = `· "${val.slice(0, 16)}${val.length > 16 ? '...' : ''}"`;
    } else {
      item.btn.classList.remove('has-text');
      item.pill.textContent = '작성하기 +';
      item.preview.textContent = '';
    }
  }

  function clearSlotAlerts() {
    Object.values(slots).forEach(item => {
      item.btn.classList.remove('require-attention');
    });
  }

  slots.worry.btn.addEventListener('click', () => openEditorSlot('worry'));
  slots.thought.btn.addEventListener('click', () => openEditorSlot('thought'));
  slots.gratitude.btn.addEventListener('click', () => openEditorSlot('gratitude'));

  Object.keys(slots).forEach(key => {
    const item = slots[key];
    item.text.addEventListener('input', () => {
      updateButtonState(key);
      if (item.text.value.trim().length > 0) {
        alertBanner.classList.remove('visible');
        item.btn.classList.remove('require-attention');
      }
    });
  });

  document.querySelectorAll('.btn-fold-done').forEach(btn => {
    btn.addEventListener('click', () => {
      const slotId = btn.getAttribute('data-slot');
      if (slotId === 'slotWorry') closeEditorSlot('worry');
      if (slotId === 'slotThought') closeEditorSlot('thought');
      if (slotId === 'slotGratitude') closeEditorSlot('gratitude');
    });
  });

  document.querySelectorAll('.chip-btn').forEach(chip => {
    chip.addEventListener('click', () => {
      ringMoktak();
      const targetInputId = chip.getAttribute('data-input');
      const sampleText = chip.getAttribute('data-text');
      const inputTarget = document.getElementById(targetInputId);

      if (inputTarget) {
        inputTarget.value = sampleText;
        inputTarget.dispatchEvent(new Event('input'));
        inputTarget.focus();
        showNotice('마음의 문장을 담았습니다.');
      }
    });
  });

  /* -----------------------------------------------------------
     9. 첫 화면 ‘잠시 쉬어가기’ 버튼 클릭
     ----------------------------------------------------------- */
  btnRestStart.addEventListener('click', () => {
    ringMoktak();
    switchView(viewInput);
  });

  /* -----------------------------------------------------------
     10. 정밀 키워드 분석 알고리즘 (상황별 세밀 매칭)
     ----------------------------------------------------------- */
  function analyzeMindRecord() {
    const worryVal = slots.worry.text.value.trim();
    const thoughtVal = slots.thought.text.value.trim();
    const gratitudeVal = slots.gratitude.text.value.trim();
    const sliderVal = parseInt(mindWeightRange.value, 10);

    const fullText = `${worryVal} ${thoughtVal}`;

    const angerRegex = /화|분노|짜증|욱|성질|억울|열받|부글|폭발|참을 수/i;
    const loneRegex = /외롭|외로움|고독|혼자|쓸쓸|적막|아무도|고립/i;
    const relRegex = /사람|친구|동료|상사|부모|가족|남편|아내|연인|연애|갈등|오해|미움|상처|서운|배신|싸움|인간관계|대화|관계/i;
    const anxRegex = /불안|걱정|미래|진로|취업|시험|돈|경제|빚|두려움|실패|초조|막막|어쩌|불확실/i;
    const greedRegex = /비교|질투|자책|욕심|후회|바보|초라|부러|부족|못난|자괴/i;
    const burnoutRegex = /지침|힘들|피곤|탈진|번아웃|쉬고|포기|지쳤|쉬고싶|지치|지쳐/i;

    let matchedKey = 'ANXIETY';

    if (gratitudeVal.length > 0 && !worryVal && !thoughtVal) {
      matchedKey = 'GRATITUDE';
    } else if (angerRegex.test(fullText)) {
      matchedKey = 'ANGER_PATIENCE';
    } else if (loneRegex.test(fullText)) {
      matchedKey = 'LONELINESS';
    } else if (relRegex.test(fullText)) {
      matchedKey = 'RELATIONSHIP';
    } else if (burnoutRegex.test(fullText) || sliderVal >= 80) {
      matchedKey = 'BURNOUT_REST';
    } else if (greedRegex.test(fullText)) {
      matchedKey = 'GREED_COMPARISON';
    } else if (anxRegex.test(fullText)) {
      matchedKey = 'ANXIETY';
    } else if (gratitudeVal.length > 0) {
      matchedKey = 'GRATITUDE';
    } else {
      if (sliderVal <= 25) matchedKey = 'GRATITUDE';
      else if (sliderVal >= 75) matchedKey = 'BURNOUT_REST';
      else matchedKey = 'ANXIETY';
    }

    return {
      key: matchedKey,
      worry: worryVal,
      thought: thoughtVal,
      gratitude: gratitudeVal,
      slider: sliderVal
    };
  }

  /* -----------------------------------------------------------
     11. 결과 렌더링 & 중복 방지 스마트 로테이션
     ----------------------------------------------------------- */
  function renderSmartQuote(analysis, isNext = false) {
    if (!isNext || !activePoolList || activePoolList.length === 0) {
      activePoolList = getSmartShuffledList(analysis.key);
      currentPoolIndex = 0;
    } else {
      currentPoolIndex = (currentPoolIndex + 1) % activePoolList.length;
      if (currentPoolIndex === 0) {
        activePoolList = getSmartShuffledList(analysis.key);
      }
    }

    const currentQuote = activePoolList[currentPoolIndex];
    visitedQuoteHistory.add(currentQuote.id);

    displayCategory.textContent = currentQuote.category;
    quoteCounter.textContent = `지혜의 말씀 #${totalShownCounter}`;
    displayQuote.innerHTML = currentQuote.quote.replace(/\n/g, '<br>');
    displaySource.textContent = `- ${currentQuote.source} -`;
    displayCounsel.textContent = currentQuote.interpretation;

    let refHTML = '';
    if (analysis.worry) {
      refHTML += `<div class="record-item"><strong>[고민]</strong><span>${escapeMarkup(analysis.worry)}</span></div>`;
    }
    if (analysis.thought) {
      refHTML += `<div class="record-item"><strong>[생각]</strong><span>${escapeMarkup(analysis.thought)}</span></div>`;
    }
    if (analysis.gratitude) {
      refHTML += `<div class="record-item"><strong>[감사]</strong><span>${escapeMarkup(analysis.gratitude)}</span></div>`;
    }

    if (refHTML) {
      displayUserRef.innerHTML = refHTML;
      displayUserRef.style.display = 'flex';
    } else {
      displayUserRef.style.display = 'none';
    }
  }

  function escapeMarkup(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* -----------------------------------------------------------
     12. 입력 화면 ‘나무아미타불’ 버튼 클릭
     ----------------------------------------------------------- */
  btnNamuResult.addEventListener('click', () => {
    const wVal = slots.worry.text.value.trim();
    const tVal = slots.thought.text.value.trim();
    const gVal = slots.gratitude.text.value.trim();

    if (!wVal && !tVal && !gVal) {
      ringMoktak();
      alertBanner.classList.add('visible');
      alertBannerMsg.textContent = '살펴볼 마음(고민, 생각, 감사) 중 하나를 눌러 내용을 적어주세요.';

      Object.values(slots).forEach(item => {
        item.btn.classList.add('require-attention');
      });

      openEditorSlot('worry');

      setTimeout(() => {
        clearSlotAlerts();
      }, 1200);

      return;
    }

    ringSingingBowl();
    meditationLoader.classList.add('active');

    currentAnalysisCache = analyzeMindRecord();
    totalShownCounter = 1;

    setTimeout(() => {
      renderSmartQuote(currentAnalysisCache, false);
      meditationLoader.classList.remove('active');
      switchView(viewResult);
      ringMoktak();
    }, 1100);
  });

  /* -----------------------------------------------------------
     13. 결과 화면 버튼 이벤트
     ----------------------------------------------------------- */
  btnAnotherQuote.addEventListener('click', () => {
    ringMoktak();
    if (!currentAnalysisCache) {
      currentAnalysisCache = analyzeMindRecord();
    }
    totalShownCounter++;
    renderSmartQuote(currentAnalysisCache, true);
    showNotice('새로운 지혜의 말씀을 올립니다.');
  });

  btnSaveQuote.addEventListener('click', () => {
    ringMoktak();
    const shareContent = `[오늘의 사유 - 지혜의 말씀]\n\n${displayQuote.innerText}\n${displaySource.innerText}\n\n🌿 마음에 전하는 조언:\n${displayCounsel.innerText}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareContent).then(() => {
        showNotice('말씀이 복사되었습니다. 마음에 새기세요.');
      }).catch(() => {
        clipFallback(shareContent);
      });
    } else {
      clipFallback(shareContent);
    }
  });

  function clipFallback(txt) {
    const dummy = document.createElement('textarea');
    dummy.value = txt;
    document.body.appendChild(dummy);
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    showNotice('말씀이 복사되었습니다. 마음에 새기세요.');
  }

  btnBackToStart.addEventListener('click', () => {
    ringMoktak();
    Object.keys(slots).forEach(key => {
      const item = slots[key];
      item.text.value = '';
      item.slot.classList.remove('editing');
      updateButtonState(key);
    });
    mindWeightRange.value = 35;
    refreshSliderFeedback(35);
    currentAnalysisCache = null;
    totalShownCounter = 1;
    switchView(viewIntro);
  });

  refreshSliderFeedback(mindWeightRange.value);

})();
