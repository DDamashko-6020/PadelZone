import Carousel from '../../components/Carousel/Carousel'
import WhyUs from '../../components/WhyUs/WhyUs'
import Courts from '../../components/Courts/Courts'
import Services from '../../components/Services/Services'

function Home() {
  return (
    <div>
      <Carousel />
      <WhyUs />
      <Courts />
      <Services />
    </div>
  )
}

export default Home