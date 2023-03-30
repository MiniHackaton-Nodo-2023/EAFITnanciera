import Head from 'next/head'
import Image from 'next/image'
import Format from '../layout/format';

// compoenents
import Section1 from '../components/Section1';
import Section2 from '../components/Section2';
import Section3 from '../components/Section3';

export default function Home() {
  return (
    <Format>
      <Section1></Section1>
      <Section3></Section3>
      <Section2></Section2>
    </Format>
  )
}
