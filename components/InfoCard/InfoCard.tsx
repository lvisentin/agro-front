import React from "react";
import { InfoCardProps } from "./InfoCard.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";

function InfoCard(props: InfoCardProps) {
  return (
    <div className="card w-94 rounded-lg shadow-md">
      <div className="card-body">
        <p className="card-title">
          {props.title}
        </p>
        <div className="flex">
          <h1 className={`font-medium text-2xl text-${props.color || 'black'}-500`} >{props.text}</h1>
          <p className="flex justify-end">
            {props.value}
            <FontAwesomeIcon 
              icon={faArrowTrendUp}
              className={'ml-1 mt-1 w-4'} 
            />
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
