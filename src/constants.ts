import { Scenario } from './types';

export const SCENARIOS: Scenario[] = [
  {
    id: 'fin-1',
    category: 'Finance',
    question: 'Saldo m-banking tinggal 50rb, tapi ada konser "The Eras Tour" KW Super minggu depan.',
    leftChoice: {
      text: 'GASKEU: Pake Paylater, self-reward itu wajib.',
      resultType: 'bad',
      impact: { wallet: -30, sanity: 10, career: 0 }
    },
    rightChoice: {
      text: 'SADAR DIRI: Makan nasi garem dulu sampe gajian.',
      resultType: 'good',
      impact: { wallet: 10, sanity: -5, career: 0 }
    }
  },
  {
    id: 'car-1',
    category: 'Career',
    question: 'Bos nge-chat jam 9 malem: "P, bisa revisi dikit?" padahal lagi asik drakoran.',
    leftChoice: {
      text: 'GHOSTING: Pura-pura tidur, centang biru mati.',
      resultType: 'neutral',
      impact: { wallet: 0, sanity: 10, career: -10 }
    },
    rightChoice: {
      text: 'GAS POL: Siap pak, langsung saya kerjain!',
      resultType: 'bad',
      impact: { wallet: 0, sanity: -20, career: 10 }
    }
  },
  {
    id: 'mh-1',
    category: 'Mental Health',
    question: 'Udah doomscrolling 3 jam, mata perih, tapi FOMO liat temen lagi party.',
    leftChoice: {
      text: 'LANJUT: Scroll terus sampe nemu drama baru.',
      resultType: 'bad',
      impact: { wallet: 0, sanity: -15, career: 0 }
    },
    rightChoice: {
      text: 'LOG OFF: Taruh HP, dengerin white noise.',
      resultType: 'good',
      impact: { wallet: 0, sanity: 20, career: 0 }
    }
  },
  {
    id: 'soc-1',
    category: 'Social',
    question: "Temen ngajak nongkrong di cafe mahal, padahal kamu lagi nabung buat bayar kosan.",
    leftChoice: {
      text: 'FOMO: Ikut aja, demi konten aesthetic.',
      resultType: 'bad',
      impact: { wallet: -20, sanity: 5, career: 0 }
    },
    rightChoice: {
      text: 'JUJUR: Skip dulu, lagi bokek parah.',
      resultType: 'good',
      impact: { wallet: 15, sanity: 10, career: 0 }
    }
  },
  {
    id: 'car-2',
    category: 'Career',
    question: "Temen kantor yang 'pick-me' dapet pujian atas kerjaan yang kamu bantu kerjain.",
    leftChoice: {
      text: 'DIEM: Ikhlasin aja, biar Tuhan yang balas.',
      resultType: 'bad',
      impact: { wallet: 0, sanity: -5, career: -10 }
    },
    rightChoice: {
      text: 'SPEAK UP: Mention halus kontribusi kamu di meeting.',
      resultType: 'good',
      impact: { wallet: 0, sanity: 10, career: 15 }
    }
  },
  {
    id: 'trending-1',
    category: 'Social',
    question: "Tiba-tiba viral drama baru di X (Twitter) tentang 'Pinjol vs. Gaya Hidup'. Semua orang lagi berantem.",
    leftChoice: {
      text: 'IKUT DEBAT: Bikin thread panjang, cari validasi.',
      resultType: 'bad',
      impact: { wallet: 0, sanity: -25, career: 0 }
    },
    rightChoice: {
      text: 'DIEM AJA: Mending kerja atau baca buku.',
      resultType: 'good',
      impact: { wallet: 0, sanity: 15, career: 5 }
    }
  }
];
