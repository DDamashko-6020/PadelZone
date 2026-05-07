import WhyUs from '../../components/WhyUs/WhyUs'
import Courts from '../../components/Courts/Courts'
import Services from '../../components/Services/Services'
import MyCarousel from '../../components/Carousel/Carousel'

function Home() {
  return (
    <>
      <MyCarousel /> 
      <div className="container">
        <WhyUs />
        <Courts />
        <Services />
      </div>
    </>
  )
}

export default Home; // <-- REVISA QUE ESTO ESTÉ EN TU ARCHIVO HOME.JSX