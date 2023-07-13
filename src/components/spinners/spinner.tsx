'use client'
import { Roller } from 'react-awesome-spinners'

export interface LoaderProps {
  color?: string;
  size?: number;
}

export default function RoundSpinner(props: LoaderProps) {
  return <div>
    <Roller color={props.color} size={props.size} />
  </div>
}