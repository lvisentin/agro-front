import { InfoCardProps } from './InfoCard.model';

function InfoCard(props: InfoCardProps) {
  return (
    <div className="card w-94 rounded-lg shadow-md bg-white">
      <div className="card-body">
        <p className="card-title">{props.title}</p>
        <div className="flex">
          <h1
            className={`font-medium text-2xl text-${
              props.color || 'black'
            }-500`}
          >
            {props.text}
          </h1>
          <p className="flex justify-end">
            {props.value}
            {/* <FontAwesomeIcon
              icon={faArrowTrendUp}
              className={'ml-1 mt-1 w-4'}
            /> */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
