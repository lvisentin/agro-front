import Image from 'next/image';
import Link from 'next/link';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import { InfoConsultancyCardProps } from './InfoConsultancyCard.model';

function InfoConsultancyCard(props: InfoConsultancyCardProps) {
  const imageSrc = props.image || '/profile-default.svg';
  
  return (
    <div className="card w-80 rounded-lg shadow-md bg-white flex flex-col">
      <div className="card-body flex flex-col">
      <div className="rounded-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={props.alt || 'Imagem padrão'}
            width={100}
            height={100}
            className="w-full h-full"
          />
        </div>
        <div>
          <h1 className="font-medium text-center text-2xl text-black-500 pb-1">
            {props.name}
          </h1>
          <p className="pb-1 text-center">
            {props?.description}
          </p>
        </div>
        <div className="mt-auto flex justify-center">
          <Link
            href={props.link || ''}
            data-sveltekit-preload-data="hover"
            target="_blank"
          >
            <PrimaryButton>
              Contato
            </PrimaryButton>
          </Link>
        </div>
      </div>
  </div>
  );
}

export default InfoConsultancyCard;
