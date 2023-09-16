import Image from 'next/image';
import { NoDataProps } from './NoData.model';

function NoData(props: NoDataProps) {
  const message = props.message ? props.message : 'Não encontramos nada';
  
  return (
    <div className={'no__data__found flex flex-col items-center justify-center mt-4'}>
      <Image
        src="/nodata.svg"
        alt="Não encontramos nada"
        width={100}
        height={100}
      />

      <p className="mt-6">{message}</p>
    </div>
  );
}

export default NoData;
