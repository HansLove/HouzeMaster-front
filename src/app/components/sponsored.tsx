"use client";
import { useState } from 'react';
import Image from 'next/image'; // Si usas Next.js
import { BiArrowFromLeft } from 'react-icons/bi';

const tabs = [
    {
        title: 'The Studio',
        content: {
            heading: 'The Studio',
            text: 'Enimad minim veniam quis nostrud exercitation ullamco laboris. Lorem ipsum dolor sit amet cons aetetur adipisicing elit sedo eiusmod tempor.Incididunt labore et dolore magna aliqua. sed ayd minim veniam.',
            totalarea: ['2800 Sq. Ft'],
            bedrooms: ['4'],
            bathrooms: ['2'],
            balcony: ['Yes'],
            lounge: ['Yes'],
            garage: ['Yes'],
            garden: ['Yes'],
            imageSrc: '/img/houses/s1.jpg', // Imagen para la columna derecha
        },
    },
    {
        title: 'Deluxe Portion',
        content: {
            heading: 'Deluxe Portion',
            text: 'Enimad minim veniam quis nostrud exercitation ullamco laboris. Lorem ipsum dolor sit amet cons aetetur adipisicing elit sedo eiusmod tempor.Incididunt labore et dolore magna aliqua. sed ayd minim veniam.',
            totalarea: ['2990 Sq. Ft'],
            bedrooms: ['2'],
            bathrooms: ['2'],
            balcony: ['Yes'],
            lounge: ['No'],
            garage: ['No'],
            garden: ['Yes'],
            imageSrc: '/img/houses/s2.jpg', // Imagen para la columna derecha
        },
    },
    {
        title: 'Penthouse',
        content: {
            heading: 'Penthouse',
            text: 'Enimad minim veniam quis nostrud exercitation ullamco laboris. Lorem ipsum dolor sit amet cons aetetur adipisicing elit sedo eiusmod tempor.Incididunt labore et dolore magna aliqua. sed ayd minim veniam.',
            totalarea: ['2010 Sq. Ft'],
            bedrooms: ['3'],
            bathrooms: ['2'],
            balcony: ['Yes'],
            lounge: ['No'],
            garage: ['Yes'],
            garden: ['No'],
            imageSrc: '/img/houses/s4.jpg', // Imagen para la columna derecha
        },
    },
    {
        title: 'Top Garden',
        content: {
            heading: 'Top Garden',
            text: 'Enimad minim veniam quis nostrud exercitation ullamco laboris. Lorem ipsum dolor sit amet cons aetetur adipisicing elit sedo eiusmod tempor.Incididunt labore et dolore magna aliqua. sed ayd minim veniam.',
            totalarea: ['1950 Sq. Ft'],
            bedrooms: ['3'],
            bathrooms: ['2'],
            balcony: ['Yes'],
            lounge: ['Yes'],
            garage: ['Yes'],
            garden: ['Yes'],
            imageSrc: '/img/houses/s3.jpg', // Imagen para la columna derecha
        },
    },
    {
        title: 'Double Height',
        content: {
            heading: 'Double Height',
            text: 'Enimad minim veniam quis nostrud exercitation ullamco laboris. Lorem ipsum dolor sit amet cons aetetur adipisicing elit sedo eiusmod tempor.Incididunt labore et dolore magna aliqua. sed ayd minim veniam.',
            totalarea: ['3200 Sq. Ft'],
            bedrooms: ['5'],
            bathrooms: ['3'],
            balcony: ['Yes'],
            lounge: ['Yes'],
            garage: ['Yes'],
            garden: ['Yes'],
            imageSrc: '/img/houses/s5.jpg', // Imagen para la columna derecha
        },
    },



];

