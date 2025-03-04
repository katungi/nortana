'use client';

import { useEffect, useState } from "react";
import RoundSpinner from "../spinners/spinner";

export interface ButtonProps {
  title: string;
  width?: string;
  loading?: boolean;
  icon?: React.ReactElement | any;
  callback: () => void;
}

export default function Button(props: ButtonProps) {
  // const [title, setTitle] = useState<string>(props.title)
  const [isLoading, setIsLoading] = useState<boolean | undefined>(false)

  useEffect(() => {
    setIsLoading(props?.loading)
  }, [props.loading])

  const onSubmit = (e: any) => {
    e.preventDefault();
    props.callback();
  }

  return (
    <div className='px-10 pt-12'>
      <button type="submit" onClick={onSubmit} className={`text-white rounded bg-[#e60000] w-56 h-20 cursor-pointer hover:bg-#9adaf6 transition-all duration-700 ease-in`}>
        {props.icon}
        {isLoading &&
          <div className="">
            <RoundSpinner color="#fff" size={64} />
          </div>
        }
        {!isLoading && props.title}
      </button>
    </div>
  )
}