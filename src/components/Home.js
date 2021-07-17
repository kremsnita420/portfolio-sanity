import React from 'react'
import image from '../hero-image.jpg'

function Home() {
    return (
       <main>
           <img src={image} alt='computer desk with monitors' className='absolute object-cover w-screen h-screen'/>
           <section className='relative flex justify-center min-h-screen pt-12 lg:pt-64 px-8'>
                <h1 className='text-6xl text-blue-200 sans-serif leading-none lg:leading-snug home-name text-center'>Hi, I'm Safet</h1>
           </section>
       </main>
    )
}

export default Home