export default function Sponsored() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="container mx-auto py-20">
            <div className="text-center mb-10">
                <p className="">
                    <span className="leading-1.3 font-sans text-blue-800 bg-blue-100 rounded-full w-fit px-4 py-1">Properties</span>
                </p>
                <h2 className="text-6xl mt-4 font-serif">
                    <span className="leading-4 text-blue-900">Sponsored Listings</span>
                </h2>
            </div>

            {/* Tab navigation with horizontal scrolling */}
            <div className="flex space-x-4 mb-8 text-2xl justify-left md:justify-center overflow-x-auto scrollbar-hide">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`py-2 px-4 rounded-lg whitespace-nowrap ${activeTab === index
                            ? 'text-blue-900 underline'
                            : 'text-gray-700'
                            }`}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 bg-slate-100 p-10 h-full items-center content-center rounded-2xl">
                    <h2 className="text-4xl text-blue-900 font-semibold">{tabs[activeTab].content.heading}</h2>
                    <p className="text-gray-600">{tabs[activeTab].content.text}</p>
                    <ul className="flex flex-col gap-y-10px items-stretch space-y-2">
                        <li className="text-sm md:text-base text-slate-600 relative z-0 before:w-full before:h-1 before:border-b before:border-dashed before:border-slate-700 before:absolute before:top-3/4  before:-z-1">
                            <ul className="flex justify-between items-center">
                                <li className="leading-1.8 pr-3 bg-slate-100 z-10">
                                   Total Area
                                </li>

                                <li className="leading-1.8 pl-3 bg-slate-100 z-10">
                                    {tabs[activeTab].content.totalarea}
                                </li>
                            </ul>
                        </li>
                        <li className="text-sm md:text-base text-slate-600 relative z-0 before:w-full before:h-1 before:border-b before:border-dashed before:border-slate-700 before:absolute before:top-3/4  before:-z-1">
                            <ul className="flex justify-between items-center">
                                <li className="leading-1.8 pr-3 bg-slate-100 z-10">
                                    Bedrooms
                                </li>

                                <li className="leading-1.8 pl-3 bg-slate-100 z-10">
                                    {tabs[activeTab].content.bedrooms}
                                </li>
                            </ul>
                        </li>
                        <li className="text-sm md:text-base text-slate-600 relative z-0 before:w-full before:h-1 before:border-b before:border-dashed before:border-slate-700 before:absolute before:top-3/4  before:-z-1">
                            <ul className="flex justify-between items-center">
                                <li className="leading-1.8 pr-3 bg-slate-100 z-10">
                                    Bathrooms
                                </li>

                                <li className="leading-1.8 pl-3 bg-slate-100 z-10">
                                    {tabs[activeTab].content.bathrooms}
                                </li>
                            </ul>
                        </li>
                        <li className="text-sm md:text-base text-slate-600 relative z-0 before:w-full before:h-1 before:border-b before:border-dashed before:border-slate-700 before:absolute before:top-3/4  before:-z-1">
                            <ul className="flex justify-between items-center">
                                <li className="leading-1.8 pr-3 bg-slate-100 z-10">
                                    Balcony
                                </li>

                                <li className="leading-1.8 pl-3 bg-slate-100 z-10">
                                    {tabs[activeTab].content.balcony}
                                </li>
                            </ul>
                        </li>
                        <li className="text-sm md:text-base text-slate-600 relative z-0 before:w-full before:h-1 before:border-b before:border-dashed before:border-slate-700 before:absolute before:top-3/4  before:-z-1">
                            <ul className="flex justify-between items-center">
                                <li className="leading-1.8 pr-3 bg-slate-100 z-10">
                                    Lounge
                                </li>

                                <li className="leading-1.8 pl-3 bg-slate-100 z-10">
                                    {tabs[activeTab].content.lounge}
                                </li>
                            </ul>
                        </li>
                        <li className="text-sm md:text-base text-slate-600 relative z-0 before:w-full before:h-1 before:border-b before:border-dashed before:border-slate-700 before:absolute before:top-3/4  before:-z-1">
                            <ul className="flex justify-between items-center">
                                <li className="leading-1.8 pr-3 bg-slate-100 z-10">
                                    Garage
                                </li>

                                <li className="leading-1.8 pl-3 bg-slate-100 z-10">
                                    {tabs[activeTab].content.garage}
                                </li>
                            </ul>
                        </li>
                        <li className="text-sm md:text-base text-slate-600 relative z-0 before:w-full before:h-1 before:border-b before:border-dashed before:border-slate-700 before:absolute before:top-3/4  before:-z-1">
                            <ul className="flex justify-between items-center">
                                <li className="leading-1.8 pr-3 bg-slate-100 z-10">
                                    Garden
                                </li>

                                <li className="leading-1.8 pl-3 bg-slate-100 z-10">
                                    {tabs[activeTab].content.garden}
                                </li>
                            </ul>
                        </li>

                    </ul>
                    <button className='text-lg font-bold flex items-center text-blue-800 hover:scale-105 duration-300'>
                      <a href='/details' className='flex items-center object-center'> View Property <BiArrowFromLeft className='w-6 h-6 ml-2' /> </a> 
                    </button>
                </div>


                <div className="flex justify-center items-center">
                    <Image
                        src={tabs[activeTab].content.imageSrc}
                        alt={tabs[activeTab].content.heading}
                        width={500}
                        height={300}
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
}
