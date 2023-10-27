'use client';

import InfoConsultancyCard from '@/components/InfoConsultancyCard/InfoConsultancyCard';
import AnimatedPage from '@/shared/templates/AnimatedPage';

export default function Consultor() {
  const consultants = [
    {
      image: '',
      name: 'Lucas Candiotto',
      description: 'Eng Agrônomo Mestre em Produção vegetal',
      link: 'https://api.whatsapp.com/send/?phone=%2B554691319623&text&type=phone_number&app_absent=0'
    },
    {
      image: '',
      name: 'Jonatan Basso',
      description: 'Eng Agrônomo. Especialista em solos e nutrição de plantas',
      link: 'https://api.whatsapp.com/send/?phone=%2B554691319623&text&type=phone_number&app_absent=0'
    },
    {
      image: '',
      name: 'Gustavo Thome',
      description: 'Engº Agrônomo',
      link: 'https://api.whatsapp.com/send/?phone=%2B554691319623&text&type=phone_number&app_absent=0'
    }
  ]

  return (
    <AnimatedPage>
      <main>
        <h1 className="font-semibold text-4xl mb-4">Consultoria</h1>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 p-1 mb-5">
          {consultants.map((consultant, index) => (
            <InfoConsultancyCard
              key={index}
              image={consultant.image}
              description={consultant.description}
              alt={`Foto de ${consultant.name}`}
              name={consultant.name}
              link={consultant.link}
            />
          ))}
        </div>
      </main>
    </AnimatedPage>
  );
}
