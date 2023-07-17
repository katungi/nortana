'use client';

import { useState } from "react";
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
  const onSubmit = (e: any) => {
    e.preventDefault();
    props.callback();
  }

  return (
    <div className='px-10 pt-12'>
      <button type="submit" onClick={onSubmit} className={`text-white rounded bg-[#1c9fe7] w-56 h-16 cursor-pointer hover:bg-#9adaf6 transition-all duration-700 ease-in`}>
        {props.icon}
        {props.loading && <RoundSpinner color='white' size={20} />}
        {!props.loading && props.title}
      </button>
    </div>
  )
}