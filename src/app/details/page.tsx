import { FaBath, FaCar, FaBed, FaDumbbell, FaParking } from 'react-icons/fa'; 
import Image from 'next/image'; 
// import HoseImages from '../components/houseimages';

const PropertyDetails = () => {
  return (
    <div className="container mx-auto py-20">
      {/* Banner */}
      <div className="w-full h-96 relative mb-8">
        <Image
          src="/img/houses/banner1.jpg" 
          alt="House Banner"
          layout="fill"
          objectFit="cover"
          className="rounded-xl shadow-lg"
          width={1920}
          height={1080}
        />
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-[70%,30%] gap-8">
      
        <div>
          <div className="mb-4">
            <h1 className="text-4xl font-bold border-l-4 pl-2 border-blue-800 text-slate-700">Luxury Villa in Cancun</h1>
            <p className="text-gray-500 font-sans text-lg">Cancun, Quintana Roo, Mexico</p>
            <span className="inline-block bg-green-200 text-green-800 py-1 px-3 rounded-full mt-2">For Sale</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-700">Description</h2>
            <p className="text-gray-600 mt-2">
              This luxury villa in Cancun offers stunning views of the Caribbean Sea, featuring 4 bedrooms, 3 bathrooms, a private pool, and a fully equipped kitchen. Ideal for those looking for both privacy and comfort.
            </p>
          </div>

         
          <div className="mb-8 text-slate-700">
            <h2 className="text-2xl font-semibold mb-4">Services</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <FaBath className="text-blue-600 text-xl" />
                <span>3 Bathrooms</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCar className="text-blue-600 text-xl" />
                <span>2 Garage</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaBed className="text-blue-600 text-xl" />
                <span>4 Bedrooms</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaDumbbell className="text-blue-600 text-xl" />
                <span>Gym</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaParking className="text-blue-600 text-xl" />
                <span>Parking</span>
              </div>
            
            </div>
          </div>
         {/* <HoseImages/> */}

        </div>

        
        <div className="space-y-8 text-slate-700">
        
          <div className="p-6 bg-gray-50 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Agent Information</h3>
            <Image
              src="/img/agent.jpg" 
              alt="Agent"
              width={100}
              height={100}
              className="rounded-full mx-auto"
            />
            <h4 className="text-lg font-semibold mt-4">John Doe</h4>
            <p className="text-gray-500">Real Estate Agent</p>
            <a
              href="mailto:john.doe@example.com"
              className="block text-blue-500 underline mt-2"
            >
              john.doe@example.com
            </a>
            <p className="text-gray-500 mt-1">Phone: (555) 555-5555</p>
          </div>

         
          <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Available Properties</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Apartments</span>
                <span className="font-bold">23</span>
              </li>
              <li className="flex justify-between">
                <span>Luxury Houses</span>
                <span className="font-bold">12</span>
              </li>
              <li className="flex justify-between">
                <span>Studios</span>
                <span className="font-bold">8</span>
              </li>
              <li className="flex justify-between">
                <span>Residencials</span>
                <span className="font-bold">18</span>
              </li>
             
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
