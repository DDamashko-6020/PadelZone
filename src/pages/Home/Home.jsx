import WhyUs from '../../components/WhyUs/WhyUs'
import Courts from '../../components/Courts/Courts'
import Services from '../../components/Services/Services'
import MyCarousel from '../../components/Carousel/Carousel'

function Home() {
  return (
    <>
      <MyCarousel />
      <WhyUs />
      <Courts />
      <Services />
    </>
  )
}

export default Home;