/* 수시·정시·대학 목록 공통 데모 데이터
   - 약 30행: 성적반영방식·학과유형·지역 필터가 체감되도록 배치
   - 전형방법·수능최저 등은 실제 요강 문장 형태를 모사
   - 정량 반영 행만 성적반영방식 필터·상세보기 연동 */
window.ADMIT_DEMO_UNITS = [
  {
    "univ": "서울대학교",
    "region": "서울",
    "founding": "국립",
    "track": "자연",
    "unit": "의예과",
    "theme": "med",
    "gradeMethod": "sum",
    "uniQuota": "3,163명",
    "uniRate": "6.8:1",
    "uniFill": "99.6%",
    "교과명": "지역균형",
    "종합명": "일반전형",
    "논술명": "논술전형",
    "교과": [
      "15명",
      "8.20",
      "학생부 100%",
      "1.18",
      "적용"
    ],
    "종합": [
      "30명",
      "22.40",
      "[1단계] 교과 70% + 서류 30% / [2단계] 면접 100%",
      "미적용"
    ],
    "논술": [
      "8명",
      "95.10",
      "논술 70% + 학생부 30%",
      "적용"
    ],
    "minDetail": "국어·수학·영어·과학탐구 중 3개 영역 등급 합 4 이내",
    "jeongsi": {
      "group": "가군",
      "groupKey": "ga",
      "typeName": "일반전형(수능)",
      "quota": "40명",
      "rate": "4.20",
      "method": "수능 70% + 학생부 30%",
      "reflect": "정량",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "298.50"
    }
  },
  {
    "univ": "연세대학교(서울)",
    "region": "서울",
    "founding": "사립",
    "track": "자연",
    "unit": "치의예과",
    "theme": "med",
    "gradeMethod": "better",
    "uniQuota": "3,495명",
    "uniRate": "10.9:1",
    "uniFill": "99.5%",
    "교과명": "추천형",
    "종합명": "활동우수형",
    "논술명": "논술전형",
    "교과": [
      "6명",
      "9.80",
      "교과 70% + 면접 30%",
      "1.25",
      "적용"
    ],
    "종합": [
      "12명",
      "16.50",
      "[1단계] 교과 60% + 서류 40% / [2단계] 면접 100%",
      "적용"
    ],
    "논술": [
      "4명",
      "88.20",
      "논술 80% + 교과 20%",
      "미적용"
    ],
    "minDetail": "국어·수학·영어·과학탐구 중 3개 영역 등급 합 4 이내",
    "jeongsi": {
      "group": "가군",
      "groupKey": "ga",
      "typeName": "일반전형(수능)",
      "quota": "18명",
      "rate": "4.80",
      "method": "수능 80% + 학생부 20%",
      "reflect": "정량",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "296.20"
    }
  },
  {
    "univ": "경희대학교(서울)",
    "region": "서울",
    "founding": "사립",
    "track": "자연",
    "unit": "한의예과",
    "theme": "med",
    "gradeMethod": "replace",
    "uniQuota": "4,840명",
    "uniRate": "15.9:1",
    "uniFill": "99.9%",
    "교과명": "지역균형",
    "종합명": "네오르네상스",
    "논술명": "논술우수자",
    "교과": [
      "6명",
      "12.50",
      "학생부 70% + 교과종합평가 30%",
      "1.40",
      "적용"
    ],
    "종합": [
      "14명",
      "28.60",
      "교과 40% + 서류 60%",
      "미적용"
    ],
    "논술": [
      "5명",
      "120.40",
      "논술 60% + 학생부 40%",
      "적용"
    ],
    "minDetail": "국어·수학·영어·탐구 중 3개 영역 등급 합 4 이내",
    "jeongsi": {
      "group": "가군",
      "groupKey": "ga",
      "typeName": "일반전형(수능)",
      "quota": "18명",
      "rate": "4.80",
      "method": "수능 60% + 학생부 40%",
      "reflect": "정량",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "291.60"
    }
  },
  {
    "univ": "성균관대학교(수원)",
    "region": "경기",
    "founding": "사립",
    "track": "자연",
    "unit": "약학과",
    "theme": "med",
    "gradeMethod": "rank",
    "uniQuota": "3,447명",
    "uniRate": "21.2:1",
    "uniFill": "99.4%",
    "교과명": "학교장추천",
    "종합명": "학과모집",
    "논술명": "논술우수",
    "교과": [
      "8명",
      "11.20",
      "학생부 100%",
      "1.32",
      "적용"
    ],
    "종합": [
      "15명",
      "18.70",
      "[1단계] 학생부교과 100% / [2단계] 면접 100%",
      "미적용"
    ],
    "논술": [
      "6명",
      "92.30",
      "논술 75% + 교과 25%",
      "적용"
    ],
    "minDetail": "국어·수학·영어·과학탐구 중 3개 영역 각 2등급 이내",
    "jeongsi": {
      "group": "나군",
      "groupKey": "na",
      "typeName": "일반전형(수능)",
      "quota": "20명",
      "rate": "5.40",
      "method": "수능 50% + 학생부 30% + 면접 20%",
      "reflect": "정량+정성",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "293.80"
    }
  },
  {
    "univ": "건국대학교(서울)",
    "region": "서울",
    "founding": "사립",
    "track": "자연",
    "unit": "수의예과",
    "theme": "med",
    "gradeMethod": "sum",
    "uniQuota": "3,000명",
    "uniRate": "19.9:1",
    "uniFill": "100.0%",
    "교과명": "KU지역균형",
    "종합명": "KU자기추천",
    "논술명": "KU논술우수자",
    "교과": [
      "5명",
      "16.60",
      "교과 60% + 서류 40%",
      "1.35",
      "적용"
    ],
    "종합": [
      "16명",
      "35.75",
      "[1단계] 교과 70% + 서류 30% / [2단계] 면접 100%",
      "미적용"
    ],
    "논술": [
      "6명",
      "272.50",
      "논술 70% + 학생부 30%",
      "적용"
    ],
    "minDetail": "수학·영어·탐구 중 3개 영역 등급 합 4 이내",
    "jeongsi": {
      "group": "가군",
      "groupKey": "ga",
      "typeName": "학생부교과",
      "quota": "39명",
      "rate": "6.00",
      "method": "수능 70% + 학생부 30%",
      "reflect": "정량",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "288.20"
    }
  },
  {
    "univ": "이화여자대학교",
    "region": "서울",
    "founding": "사립",
    "track": "인문",
    "unit": "초등교육과",
    "theme": "edu-elem",
    "gradeMethod": "better",
    "uniQuota": "3,197명",
    "uniRate": "10.1:1",
    "uniFill": "99.7%",
    "교과명": "고교추천",
    "종합명": "미래인재",
    "논술명": "논술",
    "교과": [
      "20명",
      "6.40",
      "학생부 100%",
      "1.70",
      "적용"
    ],
    "종합": [
      "25명",
      "9.10",
      "[1단계] 교과 60% + 서류 40% / [2단계] 면접 100%",
      "적용"
    ],
    "논술": [
      "4명",
      "18.50",
      "논술 80% + 교과 20%",
      "미적용"
    ],
    "minDetail": "국어·영어·탐구 중 2개 영역 등급 합 5 이내",
    "jeongsi": {
      "group": "나군",
      "groupKey": "na",
      "typeName": "일반전형(수능)",
      "quota": "35명",
      "rate": "3.10",
      "method": "수능 80% + 학생부 20%",
      "reflect": "정량",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "276.80"
    }
  },
  {
    "univ": "한국교원대학교",
    "region": "충북",
    "founding": "국립",
    "track": "인문",
    "unit": "초등교육과",
    "theme": "edu-elem",
    "gradeMethod": "replace",
    "uniQuota": "520명",
    "uniRate": "3.9:1",
    "uniFill": "99.8%",
    "교과명": "학생부교과",
    "종합명": "학생부종합",
    "논술명": "논술",
    "교과": [
      "40명",
      "5.20",
      "학생부 100%",
      "1.75",
      "적용"
    ],
    "종합": [
      "30명",
      "7.80",
      "교과 40% + 서류 60%",
      "적용"
    ],
    "논술": [
      "5명",
      "12.40",
      "논술 60% + 학생부 40%",
      "미적용"
    ],
    "minDetail": "국어·수학·영어·탐구 중 3개 영역 등급 합 7 이내",
    "jeongsi": {
      "group": "가군",
      "groupKey": "ga",
      "typeName": "일반전형(수능)",
      "quota": "50명",
      "rate": "2.90",
      "method": "수능 60% + 학생부 40%",
      "reflect": "정량",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "271.20"
    }
  },
  {
    "univ": "공주교육대학교",
    "region": "충남",
    "founding": "국립",
    "track": "인문",
    "unit": "초등교육과",
    "theme": "edu-elem",
    "gradeMethod": "rank",
    "uniQuota": "380명",
    "uniRate": "3.4:1",
    "uniFill": "99.5%",
    "교과명": "교과우수자",
    "종합명": "교직인성",
    "논술명": "논술",
    "교과": [
      "35명",
      "4.80",
      "학생부 100%",
      "1.82",
      "적용"
    ],
    "종합": [
      "28명",
      "6.90",
      "[1단계] 학생부교과 100% / [2단계] 면접 100%",
      "적용"
    ],
    "논술": [
      "3명",
      "9.80",
      "논술 75% + 교과 25%",
      "미적용"
    ],
    "minDetail": "국어·영어·탐구 중 2개 영역 각 3등급 이내",
    "jeongsi": {
      "group": "나군",
      "groupKey": "na",
      "typeName": "일반전형(수능)",
      "quota": "42명",
      "rate": "2.70",
      "method": "수능 50% + 학생부 30% + 면접 20%",
      "reflect": "정량+정성",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "268.40"
    }
  },
  {
    "univ": "부산대학교",
    "region": "부산",
    "founding": "국립",
    "track": "공통",
    "unit": "간호학과",
    "theme": "nurse",
    "gradeMethod": "sum",
    "uniQuota": "4,311명",
    "uniRate": "8.6:1",
    "uniFill": "99.7%",
    "교과명": "학생부교과",
    "종합명": "학생부종합",
    "논술명": "논술",
    "교과": [
      "10명",
      "8.40",
      "학생부 100%",
      "2.08",
      "적용"
    ],
    "종합": [
      "10명",
      "12.80",
      "[1단계] 교과 70% + 서류 30% / [2단계] 면접 100%",
      "적용"
    ],
    "논술": [
      "8명",
      "17.25",
      "논술 100%",
      "적용"
    ],
    "minDetail": "국어·영어·탐구 중 2개 영역 등급 합 6 이내",
    "jeongsi": {
      "group": "가군",
      "groupKey": "ga",
      "typeName": "지역인재(교과)",
      "quota": "25명",
      "rate": "2.76",
      "method": "수능 70% + 학생부 30%",
      "reflect": "정량",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "258.80"
    }
  },
  {
    "univ": "중앙대학교(서울)",
    "region": "서울",
    "founding": "사립",
    "track": "자연",
    "unit": "간호학과",
    "theme": "nurse",
    "gradeMethod": "better",
    "uniQuota": "3,210명",
    "uniRate": "26.3:1",
    "uniFill": "99.9%",
    "교과명": "지역균형",
    "종합명": "다빈치형인재",
    "논술명": "논술",
    "교과": [
      "18명",
      "9.60",
      "교과 100%",
      "2.10",
      "적용"
    ],
    "종합": [
      "15명",
      "13.50",
      "[1단계] 교과 60% + 서류 40% / [2단계] 면접 100%",
      "미적용"
    ],
    "논술": [
      "6명",
      "33.20",
      "논술 70% + 학생부 30%",
      "적용"
    ],
    "minDetail": "영어 2등급 이내 및 국어·탐구 중 1개 영역 4등급 이내",
    "jeongsi": {
      "group": "다군",
      "groupKey": "da",
      "typeName": "일반전형(수능)",
      "quota": "28명",
      "rate": "8.40",
      "method": "수능 80% + 학생부 20%",
      "reflect": "정량",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "266.70"
    }
  },
  {
    "univ": "연세대학교(미래)",
    "region": "강원",
    "founding": "사립",
    "track": "인문",
    "unit": "보건행정학과",
    "theme": "nurse",
    "gradeMethod": "replace",
    "uniQuota": "1,409명",
    "uniRate": "10.3:1",
    "uniFill": "100.0%",
    "교과명": "교과우수자",
    "종합명": "종합면접",
    "논술명": "논술우수자",
    "교과": [
      "9명",
      "9.56",
      "학생부 100%",
      "2.80",
      "적용"
    ],
    "종합": [
      "5명",
      "5.40",
      "교과 40% + 서류 60%",
      "미적용"
    ],
    "논술": [
      "5명",
      "3.40",
      "논술 100%",
      "적용"
    ],
    "minDetail": "국어·수학·영어·탐구 중 2개 영역 등급 합 5 이내",
    "jeongsi": {
      "group": "가군",
      "groupKey": "ga",
      "typeName": "종합우수자",
      "quota": "9명",
      "rate": "5.33",
      "method": "수능 60% + 학생부 40%",
      "reflect": "정량",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "245.60"
    }
  },
  {
    "univ": "가천대학교",
    "region": "경기",
    "founding": "사립",
    "track": "자연",
    "unit": "간호학과",
    "theme": "nurse",
    "gradeMethod": "rank",
    "uniQuota": "4,120명",
    "uniRate": "14.6:1",
    "uniFill": "99.5%",
    "교과명": "학생부우수자",
    "종합명": "가천바람개비",
    "논술명": "논술",
    "교과": [
      "22명",
      "10.80",
      "학생부 100%",
      "2.25",
      "적용"
    ],
    "종합": [
      "18명",
      "14.20",
      "[1단계] 학생부교과 100% / [2단계] 면접 100%",
      "미적용"
    ],
    "논술": [
      "8명",
      "29.60",
      "논술 80% + 교과 20%",
      "적용"
    ],
    "minDetail": "국어·영어·탐구 중 2개 영역 등급 합 6 이내",
    "jeongsi": {
      "group": "나군",
      "groupKey": "na",
      "typeName": "일반전형(수능)",
      "quota": "32명",
      "rate": "7.10",
      "method": "수능 50% + 학생부 30% + 면접 20%",
      "reflect": "정량+정성",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "254.30"
    }
  },
  {
    "univ": "고려대학교(서울)",
    "region": "서울",
    "founding": "사립",
    "track": "자연",
    "unit": "수학교육과",
    "theme": "edu",
    "gradeMethod": "sum",
    "uniQuota": "3,992명",
    "uniRate": "9.8:1",
    "uniFill": "99.7%",
    "교과명": "학교추천",
    "종합명": "학업우수전형",
    "논술명": "논술전형",
    "교과": [
      "7명",
      "7.80",
      "교과 80% + 서류 20%",
      "1.60",
      "적용"
    ],
    "종합": [
      "12명",
      "11.20",
      "[1단계] 교과 70% + 서류 30% / [2단계] 면접 100%",
      "적용"
    ],
    "논술": [
      "5명",
      "42.30",
      "논술 100%",
      "적용"
    ],
    "minDetail": "국어·수학·영어 중 2개 영역 등급 합 4 이내",
    "jeongsi": {
      "group": "가군",
      "groupKey": "ga",
      "typeName": "일반전형(수능)",
      "quota": "10명",
      "rate": "3.40",
      "method": "수능 60% + 학생부 40%",
      "reflect": "정량",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "282.40"
    }
  },
  {
    "univ": "숙명여자대학교",
    "region": "서울",
    "founding": "사립",
    "track": "인문",
    "unit": "영어교육과",
    "theme": "edu",
    "gradeMethod": "better",
    "uniQuota": "2,450명",
    "uniRate": "9.4:1",
    "uniFill": "99.6%",
    "교과명": "지역균형",
    "종합명": "숙명인재",
    "논술명": "논술우수자",
    "교과": [
      "9명",
      "8.70",
      "학생부 100%",
      "1.85",
      "적용"
    ],
    "종합": [
      "11명",
      "10.90",
      "서류 100%",
      "미적용"
    ],
    "논술": [
      "6명",
      "28.60",
      "논술 60% + 학생부 40%",
      "적용"
    ],
    "minDetail": "국어·영어·탐구 중 2개 영역 등급 합 5 이내",
    "jeongsi": {
      "group": "나군",
      "groupKey": "na",
      "typeName": "일반전형(수능)",
      "quota": "12명",
      "rate": "4.10",
      "method": "수능 100%",
      "reflect": "미반영",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "274.50"
    }
  },
  {
    "univ": "서울교육대학교",
    "region": "서울",
    "founding": "국립",
    "track": "인문",
    "unit": "초등교육과",
    "theme": "edu-elem",
    "gradeMethod": "replace",
    "uniQuota": "390명",
    "uniRate": "3.1:1",
    "uniFill": "99.9%",
    "교과명": "교과전형",
    "종합명": "교직적성",
    "논술명": "논술",
    "교과": [
      "50명",
      "4.20",
      "학생부 100%",
      "1.65",
      "적용"
    ],
    "종합": [
      "40명",
      "5.80",
      "[1단계] 교과 60% + 서류 40% / [2단계] 면접 100%",
      "적용"
    ],
    "논술": [
      "2명",
      "7.50",
      "논술 100%",
      "미적용"
    ],
    "minDetail": "국어·수학·영어·탐구 중 3개 영역 등급 합 7 이내",
    "jeongsi": {
      "group": "가군",
      "groupKey": "ga",
      "typeName": "일반전형(수능)",
      "quota": "48명",
      "rate": "2.50",
      "method": "수능 50% + 학생부 30% + 면접 20%",
      "reflect": "정량+정성",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "279.10"
    }
  },
  {
    "univ": "한국외국어대학교(서울)",
    "region": "서울",
    "founding": "사립",
    "track": "인문",
    "unit": "한국어교육과",
    "theme": "edu",
    "gradeMethod": "rank",
    "uniQuota": "3,490명",
    "uniRate": "13.1:1",
    "uniFill": "99.8%",
    "교과명": "학생부교과(고교추천)",
    "종합명": "학생부종합(면접형)",
    "논술명": "논술전형",
    "교과": [
      "8명",
      "9.30",
      "학생부 100%",
      "1.95",
      "적용"
    ],
    "종합": [
      "10명",
      "12.40",
      "[1단계] 서류 100% / [2단계] 면접 100%",
      "미적용"
    ],
    "논술": [
      "7명",
      "45.20",
      "논술 75% + 교과 25%",
      "적용"
    ],
    "minDetail": "국어·영어·탐구 중 2개 영역 각 3등급 이내",
    "jeongsi": {
      "group": "다군",
      "groupKey": "da",
      "typeName": "일반전형(수능)",
      "quota": "14명",
      "rate": "6.20",
      "method": "수능 100%",
      "reflect": "미반영",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "262.80"
    }
  },
  {
    "univ": "가천대학교(글로벌)",
    "region": "경기",
    "founding": "사립",
    "track": "자연",
    "unit": "계약학과(삼성디스플레이)",
    "theme": "contract",
    "gradeMethod": "sum",
    "uniQuota": "2,180명",
    "uniRate": "12.4:1",
    "uniFill": "99.2%",
    "교과명": "학생부우수자",
    "종합명": "가천바람개비",
    "논술명": "논술",
    "교과": [
      "25명",
      "18.40",
      "학생부 100%",
      "1.90",
      "적용"
    ],
    "종합": [
      "20명",
      "24.10",
      "교과 40% + 서류 60%",
      "미적용"
    ],
    "논술": [
      "10명",
      "55.80",
      "논술 100%",
      "적용"
    ],
    "minDetail": "수학·영어·탐구 중 2개 영역 등급 합 4 이내",
    "jeongsi": {
      "group": "나군",
      "groupKey": "na",
      "typeName": "일반전형(수능)",
      "quota": "40명",
      "rate": "9.80",
      "method": "수능 70% + 학생부 30%",
      "reflect": "정량",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "252.40"
    }
  },
  {
    "univ": "성균관대학교(서울)",
    "region": "서울",
    "founding": "사립",
    "track": "자연",
    "unit": "반도체시스템공학과(계약)",
    "theme": "contract",
    "gradeMethod": "better",
    "uniQuota": "2,860명",
    "uniRate": "18.5:1",
    "uniFill": "99.6%",
    "교과명": "학교장추천",
    "종합명": "학과모집",
    "논술명": "논술우수",
    "교과": [
      "12명",
      "15.20",
      "학생부 100%",
      "1.45",
      "적용"
    ],
    "종합": [
      "20명",
      "19.80",
      "서류 100%",
      "미적용"
    ],
    "논술": [
      "8명",
      "76.20",
      "논술 100%",
      "적용"
    ],
    "minDetail": "수학 2등급 이내 및 탐구 1개 영역 3등급 이내",
    "jeongsi": {
      "group": "나군",
      "groupKey": "na",
      "typeName": "일반전형(수능)",
      "quota": "30명",
      "rate": "7.20",
      "method": "수능 100%",
      "reflect": "미반영",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "285.30"
    }
  },
  {
    "univ": "한양대학교(서울)",
    "region": "서울",
    "founding": "사립",
    "track": "자연",
    "unit": "소프트웨어융합학과(계약)",
    "theme": "contract",
    "gradeMethod": "replace",
    "uniQuota": "2,906명",
    "uniRate": "19.3:1",
    "uniFill": "99.9%",
    "교과명": "지역균형발전",
    "종합명": "일반(종합평가)",
    "논술명": "논술",
    "교과": [
      "10명",
      "11.80",
      "학생부 90% + 서류 10%",
      "1.55",
      "미적용"
    ],
    "종합": [
      "16명",
      "21.40",
      "[1단계] 학생부교과 100% / [2단계] 면접 100%",
      "미적용"
    ],
    "논술": [
      "7명",
      "98.70",
      "논술 100%",
      "미적용"
    ],
    "minDetail": "미적용",
    "jeongsi": {
      "group": "가군",
      "groupKey": "ga",
      "typeName": "일반전형(수능)",
      "quota": "20명",
      "rate": "6.50",
      "method": "수능 80% + 학생부 20%",
      "reflect": "정량",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "280.10"
    }
  },
  {
    "univ": "숭실대학교",
    "region": "서울",
    "founding": "사립",
    "track": "자연",
    "unit": "IT계약학과",
    "theme": "contract",
    "gradeMethod": "rank",
    "uniQuota": "2,760명",
    "uniRate": "13.5:1",
    "uniFill": "99.8%",
    "교과명": "학생부우수자",
    "종합명": "SSU-AI",
    "논술명": "논술우수자",
    "교과": [
      "22명",
      "13.70",
      "학생부 100%",
      "2.00",
      "적용"
    ],
    "종합": [
      "18명",
      "16.90",
      "서류 100%",
      "미적용"
    ],
    "논술": [
      "12명",
      "51.30",
      "논술 100%",
      "적용"
    ],
    "minDetail": "국어·수학·영어·탐구 중 2개 영역 등급 합 5 이내",
    "jeongsi": {
      "group": "다군",
      "groupKey": "da",
      "typeName": "일반전형(수능)",
      "quota": "24명",
      "rate": "8.90",
      "method": "수능 100%",
      "reflect": "미반영",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "248.60"
    }
  },
  {
    "univ": "KAIST",
    "region": "대전",
    "founding": "특별법인",
    "track": "자연",
    "unit": "전산학부",
    "theme": "advanced",
    "gradeMethod": "sum",
    "uniQuota": "950명",
    "uniRate": "4.2:1",
    "uniFill": "100.0%",
    "교과명": "학교장추천",
    "종합명": "일반전형",
    "논술명": "논술",
    "교과": [
      "20명",
      "6.10",
      "학생부 100%",
      "1.30",
      "미적용"
    ],
    "종합": [
      "80명",
      "9.40",
      "서류 100%",
      "미적용"
    ],
    "논술": [
      "5명",
      "40.20",
      "논술 100%",
      "미적용"
    ],
    "minDetail": "미적용",
    "jeongsi": {
      "group": "가군",
      "groupKey": "ga",
      "typeName": "일반전형(수능)",
      "quota": "15명",
      "rate": "3.80",
      "method": "수능 60% + 학생부 40%",
      "reflect": "정량",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "289.40"
    }
  },
  {
    "univ": "포항공과대학교",
    "region": "경북",
    "founding": "사립",
    "track": "자연",
    "unit": "반도체공학과",
    "theme": "advanced",
    "gradeMethod": "better",
    "uniQuota": "360명",
    "uniRate": "5.1:1",
    "uniFill": "100.0%",
    "교과명": "학생부교과",
    "종합명": "일반전형",
    "논술명": "논술",
    "교과": [
      "8명",
      "7.20",
      "학생부 100%",
      "1.28",
      "미적용"
    ],
    "종합": [
      "45명",
      "8.60",
      "서류 100%",
      "미적용"
    ],
    "논술": [
      "3명",
      "22.40",
      "논술 100%",
      "미적용"
    ],
    "minDetail": "미적용",
    "jeongsi": {
      "group": "나군",
      "groupKey": "na",
      "typeName": "일반전형(수능)",
      "quota": "10명",
      "rate": "4.50",
      "method": "수능 100%",
      "reflect": "미반영",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "287.10"
    }
  },
  {
    "univ": "한양대학교(ERICA)",
    "region": "경기",
    "founding": "사립",
    "track": "자연",
    "unit": "인공지능학과",
    "theme": "advanced",
    "gradeMethod": "replace",
    "uniQuota": "2,640명",
    "uniRate": "16.8:1",
    "uniFill": "99.4%",
    "교과명": "지역균형",
    "종합명": "소프트웨어인재",
    "논술명": "논술",
    "교과": [
      "14명",
      "12.60",
      "학생부 100%",
      "1.72",
      "적용"
    ],
    "종합": [
      "22명",
      "17.30",
      "서류 100%",
      "미적용"
    ],
    "논술": [
      "9명",
      "64.50",
      "논술 100%",
      "적용"
    ],
    "minDetail": "수학·영어·탐구 중 2개 영역 등급 합 4 이내",
    "jeongsi": {
      "group": "가군",
      "groupKey": "ga",
      "typeName": "일반전형(수능)",
      "quota": "18명",
      "rate": "5.90",
      "method": "수능 50% + 학생부 30% + 면접 20%",
      "reflect": "정량+정성",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "272.90"
    }
  },
  {
    "univ": "인하대학교",
    "region": "인천",
    "founding": "사립",
    "track": "자연",
    "unit": "항공우주공학과",
    "theme": "advanced",
    "gradeMethod": "rank",
    "uniQuota": "3,444명",
    "uniRate": "15.0:1",
    "uniFill": "100.0%",
    "교과명": "지역균형",
    "종합명": "인하미래인재",
    "논술명": "논술우수자",
    "교과": [
      "12명",
      "9.70",
      "학생부 100%",
      "2.30",
      "적용"
    ],
    "종합": [
      "19명",
      "13.50",
      "[1단계] 서류 100% / [2단계] 면접 100%",
      "미적용"
    ],
    "논술": [
      "9명",
      "30.40",
      "논술 100%",
      "적용"
    ],
    "minDetail": "국어·수학·영어·탐구 중 2개 영역 등급 합 5 이내",
    "jeongsi": {
      "group": "나군",
      "groupKey": "na",
      "typeName": "일반전형(수능)",
      "quota": "6명",
      "rate": "6.50",
      "method": "수능 100%",
      "reflect": "미반영",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "262.10"
    }
  },
  {
    "univ": "울산과학기술원",
    "region": "울산",
    "founding": "특별법인",
    "track": "자연",
    "unit": "전기전자공학과",
    "theme": "advanced",
    "gradeMethod": "sum",
    "uniQuota": "420명",
    "uniRate": "4.8:1",
    "uniFill": "100.0%",
    "교과명": "학생부교과",
    "종합명": "일반전형",
    "논술명": "논술",
    "교과": [
      "10명",
      "5.90",
      "학생부 100%",
      "1.40",
      "미적용"
    ],
    "종합": [
      "55명",
      "7.80",
      "서류 100%",
      "미적용"
    ],
    "논술": [
      "4명",
      "18.20",
      "논술 100%",
      "미적용"
    ],
    "minDetail": "미적용",
    "jeongsi": {
      "group": "가군",
      "groupKey": "ga",
      "typeName": "일반전형(수능)",
      "quota": "12명",
      "rate": "3.60",
      "method": "수능 100%",
      "reflect": "미반영",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "284.70"
    }
  },
  {
    "univ": "서강대학교",
    "region": "서울",
    "founding": "사립",
    "track": "인문",
    "unit": "커뮤니케이션학부",
    "theme": "",
    "gradeMethod": "better",
    "uniQuota": "1,602명",
    "uniRate": "20.3:1",
    "uniFill": "99.1%",
    "교과명": "고교장추천",
    "종합명": "일반전형",
    "논술명": "논술",
    "교과": [
      "10명",
      "16.30",
      "학생부 100%",
      "1.53",
      "적용"
    ],
    "종합": [
      "18명",
      "8.94",
      "서류 100%",
      "미적용"
    ],
    "논술": [
      "12명",
      "100.80",
      "논술 100%",
      "적용"
    ],
    "minDetail": "국어·영어·탐구 중 2개 영역 등급 합 5 이내",
    "jeongsi": {
      "group": "나군",
      "groupKey": "na",
      "typeName": "서류평가형",
      "quota": "23명",
      "rate": "5.09",
      "method": "수능 80% + 서류 20%",
      "reflect": "정성",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "284.60"
    }
  },
  {
    "univ": "전남대학교",
    "region": "광주",
    "founding": "국립",
    "track": "인문",
    "unit": "경영학부",
    "theme": "",
    "gradeMethod": "replace",
    "uniQuota": "4,020명",
    "uniRate": "7.2:1",
    "uniFill": "99.1%",
    "교과명": "지역인재",
    "종합명": "학생부종합",
    "논술명": "논술",
    "교과": [
      "28명",
      "7.40",
      "학생부 100%",
      "2.35",
      "적용"
    ],
    "종합": [
      "20명",
      "9.80",
      "서류 100%",
      "미적용"
    ],
    "논술": [
      "10명",
      "24.60",
      "논술 100%",
      "적용"
    ],
    "minDetail": "국어·수학·영어·탐구 중 2개 영역 등급 합 6 이내",
    "jeongsi": {
      "group": "가군",
      "groupKey": "ga",
      "typeName": "일반전형(수능)",
      "quota": "45명",
      "rate": "4.20",
      "method": "수능 100%",
      "reflect": "미반영",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "242.30"
    }
  },
  {
    "univ": "충남대학교",
    "region": "대전",
    "founding": "국립",
    "track": "자연",
    "unit": "기계공학부",
    "theme": "",
    "gradeMethod": "rank",
    "uniQuota": "3,860명",
    "uniRate": "6.9:1",
    "uniFill": "99.2%",
    "교과명": "학생부교과",
    "종합명": "PRISM",
    "논술명": "논술",
    "교과": [
      "24명",
      "8.10",
      "학생부 100%",
      "2.15",
      "적용"
    ],
    "종합": [
      "18명",
      "11.40",
      "[1단계] 서류 100% / [2단계] 면접 100%",
      "미적용"
    ],
    "논술": [
      "8명",
      "27.80",
      "논술 100%",
      "적용"
    ],
    "minDetail": "수학·영어·탐구 중 2개 영역 등급 합 5 이내",
    "jeongsi": {
      "group": "나군",
      "groupKey": "na",
      "typeName": "일반전형(수능)",
      "quota": "38명",
      "rate": "3.90",
      "method": "수능 100%",
      "reflect": "미반영",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "249.80"
    }
  },
  {
    "univ": "제주대학교",
    "region": "제주",
    "founding": "국립",
    "track": "인문",
    "unit": "관광경영학과",
    "theme": "",
    "gradeMethod": "sum",
    "uniQuota": "2,140명",
    "uniRate": "5.8:1",
    "uniFill": "98.7%",
    "교과명": "교과성적우수자",
    "종합명": "학생부종합",
    "논술명": "논술",
    "교과": [
      "16명",
      "6.50",
      "학생부 100%",
      "2.50",
      "적용"
    ],
    "종합": [
      "12명",
      "8.20",
      "서류 100%",
      "미적용"
    ],
    "논술": [
      "5명",
      "14.70",
      "논술 100%",
      "적용"
    ],
    "minDetail": "국어·영어·탐구 중 2개 영역 등급 합 7 이내",
    "jeongsi": {
      "group": "다군",
      "groupKey": "da",
      "typeName": "일반전형(수능)",
      "quota": "20명",
      "rate": "3.20",
      "method": "수능 100%",
      "reflect": "미반영",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "228.40"
    }
  },
  {
    "univ": "동국대학교(서울)",
    "region": "서울",
    "founding": "사립",
    "track": "인문",
    "unit": "경찰행정학부",
    "theme": "",
    "gradeMethod": "better",
    "uniQuota": "2,823명",
    "uniRate": "18.1:1",
    "uniFill": "99.9%",
    "교과명": "학교장추천",
    "종합명": "Do Dream",
    "논술명": "논술",
    "교과": [
      "6명",
      "14.67",
      "학생부 100%",
      "1.87",
      "적용"
    ],
    "종합": [
      "8명",
      "25.88",
      "서류 100%",
      "미적용"
    ],
    "논술": [
      "15명",
      "48.80",
      "논술 100%",
      "적용"
    ],
    "minDetail": "국어·수학·영어·탐구 중 2개 영역 등급 합 5 이내",
    "jeongsi": {
      "group": "다군",
      "groupKey": "da",
      "typeName": "서류종합형",
      "quota": "23명",
      "rate": "8.61",
      "method": "수능 70% + 서류 30%",
      "reflect": "정성",
      "area": "국·수·영·탐",
      "areaKey": "area-0",
      "inquiry": "2",
      "score": "270.50"
    }
  }
];

