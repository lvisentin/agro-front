'use client'

import {
  faArrowTrendUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pie from '@/components/Charts/Pie';
import Line from '@/components/Charts/Line';


export default function Home() {
  return (
      <main>
        <h1 className="font-semibold text-4xl mb-4">Bom dia, Lucas!</h1>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 p-1 mb-5">
          <div className="col-span-1 bg-white flex justify-between w-full p-4 rounded-lg">
            <div className="flex flex-col w-full pb-4">
              <p className="text-2xl font-semibold">
                Entradas
              </p>
              <h1 className="font-medium text-2xl mt-3 text-green-500">$21</h1>
            </div>
            <p className="flex justify-center items-center pr-3 rounded-lg">
              +11.01% 
              <FontAwesomeIcon 
                icon={faArrowTrendUp}
                className={'ml-1 mt-1 w-4'} 
              />
            </p>
          </div>
          <div className="col-span-1 bg-white flex justify-between w-full p-4 rounded-lg">
            <div className="flex flex-col w-full pb-4">
              <p className="text-2xl font-semibold">
                Saídas
              </p>
              <h1 className="font-medium text-2xl mt-3 text-red-500">$21</h1>
            </div>
                <p className="flex justify-center items-center pr-3 rounded-lg">
                  +11.01% 
                  <FontAwesomeIcon 
                    icon={faArrowTrendUp}
                    className={'ml-1 mt-1 w-4'} 
                  />
                </p>
          </div>
          <div className=" col-span-1 bg-white flex justify-between w-full p-4 rounded-lg">
            <div className="flex flex-col w-full pb-4">
              <p className="text-2xl font-semibold">
                Itens em estoque
              </p>
              <h1 className="font-medium text-2xl mt-3">590</h1>
            </div>
                <p className="flex justify-center items-center pr-3 rounded-lg">
                  +11.01% 
                  <FontAwesomeIcon 
                    icon={faArrowTrendUp}
                    className={'ml-1 mt-1 w-4'} 
                  />
                </p>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2 p-1 mb-5">
            <Pie />
            <Pie />
            <Line />
        </div>
      </main>
  )
}