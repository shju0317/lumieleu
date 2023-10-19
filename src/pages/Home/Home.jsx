import { useEffect } from 'react';
import IndexPage from '@/components/home/IndexPage';
import GalleryPage from '@/components/home/GalleryPage';
import pageableMin from 'pageable';

function Home() {
  useEffect(() => {
    const container = document.querySelector('#container');
    new pageableMin(container, {
      anchors: ['home', 'gallery'],
    });
  }, []);

  return (
    <section className="relative" id="container">
      <div>
        <div data-anchor="home">
          <IndexPage />
        </div>
        <div data-anchor="gallery">
          <GalleryPage />
        </div>
      </div>
    </section>
  );
}

export default Home;