/* 대학 탭: 고유 대학 30곳 + 학과유형·성적반영 태그(필터 체감) */
window.ADMIT_DEMO_UNIVS = (() => {
  const map = new Map();
  window.ADMIT_DEMO_UNITS.forEach((item) => {
    if (!map.has(item.univ)) {
      map.set(item.univ, {
        name: item.univ,
        region: item.region,
        founding: item.founding,
        quota: item.uniQuota,
        rate: item.uniRate,
        fill: item.uniFill,
        themes: new Set(),
        gradeMethods: new Set(),
      });
    }
    const row = map.get(item.univ);
    if (item.theme) row.themes.add(item.theme);
    if (item.gradeMethod) row.gradeMethods.add(item.gradeMethod);
  });

  const extras = [
    {
      name: "홍익대학교(서울)",
      region: "서울",
      founding: "사립",
      quota: "2,421명",
      rate: "18.0:1",
      fill: "100.0%",
      themes: ["advanced"],
      gradeMethods: ["sum"],
    },
    {
      name: "아주대학교",
      region: "경기",
      founding: "사립",
      quota: "2,210명",
      rate: "12.1:1",
      fill: "99.6%",
      themes: ["advanced", "contract"],
      gradeMethods: ["better"],
    },
    {
      name: "영남대학교",
      region: "경북",
      founding: "사립",
      quota: "4,580명",
      rate: "7.9:1",
      fill: "98.9%",
      themes: ["nurse", "edu"],
      gradeMethods: ["replace"],
    },
    {
      name: "전북대학교",
      region: "전북",
      founding: "국립",
      quota: "3,920명",
      rate: "6.5:1",
      fill: "99.0%",
      themes: ["med", "nurse"],
      gradeMethods: ["rank"],
    },
    {
      name: "강원대학교",
      region: "강원",
      founding: "국립",
      quota: "3,410명",
      rate: "5.9:1",
      fill: "98.8%",
      themes: ["edu-elem", "nurse"],
      gradeMethods: ["sum"],
    },
  ];

  extras.forEach((item) => {
    if (map.size >= 30 || map.has(item.name)) return;
    map.set(item.name, {
      name: item.name,
      region: item.region,
      founding: item.founding,
      quota: item.quota,
      rate: item.rate,
      fill: item.fill,
      themes: new Set(item.themes),
      gradeMethods: new Set(item.gradeMethods),
    });
  });

  return [...map.values()].slice(0, 30).map((row) => ({
    name: row.name,
    region: row.region,
    founding: row.founding,
    quota: row.quota,
    rate: row.rate,
    fill: row.fill,
    theme: [...row.themes].join(","),
    gradeMethod: [...row.gradeMethods].join(",") || "sum",
  }));
})();
