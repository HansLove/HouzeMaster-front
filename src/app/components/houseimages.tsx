import Image from 'next/image'; 

const images = [
  { src: '/img/houses/gallery/g1.jpg', alt: 'Image 1', width: 400, height: 300 },
  { src: '/img/houses/gallery/g2.jpg', alt: 'Image 2', width: 300, height: 400 },
  { src: '/img/houses/gallery/g3.jpg', alt: 'Image 3', width: 500, height: 300 },
  { src: '/img/houses/gallery/g4.jpg', alt: 'Image 4', width: 300, height: 500 },
  { src: '/img/houses/gallery/g5.jpg', alt: 'Image 5', width: 400, height: 400 },
];

export default function HoseImages() {
  return (
    <div className="container mx-auto py-8">
      <div className="columns-1 sm:columns-2 md:columns-2 gap-4 space-y-4">
        {images.map((image, index) => (
          <div key={index} className="mb-4">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width||1920}
                height={image.height||1080}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
