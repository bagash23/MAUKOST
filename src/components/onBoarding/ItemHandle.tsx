import {ImageProps} from 'react-native';

export const BACKGROUND_COLOR = '#F1F1F1';

export interface PageInterface extends Pick<ImageProps, 'source'> {
  title: string;
  description: string;
}

export const PAGES: PageInterface[] = [
  {
    title: 'Pencarian Kost ',
    description:
      'Kami memberikan pencarian kost dengan harga yang sangat terjangkau dikalangan masyarakat',
    source: require('../../assets/card/undraw_House_searching_re_stk8.png'),
  },
  // {
  //   title: 'Social Media',
  //   description:
  //     'Berikan unggahan berkesan anda ke dunia dan saling berteman sesama pengguna ',
  //   source: require('../../assets/card/undraw_Social_life_re_x7t5.png'),
  // },
  {
    title: 'Bergabung Sekarang',
    description:
      'Sekarang waktunya bergabung untuk menjadi pengguna MauKost dan buatlah layanan untuk mempasarkan kost-an anda',
    source: require('../../assets/card/undraw_Join_re_w1lh.png'),
  },
];
