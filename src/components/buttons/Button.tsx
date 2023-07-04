'use client';

import { useState } from "react";

export interface ButtonProps {
  title: string;
  callback: () => void;
}

export default function Button(props: ButtonProps) {
  const [title, setTitle] = useState<string>(props.title)
  const onSubmit = (e: any) => {
    e.preventDefault();
    props.callback();
  }

  return (
    <div className='px-10 pt-12'>
      <input type="submit" onClick={onSubmit} value={title}  className="rounded bg-red-600 w-full h-16 cursor-pointer hover:bg-red-400 transition-all duration-700 ease-in"/>
    </div>
  )
}