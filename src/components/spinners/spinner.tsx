'use client'
import { Ellipsis } from 'react-spinners-css'

export interface LoaderProps {
  color?: string;
  size?: number;
}

export default function RoundSpinner(props: LoaderProps) {
  return <div>
    <Ellipsis color={props.color} size={props.size} />
  </div>
}